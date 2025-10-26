export interface PropertyWeight {
  [key: string]: number;
}

export interface UserPreference {
  propertyWeights: Record<string, number>;
  favoriteScents: string[];
  allergies: string[];
}

export interface Oil {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category?: string;
  properties: {
    [key: string]: number;
  };
  scent: string;
}

export interface Symptom {
  id: string;
  label: string;
  category: string;
}

export interface Goal {
  id: string;
  label: string;
  category: string;
}

export const symptoms: Symptom[] = [
  { id: "stress", label: "Стресс", category: "emotional" },
  { id: "mood", label: "Плохое настроение", category: "emotional" },
  { id: "anger", label: "Гнев", category: "emotional" },
  { id: "fear", label: "Страх", category: "emotional" },
  { id: "shame", label: "Стыд", category: "emotional" },
  { id: "grief", label: "Горе", category: "emotional" },
  { id: "insomnia", label: "Бессонница", category: "physical" },
  { id: "fatigue", label: "Усталость", category: "physical" },
  { id: "headache", label: "Головная боль", category: "physical" },
  { id: "cold", label: "Простуда", category: "physical" },
  { id: "anxiety", label: "Тревожность", category: "mental" },
  { id: "focus", label: "Проблемы с концентрацией", category: "mental" },
  { id: "digestion", label: "Проблемы с пищеварением", category:"physical" },
  { id: "skinIssues", label: "Проблемы с кожей", category: "physical" },
  { id: "muscleAche", label: "Мышечные боли", category: "physical" },
  { id: "depression", label: "Депрессия", category: "mental" },
  { id: "panic", label: "Панические атаки", category: "mental" },
  { id: "adhd", label: "СДВГ", category: "mental" },
  { id: "ocd", label: "ОКР", category: "mental" },
  { id: "ptsd", label: "ПТСР", category: "mental" },
  { id: "irritability", label: "Раздражительность", category: "emotional" },
];

export const goals: Goal[] = [
  { id: "relaxation", label: "Расслабление", category: "emotional" },
  { id: "selfEsteem", label: "Повышение самооценки", category: "emotional" },
  { id: "emotionalBalance", label: "Эмоциональный баланс", category: "emotional" },
  { id: "emotionalHealing", label: "Эмоциональное исцеление", category: "emotional" },
  { id: "concentration", label: "Концентрация", category: "mental" },
  { id: "energy", label: "Повышение энергии", category: "physical" },
  { id: "sleep", label: "Улучшение сна", category: "physical" },
  { id: "immunity", label: "Укрепление иммунитета", category: "physical" },
  { id: "breathing", label: "Облегчение дыхания", category: "physical" },
  { id: "moodBoost", label: "Улучшение настроения", category: "emotional" },
  { id: "stressRelief", label: "Снятие стресса", category: "emotional" },
  { id: "mentalClarity", label: "Ясность мышления", category: "mental" },
  { id: "skinHealth", label: "Здоровье кожи", category: "physical" },
  { id: "creativity", label: "Развитие креативности", category: "mental" },
  { id: "mindfulness", label: "Осознанность", category: "mental" },
  { id: "decisionMaking", label: "Улучшение принятия решений", category: "mental" },
  { id: "socialConnection", label: "Улучшение социальных связей", category: "emotional" },
  { id: "empathy", label: "Развитие эмпатии", category: "emotional" },
  { id: "resilience", label: "Повышение устойчивости", category: "mental" },
  { id: "positiveThinking", label: "Позитивное мышление", category: "mental" },
];

