import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { generateNutritionPlan } from '../services/geminiService';
import { NutritionPlan } from '../types';
import { Loader2, Utensils, AlertCircle } from 'lucide-react';

const NutritionPlanner = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<NutritionPlan | null>(null);
  const [preferences, setPreferences] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateNutritionPlan(user, preferences || 'None');
      setPlan(result);
    } catch (error) {
      console.error(error);
      alert("Failed to generate plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Nutrition Planner</h1>
          <p className="text-slate-400">Personalized meal plans to fuel your progress.</p>
        </div>
      </div>

      <div className="bg-dark-surface p-6 rounded-xl border border-gray-800">
        <label className="block text-sm font-medium text-slate-400 mb-2">Dietary Preferences & Allergies</label>
        <div className="flex gap-4">
          <input 
            type="text" 
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            placeholder="e.g. Vegetarian, Gluten-free, No peanuts..."
            className="flex-1 bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
          >
             {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Utensils className="w-5 h-5" />}
             {loading ? 'Planning...' : 'Generate'}
          </button>
        </div>
        <div className="mt-3 flex items-start gap-2 text-sm text-slate-500">
          <AlertCircle className="w-4 h-4 mt-0.5" />
          <p>The AI will consider your goal ({user.goal}) and stats ({user.weight}kg) to estimate calories.</p>
        </div>
      </div>

      {plan && (
        <div className="space-y-8 animate-fade-in">
          <h2 className="text-2xl font-bold text-white border-b border-gray-800 pb-4">{plan.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plan.schedule.map((day, idx) => (
              <div key={idx} className="bg-dark-surface rounded-xl border border-gray-800 flex flex-col h-full">
                <div className="p-4 border-b border-gray-700 bg-gray-800/30">
                  <h3 className="font-bold text-white text-lg">{day.day}</h3>
                  <p className="text-green-400 text-sm font-medium">Total: ~{day.totalCalories} kcal</p>
                </div>
                <div className="p-4 space-y-4 flex-1">
                  {day.meals.map((meal, mIdx) => (
                    <div key={mIdx} className="bg-dark-bg/50 rounded-lg p-3">
                      <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-2 border-b border-gray-700 pb-1">{meal.type}</h4>
                      <ul className="space-y-3">
                        {meal.items.map((item, iIdx) => (
                          <li key={iIdx} className="text-sm">
                            <div className="text-white font-medium">{item.name}</div>
                            <div className="text-slate-500 text-xs mt-1 flex gap-2">
                              <span>{item.calories} kcal</span>
                              <span className="text-gray-600">•</span>
                              <span>P: {item.protein}</span>
                              <span className="text-gray-600">•</span>
                              <span>C: {item.carbs}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionPlanner;
