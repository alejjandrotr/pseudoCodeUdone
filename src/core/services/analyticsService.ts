export interface GlobalStats {
  totalPageViews: number;
  totalExercisesSolved: number;
  totalExercisesFailed: number;
  successRate: number;
}

export interface ExerciseStat {
  exerciseNumber: number;
  successCount: number;
  failCount: number;
}

/**
 * Interfaz que garantiza una migración sencilla.
 * Cualquier backend (Local, Supabase, Sheets) debe cumplir este contrato.
 */
export interface IAnalyticsProvider {
  trackPageView(pageName: string): Promise<void>;
  trackExerciseResult(exerciseNumber: number, result: 'APROBADO' | 'RECHAZADO'): Promise<void>;
  getGlobalStats(): Promise<GlobalStats>;
  getExerciseStats(exerciseNumber: number): Promise<ExerciseStat | null>;
}

/**
 * Implementación de Simulación Local (LocalStorage)
 * Usado para pruebas locales antes de la migración a la nube.
 */
class LocalStorageAnalyticsProvider implements IAnalyticsProvider {
  private readonly STORAGE_KEY = 'udone_analytics_mock';

  private getData() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : { pageViews: {}, exercises: {} };
    } catch {
      return { pageViews: {}, exercises: {} };
    }
  }

  private saveData(data: any) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  async trackPageView(pageName: string): Promise<void> {
    const data = this.getData();
    data.pageViews[pageName] = (data.pageViews[pageName] || 0) + 1;
    this.saveData(data);
  }

  async trackExerciseResult(exerciseNumber: number, result: 'APROBADO' | 'RECHAZADO'): Promise<void> {
    const data = this.getData();
    if (!data.exercises[exerciseNumber]) {
      data.exercises[exerciseNumber] = { successCount: 0, failCount: 0 };
    }
    
    if (result === 'APROBADO') {
      data.exercises[exerciseNumber].successCount += 1;
    } else {
      data.exercises[exerciseNumber].failCount += 1;
    }
    this.saveData(data);
  }

  async getGlobalStats(): Promise<GlobalStats> {
    const data = this.getData();
    
    // Sumar visitas
    const totalPageViews = Object.values(data.pageViews).reduce((a: any, b: any) => a + b, 0) as number;
    
    // Sumar ejercicios
    let totalExercisesSolved = 0;
    let totalExercisesFailed = 0;
    
    Object.values(data.exercises).forEach((ex: any) => {
      totalExercisesSolved += ex.successCount || 0;
      totalExercisesFailed += ex.failCount || 0;
    });

    const totalAttempts = totalExercisesSolved + totalExercisesFailed;
    const successRate = totalAttempts > 0 ? Math.round((totalExercisesSolved / totalAttempts) * 100) : 0;

    return {
      totalPageViews,
      totalExercisesSolved,
      totalExercisesFailed,
      successRate
    };
  }

  async getExerciseStats(exerciseNumber: number): Promise<ExerciseStat | null> {
    const data = this.getData();
    const exData = data.exercises[exerciseNumber];
    if (!exData) return null;
    
    return {
      exerciseNumber,
      successCount: exData.successCount || 0,
      failCount: exData.failCount || 0
    };
  }
}

// ============================================================================
// ESTRATEGIA DE MIGRACIÓN: 
// Cuando se desee migrar a Supabase, solo hay que crear una clase 
// `SupabaseAnalyticsProvider implements IAnalyticsProvider` que haga llamadas 
// fetch() al API REST de Supabase, y cambiar la instancia exportada aquí abajo.
// ============================================================================

export const analyticsService: IAnalyticsProvider = new LocalStorageAnalyticsProvider();
