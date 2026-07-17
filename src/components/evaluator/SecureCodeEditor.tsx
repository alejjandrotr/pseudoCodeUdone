import React, { useRef, useState, useEffect } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';

interface SecureCodeEditorProps {
  editorId: string;
  code: string;
  language: string;
  onChange: (value: string) => void;
  onCopyPasteDetected: () => void;
  readOnlyLines: number[]; // Líneas que no se pueden editar (ej. 1 al 4, y 10 al 15)
}

export const SecureCodeEditor: React.FC<SecureCodeEditorProps> = ({ 
  editorId,
  code, 
  language, 
  onChange, 
  onCopyPasteDetected,
  readOnlyLines 
}) => {
  const monaco = useMonaco();
  const editorRef = useRef<any>(null);

  const firstZoneEndLineRef = useRef<number>(-1);
  const secondZoneStartLineRef = useRef<number>(-1);

  // Inicializar límites al cambiar el código inicial
  useEffect(() => {
    if (!code) return;
    const lines = code.split('\n');
    let firstEnd = -1;
    let secondStart = -1;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('// ----------------------')) {
        firstEnd = i + 1;
        break;
      }
    }
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].includes('// --- ZONA PROTEGIDA ---')) {
        secondStart = i + 1;
        break;
      }
    }

    firstZoneEndLineRef.current = firstEnd;
    secondZoneStartLineRef.current = secondStart;
  }, [code]);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;

    // Validar ediciones para hacer readOnly ciertas líneas dinámicamente
    editor.onDidChangeModelContent((e: any) => {
      let invalidEdit = false;
      let lineDelta = 0;

      for (const change of e.changes) {
        const startLine = change.range.startLineNumber;
        const endLine = change.range.endLineNumber;
        
        // Si el cambio toca la zona superior protegida o la zona inferior protegida
        if (startLine <= firstZoneEndLineRef.current || endLine >= secondZoneStartLineRef.current) {
          invalidEdit = true;
          break;
        }

        // Calcular desplazamiento de la zona inferior si es una edición válida
        const addedLines = change.text.split('\n').length - 1;
        const removedLines = endLine - startLine;
        lineDelta += (addedLines - removedLines);
      }

      if (invalidEdit) {
        // Bloquear y revertir
        editor.trigger('keyboard', 'undo', null);
      } else {
        // Desplazar el límite inferior si se agregaron/quitaron líneas
        secondZoneStartLineRef.current += lineDelta;
        onChange(editor.getValue());
      }
    });
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    onCopyPasteDetected();
    alert("¡Advertencia! Pegar código está prohibido en esta evaluación.");
  };

  const handleCopy = (e: React.ClipboardEvent) => {
    e.preventDefault();
    onCopyPasteDetected();
    alert("¡Advertencia! Copiar código está prohibido.");
  };

  return (
    <div className="w-full h-full relative" onCopy={handleCopy} onPaste={handlePaste} onCut={handleCopy}>
      <Editor
        path={editorId}
        height="100%"
        language={language}
        theme="vs-dark"
        value={code}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          contextmenu: false, // Bloquear click derecho
          quickSuggestions: false, // Sin autocompletado
          snippetSuggestions: 'none',
        }}
      />
    </div>
  );
};
