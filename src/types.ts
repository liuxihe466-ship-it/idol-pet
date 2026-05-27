export type Gender = 'male' | 'female' | 'other'

export type EyeType = 'round' | 'phoenix' | 'almond' | 'crescent'

export type FacialFeature =
  | 'high-nose'
  | 'thick-lips'
  | 'thin-lips'
  | 'small-nose'
  | 'dimples'
  | 'beauty-mark'

export type FaceShape = 'round' | 'oval' | 'square' | 'heart' | 'long'

export type Vibe = 'cute' | 'cold' | 'sunny' | 'gentle' | 'wild'

export type Personality =
  | 'dramatic'    // 神经质/戏精
  | 'mischievous' // 爱捣蛋/小恶魔
  | 'talkative'   // 话痨/社牛
  | 'shy'         // 社恐/慢热
  | 'foodie'      // 吃货/贪吃
  | 'tender'      // 温柔体贴
  | 'bossy'       // 霸道/强势
  | 'funny'       // 搞笑/幽默

export type Habit =
  | 'night-owl'   // 夜猫子/熬夜
  | 'active'      // 闲不住/爱运动
  | 'phone'       // 手机不离手
  | 'tidy'        // 整理控/爱干净
  | 'singing'     // 随时哼歌
  | 'sleepy'      // 嗜睡/爱赖床

export interface QuizAnswers {
  nickname: string
  gender: Gender
  eyeType: EyeType
  facialFeatures: FacialFeature[]
  faceShape: FaceShape
  vibe: Vibe
  personality: Personality[]
  habits: Habit[]
}

export type AnimalType =
  | 'tuxedo-cat'   // 奶牛猫
  | 'orange-cat'   // 橘猫
  | 'ragdoll'      // 布偶猫
  | 'black-cat'    // 黑猫
  | 'fox'          // 狐狸
  | 'rabbit'       // 兔子
  | 'shiba'        // 柴犬
  | 'beagle'       // 比格犬
  | 'golden'       // 金毛
  | 'hamster'      // 仓鼠
  | 'deer'         // 小鹿
  | 'bear'         // 小熊
  | 'red-panda'    // 小熊猫
  | 'wolf'         // 狼
  | 'owl'          // 猫头鹰
  | 'snake'        // 蛇
  | 'penguin'      // 企鹅
  | 'parrot'       // 鹦鹉
  | 'otter'        // 水獭
  | 'hedgehog'     // 刺猬

export interface AnimalDef {
  type: AnimalType
  name: string
  icon: string
  description: string
  colors: string[]
}

export type PetAction = 'feed' | 'play' | 'pet' | 'rest'

export interface PetStatus {
  hunger: number    // 0-100
  happiness: number // 0-100
  affection: number // 0-100
  energy: number    // 0-100
}

export type PetMood = 'happy' | 'normal' | 'hungry' | 'sleepy' | 'sick'

export type EvolutionStage = 0 | 1 | 2

export interface PetData {
  quizAnswers: QuizAnswers
  animalType: AnimalType
  matchReason: string
  status: PetStatus
  lastUpdated: number
  createdAt: number
  totalInteractions: number
  evolutionStage: EvolutionStage
}

export type AnimationState = 'idle' | 'eat' | 'play' | 'sleep' | 'happy' | 'sick'
