import { useRef, useEffect, useCallback } from 'react'
import type { AnimalType, AnimationState } from '../types'
import { ANIMALS, ANIMAL_SPRITES } from '../data/animals'

interface PixelCanvasProps {
  animal: AnimalType
  animation: AnimationState
  size?: number
}

const FRAME_MS = 400
const PIXEL_SIZE_BASE = 16 // 16x16 sprite

export default function PixelCanvas({ animal, animation, size = 256 }: PixelCanvasProps) {
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
    const frames = sprite[animation] || sprite.idle

    const frame = frames[frameRef.current % frames.length]
    const pixelSize = size / PIXEL_SIZE_BASE

    ctx.clearRect(0, 0, size, size)

    for (let y = 0; y < PIXEL_SIZE_BASE; y++) {
      for (let x = 0; x < PIXEL_SIZE_BASE; x++) {
        const colorIdx = frame[y]?.[x]
        if (!colorIdx || colorIdx === 0) continue
        ctx.fillStyle = colors[colorIdx - 1] || '#ffffff'
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
      }
    }

    frameRef.current++
  }, [animal, animation, size])

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
