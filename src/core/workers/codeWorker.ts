/// <reference lib="webworker" />
import JSCPP from 'JSCPP';
import { transform } from 'sucrase';

self.addEventListener('message', async (e) => {
  const { code, language, action, tests } = e.data;
  
  if (action === 'run_tests' && language === 'cpp') {
    // MODO EVALUACIÓN (Fase 3)
    let passed = 0;
    const results = [];
    
    for (let i = 0; i < tests.length; i++) {
      const test = tests[i];
      let output = '';
      let errorMsg = null;
      
      try {
        // En JSCPP el input se pasa como string (el std::cin se alimentará de esto)
        JSCPP.run(code, test.input || '', {
          stdio: {
            write: (s: string) => {
              output += s;
            }
          }
        });
      } catch (error: any) {
        errorMsg = error.message || String(error);
      }
      
      const cleanOutput = output.trim();
      const cleanExpected = (test.expected_output || '').trim();
      
      if (!errorMsg && cleanOutput === cleanExpected) {
        passed++;
        results.push({ testIndex: i, passed: true });
      } else {
        results.push({ testIndex: i, passed: false, output: cleanOutput, error: errorMsg });
      }
    }
    
    self.postMessage({ success: true, passed, total: tests.length, results });
    return;
  }

  if (action === 'run_tests' && language === 'typescript') {
    let passed = 0;
    const results = [];
    
    // 1. Transpilar TypeScript a JavaScript usando Sucrase
    let jsCode = '';
    try {
      jsCode = transform(code, { transforms: ['typescript'] }).code;
    } catch (error: any) {
      self.postMessage({ success: false, error: "Error de Sintaxis TS: " + error.message });
      return;
    }

    // 2. Correr las pruebas
    for (let i = 0; i < tests.length; i++) {
      const test = tests[i];
      let output = '';
      let errorMsg = null;
      
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        const msg = args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' ');
        output += msg + '\n';
      };

      try {
        // En los tests inyectamos el input directamente llamando a funciones, 
        // pero la forma más segura aquí es simplemente ejecutar y si es una prueba de retorno,
        // necesitamos que el código de la prueba lo capture.
        // El input se pasa en una variable global para que el boilerplate lo lea.
        
        // NUEVA ESTRATEGIA: Pasar el input en una variable global para que el boilerplate lo lea
        (self as any).__INPUT__ = test.input;
        
        const func = new Function(jsCode);
        func();
      } catch (error: any) {
        errorMsg = error.message || String(error);
      } finally {
        console.log = originalConsoleLog;
      }
      
      const cleanOutput = output.trim();
      const cleanExpected = (test.expected_output || '').trim();
      
      if (!errorMsg && cleanOutput === cleanExpected) {
        passed++;
        results.push({ testIndex: i, passed: true });
      } else {
        results.push({ testIndex: i, passed: false, output: cleanOutput, error: errorMsg });
      }
    }
    
    self.postMessage({ success: true, passed, total: tests.length, results });
    return;
  }
  
  // MODO LABORATORIO NORMAL (Fase 1 y 2)
  if (language === 'javascript' || language === 'typescript') {
    let output = '';
    
    // Sobrescribir console.log para capturar la salida
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      const msg = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      output += msg + '\n';
    };

    try {
      const func = new Function(code);
      func();
      
      self.postMessage({ success: true, output });
    } catch (error: any) {
      self.postMessage({ success: false, error: error.message });
    } finally {
      console.log = originalConsoleLog;
    }
  } else if (language === 'cpp') {
    try {
      let output = '';
      
      // JSCPP.run(code, input, config)
      JSCPP.run(code, '', {
        stdio: {
          write: (s: string) => {
            output += s;
          }
        }
      });
      
      self.postMessage({ success: true, output });
    } catch (error: any) {
      self.postMessage({ success: false, error: error.message || String(error) });
    }
  } else {
    self.postMessage({ success: false, error: 'Lenguaje no soportado.' });
  }
});