export const oils: Oil[] = [
  {
    id: "lavender",
    name: "Лаванда",
    description: "Успокаивающее масло с широким спектром применения для эмоционального баланса и релаксации.",
    image: "https://i.ibb.co/QNsKNJj/image.jpg",
    price: 3067,
    category: "Цветочные",
    properties: {
      relaxation: 0.9,
      sleep: 0.8,
      stress: 0.7,
      anger: 0.6,
      selfEsteem: 0.5,
      emotionalBalance: 0.8,
      emotionalHealing: 0.7
    },
    scent: "floral"
  },
  {
    id: "peppermint",
    name: "Мята перечная",
    description: "Освежающее масло, помогает сосредоточиться и облегчает дыхание.",
    image: "https://i.ibb.co/2yQp7sQ/image.jpg",
    price: 2907,
    category: "Мятные",
    properties: {
      focus: 0.8,
      energy: 0.7,
      breathing: 0.9
    },
    scent: "minty"
  },
  {
    id: "basil",
    name: "Базилик",
    description: "Освежающее и стимулирующее масло, помогает сосредоточиться и снять напряжение.",
    image: "https://i.ibb.co/x5qhYRy/image.jpg",
    price: 4667,
    category: "Травы",
    properties: {
      concentration: 0.8,
      stress: 0.7,
      headache: 0.6
    },
    scent: "herbal"
  },
  {
    id: "bergamot",
    name: "Бергамот",
    description: "Цитрусовое масло для улучшения настроения и эмоционального баланса.",
    image: "https://i.ibb.co/FKGV1Wm/image.jpg",
    price: 4707,
    category: "Цитрусовые",
    properties: {
      mood: 0.9,
      stress: 0.8,
      sleep: 0.6,
      anger: 0.7,
      selfEsteem: 0.8,
      emotionalBalance: 0.9,
      fear: 0.7
    },
    scent: "citrus"
  },
  {
    id: "frankincense",
    name: "Ладан",
    description: "Древесное масло для медитации и эмоционального исцеления.",
    image: "https://i.ibb.co/x7t6Hb6/image.jpg",
    price: 9867,
    category: "Древесные",
    properties: {
      emotionalHealing: 0.9,
      meditation: 0.9,
      selfEsteem: 0.8,
      emotionalBalance: 0.8,
      grief: 0.7,
      shame: 0.8
    },
    scent: "woody"
  },
  {
    id: "zendocrine",
    name: "Zendocrine",
    description: "Смесь для поддержки естественных процессов детоксикации организма.",
    image: "https://i.ibb.co/rprqMr9/Zendocrine.jpg",
    price: 3467,
    category: "Смеси",
    properties: {
      detox: 0.9,
      digestion: 0.7,
      immunity: 0.6
    },
    scent: "woody"
  },
  {
  id: "black-spruce",
  name: "Черная Ель",
  description: "Освежающее хвойное масло с успокаивающим эффектом.",
  image: "https://i.ibb.co/6BBK1kW/image.jpg",
  price: 2587,
  category: "Древесные",
  properties: {
    breathing: 0.8,
    relaxation: 0.7,
    immunity: 0.6
  },
  scent: "woody"
},
{
  id: "blue-tansy",
  name: "Голубая Пижма",
  description: "Успокаивающее масло с противовоспалительными свойствами.",
  image: "https://i.ibb.co/crP63hN/image.jpg",
  price: 11093,
  category: "Цветочные",
  properties: {
    skinHealth: 0.9,
    relaxation: 0.8,
    immunity: 0.7
  },
  scent: "floral"
},
{
  id: "cardamom",
  name: "Кардамон",
  description: "Пряное масло, помогающее пищеварению и дыханию.",
  image: "https://i.ibb.co/f0CLnSy/image.jpg",
  price: 3813,
  category: "Пряные",
  properties: {
    digestion: 0.8,
    breathing: 0.7,
    energy: 0.6
  },
  scent: "spicy"
},
{
  id: "cedarwood",
  name: "Кедр",
  description: "Древесное масло с успокаивающим и заземляющим эффектом.",
  image: "https://i.ibb.co/BCdvLhY/photo-2024-12-08-16-04-31.jpg",
  price: 1867,
  category: "Древесные",
  properties: {
    relaxation: 0.8,
    skinHealth: 0.7,
    focus: 0.6
  },
  scent: "woody"
},
{
  id: "celery-seed",
  name: "Сельдерей",
  description: "Очищающее масло, поддерживающее здоровое пищеварение.",
  image: "https://i.ibb.co/q7fvKqG/image.jpg",
  price: 4707,
  category: "Травы",
  properties: {
    digestion: 0.9,
    detox: 0.8,
    immunity: 0.6
  },
  scent: "herbal"
},
{
  id: "cinnamon",
  name: "Корица",
  description: "Согревающее масло с антимикробными свойствами.",
  image: "https://i.ibb.co/MBNmPzV/image.jpg",
  price: 4333,
  category: "Пряные",
  properties: {
    immunity: 0.8,
    energy: 0.7,
    digestion: 0.6
  },
  scent: "spicy"
},
{
  id: "clary-sage",
  name: "Шалфей Мускатный",
  description: "Успокаивающее масло для эмоционального баланса и уверенности.",
  image: "https://i.ibb.co/K6957cv/image.jpg",
  price: 4800,
  category: "Травы",
  properties: {
    emotionalBalance: 0.9,
    selfEsteem: 0.8,
    relaxation: 0.8,
    anger: 0.7,
    stress: 0.7,
    fear: 0.6
  },
  scent: "herbal"
},
{
  id: "clove",
  name: "Гвоздика",
  description: "Согревающее масло с сильными антиоксидантными свойствами.",
  image: "https://i.ibb.co/6Ydq7VY/image.jpg",
  price: 2320,
  category: "Пряные",
  properties: {
    immunity: 0.9,
    painRelief: 0.8,
    digestion: 0.6
  },
  scent: "spicy"
},
{
  id: "copaiba",
  name: "Копайба",
  description: "Успокаивающее масло с противовоспалительными свойствами.",
  image: "https://i.ibb.co/f0Nmgmc/image.jpg",
  price: 4800,
  category: "Древесные",
  properties: {
    inflammation: 0.9,
    relaxation: 0.7,
    skinHealth: 0.6
  },
  scent: "woody"
},
{
  id: "coriander",
  name: "Кориандр",
  description: "Освежающее масло, поддерживающее здоровое пищеварение.",
  image: "https://i.ibb.co/Yk6p4Mp/image.jpg",
  price: 3227,
  category: "Травы",
  properties: {
    digestion: 0.8,
    detox: 0.7,
    mood: 0.6
  },
  scent: "herbal"
},
{
  id: "cypress",
  name: "Кипарис",
  description: "Освежающее масло, помогающее при отеках и улучшающее кровообращение.",
  image: "https://i.ibb.co/NrMGXsj/image.jpg",
  price: 2347,
  category: "Древесные",
  properties: {
    circulation: 0.8,
    breathing: 0.7,
    skinHealth: 0.6
  },
  scent: "woody"
},
{
  id: "fennel",
  name: "Фенхель",
  description: "Сладковатое масло, поддерживающее здоровое пищеварение и гормональный баланс.",
  image: "https://i.ibb.co/rF3r6yP/image.jpg",
  price: 2213,
  category: "Травы",
  properties: {
    digestion: 0.9,
    hormoneBalance: 0.7,
    breathing: 0.6
  },
  scent: "sweet"
},
{
  id: "geranium",
  name: "Герань",
  description: "Цветочное масло, балансирующее эмоции и улучшающее состояние кожи.",
  image: "https://i.ibb.co/Xs40NJ0/photo-2024-12-08-16-08-40.jpg",
  price: 5960,
  category: "Цветочные",
  properties: {
    skinHealth: 0.9,
    moodBalance: 0.8,
    stress: 0.7
  },
  scent: "floral"
},
{
  id: "ginger",
  name: "Имбирь",
  description: "Согревающее масло, помогающее при тошноте и улучшающее пищеварение.",
  image: "https://i.ibb.co/02ccWQy/image.jpg",
  price: 6400,
  category: "Пряные",
  properties: {
    digestion: 0.9,
    nausea: 0.8,
    circulation: 0.7
  },
  scent: "spicy"
},
{
  id: "grapefruit",
  name: "Грейпфрут",
  description: "Бодрящее цитрусовое масло, поднимающее настроение и поддерживающее здоровый вес.",
  image: "https://i.ibb.co/Rz5MRXs/image.jpg",
  price: 2267,
  category: "Цитрусовые",
  properties: {
    mood: 0.9,
    weightManagement: 0.8,
    detox: 0.7
  },
  scent: "citrus"
},
{
  id: "green-mandarin",
  name: "Зелёный Мандарин",
  description: "Освежающее цитрусовое масло, успокаивающее нервную систему.",
  image: "https://i.ibb.co/4MGZxj9/image.jpg",
  price: 3693,
  category: "Цитрусовые",
  properties: {
    relaxation: 0.8,
    digestion: 0.7,
    mood: 0.9
  },
  scent: "citrus"
},
{
  id: "guaiacwood",
  name: "Гваяковое Дерево",
  description: "Древесное масло с успокаивающим и заземляющим эффектом.",
  image: "https://i.ibb.co/1RJ3Qms/image.jpg",
  price: 2470,
  category: "Древесные",
  properties: {
    relaxation: 0.9,
    skinHealth: 0.7,
    meditation: 0.8
  },
  scent: "woody"
},
{
  id: "helichrysum",
  name: "Бессмертник",
  description: "Восстанавливающее масло, улучшающее состояние кожи и поддерживающее здоровье сердечно-сосудистой системы.",
  image: "https://i.ibb.co/NV0h6yM/image.jpg",
  price: 10107,
  category: "Цветочные",
  properties: {
    skinHealth: 0.9,
    circulation: 0.8,
    inflammation: 0.7
  },
  scent: "floral"
},
{
  id: "jasmine",
  name: "Жасмин",
  description: "Экзотическое цветочное масло, поднимающее настроение и усиливающее чувственность.",
  image: "https://i.ibb.co/X2Fd1x2/image.jpg",
  price: 5787,
  category: "Цветочные",
  properties: {
    mood: 0.9,
    romance: 0.8,
    skinHealth: 0.7
  },
  scent: "floral"
},
{
  id: "juniper-berry",
  name: "Можжевельник",
  description: "Очищающее масло, поддерживающее здоровье кожи и мочевыводящих путей.",
  image: "https://i.ibb.co/PzHHLR8/image.jpg",
  price: 2933,
  category: "Древесные",
  properties: {
    detox: 0.9,
    skinHealth: 0.8,
    urinaryHealth: 0.7
  },
  scent: "woody"
},
{
  id: "lemon",
  name: "Лимон",
  description: "Освежающее цитрусовое масло, очищающее и поднимающее настроение.",
  image: "https://i.ibb.co/m4L8vST/image.jpg",
  price: 1733,
  category: "Цитрусовые",
  properties: {
    mood: 0.9,
    detox: 0.8,
    focus: 0.7
  },
  scent: "citrus"
},
{
  id: "lemongrass",
  name: "Лемонграсс",
  description: "Освежающее травяное масло с очищающими и тонизирующими свойствами.",
  image: "https://i.ibb.co/0Y6RrXQ/photo-2024-12-08-17-13-04.jpg",
  price: 1480,
  category: "Травы",
  properties: {
    detox: 0.8,
    mood: 0.7,
    muscleRelaxation: 0.6
  },
  scent: "citrus"
},
{
  id: "lime",
  name: "Лайм",
  description: "Бодрящее цитрусовое масло, очищающее и поднимающее настроение.",
  image: "https://i.ibb.co/Hn2zsHC/image.jpg",
  price: 1867,
  category: "Цитрусовые",
  properties: {
    mood: 0.9,
    energy: 0.8,
    detox: 0.7
  },
  scent: "citrus"
},
{
  id: "madagascar-vanilla",
  name: "Мадагаскарская Ваниль",
  description: "Сладкое, успокаивающее масло с антиоксидантными свойствами.",
  image: "https://i.ibb.co/CzYhcCs/photo-2024-12-08-17-11-20.jpg",
  price: 4933,
  category: "Пряные",
  properties: {
    relaxation: 0.9,
    mood: 0.8,
    skinHealth: 0.7
  },
  scent: "sweet"
},
{
  id: "myrrh",
  name: "Мирра",
  description: "Древнее масло с успокаивающими и омолаживающими свойствами.",
  image: "https://i.ibb.co/9Zjwq1J/image.jpg",
  price: 9067,
  category: "Древесные",
  properties: {
    skinHealth: 0.9,
    meditation: 0.8,
    immunity: 0.7
  },
  scent: "woody"
},
{
  id: "neroli",
  name: "Нероли",
  description: "Нежное цветочное масло для эмоционального баланса и уверенности в себе.",
  image: "https://i.ibb.co/F3DJhzz/image.jpg",
  price: 5467,
  category: "Цветочные",
  properties: {
    relaxation: 0.9,
    selfEsteem: 0.9,
    emotionalBalance: 0.8,
    fear: 0.7,
    shame: 0.8,
    anger: 0.6
  },
  scent: "floral"
},
{
  id: "oregano",
  name: "Орегано",
  description: "Мощное масло с антибактериальными и противогрибковыми свойствами.",
  image: "https://i.ibb.co/LR7GFyY/image.jpg",
  price: 3453,
  category: "Травы",
  properties: {
    immunity: 0.9,
    respiratory: 0.8,
    digestion: 0.7
  },
  scent: "herbal"
},
{
  id: "patchouli",
  name: "Пачули",
  description: "Землистое масло с успокаивающими и заземляющими свойствами.",
  image: "https://i.ibb.co/1v9ySy9/image.jpg",
  price: 4027,
  category: "Древесные",
  properties: {
    skinHealth: 0.9,
    grounding: 0.8,
    mood: 0.7
  },
  scent: "woody"
},
{
  id: "roman-chamomile",
  name: "Римская Ромашка",
  description: "Успокаивающее масло, помогающее при стрессе и бессоннице.",
  image: "https://i.ibb.co/dsZzPG2/image.jpg",
  price: 6400,
  category: "Цветочные",
  properties: {
    relaxation: 0.9,
    sleep: 0.8,
    skinHealth: 0.7
  },
  scent: "floral"
},
{
  id: "rose",
  name: "Роза",
  description: "Роскошное цветочное масло для эмоционального баланса и повышения самооценки.",
  image: "https://i.ibb.co/KWy1NJ4/image.jpg",
  price: 8867,
  category: "Цветочные",
  properties: {
    emotionalBalance: 0.9,
    selfEsteem: 0.9,
    emotionalHealing: 0.8,
    grief: 0.8,
    shame: 0.7,
    fear: 0.6
  },
  scent: "floral"
},
{
  id: "rosemary",
  name: "Розмарин",
  description: "Бодрящее травяное масло, улучшающее концентрацию и память.",
  image: "https://i.ibb.co/yY3Ps8M/image.jpg",
  price: 2267,
  category: "Травы",
  properties: {
    focus: 0.9,
    memory: 0.8,
    hairHealth: 0.7
  },
  scent: "herbal"
},
{
  id: "sandalwood",
  name: "Сандаловое Дерево",
  description: "Экзотическое древесное масло для медитации и эмоционального баланса.",
  image: "https://i.ibb.co/ypzr8c1/image.jpg",
  price: 10400,
  category: "Древесные",
  properties: {
    meditation: 0.9,
    emotionalBalance: 0.8,
    selfEsteem: 0.7,
    emotionalHealing: 0.8,
    anger: 0.6,
    fear: 0.7
  },
  scent: "woody"
},
{
  id: "siberian-fir",
  name: "Сибирская Пихта",
  description: "Освежающее хвойное масло, поддерживающее здоровье дыхательной системы.",
  image: "https://i.ibb.co/GvzCH8q/image.jpg",
  price: 2587,
  category: "Древесные",
  properties: {
    breathing: 0.9,
    muscleRelaxation: 0.8,
    energy: 0.7
  },
  scent: "woody"
},
{
  id: "tangerine",
  name: "Мандарин",
  description: "Сладкое цитрусовое масло, поднимающее настроение и способствующее расслаблению.",
  image: "https://i.ibb.co/VtCkxVt/image.jpg",
  price: 2000,
  category: "Цитрусовые",
  properties: {
    mood: 0.9,
    relaxation: 0.8,
    digestion: 0.7
  },
  scent: "citrus"
},
{
  id: "tea-tree",
  name: "Чайное Дерево",
  description: "Очищающее масло с сильными антибактериальными свойствами.",
  image: "https://i.ibb.co/Srn8Csy/image.jpg",
  price: 2800,
  category: "Древесные",
  properties: {
    skinHealth: 0.9,
    immunity: 0.8,
    respiratory: 0.7
  },
  scent: "medicinal"
},
{
  id: "thyme",
  name: "Тимьян",
  description: "Очищающее травяное масло, поддерживающее здоровье дыхательной и иммунной систем.",
  image: "https://i.ibb.co/vDYk5nz/image.jpg",
  price: 3950,
  category: "Травы",
  properties: {
    immunity: 0.9,
    respiratory: 0.8,
    digestion: 0.7
  },
  scent: "herbal"
},
{
  id: "turmeric",
  name: "Куркума",
  description: "Пряное масло с мощными противовоспалительными свойствами.",
  image: "https://i.ibb.co/j6DF6Vx/image.jpg",
  price: 4027,
  category: "Пряные",
  properties: {
    inflammation: 0.9,
    immunity: 0.8,
    skinHealth: 0.7
  },
  scent: "spicy"
},
{
  id: "vetiver",
  name: "Ветивер",
  description: "Землистое масло с успокаивающими и заземляющими свойствами.",
  image: "https://i.ibb.co/qBhZdq9/image.jpg",
  price: 7400,
  category: "Травы",
  properties: {
    grounding: 0.9,
    relaxation: 0.8,
    focus: 0.7
  },
  scent: "earthy"
},
{
  id: "wild-orange",
  name: "Дикий Апельсин",
  description: "Бодрящее цитрусовое масло, поднимающее настроение и очищающее.",
  image: "https://i.ibb.co/2SjNZp6/image.jpg",
  price: 1493,
  category: "Цитрусовые",
  properties: {
    mood: 0.9,
    energy: 0.8,
    detox: 0.7
  },
  scent: "citrus"
},
{
  id: "wintergreen",
  name: "Грушанка",
  description: "Освежающее масло, помогающее при мышечных болях и дискомфорте.",
  image: "https://i.ibb.co/vBgJysT/image.jpg",
  price: 3333,
  category: "Травы",
  properties: {
    muscleRelaxation: 0.9,
    painRelief: 0.8,
    cooling: 0.7
  },
  scent: "minty"
},
{
  id: "ylang-ylang",
  name: "Иланг-Иланг",
  description: "Экзотическое цветочное масло для эмоционального баланса и повышения самооценки.",
  image: "https://i.ibb.co/pZMWZvB/image.jpg",
  price: 5427,
  category: "Цветочные",
  properties: {
    relaxation: 0.9,
    mood: 0.8,
    selfEsteem: 0.9,
    emotionalBalance: 0.8,
    anger: 0.6,
    shame: 0.7
  },
  scent: "floral"
},
{
  id: "eucalyptus",
  name: "Эвкалипт",
  description: "Освежающее масло, поддерживающее здоровье дыхательной системы.",
  image: "https://i.ibb.co/cXKSbL7/image.jpg",
  price: 2467,
  category: "Древесные",
  properties: {
    breathing: 0.9,
    immunity: 0.8,
    muscleRelaxation: 0.7
  },
  scent: "medicinal"
},
{
  id: "adaptiv",
  name: "Adaptiv",
  description: "Помогает справиться со стрессом и адаптироваться к новым ситуациям.",
  image: "https://i.ibb.co/3mDncyF/Adaptiv.jpg",
  price: 5427,
  category: "Смеси",
  properties: {
    stress: 0.9,
    anxiety: 0.8,
    mood: 0.7
  },
  scent: "balanced"
},
{
  id: "att",
  name: "ATT",
  description: "Поддерживает концентрацию внимания и ясность мышления.",
  image: "https://i.ibb.co/9Hr7kvJ/image.jpg",
  price: 3760,
  category: "Смеси",
  properties: {
    focus: 0.9,
    concentration: 0.8,
    mentalClarity: 0.7
  },
  scent: "fresh"
},
{
  id: "balance",
  name: "Баланс",
  description: "Способствует общему ощущению гармонии и спокойствия.",
  image: "https://i.ibb.co/cYzWvFV/image.jpg",
  price: 3000,
  category: "Смеси",
  properties: {
    grounding: 0.9,
    relaxation: 0.8,
    emotionalBalance: 0.7
  },
  scent: "woody"
  },
  {
    id: "breathe",
    name: "Breathe",
    description: "Поддерживает здоровье дыхательной системы и облегчает дыхание.",
    image: "https://i.ibb.co/MRtCRCX/Breathe.jpg",
    price: 3133,
    category: "Смеси",
    properties: {
      breathing: 0.9,
      respiratory: 0.8,
      clarity: 0.7
    },
    scent: "minty"
  },
  {
    id: "citrus-bliss",
    name: "Citrus Bliss",
    description: "Энергизирующая смесь цитрусовых масел для поднятия настроения.",
    image: "https://i.ibb.co/1dbsZcQ/Citrus-Bliss.jpg",
    price: 2933,
    category: "Смеси",
    properties: {
      mood: 0.9,
      energy: 0.8,
      positivity: 0.7
    },
    scent: "citrus"
  },
  {
    id: "citrus-bloom",
    name: "Citrus Bloom",
    description: "Освежающая весенняя смесь для бодрости и оптимизма.",
    image: "https://i.ibb.co/7CkBKzQ/Citrus-Bloom.jpg",
    price: 3507,
    category: "Смеси",
    properties: {
      mood: 0.9,
      energy: 0.8,
      freshness: 0.7
    },
    scent: "floral-citrus"
  },
  {
    id: "clary-calm",
    name: "Clary Calm",
    description: "Успокаивающая смесь для поддержки гормонального баланса.",
    image: "https://i.ibb.co/xY7mp0v/Clary-Calm.jpg",
    price: 3933,
    category: "Смеси",
    properties: {
      hormoneBalance: 0.9,
      relaxation: 0.8,
      emotionalSupport: 0.7
    },
    scent: "floral"
  },
  {
    id: "purify",
    name: "Чистота",
    description: "Освежающая смесь для очищения воздуха и поверхностей.",
    image: "https://i.ibb.co/GdL80CW/image.jpg",
    price: 4187,
    category: "Смеси",
    properties: {
      purification: 0.9,
      freshness: 0.8,
      cleansing: 0.7
    },
    scent: "fresh"
  },
  {
    id: "deep-blue",
    name: "Deep Blue",
    description: "Охлаждающая и успокаивающая смесь для мышц и суставов.",
    image: "https://i.ibb.co/rZ6z160/Deep-Blue.jpg",
    price: 4333,
    category: "Смеси",
    properties: {
      muscleRelaxation: 0.9,
      cooling: 0.8,
      soothing: 0.7
    },
    scent: "minty"
  },
  {
    id: "digest-zen",
    name: "Digest Zen",
    description: "Поддерживает здоровое пищеварение и комфорт желудочно-кишечного тракта.",
    image: "https://i.ibb.co/XDMNbgb/photo-2024-12-08-16-14-31.jpg",
    price: 4680,
    category: "Смеси",
    properties: {
      digestion: 0.9,
      stomachComfort: 0.8,
      nausea: 0.7
    },
    scent: "spicy-sweet"
  },
  {
    id: "ddr-prime",
    name: "DDR Prime",
    description: "Поддерживает здоровье клеток и защитные функции организма.",
    image: "https://i.ibb.co/PT9cSbx/DDR-Prime.jpg",
    price: 4667,
    category: "Смеси",
    properties: {
      cellularHealth: 0.9,
      immunity: 0.8,
      antioxidant: 0.7
    },
    scent: "spicy-herbal"
  },
  {
    id: "forgive",
    name: "Forgive",
    description: "Способствует чувствам прощения, облегчения и терпения.",
    image: "https://i.ibb.co/g7WxLNF/Forgive.jpg",
    price: 2933,
    category: "Смеси",
    properties: {
      emotionalRelease: 0.9,
      forgiveness: 0.8,
      peace: 0.7
    },
    scent: "herbal-woody"
  },
  {
    id: "motivate",
    name: "Motivate",
    description: "Вдохновляющая смесь для повышения уверенности и мотивации.",
    image: "https://i.ibb.co/VpGHTp7/Motivate.jpg",
    price: 2973,
    category: "Смеси",
    properties: {
      motivation: 0.9,
      confidence: 0.8,
      courage: 0.7
    },
    scent: "citrus-minty"
  },
  {
    id: "northern-lights",
    name: "Северное Сияние",
    description: "Успокаивающая смесь для релаксации и медитации.",
    image: "https://i.ibb.co/x80CXFw/image.jpg",
    price: 4000,
    category: "Смеси",
    properties: {
      relaxation: 0.9,
      meditation: 0.8,
      peace: 0.7
    },
    scent: "woody-floral"
  },
  {
    id: "on-guard",
    name: "On Guard",
    description: "Защитная смесь для поддержки иммунной системы.",
    image: "https://i.ibb.co/vjN93gw/On-Guard.jpg",
    price: 4533,
    category: "Смеси",
    properties: {
      immunity: 0.9,
      protection: 0.8,
      cleansing: 0.7
    },
    scent: "spicy-citrus"
  },
  {
    id: "passion",
    name: "Passion",
    description: "Вдохновляющая смесь для пробуждения энтузиазма и страсти.",
    image: "https://i.ibb.co/MV7xnFW/Passion.jpg",
    price: 5293,
    category: "Смеси",
    properties: {
      passion: 0.9,
      creativity: 0.8,
      excitement: 0.7
    },
    scent: "spicy-herbal"
  },
  {
    id: "peace",
    name: "Peace",
    description: "Успокаивающая смесь для внутреннего мира и уверенности.",
    image: "https://i.ibb.co/0svBsD5/Peace.jpg",
    price: 4307,
    category: "Смеси",
    properties: {
      peace: 0.9,
      reassurance: 0.8,
      contentment: 0.7
    },
    scent: "floral-woody"
  },
  {
    id: "serenity",
    name: "Serenity",
    description: "Расслабляющая смесь для спокойного сна и отдыха.",
    image: "https://i.ibb.co/F5ThBQ7/Serenity.jpg",
    price: 5173,
    category: "Смеси",
    properties: {
      sleep: 0.9,
      relaxation: 0.8,
      calmness: 0.7
    },
    scent: "sweet-woody"
  },
  {
    id: "terrashield",
    name: "TerraShield",
    description: "Защитная смесь от насекомых для использования на открытом воздухе.",
    image: "https://i.ibb.co/gdKVcfz/Terra-Shield.jpg",
    price: 2773,
    category: "Смеси",
    properties: {
      insectRepellent: 0.9,
      outdoorProtection: 0.8,
      naturalDefense: 0.7
    },
    scent: "herbal-woody"
  },
  {
  id: "meta-pwr",
  name: "MetaPWR",
  description: "Supports healthy metabolic function and energy production.",
  image: "https://i.ibb.co/0qFcsGw/Meta-PWR.jpg",
  price: 3573,
  category: "Смеси",
  properties: {
    metabolism: 0.9,
    energy: 0.8,
    focus: 0.7
  },
  scent: "spicy-sweet"
},
{
  id: "onguard-toothpaste",
  name: "Зубная паста doTERRA Оn Guard",
  description: "Натуральная зубная паста с эфирными маслами для защиты и очищения полости рта.",
  image: "https://i.ibb.co/TcrqckZ/photo-6-2024-12-29-05-44-13.jpg",
  price: 1467,
  category: "Уход за полостью рта",
  properties: {
    cleaning: 0.9,
    protection: 0.8,
    freshness: 0.7
  },
  scent: "minty"
},
{
  id: "lifelong-vitality-pack",
  name: "\"Долгожитель\" (ЛЛВ)",
  description: "Комплекс витаминов и минералов для поддержания здоровья и долголетия.",
  image: "https://i.ibb.co/prgFrtn/photo-7-2024-12-29-05-44-13.jpg",
  price: 14533,
  category: "Добавки",
  properties: {
    immunity: 0.9,
    energy: 0.8,
    wellbeing: 0.9
  },
  scent: "neutral"
},
{
  id: "petal-diffuser-wild-orange",
  name: "Диффузор \"Лепесток\" и Дикий апельсин, 5 мл",
  description: "Стильный диффузор для ароматерапии в комплекте с эфирным маслом дикого апельсина.",
  image: "https://i.ibb.co/C6hSJhM/photo-9-2024-12-29-05-44-13.jpg",
  price: 8000,
  category: "Диффузоры",
  properties: {
    aromatherapy: 0.9,
    mood: 0.8,
    airPurification: 0.7
  },
  scent: "citrus"
},
{
  id: "hair-serum",
  name: "Питательная сыворотка для защиты волос \"От корней до кончиков\"",
  description: "Питательная сыворотка для защиты и укрепления волос по всей длине.",
  image: "https://i.ibb.co/f4sW2Lj/photo-4-2024-12-29-05-44-13.jpg",
  price: 4187,
  category: "Уход за волосами",
  properties: {
    hairProtection: 0.9,
    hairNourishment: 0.8,
    hairStrength: 0.7
  },
  scent: "herbal"
},
{
  id: "daily-conditioner",
  name: "Ежедневный кондиционер, 500 мл",
  description: "Ежедневный кондиционер для мягкости и блеска волос.",
  image: "https://i.ibb.co/9sQ8W7V/photo-1-2024-12-29-05-44-13.jpg",
  price: 3520,
  category: "Уход за волосами",
  properties: {
    hairSoftness: 0.9,
    hairShine: 0.8,
    hairManageability: 0.7
  },
  scent: "floral"
},
{
  id: "hd-clear-foaming-face-wash",
  name: "Пенка для умывания doTERRA HD CLEAR",
  description: "Очищающая пенка для лица, помогающая бороться с несовершенствами кожи.",
  image: "https://i.ibb.co/XxbB6br/photo-8-2024-12-29-05-44-13.jpg",
  price: 2773,
  category: "Уход за кожей",
  properties: {
    skinCleansing: 0.9,
    acnePrevention: 0.8,
    oilControl: 0.7
  },
  scent: "fresh"
},
{
  id: "refreshing-body-wash",
  name: "Освежающий гель для душа",
  description: "Освежающий гель для душа с натуральными эфирными маслами.",
  image: "https://i.ibb.co/GMxs6Qm/photo-5-2024-12-29-05-44-13.jpg",
  price: 1720,
  category: "Уход за телом",
  properties: {
    skinCleansing: 0.9,
    refreshing: 0.8,
    moisturizing: 0.7
  },
  scent: "fresh"
},
{
  id: "deep-blue-stick",
  name: "Deep Blue Стик",
  description: "Охлаждающий и успокаивающий стик для снятия мышечного напряжения.",
  image: "https://i.ibb.co/DCHc1wy/photo-3-2024-12-29-05-44-13.jpg",
  price: 5015,
  category: "Уход за телом",
  properties: {
    muscleRelief: 0.9,
    cooling: 0.8,
    antiInflammatory: 0.7
  },
  scent: "minty"
},
{
  id: "protective-shampoo",
  name: "Защитный шампунь",
  description: "Шампунь для защиты и укрепления волос с натуральными компонентами.",
  image: "https://i.ibb.co/M7Zn50y/photo-2-2024-12-29-05-44-13.jpg",
  price: 4847,
  category: "Уход за волосами",
  properties: {
    hairProtection: 0.9,
    hairCleansing: 0.8,
    hairStrength: 0.7
  },
  scent: "herbal"
}

];

