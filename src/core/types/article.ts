import React from 'react';

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  component: React.ComponentType;
  type?: 'lesson' | 'exercise' | 'video';
}
