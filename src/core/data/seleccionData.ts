import { Article } from '../types/article';
import { ArticleSeleccionIntroduccion } from '../../components/cantera/articles/ArticleSeleccionIntroduccion';
import { ArticleSeleccionSimple } from '../../components/cantera/articles/ArticleSeleccionSimple';
import { ArticleVideoSeleccionSimple } from '../../components/cantera/articles/ArticleVideoSeleccionSimple';
import { ArticleSeleccionDoble } from '../../components/cantera/articles/ArticleSeleccionDoble';
import { ArticleVideoSeleccionDoble } from '../../components/cantera/articles/ArticleVideoSeleccionDoble';
import { ArticleVideoAnidacion } from '../../components/cantera/articles/ArticleVideoAnidacion';
import { ArticleSeleccionMultiple } from '../../components/cantera/articles/ArticleSeleccionMultiple';
import { ArticleVideoSeleccionMultiple } from '../../components/cantera/articles/ArticleVideoSeleccionMultiple';
import { ArticleEjerciciosSeleccion } from '../../components/cantera/articles/ArticleEjerciciosSeleccion';
import { ArticleEjerciciosSeleccion2 } from '../../components/cantera/articles/ArticleEjerciciosSeleccion2';
import { ArticleEvaluacionCore } from '../../components/cantera/articles/ArticleEvaluacionCore';
import { ArticleActividadGrupo } from '../../components/cantera/articles/ArticleActividadGrupo';

export const seleccionArticles: Article[] = [
  {
    id: 'seleccion-01',
    slug: '01-introduccion',
    title: 'Introducción a la Selección',
    category: 'Estructuras de Selección',
    summary: 'Qué son las estructuras de selección, su representación visual y el uso del Laboratorio de Flujo.',
    component: ArticleSeleccionIntroduccion,
    type: 'lesson',
  },
  {
    id: 'seleccion-02',
    slug: '02-seleccion-simple',
    title: 'Selección Simple (Si)',
    category: 'Estructuras de Selección',
    summary: 'Uso de operadores relacionales y lógicos para tomar decisiones simples usando Si-Entonces.',
    component: ArticleSeleccionSimple,
    type: 'lesson',
  },
  {
    id: 'seleccion-video-01',
    slug: 'video-apoyo-seleccion-1',
    title: 'Apoyo Visual: Selección Simple',
    category: 'Estructuras de Selección',
    summary: 'Video explicativo sobre las estructuras de selección y el algoritmo para hallar el mayor de dos números.',
    component: ArticleVideoSeleccionSimple,
    type: 'video',
  },
  {
    id: 'seleccion-03',
    slug: '03-seleccion-doble',
    title: 'Selección Doble (Si-Sino)',
    category: 'Estructuras de Selección',
    summary: 'Cómo manejar alternativas con Si-Sino y el concept fundamental de la anidación.',
    component: ArticleSeleccionDoble,
    type: 'lesson',
  },
  {
    id: 'seleccion-video-02',
    slug: 'video-apoyo-seleccion-doble',
    title: 'Apoyo Visual: Selección Doble',
    category: 'Estructuras de Selección',
    summary: 'Explicación del uso de alternativas (Sino) y el reto de la suma de dos números.',
    component: ArticleVideoSeleccionDoble,
    type: 'video',
  },
  {
    id: 'seleccion-video-03',
    slug: 'video-anidacion',
    title: 'Apoyo Visual: Anidación',
    category: 'Estructuras de Selección',
    summary: 'Video sobre el concepto de anidamiento y la clasificación de triángulos.',
    component: ArticleVideoAnidacion,
    type: 'video',
  },
  {
    id: 'seleccion-04',
    slug: '04-seleccion-multiple',
    title: 'Selección Múltiple (Caso)',
    category: 'Estructuras de Selección',
    summary: 'Uso de la estructura Caso para manejar múltiples opciones específicas de forma organizada.',
    component: ArticleSeleccionMultiple,
    type: 'lesson',
  },
  {
    id: 'seleccion-video-04',
    slug: 'video-apoyo-seleccion-multiple',
    title: 'Apoyo Visual: Selección Múltiple',
    category: 'Estructuras de Selección',
    summary: 'Video sobre el funcionamiento de la estructura Caso y el ejercicio de los días de la semana.',
    component: ArticleVideoSeleccionMultiple,
    type: 'video',
  },
  {
    id: 'seleccion-05',
    slug: '05-ejercicios-practicos',
    title: 'Ejercicios de Selección · Sección 1',
    category: 'Estructuras de Selección',
    summary: 'Colección de 10 ejercicios prácticos para aplicar estructuras de decisión simples, dobles y múltiples.',
    component: ArticleEjerciciosSeleccion,
    type: 'lesson',
  },
  {
    id: 'seleccion-06',
    slug: '06-ejercicios-practicos-2',
    title: 'Ejercicios de Selección · Sección 2',
    category: 'Estructuras de Selección',
    summary: 'Segunda tanda de ejercicios (11–21): corridas en frío, puntos adicionales, consecutivos, mínimo de tres, ordenación, series, par/impar, rangos, productos almacén, días de la semana y verificación de carácter.',
    component: ArticleEjerciciosSeleccion2,
    type: 'lesson',
  },
  {
    id: 'seleccion-07',
    slug: '07-evaluacion-core',
    title: 'Evaluación Core · Parcial 1',
    category: 'Evaluaciones y Actividades',
    summary: 'Simulador de examen de pseudocódigo en base a 10. Evalúa 4 retos privados en lote con tiempo, telemetría y exportación a PDF.',
    component: ArticleEvaluacionCore,
    type: 'lesson',
  },
  {
    id: 'seleccion-08',
    slug: '08-actividad-grupo',
    title: 'Actividad Grupal · Clasificatoria Mundial',
    category: 'Evaluaciones y Actividades',
    summary: 'Reto en equipo de 3. Explica el razonamiento lógico para determinar el primer y segundo lugar con desempate por diferencia de goles.',
    component: ArticleActividadGrupo,
    type: 'lesson',
  }
];
