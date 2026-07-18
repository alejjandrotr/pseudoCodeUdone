import React from 'react';
import { useNavigate } from 'react-router-dom';
import { VirtualExamPage } from './VirtualExamPage';

export const VirtualExamRouted: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <VirtualExamPage 
      onBack={() => navigate('/parcial-virtual')} 
      onFinish={() => navigate('/parcial-virtual')} 
    />
  );
};
