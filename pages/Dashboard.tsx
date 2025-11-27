import React from 'react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Trophy, Activity } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => (
  <div className="bg-dark-surface p-6 rounded-xl border border-gray-800">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-slate-400 text-sm font-medium">{label}</h3>
    <p className="text-2xl font-bold text-white mt-1">{value}</p>
  </div>
);

const Dashboard = () => {
  const { user } = useUser();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white">Welcome back, {user.name.split(' ')[0]} 👋</h1>
        <p className="text-slate-400 mt-2">Let's crush your goal to <span className="text-primary font-medium">{user.goal}</span>.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={Flame} 
          label="Current Streak" 
          value="3 Days" 
          color="bg-orange-500" 
        />
        <StatCard 
          icon={Trophy} 
          label="Current Level" 
          value={user.level} 
          color="bg-yellow-500" 
        />
        <StatCard 
          icon={Activity} 
          label="Weight Goal" 
          value={`${user.weight} kg`} 
          color="bg-blue-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-dark-surface p-6 rounded-xl border border-gray-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity className="w-32 h-32" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Generate Workout</h2>
          <p className="text-slate-400 mb-6">Need a fresh routine? Let AI build a perfect plan for your equipment.</p>
          <Link to="/workouts" className="inline-flex items-center text-primary hover:text-primary-hover font-medium">
            Go to Generator <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        <div className="bg-dark-surface p-6 rounded-xl border border-gray-800 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Flame className="w-32 h-32" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Nutrition Plan</h2>
          <p className="text-slate-400 mb-6">Fuel your body right. Get a custom meal plan generated instantly.</p>
          <Link to="/nutrition" className="inline-flex items-center text-green-500 hover:text-green-400 font-medium">
            Plan Meals <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
