import { useState } from 'react'
import { motion } from 'framer-motion'
import type { PetAction } from '../types'

interface ActionButtonsProps {
  onAction: (action: PetAction) => void
  disabled?: boolean
}

const actions: { action: PetAction; icon: string; label: string; color: string }[] = [
  { action: 'feed', icon: '🍖', label: '喂食', color: '#4ade80' },
  { action: 'play', icon: '🎾', label: '玩耍', color: '#ffcc00' },
  { action: 'pet', icon: '🖐️', label: '摸头', color: '#ff6eb4' },
  { action: 'rest', icon: '💤', label: '休息', color: '#22d3ee' },
]

export default function ActionButtons({ onAction, disabled }: ActionButtonsProps) {
  const [cooldown, setCooldown] = useState<PetAction | null>(null)

  const handleClick = (action: PetAction) => {
    if (cooldown || disabled) return
    setCooldown(action)
    onAction(action)
    setTimeout(() => setCooldown(null), 1500)
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {actions.map(({ action, icon, label, color }) => {
        const isActive = cooldown === action
        return (
          <motion.button
            key={action}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleClick(action)}
            disabled={!!cooldown || disabled}
            className="pixel-panel p-3 flex flex-col items-center gap-1 transition-all"
            style={{
              borderColor: isActive ? color : undefined,
              boxShadow: isActive ? `0 0 12px ${color}44` : undefined,
              opacity: cooldown && !isActive ? 0.4 : 1,
            }}
          >
            <motion.span
              className="text-xl"
              animate={isActive ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              {icon}
            </motion.span>
            <span className="text-[7px] text-pixel-text-dim">{label}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
