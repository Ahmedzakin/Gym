import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Sidebar from './components/Sidebar';
import MobileHeader from './components/MobileHeader';
import Dashboard from './pages/Dashboard';
import WorkoutGenerator from './pages/WorkoutGenerator';
import NutritionPlanner from './pages/NutritionPlanner';
import AICoach from './pages/AICoach';
import Settings from './pages/Settings';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-dark-bg flex flex-col md:flex-row">
    <Sidebar />
    <div className="flex-1 flex flex-col md:ml-64">
      <MobileHeader />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  </div>
);

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/workouts" element={<WorkoutGenerator />} />
            <Route path="/nutrition" element={<NutritionPlanner />} />
            <Route path="/coach" element={<AICoach />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </UserProvider>
  );
};

export default App;
