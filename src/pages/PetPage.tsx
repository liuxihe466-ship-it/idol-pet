import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PixelCanvas from '../components/PixelCanvas'
import StatusBars from '../components/StatusBars'
import ActionButtons from '../components/ActionButtons'
import { ANIMALS } from '../data/animals'
import type { PetData, PetAction, PetMood, AnimationState } from '../types'

interface PetPageProps {
  data: PetData
  mood: PetMood
  justEvolved: boolean
  onAction: (action: PetAction) => void
  onReset: () => void
}

const ACTION_TO_ANIM: Record<PetAction, AnimationState> = {
  feed: 'eat',
  play: 'play',
  pet: 'happy',
  rest: 'sleep',
}

const MOOD_TO_ANIM: Record<PetMood, AnimationState> = {
  happy: 'happy',
  normal: 'idle',
  hungry: 'idle',
  sleepy: 'sleep',
  sick: 'sick',
}

const MOOD_MESSAGES: Record<PetMood, string> = {
  happy: '心情超好！开心地蹦蹦跳跳~',
  normal: '状态不错，悠闲地待着呢',
  hungry: '肚子咕咕叫...想吃东西',
  sleepy: '眼皮好重...想睡觉了',
  sick: '不太舒服...需要照顾...',
}

const SICK_MESSAGES = [
  '好难受...',
  '不太舒服...需要照顾...',
  '感觉不太好...快来看看我',
  '身体不舒服...想要被照顾',
]

const ACTION_MESSAGES: Record<PetAction, string[]> = {
  feed: ['吃得好饱！', '好好吃！还想要~', '谢谢投喂！'],
  play: ['好开心！再来一次！', '太好玩了！', '玩得好累但好开心~'],
  pet: ['舒服~继续摸~', '最喜欢被摸头了！', '幸福感max！'],
  rest: ['好困...zzZ', '让我休息一下~', '闭目养神中...'],
}

const STAGE_NAMES = ['幼崽', '成长', '成年']

export default function PetPage({ data, mood, justEvolved, onAction, onReset }: PetPageProps) {
  const [currentAnim, setCurrentAnim] = useState<AnimationState>(MOOD_TO_ANIM[mood])
  const [message, setMessage] = useState(MOOD_MESSAGES[mood])
  const [showReset, setShowReset] = useState(false)

  const animalDef = ANIMALS[data.animalType]
  const nickname = data.quizAnswers.nickname

  useEffect(() => {
    setCurrentAnim(MOOD_TO_ANIM[mood])
    if (mood === 'sick') {
      setMessage(SICK_MESSAGES[Math.floor(Math.random() * SICK_MESSAGES.length)])
    } else {
      setMessage(MOOD_MESSAGES[mood])
    }
  }, [mood])

  const handleAction = (action: PetAction) => {
    setCurrentAnim(ACTION_TO_ANIM[action])
    const msgs = ACTION_MESSAGES[action]
    setMessage(msgs[Math.floor(Math.random() * msgs.length)])
    onAction(action)

    setTimeout(() => {
      setCurrentAnim(MOOD_TO_ANIM[mood])
      if (mood === 'sick') {
        setMessage(SICK_MESSAGES[Math.floor(Math.random() * SICK_MESSAGES.length)])
      } else {
        setMessage(MOOD_MESSAGES[mood])
      }
    }, 2000)
  }

  return (
    <div className="min-h-dvh relative z-10 px-4 pt-5 pb-6 flex flex-col max-w-sm mx-auto">
      {/* 顶部信息 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-pixel-accent text-[10px]">
            {animalDef.icon} {nickname}
          </h1>
          <p className="text-pixel-text-dim text-[7px] mt-0.5">
            Lv.{data.evolutionStage} {STAGE_NAMES[data.evolutionStage]} · {animalDef.name}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-pixel-text-dim text-[6px]">
            互动 {data.totalInteractions}次
          </span>
          <button
            onClick={() => setShowReset(true)}
            className="text-pixel-text-dim text-[7px] hover:text-pixel-red transition-colors"
          >
            ⚙
          </button>
        </div>
      </div>

      {/* 进化通知 */}
      <AnimatePresence>
        {justEvolved && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pixel-panel p-3 mb-3 text-center"
            style={{ borderColor: '#ffcc00', boxShadow: '0 0 20px #ffcc0044' }}
          >
            <p className="text-pixel-accent text-[9px]">
              ✨ 进化了！{nickname}成长为{STAGE_NAMES[data.evolutionStage]}！✨
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 场景区域 */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-center mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="pixel-panel p-3 mb-3 relative">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 8px, #4ade8022 8px, #4ade8022 16px)',
            }}
          />
          <PixelCanvas
            animal={data.animalType}
            animation={currentAnim}
            size={224}
            stage={data.evolutionStage}
          />
        </div>

        {/* 对话气泡 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pixel-panel px-4 py-2 relative"
            style={mood === 'sick' ? { borderColor: '#ef4444' } : undefined}
          >
            <p className={`text-[8px] leading-relaxed ${mood === 'sick' ? 'text-pixel-red' : 'text-pixel-text'}`}>
              {message}
            </p>
            <div
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderBottom: `6px solid ${mood === 'sick' ? '#ef4444' : 'var(--color-pixel-border)'}`,
              }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* 状态条 */}
      <div className="pixel-panel p-3 mb-3">
        <StatusBars {...data.status} />
      </div>

      {/* 交互按钮 */}
      <ActionButtons onAction={handleAction} />

      {/* 重置确认 */}
      <AnimatePresence>
        {showReset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="pixel-panel p-6 max-w-xs w-full text-center"
            >
              <p className="text-pixel-accent text-[10px] mb-2">确定要重置吗？</p>
              <p className="text-pixel-text-dim text-[7px] mb-4">
                这会删除你的宠物数据，从头开始
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowReset(false)}
                  className="pixel-btn pixel-btn-secondary flex-1"
                >
                  取消
                </button>
                <button
                  onClick={onReset}
                  className="pixel-btn flex-1"
                  style={{ background: '#ef4444', boxShadow: '4px 4px 0 #991b1b, -2px -2px 0 #f87171 inset' }}
                >
                  重置
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
