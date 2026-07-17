import React, { useState, useEffect, useRef } from 'react';
import { P, PageSection, Callout, Strong, InlineCode, CodeBlock } from '../ArticlePageComponents';
import { Search, ChevronRight, Binary, ArrowUp, ArrowDown, Play, Pause, RotateCcw, Box, TerminalSquare, Eye, EyeOff, CheckCircle, HelpCircle } from 'lucide-react';

export const ArticleArreglosBusqueda: React.FC = () => {

  const [activeTab, setActiveTab] = useState<number>(0); // 0 = Secuencial, 1 = Binaria
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [simStep, setSimStep] = useState<number>(0);
  const [showDebug, setShowDebug] = useState<boolean>(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [debugLogs, setDebugLogs] = useState<string[]>(['> Laboratorio de búsquedas listo. Presiona Siguiente Paso para comenzar.']);
  const [ramHighlight, setRamHighlight] = useState<string | null>(null);

  // States Secuencial
  const [secI, setSecI] = useState<number | null>(null);
  const [secBuscado, setSecBuscado] = useState<number>(30);
  const [secEncontrado, setSecEncontrado] = useState<boolean>(false);
  const [secPos, setSecPos] = useState<number>(0);

  // States Binaria
  const [binInf, setBinInf] = useState<number | null>(null);
  const [binSup, setBinSup] = useState<number | null>(null);
  const [binCentro, setBinCentro] = useState<number | null>(null);
  const [binEncontrado, setBinEncontrado] = useState<boolean>(false);
  const [binBuscado, setBinBuscado] = useState<number>(45);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const stateRef = useRef({
    activeTab, simStep, isPlaying, 
    secI, secBuscado, secEncontrado, secPos,
    binInf, binSup, binCentro, binEncontrado, binBuscado
  });

  useEffect(() => {
    stateRef.current = {
      activeTab, simStep, isPlaying, 
      secI, secBuscado, secEncontrado, secPos,
      binInf, binSup, binCentro, binEncontrado, binBuscado
    };
  }, [
    activeTab, simStep, isPlaying, 
    secI, secBuscado, secEncontrado, secPos,
    binInf, binSup, binCentro, binEncontrado, binBuscado
  ]);

  const CODE_SEC = [
    'Algoritmo BusquedaSecuencial',
    'Variables:',
    '    edades: arreglo [5] de Entero',
    '    i, valor_buscado, posicion: Entero; encontrado: Logico',
    'Inicio',
    '    // Edades = [45, 22, 18, 30, 55]',
    '    valor_buscado <- 30',
    '    encontrado <- Falso',
    '    posicion <- 0',
    '    Para i = 1 Hasta 5 Inc 1',
    '        Si (edades[i] = valor_buscado) Entonces',
    '            encontrado <- Verdadero',
    '            posicion <- i',
    '        Fin Si',
    '    Fin Para',
    '    Si (encontrado = Verdadero) Entonces',
    '        Escribir "Valor encontrado en posición: ", posicion',
    '    Sino Escribir "El valor no existe." Fin Si',
    'Fin'
  ];

  const CODE_BIN = [
    'Algoritmo BusquedaBinaria',
    'Variables:',
    '    edades: arreglo [11] de Entero',
    '    valor_buscado, centro, limite_inf, limite_sup: Entero; encontrado: Logico',
    'Inicio',
    '    // Ordenado: [5, 10, 15, 22, 30, 35, 45, 50, 60, 75, 80]',
    '    valor_buscado <- 50',
    '    encontrado <- Falso',
    '    limite_inf <- 1; limite_sup <- 11',
    '    Mientras (limite_inf <= limite_sup Y encontrado = Falso) Hacer',
    '        centro <- (limite_inf + limite_sup) / 2',
    '        Si (edades[centro] = valor_buscado) Entonces',
    '            encontrado <- Verdadero',
    '        Sino',
    '            Si (edades[centro] < valor_buscado) Entonces',
    '                limite_inf <- centro + 1',
    '            Sino',
    '                limite_sup <- centro - 1',
    '            Fin Si',
    '        Fin Si',
    '    Fin Mientras',
    '    Si (encontrado = Verdadero) Entonces',
    '        Escribir "Encontrado en posición: ", centro',
    '    Sino Escribir "El valor no existe." Fin Si',
    'Fin'
  ];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => advanceSimulation(), 1200);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, simStep, activeTab]);

  const resetSimulation = () => {
    setIsPlaying(false);
    setActiveLine(null);
    setSimStep(0);
    setTerminalLogs([]);
    setDebugLogs(['> Laboratorio listo. Presiona Siguiente Paso o Auto-Play.']);
    setRamHighlight(null);

    setSecI(null); setSecEncontrado(false); setSecPos(0);
    setBinInf(null); setBinSup(null); setBinCentro(null); setBinEncontrado(false);
  };

  useEffect(() => { resetSimulation(); }, [activeTab]);

  const advanceSimulation = () => {
    const state = stateRef.current;
    if (state.activeTab === 0) {
      const arr = [45, 22, 18, 30, 55]; // 1-indexed in UI
      switch (state.simStep) {
        case 0:
          setActiveLine(7);
          setSecBuscado(30);
          setRamHighlight('buscado');
          setDebugLogs(prev => [...prev, '> [Línea 7] valor_buscado <- 30']);
          setSimStep(1);
          break;
        case 1:
          setActiveLine(8);
          setSecEncontrado(false);
          setRamHighlight('encontrado');
          setDebugLogs(prev => [...prev, '> [Línea 8] encontrado <- Falso']);
          setSimStep(2);
          break;
        case 2:
          setActiveLine(9);
          setSecPos(0);
          setRamHighlight('posicion');
          setDebugLogs(prev => [...prev, '> [Línea 9] posicion <- 0']);
          setSimStep(3);
          break;
        case 3:
          setActiveLine(10);
          const iInit = state.secI === null ? 1 : state.secI + 1;
          if (iInit > 5) {
            setRamHighlight(null);
            setDebugLogs(prev => [...prev, `> [Línea 10] i (${iInit}) > 5. Fin del Para.`]);
            setSimStep(8);
          } else {
            setSecI(iInit);
            setRamHighlight('i');
            setDebugLogs(prev => [...prev, `> [Línea 10] Para: i = ${iInit}`]);
            setSimStep(4);
          }
          break;
        case 4:
          setActiveLine(11);
          const currentVal = arr[(state.secI ?? 1) - 1];
          const isMatch = currentVal === state.secBuscado;
          setDebugLogs(prev => [...prev, `> [Línea 11] Comparando: ¿${currentVal} = ${state.secBuscado}? ➔ ${isMatch}`]);
          if (isMatch) setSimStep(5);
          else setSimStep(7);
          break;
        case 5:
          setActiveLine(12);
          setSecEncontrado(true);
          setRamHighlight('encontrado');
          setDebugLogs(prev => [...prev, '> [Línea 12] ¡Match! encontrado <- Verdadero']);
          setSimStep(6);
          break;
        case 6:
          setActiveLine(13);
          setSecPos(state.secI ?? 0);
          setRamHighlight('posicion');
          setDebugLogs(prev => [...prev, `> [Línea 13] posicion <- ${state.secI}`]);
          setSimStep(7);
          break;
        case 7:
          setActiveLine(15);
          setDebugLogs(prev => [...prev, '> [Línea 15] Fin Si / Fin Para (avanzando)']);
          setSimStep(3);
          break;
        case 8:
          setActiveLine(16);
          setRamHighlight('encontrado');
          setDebugLogs(prev => [...prev, `> [Línea 16] Evaluando encontrado = ${state.secEncontrado}`]);
          if (state.secEncontrado) setSimStep(9);
          else setSimStep(10);
          break;
        case 9:
          setActiveLine(17);
          setTerminalLogs([`Valor encontrado en posición: ${state.secPos}`]);
          setDebugLogs(prev => [...prev, '> [Línea 17] Escribiendo resultado exitoso.']);
          setSimStep(11);
          break;
        case 10:
          setActiveLine(18);
          setTerminalLogs([`El valor no existe.`]);
          setSimStep(11);
          break;
        case 11:
          setActiveLine(19);
          setDebugLogs(prev => [...prev, '> Fin del Algoritmo Secuencial.']);
          setIsPlaying(false);
          setSimStep(12);
          break;
        default:
          resetSimulation();
      }
    } else {
      const arrBin = [5, 10, 15, 22, 30, 35, 45, 50, 60, 75, 80];
      switch (state.simStep) {
        case 0:
          setActiveLine(7);
          setBinBuscado(50);
          setRamHighlight('buscado');
          setDebugLogs(prev => [...prev, '> [Línea 7] valor_buscado <- 50']);
          setSimStep(1);
          break;
        case 1:
          setActiveLine(8);
          setBinEncontrado(false);
          setRamHighlight('encontrado');
          setDebugLogs(prev => [...prev, '> [Línea 8] encontrado <- Falso']);
          setSimStep(2);
          break;
        case 2:
          setActiveLine(9);
          setBinInf(1); setBinSup(11);
          setRamHighlight('limites');
          setDebugLogs(prev => [...prev, '> [Línea 9] limite_inf <- 1, limite_sup <- 11']);
          setSimStep(3);
          break;
        case 3:
          setActiveLine(10);
          const canLoop = (state.binInf ?? 1) <= (state.binSup ?? 11) && !state.binEncontrado;
          setDebugLogs(prev => [...prev, `> [Línea 10] Mientras: inf<=sup Y encontrado=Falso ➔ ${canLoop}`]);
          if (canLoop) setSimStep(4);
          else setSimStep(10);
          break;
        case 4:
          setActiveLine(11);
          const c = Math.floor(((state.binInf ?? 1) + (state.binSup ?? 11)) / 2);
          setBinCentro(c);
          setRamHighlight('centro');
          setDebugLogs(prev => [...prev, `> [Línea 11] centro <- (${state.binInf} + ${state.binSup}) / 2 = ${c}`]);
          setSimStep(5);
          break;
        case 5:
          setActiveLine(12);
          const currentVal = arrBin[(state.binCentro ?? 1) - 1];
          const isMatch = currentVal === state.binBuscado;
          setDebugLogs(prev => [...prev, `> [Línea 12] ¿${currentVal} = ${state.binBuscado}? ➔ ${isMatch}`]);
          if (isMatch) setSimStep(6);
          else setSimStep(7);
          break;
        case 6:
          setActiveLine(13);
          setBinEncontrado(true);
          setRamHighlight('encontrado');
          setDebugLogs(prev => [...prev, '> [Línea 13] ¡Match! encontrado <- Verdadero']);
          setSimStep(3); // Go back to loop condition
          break;
        case 7:
          setActiveLine(15);
          const valCenter = arrBin[(state.binCentro ?? 1) - 1];
          const isLess = valCenter < state.binBuscado;
          setDebugLogs(prev => [...prev, `> [Línea 15] ¿${valCenter} < ${state.binBuscado}? ➔ ${isLess}`]);
          if (isLess) setSimStep(8);
          else setSimStep(9);
          break;
        case 8:
          setActiveLine(16);
          const newInf = (state.binCentro ?? 1) + 1;
          setBinInf(newInf);
          setRamHighlight('limites');
          setDebugLogs(prev => [...prev, `> [Línea 16] limite_inf <- ${newInf} (Mitad Derecha)`]);
          setSimStep(3);
          break;
        case 9:
          setActiveLine(18);
          const newSup = (state.binCentro ?? 1) - 1;
          setBinSup(newSup);
          setRamHighlight('limites');
          setDebugLogs(prev => [...prev, `> [Línea 18] limite_sup <- ${newSup} (Mitad Izquierda)`]);
          setSimStep(3);
          break;
        case 10:
          setActiveLine(22);
          if (state.binEncontrado) setSimStep(11);
          else setSimStep(12);
          break;
        case 11:
          setActiveLine(23);
          setTerminalLogs([`Encontrado en posición: ${state.binCentro}`]);
          setSimStep(13);
          break;
        case 12:
          setActiveLine(24);
          setTerminalLogs([`El valor no existe.`]);
          setSimStep(13);
          break;
        case 13:
          setActiveLine(25);
          setDebugLogs(prev => [...prev, '> Fin del Algoritmo Binario.']);
          setIsPlaying(false);
          setSimStep(14);
          break;
        default:
          resetSimulation();
      }
    }
  };

  const startSimulation = () => {
    const s = stateRef.current;
    if (s.activeTab === 0 && s.simStep === 12) resetSimulation(), setIsPlaying(true);
    else if (s.activeTab === 1 && s.simStep === 14) resetSimulation(), setIsPlaying(true);
    else setIsPlaying(!s.isPlaying);
  };

  return (
    <div>
      <P>
        Una vez que tenemos información almacenada en un arreglo, la operación lógica siguiente es poder encontrar si un elemento específico existe dentro de él y, de ser así, en qué posición se encuentra.
      </P>
      <P>
        Existen múltiples técnicas para realizar esto, dependiendo de lo que busquemos y de si el arreglo está ordenado o no.
      </P>

      <PageSection title="1. Búsqueda Secuencial (Lineal)">
        <P>
          Es el método más sencillo y directo. Consiste en recorrer el arreglo desde la primera posición hasta la última, comparando cada elemento con el valor que estamos buscando.
        </P>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl my-6">
          <h4 className="text-brand-400 font-bold mb-3 flex items-center gap-2">
            <Search size={16} /> Características
          </h4>
          <ul className="list-none space-y-3">
            <li className="flex gap-2 text-sm text-slate-300">
              <ChevronRight size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              <span><Strong className="text-emerald-400">Ventaja:</Strong> Funciona en cualquier arreglo, sin importar si los datos están ordenados o desordenados.</span>
            </li>
            <li className="flex gap-2 text-sm text-slate-300">
              <ChevronRight size={16} className="text-orange-400 shrink-0 mt-0.5" />
              <span><Strong className="text-orange-400">Desventaja:</Strong> Es ineficiente para arreglos muy grandes, ya que en el peor de los casos (el elemento no existe o está en la última posición), el algoritmo tendrá que revisar absolutamente todas las casillas.</span>
            </li>
          </ul>
        </div>
        
        <h3 className="text-xl font-bold text-slate-200 mt-6 mb-4">Ejercicio: Búsqueda Secuencial</h3>
        <CodeBlock code={CODE_SEC.join('\n')} />
      </PageSection>

      <PageSection title="2. Búsqueda del Número Mayor">
        <P>
          Otra operación sumamente común es encontrar cuál es el valor más grande dentro de un arreglo. Para hacer esto, no se requiere que el arreglo esté ordenado.
        </P>
        
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl my-6">
          <h4 className="text-brand-400 font-bold mb-3 flex items-center gap-2">
            <ArrowUp size={16} /> Lógica del algoritmo
          </h4>
          <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm ml-2">
            <li>Asumimos que el <Strong>primer elemento</Strong> del arreglo es el mayor (nuestro punto de partida).</li>
            <li>Recorremos el resto del arreglo.</li>
            <li>Si encontramos un número más grande que nuestro <InlineCode>mayor</InlineCode> actual, lo actualizamos.</li>
          </ol>
        </div>

        <h3 className="text-xl font-bold text-slate-200 mt-6 mb-4">Ejercicio: Encontrar el Mayor</h3>
        <CodeBlock code={`Algoritmo BuscarMayor
Variables:
    notas: arreglo [5] de Real
    i: Entero
    mayor: Real

Inicio
    // Llenamos el arreglo con notas
    notas[1] <- 14.5
    notas[2] <- 19.0
    notas[3] <- 10.5
    notas[4] <- 16.0
    notas[5] <- 08.5

    // Asumimos que el primero es el mayor
    mayor <- notas[1]

    // Recorremos desde la segunda posición hasta el final
    Para i = 2 Hasta 5 Inc 1
        Si (notas[i] > mayor) Entonces
            mayor <- notas[i]
        Fin Si
    Fin Para

    Escribir "La nota más alta es: ", mayor
Fin`} />
      </PageSection>

      <PageSection title="3. Búsqueda del Número Menor">
        <P>
          La búsqueda del elemento más pequeño sigue exactamente la misma lógica que la búsqueda del mayor, pero invertimos la condición: buscamos aquellos que sean estrictamente menores.
        </P>

        <h3 className="text-xl font-bold text-slate-200 mt-6 mb-4">Ejercicio: Encontrar el Menor</h3>
        <CodeBlock code={`Algoritmo BuscarMenor
Variables:
    notas: arreglo [5] de Real
    i: Entero
    menor: Real

Inicio
    // Llenamos el arreglo con notas
    notas[1] <- 14.5
    notas[2] <- 19.0
    notas[3] <- 10.5
    notas[4] <- 16.0
    notas[5] <- 08.5

    // Asumimos que el primero es el menor
    menor <- notas[1]

    // Recorremos desde la segunda posición hasta el final
    Para i = 2 Hasta 5 Inc 1
        Si (notas[i] < menor) Entonces
            menor <- notas[i]
        Fin Si
    Fin Para

    Escribir "La nota más baja es: ", menor
Fin`} />
      </PageSection>

      <PageSection title="4. Búsqueda Binaria">
        <P>
          La búsqueda binaria es un algoritmo drásticamente más rápido y eficiente, pero tiene una <Strong className="text-amber-400">condición estricta: el arreglo debe estar previamente ordenado.</Strong>
        </P>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl my-6">
          <h4 className="text-brand-400 font-bold mb-3 flex items-center gap-2">
            <Binary size={16} /> Lógica de Partición
          </h4>
          <p className="text-sm text-slate-300 mb-4">En lugar de revisar posición por posición, la búsqueda binaria evalúa el elemento que se encuentra justo en la <Strong>mitad</Strong> del arreglo:</p>
          <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm ml-2">
            <li>Si el valor buscado es igual al elemento central, terminamos.</li>
            <li>Si el valor buscado es menor que el elemento central, sabemos que debe estar en la mitad izquierda. Descartamos por completo la mitad derecha.</li>
            <li>Si el valor buscado es mayor, sabemos que debe estar en la mitad derecha.</li>
            <li>Repetimos el proceso con la mitad restante hasta encontrarlo o hasta que no queden elementos.</li>
          </ol>
        </div>

        <h3 className="text-xl font-bold text-slate-200 mt-6 mb-4">Ejercicio: Implementación de Búsqueda Binaria</h3>
        <CodeBlock code={CODE_BIN.join('\n')} />

        <Callout variant="tip">
          <Strong>Eficiencia:</Strong> Para un arreglo de un millón (1,000,000) de elementos, la búsqueda secuencial podría necesitar hasta 1,000,000 de comparaciones. ¡La búsqueda binaria encontraría la respuesta en un máximo de <Strong>20 comparaciones</Strong>!
        </Callout>
      </PageSection>

      <PageSection title="Laboratorio: Trazador de Búsquedas">
        <P>Compara paso a paso cómo busca la computadora de forma Secuencial vs. cómo lo hace descartando mitades de forma Binaria.</P>
        <div className="glass-panel p-6 border border-slate-800 rounded-2xl bg-slate-950/45 my-8">
          <div className="flex gap-2 mb-6 border-b border-slate-800 pb-4 overflow-x-auto">
            <button 
              onClick={() => setActiveTab(0)}
              className={`px-4 py-2 text-sm font-bold rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 0 ? 'bg-brand-500 text-slate-950 shadow-[0_0_15px_rgba(0,255,136,0.4)]' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Search size={16} /> Búsqueda Secuencial
            </button>
            <button 
              onClick={() => setActiveTab(1)}
              className={`px-4 py-2 text-sm font-bold rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 1 ? 'bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Binary size={16} /> Búsqueda Binaria
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

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 my-3">
                  {activeTab === 0 ? (
                    <>
                      <div className={`px-3 py-2 rounded-lg border font-mono text-center transition-all ${ramHighlight === 'buscado' ? 'border-cyan-500 bg-cyan-500/10' : 'border-slate-800 bg-slate-900/40'}`}>
                        <span className="text-[9px] text-slate-500 block mb-0.5">valor_buscado</span>
                        <span className="text-base font-bold text-slate-100">{secBuscado}</span>
                      </div>
                      <div className={`px-3 py-2 rounded-lg border font-mono text-center transition-all ${ramHighlight === 'encontrado' ? 'border-amber-500 bg-amber-500/10' : 'border-slate-800 bg-slate-900/40'}`}>
                        <span className="text-[9px] text-slate-500 block mb-0.5">encontrado</span>
                        <span className="text-base font-bold text-slate-100">{secEncontrado ? 'V' : 'F'}</span>
                      </div>
                      <div className={`px-3 py-2 rounded-lg border font-mono text-center transition-all ${ramHighlight === 'posicion' ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-slate-900/40'}`}>
                        <span className="text-[9px] text-slate-500 block mb-0.5">posicion</span>
                        <span className="text-base font-bold text-slate-100">{secPos}</span>
                      </div>
                      <div className={`px-3 py-2 rounded-lg border font-mono text-center transition-all ${ramHighlight === 'i' ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-800 bg-slate-900/40'}`}>
                        <span className="text-[9px] text-slate-500 block mb-0.5">i (índice)</span>
                        <span className="text-base font-bold text-slate-100">{secI ?? '?'}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={`px-3 py-2 rounded-lg border font-mono text-center transition-all ${ramHighlight === 'limites' ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-slate-900/40'}`}>
                        <span className="text-[9px] text-slate-500 block mb-0.5">limite_inf | sup</span>
                        <span className="text-base font-bold text-slate-100">{binInf ?? '?'} | {binSup ?? '?'}</span>
                      </div>
                      <div className={`px-3 py-2 rounded-lg border font-mono text-center transition-all ${ramHighlight === 'centro' ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-800 bg-slate-900/40'}`}>
                        <span className="text-[9px] text-slate-500 block mb-0.5">centro</span>
                        <span className="text-base font-bold text-slate-100">{binCentro ?? '?'}</span>
                      </div>
                      <div className={`px-3 py-2 rounded-lg border font-mono text-center transition-all ${ramHighlight === 'buscado' ? 'border-cyan-500 bg-cyan-500/10' : 'border-slate-800 bg-slate-900/40'}`}>
                        <span className="text-[9px] text-slate-500 block mb-0.5">valor_buscado</span>
                        <span className="text-base font-bold text-slate-100">{binBuscado}</span>
                      </div>
                      <div className={`px-3 py-2 rounded-lg border font-mono text-center transition-all ${ramHighlight === 'encontrado' ? 'border-amber-500 bg-amber-500/10' : 'border-slate-800 bg-slate-900/40'}`}>
                        <span className="text-[9px] text-slate-500 block mb-0.5">encontrado</span>
                        <span className="text-base font-bold text-slate-100">{binEncontrado ? 'V' : 'F'}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Array visualizer */}
              <div className="mt-4 mb-2">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-2 block">Arreglo [edades]</span>
                <div className="flex flex-wrap gap-2">
                  {(activeTab === 0 ? [45, 22, 18, 30, 55] : [5, 10, 15, 22, 30, 35, 45, 50, 60, 75, 80]).map((val, idx) => {
                    let active = false;
                    let isCenter = false;
                    if (activeTab === 0 && secI === idx + 1) active = true;
                    if (activeTab === 1) {
                      if (binCentro === idx + 1) isCenter = true;
                      if (binInf && binSup && (idx + 1) >= binInf && (idx + 1) <= binSup) active = true;
                    }
                    return (
                      <div key={idx} className="flex flex-col items-center">
                        <div className={`w-10 h-10 flex items-center justify-center font-mono text-sm font-bold rounded-lg border-2 transition-all ${
                          isCenter ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400' :
                          active ? 'border-brand-500 bg-brand-500/20 text-brand-300' : 'border-slate-700 bg-slate-800/50 text-slate-500'
                        }`}>
                          {val}
                        </div>
                        <span className="text-[9px] text-slate-500 mt-1">[{idx + 1}]</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-black border border-slate-900 rounded-xl p-4 font-mono text-xs text-slate-200 flex flex-col justify-end min-h-[120px] max-h-[140px] overflow-y-auto mt-3 shadow-inner">
                <div className="text-[9px] uppercase font-bold text-slate-500 mb-1.5 tracking-wider flex items-center gap-1.5 select-none font-sans">
                  <TerminalSquare size={12} /> Pantalla de Terminal
                </div>
                <div className="space-y-1.5 flex-1 flex flex-col justify-end">
                  {terminalLogs.map((log, idx) => (
                    <div key={idx} className="text-slate-100">{log}</div>
                  ))}
                </div>
              </div>

              {showDebug && (
                <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 font-mono text-[10.5px] text-slate-400 flex flex-col justify-end min-h-[110px] max-h-[130px] overflow-y-auto mt-3">
                  <div className="text-[9px] uppercase font-bold text-brand-400/70 mb-1.5 tracking-widest font-sans">
                    🔧 CONSOLA DE DEPURACIÓN (DEBUGGER)
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
                <span className="text-xs font-mono text-slate-400">{activeTab === 0 ? 'busqueda_secuencial.udone' : 'busqueda_binaria.udone'}</span>
              </div>
              <div className="p-4 font-mono text-[10px] sm:text-[11px] space-y-1 overflow-y-auto flex-1 bg-slate-950/20 min-h-[300px]">
                {(activeTab === 0 ? CODE_SEC : CODE_BIN).map((line, idx) => {
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
