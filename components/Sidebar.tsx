import React from 'react';
import { NavLink } from 'react-router-dom';
import { Dumbbell, Utensils, MessageSquare, LayoutDashboard, Settings, Activity } from 'lucide-react';

const Sidebar = () => {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-primary text-white font-medium'
        : 'text-slate-400 hover:bg-dark-surface hover:text-white'
    }`;

  return (
    <aside className="w-64 h-screen bg-dark-bg border-r border-gray-800 flex flex-col fixed left-0 top-0 overflow-y-auto hidden md:flex z-50">
      <div className="p-6 flex items-center space-x-2">
        <Activity className="w-8 h-8 text-primary" />
        <span className="text-xl font-bold text-white tracking-tight">IronAI</span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        <NavLink to="/" className={navClass}>
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/workouts" className={navClass}>
          <Dumbbell className="w-5 h-5" />
          <span>Workouts</span>
        </NavLink>
        <NavLink to="/nutrition" className={navClass}>
          <Utensils className="w-5 h-5" />
          <span>Nutrition</span>
        </NavLink>
        <NavLink to="/coach" className={navClass}>
          <MessageSquare className="w-5 h-5" />
          <span>AI Coach</span>
        </NavLink>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <NavLink to="/settings" className={navClass}>
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
