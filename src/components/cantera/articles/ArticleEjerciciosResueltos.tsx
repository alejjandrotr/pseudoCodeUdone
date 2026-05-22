import React, { useState, useEffect, useRef } from 'react';
import { P, PageSection, Callout, Strong, InlineCode } from '../ArticlePageComponents';
import { Play, Pause, RotateCcw, Box, TerminalSquare, ChevronRight, Eye, EyeOff, CheckCircle, BookOpen, Layers } from 'lucide-react';

export const ArticleEjerciciosResueltos: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0); // 0 = Clasificador, 1 = Restas, 2 = Notas, 3 = Factorial, 4 = Pares

  // --- TRACE STATES FOR ALL 5 EXERCISES ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [simStep, setSimStep] = useState<number>(0);
  const [showDebug, setShowDebug] = useState<boolean>(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  
  // Interactive Console input
  const [consoleInputValue, setConsoleInputValue] = useState('');
  const [isWaitingInput, setIsWaitingInput] = useState(false);
  const [wasPlayingBeforeInput, setWasPlayingBeforeInput] = useState(false);
  const consoleInputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // --- RAM STATE VARIABLES (COMBINED) ---
  const [numero, setNumero] = useState<number | null>(null);
  const [cProcesados, setCProcesados] = useState<number>(0);
  const [cPositivos, setCPositivos] = useState<number>(0);
  const [cNegativos, setCNegativos] = useState<number>(0);
  const [cPares, setCPares] = useState<number>(0);
  const [cImpares, setCImpares] = useState<number>(0);

  const [p, setP] = useState<number | null>(null);
  const [s, setS] = useState<number | null>(null);
  const [dividendo, setDividendo] = useState<number | null>(null);
  const [divisor, setDivisor] = useState<number | null>(null);
  const [cDivisiones, setCDivisiones] = useState<number>(0);

  const [notaFinal, setNotaFinal] = useState<number>(0);
  const [currentNota, setCurrentNota] = useState<number | null>(null);
  const [cStudents, setCStudents] = useState<number>(0);
  const [cAprobados, setCAprobados] = useState<number>(0);
  const [cReprobados, setCReprobados] = useState<number>(0);
  const [cReparacion, setCReparacion] = useState<number>(0);
  const [continuar, setContinuar] = useState<string>('S');
  const [examIdx, setExamIdx] = useState<number>(1);
  const [projIdx, setProjIdx] = useState<number>(1);
  const [workIdx, setWorkIdx] = useState<number>(1);

  const [factorialN, setFactorialN] = useState<number | null>(null);
  const [factorialAns, setFactorialAns] = useState<number>(1);

  const [paresN1, setParesN1] = useState<number | null>(null);
  const [paresN2, setParesN2] = useState<number | null>(null);
  const [paresI, setParesI] = useState<number | null>(null);

  // Robust State Ref protecting against stale React closures
  const stateRef = useRef({
    activeTab,
    simStep,
    isPlaying,
    isWaitingInput,
    wasPlayingBeforeInput,
    
    numero,
    cProcesados,
    cPositivos,
    cNegativos,
    cPares,
    cImpares,

    p,
    s,
    dividendo,
    divisor,
    cDivisiones,

    notaFinal,
    currentNota,
    cStudents,
    cAprobados,
    cReprobados,
    cReparacion,
    continuar,
    examIdx,
    projIdx,
    workIdx,

    factorialN,
    factorialAns,

    paresN1,
    paresN2,
    paresI
  });

  useEffect(() => {
    stateRef.current = {
      activeTab,
      simStep,
      isPlaying,
      isWaitingInput,
      wasPlayingBeforeInput,
      
      numero,
      cProcesados,
      cPositivos,
      cNegativos,
      cPares,
      cImpares,

      p,
      s,
      dividendo,
      divisor,
      cDivisiones,

      notaFinal,
      currentNota,
      cStudents,
      cAprobados,
      cReprobados,
      cReparacion,
      continuar,
      examIdx,
      projIdx,
      workIdx,

      factorialN,
      factorialAns,

      paresN1,
      paresN2,
      paresI
    };
  }, [
    activeTab, simStep, isPlaying, isWaitingInput, wasPlayingBeforeInput,
    numero, cProcesados, cPositivos, cNegativos, cPares, cImpares,
    p, s, dividendo, divisor, cDivisiones,
    notaFinal, currentNota, cStudents, cAprobados, cReprobados, cReparacion, continuar, examIdx, projIdx, workIdx,
    factorialN, factorialAns,
    paresN1, paresN2, paresI
  ]);

  const EXERCISE_CODES = [
    // 0: Clasificador Estadístico
    [
      'Algoritmo estadisticas_numeros',
      'Variables:',
      '    numero, cont_procesados, cont_positivos, cont_negativos, cont_pares, cont_impares: Entero',
      'Inicio',
      '    cont_procesados <- 0; cont_positivos <- 0; cont_negativos <- 0; cont_pares <- 0; cont_impares <- 0',
      '    Escribir "Indique el número a procesar (Ingrese 0 para salir): "',
      '    Leer numero',
      '    Mientras (numero <> 0) Hacer',
      '        cont_procesados <- cont_procesados + 1',
      '        Si (numero > 0) Entonces cont_positivos <- cont_positivos + 1',
      '        SiNo cont_negativos <- cont_negativos + 1 Fin Si',
      '        Si (numero MOD 2 = 0) Entonces cont_pares <- cont_pares + 1',
      '        SiNo cont_impares <- cont_impares + 1 Fin Si',
      '        Escribir "Indique el siguiente número (Ingrese 0 para salir): "',
      '        Leer numero',
      '    Fin Mientras',
      '    Escribir "Procesados: ", cont_procesados, " | Positivos: ", cont_positivos, " | Negativos: ", cont_negativos',
      'Fin'
    ],
    // 1: Restas Sucesivas
    [
      'Algoritmo division_por_restas',
      'Variables:',
      '    p, s, dividendo, divisor, cont_divisiones: Entero',
      'Inicio',
      '    Escribir "Indique el dividendo (P): "',
      '    Leer p',
      '    Escribir "Indique el divisor (S): "',
      '    Leer s',
      '    dividendo <- p; divisor <- s; cont_divisiones <- 0',
      '    Mientras (dividendo >= divisor) Hacer',
      '        dividendo <- dividendo - divisor',
      '        cont_divisiones <- cont_divisiones + 1',
      '    Fin Mientras',
      '    Escribir "El resultado es: ", cont_divisiones',
      '    Escribir "El residuo es: ", dividendo',
      'Fin'
    ],
    // 2: Calificaciones Universitarias
    [
      'Algoritmo calculo_de_notas',
      'Variables:',
      '    nota, nota_final: Real; i, cont_aprobados, cont_reprobados, cont_reparacion: Entero; continuar: Caracter',
      'Inicio',
      '    cont_aprobados <- 0; cont_reprobados <- 0; cont_reparacion <- 0',
      '    Repetir',
      '        nota_final <- 0',
      '        Para i <- 1 Hasta 3 Hacer Escribir "Examen ", i; Leer nota; nota_final <- nota_final + (nota * 0.166) Fin Para',
      '        Para i <- 1 Hasta 3 Hacer Escribir "Proyecto ", i; Leer nota; nota_final <- nota_final + (nota * 0.066) Fin Para',
      '        Para i <- 1 Hasta 1 Hacer Escribir "Trabajo ", i; Leer nota; nota_final <- nota_final + (nota * 0.3) Fin Para',
      '        Escribir "La nota definitiva es: ", nota_final',
      '        Si (nota_final >= 4.5) Entonces cont_aprobados <- cont_aprobados + 1',
      '        SiNo cont_reprobados <- cont_reprobados + 1',
      '             Si (nota_final > 3.75) Entonces cont_reparacion <- cont_reparacion + 1 Fin Si Fin Si',
      '        Escribir "¿Desea procesar otro estudiante? (S/N): "',
      '        Leer continuar',
      '    Hasta (continuar = "N" O continuar = "n")',
      '    Escribir "Aprobados: ", cont_aprobados, " | Reprobados: ", cont_reprobados, " | Reparación: ", cont_reparacion',
      'Fin'
    ],
    // 3: Factorial
    [
      'Algoritmo factorial',
      'Variables:',
      '    n, respuesta: Entero',
      'Inicio',
      '    respuesta <- 1',
      '    Escribir "Indique el número para su factorial: "',
      '    Leer n',
      '    Mientras (n > 1) Hacer',
      '        respuesta <- respuesta * n',
      '        n <- n - 1',
      '    Fin Mientras',
      '    Escribir "El factorial es: ", respuesta',
      'Fin'
    ],
    // 4: Generador de Pares
    [
      'Algoritmo pares_entre_dos_numeros',
      'Variables:',
      '    numero1, numero2, i: Entero',
      'Inicio',
      '    Escribir "Indique el límite inferior: "',
      '    Leer numero1',
      '    Escribir "Indique el límite superior: "',
      '    Leer numero2',
      '    Escribir "Imprimiendo números pares en el rango:"',
      '    Para i <- numero1 Hasta numero2 Hacer',
      '        Si (i MOD 2 = 0) Entonces Escribir i Fin Si',
      '    Fin Para',
      'Fin'
    ]
  ];

  // Auto-play timer
  useEffect(() => {
    if (isPlaying && !isWaitingInput) {
      intervalRef.current = setInterval(() => {
        advanceSimulation();
      }, 1250);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, isWaitingInput, simStep, activeTab]);

  // Focus terminal input
  useEffect(() => {
    if (isWaitingInput && consoleInputRef.current) {
      consoleInputRef.current.focus();
    }
  }, [isWaitingInput]);

  const resetSimulation = () => {
    setIsPlaying(false);
    setIsWaitingInput(false);
    setConsoleInputValue('');
    setActiveLine(null);
    setSimStep(0);
    setTerminalLogs([]);
    setDebugLogs(['> Workbook digital listo. Selecciona una pestaña y pulsa Siguiente Paso.']);
    
    // Reset variables
    setNumero(null); setCProcesados(0); setCPositivos(0); setCNegativos(0); setCPares(0); setCImpares(0);
    setP(null); setS(null); setDividendo(null); setDivisor(null); setCDivisiones(0);
    setNotaFinal(0); setCurrentNota(null); setCStudents(0); setCAprobados(0); setCReprobados(0); setCReparacion(0); setContinuar('S');
    setExamIdx(1); setProjIdx(1); setWorkIdx(1);
    setFactorialN(null); setFactorialAns(1);
    setParesN1(null); setParesN2(null); setParesI(null);
  };

  useEffect(() => {
    resetSimulation();
  }, [activeTab]);

  const advanceSimulation = () => {
    const state = stateRef.current;
    if (state.isWaitingInput) return;

    if (state.activeTab === 0) {
      // --- EXERCISE 1: CLASIFICADOR ---
      switch (state.simStep) {
        case 0:
          setActiveLine(5);
          setCProcesados(0); setCPositivos(0); setCNegativos(0); setCPares(0); setCImpares(0);
          setDebugLogs(prev => [...prev, '> [Línea 5] Inicializar contadores a 0']);
          setSimStep(1);
          break;
        case 1:
          setActiveLine(6);
          setTerminalLogs(['Indique el número a procesar (Ingrese 0 para salir): ']);
          setWasPlayingBeforeInput(state.isPlaying);
          setIsPlaying(false);
          setIsWaitingInput(true);
          break;
        case 2:
          setActiveLine(8);
          const inputNum = state.numero ?? 0;
          const keepLooping = inputNum !== 0;
          setDebugLogs(prev => [...prev, `> [Línea 8] Evaluar: ¿numero (${inputNum}) <> 0? ➔ ${keepLooping ? 'VERDADERO (Itera)' : 'FALSO (Termina)'}`]);
          if (keepLooping) {
            setSimStep(3);
          } else {
            setSimStep(6);
          }
          break;
        case 3:
          setActiveLine(9);
          const nextProcessed = state.cProcesados + 1;
          setCProcesados(nextProcessed);
          setDebugLogs(prev => [...prev, `> [Línea 9] Incrementar cont_procesados ➔ ${nextProcessed}`]);
          setSimStep(4);
          break;
        case 4:
          setActiveLine(10);
          const n = state.numero ?? 0;
          if (n > 0) {
            setCPositivos(prev => prev + 1);
            setDebugLogs(prev => [...prev, `> [Línea 10] Positivo: cont_positivos se incrementa.`]);
          } else {
            setCNegativos(prev => prev + 1);
            setDebugLogs(prev => [...prev, `> [Línea 11] Negativo: cont_negativos se incrementa.`]);
          }
          setSimStep(5);
          break;
        case 5:
          setActiveLine(12);
          const isEven = (state.numero ?? 0) % 2 === 0;
          if (isEven) {
            setCPares(prev => prev + 1);
            setDebugLogs(prev => [...prev, `> [Línea 12] Par: cont_pares se incrementa.`]);
          } else {
            setCImpares(prev => prev + 1);
            setDebugLogs(prev => [...prev, `> [Línea 13] Impar: cont_impares se incrementa.`]);
          }
          setSimStep(1); // Ask next number
          break;
        case 6:
          setActiveLine(17);
          setTerminalLogs(prev => [
            ...prev,
            `Procesados: ${state.cProcesados} | Positivos: ${state.cPositivos} | Negativos: ${state.cNegativos} | Pares: ${state.cPares} | Impares: ${state.cImpares}`
          ]);
          setDebugLogs(prev => [...prev, '> [Línea 17] Mostrar estadísticas finales acumuladas']);
          setSimStep(7);
          break;
        case 7:
          setActiveLine(18);
          setDebugLogs(prev => [...prev, '> [Línea 18] Fin de la ejecución.']);
          setIsPlaying(false);
          setSimStep(8);
          break;
        default:
          resetSimulation();
          break;
      }
    } else if (state.activeTab === 1) {
      // --- EXERCISE 2: DIVISION RESTAS ---
      switch (state.simStep) {
        case 0:
          setActiveLine(5);
          setTerminalLogs(['Indique el dividendo (P): ']);
          setWasPlayingBeforeInput(state.isPlaying);
          setIsPlaying(false);
          setIsWaitingInput(true);
          break;
        case 1:
          setActiveLine(7);
          setTerminalLogs(prev => [...prev, 'Indique el divisor (S): ']);
          setWasPlayingBeforeInput(state.isPlaying);
          setIsPlaying(false);
          setIsWaitingInput(true);
          break;
        case 2:
          setActiveLine(9);
          setDividendo(state.p);
          setDivisor(state.s);
          setCDivisiones(0);
          setDebugLogs(prev => [...prev, `> [Línea 9] Asignación: dividendo <- ${state.p}, divisor <- ${state.s}, cont_divisiones <- 0`]);
          setSimStep(3);
          break;
        case 3:
          setActiveLine(10);
          const currentDiv = state.dividendo ?? 0;
          const currentDivisor = state.divisor ?? 1;
          const canSubtract = currentDiv >= currentDivisor;
          setDebugLogs(prev => [...prev, `> [Línea 10] Evaluar: ¿dividendo (${currentDiv}) >= divisor (${currentDivisor})? ➔ ${canSubtract ? 'VERDADERO' : 'FALSO'}`]);
          if (canSubtract) {
            setSimStep(4);
          } else {
            setSimStep(5);
          }
          break;
        case 4:
          setActiveLine(11);
          const nextDiv = (state.dividendo ?? 0) - (state.divisor ?? 0);
          const nextCount = state.cDivisiones + 1;
          setDividendo(nextDiv);
          setCDivisiones(nextCount);
          setDebugLogs(prev => [...prev, `> [Línea 11] Resta: dividendo <- ${nextDiv}, cont_divisiones <- ${nextCount}`]);
          setSimStep(3); // loop back
          break;
        case 5:
          setActiveLine(14);
          setTerminalLogs(prev => [...prev, `El resultado es: ${state.cDivisiones}`]);
          setDebugLogs(prev => [...prev, `> [Línea 14] Cociente final calculado: ${state.cDivisiones}`]);
          setSimStep(6);
          break;
        case 6:
          setActiveLine(15);
          setTerminalLogs(prev => [...prev, `El residuo es: ${state.dividendo}`]);
          setDebugLogs(prev => [...prev, `> [Línea 15] Residuo de división entera: ${state.dividendo}`]);
          setSimStep(7);
          break;
        case 7:
          setActiveLine(16);
          setDebugLogs(prev => [...prev, '> [Línea 16] Fin del algoritmo.']);
          setIsPlaying(false);
          setSimStep(8);
          break;
        default:
          resetSimulation();
          break;
      }
    } else if (state.activeTab === 2) {
      // --- EXERCISE 3: CALIFICACIONES ---
      switch (state.simStep) {
        case 0:
          setActiveLine(5);
          setCAprobados(0); setCReprobados(0); setCReparacion(0);
          setDebugLogs(prev => [...prev, '> [Línea 5] Inicializar totalizadores globales de notas']);
          setSimStep(1);
          break;
        case 1:
          setActiveLine(6);
          setDebugLogs(prev => [...prev, '> [Línea 6] Repetir: Iniciando procesamiento de estudiante']);
          setSimStep(2);
          break;
        case 2:
          setActiveLine(7);
          setNotaFinal(0);
          setExamIdx(1);
          setDebugLogs(prev => [...prev, '> [Línea 7] Reiniciar nota_final <- 0 para este alumno']);
          setSimStep(3);
          break;
        case 3:
          // Exams Para Loop (Line 8)
          setActiveLine(8);
          if (state.examIdx <= 3) {
            setTerminalLogs(prev => [...prev, `Examen ${state.examIdx} (Nota 0 a 5): `]);
            setWasPlayingBeforeInput(state.isPlaying);
            setIsPlaying(false);
            setIsWaitingInput(true);
          } else {
            setProjIdx(1);
            setSimStep(4); // Move to Projects
          }
          break;
        case 4:
          // Projects Para Loop (Line 9)
          setActiveLine(9);
          if (state.projIdx <= 3) {
            setTerminalLogs(prev => [...prev, `Proyecto ${state.projIdx} (Nota 0 a 5): `]);
            setWasPlayingBeforeInput(state.isPlaying);
            setIsPlaying(false);
            setIsWaitingInput(true);
          } else {
            setWorkIdx(1);
            setSimStep(5); // Move to Works
          }
          break;
        case 5:
          // Work Para Loop (Line 10)
          setActiveLine(10);
          if (state.workIdx <= 1) {
            setTerminalLogs(prev => [...prev, `Trabajo ${state.workIdx} (Nota 0 a 5): `]);
            setWasPlayingBeforeInput(state.isPlaying);
            setIsPlaying(false);
            setIsWaitingInput(true);
          } else {
            setSimStep(6); // Move to def evaluation
          }
          break;
        case 6:
          setActiveLine(11);
          setTerminalLogs(prev => [...prev, `La nota definitiva es: ${state.notaFinal.toFixed(2)}`]);
          setDebugLogs(prev => [...prev, `> [Línea 11] Escribir nota definitiva calculada: ${state.notaFinal.toFixed(2)}`]);
          setSimStep(7);
          break;
        case 7:
          setActiveLine(12);
          const finalScore = state.notaFinal;
          if (finalScore >= 4.5) {
            setCAprobados(prev => prev + 1);
            setDebugLogs(prev => [...prev, `> [Línea 12] Aprobado: cont_aprobados incrementado.`]);
            setSimStep(9);
          } else {
            setCReprobados(prev => prev + 1);
            setDebugLogs(prev => [...prev, `> [Línea 13] Reprobado: cont_reprobados incrementado.`]);
            setSimStep(8);
          }
          break;
        case 8:
          setActiveLine(14);
          if (state.notaFinal > 3.75) {
            setCAprobados(prev => prev + 1);
            setCReparacion(prev => prev + 1);
            setDebugLogs(prev => [...prev, `> [Línea 14] Recuperación: cont_reparacion incrementado.`]);
          }
          setSimStep(9);
          break;
        case 9:
          setActiveLine(15);
          setTerminalLogs(prev => [...prev, '¿Desea procesar otro estudiante? (S/N): ']);
          setWasPlayingBeforeInput(state.isPlaying);
          setIsPlaying(false);
          setIsWaitingInput(true);
          break;
        case 10:
          setActiveLine(17);
          const keepRunning = state.continuar.toLowerCase() === 's';
          setDebugLogs(prev => [...prev, `> [Línea 17] Evaluación de parada: ¿continuar (${state.continuar}) = 'n'? ➔ ${!keepRunning}`]);
          if (keepRunning) {
            setSimStep(1); // loop back
          } else {
            setSimStep(11);
          }
          break;
        case 11:
          setActiveLine(18);
          setTerminalLogs(prev => [
            ...prev,
            `Aprobados: ${state.cAprobados} | Reprobados: ${state.cReprobados} | Reparación: ${state.cReparacion}`
          ]);
          setSimStep(12);
          break;
        case 12:
          setActiveLine(19);
          setDebugLogs(prev => [...prev, '> [Línea 19] Fin de la ejecución.']);
          setIsPlaying(false);
          setSimStep(13);
          break;
        default:
          resetSimulation();
          break;
      }
    } else if (state.activeTab === 3) {
      // --- EXERCISE 4: FACTORIAL ---
      switch (state.simStep) {
        case 0:
          setActiveLine(5);
          setFactorialAns(1);
          setDebugLogs(prev => [...prev, '> [Línea 5] Inicializar acumulador respuesta <- 1']);
          setSimStep(1);
          break;
        case 1:
          setActiveLine(6);
          setTerminalLogs(['Indique el número para calcular su factorial: ']);
          setWasPlayingBeforeInput(state.isPlaying);
          setIsPlaying(false);
          setIsWaitingInput(true);
          break;
        case 2:
          setActiveLine(8);
          const currentN = state.factorialN ?? 1;
          const condition = currentN > 1;
          setDebugLogs(prev => [...prev, `> [Línea 8] Evaluar: ¿n (${currentN}) > 1? ➔ ${condition}`]);
          if (condition) {
            setSimStep(3);
          } else {
            setSimStep(5);
          }
          break;
        case 3:
          setActiveLine(9);
          const newAns = state.factorialAns * (state.factorialN ?? 1);
          setFactorialAns(newAns);
          setDebugLogs(prev => [...prev, `> [Línea 9] Multiplicación: respuesta <- ${state.factorialAns} * ${state.factorialN} ➔ ${newAns}`]);
          setSimStep(4);
          break;
        case 4:
          setActiveLine(10);
          const nextN = (state.factorialN ?? 1) - 1;
          setFactorialN(nextN);
          setDebugLogs(prev => [...prev, `> [Línea 10] Decremento: n <- ${state.factorialN} - 1 ➔ ${nextN}`]);
          setSimStep(2); // loop back
          break;
        case 5:
          setActiveLine(12);
          setTerminalLogs(prev => [...prev, `El factorial es: ${state.factorialAns}`]);
          setDebugLogs(prev => [...prev, `> [Línea 12] Imprimir factorial acumulado: ${state.factorialAns}`]);
          setSimStep(6);
          break;
        case 6:
          setActiveLine(13);
          setDebugLogs(prev => [...prev, '> [Línea 13] Fin del programa.']);
          setIsPlaying(false);
          setSimStep(7);
          break;
        default:
          resetSimulation();
          break;
      }
    } else if (state.activeTab === 4) {
      // --- EXERCISE 5: PARES ---
      switch (state.simStep) {
        case 0:
          setActiveLine(5);
          setTerminalLogs(['Indique el límite inferior: ']);
          setWasPlayingBeforeInput(state.isPlaying);
          setIsPlaying(false);
          setIsWaitingInput(true);
          break;
        case 1:
          setActiveLine(7);
          setTerminalLogs(prev => [...prev, 'Indique el límite superior: ']);
          setWasPlayingBeforeInput(state.isPlaying);
          setIsPlaying(false);
          setIsWaitingInput(true);
          break;
        case 2:
          setActiveLine(9);
          setTerminalLogs(prev => [...prev, 'Imprimiendo números pares en el rango:']);
          setI(state.paresN1);
          setDebugLogs(prev => [...prev, `> [Línea 9] Inicializando variable contadora i <- ${state.paresN1}`]);
          setSimStep(3);
          break;
        case 3:
          setActiveLine(10);
          const currentIdx = state.i ?? 0;
          const limit = state.paresN2 ?? 0;
          const inRange = currentIdx <= limit;
          setDebugLogs(prev => [...prev, `> [Línea 10] Para Límite: ¿i (${currentIdx}) <= numero2 (${limit})? ➔ ${inRange}`]);
          if (inRange) {
            setSimStep(4);
          } else {
            setSimStep(6);
          }
          break;
        case 4:
          setActiveLine(11);
          const currentVal = state.i ?? 0;
          const isEven = currentVal % 2 === 0;
          setDebugLogs(prev => [...prev, `> [Línea 11] Si: ¿i (${currentVal}) MOD 2 = 0? ➔ ${isEven}`]);
          if (isEven) {
            setTerminalLogs(prev => [...prev, `  ${currentVal}`]);
          }
          setSimStep(5);
          break;
        case 5:
          setActiveLine(12);
          const nextIdx = (state.i ?? 0) + 1;
          setI(nextIdx);
          setDebugLogs(prev => [...prev, `> [Línea 12] Fin Para: i se incrementa automáticamente a ${nextIdx}.`]);
          setSimStep(3);
          break;
        case 6:
          setActiveLine(13);
          setDebugLogs(prev => [...prev, '> [Línea 13] Fin de la ejecución.']);
          setIsPlaying(false);
          setSimStep(7);
          break;
        default:
          resetSimulation();
          break;
      }
    }
  };

  const handleConsoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const state = stateRef.current;
    if (!state.isWaitingInput) return;

    if (state.activeTab === 0) {
      const val = parseInt(consoleInputValue.trim());
      if (isNaN(val)) return;

      setNumero(val);
      setTerminalLogs(prev => [...prev, `  > ${val}`]);
      setIsWaitingInput(false);
      setConsoleInputValue('');
      setSimStep(2); // check loop
      if (state.wasPlayingBeforeInput) setIsPlaying(true);
      else setTimeout(() => advanceSimulation(), 100);
    } else if (state.activeTab === 1) {
      const val = parseInt(consoleInputValue.trim());
      if (isNaN(val)) return;

      setTerminalLogs(prev => [...prev, `  > ${val}`]);
      setConsoleInputValue('');
      setIsWaitingInput(false);

      if (state.simStep === 0) {
        setP(val);
        setSimStep(1); // ask s
      } else {
        setS(val);
        setSimStep(2); // run restas
      }
      
      if (state.wasPlayingBeforeInput) setIsPlaying(true);
      else setTimeout(() => advanceSimulation(), 100);
    } else if (state.activeTab === 2) {
      if (state.simStep === 9) {
        const val = consoleInputValue.trim().substring(0, 1);
        setContinuar(val);
        setTerminalLogs(prev => [...prev, `  > ${val}`]);
        setIsWaitingInput(false);
        setConsoleInputValue('');
        setSimStep(10);
        
        if (state.wasPlayingBeforeInput) setIsPlaying(true);
        else setTimeout(() => advanceSimulation(), 100);
        return;
      }

      const score = parseFloat(consoleInputValue.trim());
      if (isNaN(score)) return;

      setTerminalLogs(prev => [...prev, `  > ${score}`]);
      setIsWaitingInput(false);
      setConsoleInputValue('');

      if (state.simStep === 3) {
        setNotaFinal(prev => prev + (score * 0.166));
        setExamIdx(prev => prev + 1);
      } else if (state.simStep === 4) {
        setNotaFinal(prev => prev + (score * 0.066));
        setProjIdx(prev => prev + 1);
      } else if (state.simStep === 5) {
        setNotaFinal(prev => prev + (score * 0.3));
        setWorkIdx(prev => prev + 1);
      }

      if (state.wasPlayingBeforeInput) setIsPlaying(true);
      else setTimeout(() => advanceSimulation(), 100);
    } else if (state.activeTab === 3) {
      const val = parseInt(consoleInputValue.trim());
      if (isNaN(val)) return;

      setFactorialN(val);
      setTerminalLogs(prev => [...prev, `  > ${val}`]);
      setIsWaitingInput(false);
      setConsoleInputValue('');
      setSimStep(2); // run loop

      if (state.wasPlayingBeforeInput) setIsPlaying(true);
      else setTimeout(() => advanceSimulation(), 100);
    } else if (state.activeTab === 4) {
      const val = parseInt(consoleInputValue.trim());
      if (isNaN(val)) return;

      setTerminalLogs(prev => [...prev, `  > ${val}`]);
      setIsWaitingInput(false);
      setConsoleInputValue('');

      if (state.simStep === 0) {
        setParesN1(val);
        setSimStep(1); // ask N2
      } else {
        setParesN2(val);
        setSimStep(2); // run generator
      }

      if (state.wasPlayingBeforeInput) setIsPlaying(true);
      else setTimeout(() => advanceSimulation(), 100);
    }
  };

  const startSimulation = () => {
    const state = stateRef.current;
    if (state.simStep === 8 || state.simStep === 13) {
      resetSimulation();
      setIsPlaying(true);
    } else {
      setIsPlaying(!state.isPlaying);
    }
  };

  const tabs = [
    { name: '1. Clasificador', icon: '📊' },
    { name: '2. Restas Sucesivas', icon: '➖' },
    { name: '3. Calificaciones', icon: '🎓' },
    { name: '4. Factorial', icon: '✖️' },
    { name: '5. Pares Rango', icon: '🔢' }
  ];

  return (
    <div>
      <P>
        La mejor manera de consolidar el pensamiento computacional es analizando algoritmos reales resueltos y comprendiendo la interacción de memoria RAM.
      </P>

      <Callout variant="tip">
        <Strong>Regla de Oro:</Strong> No memorices líneas de código. Observa cómo cambian las celdas de la memoria con cada ciclo e iteración.
      </Callout>

      {/* --- WORKBOOK NAVIGATION TABS --- */}
      <PageSection title="Cuaderno Digital de Prácticas Resolutoras">
        <P>
          Haz clic en cada pestaña del cuaderno digital para cargar el pseudocódigo, la memoria RAM y el simulador de terminal de ese ejercicio práctico.
        </P>

        <div className="flex flex-wrap gap-2 my-6">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition-all duration-300 border ${
                idx === activeTab
                  ? 'bg-brand-500/15 border-brand-500/30 text-brand-300 shadow-[0_0_8px_rgba(0,255,136,0.15)] scale-105'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* --- WORKSPACE LAYOUT --- */}
        <div className="glass-panel p-6 border border-slate-800 rounded-2xl bg-slate-950/45 my-8">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column: CPU & Memory RAM */}
            <div className="flex-1 flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs uppercase font-bold text-slate-400 flex items-center gap-1.5 font-sans font-sans">
                    <Layers size={14} className="text-brand-400" /> Registro de Memoria (RAM)
                  </span>
                  <div className="flex items-center gap-3 font-sans">
                    {isWaitingInput && (
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse uppercase tracking-wider">
                        Esperando entrada...
                      </span>
                    )}
                    <button 
                      onClick={() => setShowDebug(!showDebug)}
                      className={`flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-colors ${
                        showDebug 
                          ? 'bg-brand-500/15 border-brand-500/30 text-brand-300' 
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {showDebug ? <EyeOff size={11} /> : <Eye size={11} />}
                      {showDebug ? 'Ocultar Depuración' : 'Ver Depuración'}
                    </button>
                  </div>
                </div>

                {/* Variable Cells depending on Active tab */}
                <div className="grid grid-cols-3 gap-2.5 my-3 font-mono">
                  {activeTab === 0 && (
                    <>
                      <div className="px-3 py-2 rounded-lg border border-slate-800 bg-slate-900/40 text-center">
                        <span className="text-[9px] text-slate-500 uppercase block mb-0.5 leading-none">numero</span>
                        <span className="text-sm font-bold text-cyan-400">{numero === null ? '?' : numero}</span>
                      </div>
                      <div className="px-3 py-2 rounded-lg border border-slate-800 bg-slate-900/40 text-center">
                        <span className="text-[9px] text-slate-500 uppercase block mb-0.5 leading-none">procesados</span>
                        <span className="text-sm font-bold text-slate-200">{cProcesados}</span>
                      </div>
                      <div className="px-3 py-2 rounded-lg border border-slate-800 bg-slate-900/40 text-center">
                        <span className="text-[9px] text-slate-500 uppercase block mb-0.5 leading-none">positivos</span>
                        <span className="text-sm font-bold text-emerald-400">{cPositivos}</span>
                      </div>
                      <div className="px-3 py-2 rounded-lg border border-slate-800 bg-slate-900/40 text-center">
                        <span className="text-[9px] text-slate-500 uppercase block mb-0.5 leading-none">negativos</span>
                        <span className="text-sm font-bold text-rose-400">{cNegativos}</span>
                      </div>
                      <div className="px-3 py-2 rounded-lg border border-slate-800 bg-slate-900/40 text-center">
                        <span className="text-[9px] text-slate-500 uppercase block mb-0.5 leading-none">pares</span>
                        <span className="text-sm font-bold text-indigo-400">{cPares}</span>
                      </div>
                      <div className="px-3 py-2 rounded-lg border border-slate-800 bg-slate-900/40 text-center">
                        <span className="text-[9px] text-slate-500 uppercase block mb-0.5 leading-none">impares</span>
                        <span className="text-sm font-bold text-amber-400">{cImpares}</span>
                      </div>
                    </>
                  )}

                  {activeTab === 1 && (
                    <>
                      <div className="px-3 py-2 rounded-lg border border-slate-800 bg-slate-900/40 text-center">
                        <span className="text-[9px] text-slate-500 uppercase block mb-0.5 leading-none">dividendo (P)</span>
                        <span className="text-sm font-bold text-slate-200">{dividendo === null ? '?' : dividendo}</span>
                      </div>
                      <div className="px-3 py-2 rounded-lg border border-slate-800 bg-slate-900/40 text-center">
                        <span className="text-[9px] text-slate-500 uppercase block mb-0.5 leading-none">divisor (S)</span>
                        <span className="text-sm font-bold text-slate-200">{divisor === null ? '?' : divisor}</span>
                      </div>
                      <div className="px-3 py-2 rounded-lg border border-slate-800 bg-slate-900/40 text-center">
                        <span className="text-[9px] text-slate-500 uppercase block mb-0.5 leading-none">cociente</span>
                        <span className="text-sm font-bold text-emerald-400">{cDivisiones}</span>
                      </div>
                    </>
                  )}

                  {activeTab === 2 && (
                    <>
                      <div className="px-3 py-2 rounded-lg border border-slate-800 bg-slate-900/40 text-center">
                        <span className="text-[9px] text-slate-500 uppercase block mb-0.5 leading-none">nota_final</span>
                        <span className="text-sm font-bold text-cyan-400">{notaFinal.toFixed(2)}</span>
                      </div>
                      <div className="px-3 py-2 rounded-lg border border-slate-800 bg-slate-900/40 text-center">
                        <span className="text-[9px] text-slate-500 uppercase block mb-0.5 leading-none">aprobados</span>
                        <span className="text-sm font-bold text-emerald-400">{cAprobados}</span>
                      </div>
                      <div className="px-3 py-2 rounded-lg border border-slate-800 bg-slate-900/40 text-center">
                        <span className="text-[9px] text-slate-500 uppercase block mb-0.5 leading-none">reparacion</span>
                        <span className="text-sm font-bold text-amber-400">{cReparacion}</span>
                      </div>
                    </>
                  )}

                  {activeTab === 3 && (
                    <>
                      <div className="px-3 py-2 rounded-lg border border-slate-800 bg-slate-900/40 text-center">
                        <span className="text-[9px] text-slate-500 uppercase block mb-0.5 leading-none">N (control)</span>
                        <span className="text-sm font-bold text-cyan-400">{factorialN === null ? '?' : factorialN}</span>
                      </div>
                      <div className="px-3 py-2 rounded-lg border border-slate-800 bg-slate-900/40 text-center col-span-2">
                        <span className="text-[9px] text-slate-500 uppercase block mb-0.5 leading-none">respuesta (acumulador multiplicador)</span>
                        <span className="text-sm font-bold text-emerald-400">{factorialAns}</span>
                      </div>
                    </>
                  )}

                  {activeTab === 4 && (
                    <>
                      <div className="px-3 py-2 rounded-lg border border-slate-800 bg-slate-900/40 text-center">
                        <span className="text-[9px] text-slate-500 uppercase block mb-0.5 leading-none">numero1</span>
                        <span className="text-sm font-bold text-slate-200">{paresN1 === null ? '?' : paresN1}</span>
                      </div>
                      <div className="px-3 py-2 rounded-lg border border-slate-800 bg-slate-900/40 text-center">
                        <span className="text-[9px] text-slate-500 uppercase block mb-0.5 leading-none">numero2</span>
                        <span className="text-sm font-bold text-slate-200">{paresN2 === null ? '?' : paresN2}</span>
                      </div>
                      <div className="px-3 py-2 rounded-lg border border-slate-800 bg-slate-900/40 text-center">
                        <span className="text-[9px] text-slate-500 uppercase block mb-0.5 leading-none">i (índice)</span>
                        <span className="text-sm font-bold text-cyan-400">{paresI === null ? '?' : paresI}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Standard Output Virtual Terminal */}
              <div className="bg-black border border-slate-900 rounded-xl p-4 font-mono text-xs text-slate-200 flex flex-col justify-end min-h-[150px] max-h-[170px] overflow-y-auto mt-3 shadow-inner">
                <div className="text-[9px] uppercase font-bold text-slate-500 mb-1.5 tracking-wider flex items-center gap-1.5 select-none font-sans">
                  <TerminalSquare size={12} className="text-slate-500" /> Pantalla de Terminal
                </div>
                <div className="space-y-1.5 flex-1 flex flex-col justify-end">
                  {terminalLogs.map((log, idx) => (
                    <div key={idx} className={log.startsWith('  >') ? 'text-emerald-400 font-bold' : 'text-slate-100'}>
                      {log}
                    </div>
                  ))}

                  {/* Terminal Input prompt */}
                  {isWaitingInput && (
                    <form onSubmit={handleConsoleSubmit} className="flex gap-1.5 items-center border-t border-slate-900/40 pt-1.5 mt-1.5">
                      <span className="text-emerald-400 font-bold">&gt; </span>
                      <input 
                        ref={consoleInputRef}
                        type="text" 
                        value={consoleInputValue}
                        onChange={e => setConsoleInputValue(e.target.value)}
                        className="bg-transparent border-none outline-none text-slate-100 font-mono w-full text-xs focus:ring-0 p-0"
                        placeholder="Escribe el valor y presiona Enter..."
                        autoFocus
                      />
                    </form>
                  )}
                </div>
              </div>

              {/* Debugging Console Log */}
              {showDebug && (
                <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 font-mono text-[10.5px] text-slate-400 flex flex-col justify-end min-h-[110px] max-h-[130px] overflow-y-auto mt-3 animate-fade-in">
                  <div className="text-[9px] uppercase font-bold text-brand-400/70 mb-1.5 tracking-widest flex items-center gap-1.5 select-none font-sans font-sans">
                    🔧 CONSOLA DE DEPURACIÓN (DEBUGGER)
                  </div>
                  <div className="space-y-1 flex-1 flex flex-col justify-end">
                    {debugLogs.slice(-4).map((log, idx) => (
                      <div key={idx} className="text-indigo-400/80">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Verification Success Celebration Indicator */}
              {(simStep === 8 || simStep === 13) && (
                <div className="mt-3 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-emerald-400 text-xs font-semibold animate-bounce font-sans font-sans">
                  <CheckCircle size={16} /> ¡Ejercicio Ejecutado con Éxito e Índice Liberado!
                </div>
              )}

              {/* Controls footer */}
              <div className="mt-4 pt-4 border-t border-slate-900 flex justify-between items-center font-sans font-sans">
                <button 
                  onClick={resetSimulation}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
                  title="Reiniciar Simulación"
                >
                  <RotateCcw size={16} />
                </button>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={advanceSimulation}
                    disabled={isPlaying || simStep === 8 || simStep === 13 || isWaitingInput}
                    className="flex items-center gap-1.5 px-3 py-2 bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 font-bold text-xs rounded-lg hover:bg-indigo-500/30 transition-colors disabled:opacity-50"
                  >
                    Siguiente Paso <ChevronRight size={14} />
                  </button>
                  <button 
                    onClick={startSimulation}
                    disabled={(simStep === 8 || simStep === 13) && isPlaying || isWaitingInput}
                    className={`flex items-center gap-1.5 px-4 py-2 font-bold text-xs rounded-lg transition-colors border ${
                      isPlaying 
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 hover:bg-amber-500/30' 
                        : 'bg-brand-500/20 text-brand-400 border-brand-500/40 hover:bg-brand-500/30'
                    }`}
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    {isPlaying ? 'Pausar' : 'Auto-Play'}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Code viewer */}
            <div className="w-full lg:w-96 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between shadow-2xl">
              <div className="bg-slate-800/80 px-4 py-2.5 border-b border-slate-700 flex items-center justify-between font-sans">
                <span className="text-xs font-mono text-slate-400">ejercicio_{activeTab + 1}.udone</span>
                <span className="text-[10px] text-slate-500">SPEED: 1.25s</span>
              </div>
              <div className="p-4 font-mono text-[10.5px] sm:text-xs space-y-1.5 flex-grow overflow-y-auto bg-slate-950/20">
                {EXERCISE_CODES[activeTab].map((line, idx) => {
                  const lineNum = idx + 1;
                  const isActive = activeLine === lineNum;
                  return (
                    <div 
                      key={idx} 
                      className={`flex gap-3 px-2 py-0.5 rounded-sm transition-all duration-300 ${
                        isActive 
                          ? 'bg-brand-500/20 text-white font-bold border-l-2 border-brand-400 shadow-[0_0_8px_rgba(0,255,136,0.1)]' 
                          : 'text-slate-500 border-l-2 border-transparent'
                      }`}
                    >
                      <span className="text-slate-700 select-none w-4 text-right flex-shrink-0">{lineNum}</span>
                      <span className="whitespace-pre">{line}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </PageSection>
    </div>
  );
};
