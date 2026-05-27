import type { AnimalType, AnimalDef } from '../types'

export const ANIMALS: Record<AnimalType, AnimalDef> = {
  'tuxedo-cat': {
    type: 'tuxedo-cat',
    name: '奶牛猫',
    icon: '🐱',
    description: '一秒天使一秒恶魔，永远让人猜不透',
    colors: ['#2d2d2d', '#ffffff', '#f5f5f5', '#ff8fab', '#1a1a1a', '#1a1a2e', '#ffcc00', '#4ade80'],
  },
  'orange-cat': {
    type: 'orange-cat',
    name: '橘猫',
    icon: '🐈',
    description: '干饭第一名，胖也是一种可爱',
    colors: ['#f5a623', '#e8903c', '#fff5e6', '#ff8fab', '#3d2b1f', '#1a1a2e', '#ffcc00', '#ffffff'],
  },
  ragdoll: {
    type: 'ragdoll',
    name: '布偶猫',
    icon: '🐱',
    description: '仙气飘飘，温柔得像一片云',
    colors: ['#f0ece3', '#d4c5b0', '#ffffff', '#87ceeb', '#4a3728', '#1a1a2e', '#ffcc00', '#ff8fab'],
  },
  fox: {
    type: 'fox',
    name: '狐狸',
    icon: '🦊',
    description: '聪明伶俐，魅力值拉满的小恶魔',
    colors: ['#ff6b35', '#e85d26', '#fff0e6', '#ff9a5c', '#2d1810', '#1a1a2e', '#ffcc00', '#ffffff'],
  },
  rabbit: {
    type: 'rabbit',
    name: '兔子',
    icon: '🐰',
    description: '软萌怕生，熟了之后超级粘人',
    colors: ['#ffeef2', '#ffc4d6', '#ffffff', '#ff8fab', '#e85d8a', '#1a1a2e', '#ffcc00', '#ff6b9d'],
  },
  shiba: {
    type: 'shiba',
    name: '柴犬',
    icon: '🐕',
    description: '倔强又搞笑，表情包本包',
    colors: ['#f0a500', '#cc8800', '#fff5cc', '#ffd166', '#4a3200', '#1a1a2e', '#ffcc00', '#ffffff'],
  },
  beagle: {
    type: 'beagle',
    name: '比格犬',
    icon: '🐶',
    description: '精力无限的捣蛋鬼，到处探险',
    colors: ['#c68642', '#8b5e3c', '#ffffff', '#f5e6c8', '#2d1f10', '#1a1a2e', '#ffcc00', '#4ade80'],
  },
  golden: {
    type: 'golden',
    name: '金毛',
    icon: '🐕‍🦺',
    description: '行走的暖阳，温柔又阳光的大暖男',
    colors: ['#daa520', '#b8860b', '#fff8dc', '#ffd700', '#4a3200', '#1a1a2e', '#ffcc00', '#ffffff'],
  },
  hamster: {
    type: 'hamster',
    name: '仓鼠',
    icon: '🐹',
    description: '腮帮子塞满食物的小吃货',
    colors: ['#f5c6a5', '#e8a87c', '#ffffff', '#ffd4b8', '#8b5e3c', '#1a1a2e', '#ffcc00', '#ff8fab'],
  },
  deer: {
    type: 'deer',
    name: '小鹿',
    icon: '🦌',
    description: '温柔胆小，像林间精灵一样优雅',
    colors: ['#c68642', '#8b5e3c', '#fff8e7', '#e8a87c', '#4a3728', '#1a1a2e', '#ffcc00', '#ffffff'],
  },
  bear: {
    type: 'bear',
    name: '小熊',
    icon: '🐻',
    description: '看着憨厚实则霸道，满满安全感',
    colors: ['#8b6914', '#6b4e11', '#f5e6c8', '#a0822b', '#3d2b0a', '#1a1a2e', '#ffcc00', '#ffffff'],
  },
  'red-panda': {
    type: 'red-panda',
    name: '小熊猫',
    icon: '🐼',
    description: '慢热呆萌，自带治愈光环',
    colors: ['#cc4400', '#993300', '#ffffff', '#ff8844', '#2d1500', '#1a1a2e', '#ffcc00', '#f5e6c8'],
  },
  wolf: {
    type: 'wolf',
    name: '狼',
    icon: '🐺',
    description: '霸气外露，孤傲的王者',
    colors: ['#6b7b8f', '#4a5568', '#c8d6e5', '#8395a7', '#2d3436', '#1a1a2e', '#ffcc00', '#ffffff'],
  },
  owl: {
    type: 'owl',
    name: '猫头鹰',
    icon: '🦉',
    description: '沉默寡言但看透一切的智者',
    colors: ['#5c4033', '#3d2b1f', '#f5e6c8', '#8b6914', '#1a1010', '#1a1a2e', '#ffcc00', '#ffffff'],
  },
  snake: {
    type: 'snake',
    name: '蛇',
    icon: '🐍',
    description: '冷艳神秘，拥有致命吸引力',
    colors: ['#2d8659', '#1a5c3a', '#c8f5dc', '#4ade80', '#0d3320', '#1a1a2e', '#ffcc00', '#ffffff'],
  },
  'black-cat': {
    type: 'black-cat',
    name: '黑猫',
    icon: '🐈‍⬛',
    description: '神秘的暗夜精灵，只在深夜出没',
    colors: ['#1a1a2a', '#0d0d1a', '#2a2a3a', '#7c6eff', '#111118', '#1a1a2e', '#ffcc00', '#ffffff'],
  },
  penguin: {
    type: 'penguin',
    name: '企鹅',
    icon: '🐧',
    description: '看着呆呆的，其实内心戏超多',
    colors: ['#1a1a2e', '#0d0d1a', '#ffffff', '#ffcc00', '#2d2d3e', '#1a1a2e', '#ff6eb4', '#87ceeb'],
  },
  parrot: {
    type: 'parrot',
    name: '鹦鹉',
    icon: '🦜',
    description: '话匣子打开就停不下来，快乐传播机',
    colors: ['#4ade80', '#22c55e', '#ffcc00', '#ff6b35', '#166534', '#1a1a2e', '#ff6eb4', '#ffffff'],
  },
  otter: {
    type: 'otter',
    name: '水獭',
    icon: '🦦',
    description: '永远在玩，手拉手睡觉的小可爱',
    colors: ['#8b6914', '#6b4e11', '#f5e6c8', '#a0822b', '#3d2b0a', '#1a1a2e', '#ffcc00', '#87ceeb'],
  },
  hedgehog: {
    type: 'hedgehog',
    name: '刺猬',
    icon: '🦔',
    description: '外表扎人内心柔软，慢热但真诚',
    colors: ['#8b7355', '#6b5840', '#f5e6c8', '#a08b6b', '#3d3020', '#1a1a2e', '#ffcc00', '#ffffff'],
  },
}

