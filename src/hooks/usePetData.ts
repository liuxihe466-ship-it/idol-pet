import { useState, useCallback, useEffect } from 'react'
import type { PetData, PetAction, PetStatus, PetMood } from '../types'

const STORAGE_KEY = 'idol-pet-data'
const DECAY_INTERVAL = 10 * 60 * 1000 // 10分钟
const DECAY_AMOUNT = 5

function loadData(): PetData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
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
  if (status.hunger < 20) return 'hungry'
  if (status.energy < 20) return 'sleepy'
  if (status.happiness > 70) return 'happy'
  return 'normal'
}

export function usePetData() {
  const [data, setData] = useState<PetData | null>(() => {
    const saved = loadData()
    if (!saved) return null
    // 应用时间衰减
    const decayed = applyDecay(saved.status, saved.lastUpdated)
    return { ...saved, status: decayed, lastUpdated: Date.now() }
  })

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
    }, 60_000) // 每分钟检查一次
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
      const updated = { ...prev, status: s, lastUpdated: Date.now() }
      saveData(updated)
      return updated
    })
  }, [])

  const resetPet = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setData(null)
  }, [])

  const mood: PetMood = data ? getMood(data.status) : 'normal'

  return {
    data,
    mood,
    isNew: !data,
    initPet,
    doAction,
    resetPet,
  }
}
