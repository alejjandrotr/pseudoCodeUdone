import React, { useState, useEffect, useRef } from 'react';
import { P, PageSection, Callout, Strong, InlineCode, CodeBlock } from '../ArticlePageComponents';
import { ArrowDownAZ, Binary, Play, Pause, RotateCcw, TerminalSquare, Eye, EyeOff, HelpCircle, ChevronRight } from 'lucide-react';

// --- MINI ANIMATION COMPONENTS (NO CONTROLS, JUST LOOPING) ---

const MiniBurbuja: React.FC = () => {
  const initialArr = [50, 20, 60, 10, 40];
  const [arr, setArr] = useState(initialArr);
  const [active, setActive] = useState<number[]>([-1, -1]);
  const [sortedCount, setSortedCount] = useState<number>(0);

  useEffect(() => {
    let i = 0;
    let j = 0;
    let currentArr = [...initialArr];
    let interval: any;

    const step = () => {
      if (i >= currentArr.length - 1) {
        // sorted! Reset after a pause
        setActive([-1, -1]);
        setSortedCount(5);
        clearInterval(interval);
        setTimeout(() => {
          i = 0; j = 0;
          currentArr = [...initialArr];
          setArr(currentArr);
          setSortedCount(0);
          interval = setInterval(step, 800);
        }, 2000);
        return;
      }

      if (j >= currentArr.length - i - 1) {
        i++;
        j = 0;
        setSortedCount(i);
        return;
      }

      setActive([j, j + 1]);
      if (currentArr[j] > currentArr[j + 1]) {
        let temp = currentArr[j];
        currentArr[j] = currentArr[j + 1];
        currentArr[j + 1] = temp;
        setArr([...currentArr]);
      }
      j++;
    };

    interval = setInterval(step, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-end gap-2 h-32 bg-slate-900/50 rounded-xl p-4 my-6 border border-slate-800">
      {arr.map((val, idx) => (
        <div key={idx} className="flex flex-col items-center gap-2">
          <div 
            className={`w-8 rounded-t-sm transition-all duration-300 ${
              idx >= arr.length - sortedCount ? 'bg-brand-500/80' : 
              active.includes(idx) ? 'bg-amber-500' : 'bg-slate-700'
            }`}
            style={{ height: `${val}px` }}
          />
          <span className="text-xs font-mono text-slate-400">{val}</span>
        </div>
      ))}
    </div>
  );
};

const MiniSeleccion: React.FC = () => {
  const initialArr = [45, 15, 60, 20, 10];
  const [arr, setArr] = useState(initialArr);
  const [active, setActive] = useState<number[]>([-1, -1]); // [current i, current min]
  const [sortedCount, setSortedCount] = useState<number>(0);

  useEffect(() => {
    let i = 0;
    let j = 1;
    let minIdx = 0;
    let currentArr = [...initialArr];
    let interval: any;

    const step = () => {
      if (i >= currentArr.length - 1) {
        setActive([-1, -1]);
        setSortedCount(5);
        clearInterval(interval);
        setTimeout(() => {
          i = 0; j = 1; minIdx = 0;
          currentArr = [...initialArr];
          setArr(currentArr);
          setSortedCount(0);
          interval = setInterval(step, 700);
        }, 2000);
        return;
      }

      if (j >= currentArr.length) {
        // Swap
        let temp = currentArr[i];
        currentArr[i] = currentArr[minIdx];
        currentArr[minIdx] = temp;
        setArr([...currentArr]);
        i++;
        minIdx = i;
        j = i + 1;
        setSortedCount(i);
        return;
      }

      setActive([i, j]);
      if (currentArr[j] < currentArr[minIdx]) {
        minIdx = j;
      }
      j++;
    };

    interval = setInterval(step, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-end gap-2 h-32 bg-slate-900/50 rounded-xl p-4 my-6 border border-slate-800">
      {arr.map((val, idx) => (
        <div key={idx} className="flex flex-col items-center gap-2">
          <div 
            className={`w-8 rounded-t-sm transition-all duration-300 ${
              idx < sortedCount ? 'bg-brand-500/80' : 
              active[0] === idx ? 'bg-indigo-500' :
              active[1] === idx ? 'bg-pink-500' : 'bg-slate-700'
            }`}
            style={{ height: `${val}px` }}
          />
          <span className="text-xs font-mono text-slate-400">{val}</span>
        </div>
      ))}
    </div>
  );
};

const MiniInsercion: React.FC = () => {
  const initialArr = [35, 15, 50, 25, 10];
  const [arr, setArr] = useState(initialArr);
  const [active, setActive] = useState<number[]>([-1]); 
  const [sortedCount, setSortedCount] = useState<number>(1);

  useEffect(() => {
    let i = 1;
    let j = 0;
    let actual = 0;
    let state = 'pick'; // pick, shift, insert
    let currentArr = [...initialArr];
    let interval: any;

    const step = () => {
      if (i >= currentArr.length) {
        setActive([-1]);
        setSortedCount(5);
        clearInterval(interval);
        setTimeout(() => {
          i = 1; j = 0; state = 'pick';
          currentArr = [...initialArr];
          setArr(currentArr);
          setSortedCount(1);
          interval = setInterval(step, 700);
        }, 2000);
        return;
      }

      if (state === 'pick') {
        actual = currentArr[i];
        j = i - 1;
        setActive([i]);
        state = 'shift';
      } else if (state === 'shift') {
        if (j >= 0 && currentArr[j] > actual) {
          currentArr[j + 1] = currentArr[j];
          setArr([...currentArr]);
          setActive([j]);
          j--;
        } else {
          state = 'insert';
        }
      } else if (state === 'insert') {
        currentArr[j + 1] = actual;
        setArr([...currentArr]);
        setActive([-1]);
        i++;
        setSortedCount(i);
        state = 'pick';
      }
    };

    interval = setInterval(step, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-end gap-2 h-32 bg-slate-900/50 rounded-xl p-4 my-6 border border-slate-800">
      {arr.map((val, idx) => (
        <div key={idx} className="flex flex-col items-center gap-2">
          <div 
            className={`w-8 rounded-t-sm transition-all duration-300 ${
              idx < sortedCount && !active.includes(idx) ? 'bg-brand-500/80' : 
              active.includes(idx) ? 'bg-amber-500' : 'bg-slate-700'
            }`}
            style={{ height: `${val}px` }}
          />
          <span className="text-xs font-mono text-slate-400">{val}</span>
        </div>
      ))}
    </div>
  );
};


// --- MAIN ARTICLE COMPONENT ---

export const ArticleArreglosOrdenamiento: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [showDebug, setShowDebug] = useState(false);
  const [debugLogs, setDebugLogs] = useState<string[]>(['> Laboratorio listo.']);
  const [ramHighlight, setRamHighlight] = useState<string | null>(null);

  // Common Simulator State
  const [arr, setArr] = useState<number[]>([15, 3, 8, 1, 9]);
  const [iVar, setIVar] = useState<number | null>(null);
  const [jVar, setJVar] = useState<number | null>(null);
  const [auxVar, setAuxVar] = useState<number | null>(null);

  const stateRef = useRef({ activeTab, simStep, isPlaying, arr, iVar, jVar, auxVar });

  useEffect(() => {
    stateRef.current = { activeTab, simStep, isPlaying, arr, iVar, jVar, auxVar };
  }, [activeTab, simStep, isPlaying, arr, iVar, jVar, auxVar]);

  useEffect(() => {
    let interval: any;
    if (isPlaying) interval = setInterval(() => advanceSimulation(), 800);
    return () => clearInterval(interval);
  }, [isPlaying, activeTab]);

  const resetSimulation = () => {
    setIsPlaying(false);
    setSimStep(0);
    setActiveLine(null);
    setArr([15, 3, 8, 1, 9]);
    setIVar(null); setJVar(null); setAuxVar(null);
    setRamHighlight(null);
    setDebugLogs(['> Laboratorio reiniciado.']);
  };

  useEffect(() => { resetSimulation(); }, [activeTab]);

  const advanceSimulation = () => {
    const state = stateRef.current;
    
    if (state.activeTab === 0) { // Burbuja
      switch (state.simStep) {
        case 0:
          setActiveLine(6);
          setDebugLogs(prev => [...prev, '> [Líneas 6-10] Inicializando arreglo']);
          setSimStep(1);
          break;
        case 1:
          setActiveLine(13);
          const nextI = state.iVar === null ? 1 : state.iVar + 1;
          if (nextI > 4) { // N - 1
            setSimStep(8);
          } else {
            setIVar(nextI); setJVar(null);
            setRamHighlight('i');
            setDebugLogs(prev => [...prev, `> [Línea 13] Para i <- ${nextI}`]);
            setSimStep(2);
          }
          break;
        case 2:
          setActiveLine(15);
          const nextJ = state.jVar === null ? 1 : state.jVar + 1;
          const limitJ = 5 - (state.iVar ?? 1); // N - i
          if (nextJ > limitJ) {
            setSimStep(1); // loop i
          } else {
            setJVar(nextJ);
            setRamHighlight('j');
            setDebugLogs(prev => [...prev, `> [Línea 15] Para j <- ${nextJ}`]);
            setSimStep(3);
          }
          break;
        case 3:
          setActiveLine(16);
          const j = state.jVar ?? 1;
          const isGreater = state.arr[j-1] > state.arr[j];
          setDebugLogs(prev => [...prev, `> [Línea 16] ¿${state.arr[j-1]} > ${state.arr[j]}? ➔ ${isGreater}`]);
          if (isGreater) setSimStep(4);
          else setSimStep(7);
          break;
        case 4:
          setActiveLine(18);
          setAuxVar(state.arr[(state.jVar ?? 1) - 1]);
          setRamHighlight('aux');
          setDebugLogs(prev => [...prev, `> [Línea 18] aux <- ${state.arr[(state.jVar ?? 1) - 1]}`]);
          setSimStep(5);
          break;
        case 5:
          setActiveLine(19);
          const newArr1 = [...state.arr];
          newArr1[(state.jVar ?? 1) - 1] = newArr1[state.jVar ?? 1];
          setArr(newArr1);
          setDebugLogs(prev => [...prev, `> [Línea 19] numeros[j] <- numeros[j+1]`]);
          setSimStep(6);
          break;
        case 6:
          setActiveLine(20);
          const newArr2 = [...state.arr];
          newArr2[state.jVar ?? 1] = state.auxVar ?? 0;
          setArr(newArr2);
          setDebugLogs(prev => [...prev, `> [Línea 20] numeros[j+1] <- aux`]);
          setSimStep(7);
          break;
        case 7:
          setActiveLine(21);
          setDebugLogs(prev => [...prev, '> Fin Si / Fin Para interno']);
          setSimStep(2);
          break;
        case 8:
          setActiveLine(26);
          setDebugLogs(prev => [...prev, '> Fin del Algoritmo de Burbuja']);
          setIsPlaying(false);
          setSimStep(9);
          break;
      }
    } else if (state.activeTab === 1) { // Selección
      switch (state.simStep) {
        case 0:
          setActiveLine(6);
          setDebugLogs(prev => [...prev, '> Inicializando arreglo']);
          setSimStep(1);
          break;
        case 1:
          setActiveLine(9);
          const nextI = state.iVar === null ? 1 : state.iVar + 1;
          if (nextI > 4) {
            setSimStep(8);
          } else {
            setIVar(nextI);
            setRamHighlight('i');
            setDebugLogs(prev => [...prev, `> [Línea 9] Para i <- ${nextI}`]);
            setSimStep(2);
          }
          break;
        case 2:
          setActiveLine(10);
          setAuxVar(state.iVar); // using auxVar to store pos_menor
          setRamHighlight('aux');
          setDebugLogs(prev => [...prev, `> [Línea 10] pos_menor <- ${state.iVar}`]);
          setJVar(null);
          setSimStep(3);
          break;
        case 3:
          setActiveLine(13);
          const nextJ = state.jVar === null ? (state.iVar ?? 1) + 1 : state.jVar + 1;
          if (nextJ > 5) {
            setSimStep(6);
          } else {
            setJVar(nextJ);
            setRamHighlight('j');
            setDebugLogs(prev => [...prev, `> [Línea 13] Para j <- ${nextJ}`]);
            setSimStep(4);
          }
          break;
        case 4:
          setActiveLine(14);
          const j = state.jVar ?? 1;
          const posMenor = state.auxVar ?? 1;
          const isLess = state.arr[j-1] < state.arr[posMenor-1];
          setDebugLogs(prev => [...prev, `> [Línea 14] ¿${state.arr[j-1]} < ${state.arr[posMenor-1]}? ➔ ${isLess}`]);
          if (isLess) setSimStep(5);
          else setSimStep(3);
          break;
        case 5:
          setActiveLine(15);
          setAuxVar(state.jVar);
          setRamHighlight('aux');
          setDebugLogs(prev => [...prev, `> [Línea 15] pos_menor <- ${state.jVar}`]);
          setSimStep(3);
          break;
        case 6:
          setActiveLine(19);
          const swapNeeded = state.auxVar !== state.iVar;
          if (swapNeeded) {
            setDebugLogs(prev => [...prev, `> [Línea 19] Hay un nuevo menor. Intercambiando.`]);
            const newArr = [...state.arr];
            let temp = newArr[(state.iVar ?? 1)-1];
            newArr[(state.iVar ?? 1)-1] = newArr[(state.auxVar ?? 1)-1];
            newArr[(state.auxVar ?? 1)-1] = temp;
            setArr(newArr);
          } else {
            setDebugLogs(prev => [...prev, `> [Línea 19] El menor ya está en i. No hay intercambio.`]);
          }
          setSimStep(7);
          break;
        case 7:
          setActiveLine(23);
          setSimStep(1);
          break;
        case 8:
          setActiveLine(25);
          setDebugLogs(prev => [...prev, '> Fin del Algoritmo de Selección']);
          setIsPlaying(false);
          setSimStep(9);
          break;
      }
    } else if (state.activeTab === 2) { // Insercion
      switch (state.simStep) {
        case 0:
          setActiveLine(8);
          setDebugLogs(prev => [...prev, '> Inicializando arreglo para Inserción']);
          setSimStep(1);
          break;
        case 1:
          setActiveLine(9);
          const nextI = state.iVar === null ? 2 : state.iVar + 1;
          if (nextI > 5) {
            setSimStep(10);
          } else {
            setIVar(nextI);
            setRamHighlight('i');
            setDebugLogs(prev => [...prev, `> [Línea 9] Para i <- ${nextI}`]);
            setSimStep(2);
          }
          break;
        case 2:
          setActiveLine(10);
          setAuxVar(state.arr[(state.iVar ?? 2)-1]);
          setRamHighlight('aux');
          setDebugLogs(prev => [...prev, `> [Línea 10] actual <- ${state.arr[(state.iVar ?? 2)-1]}`]);
          setSimStep(3);
          break;
        case 3:
          setActiveLine(11);
          setJVar((state.iVar ?? 2) - 1);
          setRamHighlight('j');
          setDebugLogs(prev => [...prev, `> [Línea 11] j <- ${(state.iVar ?? 2) - 1}`]);
          setSimStep(4);
          break;
        case 4:
          setActiveLine(14);
          const j = state.jVar ?? 1;
          const actual = state.auxVar ?? 0;
          if (j >= 1 && state.arr[j-1] > actual) {
            setDebugLogs(prev => [...prev, `> [Línea 14] Mientras (j>=1 Y numeros[j] > actual) ➔ ${state.arr[j-1]} > ${actual} (Sí)`]);
            setSimStep(5);
          } else {
            setDebugLogs(prev => [...prev, `> [Línea 14] Mientras ➔ FALSO. Fin del Mientras.`]);
            setSimStep(8);
          }
          break;
        case 5:
          setActiveLine(15);
          const newArr = [...state.arr];
          newArr[(state.jVar ?? 1)] = newArr[(state.jVar ?? 1)-1];
          setArr(newArr);
          setDebugLogs(prev => [...prev, `> [Línea 15] Desplazando ${newArr[(state.jVar ?? 1)-1]} a la derecha`]);
          setSimStep(6);
          break;
        case 6:
          setActiveLine(16);
          setJVar((state.jVar ?? 1) - 1);
          setRamHighlight('j');
          setDebugLogs(prev => [...prev, `> [Línea 16] j <- j - 1 ➔ ${(state.jVar ?? 1) - 1}`]);
          setSimStep(7);
          break;
        case 7:
          setActiveLine(17);
          setSimStep(4);
          break;
        case 8:
          setActiveLine(20);
          const newArr2 = [...state.arr];
          newArr2[(state.jVar ?? 0)] = state.auxVar ?? 0;
          setArr(newArr2);
          setDebugLogs(prev => [...prev, `> [Línea 20] numeros[j+1] <- actual (${state.auxVar})`]);
          setSimStep(9);
          break;
        case 9:
          setActiveLine(21);
          setSimStep(1);
          break;
        case 10:
          setActiveLine(22);
          setDebugLogs(prev => [...prev, '> Fin del Algoritmo de Inserción']);
          setIsPlaying(false);
          setSimStep(11);
          break;
      }
    }
  };

  const startSimulation = () => {
    if (simStep === 9 && (activeTab === 0 || activeTab === 1)) resetSimulation(), setIsPlaying(true);
    else if (simStep === 11 && activeTab === 2) resetSimulation(), setIsPlaying(true);
    else setIsPlaying(!isPlaying);
  };

  const CODE_BURBUJA = [
    'Algoritmo Burbuja',
    'Variables: numeros: arreglo[5] de Entero',
    '    i, j, aux, N: Entero',
    'Inicio',
    '    N <- 5',
    '    // Arreglo desordenado inicial',
    '    numeros[1] <- 15',
    '    numeros[2] <- 3',
    '    numeros[3] <- 8',
    '    numeros[4] <- 1',
    '    numeros[5] <- 9',
    '',
    '    Para i = 1 Hasta N - 1 Inc 1',
    '        // Compara vecinos adyacentes',
    '        Para j = 1 Hasta N - i Inc 1',
    '            Si (numeros[j] > numeros[j + 1]) Entonces',
    '                // Intercambio',
    '                aux <- numeros[j]',
    '                numeros[j] <- numeros[j + 1]',
    '                numeros[j + 1] <- aux',
    '            Fin Si',
    '        Fin Para',
    '    Fin Para',
    '',
    '    Escribir "Arreglo Ordenado"',
    'Fin'
  ];

  const CODE_SELECCION = [
    'Algoritmo Seleccion',
    'Variables: numeros: arreglo[5] de Entero',
    '    i, j, pos_menor, aux, N: Entero',
    'Inicio',
    '    N <- 5',
    '    // (Arreglo inicializado)',
    '',
    '    // Divide entre ordenado y desordenado',
    '    Para i = 1 Hasta N - 1 Inc 1',
    '        pos_menor <- i',
    '        ',
    '        // Busca el más pequeño',
    '        Para j = i + 1 Hasta N Inc 1',
    '            Si (numeros[j] < numeros[pos_menor]) Entonces',
    '                pos_menor <- j',
    '            Fin Si',
    '        Fin Para',
    '        ',
    '        Si (pos_menor <> i) Entonces',
    '            // Intercambia con la pos inicial',
    '            aux <- numeros[i]',
    '            numeros[i] <- numeros[pos_menor]',
    '            numeros[pos_menor] <- aux',
    '        Fin Si',
    '    Fin Para',
    'Fin'
  ];

  const CODE_INSERCION = [
    'Algoritmo Insercion',
    'Variables: numeros: arreglo[5] de Entero',
    '    i, j, actual, N: Entero',
    'Inicio',
    '    N <- 5',
    '    // (Arreglo inicializado)',
    '',
    '    Para i = 2 Hasta N Inc 1',
    '        actual <- numeros[i]',
    '        j <- i - 1',
    '        ',
    '        // Desplazamos mayores a la derecha',
    '        Mientras (j >= 1 Y numeros[j] > actual) Hacer',
    '            numeros[j + 1] <- numeros[j]',
    '            j <- j - 1',
    '        Fin Mientras',
    '        ',
    '        // Insertamos en su posición',
    '        numeros[j + 1] <- actual',
    '    Fin Para',
    'Fin'
  ];

  return (
    <div>
      <P>
        El ordenamiento es una de las operaciones más comunes y fundamentales en el procesamiento de datos. Consiste en organizar los elementos de un arreglo en un orden específico, generalmente de forma ascendente (de menor a mayor) o descendente (de mayor a menor).
      </P>
      <P>
        Tener los datos ordenados no solo facilita la visualización para el usuario final, sino que es un requisito indispensable para aplicar algoritmos de búsqueda más eficientes, como la Búsqueda Binaria.
      </P>

      <PageSection title="1. El Método de la Burbuja (Bubble Sort)">
        <MiniBurbuja />
        <P>
          Existen múltiples algoritmos de ordenamiento (Selección, Inserción, Quicksort, etc.). Sin embargo, el <Strong>Método de la Burbuja</Strong> es el más clásico y sencillo de comprender para iniciarse en la manipulación de arreglos.
        </P>
        
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl my-6">
          <h4 className="text-brand-400 font-bold mb-3 flex items-center gap-2">
            <ArrowDownAZ size={16} /> Lógica del Burbujeo
          </h4>
          <p className="text-sm text-slate-300 mb-4">
            Se basa en recorrer el arreglo repetidas veces, comparando elementos adyacentes (vecinos). Si el elemento actual es mayor que el siguiente, se intercambian sus posiciones. Este proceso se repite hasta que el arreglo completo esté ordenado (los elementos más grandes "burbujean" hacia el final).
          </p>
          <div className="bg-black/50 p-4 rounded-lg font-mono text-[11px] text-slate-400">
            <div className="text-emerald-400 font-bold mb-1">// Ejemplo: [5, 3, 8, 1]</div>
            <div><span className="text-slate-500">Paso 1:</span> Compara 5 y 3 (5 &gt; 3) -&gt; Intercambia: [3, 5, 8, 1]</div>
            <div><span className="text-slate-500">Paso 2:</span> Compara 5 y 8 (5 &lt; 8) -&gt; No hace nada: [3, 5, 8, 1]</div>
            <div><span className="text-slate-500">Paso 3:</span> Compara 8 y 1 (8 &gt; 1) -&gt; Intercambia: [3, 5, 1, 8]</div>
            <div className="text-brand-300 italic mt-1">(El 8 ya está en su posición final)</div>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-slate-200 mt-6 mb-4">Ejercicio: Implementación de Burbuja</h3>
        <CodeBlock code={CODE_BURBUJA.join('\n')} />

        <Callout variant="tip">
          <Strong>Optimización del ciclo interno:</Strong> Observa que el ciclo interno <InlineCode>j</InlineCode> termina en <InlineCode>N - i</InlineCode>. Esto se debe a que en cada pasada exterior <InlineCode>i</InlineCode>, el elemento más grande queda fijo en su posición correcta al final, por lo que no hace falta volver a compararlo en las pasadas subsiguientes.
        </Callout>
      </PageSection>

      <PageSection title="2. Ordenamiento por Selección (Selection Sort)">
        <MiniSeleccion />
        <P>
          Este algoritmo divide el arreglo en dos partes: una ordenada y otra desordenada. En cada pasada, busca el elemento más pequeño en la parte desordenada y lo intercambia con el primer elemento desordenado, expandiendo así la parte ordenada.
        </P>
        <h3 className="text-xl font-bold text-slate-200 mt-6 mb-4">Ejercicio: Implementación de Selección</h3>
        <CodeBlock code={CODE_SELECCION.join('\n')} />
      </PageSection>

      <PageSection title="3. Ordenamiento por Inserción (Insertion Sort)">
        <MiniInsercion />
        <P>
          La inserción funciona de forma similar a como ordenaríamos cartas en nuestra mano. Toma un elemento de la parte desordenada y lo inserta en su posición correcta dentro de la parte que ya está ordenada, desplazando los demás elementos mayores hacia la derecha para hacerle espacio.
        </P>
        <h3 className="text-xl font-bold text-slate-200 mt-6 mb-4">Ejercicio: Implementación de Inserción</h3>
        <CodeBlock code={CODE_INSERCION.join('\n')} />
      </PageSection>

      {/* --- LABORATORIO INTERACTIVO --- */}
      <PageSection title="Laboratorio: Trazador de Ordenamientos">
        <P>Compara paso a paso cómo la computadora mueve e intercambia los valores en la memoria RAM utilizando Burbuja y Selección.</P>
        <div className="glass-panel p-6 border border-slate-800 rounded-2xl bg-slate-950/45 my-8">
          <div className="flex gap-2 mb-6 border-b border-slate-800 pb-4 overflow-x-auto">
            <button 
              onClick={() => setActiveTab(0)}
              className={`px-4 py-2 text-sm font-bold rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 0 ? 'bg-brand-500 text-slate-950 shadow-[0_0_15px_rgba(0,255,136,0.4)]' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <ArrowDownAZ size={16} /> Burbuja
            </button>
            <button 
              onClick={() => setActiveTab(1)}
              className={`px-4 py-2 text-sm font-bold rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 1 ? 'bg-indigo-500 text-slate-950 shadow-[0_0_15px_rgba(99,102,241,0.4)]' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <ArrowDownAZ size={16} /> Selección
            </button>
            <button 
              onClick={() => setActiveTab(2)}
              className={`px-4 py-2 text-sm font-bold rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 2 ? 'bg-pink-500 text-slate-950 shadow-[0_0_15px_rgba(236,72,153,0.4)]' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <ArrowDownAZ size={16} /> Inserción
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs uppercase font-bold text-slate-400 flex items-center gap-1.5 font-sans">
                    <HelpCircle size={14} className="text-brand-400" /> Memoria (RAM) de Variables
                  </span>
                  <button 
                    onClick={() => setShowDebug(!showDebug)}
                    className={`flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-colors ${
                      showDebug ? 'bg-brand-500/15 border-brand-500/30 text-brand-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    {showDebug ? <EyeOff size={11} /> : <Eye size={11} />} {showDebug ? 'Ocultar Depuración' : 'Ver Depuración'}
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2.5 my-3">
                  <div className={`px-3 py-2 rounded-lg border font-mono text-center transition-all ${ramHighlight === 'i' ? 'border-brand-500 bg-brand-500/10' : 'border-slate-800 bg-slate-900/40'}`}>
                    <span className="text-[9px] text-slate-500 block mb-0.5">i (externo)</span>
                    <span className="text-base font-bold text-slate-100">{iVar ?? '?'}</span>
                  </div>
                  <div className={`px-3 py-2 rounded-lg border font-mono text-center transition-all ${ramHighlight === 'j' ? 'border-amber-500 bg-amber-500/10' : 'border-slate-800 bg-slate-900/40'}`}>
                    <span className="text-[9px] text-slate-500 block mb-0.5">j (interno)</span>
                    <span className="text-base font-bold text-slate-100">{jVar ?? '?'}</span>
                  </div>
                  <div className={`px-3 py-2 rounded-lg border font-mono text-center transition-all ${ramHighlight === 'aux' ? 'border-pink-500 bg-pink-500/10' : 'border-slate-800 bg-slate-900/40'}`}>
                    <span className="text-[9px] text-slate-500 block mb-0.5">{activeTab === 0 ? 'aux (temp)' : 'pos_menor / aux'}</span>
                    <span className="text-base font-bold text-slate-100">{auxVar ?? '?'}</span>
                  </div>
                </div>
              </div>

              {/* Array visualizer */}
              <div className="mt-4 mb-2">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-2 block">Arreglo [numeros]</span>
                <div className="flex flex-wrap gap-2">
                  {arr.map((val, idx) => {
                    let active = false;
                    let isSorted = false;
                    if (activeTab === 0) {
                      if (jVar && (idx === jVar - 1 || idx === jVar)) active = true;
                      if (iVar && idx >= 5 - (iVar - 1)) isSorted = true; 
                    } else if (activeTab === 1) {
                      if (jVar && idx === jVar - 1) active = true;
                      if (auxVar && idx === auxVar - 1) active = true;
                      if (iVar && idx < iVar - 1) isSorted = true;
                    } else if (activeTab === 2) {
                      if (jVar && idx === jVar - 1) active = true;
                      if (iVar && idx < iVar - 1 && !active) isSorted = true;
                      if (iVar && idx === iVar - 1) active = true; // "actual"
                    }
                    return (
                      <div key={idx} className="flex flex-col items-center">
                        <div className={`w-10 h-10 flex items-center justify-center font-mono text-sm font-bold rounded-lg border-2 transition-all ${
                          isSorted ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400' :
                          active ? 'border-amber-500 bg-amber-500/20 text-amber-300' : 'border-slate-700 bg-slate-800/50 text-slate-500'
                        }`}>
                          {val}
                        </div>
                        <span className="text-[9px] text-slate-500 mt-1">[{idx + 1}]</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {showDebug && (
                <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 font-mono text-[10.5px] text-slate-400 flex flex-col justify-end min-h-[110px] max-h-[130px] overflow-y-auto mt-3">
                  <div className="text-[9px] uppercase font-bold text-brand-400/70 mb-1.5 tracking-widest font-sans">
                    🔧 CONSOLA DE DEPURACIÓN
                  </div>
                  <div className="space-y-1 flex-1 flex flex-col justify-end">
                    {debugLogs.slice(-4).map((log, idx) => <div key={idx} className="text-slate-500">{log}</div>)}
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-slate-900 flex justify-between items-center font-sans">
                <button 
                  onClick={resetSimulation}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
                >
                  <RotateCcw size={16} />
                </button>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={advanceSimulation}
                    disabled={isPlaying}
                    className="flex items-center gap-1.5 px-3 py-2 bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 font-bold text-xs rounded-lg hover:bg-indigo-500/30 transition-colors disabled:opacity-50"
                  >
                    Siguiente Paso <ChevronRight size={14} />
                  </button>
                  <button 
                    onClick={startSimulation}
                    className={`flex items-center gap-1.5 px-4 py-2 font-bold text-xs rounded-lg transition-colors border ${
                      isPlaying ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 hover:bg-amber-500/30' : 'bg-brand-500/20 text-brand-400 border-brand-500/40 hover:bg-brand-500/30'
                    }`}
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />} {isPlaying ? 'Pausar' : 'Auto-Play'}
                  </button>
                </div>
              </div>
            </div>

            {/* Code Column */}
            <div className="w-full lg:w-[450px] xl:w-[500px] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-2xl shrink-0">
              <div className="bg-slate-800/80 px-4 py-2.5 border-b border-slate-700 flex items-center justify-between font-sans">
                <span className="text-xs font-mono text-slate-400">{activeTab === 0 ? 'burbuja.udone' : activeTab === 1 ? 'seleccion.udone' : 'insercion.udone'}</span>
              </div>
              <div className="p-4 font-mono text-[10px] sm:text-[11px] space-y-1 overflow-y-auto flex-1 bg-slate-950/20 min-h-[300px]">
                {(activeTab === 0 ? CODE_BURBUJA : activeTab === 1 ? CODE_SELECCION : CODE_INSERCION).map((line, idx) => {
                  const lineNum = idx + 1;
                  const isActive = activeLine === lineNum;
                  return (
                    <div 
                      key={idx} 
                      className={`flex gap-3 px-2 py-0.5 rounded-sm transition-colors ${
                        isActive ? 'bg-brand-500/20 text-white font-bold border-l-2 border-brand-400' : 'text-slate-500 border-l-2 border-transparent'
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
