import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { FitnessGoal, FitnessLevel } from '../types';
import { Save, CheckCircle } from 'lucide-react';

const Settings = () => {
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState(user);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'weight' || name === 'height' ? Number(value) : value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-slate-400">Update your profile for better AI recommendations.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-dark-surface p-8 rounded-xl border border-gray-800 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Name</label>
            <input 
              name="name"
              type="text" 
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Age</label>
            <input 
              name="age"
              type="number" 
              value={formData.age}
              onChange={handleChange}
              className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Weight (kg)</label>
            <input 
              name="weight"
              type="number" 
              value={formData.weight}
              onChange={handleChange}
              className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Height (cm)</label>
            <input 
              name="height"
              type="number" 
              value={formData.height}
              onChange={handleChange}
              className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-400 mb-2">Main Goal</label>
            <select 
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
            >
              {Object.values(FitnessGoal).map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-400 mb-2">Experience Level</label>
            <select 
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
            >
              {Object.values(FitnessLevel).map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between">
           {saved && <span className="text-green-500 flex items-center gap-2"><CheckCircle className="w-5 h-5"/> Saved Successfully</span>}
           {!saved && <span></span>}
          <button 
            type="submit" 
            className="bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-8 rounded-lg transition-colors flex items-center gap-2"
          >
            <Save className="w-5 h-5" /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
