export type CalculatorTag = 'Health' | 'Fitness' | 'Everyday';

export type CalculatorInputField = {
  name: string;
  label: string;
  type: 'number' | 'select';
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
  helperText?: string;
};

export type CalculatorResult = Record<string, string | number>;

export type FAQItem = {
  question: string;
  answer: string;
};

export type CalculatorDefinition = {
  slug: string;
  name: string;
  shortName?: string;
  description: string;
  tags: CalculatorTag[];
  inputs: CalculatorInputField[];
  compute: (data: Record<string, number | string>) => CalculatorResult;
  formatResult: (result: CalculatorResult) => { title: string; items: { label: string; value: string }[]; insights?: string[] };
  explanation: string;
  formula: string;
  faq: FAQItem[];
};

const round = (value: number, decimals = 1) => Number(value.toFixed(decimals));

export const calculatorRegistry: CalculatorDefinition[] = [
  {
    slug: 'bmi',
    name: 'Body Mass Index',
    shortName: 'BMI',
    description: 'Estimate body fat by relating weight to height using the WHO BMI classification.',
    tags: ['Health', 'Everyday'],
    inputs: [
      { name: 'weight', label: 'Weight (kg)', type: 'number', min: 20, max: 250, step: 0.1 },
      { name: 'height', label: 'Height (cm)', type: 'number', min: 100, max: 230, step: 0.5 },
    ],
    compute: (data) => {
      const weight = Number(data.weight);
      const heightMeters = Number(data.height) / 100;
      const bmi = weight / (heightMeters * heightMeters);
      const idealMin = 18.5 * heightMeters * heightMeters;
      const idealMax = 24.9 * heightMeters * heightMeters;
      const category =
        bmi < 18.5
          ? 'Underweight'
          : bmi < 24.9
          ? 'Normal weight'
          : bmi < 29.9
          ? 'Overweight'
          : bmi < 34.9
          ? 'Obesity class I'
          : bmi < 39.9
          ? 'Obesity class II'
          : 'Obesity class III';
      return {
        bmi: round(bmi, 1),
        category,
        idealRange: `${round(idealMin, 1)} – ${round(idealMax, 1)} kg`,
      };
    },
    formatResult: (result) => ({
      title: `${result.bmi} BMI`,
      items: [
        { label: 'Category', value: String(result.category) },
        { label: 'Ideal weight range', value: String(result.idealRange) },
      ],
      insights: [
        'BMI is a screening tool and does not diagnose the body fatness or health of an individual.',
        'Pair BMI with waist circumference and body composition for a fuller picture.',
      ],
    }),
    explanation: 'BMI compares a person’s weight to the square of their height to estimate relative body fatness.',
    formula: 'BMI = weight (kg) ÷ [height (m)]²',
    faq: [
      {
        question: 'Is BMI accurate for athletes?',
        answer: 'Highly muscular individuals may register higher BMI despite low body fat. Use body composition tests alongside BMI.',
      },
      {
        question: 'What is a healthy BMI range?',
        answer: 'Most adults aim for 18.5 to 24.9, but individual targets vary with age, ethnicity, and health history.',
      },
    ],
  },
  {
    slug: 'calories-tdee',
    name: 'Daily Calorie & TDEE Calculator',
    shortName: 'TDEE',
    description: 'Estimate basal metabolic rate and total daily energy expenditure using the Mifflin-St Jeor equation.',
    tags: ['Health', 'Fitness'],
    inputs: [
      { name: 'weight', label: 'Weight (kg)', type: 'number', min: 30, max: 250, step: 0.1 },
      { name: 'height', label: 'Height (cm)', type: 'number', min: 120, max: 230, step: 0.5 },
      { name: 'age', label: 'Age (years)', type: 'number', min: 15, max: 90, step: 1 },
      {
        name: 'sex',
        label: 'Sex',
        type: 'select',
        options: [
          { value: 'female', label: 'Female' },
          { value: 'male', label: 'Male' },
        ],
      },
      {
        name: 'activity',
        label: 'Activity level',
        type: 'select',
        options: [
          { value: '1.2', label: 'Sedentary (desk job, little exercise)' },
          { value: '1.375', label: 'Lightly active (1-3 workouts/week)' },
          { value: '1.55', label: 'Moderately active (3-5 workouts/week)' },
          { value: '1.725', label: 'Very active (6-7 workouts/week)' },
          { value: '1.9', label: 'Athlete (physical job + daily training)' },
        ],
      },
    ],
    compute: (data) => {
      const weight = Number(data.weight);
      const height = Number(data.height);
      const age = Number(data.age);
      const isFemale = data.sex === 'female';
      const activity = Number(data.activity ?? 1.2);
      const bmr = isFemale
        ? 10 * weight + 6.25 * height - 5 * age - 161
        : 10 * weight + 6.25 * height - 5 * age + 5;
      const tdee = bmr * activity;
      const mildCut = tdee - 250;
      const aggressiveCut = tdee - 500;
      const mildBulk = tdee + 250;
      const aggressiveBulk = tdee + 500;
      return {
        bmr: round(bmr, 0),
        tdee: round(tdee, 0),
        mildCut: round(mildCut, 0),
        aggressiveCut: round(aggressiveCut, 0),
        mildBulk: round(mildBulk, 0),
        aggressiveBulk: round(aggressiveBulk, 0),
      };
    },
    formatResult: (result) => ({
      title: `${result.tdee} kcal/day`,
      items: [
        { label: 'BMR', value: `${result.bmr} kcal` },
        { label: 'Maintenance calories', value: `${result.tdee} kcal` },
        { label: 'Mild cut', value: `${result.mildCut} kcal` },
        { label: 'Aggressive cut', value: `${result.aggressiveCut} kcal` },
        { label: 'Mild bulk', value: `${result.mildBulk} kcal` },
        { label: 'Aggressive bulk', value: `${result.aggressiveBulk} kcal` },
      ],
      insights: [
        'Adjust intake if weight changes differ from expectations for 2 consecutive weeks.',
        'Combine calorie targets with high-protein meals and resistance training for body recomposition.',
      ],
    }),
    explanation: 'The Mifflin-St Jeor equation estimates basal metabolic rate, which is then scaled by an activity multiplier to reach total daily energy expenditure (TDEE).',
    formula: 'BMR = 10×weight (kg) + 6.25×height (cm) − 5×age (y) + s (s = +5 for males, −161 for females). TDEE = BMR × activity factor.',
    faq: [
      {
        question: 'How often should I recalculate TDEE?',
        answer: 'Retest every 4–6 weeks or after body weight changes by more than 3% to keep targets accurate.',
      },
      {
        question: 'Should I eat below my BMR?',
        answer: 'Regular intake below BMR is not advised. Aim for sustainable deficits of 10–20% below TDEE instead.',
      },
    ],
  },
  {
    slug: 'macro-calculator',
    name: 'Macro Split Calculator',
    description: 'Derive daily grams of protein, fats, and carbohydrates based on calorie goals and macro ratios.',
    tags: ['Fitness', 'Everyday'],
    inputs: [
      { name: 'calories', label: 'Calories per day', type: 'number', min: 800, max: 6000, step: 1 },
      { name: 'proteinRatio', label: 'Protein %', type: 'number', min: 10, max: 60, step: 1 },
      { name: 'fatRatio', label: 'Fat %', type: 'number', min: 10, max: 60, step: 1 },
    ],
    compute: (data) => {
      const calories = Number(data.calories);
      const proteinRatio = Number(data.proteinRatio);
      const fatRatio = Number(data.fatRatio);
      const carbRatio = 100 - proteinRatio - fatRatio;
      const proteinGrams = round((calories * (proteinRatio / 100)) / 4, 0);
      const fatGrams = round((calories * (fatRatio / 100)) / 9, 0);
      const carbGrams = round((calories * (carbRatio / 100)) / 4, 0);
      return {
        proteinRatio,
        fatRatio,
        carbRatio,
        proteinGrams,
        fatGrams,
        carbGrams,
      };
    },
    formatResult: (result) => ({
      title: 'Daily macro targets',
      items: [
        { label: `Protein (${result.proteinRatio}% )`, value: `${result.proteinGrams} g` },
        { label: `Fat (${result.fatRatio}% )`, value: `${result.fatGrams} g` },
        { label: `Carbs (${result.carbRatio}% )`, value: `${result.carbGrams} g` },
      ],
      insights: ['Adjust ratios if energy levels dip or training volume increases.'],
    }),
    explanation: 'Macros split total calories between protein, fat, and carbohydrates using the energy density of each macronutrient.',
    formula: 'Protein & carbs provide 4 kcal/g, fats provide 9 kcal/g. Macro grams = (calories × ratio) ÷ kcal/g.',
    faq: [
      {
        question: 'What macro ratios are popular?',
        answer: 'Balanced plans hover around 30/30/40 for protein/fat/carbs, while high-protein cuts often hit 40/30/30.',
      },
      {
        question: 'How do I change macros on rest days?',
        answer: 'Keep protein high, lower carbs slightly, and monitor recovery. The calculator recalculates quickly for new targets.',
      },
    ],
  },
  {
    slug: 'water-intake',
    name: 'Daily Water Intake',
    description: 'Estimate optimal fluid intake based on body weight and activity time.',
    tags: ['Health', 'Everyday'],
    inputs: [
      { name: 'weight', label: 'Weight (kg)', type: 'number', min: 30, max: 200, step: 0.1 },
      { name: 'activityMinutes', label: 'Active minutes', type: 'number', min: 0, max: 300, step: 5, helperText: 'Add training or outdoor activity minutes.' },
    ],
    compute: (data) => {
      const weight = Number(data.weight);
      const activityMinutes = Number(data.activityMinutes);
      const baseMl = weight * 35; // 35 ml per kg baseline
      const activityMl = (activityMinutes / 30) * 350; // add 350 ml per 30 min
      const totalMl = baseMl + activityMl;
      return {
        totalMl: round(totalMl, 0),
        totalLiters: round(totalMl / 1000, 2),
      };
    },
    formatResult: (result) => ({
      title: `${result.totalLiters} L / day`,
      items: [
        { label: 'Total water', value: `${result.totalMl} ml` },
        { label: 'Approx. glasses', value: `${Math.round(Number(result.totalMl) / 250)} glasses` },
      ],
      insights: ['Hydration needs rise with hot weather, altitude, and breastfeeding.'],
    }),
    explanation: 'Hydration guidelines scale with body mass and sweat losses during activity. This heuristic covers day-to-day hydration.',
    formula: 'Daily water (ml) = weight (kg) × 35 + 350 ml for every 30 minutes of activity.',
    faq: [
      {
        question: 'Can I count coffee or tea?',
        answer: 'Most non-alcoholic beverages contribute to hydration. Prioritize water and electrolyte drinks in hot climates.',
      },
      {
        question: 'How do I know if I drink enough?',
        answer: 'Check urine color (pale straw is ideal) and ensure weight is stable around hard workouts.',
      },
    ],
  },
];

export const findCalculatorBySlug = (slug: string) => calculatorRegistry.find((calculator) => calculator.slug === slug);
