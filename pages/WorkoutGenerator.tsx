import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { generateWorkoutPlan } from '../services/geminiService';
import { WorkoutPlan } from '../types';
import { Loader2, Dumbbell, Save, RefreshCw } from 'lucide-react';

const WorkoutGenerator = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [equipment, setEquipment] = useState('Full Gym');
  const [duration, setDuration] = useState('7-Day');

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateWorkoutPlan(user, duration, equipment);
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
          <h1 className="text-3xl font-bold text-white">Workout Generator</h1>
          <p className="text-slate-400">AI-powered routines tailored to your goals.</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-dark-surface p-6 rounded-xl border border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Equipment Available</label>
          <select 
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          >
            <option>Full Gym</option>
            <option>Dumbbells Only</option>
            <option>Bodyweight Only</option>
            <option>Home Gym (Bands + DBs)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Duration</label>
          <select 
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          >
            <option>3-Day Split</option>
            <option>4-Day Split</option>
            <option>5-Day Split</option>
            <option>7-Day Routine</option>
          </select>
        </div>

        <div className="flex items-end">
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Dumbbell className="w-5 h-5" />}
            {loading ? 'Generating...' : 'Generate Plan'}
          </button>
        </div>
      </div>

      {/* Results */}
      {plan && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">{plan.title}</h2>
              <p className="text-slate-400">{plan.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {plan.schedule.map((day, idx) => (
              <div key={idx} className="bg-dark-surface rounded-xl border border-gray-800 overflow-hidden">
                <div className="bg-gray-800/50 px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                  <h3 className="font-bold text-white text-lg">{day.day}</h3>
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">{day.focus}</span>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-slate-500 text-sm border-b border-gray-700">
                          <th className="pb-3 font-medium">Exercise</th>
                          <th className="pb-3 font-medium">Sets</th>
                          <th className="pb-3 font-medium">Reps</th>
                          <th className="pb-3 font-medium hidden md:table-cell">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {day.exercises.map((ex, i) => (
                          <tr key={i} className="group hover:bg-white/5 transition-colors">
                            <td className="py-4 text-white font-medium pr-4">{ex.name}</td>
                            <td className="py-4 text-slate-300 pr-4">{ex.sets}</td>
                            <td className="py-4 text-slate-300 pr-4">{ex.reps}</td>
                            <td className="py-4 text-slate-400 text-sm hidden md:table-cell">{ex.notes || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutGenerator;
