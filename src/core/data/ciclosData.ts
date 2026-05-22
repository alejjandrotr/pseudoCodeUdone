import { Article } from '../types/article';
import { ArticleCiclosIntroduccion } from '../../components/cantera/articles/ArticleCiclosIntroduccion';
import { ArticleVideoIntroduccion } from '../../components/cantera/articles/ArticleVideoIntroduccion';
import { ArticleMientras } from '../../components/cantera/articles/ArticleMientras';
import { ArticleVideoMientras } from '../../components/cantera/articles/ArticleVideoMientras';
import { ArticleRepetir } from '../../components/cantera/articles/ArticleRepetir';
import { ArticleVideoRepetir } from '../../components/cantera/articles/ArticleVideoRepetir';
import { ArticlePara } from '../../components/cantera/articles/ArticlePara';
import { ArticleVideoPara } from '../../components/cantera/articles/ArticleVideoPara';
import { ArticleEjerciciosResueltos } from '../../components/cantera/articles/ArticleEjerciciosResueltos';
import { ArticleEjerciciosCiclos } from '../../components/cantera/articles/ArticleEjerciciosCiclos';

export const ciclosArticles: Article[] = [
  {
    id: 'ciclos-01',
    slug: '01-introduccion-ciclos',
    title: 'Introducción a los Ciclos',
    category: 'Ciclos Repetitivos',
    summary: 'Qué son los ciclos repetitivos, la analogía del salón de clases y el simulador interactivo de bucles.',
    component: ArticleCiclosIntroduccion,
    type: 'lesson',
  },
  {
    id: 'ciclos-video-01',
    slug: '1.1-video-introduccion',
    title: 'Apoyo Visual: Introducción Repetitivos',
    category: 'Ciclos Repetitivos',
    summary: 'Análisis audiovisual introductorio sobre estructuras repetitivas, carrusel de conceptos y playground sintáctico.',
    component: ArticleVideoIntroduccion,
    type: 'video',
  },
  {
    id: 'ciclos-02',
    slug: '2-mientras',
    title: 'El Ciclo "Mientras" (While)',
    category: 'Ciclos Repetitivos',
    summary: 'Conceptos de pre-condición condicional, prevención de bucles infinitos, contadores y simulador interactivo de sumas sucesivas.',
    component: ArticleMientras,
    type: 'lesson',
  },
  {
    id: 'ciclos-video-02',
    slug: '2.1-video-mientras',
    title: 'Apoyo Visual: Mientras y Decremento',
    category: 'Ciclos Repetitivos',
    summary: 'Análisis audiovisual de la sintaxis del bucle Mientras y lecciones sobre control por decremento y seguridad algorítmica.',
    component: ArticleVideoMientras,
    type: 'video',
  },
  {
    id: 'ciclos-03',
    slug: '3-repetir',
    title: 'El Ciclo "Repetir" (Do-While)',
    category: 'Ciclos Repetitivos',
    summary: 'Conceptos de post-condición condicional, validación segura de datos, y simulador interactivo de calificaciones.',
    component: ArticleRepetir,
    type: 'lesson',
  },
  {
    id: 'ciclos-video-03',
    slug: '3.1-video-repetir',
    title: 'Apoyo Visual: Repetir y Parada',
    category: 'Ciclos Repetitivos',
    summary: 'Análisis audiovisual de la estructura Repetir, lógica booleana inversa de parada y trazador de sumas condicionales.',
    component: ArticleVideoRepetir,
    type: 'video',
  },
  {
    id: 'ciclos-04',
    slug: '4-para',
    title: 'El Ciclo "Para" (For)',
    category: 'Ciclos Repetitivos',
    summary: 'Conceptos del ciclo determinado Para, automatización de índice en una sola línea y simulador generador de tablas de multiplicar.',
    component: ArticlePara,
    type: 'lesson',
  },
  {
    id: 'ciclos-video-04',
    slug: '4.1-video-para',
    title: 'Apoyo Visual: Para e Iteración Determinada',
    category: 'Ciclos Repetitivos',
    summary: 'Análisis audiovisual del ciclo Para, matriz comparativa de las tres estructuras y trazador del sumador determinado.',
    component: ArticleVideoPara,
    type: 'video',
  },
  {
    id: 'ciclos-05',
    slug: '5-ejercicios-resueltos',
    title: 'Práctica Guiada: Ejercicios Resueltos',
    category: 'Ciclos Repetitivos',
    summary: 'Cuaderno digital interactivo con traza en vivo paso a paso de los 5 algoritmos clave sobre contadores, acumuladores y banderas.',
    component: ArticleEjerciciosResueltos,
    type: 'lesson',
  },
  {
    id: 'ciclos-06',
    slug: '6-ejercicios-propuestos',
    title: 'Ejercicios Propuestos: Repetición',
    category: 'Ciclos Repetitivos',
    summary: 'Coleción de 8 ejercicios propuestos para práctica de ciclos: concatenación con centinela, estadísticas, mayor/menor en 40 números, producto y división por ciclos, nómina de empleados, evaluación de asignatura y serie Fibonacci.',
    component: ArticleEjerciciosCiclos,
    type: 'lesson',
  }
];
