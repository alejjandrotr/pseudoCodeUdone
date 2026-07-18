import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExamDashboardPage } from './ExamDashboardPage';

export const ExamDashboardRouted: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <ExamDashboardPage 
      onBack={() => navigate('/dashboard')} 
      onStartExam={() => navigate('/parcial-virtual/examen')} 
    />
  );
};
