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
  trackParcialResult(parcialId: string, intento: number, nota: number, tiempoTotal: number, errores: string[]): Promise<void>;
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

  async trackParcialResult(parcialId: string, intento: number, nota: number, tiempoTotal: number, errores: string[]): Promise<void> {
    const data = this.getData();
    if (!data.parciales) {
      data.parciales = [];
    }
    data.parciales.push({
      parcialId,
      intento,
      nota,
      tiempoTotal,
      errores,
      fecha: new Date().toISOString()
    });
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

/**
 * Implementación de Producción usando Google Sheets + Google Apps Script (100% Gratis y Compartido)
 * Todos los usuarios sumarán sus visitas y aciertos en tiempo real.
 */
class GoogleSheetsAnalyticsProvider implements IAnalyticsProvider {
  private apiUrl = import.meta.env.VITE_ANALYTICS_API_URL || '';
  private cache: { pageViews: Record<string, number>; exercises: Record<number, { successCount: number; failCount: number }> } | null = null;
  private cachePromise: Promise<any> | null = null;

  constructor() {
    if (!this.apiUrl) {
      console.warn(
        "⚠️ [Analytics] VITE_ANALYTICS_API_URL no está definida. Se usará LocalStorage como fallback temporal."
      );
    }
  }

  private async fetchAllData(): Promise<any> {
    if (!this.apiUrl) return { pageViews: {}, exercises: {} };
    if (this.cache) return this.cache;
    if (this.cachePromise) return this.cachePromise;

    this.cachePromise = fetch(this.apiUrl)
      .then(res => res.json())
      .then(data => {
        this.cache = {
          pageViews: data.pageViews || {},
          exercises: data.exercises || {}
        };
        this.cachePromise = null;
        return this.cache;
      })
      .catch(err => {
        console.error("❌ Error al obtener estadísticas globales:", err);
        this.cachePromise = null;
        return { pageViews: {}, exercises: {} };
      });

    return this.cachePromise;
  }

  async trackPageView(pageName: string): Promise<void> {
    if (!this.apiUrl) {
      // Fallback
      return new LocalStorageAnalyticsProvider().trackPageView(pageName);
    }
    // Usar sendBeacon o fetch asíncrono en segundo plano (no-cors para evitar problemas redirección de Google)
    fetch(`${this.apiUrl}?action=trackPageView&pageName=${encodeURIComponent(pageName)}`, { mode: 'no-cors' })
      .catch(err => console.error("Error al registrar visita:", err));
  }

  async trackExerciseResult(exerciseNumber: number, result: 'APROBADO' | 'RECHAZADO'): Promise<void> {
    if (!this.apiUrl) {
      // Fallback
      return new LocalStorageAnalyticsProvider().trackExerciseResult(exerciseNumber, result);
    }
    fetch(`${this.apiUrl}?action=trackExerciseResult&exerciseNumber=${exerciseNumber}&result=${result}`, { mode: 'no-cors' })
      .then(() => {
        // Limpiar caché local para forzar recarga de estadísticas frescas
        this.cache = null;
      })
      .catch(err => console.error("Error al registrar resultado:", err));
  }

  async trackParcialResult(parcialId: string, intento: number, nota: number, tiempoTotal: number, errores: string[]): Promise<void> {
    if (!this.apiUrl) {
      return new LocalStorageAnalyticsProvider().trackParcialResult(parcialId, intento, nota, tiempoTotal, errores);
    }
    const erroresStr = errores.join(',');
    fetch(`${this.apiUrl}?action=trackParcialResult&parcialId=${encodeURIComponent(parcialId)}&intento=${intento}&nota=${nota}&tiempoTotal=${tiempoTotal}&errores=${encodeURIComponent(erroresStr)}`, { mode: 'no-cors' })
      .catch(err => console.error("Error al registrar resultado de parcial en Sheets:", err));
  }

  async getGlobalStats(): Promise<GlobalStats> {
    if (!this.apiUrl) {
      return new LocalStorageAnalyticsProvider().getGlobalStats();
    }
    const data = await this.fetchAllData();
    
    const totalPageViews = Object.values(data.pageViews).reduce((a: any, b: any) => a + b, 0) as number;
    
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
    if (!this.apiUrl) {
      return new LocalStorageAnalyticsProvider().getExerciseStats(exerciseNumber);
    }
    const data = await this.fetchAllData();
    const exData = data.exercises[exerciseNumber];
    
    return {
      exerciseNumber,
      successCount: exData?.successCount || 0,
      failCount: exData?.failCount || 0
    };
  }
}

// ============================================================================
// NOTA: El código completo y listo para copiar de Google Apps Script se encuentra
// guardado de forma limpia en: src/assets/google-apps-script.js
// ============================================================================

// Instancia de servicio activa
export const analyticsService: IAnalyticsProvider = new GoogleSheetsAnalyticsProvider();
