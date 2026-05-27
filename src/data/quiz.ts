export interface QuizQuestion {
  id: string
  title: string
  subtitle: string
  type: 'text' | 'single' | 'multi'
  field: keyof import('../types').QuizAnswers
  options?: { value: string; label: string; icon?: string }[]
  placeholder?: string
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'nickname',
    title: '给你的爱豆起个昵称吧',
    subtitle: '你平时怎么叫TA',
    type: 'text',
    field: 'nickname',
    placeholder: '输入昵称...',
  },
  {
    id: 'gender',
    title: '性别？',
    subtitle: '选择爱豆的性别',
    type: 'single',
    field: 'gender',
    options: [
      { value: 'male', label: '男', icon: '♂️' },
      { value: 'female', label: '女', icon: '♀️' },
      { value: 'other', label: '其他', icon: '⭐' },
    ],
  },
  {
    id: 'eyeType',
    title: '眼睛类型？',
    subtitle: '哪种最像TA的眼睛',
    type: 'single',
    field: 'eyeType',
    options: [
      { value: 'round', label: '圆圆大眼', icon: '👀' },
      { value: 'phoenix', label: '细长凤眼', icon: '🦊' },
      { value: 'almond', label: '杏仁眼', icon: '✨' },
      { value: 'crescent', label: '弯弯笑眼', icon: '🌙' },
    ],
  },
  {
    id: 'facialFeatures',
    title: '五官特点？',
    subtitle: '可以多选哦',
    type: 'multi',
    field: 'facialFeatures',
    options: [
      { value: 'high-nose', label: '高挺鼻梁', icon: '👃' },
      { value: 'thick-lips', label: '厚嘴唇', icon: '👄' },
      { value: 'thin-lips', label: '薄嘴唇', icon: '💋' },
      { value: 'small-nose', label: '小巧鼻子', icon: '🔹' },
      { value: 'dimples', label: '酒窝', icon: '😊' },
      { value: 'beauty-mark', label: '泪痣', icon: '💧' },
    ],
  },
  {
    id: 'faceShape',
    title: '脸型？',
    subtitle: '选择最接近的脸型',
    type: 'single',
    field: 'faceShape',
    options: [
      { value: 'round', label: '圆脸', icon: '🍎' },
      { value: 'oval', label: '鹅蛋脸', icon: '🥚' },
      { value: 'square', label: '方脸', icon: '⬜' },
      { value: 'heart', label: '心形脸', icon: '💜' },
      { value: 'long', label: '长脸', icon: '📏' },
    ],
  },
  {
    id: 'vibe',
    title: '整体气质？',
    subtitle: '最符合TA的气质是',
    type: 'single',
    field: 'vibe',
    options: [
      { value: 'cute', label: '可爱甜美', icon: '🍬' },
      { value: 'cold', label: '高冷禁欲', icon: '🧊' },
      { value: 'sunny', label: '阳光活力', icon: '☀️' },
      { value: 'gentle', label: '温柔治愈', icon: '🌿' },
      { value: 'wild', label: '野性魅惑', icon: '🔥' },
    ],
  },
  {
    id: 'personality',
    title: '爱豆的性格？',
    subtitle: '可以多选，选最突出的',
    type: 'multi',
    field: 'personality',
    options: [
      { value: 'dramatic', label: '神经质/戏精', icon: '🎭' },
      { value: 'mischievous', label: '爱捣蛋/小恶魔', icon: '😈' },
      { value: 'talkative', label: '话痨/社牛', icon: '🗣️' },
      { value: 'shy', label: '社恐/慢热', icon: '🫣' },
      { value: 'foodie', label: '吃货/贪吃', icon: '🍔' },
      { value: 'tender', label: '温柔体贴', icon: '💗' },
      { value: 'bossy', label: '霸道/强势', icon: '👑' },
      { value: 'funny', label: '搞笑/幽默', icon: '😂' },
    ],
  },
  {
    id: 'habits',
    title: '爱豆的日常习惯？',
    subtitle: '可以多选哦',
    type: 'multi',
    field: 'habits',
    options: [
      { value: 'night-owl', label: '夜猫子/熬夜', icon: '🌙' },
      { value: 'active', label: '闲不住/爱运动', icon: '🏃' },
      { value: 'phone', label: '手机不离手', icon: '📱' },
      { value: 'tidy', label: '整理控/爱干净', icon: '🧹' },
      { value: 'singing', label: '随时哼歌', icon: '🎵' },
      { value: 'sleepy', label: '嗜睡/爱赖床', icon: '😴' },
    ],
  },
]
