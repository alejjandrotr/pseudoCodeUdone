import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { ejerciciosSeleccion2Data } from '../../../core/data/ejerciciosSeleccion2Data';
import { Exercise } from '../../../core/types/exercise.types';
import { ExerciseItem } from '../../exercises/ExerciseItem';
import { SettingsModal } from '../../exercises/ExerciseComponents';
import { Button } from '../../common/Button';
import { P } from '../ArticlePageComponents';

export const ArticleEjerciciosSeleccion2: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Desbloquear soluciones desde el 26 de mayo 2026
  const releaseDate = new Date('2026-05-26T00:00:00');
  const solutionsLocked = new Date() < releaseDate;

  return (
    <div className="space-y-6">
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <P className="mb-0">
            Segunda tanda de ejercicios de selección (11–21): corridas en frío, puntos adicionales, consecutivos, mínimos, ordenación, series, par/impar, rangos, productos, días de la semana y verificación de caracteres.
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
        {ejerciciosSeleccion2Data.map((ejercicio: Exercise, index: number) => (
          <div
            key={ejercicio.numero}
            style={{ animationDelay: `${index * 50}ms` }}
            className="animate-slide-up"
          >
            <ExerciseItem
              {...ejercicio}
              openSettings={() => setIsSettingsOpen(true)}
              solutionsLocked={solutionsLocked}
              blockedProfessorIds={ejercicio.numero > 15 ? ['prof_mentor', 'prof_guia'] : []}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
