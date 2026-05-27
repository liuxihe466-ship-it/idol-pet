import { useState } from 'react'
import StarBackground from './components/StarBackground'
import QuizPage from './pages/QuizPage'
import ResultPage from './pages/ResultPage'
import PetPage from './pages/PetPage'
import { usePetData } from './hooks/usePetData'
import { matchAnimal } from './data/matching'
import type { QuizAnswers, AnimalType, PetData } from './types'

type View = 'quiz' | 'result' | 'pet'

interface ResultState {
  animal: AnimalType
  reason: string
  answers: QuizAnswers
}

export default function App() {
  const { data, mood, isNew, justEvolved, initPet, doAction, resetPet } = usePetData()
  const [view, setView] = useState<View>(isNew ? 'quiz' : 'pet')
  const [result, setResult] = useState<ResultState | null>(null)

  const handleQuizComplete = (answers: QuizAnswers) => {
    const { animal, reason } = matchAnimal(answers)
    setResult({ animal, reason, answers })
    setView('result')
  }

  const handleStartPet = (petData: PetData) => {
    initPet(petData)
    setView('pet')
  }

  const handleReset = () => {
    resetPet()
    setResult(null)
    setView('quiz')
  }

  return (
    <div className="scanlines">
      <StarBackground />

      {view === 'quiz' && (
        <QuizPage onComplete={handleQuizComplete} />
      )}

      {view === 'result' && result && (
        <ResultPage
          animal={result.animal}
          reason={result.reason}
          answers={result.answers}
          onStart={handleStartPet}
        />
      )}

      {view === 'pet' && data && (
        <PetPage
          data={data}
          mood={mood}
          justEvolved={justEvolved}
          onAction={doAction}
          onReset={handleReset}
        />
      )}
    </div>
  )
}
