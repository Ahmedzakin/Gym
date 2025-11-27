export enum FitnessGoal {
  LOSE_WEIGHT = 'Lose Weight',
  BUILD_MUSCLE = 'Build Muscle',
  IMPROVE_STAMINA = 'Improve Stamina',
  MAINTAIN = 'Maintain Fitness',
  STRENGTH = 'Increase Strength'
}

export enum FitnessLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

export interface UserProfile {
  name: string;
  age: number;
  weight: number; // kg
  height: number; // cm
  goal: FitnessGoal;
  level: FitnessLevel;
}

export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  notes?: string;
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  title: string;
  description: string;
  schedule: WorkoutDay[];
}

export interface MealItem {
  name: string;
  calories: number;
  protein: string;
  carbs: string;
  fats: string;
}

export interface Meal {
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  items: MealItem[];
}

export interface NutritionDay {
  day: string;
  meals: Meal[];
  totalCalories: number;
}

export interface NutritionPlan {
  title: string;
  schedule: NutritionDay[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}