// 像素帧类型
type PixelFrame = number[][]

export interface AnimalSprite {
  idle: PixelFrame[]
  eat: PixelFrame[]
  play: PixelFrame[]
  sleep: PixelFrame[]
  happy: PixelFrame[]
}

// --- 奶牛猫 (黑白花纹 + 竖耳) ---
const tuxedoIdle1: PixelFrame = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,1,0,0,0,0,0,2,2,0,0,0,0],
  [0,0,1,1,1,1,0,0,0,2,2,2,2,0,0,0],
  [0,0,1,1,1,2,2,2,2,2,2,1,1,0,0,0],
  [0,0,1,1,2,2,2,2,2,2,2,2,1,0,0,0],
  [0,0,1,5,5,2,2,2,2,5,5,2,1,0,0,0],
  [0,0,1,5,7,2,2,2,2,5,7,2,1,0,0,0],
  [0,0,1,1,2,2,4,2,2,2,1,1,1,0,0,0],
  [0,0,1,2,2,2,2,2,2,2,2,1,1,0,0,0],
  [0,0,0,1,2,2,2,2,2,2,1,1,0,0,0,0],
  [0,0,1,1,2,2,2,2,2,2,2,1,1,0,0,0],
  [0,0,1,1,1,2,2,2,2,1,1,1,1,0,0,0],
  [0,0,1,1,1,2,2,2,2,2,1,1,1,0,0,0],
  [0,0,0,1,1,0,0,0,0,0,2,2,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

const tuxedoIdle2: PixelFrame = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,1,0,0,0,0,0,2,2,0,0,0,0],
  [0,0,1,1,1,1,0,0,0,2,2,2,2,0,0,0],
  [0,0,1,1,1,2,2,2,2,2,2,1,1,0,0,0],
  [0,0,1,1,2,2,2,2,2,2,2,2,1,0,0,0],
  [0,0,1,5,5,2,2,2,2,5,5,2,1,0,0,0],
  [0,0,1,5,7,2,2,2,2,5,7,2,1,0,0,0],
  [0,0,1,1,2,2,4,2,2,2,1,1,1,0,0,0],
  [0,0,1,2,2,2,2,2,2,2,2,1,1,0,0,0],
  [0,0,0,1,2,2,2,2,2,2,1,1,0,0,0,0],
  [0,0,1,1,2,2,2,2,2,2,2,1,1,0,0,0],
  [0,0,1,1,1,2,2,2,2,1,1,1,1,0,0,0],
  [0,0,1,1,1,2,2,2,2,2,1,1,1,0,0,0],
  [0,0,0,1,1,0,0,0,0,0,2,2,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
]

