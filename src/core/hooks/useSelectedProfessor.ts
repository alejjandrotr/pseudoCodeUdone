import { useState, useEffect } from 'react';
import { professorsData } from '../data/professorsData';

const STORAGE_KEY = 'gemini_selected_prof_id';

export function useSelectedProfessor() {
  const [selectedProfId, setSelectedProfId] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || professorsData[0].id;
  });

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setSelectedProfId(e.newValue);
      }
    };
    
    // Custom event for same-window syncing
    const handleLocalUpdate = (e: CustomEvent) => {
      setSelectedProfId(e.detail);
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('sync_prof', handleLocalUpdate as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('sync_prof', handleLocalUpdate as EventListener);
    };
  }, []);

  const setProfessor = (id: string) => {
    setSelectedProfId(id);
    localStorage.setItem(STORAGE_KEY, id);
    window.dispatchEvent(new CustomEvent('sync_prof', { detail: id }));
  };

  return [selectedProfId, setProfessor] as const;
}
