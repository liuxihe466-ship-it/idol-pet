import type { QuizAnswers, AnimalType } from '../types'
import { ANIMALS } from './animals'

const ALL_ANIMALS: AnimalType[] = Object.keys(ANIMALS) as AnimalType[]

function calculateScores(answers: QuizAnswers) {
  const scores: Record<string, { score: number; reasons: string[] }> = {}
  for (const a of ALL_ANIMALS) scores[a] = { score: 0, reasons: [] }

  const add = (animal: AnimalType, pts: number, reason: string) => {
    scores[animal].score += pts
    if (reason && !scores[animal].reasons.includes(reason)) {
      scores[animal].reasons.push(reason)
    }
  }

  // ========== 性格 (最高权重) ==========
  for (const p of answers.personality) {
    switch (p) {
      case 'dramatic':
        add('tuxedo-cat', 6, '戏精本精的性格')
        add('fox', 2, ''); add('shiba', 2, ''); add('parrot', 3, '')
        break
      case 'mischievous':
        add('beagle', 6, '爱捣蛋的性格')
        add('fox', 5, '小恶魔气质')
        add('tuxedo-cat', 3, ''); add('otter', 4, '爱玩闹的性格')
        break
      case 'talkative':
        add('parrot', 6, '话痨的性格')
        add('orange-cat', 5, '社牛的性格')
        add('golden', 5, '自来熟的热情')
        add('beagle', 3, '')
        break
      case 'shy':
        add('rabbit', 6, '慢热害羞的性格')
        add('deer', 5, '容易受惊的内向')
        add('hedgehog', 6, '外冷内热的性格')
        add('penguin', 5, '社恐的性格')
        add('red-panda', 4, '慢热的温柔')
        break
      case 'foodie':
        add('orange-cat', 6, '吃货的本能')
        add('hamster', 6, '腮帮子塞满食物')
        add('bear', 3, ''); add('otter', 2, '')
        break
      case 'tender':
        add('ragdoll', 6, '温柔体贴的性格')
        add('golden', 5, '暖心的温柔')
        add('deer', 4, ''); add('rabbit', 2, '')
        break
      case 'bossy':
        add('wolf', 6, '霸道强势的气场')
        add('bear', 5, '看着憨实则霸道')
        add('snake', 3, ''); add('black-cat', 3, '')
        break
      case 'funny':
        add('shiba', 6, '搞笑幽默的性格')
        add('beagle', 4, '搞怪活宝')
        add('otter', 4, '欢乐制造机')
        add('orange-cat', 3, ''); add('penguin', 3, '')
        break
    }
  }

  // ========== 日常习惯 ==========
  for (const h of answers.habits) {
    switch (h) {
      case 'night-owl':
        add('owl', 5, '夜猫子的习惯')
        add('black-cat', 5, '暗夜活动的习性')
        add('tuxedo-cat', 3, ''); add('snake', 2, '')
        break
      case 'active':
        add('beagle', 5, '闲不住的活力')
        add('otter', 5, '永远在玩的活力')
        add('shiba', 3, ''); add('golden', 3, '')
        break
      case 'phone':
        add('parrot', 3, ''); add('hamster', 2, '')
        add('penguin', 3, '内心戏丰富')
        break
      case 'tidy':
        add('ragdoll', 3, '爱干净的习惯')
        add('black-cat', 3, ''); add('deer', 2, '')
        break
      case 'singing':
        add('parrot', 4, '随时哼歌的习惯')
        add('golden', 2, ''); add('otter', 2, '')
        break
      case 'sleepy':
        add('orange-cat', 5, '嗜睡的习惯')
        add('red-panda', 5, '爱赖床的懒')
        add('bear', 3, ''); add('hamster', 2, '')
        break
    }
  }

  // ========== 眼睛 ==========
  switch (answers.eyeType) {
    case 'round':
      add('ragdoll', 3, '圆圆的大眼睛')
      add('rabbit', 3, '又圆又亮的眼睛')
      add('hamster', 3, ''); add('owl', 4, '大大的圆眼')
      add('penguin', 3, ''); add('otter', 2, '')
      add('red-panda', 3, ''); add('beagle', 2, '')
      break
    case 'phoenix':
      add('fox', 5, '迷人的凤眼')
      add('wolf', 4, '锐利的眼神')
      add('snake', 4, '冷艳的眼型')
      add('black-cat', 4, '深邃的眼神')
      add('tuxedo-cat', 3, '')
      break
    case 'almond':
      add('deer', 4, '温柔的杏仁眼')
      add('ragdoll', 3, ''); add('golden', 2, '')
      add('hedgehog', 2, ''); add('fox', 2, '')
      break
    case 'crescent':
      add('shiba', 5, '弯弯的笑眼')
      add('golden', 4, '笑起来弯弯的眼')
      add('otter', 4, '弯弯的笑眼')
      add('hamster', 3, ''); add('bear', 2, '')
      break
  }

  // ========== 气质 ==========
  switch (answers.vibe) {
    case 'cute':
      add('rabbit', 4, '甜美可爱的气质')
      add('hamster', 4, '软萌可爱')
      add('penguin', 4, '呆萌可爱')
      add('otter', 3, ''); add('red-panda', 3, '')
      break
    case 'cold':
      add('black-cat', 5, '高冷神秘的气质')
      add('tuxedo-cat', 4, '高冷傲娇')
      add('owl', 4, '深邃高冷')
      add('wolf', 3, ''); add('snake', 3, '')
      break
    case 'sunny':
      add('shiba', 4, '阳光灿烂')
      add('golden', 4, '暖阳般的气质')
      add('beagle', 4, '活力满满')
      add('parrot', 3, ''); add('otter', 3, '')
      break
    case 'gentle':
      add('deer', 4, '温柔如水的气质')
      add('ragdoll', 4, '仙气飘飘')
      add('golden', 3, ''); add('hedgehog', 3, '外冷内热')
      break
    case 'wild':
      add('wolf', 4, '野性十足的气场')
      add('snake', 5, '致命的魅力')
      add('fox', 3, ''); add('black-cat', 3, '')
      break
  }

  // ========== 脸型 ==========
  switch (answers.faceShape) {
    case 'round':
      add('hamster', 3, '圆圆的脸蛋')
      add('bear', 3, ''); add('orange-cat', 3, '')
      add('penguin', 3, ''); add('otter', 2, '')
      break
    case 'oval':
      add('deer', 3, '优雅的脸型')
      add('ragdoll', 3, ''); add('rabbit', 2, '')
      break
    case 'square':
      add('wolf', 3, '棱角分明的轮廓')
      add('bear', 2, ''); add('hedgehog', 2, '')
      break
    case 'heart':
      add('fox', 3, '精致的脸型')
      add('tuxedo-cat', 2, ''); add('black-cat', 2, '')
      break
    case 'long':
      add('snake', 3, '修长的脸型')
      add('wolf', 2, ''); add('beagle', 2, ''); add('parrot', 2, '')
      break
  }

  // ========== 五官特征 ==========
  for (const f of answers.facialFeatures) {
    switch (f) {
      case 'high-nose':
        add('owl', 2, '挺拔的鼻梁')
        add('wolf', 1, ''); add('fox', 1, ''); add('parrot', 2, '')
        break
      case 'thick-lips':
        add('bear', 2, '性感的厚唇')
        add('golden', 1, ''); add('otter', 1, '')
        break
      case 'thin-lips':
        add('snake', 2, '冷艳的薄唇')
        add('rabbit', 1, ''); add('black-cat', 1, '')
        break
      case 'small-nose':
        add('rabbit', 2, '小巧的鼻子')
        add('hamster', 2, ''); add('hedgehog', 2, '')
        break
      case 'dimples':
        add('hamster', 3, '甜甜的酒窝')
        add('shiba', 2, ''); add('golden', 2, '')
        add('otter', 2, '')
        break
      case 'beauty-mark':
        add('fox', 2, '迷人的泪痣')
        add('snake', 2, ''); add('black-cat', 2, '')
        break
    }
  }

  return ALL_ANIMALS.map(animal => ({
    animal,
    score: scores[animal].score,
    reasons: scores[animal].reasons.filter(Boolean).slice(0, 3),
  }))
}

export function matchAnimal(answers: QuizAnswers): { animal: AnimalType; reason: string } {
  const scores = calculateScores(answers)
  scores.sort((a, b) => b.score - a.score)

  const best = scores[0]
  const animalDef = ANIMALS[best.animal]
  const nickname = answers.nickname

  const reasonParts = best.reasons.length > 0 ? best.reasons.join('、') : animalDef.description
  const reason = `因为${nickname}有${reasonParts}，像极了${animalDef.name}——${animalDef.description}！`

  return { animal: best.animal, reason }
}

export function getDefaultReason(animal: AnimalType, nickname: string): string {
  const def = ANIMALS[animal]
  return `${nickname}选择了${def.name}作为自己的动物形态——${def.description}！`
}
