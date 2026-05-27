interface StatusBarsProps {
  hunger: number
  happiness: number
  affection: number
  energy: number
}

const bars = [
  { key: 'hunger', label: '饱食度', icon: '🍖', color: '#4ade80' },
  { key: 'happiness', label: '快乐度', icon: '😊', color: '#ffcc00' },
  { key: 'affection', label: '亲密度', icon: '💜', color: '#ff6eb4' },
  { key: 'energy', label: '精力值', icon: '⚡', color: '#22d3ee' },
] as const

export default function StatusBars({ hunger, happiness, affection, energy }: StatusBarsProps) {
  const values = { hunger, happiness, affection, energy }

  return (
    <div className="space-y-2">
      {bars.map(({ key, label, icon, color }) => (
        <div key={key} className="flex items-center gap-2">
          <span className="text-sm w-5 text-center">{icon}</span>
          <span className="text-[7px] text-pixel-text-dim w-12">{label}</span>
          <div className="pixel-bar flex-1">
            <div
              className="pixel-bar-fill"
              style={{
                width: `${values[key]}%`,
                background: `linear-gradient(to right, ${color}88, ${color})`,
              }}
            />
          </div>
          <span className="text-[8px] text-pixel-text-dim w-8 text-right">
            {values[key]}
          </span>
        </div>
      ))}
    </div>
  )
}
