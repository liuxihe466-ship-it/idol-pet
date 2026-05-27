import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PixelCanvas from '../components/PixelCanvas'
import { ANIMALS } from '../data/animals'
import { getDefaultReason } from '../data/matching'
import type { AnimalType, QuizAnswers, PetData } from '../types'

interface ResultPageProps {
  animal: AnimalType
  reason: string
  answers: QuizAnswers
  onStart: (petData: PetData) => void
}

const ALL_ANIMALS = Object.values(ANIMALS)

export default function ResultPage({ animal: matchedAnimal, reason: matchedReason, answers, onStart }: ResultPageProps) {
  const [revealed, setRevealed] = useState(false)
  const [showPicker, setShowPicker] = useState(false)
  const [currentAnimal, setCurrentAnimal] = useState<AnimalType>(matchedAnimal)
  const [currentReason, setCurrentReason] = useState(matchedReason)

  const animalDef = ANIMALS[currentAnimal]
  const nickname = answers.nickname || answers.idolName

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handlePickAnimal = (type: AnimalType) => {
    setCurrentAnimal(type)
    if (type === matchedAnimal) {
      setCurrentReason(matchedReason)
    } else {
      setCurrentReason(getDefaultReason(type, nickname))
    }
    setShowPicker(false)
  }

  const handleStart = () => {
    const petData: PetData = {
      quizAnswers: answers,
      animalType: currentAnimal,
      matchReason: currentReason,
      status: {
        hunger: 80,
        happiness: 80,
        affection: 50,
        energy: 100,
      },
      lastUpdated: Date.now(),
      createdAt: Date.now(),
    }
    onStart(petData)
  }

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center relative z-10 px-6">
      {!revealed ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.p
            className="text-pixel-accent text-[10px] mb-4"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            分析中...
          </motion.p>
          <div className="flex gap-2 justify-center">
            {['🔍', '✨', '🎲'].map((e, i) => (
              <motion.span
                key={i}
                className="text-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ delay: i * 0.2, duration: 0.6, repeat: Infinity }}
              >
                {e}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="text-center max-w-sm w-full"
        >
          <p className="text-pixel-text-dim text-[8px] mb-2">
            {nickname}的动物形态是...
          </p>

          <motion.div
            key={currentAnimal}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10 }}
            className="flex justify-center mb-4"
          >
            <div className="pixel-panel p-4 inline-block">
              <PixelCanvas animal={currentAnimal} animation="happy" size={192} />
            </div>
          </motion.div>

          <motion.div
            key={`name-${currentAnimal}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-pixel-accent text-base mb-1">
              {animalDef.icon} {animalDef.name}
            </h2>
            <p className="text-pixel-text text-[9px] mb-4 leading-relaxed">
              {animalDef.description}
            </p>
          </motion.div>

          <div className="pixel-panel p-4 mb-4">
            <p className="text-[7px] text-pixel-text-dim mb-1">匹配理由</p>
            <p className="text-[8px] text-pixel-secondary leading-relaxed">
              {currentReason}
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="pixel-btn pixel-btn-accent text-xs px-8 py-3 w-full"
          >
            🏠 开始养它！
          </motion.button>

          {/* 自选动物入口 */}
          <button
            onClick={() => setShowPicker(!showPicker)}
            className="mt-3 text-pixel-text-dim text-[7px] hover:text-pixel-secondary transition-colors"
          >
            {showPicker ? '收起 ▲' : '不太像？自己选一个 →'}
          </button>

          {/* 动物选择面板 */}
          <AnimatePresence>
            {showPicker && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-3"
              >
                <div className="pixel-panel p-3">
                  <p className="text-[7px] text-pixel-text-dim mb-3">选择你喜欢的动物</p>
                  <div className="grid grid-cols-3 gap-2">
                    {ALL_ANIMALS.map((a) => (
                      <button
                        key={a.type}
                        onClick={() => handlePickAnimal(a.type)}
                        className={`pixel-panel p-2 text-center transition-all ${
                          currentAnimal === a.type ? 'pixel-selected' : ''
                        }`}
                      >
                        <span className="text-lg block">{a.icon}</span>
                        <span className="text-[6px] text-pixel-text-dim block mt-0.5">
                          {a.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
