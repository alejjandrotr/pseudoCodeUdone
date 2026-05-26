export interface PrivateExercise {
  id: string;
  categoria: 'secuenciales' | 'seleccion-simple' | 'seleccion-doble' | 'seleccion-multiple' | 'anidados' | 'ciclos-sencillos' | 'lectura-escritura-asignacion' | 'matematico-logico' | 'ciclos-largos';
  numero: number;
  enunciado: string;
  puntosMaximos: number;
  solucionOficial: {
    pseudocodigo: string;
    c: string;
    typescript: string;
  };
}

export interface ParcialConfig {
  id: string;
  titulo: string;
  descripcion: string;
  frase?: string; // Frase o cita célebre del tema del parcial (ej. de Richard en Gumball)
  tipo: 'fijo' | 'aleatorio';
  soloExamenesPasados?: boolean; // Si es true, las reglas aleatorias solo tomarán ejercicios de parciales pasados
  ejerciciosFijos?: string[]; // IDs de ejercicios privados específicos
  reglasAleatorias?: {
    categoria: 'secuenciales' | 'seleccion-simple' | 'seleccion-doble' | 'seleccion-multiple' | 'anidados' | 'ciclos-sencillos' | 'lectura-escritura-asignacion' | 'matematico-logico' | 'ciclos-largos';
    cantidad: number;
  }[];
}

export interface ExerciseAttemptResult {
  puntuacion: number; // Ej: de 0 a 2.5
  feedback: string;
  erroresComunes: string[]; // Lista de códigos de error identificados (ej. 'fin_si_faltante')
}

export interface ParcialAttemptResult {
  notaTotal: number; // Sobre 10
  aprobado: boolean; // notaTotal >= 5
  comentarioGeneral: string;
  desgloseEjercicios: {
    [exerciseId: string]: ExerciseAttemptResult;
  };
}

export interface UserParcialAttempt {
  parcialId: string;
  intentoNumero: number;
  tiempoTotalSegundos: number;
  tiemposPorEjercicio: { [exerciseId: string]: number }; // idEjercicio -> segundos
  profesorId: string;
  respuestas: { [exerciseId: string]: string }; // idEjercicio -> codigoUsuario
  fecha: string;
  resultado?: ParcialAttemptResult;
}
