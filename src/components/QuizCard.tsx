import { motion } from 'framer-motion'
import type { QuizQuestion } from '../data/quiz'

interface QuizCardProps {
  question: QuizQuestion
  value: string | string[]
  onChange: (val: string | string[]) => void
  onNext: () => void
  onPrev: () => void
  index: number
  total: number
  canNext: boolean
}

export default function QuizCard({
  question,
  value,
  onChange,
  onNext,
  onPrev,
  index,
  total,
  canNext,
}: QuizCardProps) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ type: 'tween', duration: 0.3 }}
      className="w-full max-w-sm mx-auto"
    >
      {/* 进度 */}
      <div className="flex gap-1 mb-6">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="h-1.5 flex-1"
            style={{
              background: i <= index ? '#7c6eff' : '#2a2a4a',
              boxShadow: i <= index ? '0 0 6px #7c6eff' : 'none',
            }}
          />
        ))}
      </div>

      {/* 题号 */}
      <p className="text-pixel-text-dim text-[8px] mb-2 tracking-widest">
        Q{index + 1}/{total}
      </p>

      {/* 问题 */}
      <h2 className="text-pixel-accent text-xs mb-1 leading-relaxed">
        {question.title}
      </h2>
      <p className="text-pixel-text-dim text-[8px] mb-6">
        {question.subtitle}
      </p>

      {/* 输入区域 */}
      {question.type === 'text' ? (
        <input
          type="text"
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          className="pixel-input w-full mb-6"
          onKeyDown={(e) => { if (e.key === 'Enter' && canNext) onNext() }}
          autoFocus
        />
      ) : question.type === 'single' ? (
        <div className="grid grid-cols-2 gap-3 mb-6">
          {question.options!.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`pixel-panel p-3 text-left transition-all ${
                value === opt.value ? 'pixel-selected' : ''
              }`}
            >
              <span className="text-base block mb-1">{opt.icon}</span>
              <span className="text-[9px] text-pixel-text">{opt.label}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 mb-6">
          {question.options!.map((opt) => {
            const selected = Array.isArray(value) && value.includes(opt.value)
            return (
              <button
                key={opt.value}
                onClick={() => {
                  const arr = Array.isArray(value) ? value : []
                  if (selected) {
                    onChange(arr.filter((v) => v !== opt.value))
                  } else {
                    onChange([...arr, opt.value])
                  }
                }}
                className={`pixel-panel p-3 text-left transition-all ${
                  selected ? 'pixel-selected' : ''
                }`}
              >
                <span className="text-base block mb-1">{opt.icon}</span>
                <span className="text-[9px] text-pixel-text">{opt.label}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* 导航按钮 */}
      <div className="flex gap-3">
        {index > 0 && (
          <button onClick={onPrev} className="pixel-btn pixel-btn-secondary flex-1">
            ◀ 上一题
          </button>
        )}
        <button
          onClick={onNext}
          disabled={!canNext}
          className={`pixel-btn flex-1 ${!canNext ? 'opacity-30 cursor-not-allowed' : ''}`}
        >
          {index < total - 1 ? '下一题 ▶' : '生成！✨'}
        </button>
      </div>
    </motion.div>
  )
}
