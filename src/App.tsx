import React, { useState, useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { BasicActionsPage } from './pages/BasicActionsPage';
import { ProfessorsPage } from './pages/ProfessorsPage';
import { CustomExercisePage } from './pages/CustomExercisePage';

type View = 'home' | 'acciones_basicas' | 'ejercicios_secuenciacion' | 'professors' | 'custom_exercise';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const navigateTo = (view: View) => setCurrentView(view);

  switch (currentView) {
    case 'acciones_basicas':
      return <BasicActionsPage onBack={() => navigateTo('home')} />;
    case 'professors':
      return <ProfessorsPage onBack={() => navigateTo('home')} />;
    case 'custom_exercise':
      return <CustomExercisePage onBack={() => navigateTo('home')} />;
    default:
      return <HomePage onNavigate={navigateTo} />;
  }
};
