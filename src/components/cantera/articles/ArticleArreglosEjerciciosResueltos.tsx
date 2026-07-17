import React, { useState, useEffect, useRef } from 'react';
import { P, PageSection, CodeBlock, Strong, InlineCode } from '../ArticlePageComponents';
import { RefreshCw, Plus, Layers, Filter, Users, Search, Calculator, Hash, Play, Pause, RotateCcw, Box, TerminalSquare, Eye, EyeOff, HelpCircle, ChevronRight, ArrowRightLeft } from 'lucide-react';

export const ArticleArreglosEjerciciosResueltos: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0); // 0: Invertir, 1: Suma, 2: Pares
  const [isPlaying, setIsPlaying] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [showDebug, setShowDebug] = useState(false);
  const [debugLogs, setDebugLogs] = useState<string[]>(['> Laboratorio listo.']);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [ramHighlight, setRamHighlight] = useState<string | null>(null);

  // States Tab 0 (Invertir)
  const [datosInv, setDatosInv] = useState<(number | null)[]>([10, 20, 30, 40, 50, 60]);
  const [iInv, setIInv] = useState<number | null>(null);
  const [auxInv, setAuxInv] = useState<number | null>(null);

  // States Tab 1 (Suma)
  const [arrA, setArrA] = useState<number[]>([1, 3, 5, 7, 9]);
  const [arrB, setArrB] = useState<number[]>([2, 4, 6, 8, 10]);
  const [arrC, setArrC] = useState<(number | null)[]>([null, null, null, null, null]);
  const [iSuma, setISuma] = useState<number | null>(null);

  // States Tab 2 (Pares)
  const [datosPares, setDatosPares] = useState<number[]>([15, 22, 8, 33, 10, 7]);
  const [iPares, setIPares] = useState<number | null>(null);

  const stateRef = useRef({ activeTab, simStep, isPlaying, datosInv, iInv, auxInv, arrC, iSuma, iPares });
  useEffect(() => {
    stateRef.current = { activeTab, simStep, isPlaying, datosInv, iInv, auxInv, arrC, iSuma, iPares };
  }, [activeTab, simStep, isPlaying, datosInv, iInv, auxInv, arrC, iSuma, iPares]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) interval = setInterval(() => advanceSimulation(), 900);
    return () => clearInterval(interval);
  }, [isPlaying, activeTab]);

  const resetSimulation = () => {
    setIsPlaying(false);
    setSimStep(0);
    setActiveLine(null);
    setTerminalLogs([]);
    setDebugLogs(['> Laboratorio reiniciado.']);
    setRamHighlight(null);
    
    setDatosInv([10, 20, 30, 40, 50, 60]);
    setIInv(null);
    setAuxInv(null);

    setArrC([null, null, null, null, null]);
    setISuma(null);

    setIPares(null);
  };

  useEffect(() => { resetSimulation(); }, [activeTab]);

  const advanceSimulation = () => {
    const state = stateRef.current;
    
    if (state.activeTab === 0) { // Invertir
      const N = 6;
      switch (state.simStep) {
        case 0:
          setActiveLine(16);
          setSimStep(1); break;
        case 1:
          setActiveLine(18);
          const i1 = state.iInv === null ? 1 : state.iInv + 1;
          if (i1 > 3) {
            setSimStep(6);
          } else {
            setIInv(i1);
            setRamHighlight(`i`);
            setDebugLogs(prev => [...prev, `> Para i <- ${i1}`]);
            setSimStep(2);
          }
          break;
        case 2:
          setActiveLine(19);
          setAuxInv(state.datosInv[(state.iInv ?? 1) - 1]);
          setRamHighlight('aux');
          setDebugLogs(prev => [...prev, `> aux <- datos[${state.iInv}] (${state.datosInv[(state.iInv ?? 1) - 1]})`]);
          setSimStep(3); break;
        case 3:
          setActiveLine(20);
          const d1 = [...state.datosInv];
          const oppIdx = N - (state.iInv ?? 1);
          d1[(state.iInv ?? 1) - 1] = d1[oppIdx];
          setDatosInv(d1);
          setRamHighlight(`datos_${(state.iInv ?? 1) - 1}`);
          setDebugLogs(prev => [...prev, `> datos[${state.iInv}] <- datos[${oppIdx + 1}] (${d1[oppIdx]})`]);
          setSimStep(4); break;
        case 4:
          setActiveLine(21);
          const d2 = [...state.datosInv];
          const oppIdx2 = N - (state.iInv ?? 1);
          d2[oppIdx2] = state.auxInv;
          setDatosInv(d2);
          setRamHighlight(`datos_${oppIdx2}`);
          setDebugLogs(prev => [...prev, `> datos[${oppIdx2 + 1}] <- aux (${state.auxInv})`]);
          setSimStep(5); break;
        case 5:
          setActiveLine(22);
          setSimStep(1); break;
        case 6:
          setActiveLine(25);
          setDebugLogs(prev => [...prev, '> Fin del algoritmo']);
          setIsPlaying(false);
          setSimStep(7); break;
      }
    } else if (state.activeTab === 1) { // Suma
      switch (state.simStep) {
        case 0:
          setActiveLine(17);
          setSimStep(1); break;
        case 1:
          setActiveLine(18);
          const iS = state.iSuma === null ? 1 : state.iSuma + 1;
          if (iS > 5) {
            setSimStep(4);
          } else {
            setISuma(iS);
            setRamHighlight('i');
            setDebugLogs(prev => [...prev, `> Para i <- ${iS}`]);
            setSimStep(2);
          }
          break;
        case 2:
          setActiveLine(19);
          const cArr = [...state.arrC];
          const aVal = arrA[(state.iSuma ?? 1) - 1];
          const bVal = arrB[(state.iSuma ?? 1) - 1];
          cArr[(state.iSuma ?? 1) - 1] = aVal + bVal;
          setArrC(cArr);
          setRamHighlight(`c_${(state.iSuma ?? 1) - 1}`);
          setDebugLogs(prev => [...prev, `> C[${state.iSuma}] <- ${aVal} + ${bVal} = ${aVal + bVal}`]);
          setSimStep(3); break;
        case 3:
          setActiveLine(20);
          setSimStep(1); break;
        case 4:
          setActiveLine(23);
          setDebugLogs(prev => [...prev, '> Fin del algoritmo']);
          setIsPlaying(false);
          setSimStep(5); break;
      }
    } else if (state.activeTab === 2) { // Pares
      switch (state.simStep) {
        case 0:
          setActiveLine(14);
          setTerminalLogs(prev => [...prev, "Los números pares son:"]);
          setSimStep(1); break;
        case 1:
          setActiveLine(15);
          const iP = state.iPares === null ? 1 : state.iPares + 1;
          if (iP > 6) {
            setSimStep(6);
          } else {
            setIPares(iP);
            setRamHighlight(`datos_${iP - 1}`);
            setDebugLogs(prev => [...prev, `> Para i <- ${iP} | Evalúa: ${datosPares[iP - 1]}`]);
            setSimStep(2);
          }
          break;
        case 2:
          setActiveLine(16);
          const val = datosPares[(state.iPares ?? 1) - 1];
          if (val % 2 === 0) {
            setDebugLogs(prev => [...prev, `> (${val} MOD 2 = 0) Verdadero`]);
            setSimStep(3);
          } else {
            setDebugLogs(prev => [...prev, `> (${val} MOD 2 = 0) Falso`]);
            setSimStep(5);
          }
          break;
        case 3:
          setActiveLine(17);
          setTerminalLogs(prev => [...prev, `> ${datosPares[(state.iPares ?? 1) - 1]}`]);
          setSimStep(4); break;
        case 4:
          setActiveLine(18);
          setSimStep(5); break;
        case 5:
          setActiveLine(19);
          setSimStep(1); break;
        case 6:
          setActiveLine(20);
          setDebugLogs(prev => [...prev, '> Fin del algoritmo']);
          setIsPlaying(false);
          setSimStep(7); break;
      }
    }
  };

  const startSimulation = () => {
    if (simStep >= 7 && activeTab === 0) resetSimulation(), setIsPlaying(true);
    else if (simStep >= 5 && activeTab === 1) resetSimulation(), setIsPlaying(true);
    else if (simStep >= 7 && activeTab === 2) resetSimulation(), setIsPlaying(true);
    else setIsPlaying(!isPlaying);
  };

  const CODE_INVERTIR = [
    'Algoritmo InvertirArreglo',
    'Variables:',
    '    datos: arreglo [6] de Entero',
    '    i, aux, limite, N: Entero',
    '',
    'Inicio',
    '    N <- 6',
    '    datos[1] <- 10',
    '    datos[2] <- 20',
    '    datos[3] <- 30',
    '    datos[4] <- 40',
    '    datos[5] <- 50',
    '    datos[6] <- 60',
    '',
    '    // Para invertir, intercambiamos los extremos',
    '    limite <- N / 2 // División entera: 3',
    '    ',
    '    Para i = 1 Hasta limite Inc 1',
    '        aux <- datos[i]',
    '        datos[i] <- datos[N - i + 1]',
    '        datos[N - i + 1] <- aux',
    '    Fin Para',
    '',
    '    // Resultado: [60, 50, 40, 30, 20, 10]',
    'Fin'
  ];

  const CODE_SUMA = [
    'Algoritmo SumaArreglos',
    'Variables:',
    '    A, B, C: arreglo [5] de Entero',
    '    i: Entero',
    '',
    'Inicio',
    '    A[1] <- 1',
    '    A[2] <- 3',
    '    A[3] <- 5',
    '    A[4] <- 7',
    '    A[5] <- 9',
    '    B[1] <- 2',
    '    B[2] <- 4',
    '    B[3] <- 6',
    '    B[4] <- 8',
    '    B[5] <- 10',
    '',
    '    Para i = 1 Hasta 5 Inc 1',
    '        C[i] <- A[i] + B[i]',
    '    Fin Para',
    '',
    '    // C quedará: [3, 7, 11, 15, 19]',
    'Fin'
  ];

  const CODE_PARES = [
    'Algoritmo MostrarPares',
    'Variables:',
    '    numeros: arreglo [6] de Entero',
    '    i: Entero',
    '',
    'Inicio',
    '    numeros[1] <- 15',
    '    numeros[2] <- 22',
    '    numeros[3] <- 8',
    '    numeros[4] <- 33',
    '    numeros[5] <- 10',
    '    numeros[6] <- 7',
    '',
    '    Escribir "Los números pares son:"',
    '    Para i = 1 Hasta 6 Inc 1',
    '        Si (numeros[i] MOD 2 = 0) Entonces',
    '            Escribir numeros[i]',
    '        Fin Si',
    '    Fin Para',
    'Fin'
  ];

  return (
    <div>
      <P>
        En esta sección pondremos en práctica todo lo aprendido (lectura, escritura, ciclos, búsquedas y operaciones avanzadas) a través de una serie de problemas clásicos resueltos paso a paso.
      </P>

      <PageSection title="1. Invertir un Arreglo">
        <P>
          <Strong>Problema:</Strong> Dado un arreglo de 6 elementos, invertir el orden de sus datos de forma que el primer elemento pase a ser el último, el segundo el penúltimo, y así sucesivamente, utilizando un ciclo.
        </P>
        <CodeBlock code={`Algoritmo InvertirArreglo
Variables:
    datos: arreglo [6] de Entero
    i, aux, limite, N: Entero

Inicio
    N <- 6
    datos[1] <- 10
    datos[2] <- 20
    datos[3] <- 30
    datos[4] <- 40
    datos[5] <- 50
    datos[6] <- 60

    // Para invertir, intercambiamos los extremos avanzando hasta la mitad
    limite <- N / 2 // División entera: 3
    
    Para i = 1 Hasta limite Inc 1
        aux <- datos[i]
        datos[i] <- datos[N - i + 1]
        datos[N - i + 1] <- aux
    Fin Para

    // Resultado: [60, 50, 40, 30, 20, 10]
Fin`} />
      </PageSection>

      <PageSection title="2. Suma de Arreglos">
        <P>
          <Strong>Problema:</Strong> Dados dos arreglos $A$ y $B$ de tamaño 5, crear un tercer arreglo $C$ que almacene en cada posición la suma de los elementos de las mismas posiciones de $A$ y $B$.
        </P>
        <CodeBlock code={`Algoritmo SumaArreglos
Variables:
    A, B, C: arreglo [5] de Entero
    i: Entero

Inicio
    // Llenado ficticio
    A[1] <- 1
    A[2] <- 3
    A[3] <- 5
    A[4] <- 7
    A[5] <- 9
    B[1] <- 2
    B[2] <- 4
    B[3] <- 6
    B[4] <- 8
    B[5] <- 10

    Para i = 1 Hasta 5 Inc 1
        C[i] <- A[i] + B[i]
    Fin Para

    // C quedará: [3, 7, 11, 15, 19]
Fin`} />
      </PageSection>

      <PageSection title="3. Mezclar Dos Arreglos (Concatenación)">
        <P>
          <Strong>Problema:</Strong> Dados dos arreglos $A$ y $B$ de 5 posiciones cada uno, copiar sus elementos en un arreglo $C$ de 10 posiciones, de tal forma que primero queden los elementos de $A$ y luego los de $B$.
        </P>
        <CodeBlock code={`Algoritmo MezclarArreglos
Variables:
    A, B: arreglo [5] de Entero
    C: arreglo [10] de Entero
    i, k: Entero

Inicio
    A[1] <- 1
    A[2] <- 2
    A[3] <- 3
    A[4] <- 4
    A[5] <- 5
    B[1] <- 6
    B[2] <- 7
    B[3] <- 8
    B[4] <- 9
    B[5] <- 10

    k <- 1 // Índice para el arreglo C

    // 1. Copiamos el arreglo A en C
    Para i = 1 Hasta 5 Inc 1
        C[k] <- A[i]
        k <- k + 1
    Fin Para

    // 2. Copiamos el arreglo B en C, a partir del índice k actual
    Para i = 1 Hasta 5 Inc 1
        C[k] <- B[i]
        k <- k + 1
    Fin Para

    // C quedará: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Fin`} />
      </PageSection>

      <PageSection title="4. Mostrar Números Pares">
        <P>
          <Strong>Problema:</Strong> Dado un arreglo numérico, buscar y mostrar únicamente aquellos valores que sean números pares.
        </P>
        <CodeBlock code={`Algoritmo MostrarPares
Variables:
    numeros: arreglo [6] de Entero
    i: Entero

Inicio
    numeros[1] <- 15
    numeros[2] <- 22
    numeros[3] <- 8
    numeros[4] <- 33
    numeros[5] <- 10
    numeros[6] <- 7

    Escribir "Los números pares son:"
    Para i = 1 Hasta 6 Inc 1
        // Un número es par si el residuo de dividirlo entre 2 es cero (MOD)
        Si (numeros[i] MOD 2 = 0) Entonces
            Escribir numeros[i]
        Fin Si
    Fin Para
Fin`} />
      </PageSection>

      <PageSection title="5. Arreglos Paralelos: Filtro de Edad">
        <P>
          <Strong>Problema:</Strong> Dados tres arreglos paralelos que guardan la cédula, el nombre y la edad de 5 personas. Mostrar los datos completos <Strong>solo de las personas que sean mayores de edad</Strong> (&gt; 18 años).
        </P>
        <CodeBlock code={`Algoritmo FiltroMayoresDeEdad
Variables:
    cedulas: arreglo [5] de Entero
    nombres: arreglo [5] de Cadena
    edades: arreglo [5] de Entero
    i: Entero

Inicio
    cedulas[1] <- 111
    nombres[1] <- "Luis"
    edades[1] <- 15
    cedulas[2] <- 222
    nombres[2] <- "Ana"
    edades[2] <- 21
    cedulas[3] <- 333
    nombres[3] <- "Jose"
    edades[3] <- 19
    cedulas[4] <- 444
    nombres[4] <- "Mio"
    edades[4] <- 14
    cedulas[5] <- 555
    nombres[5] <- "Luz"
    edades[5] <- 25

    Escribir "Personas mayores de 18 años:"
    Para i = 1 Hasta 5 Inc 1
        Si (edades[i] > 18) Entonces
            Escribir "Cédula: ", cedulas[i], " | Nombre: ", nombres[i], " | Edad: ", edades[i]
        Fin Si
    Fin Para
Fin`} />
      </PageSection>

      <PageSection title="6. Arreglos Paralelos: Búsqueda por Cédula">
        <P>
          <Strong>Problema:</Strong> Utilizando los mismos arreglos paralelos, solicitar al usuario que ingrese un número de cédula y mostrar el nombre y edad de esa persona. Si la cédula no existe, indicarlo.
        </P>
        <CodeBlock code={`Algoritmo BusquedaPorCedula
Variables:
    cedulas: arreglo [5] de Entero
    nombres: arreglo [5] de Cadena
    edades: arreglo [5] de Entero
    i, cedula_buscada, posicion: Entero
    encontrado: Logico

Inicio
    // Llenado ficticio...
    
    Escribir "Indique la cédula a buscar: "
    Leer cedula_buscada
    
    encontrado <- Falso
    posicion <- 0

    Para i = 1 Hasta 5 Inc 1
        Si (cedulas[i] = cedula_buscada) Entonces
            encontrado <- Verdadero
            posicion <- i
        Fin Si
    Fin Para

    Si (encontrado = Verdadero) Entonces
        Escribir "Persona encontrada:"
        Escribir "Nombre: ", nombres[posicion]
        Escribir "Edad: ", edades[posicion]
    Sino
        Escribir "La cédula ingresada no está registrada."
    Fin Si
Fin`} />
      </PageSection>

      <div className="my-10 border-t border-slate-800 pt-10">
        <h2 className="text-2xl font-bold text-amber-400 mb-6 flex items-center gap-2">
          🔥 Ejercicios Recomendados Adicionales
        </h2>
        <P>
          A continuación te presentamos un par de problemas clásicos que suelen evaluarse frecuentemente en las asignaturas de programación básica:
        </P>

        <PageSection title="7. Promedio y Valores Superiores">
          <P>
            <Strong>Problema:</Strong> Dado un arreglo de 5 calificaciones, calcular el promedio del grupo y luego contar cuántos estudiantes obtuvieron una nota estrictamente superior al promedio general.
          </P>
          <CodeBlock code={`Algoritmo SuperanElPromedio
Variables:
    notas: arreglo [5] de Real
    i, cantidad_superan: Entero
    suma, promedio: Real

Inicio
    notas[1] <- 10.0
    notas[2] <- 15.5
    notas[3] <- 12.0
    notas[4] <- 19.0
    notas[5] <- 09.5

    // 1. Calculamos la suma total
    suma <- 0
    Para i = 1 Hasta 5 Inc 1
        suma <- suma + notas[i]
    Fin Para

    // 2. Calculamos el promedio
    promedio <- suma / 5
    Escribir "El promedio general es: ", promedio

    // 3. Contamos cuántos superan el promedio
    cantidad_superan <- 0
    Para i = 1 Hasta 5 Inc 1
        Si (notas[i] > promedio) Entonces
            cantidad_superan <- cantidad_superan + 1
        Fin Si
    Fin Para

    Escribir "Estudiantes con nota superior al promedio: ", cantidad_superan
Fin`} />
        </PageSection>

        <PageSection title="8. Frecuencia de un Valor">
          <P>
            <Strong>Problema:</Strong> Dado un arreglo numérico y un número ingresado por el usuario, contar cuántas veces se repite (frecuencia) dicho número dentro de la estructura.
          </P>
          <CodeBlock code={`Algoritmo FrecuenciaNumero
Variables:
    datos: arreglo [7] de Entero
    i, numero_buscar, contador_frecuencia: Entero

Inicio
    datos[1] <- 5
    datos[2] <- 2
    datos[3] <- 5
    datos[4] <- 8
    datos[5] <- 5
    datos[6] <- 1
    datos[7] <- 5

    Escribir "Ingrese el número a buscar: "
    Leer numero_buscar
    
    contador_frecuencia <- 0

    Para i = 1 Hasta 7 Inc 1
        Si (datos[i] = numero_buscar) Entonces
            contador_frecuencia <- contador_frecuencia + 1
        Fin Si
    Fin Para

    Escribir "El número ", numero_buscar, " se repite ", contador_frecuencia, " veces."
Fin`} />
        </PageSection>

        {/* --- LABORATORIO INTERACTIVO --- */}
        <PageSection title="Laboratorio: Trazador de Ejercicios Clásicos">
          <P>Selecciona una pestaña para ver gráficamente la ejecución de tres de los algoritmos más representativos de esta lista de ejercicios.</P>
          
          <div className="glass-panel p-6 border border-slate-800 rounded-2xl bg-slate-950/45 my-8">
            <div className="flex gap-2 mb-6 border-b border-slate-800 pb-4 overflow-x-auto">
              <button onClick={() => setActiveTab(0)} className={`px-4 py-2 text-sm font-bold rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === 0 ? 'bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}>
                <RefreshCw size={16} /> 1. Invertir
              </button>
              <button onClick={() => setActiveTab(1)} className={`px-4 py-2 text-sm font-bold rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === 1 ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}>
                <Plus size={16} /> 2. Suma
              </button>
              <button onClick={() => setActiveTab(2)} className={`px-4 py-2 text-sm font-bold rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === 2 ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}>
                <Filter size={16} /> 4. Pares
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 flex flex-col justify-between min-h-[380px]">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs uppercase font-bold text-slate-400 flex items-center gap-1.5 font-sans">
                      <HelpCircle size={14} className="text-brand-400" /> Memoria (RAM)
                    </span>
                    <button onClick={() => setShowDebug(!showDebug)} className={`flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-colors ${showDebug ? 'bg-brand-500/15 border-brand-500/30 text-brand-300' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                      {showDebug ? <EyeOff size={11} /> : <Eye size={11} />} {showDebug ? 'Ocultar Depuración' : 'Ver Depuración'}
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-2.5 my-3">
                    <div className={`px-3 py-2 rounded-lg border font-mono text-center transition-all ${ramHighlight === 'i' ? 'border-brand-500 bg-brand-500/10' : 'border-slate-800 bg-slate-900/40'}`}>
                      <span className="text-[9px] text-slate-500 block mb-0.5">i (Índice)</span>
                      <span className="text-base font-bold text-slate-100">
                        {activeTab === 0 ? (iInv ?? '?') : activeTab === 1 ? (iSuma ?? '?') : (iPares ?? '?')}
                      </span>
                    </div>
                    {activeTab === 0 && (
                      <div className={`px-3 py-2 rounded-lg border font-mono text-center transition-all ${ramHighlight === 'aux' ? 'border-pink-500 bg-pink-500/10' : 'border-slate-800 bg-slate-900/40'}`}>
                        <span className="text-[9px] text-slate-500 block mb-0.5">aux</span>
                        <span className="text-base font-bold text-slate-100">{auxInv ?? '?'}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 mb-2">
                  {activeTab === 0 && (
                    <>
                      <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-2 block">Arreglo [datos]</span>
                      <div className="flex flex-wrap gap-2">
                        {datosInv.map((val, idx) => (
                          <div key={idx} className="flex flex-col items-center">
                            <div className={`w-12 h-12 flex items-center justify-center font-mono text-sm rounded-lg border-2 transition-all ${
                              ramHighlight === `datos_${idx}` ? 'border-amber-500 bg-amber-500/20 text-amber-300 scale-110 font-bold' :
                              'border-slate-600 bg-slate-800 text-slate-300'
                            }`}>
                              {val}
                            </div>
                            <span className="text-[9px] text-slate-500 mt-1 font-bold">[{idx + 1}]</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {activeTab === 1 && (
                    <div className="flex flex-col gap-4">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1 block">Arreglo A + Arreglo B</span>
                        <div className="flex gap-2">
                          {arrA.map((val, idx) => (
                            <div key={'a'+idx} className="w-10 h-8 bg-slate-900 border border-slate-700 rounded flex flex-col items-center justify-center font-mono text-xs text-slate-400">
                              <span>{val}</span><span className="text-emerald-400 font-bold leading-none">+ {arrB[idx]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1 block">Arreglo C (Resultado)</span>
                        <div className="flex gap-2">
                          {arrC.map((val, idx) => (
                            <div key={'c'+idx} className={`w-10 h-10 flex items-center justify-center font-mono text-sm rounded border transition-all ${
                              ramHighlight === `c_${idx}` ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300 font-bold scale-110' :
                              val !== null ? 'border-cyan-700 bg-cyan-900/30 text-cyan-400' : 'border-slate-800 bg-slate-900 text-slate-600'
                            }`}>
                              {val !== null ? val : '-'}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 2 && (
                    <>
                      <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-2 block">Arreglo [numeros]</span>
                      <div className="flex flex-wrap gap-2">
                        {datosPares.map((val, idx) => (
                          <div key={idx} className="flex flex-col items-center">
                            <div className={`w-12 h-12 flex items-center justify-center font-mono text-sm rounded-lg border-2 transition-all ${
                              ramHighlight === `datos_${idx}` ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 scale-110 font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)]' :
                              'border-slate-700 bg-slate-800 text-slate-300'
                            }`}>
                              {val}
                            </div>
                            <span className="text-[9px] text-slate-500 mt-1 font-bold">[{idx + 1}]</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {activeTab === 2 && (
                  <div className="bg-black border border-slate-900 rounded-xl p-3 font-mono text-xs text-slate-200 flex flex-col justify-end min-h-[90px] max-h-[90px] overflow-y-auto mt-2 shadow-inner">
                    <div className="text-[9px] uppercase font-bold text-slate-500 mb-1.5 flex items-center gap-1.5 font-sans">
                      <TerminalSquare size={12} /> Terminal
                    </div>
                    <div className="space-y-1 flex-1 flex flex-col justify-end">
                      {terminalLogs.map((log, idx) => <div key={idx} className="text-slate-100">{log}</div>)}
                    </div>
                  </div>
                )}

                {showDebug && (
                  <div className="bg-slate-950 border border-slate-900 rounded-xl p-3 font-mono text-[10.5px] text-slate-400 flex flex-col justify-end min-h-[90px] max-h-[90px] overflow-y-auto mt-2">
                    <div className="text-[9px] uppercase font-bold text-brand-400/70 mb-1.5 tracking-widest font-sans">
                      🔧 CONSOLA DE DEPURACIÓN
                    </div>
                    <div className="space-y-1 flex-1 flex flex-col justify-end">
                      {debugLogs.slice(-4).map((log, idx) => <div key={idx} className="text-slate-500">{log}</div>)}
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-slate-900 flex justify-between items-center font-sans">
                  <button onClick={resetSimulation} className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700">
                    <RotateCcw size={16} />
                  </button>
                  <div className="flex items-center gap-2">
                    <button onClick={advanceSimulation} disabled={isPlaying} className="flex items-center gap-1.5 px-3 py-2 bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 font-bold text-xs rounded-lg hover:bg-indigo-500/30 transition-colors disabled:opacity-50">
                      Siguiente Paso <ChevronRight size={14} />
                    </button>
                    <button onClick={startSimulation} className={`flex items-center gap-1.5 px-4 py-2 font-bold text-xs rounded-lg transition-colors border ${isPlaying ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 hover:bg-amber-500/30' : 'bg-brand-500/20 text-brand-400 border-brand-500/40 hover:bg-brand-500/30'}`}>
                      {isPlaying ? <Pause size={14} /> : <Play size={14} />} {isPlaying ? 'Pausar' : 'Auto-Play'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-[450px] xl:w-[500px] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-2xl shrink-0">
                <div className="bg-slate-800/80 px-4 py-2.5 border-b border-slate-700 flex items-center justify-between font-sans">
                  <span className="text-xs font-mono text-slate-400">{activeTab === 0 ? 'invertir.udone' : activeTab === 1 ? 'suma.udone' : 'pares.udone'}</span>
                </div>
                <div className="p-4 font-mono text-[10px] sm:text-[11px] space-y-1 overflow-y-auto flex-1 bg-slate-950/20 min-h-[300px]">
                  {(activeTab === 0 ? CODE_INVERTIR : activeTab === 1 ? CODE_SUMA : CODE_PARES).map((line, idx) => {
                    const lineNum = idx + 1;
                    const isActive = activeLine === lineNum;
                    return (
                      <div key={idx} className={`flex gap-3 px-2 py-0.5 rounded-sm transition-colors ${isActive ? 'bg-brand-500/20 text-white font-bold border-l-2 border-brand-400' : 'text-slate-500 border-l-2 border-transparent'}`}>
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
    </div>
  );
};