export const propertyTranslations = {
  "stress": "Стресс",
  "insomnia": "Бессонница",
  "relaxation": "Расслабление",
  "headache": "Головная боль",
  "concentration": "Концентрация",
  "energy": "Энергия",
  "cold": "Простуда",
  "breathing": "Дыхание",
  "immunity": "Иммунитет",
  "mood": "Настроение",
  "sleep": "Сон",
  "fatigue": "Усталость",
  "anxiety": "Тревожность",
  "focus": "Фокусировка",
  "digestion": "Пищеварение",
  "skinIssues": "Проблемы с кожей",
  "muscleAche": "Мышечные боли",
  "moodBoost": "Улучшение настроения",
  "stressRelief": "Снятие стресса",
  "mentalClarity": "Ясность мышления",
  "skinHealth": "Здоровье кожи",
  "anger": "Гнев",
  "fear": "Страх",
  "shame": "Стыд",
  "grief": "Горе",
  "selfEsteem": "Повышение самооценки",
  "emotionalBalance": "Эмоциональный баланс",
  "emotionalHealing": "Эмоциональное исцеление",
  "meditation": "Медитация",
  "muscleRelaxation": "Расслабление мышц",
  "clarity": "Ясность",
  "respiratory": "Дыхательная система",
  "detox": "Детоксикация",
  "cooling": "Охлаждение",
  "inflammation": "Воспаление",
  "circulation": "Кровообращение",
  "nausea": "Тошнота",
  "weightManagement": "Контроль веса",
  "romance": "Романтика",
  "urinaryHealth": "Здоровье мочевыводящих путей",
  "hairHealth": "Здоровье волос",
  "grounding": "Заземление",
  "positivity": "Позитивный настрой",
  "freshness": "Свежесть",
  "hormoneBalance": "Гормональный баланс",
  "emotionalSupport": "Эмоциональная поддержка",
  "purification": "Очищение",
  "cleansing": "Очищение",
  "soothing": "Успокоение",
  "stomachComfort": "Комфорт желудка",
  "cellularHealth": "Здоровье клеток",
  "antioxidant": "Антиоксидант",
  "forgiveness": "Прощение",
  "peace": "Умиротворение",
  "motivation": "Мотивация",
  "confidence": "Уверенность",
  "courage": "Храбрость",
  "protection": "Защита",
  "passion": "Страсть",
  "creativity": "Творчество",
  "excitement": "Возбуждение",
  "reassurance": "Уверенность",
  "contentment": "Удовлетворенность",
  "calmness": "Спокойствие",
  "insectRepellent": "Отпугивание насекомых",
  "outdoorProtection": "Защита на открытом воздухе",
  "naturalDefense": "Естественная защита",
  "metabolism": "Метаболизм",
  "depression": "Депрессия",
  "panic": "Паника",
  "adhd": "СДВГ",
  "ocd": "ОКР",
  "ptsd": "ПТСР",
  "irritability": "Раздражительность",
  "resilience": "Устойчивость",
  "positiveThinking": "Позитивное мышление",
  "mindfulness": "Осознанность",
  "decisionMaking": "Принятие решений",
  "wellbeing": "Благополучие",
  "hairProtection": "Защита волос",
  "hairNourishment": "Питание волос",
  "hairStrength": "Прочность волос",
  "hairSoftness": "Мягкость волос",
  "hairShine": "Блеск волос",
  "hairManageability": "Управляемость волос",
  "skinCleansing": "Очищение кожи",
  "acnePrevention": "Профилактика акне",
  "oilControl": "Контроль жирности",
  "refreshing": "Освежение",
  "moisturizing": "Увлажнение",
  "muscleRelief": "Расслабление мышц",
  "antiInflammatory": "Противовоспалительное действие",
  "hairCleansing": "Очищение волос",
  "aromatherapy": "Ароматерапия",
  "airPurification": "Очищение воздуха"
};

export const oilCategories = [
  "Все",
  "Цветочные",
  "Цитрусовые",
  "Травы",
  "Древесные",
  "Пряные",
  "Смеси",
  "Мятные",
  "Уход за полостью рта",
  "Добавки",
  "Диффузоры",
  "Уход за волосами",
  "Уход за кожей",
  "Уход за телом"
];
