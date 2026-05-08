import React, { useState } from 'react';
import { Settings, FileText } from 'lucide-react';
import { ejerciciosData } from '../../../core/data/ejerciciosData';
import { Exercise } from '../../../core/types/exercise.types';
import { ExerciseItem } from '../../exercises/ExerciseItem';
import { SettingsModal } from '../../exercises/ExerciseComponents';
import { Button } from '../../common/Button';
import { P } from '../ArticlePageComponents';

export const ArticleEjerciciosSecuenciacion: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="space-y-6">
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <P className="mb-0">
            Resolución guiada por IA para los 21 ejercicios fundamentales presentados en la asignatura Algoritmos y Estructuras de Datos I.
          </P>
        </div>
        <div className="flex-shrink-0">
          <Button 
            variant="secondary" 
            size="sm" 
            icon={Settings} 
            onClick={() => setIsSettingsOpen(true)}
            className="w-full md:w-auto"
          >
            Configurar IA
          </Button>
        </div>
      </div>

      <div className="space-y-4 pb-10">
        {ejerciciosData.map((ejercicio: Exercise, index: number) => (
          <div
            key={ejercicio.numero}
            style={{ animationDelay: `${index * 50}ms` }}
            className="animate-slide-up"
          >
            <ExerciseItem
              {...ejercicio}
              openSettings={() => setIsSettingsOpen(true)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
