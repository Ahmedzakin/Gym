import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile, FitnessGoal, FitnessLevel } from '../types';

interface UserContextType {
  user: UserProfile;
  updateUser: (user: UserProfile) => void;
}

const defaultUser: UserProfile = {
  name: 'Guest User',
  age: 25,
  weight: 70,
  height: 175,
  goal: FitnessGoal.BUILD_MUSCLE,
  level: FitnessLevel.INTERMEDIATE,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('ironai_user');
    return saved ? JSON.parse(saved) : defaultUser;
  });

  const updateUser = (newUser: UserProfile) => {
    setUser(newUser);
    localStorage.setItem('ironai_user', JSON.stringify(newUser));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};