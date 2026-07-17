import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

const BOILERPLATES = {
  typescript: '// Escribe tu código JavaScript o TypeScript aquí\nconsole.log("¡Hola desde el laboratorio!");\n',
  cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "¡Hola desde C++!" << endl;\n    return 0;\n}\n',
  c: '#include <stdio.h>\n\nint main() {\n    printf("¡Hola desde C!\\n");\n    return 0;\n}\n'
};

export const CodeEvaluator: React.FC = () => {
  const [language, setLanguage] = useState<'typescript' | 'cpp' | 'c'>('typescript');
  const [code, setCode] = useState<string>(BOILERPLATES.typescript);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Inicializar el Web Worker
    workerRef.current = new Worker(new URL('../../core/workers/codeWorker.ts', import.meta.url), { type: 'module' });

    workerRef.current.onmessage = (e) => {
      setIsRunning(false);
      const { success, output: workerOutput, error } = e.data;
      if (success) {
        setOutput(workerOutput);
      } else {
        setOutput(`Error: ${error}`);
      }
    };

    return () => {
      // Limpiar el worker cuando se desmonte el componente
      workerRef.current?.terminate();
    };
  }, []);

  const runCode = () => {
    setIsRunning(true);
    setOutput('Ejecutando...');
    if (workerRef.current) {
      // Para el worker, C y C++ usan el mismo motor JSCPP bajo 'cpp'
      workerRef.current.postMessage({ code, language: language === 'c' ? 'cpp' : language });
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[70vh] w-full border border-gray-700 rounded-lg overflow-hidden shadow-2xl">
      <div className="w-full md:w-1/2 h-1/2 md:h-full border-b md:border-b-0 md:border-r border-gray-700 flex flex-col bg-[#1e1e1e]">
        <div className="bg-gray-800 px-4 py-2 flex justify-between items-center text-gray-200 text-sm font-medium">
          <div className="flex items-center gap-3">
            <span>Lenguaje:</span>
            <select
              value={language}
              onChange={(e) => {
                const newLang = e.target.value as 'typescript' | 'cpp' | 'c';
                setLanguage(newLang);
                setCode(BOILERPLATES[newLang]);
                setOutput('');
              }}
              className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="typescript">TypeScript / JS</option>
              <option value="cpp">C++ (Local)</option>
              <option value="c">C (Local)</option>
            </select>
          </div>
          <button
            onClick={runCode}
            disabled={isRunning}
            className={`px-4 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-2 ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isRunning ? 'Ejecutando...' : 'Ejecutar'}
          </button>
        </div>
        <div className="flex-1">
          <Editor
            height="100%"
            defaultLanguage="typescript"
            language={language === 'c' ? 'cpp' : language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: 'monospace',
            }}
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col bg-gray-900">
        <div className="bg-gray-800 px-4 py-2 text-gray-200 text-sm font-medium border-b border-gray-700">
          Consola de Salida
        </div>
        <div className="flex-1 p-4 overflow-auto font-mono text-sm text-gray-300 whitespace-pre-wrap">
          {output || 'La salida de tu programa aparecerá aquí...'}
        </div>
      </div>
    </div>
  );
};

export default CodeEvaluator;
