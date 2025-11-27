import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserProfile, WorkoutPlan, NutritionPlan } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const WORKOUT_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    description: { type: Type.STRING },
    schedule: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.STRING },
          focus: { type: Type.STRING },
          exercises: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                sets: { type: Type.STRING },
                reps: { type: Type.STRING },
                notes: { type: Type.STRING },
              },
              required: ['name', 'sets', 'reps'],
            },
          },
        },
        required: ['day', 'focus', 'exercises'],
      },
    },
  },
  required: ['title', 'description', 'schedule'],
};

const NUTRITION_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    schedule: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.STRING },
          totalCalories: { type: Type.NUMBER },
          meals: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'] },
                items: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      calories: { type: Type.NUMBER },
                      protein: { type: Type.STRING },
                      carbs: { type: Type.STRING },
                      fats: { type: Type.STRING },
                    },
                    required: ['name', 'calories'],
                  },
                },
              },
              required: ['type', 'items'],
            },
          },
        },
        required: ['day', 'meals', 'totalCalories'],
      },
    },
  },
  required: ['title', 'schedule'],
};

export const generateWorkoutPlan = async (user: UserProfile, duration: string, equipment: string): Promise<WorkoutPlan> => {
  const prompt = `Create a ${duration} workout plan for a ${user.age} year old, ${user.weight}kg, ${user.height}cm male/female who is a ${user.level}. 
  Their goal is: ${user.goal}. 
  Available equipment: ${equipment}.
  Ensure the plan is detailed with specific exercises, sets, and reps.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: WORKOUT_SCHEMA,
    },
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text) as WorkoutPlan;
};

export const generateNutritionPlan = async (user: UserProfile, preferences: string): Promise<NutritionPlan> => {
  const prompt = `Create a daily meal plan for a ${user.age} year old, ${user.weight}kg, ${user.height}cm person.
  Goal: ${user.goal}. Level: ${user.level}.
  Dietary Preferences/Allergies: ${preferences}.
  Provide a 3-day sample plan. Include calories and macros (protein, carbs, fats) for each item roughly.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: NUTRITION_SCHEMA,
    },
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text) as NutritionPlan;
};

export const createChatSession = (user: UserProfile) => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are an expert fitness coach named IronAI. You are helpful, motivating, and knowledgeable about exercise science and nutrition. 
      User Context: ${user.age} years old, ${user.weight}kg, Goal: ${user.goal}, Level: ${user.level}.
      Keep answers concise and actionable.`,
    },
  });
};
