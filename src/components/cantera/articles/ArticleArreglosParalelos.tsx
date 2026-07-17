import React, { useState, useEffect, useRef } from 'react';
import { P, PageSection, Callout, Strong, InlineCode, CodeBlock } from '../ArticlePageComponents';
import { Database, LogIn, LogOut, ArrowRightLeft, Play, Pause, RotateCcw, Box, TerminalSquare, Eye, EyeOff, HelpCircle, ChevronRight, ArrowDownAZ } from 'lucide-react';

export const ArticleArreglosParalelos: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0); // 0 = Paralelo, 1 = Insertar, 2 = Eliminar
  const [isPlaying, setIsPlaying] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [showDebug, setShowDebug] = useState(false);
  const [debugLogs, setDebugLogs] = useState<string[]>(['> Laboratorio listo.']);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [ramHighlight, setRamHighlight] = useState<string | null>(null);

  // States
  const [nombres, setNombres] = useState<(string | null)[]>([null, null, null]);
  const [notas, setNotas] = useState<(number | null)[]>([null, null, null]);
  
  const [datos, setDatos] = useState<(number | null)[]>([null, null, null, null, null, null]);
  const [ocupados, setOcupados] = useState<number | null>(null);
  const [posVar, setPosVar] = useState<number | null>(null);
  const [nuevoValor, setNuevoValor] = useState<number | null>(null);
  const [iVar, setIVar] = useState<number | null>(null);

  const stateRef = useRef({ activeTab, simStep, isPlaying, nombres, notas, datos, ocupados, posVar, nuevoValor, iVar });
  useEffect(() => {
    stateRef.current = { activeTab, simStep, isPlaying, nombres, notas, datos, ocupados, posVar, nuevoValor, iVar };
  }, [activeTab, simStep, isPlaying, nombres, notas, datos, ocupados, posVar, nuevoValor, iVar]);

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
    
    setNombres([null, null, null]);
    setNotas([null, null, null]);
    
    if (activeTab === 1) {
      setDatos([10, 20, 30, 40, null, null]);
      setOcupados(4);
    } else if (activeTab === 2) {
      setDatos([10, 15, 20, 30, 40, null]);
      setOcupados(5);
    } else {
      setDatos([null, null, null, null, null, null]);
      setOcupados(null);
    }
    setPosVar(null);
    setNuevoValor(null);
    setIVar(null);
  };

  useEffect(() => { resetSimulation(); }, [activeTab]);

  const advanceSimulation = () => {
    const state = stateRef.current;
    
    if (state.activeTab === 0) { // Paralelos
      switch (state.simStep) {
        case 0:
          setActiveLine(9);
          const newN1 = [...state.nombres]; newN1[0] = "Ana";
          setNombres(newN1);
          setRamHighlight('nombres_1');
          setDebugLogs(prev => [...prev, '> nombres[1] <- "Ana"']);
          setSimStep(1); break;
        case 1:
          setActiveLine(10);
          const newNo1 = [...state.notas]; newNo1[0] = 18.5;
          setNotas(newNo1);
          setRamHighlight('notas_1');
          setDebugLogs(prev => [...prev, '> notas[1] <- 18.5']);
          setSimStep(2); break;
        case 2:
          setActiveLine(12);
          const newN2 = [...state.nombres]; newN2[1] = "Luis";
          setNombres(newN2);
          setRamHighlight('nombres_2');
          setDebugLogs(prev => [...prev, '> nombres[2] <- "Luis"']);
          setSimStep(3); break;
        case 3:
          setActiveLine(13);
          const newNo2 = [...state.notas]; newNo2[1] = 14.0;
          setNotas(newNo2);
          setRamHighlight('notas_2');
          setDebugLogs(prev => [...prev, '> notas[2] <- 14.0']);
          setSimStep(4); break;
        case 4:
          setActiveLine(15);
          const newN3 = [...state.nombres]; newN3[2] = "Carlos";
          setNombres(newN3);
          setRamHighlight('nombres_3');
          setDebugLogs(prev => [...prev, '> nombres[3] <- "Carlos"']);
          setSimStep(5); break;
        case 5:
          setActiveLine(16);
          const newNo3 = [...state.notas]; newNo3[2] = 19.5;
          setNotas(newNo3);
          setRamHighlight('notas_3');
          setDebugLogs(prev => [...prev, '> notas[3] <- 19.5']);
          setSimStep(6); break;
        case 6:
          setActiveLine(18);
          setTerminalLogs(prev => [...prev, "Listado de Estudiantes y sus Calificaciones:"]);
          setSimStep(7); break;
        case 7:
          setActiveLine(19);
          const nextI = state.iVar === null ? 1 : state.iVar + 1;
          if (nextI > 3) {
            setSimStep(10);
          } else {
            setIVar(nextI);
            setRamHighlight(`i`);
            setSimStep(8);
          }
          break;
        case 8:
          setActiveLine(20);
          setTerminalLogs(prev => [...prev, `Estudiante: ${state.nombres[(state.iVar ?? 1)-1]} - Nota: ${state.notas[(state.iVar ?? 1)-1]}`]);
          setRamHighlight('ambos_' + state.iVar);
          setSimStep(9);
          break;
        case 9:
          setActiveLine(21);
          setSimStep(7);
          break;
        case 10:
          setActiveLine(22);
          setDebugLogs(prev => [...prev, '> Fin del algoritmo']);
          setIsPlaying(false);
          setSimStep(11);
          break;
      }
    } else if (state.activeTab === 1) { // Insertar
      switch (state.simStep) {
        case 0:
          setActiveLine(13);
          setPosVar(2);
          setRamHighlight('pos');
          setDebugLogs(prev => [...prev, '> pos_insertar <- 2']);
          setSimStep(1); break;
        case 1:
          setActiveLine(14);
          setNuevoValor(15);
          setRamHighlight('nuevo');
          setDebugLogs(prev => [...prev, '> nuevo_valor <- 15']);
          setSimStep(2); break;
        case 2:
          setActiveLine(18);
          const i1 = state.iVar === null ? (state.ocupados ?? 4) : state.iVar - 1;
          if (i1 < (state.posVar ?? 2)) {
            setSimStep(5);
          } else {
            setIVar(i1);
            setRamHighlight(`i`);
            setDebugLogs(prev => [...prev, `> Para i <- ${i1}`]);
            setSimStep(3);
          }
          break;
        case 3:
          setActiveLine(19);
          const d1 = [...state.datos];
          d1[(state.iVar ?? 4)] = d1[(state.iVar ?? 4) - 1]; // datos[i+1] <- datos[i]
          setDatos(d1);
          setRamHighlight(`datos_${state.iVar}`);
          setDebugLogs(prev => [...prev, `> datos[${(state.iVar ?? 4)+1}] <- datos[${state.iVar}]`]);
          setSimStep(4);
          break;
        case 4:
          setActiveLine(20);
          setSimStep(2);
          break;
        case 5:
          setActiveLine(23);
          const d2 = [...state.datos];
          d2[(state.posVar ?? 2) - 1] = state.nuevoValor;
          setDatos(d2);
          setRamHighlight(`datos_${(state.posVar ?? 2) - 1}`);
          setDebugLogs(prev => [...prev, `> datos[${state.posVar}] <- ${state.nuevoValor}`]);
          setSimStep(6);
          break;
        case 6:
          setActiveLine(26);
          setOcupados((state.ocupados ?? 4) + 1);
          setRamHighlight('ocupados');
          setDebugLogs(prev => [...prev, `> ocupados <- ocupados + 1 (${(state.ocupados ?? 4) + 1})`]);
          setSimStep(7);
          break;
        case 7:
          setActiveLine(29);
          setDebugLogs(prev => [...prev, '> Fin del algoritmo']);
          setIsPlaying(false);
          setSimStep(8);
          break;
      }
    } else if (state.activeTab === 2) { // Eliminar
      switch (state.simStep) {
        case 0:
          setActiveLine(13);
          setPosVar(2);
          setRamHighlight('pos');
          setDebugLogs(prev => [...prev, '> pos_eliminar <- 2']);
          setSimStep(1); break;
        case 1:
          setActiveLine(16);
          const i2 = state.iVar === null ? (state.posVar ?? 2) : state.iVar + 1;
          if (i2 > (state.ocupados ?? 5) - 1) {
            setSimStep(4);
          } else {
            setIVar(i2);
            setRamHighlight(`i`);
            setDebugLogs(prev => [...prev, `> Para i <- ${i2}`]);
            setSimStep(2);
          }
          break;
        case 2:
          setActiveLine(17);
          const d3 = [...state.datos];
          d3[(state.iVar ?? 2) - 1] = d3[(state.iVar ?? 2)]; // datos[i] <- datos[i+1]
          setDatos(d3);
          setRamHighlight(`datos_${(state.iVar ?? 2) - 1}`);
          setDebugLogs(prev => [...prev, `> datos[${state.iVar}] <- datos[${(state.iVar ?? 2)+1}]`]);
          setSimStep(3);
          break;
        case 3:
          setActiveLine(18);
          setSimStep(1);
          break;
        case 4:
          setActiveLine(21);
          setOcupados((state.ocupados ?? 5) - 1);
          setRamHighlight('ocupados');
          setDebugLogs(prev => [...prev, `> ocupados <- ocupados - 1 (${(state.ocupados ?? 5) - 1})`]);
          setSimStep(5);
          break;
        case 5:
          setActiveLine(24);
          setDebugLogs(prev => [...prev, '> Fin del algoritmo']);
          setIsPlaying(false);
          setSimStep(6);
          break;
      }
    }
  };

  const startSimulation = () => {
    if (simStep >= 6 && activeTab === 2) resetSimulation(), setIsPlaying(true);
    else if (simStep >= 8 && activeTab === 1) resetSimulation(), setIsPlaying(true);
    else if (simStep >= 11 && activeTab === 0) resetSimulation(), setIsPlaying(true);
    else setIsPlaying(!isPlaying);
  };

  const CODE_PARALELOS = [
    'Algoritmo ArreglosParalelos',
    'Variables:',
    '    nombres: arreglo [3] de Cadena',
    '    notas: arreglo [3] de Real',
    '    i: Entero',
    'Inicio',
    '    // Llenado paralelo',
    '    nombres[1] <- "Ana"',
    '    notas[1] <- 18.5',
    '',
    '    nombres[2] <- "Luis"',
    '    notas[2] <- 14.0',
    '',
    '    nombres[3] <- "Carlos"',
    '    notas[3] <- 19.5',
    '',
    '    Escribir "Listado de Estudiantes y sus Calificaciones:"',
    '    Para i = 1 Hasta 3 Inc 1',
    '        Escribir "Estudiante: ", nombres[i], " - Nota: ", notas[i]',
    '    Fin Para',
    'Fin'
  ];

  const CODE_INSERT = [
    'Algoritmo InsertarEnArreglo',
    'Variables: datos: arreglo [6] de Entero',
    '    i, pos_insertar, nuevo_valor, ocupados: Entero',
    'Inicio',
    '    // (Arreglo pre-llenado con 4 datos)',
    '    // datos = [10, 20, 30, 40, Vacío, Vacío]',
    '    ocupados <- 4',
    '',
    '    pos_insertar <- 2',
    '    nuevo_valor <- 15',
    '',
    '    // 1. Desplazamiento hacia la derecha (desde el final)',
    '    Para i = ocupados Hasta pos_insertar Dec 1',
    '        datos[i + 1] <- datos[i]',
    '    Fin Para',
    '',
    '    // 2. Insertamos el nuevo valor',
    '    datos[pos_insertar] <- nuevo_valor',
    '    ',
    '    // 3. Aumentamos cantidad de ocupados',
    '    ocupados <- ocupados + 1',
    'Fin'
  ];

  const CODE_DELETE = [
    'Algoritmo EliminarDeArreglo',
    'Variables: datos: arreglo [6] de Entero',
    '    i, pos_eliminar, ocupados: Entero',
    'Inicio',
    '    // (Arreglo pre-llenado con 5 datos)',
    '    // datos = [10, 15, 20, 30, 40, Vacío]',
    '    ocupados <- 5',
    '',
    '    pos_eliminar <- 2 // Queremos eliminar el 15',
    '',
    '    // 1. Desplazamiento hacia la izquierda',
    '    Para i <- pos_eliminar Hasta ocupados - 1 Con Paso 1 Hacer',
    '        datos[i] <- datos[i + 1]',
    '    Fin Para',
    '',
    '    // 2. Disminuimos ocupados',
    '    ocupados <- ocupados - 1',
    'Fin'
  ];

  return (
    <div>
      <PageSection title="1. Arreglos Paralelos">
        <P>
          En el mundo real, los datos suelen estar estrechamente relacionados. Por ejemplo, un estudiante tiene un nombre, una edad y una nota. Si aún no conocemos estructuras avanzadas (como <Strong>Registros</Strong> u <Strong>Objetos</Strong>), la forma estándar de manejar esta pequeña "base de datos" en programación estructurada es utilizando <Strong>Arreglos Paralelos</Strong>.
        </P>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl my-6">
          <h4 className="text-brand-400 font-bold mb-3 flex items-center gap-2">
            <Database size={16} /> ¿Qué son?
          </h4>
          <p className="text-sm text-slate-300">
            Son dos o más arreglos del <Strong>mismo tamaño</Strong> que utilizan el <Strong>mismo índice</Strong> para relacionar la información de forma lógica.
          </p>
          <div className="bg-black/50 p-4 rounded-lg font-mono text-[11px] text-slate-400 mt-3 flex items-center justify-center gap-4">
            <div className="text-center">
              <div className="text-brand-300 font-bold mb-2">nombres[3]</div>
              <div className="border border-slate-700 bg-slate-800 rounded px-3 py-1 text-slate-200">"Carlos"</div>
            </div>
            <ArrowRightLeft size={16} className="text-slate-600" />
            <div className="text-center">
              <div className="text-emerald-400 font-bold mb-2">notas[3]</div>
              <div className="border border-slate-700 bg-slate-800 rounded px-3 py-1 text-slate-200">19.5</div>
            </div>
          </div>
          <p className="text-xs text-slate-400 text-center mt-3 italic">
            Entendemos lógicamente que la nota almacenada en la casilla notas[3] le pertenece exactamente al estudiante cuyo nombre está guardado en nombres[3].
          </p>
        </div>

        <h3 className="text-xl font-bold text-slate-200 mt-6 mb-4">Ejercicio: Imprimir datos de Arreglos Paralelos</h3>
        <CodeBlock code={CODE_PARALELOS.join('\n')} />

        <Callout variant="tip">
          <Strong>Ordenamiento Paralelo:</Strong> Si necesitas ordenar a los estudiantes por nota (por ejemplo, con el Método de la Burbuja para que queden de mayor a menor), al momento de intercambiar <InlineCode>notas[j]</InlineCode> con <InlineCode>notas[j+1]</InlineCode>, <Strong>también debes intercambiar obligatoriamente al mismo tiempo</Strong> los valores de <InlineCode>nombres[j]</InlineCode> con <InlineCode>nombres[j+1]</InlineCode>. De lo contrario, ordenarías las notas, pero se las asignarías a las personas equivocadas.
        </Callout>
      </PageSection>

      <PageSection title="2. Operaciones de Desplazamiento">
        <P>
          Hasta ahora hemos asignado o reemplazado (sobrescrito) valores fijos en las posiciones de los arreglos. Pero, ¿qué pasa si queremos <Strong>Insertar</Strong> un elemento nuevo justo en el medio sin borrar el que ya existe, o <Strong>Eliminar</Strong> un dato y que no quede una casilla nula dividiendo la información? Para esto usamos <Strong>desplazamientos de memoria</Strong>.
        </P>

        <h3 className="text-xl font-bold text-slate-200 mt-8 mb-4 flex items-center gap-2">
          <LogIn size={20} className="text-cyan-400" /> 2.1. Inserción de un Elemento
        </h3>
        <P>
          Para insertar un dato en una posición específica $P$, primero debemos "hacerle espacio". Esto significa mover todos los elementos desde la última posición ocupada hasta $P$ un paso hacia la derecha.
        </P>
        <P className="text-sm text-slate-400 italic">
          (Nota: Para poder insertar, el arreglo físico no debe estar completamente lleno, o el último dato se perderá o el programa fallará por desbordamiento).
        </P>

        <div className="mt-4">
          <CodeBlock code={CODE_INSERT.join('\n')} />
        </div>

        <h3 className="text-xl font-bold text-slate-200 mt-8 mb-4 flex items-center gap-2">
          <LogOut size={20} className="text-rose-400" /> 2.2. Eliminación de un Elemento
        </h3>
        <P>
          Para eliminar un dato en una posición $P$, hacemos el proceso inverso: movemos todos los elementos que están a la derecha de $P$ un paso hacia la izquierda, sobrescribiendo o "pisando" el valor que queremos eliminar.
        </P>

        <div className="mt-4">
          <CodeBlock code={CODE_DELETE.join('\n')} />
        </div>
      </PageSection>

      {/* --- LABORATORIO INTERACTIVO --- */}
      <PageSection title="Laboratorio: Arreglos Paralelos y Desplazamientos">
        <P>Simula cómo se relacionan los arreglos en paralelo y cómo la computadora mueve los elementos uno a uno para insertar o eliminar datos.</P>
        
        <div className="glass-panel p-6 border border-slate-800 rounded-2xl bg-slate-950/45 my-8">
          <div className="flex gap-2 mb-6 border-b border-slate-800 pb-4 overflow-x-auto">
            <button onClick={() => setActiveTab(0)} className={`px-4 py-2 text-sm font-bold rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === 0 ? 'bg-brand-500 text-slate-950 shadow-[0_0_15px_rgba(0,255,136,0.4)]' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}>
              <Database size={16} /> Paralelos
            </button>
            <button onClick={() => setActiveTab(1)} className={`px-4 py-2 text-sm font-bold rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === 1 ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}>
              <LogIn size={16} /> Inserción
            </button>
            <button onClick={() => setActiveTab(2)} className={`px-4 py-2 text-sm font-bold rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === 2 ? 'bg-rose-500 text-slate-950 shadow-[0_0_15px_rgba(244,63,94,0.4)]' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}>
              <LogOut size={16} /> Eliminación
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
                    <span className="text-base font-bold text-slate-100">{iVar ?? '?'}</span>
                  </div>
                  {activeTab !== 0 && (
                    <>
                      <div className={`px-3 py-2 rounded-lg border font-mono text-center transition-all ${ramHighlight === 'ocupados' ? 'border-amber-500 bg-amber-500/10' : 'border-slate-800 bg-slate-900/40'}`}>
                        <span className="text-[9px] text-slate-500 block mb-0.5">ocupados</span>
                        <span className="text-base font-bold text-slate-100">{ocupados ?? '?'}</span>
                      </div>
                      <div className={`px-3 py-2 rounded-lg border font-mono text-center transition-all ${ramHighlight === 'pos' ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-slate-900/40'}`}>
                        <span className="text-[9px] text-slate-500 block mb-0.5">{activeTab === 1 ? 'pos_insertar' : 'pos_eliminar'}</span>
                        <span className="text-base font-bold text-slate-100">{posVar ?? '?'}</span>
                      </div>
                      {activeTab === 1 && (
                        <div className={`px-3 py-2 rounded-lg border font-mono text-center transition-all ${ramHighlight === 'nuevo' ? 'border-pink-500 bg-pink-500/10' : 'border-slate-800 bg-slate-900/40'}`}>
                          <span className="text-[9px] text-slate-500 block mb-0.5">nuevo_valor</span>
                          <span className="text-base font-bold text-slate-100">{nuevoValor ?? '?'}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="mt-4 mb-2">
                {activeTab === 0 ? (
                  <>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-2 block">Arreglos [nombres] y [notas]</span>
                    <div className="flex gap-4 items-start">
                      <div className="flex flex-col gap-2">
                        {nombres.map((val, idx) => (
                          <div key={'n'+idx} className="flex items-center gap-2">
                            <span className="text-[9px] text-slate-500 font-mono">[{idx + 1}]</span>
                            <div className={`w-20 h-8 flex items-center justify-center font-mono text-xs rounded border transition-all ${
                              ramHighlight === 'nombres_'+(idx+1) || ramHighlight === 'ambos_'+(idx+1) ? 'border-brand-500 bg-brand-500/20 text-brand-300 font-bold' : val ? 'border-slate-600 bg-slate-800 text-slate-300' : 'border-slate-800 bg-slate-900/50 text-slate-500'
                            }`}>
                              {val ? `"${val}"` : 'null'}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col gap-2 mt-2">
                        <ArrowRightLeft size={16} className="text-slate-600 my-2" />
                        <ArrowRightLeft size={16} className="text-slate-600 my-2" />
                        <ArrowRightLeft size={16} className="text-slate-600 my-2" />
                      </div>
                      <div className="flex flex-col gap-2">
                        {notas.map((val, idx) => (
                          <div key={'no'+idx} className="flex items-center gap-2">
                            <div className={`w-16 h-8 flex items-center justify-center font-mono text-xs rounded border transition-all ${
                              ramHighlight === 'notas_'+(idx+1) || ramHighlight === 'ambos_'+(idx+1) ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold' : val ? 'border-slate-600 bg-slate-800 text-slate-300' : 'border-slate-800 bg-slate-900/50 text-slate-500'
                            }`}>
                              {val ?? 'null'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-2 block">Arreglo [datos]</span>
                    <div className="flex flex-wrap gap-2">
                      {datos.map((val, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <div className={`w-12 h-12 flex items-center justify-center font-mono text-sm rounded-lg border-2 transition-all ${
                            ramHighlight === `datos_${idx}` ? (activeTab === 1 ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300 scale-110 font-bold' : 'border-rose-500 bg-rose-500/20 text-rose-300 scale-110 font-bold') :
                            val !== null ? 'border-slate-600 bg-slate-800 text-slate-300' : 'border-slate-800 bg-slate-900 text-slate-600'
                          }`}>
                            {val !== null ? val : 'vacío'}
                          </div>
                          <span className="text-[9px] text-slate-500 mt-1 font-bold">[{idx + 1}]</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {activeTab === 0 && (
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
                <span className="text-xs font-mono text-slate-400">{activeTab === 0 ? 'paralelos.udone' : activeTab === 1 ? 'insertar.udone' : 'eliminar.udone'}</span>
              </div>
              <div className="p-4 font-mono text-[10px] sm:text-[11px] space-y-1 overflow-y-auto flex-1 bg-slate-950/20 min-h-[300px]">
                {(activeTab === 0 ? CODE_PARALELOS : activeTab === 1 ? CODE_INSERT : CODE_DELETE).map((line, idx) => {
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
  );
};
