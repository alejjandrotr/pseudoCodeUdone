import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { ejerciciosCiclosData } from '../../../core/data/ejerciciosCiclosData';
import { Exercise } from '../../../core/types/exercise.types';
import { ExerciseItem } from '../../exercises/ExerciseItem';
import { SettingsModal } from '../../exercises/ExerciseComponents';
import { Button } from '../../common/Button';
import { P } from '../ArticlePageComponents';

export const ArticleEjerciciosCiclos: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Desbloquear soluciones desde el 2 de junio 2026
  const releaseDate = new Date('2026-06-02T00:00:00');
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
            Ejercicios propuestos para práctica de repetición (ciclos): concatenación con centinela, estadísticas con Mientras, mayor/menor con Para, producto y división por ciclos, nómina de empleados, desempeño estudiantil y verificación de la serie Fibonacci.
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
        {ejerciciosCiclosData.map((ejercicio: Exercise, index: number) => (
          <div
            key={ejercicio.numero}
            style={{ animationDelay: `${index * 50}ms` }}
            className="animate-slide-up"
          >
            <ExerciseItem
              {...ejercicio}
              openSettings={() => setIsSettingsOpen(true)}
              solutionsLocked={solutionsLocked}
              blockedProfessorIds={ejercicio.numero > 4 ? ['prof_mentor', 'prof_guia'] : []}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
