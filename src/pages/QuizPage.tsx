import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import QuizCard from '../components/QuizCard'
import { QUIZ_QUESTIONS } from '../data/quiz'
import type { QuizAnswers } from '../types'

interface QuizPageProps {
  onComplete: (answers: QuizAnswers) => void
}

const initialAnswers: QuizAnswers = {
  idolName: '',
  nickname: '',
  gender: 'male',
  eyeType: 'round',
  facialFeatures: [],
  faceShape: 'round',
  vibe: 'cute',
  personality: [],
}

export default function QuizPage({ onComplete }: QuizPageProps) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers)
  const [started, setStarted] = useState(false)

  const question = QUIZ_QUESTIONS[step]

  const currentValue = useMemo(() => {
    const field = question.field
    return answers[field]
  }, [step, answers])

  const handleChange = (val: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [question.field]: val }))
  }

  const canNext = (() => {
    if (question.type === 'text') return (currentValue as string).trim().length > 0
    if (question.type === 'multi') return (currentValue as string[]).length > 0
    return !!currentValue
  })()

  const handleNext = () => {
    if (!canNext) return
    if (step < QUIZ_QUESTIONS.length - 1) {
      setStep((s) => s + 1)
    } else {
      onComplete(answers)
    }
  }

  if (!started) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.p
            className="text-4xl mb-4"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎮
          </motion.p>
          <h1 className="text-pixel-accent text-sm mb-2">爱豆动物塑</h1>
          <p className="text-pixel-text-dim text-[8px] mb-1 leading-relaxed">
            回答几个关于你爱豆的问题
          </p>
          <p className="text-pixel-text-dim text-[8px] mb-8 leading-relaxed">
            看看TA会变成什么动物！
          </p>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setStarted(true)}
            className="pixel-btn pixel-btn-accent text-xs px-8 py-3"
          >
            ▶ START
          </motion.button>

          <p className="text-pixel-text-dim text-[6px] mt-6 opacity-50">
            PRESS START TO BEGIN
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center relative z-10 px-6">
      <AnimatePresence mode="wait">
        <QuizCard
          key={step}
          question={question}
          value={currentValue}
          onChange={handleChange}
          onNext={handleNext}
          onPrev={() => setStep((s) => Math.max(0, s - 1))}
          index={step}
          total={QUIZ_QUESTIONS.length}
          canNext={canNext}
        />
      </AnimatePresence>
    </div>
  )
}
