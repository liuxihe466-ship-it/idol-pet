import { useState, useCallback, useEffect, useRef } from 'react'
import type { PetData, PetAction, PetStatus, PetMood, EvolutionStage } from '../types'

const STORAGE_KEY = 'idol-pet-data'
const DECAY_INTERVAL = 10 * 60 * 1000 // 10分钟
const DECAY_AMOUNT = 5

const EVOLUTION_THRESHOLDS: [number, EvolutionStage][] = [
  [40, 2],
  [15, 1],
]

function loadData(): PetData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    // 兼容旧数据
    if (parsed.totalInteractions === undefined) parsed.totalInteractions = 0
    if (parsed.evolutionStage === undefined) parsed.evolutionStage = 0
    return parsed
  } catch {
    return null
  }
}

function saveData(data: PetData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function applyDecay(status: PetStatus, lastUpdated: number): PetStatus {
  const now = Date.now()
  const elapsed = now - lastUpdated
  const periods = Math.floor(elapsed / DECAY_INTERVAL)

  if (periods <= 0) return status

  return {
    hunger: Math.max(0, status.hunger - periods * DECAY_AMOUNT),
    happiness: Math.max(0, status.happiness - periods * DECAY_AMOUNT),
    affection: Math.max(0, status.affection - Math.floor(periods * DECAY_AMOUNT * 0.5)),
    energy: Math.max(0, status.energy - periods * DECAY_AMOUNT),
  }
}

function getMood(status: PetStatus): PetMood {
  const avg = (status.hunger + status.happiness + status.affection + status.energy) / 4
  // 生病判定：任意值<15 或 平均<25
  if (status.hunger < 15 || status.happiness < 15 || status.energy < 15 || avg < 25) {
    return 'sick'
  }
  if (status.hunger < 20) return 'hungry'
  if (status.energy < 20) return 'sleepy'
  if (status.happiness > 70) return 'happy'
  return 'normal'
}

function getEvolutionStage(totalInteractions: number): EvolutionStage {
  for (const [threshold, stage] of EVOLUTION_THRESHOLDS) {
    if (totalInteractions >= threshold) return stage
  }
  return 0
}

export function usePetData() {
  const [data, setData] = useState<PetData | null>(() => {
    const saved = loadData()
    if (!saved) return null
    const decayed = applyDecay(saved.status, saved.lastUpdated)
    return { ...saved, status: decayed, lastUpdated: Date.now() }
  })

  const [justEvolved, setJustEvolved] = useState(false)
  const prevStageRef = useRef<EvolutionStage>(data?.evolutionStage ?? 0)

  // 定时衰减
  useEffect(() => {
    if (!data) return
    const timer = setInterval(() => {
      setData(prev => {
        if (!prev) return null
        const newStatus = applyDecay(prev.status, prev.lastUpdated)
        const updated = { ...prev, status: newStatus, lastUpdated: Date.now() }
        saveData(updated)
        return updated
      })
    }, 60_000)
    return () => clearInterval(timer)
  }, [!!data])

  const initPet = useCallback((petData: PetData) => {
    saveData(petData)
    setData(petData)
  }, [])

  const doAction = useCallback((action: PetAction) => {
    setData(prev => {
      if (!prev) return null
      const s = { ...prev.status }
      switch (action) {
        case 'feed':
          s.hunger = Math.min(100, s.hunger + 25)
          s.happiness = Math.min(100, s.happiness + 5)
          break
        case 'play':
          s.happiness = Math.min(100, s.happiness + 20)
          s.energy = Math.max(0, s.energy - 10)
          s.hunger = Math.max(0, s.hunger - 5)
          break
        case 'pet':
          s.affection = Math.min(100, s.affection + 15)
          s.happiness = Math.min(100, s.happiness + 10)
          break
        case 'rest':
          s.energy = Math.min(100, s.energy + 30)
          s.hunger = Math.max(0, s.hunger - 5)
          break
      }

      const newTotal = prev.totalInteractions + 1
      const newStage = getEvolutionStage(newTotal)

      // 检测进化
      if (newStage > prevStageRef.current) {
        prevStageRef.current = newStage
        setJustEvolved(true)
        setTimeout(() => setJustEvolved(false), 3000)
      }

      const updated: PetData = {
        ...prev,
        status: s,
        lastUpdated: Date.now(),
        totalInteractions: newTotal,
        evolutionStage: newStage,
      }
      saveData(updated)
      return updated
    })
  }, [])

  const resetPet = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setData(null)
    prevStageRef.current = 0
  }, [])

  const mood: PetMood = data ? getMood(data.status) : 'normal'

  return {
    data,
    mood,
    isNew: !data,
    justEvolved,
    initPet,
    doAction,
    resetPet,
  }
}
