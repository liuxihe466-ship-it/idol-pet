import { useRef, useEffect, useCallback } from 'react'
import type { AnimalType, AnimationState, EvolutionStage } from '../types'
import { ANIMALS, ANIMAL_SPRITES } from '../data/animals'

interface PixelCanvasProps {
  animal: AnimalType
  animation: AnimationState
  size?: number
  stage?: EvolutionStage
}

const FRAME_MS = 400
const PIXEL_SIZE_BASE = 16

// 进化阶段缩放比例
const STAGE_SCALE: Record<EvolutionStage, number> = {
  0: 0.65,  // 幼崽 - 小
  1: 0.82,  // 成长 - 中
  2: 1.0,   // 成年 - 满
}

// 成年阶段配饰像素（皇冠/蝴蝶结）- 相对于精灵顶部
const ACCESSORY_PIXELS: [number, number, number][] = [
  // [x, y_offset_from_top, colorIdx(7=accent)]
  [7, -2, 7], [8, -2, 7],         // 皇冠顶部
  [6, -1, 7], [7, -1, 7], [8, -1, 7], [9, -1, 7], // 皇冠底部
]

export default function PixelCanvas({ animal, animation, size = 256, stage = 0 }: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef(0)
  const timerRef = useRef<number>(0)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const sprite = ANIMAL_SPRITES[animal]
    const colors = ANIMALS[animal].colors
    const animFrames = animation === 'sick' ? sprite.idle : (sprite[animation] || sprite.idle)
    const isSick = animation === 'sick'

    const frame = animFrames[frameRef.current % animFrames.length]
    const scale = STAGE_SCALE[stage]
    const pixelSize = (size / PIXEL_SIZE_BASE) * scale
    const offset = (size - PIXEL_SIZE_BASE * pixelSize) / 2

    ctx.clearRect(0, 0, size, size)

    if (isSick) {
      ctx.globalAlpha = 0.5
    }

    // 找到精灵最顶部的行（用于配饰定位）
    let topRow = PIXEL_SIZE_BASE
    for (let y = 0; y < PIXEL_SIZE_BASE; y++) {
      for (let x = 0; x < PIXEL_SIZE_BASE; x++) {
        if (frame[y]?.[x] && frame[y][x] !== 0) {
          topRow = Math.min(topRow, y)
        }
      }
    }

    for (let y = 0; y < PIXEL_SIZE_BASE; y++) {
      for (let x = 0; x < PIXEL_SIZE_BASE; x++) {
        const colorIdx = frame[y]?.[x]
        if (!colorIdx || colorIdx === 0) continue
        ctx.fillStyle = colors[colorIdx - 1] || '#ffffff'
        ctx.fillRect(
          offset + x * pixelSize,
          offset + y * pixelSize,
          pixelSize,
          pixelSize
        )
      }
    }

    // 成年阶段画配饰（皇冠）
    if (stage === 2) {
      for (const [ax, ayOff, ci] of ACCESSORY_PIXELS) {
        const py = topRow + ayOff
        ctx.fillStyle = colors[ci - 1] || '#ffcc00'
        ctx.fillRect(
          offset + ax * pixelSize,
          offset + py * pixelSize,
          pixelSize,
          pixelSize
        )
      }
    }

    ctx.globalAlpha = 1
    frameRef.current++
  }, [animal, animation, size, stage])

  useEffect(() => {
    frameRef.current = 0
    draw()

    timerRef.current = window.setInterval(() => {
      draw()
    }, FRAME_MS)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [draw])

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="block"
      style={{ imageRendering: 'pixelated', width: size, height: size }}
    />
  )
}
