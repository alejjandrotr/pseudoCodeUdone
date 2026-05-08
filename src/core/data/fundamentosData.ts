import { Article } from '../types/article';
import { ArticleIdentificadores } from '../../components/cantera/articles/ArticleIdentificadores';
import { ArticleConstantesVariables } from '../../components/cantera/articles/ArticleConstantesVariables';
import { ArticleFormatoAlgoritmo } from '../../components/cantera/articles/ArticleFormatoAlgoritmo';
import { ArticleTiposDatos } from '../../components/cantera/articles/ArticleTiposDatos';
import { ArticleEscritura } from '../../components/cantera/articles/ArticleEscritura';
import { ArticleAsignacion } from '../../components/cantera/articles/ArticleAsignacion';
import { ArticleLectura } from '../../components/cantera/articles/ArticleLectura';
import { ArticleVideosRelacionados } from '../../components/cantera/articles/ArticleVideosRelacionados';
import { ArticleEjerciciosSecuenciacion } from '../../components/cantera/articles/ArticleEjerciciosSecuenciacion';
import { ExerciseLabView } from '../../components/cantera/ExerciseLabView';

export const fundamentosArticles: Article[] = [
  {
    id: 'fundamentos-01',
    slug: '01-identificadores',
    title: 'Los Identificadores',
    category: 'Fundamentos',
    summary: 'Reglas obligatorias y recomendaciones de buen código para nombrar variables, constantes y funciones.',
    component: ArticleIdentificadores,
    type: 'lesson',
  },
  {
    id: 'fundamentos-02',
    slug: '02-constantes-y-variables',
    title: 'Constantes y Variables',
    category: 'Fundamentos',
    summary: 'Diferencia entre datos fijos y datos mutables, tipos atómicos y sus límites en memoria.',
    component: ArticleConstantesVariables,
    type: 'lesson',
  },
  {
    id: 'fundamentos-03',
    slug: '03-formato-general-algoritmo',
    title: 'Formato General de un Algoritmo',
    category: 'Fundamentos',
    summary: 'Estructura estándar con cabecera, declaración e inicio/fin que seguiremos en clase.',
    component: ArticleFormatoAlgoritmo,
    type: 'lesson',
  },
  {
    id: 'fundamentos-05',
    slug: '05-tipos-datos',
    title: 'Tipos de Datos y Expresiones',
    category: 'Fundamentos',
    summary: 'Los 5 tipos fundamentales, operadores aritméticos (DIV, MOD), lógicos y jerarquía de operaciones.',
    component: ArticleTiposDatos,
    type: 'lesson',
  },
  {
    id: 'fundamentos-06',
    slug: '06-ejercicios',
    title: 'Laboratorio Interactivo',
    category: 'Fundamentos',
    summary: 'Ejercicios prácticos de nombramiento de variables, identificación de errores y operaciones lógicas.',
    component: ExerciseLabView,
    type: 'exercise',
  },
  {
    id: 'op-01',
    slug: '01-escritura',
    title: 'Escritura (Mostrar Datos)',
    category: 'Operaciones Básicas',
    summary: 'Cómo mostrar información por pantalla para que el algoritmo se comunique con el exterior.',
    component: ArticleEscritura,
    type: 'lesson',
  },
  {
    id: 'op-02',
    slug: '02-asignacion',
    title: 'Asignación (Guardar Datos)',
    category: 'Operaciones Básicas',
    summary: 'El proceso de dar un valor a las variables y visualizar cómo cambian en la memoria.',
    component: ArticleAsignacion,
    type: 'lesson',
  },
  {
    id: 'op-03',
    slug: '03-lectura',
    title: 'Lectura (Pedir Datos al Usuario)',
    category: 'Operaciones Básicas',
    summary: 'Cómo solicitar valores al usuario a través del teclado durante la ejecución.',
    component: ArticleLectura,
    type: 'lesson',
  },
  {
    id: 'op-04',
    slug: '04-videos-relacionados',
    title: 'Videos Relacionados',
    category: 'Operaciones Básicas',
    summary: 'Clases grabadas con explicaciones teóricas y resolución de ejercicios prácticos.',
    component: ArticleVideosRelacionados,
    type: 'video',
  },
  {
    id: 'op-05',
    slug: '05-ejercicios-secuenciacion',
    title: 'Ejercicios de Secuenciación',
    category: 'Operaciones Básicas',
    summary: '21 ejercicios prácticos con resolución guiada por IA para dominar el diseño secuencial.',
    component: ArticleEjerciciosSecuenciacion,
    type: 'exercise',
  },
];