// --- 通用精灵生成器 ---
function generateSprite(
  earType: 'pointed' | 'round' | 'long' | 'floppy' | 'none',
  tailType: 'long' | 'short' | 'fluffy' | 'none',
  accent: number // 用第几号色做花纹
): AnimalSprite {
  const baseBody: PixelFrame = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,1,5,5,1,1,1,5,5,1,0,0,0,0],
    [0,0,0,1,5,8,1,1,1,5,8,1,0,0,0,0],
    [0,0,0,1,1,1,1,5,1,1,1,1,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ]

  const withEars = baseBody.map(row => [...row])
  if (earType === 'pointed') {
    withEars[2][4] = 1; withEars[2][10] = 1
    withEars[3][4] = 1; withEars[3][5] = 1; withEars[3][9] = 1; withEars[3][10] = 1
  } else if (earType === 'round') {
    withEars[2][4] = 1; withEars[2][5] = 1; withEars[2][9] = 1; withEars[2][10] = 1
  } else if (earType === 'long') {
    withEars[1][4] = 1; withEars[1][10] = 1
    withEars[2][4] = 1; withEars[2][10] = 1
  } else if (earType === 'floppy') {
    withEars[4][2] = 1; withEars[5][2] = 1; withEars[4][12] = 1; withEars[5][12] = 1
  }

  const frame2 = withEars.map(row => [...row])
  if (tailType === 'long') {
    frame2[12][12] = 1; frame2[13][12] = 1; frame2[13][13] = 1; frame2[14][13] = 1
  } else if (tailType === 'fluffy') {
    frame2[11][12] = 1; frame2[12][12] = 1; frame2[12][13] = 1; frame2[11][13] = 1
  } else if (tailType === 'short') {
    frame2[12][12] = 1; frame2[13][12] = 1
  }

  // 加花纹
  if (accent > 0) {
    withEars[4][5] = accent; withEars[4][9] = accent
    frame2[4][5] = accent; frame2[4][9] = accent
  }

  const sleepFrame: PixelFrame = Array.from({ length: 16 }, () => Array(16).fill(0))
  for (let y = 8; y <= 12; y++) for (let x = 3; x <= 12; x++) sleepFrame[y][x] = 1
  sleepFrame[8][5] = 5; sleepFrame[8][6] = 5; sleepFrame[8][9] = 5; sleepFrame[8][10] = 5

  const happyFrame = withEars.map(row => [...row])
  happyFrame[1][3] = 7; happyFrame[1][11] = 7 // 星星

  return {
    idle: [withEars, frame2],
    eat: [withEars, frame2, withEars],
    play: [frame2, withEars, frame2],
    sleep: [sleepFrame, sleepFrame],
    happy: [happyFrame, frame2],
  }
}

export const ANIMAL_SPRITES: Record<AnimalType, AnimalSprite> = {
  'tuxedo-cat': {
    idle: [tuxedoIdle1, tuxedoIdle2],
    eat: [tuxedoIdle1, tuxedoIdle2, tuxedoIdle1],
    play: [tuxedoIdle2, tuxedoIdle1, tuxedoIdle2],
    sleep: [tuxedoIdle1, tuxedoIdle1],
    happy: [tuxedoIdle1, tuxedoIdle2],
  },
  'orange-cat': generateSprite('pointed', 'long', 2),
  ragdoll: generateSprite('pointed', 'fluffy', 3),
  fox: generateSprite('pointed', 'fluffy', 2),
  rabbit: generateSprite('long', 'short', 0),
  shiba: generateSprite('pointed', 'fluffy', 3),
  beagle: generateSprite('floppy', 'short', 3),
  golden: generateSprite('floppy', 'fluffy', 2),
  hamster: generateSprite('round', 'none', 3),
  deer: generateSprite('pointed', 'short', 2),
  bear: generateSprite('round', 'short', 0),
  'red-panda': generateSprite('round', 'fluffy', 3),
  wolf: generateSprite('pointed', 'long', 0),
  owl: generateSprite('pointed', 'none', 2),
  snake: generateSprite('none', 'long', 2),
  'black-cat': generateSprite('pointed', 'long', 4),
  penguin: generateSprite('none', 'none', 3),
  parrot: generateSprite('none', 'short', 3),
  otter: generateSprite('round', 'long', 3),
  hedgehog: generateSprite('none', 'none', 2),
}
