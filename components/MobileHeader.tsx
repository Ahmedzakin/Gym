import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Dumbbell, Utensils, MessageSquare, LayoutDashboard, Settings, Activity, Menu, X } from 'lucide-react';

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center space-x-3 px-4 py-4 border-b border-gray-800 transition-colors ${
      isActive ? 'text-primary font-medium' : 'text-slate-400'
    }`;

  return (
    <div className="md:hidden bg-dark-bg border-b border-gray-800 sticky top-0 z-50">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <Activity className="w-6 h-6 text-primary" />
          <span className="text-lg font-bold text-white">IronAI</span>
        </div>
        <button onClick={toggleMenu} className="text-slate-300">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <nav className="absolute top-full left-0 w-full bg-dark-bg border-b border-gray-800 flex flex-col shadow-xl">
          <NavLink to="/" className={navClass} onClick={toggleMenu}>
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/workouts" className={navClass} onClick={toggleMenu}>
            <Dumbbell className="w-5 h-5" />
            <span>Workouts</span>
          </NavLink>
          <NavLink to="/nutrition" className={navClass} onClick={toggleMenu}>
            <Utensils className="w-5 h-5" />
            <span>Nutrition</span>
          </NavLink>
          <NavLink to="/coach" className={navClass} onClick={toggleMenu}>
            <MessageSquare className="w-5 h-5" />
            <span>AI Coach</span>
          </NavLink>
          <NavLink to="/settings" className={navClass} onClick={toggleMenu}>
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </NavLink>
        </nav>
      )}
    </div>
  );
};

export default MobileHeader;
