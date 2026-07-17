import { Article } from '../types/article';
import { ArticleArreglosIntroduccion } from '../../components/cantera/articles/ArticleArreglosIntroduccion';
import { ArticleArreglos } from '../../components/cantera/articles/ArticleArreglos';
import { ArticleArreglosIteracion } from '../../components/cantera/articles/ArticleArreglosIteracion';
import { ArticleVideoArreglos1 } from '../../components/cantera/articles/ArticleVideoArreglos1';
import { ArticleVideoArreglos2 } from '../../components/cantera/articles/ArticleVideoArreglos2';
import { ArticleVideoArreglos3 } from '../../components/cantera/articles/ArticleVideoArreglos3';
import { ArticleArreglosBusqueda } from '../../components/cantera/articles/ArticleArreglosBusqueda';
import { ArticleArreglosOrdenamiento } from '../../components/cantera/articles/ArticleArreglosOrdenamiento';
import { ArticleArreglosParalelos } from '../../components/cantera/articles/ArticleArreglosParalelos';
import { ArticleArreglosEjerciciosResueltos } from '../../components/cantera/articles/ArticleArreglosEjerciciosResueltos';
import { ArticleEjerciciosArreglos } from '../../components/cantera/articles/ArticleEjerciciosArreglos';

export const arreglosArticles: Article[] = [
  {
    id: 'arreglos-01',
    slug: '01-introduccion-arreglos',
    title: 'Introducción a los Arreglos Unidimensionales',
    category: 'Arreglos',
    summary: 'Motivación y el problema de la escalabilidad al guardar múltiples valores bajo un mismo contexto.',
    component: ArticleArreglosIntroduccion,
    type: 'lesson',
  },
  {
    id: 'arreglos-02',
    slug: '02-definicion-arreglos',
    title: 'Definición y Uso de Arreglos',
    category: 'Arreglos',
    summary: 'Definición formal, estructura estática, restricciones operacionales y operaciones secuenciales (sin ciclos) en memoria.',
    component: ArticleArreglos,
    type: 'lesson',
  },
  {
    id: 'arreglos-03',
    slug: '03-iterando-arreglos',
    title: 'Iterando o Accediendo a Datos',
    category: 'Arreglos',
    summary: 'Uso de índices dinámicos, el ciclo Para aplicado a arreglos y casos avanzados como estructuras tipo diccionario.',
    component: ArticleArreglosIteracion,
    type: 'lesson',
  },
  {
    id: 'arreglos-vid-1',
    slug: '2.1-video-arreglos',
    title: 'Apoyo Visual: Arreglos (1/5)',
    category: 'Arreglos',
    summary: 'Video introductorio sobre estructuras de datos y conceptos básicos de arreglos.',
    component: ArticleVideoArreglos1,
    type: 'video',
  },
  {
    id: 'arreglos-vid-2',
    slug: '2.2-video-asignacion',
    title: 'Apoyo Visual: Asignación y Lectura (2/5)',
    category: 'Arreglos',
    summary: 'Operaciones fundamentales de asignación, lectura y escritura en posiciones de arreglos.',
    component: ArticleVideoArreglos2,
    type: 'video',
  },
  {
    id: 'arreglos-vid-3',
    slug: '3.1-video-ciclos',
    title: 'Apoyo Visual: Arreglos y Ciclos (3/5)',
    category: 'Arreglos',
    summary: 'Integración óptima de los arreglos con estructuras repetitivas (ciclo Para).',
    component: ArticleVideoArreglos3,
    type: 'video',
  },
  {
    id: 'arreglos-04',
    slug: '04-busqueda',
    title: 'Búsqueda en Arreglos',
    category: 'Arreglos',
    summary: 'Técnicas de búsqueda: Secuencial, Búsqueda del Mayor/Menor y Búsqueda Binaria.',
    component: ArticleArreglosBusqueda,
    type: 'lesson',
  },
  {
    id: 'arreglos-05',
    slug: '05-ordenamiento',
    title: 'Ordenamiento de Arreglos',
    category: 'Arreglos',
    summary: 'Algoritmos fundamentales: Método de la Burbuja, Selección e Inserción.',
    component: ArticleArreglosOrdenamiento,
    type: 'lesson',
  },
  {
    id: 'arreglos-06',
    slug: '06-arreglos-paralelos-y-operaciones',
    title: 'Arreglos Paralelos y Operaciones',
    category: 'Arreglos',
    summary: 'Uso de arreglos paralelos para datos relacionados e inserción/eliminación con desplazamientos.',
    component: ArticleArreglosParalelos,
    type: 'lesson',
  },
  {
    id: 'arreglos-07',
    slug: '07-ejercicios-resueltos',
    title: 'Ejercicios Resueltos',
    category: 'Arreglos',
    summary: 'Práctica general: Inversión, mezcla, filtrado por pares y búsquedas avanzadas con arreglos paralelos.',
    component: ArticleArreglosEjerciciosResueltos,
    type: 'lesson',
  },
  {
    id: 'arreglos-08',
    slug: '08-ejercicios-propuestos',
    title: 'Ejercicios Propuestos: Arreglos',
    category: 'Arreglos',
    summary: 'Colección de 6 ejercicios propuestos para práctica de arreglos unidimensionales y arreglos paralelos.',
    component: ArticleEjerciciosArreglos,
    type: 'lesson',
  }
];
