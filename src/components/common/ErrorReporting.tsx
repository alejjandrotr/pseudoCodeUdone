import React, { useState, useEffect } from 'react';
import { AlertCircle, Copy, Mail, MessageCircle, Check, X } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';

export interface ErrorData {
  action: string;
  message: string;
  studentCi: string;
  backupData?: string;
  timestamp: string;
}

interface ErrorReportingProps {
  errorData: ErrorData | null;
  onClearError: () => void;
}

export const ErrorReporting: React.FC<ErrorReportingProps> = ({ errorData, onClearError }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Si el error se limpia externamente, cerramos el modal
  useEffect(() => {
    if (!errorData) {
      setIsModalOpen(false);
    }
  }, [errorData]);

  if (!errorData) return null;

  const buildReportText = () => {
    return `*REPORTE DE ERROR - PARCIAL VIRTUAL*
Cédula: ${errorData.studentCi}
Fecha: ${errorData.timestamp}
Acción Fallida: ${errorData.action}
Mensaje de Error: ${errorData.message}

--- RESPALDO ---
${errorData.backupData || 'Sin respaldo disponible'}
`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildReportText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(buildReportText());
    // Aquí puedes poner el número del profesor si es fijo, o dejarlo abierto para que el alumno elija.
    // Usaremos la API genérica de WhatsApp
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Error Parcial Virtual - ${errorData.studentCi}`);
    const body = encodeURIComponent(buildReportText());
    window.location.href = `mailto:alejjandroclases@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <>
      {/* Toast no invasivo */}
      {!isModalOpen && (
        <div className="fixed bottom-6 right-6 z-40 animate-slide-up flex flex-col gap-2">
          <div className="bg-rose-950 border border-rose-500 rounded-lg shadow-xl overflow-hidden flex max-w-sm">
            <div 
              className="p-4 flex-1 cursor-pointer hover:bg-rose-900/50 transition-colors flex items-start gap-3"
              onClick={() => setIsModalOpen(true)}
            >
              <AlertCircle className="text-rose-400 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="font-bold text-rose-100 text-sm">Nuevo error capturado</h4>
                <p className="text-rose-300 text-xs mt-1">Haz clic aquí para reportarlo al profesor</p>
              </div>
            </div>
            <button 
              onClick={onClearError}
              className="p-3 border-l border-rose-900 text-rose-400 hover:bg-rose-900/80 hover:text-rose-100 transition-colors flex items-center justify-center"
              title="Descartar"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Modal de Reporte */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Reportar Error al Profesor"
        icon={<AlertCircle />}
      >
        <div className="space-y-6">
          <div className="bg-blue-950/30 border border-blue-900/50 p-4 rounded-lg text-sm text-blue-200">
            <strong>Informar a profesor:</strong> Envía esta información para que tengamos los datos en caso de error. Podremos verificar qué falló y resguardar tu progreso.
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-300 text-sm">Detalles del Error:</h4>
            <div className="bg-black/50 p-4 rounded-lg border border-slate-700/50 text-xs font-mono text-slate-300 max-h-40 overflow-y-auto whitespace-pre-wrap">
              {buildReportText()}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-300 text-sm">Opciones de Envío:</h4>
            
            <Button 
              variant="primary" 
              className="w-full justify-center bg-green-600 hover:bg-green-500 border-green-500 text-white" 
              icon={MessageCircle}
              onClick={handleWhatsApp}
            >
              Enviar por WhatsApp
            </Button>
            
            <Button 
              variant="secondary" 
              className="w-full justify-center" 
              icon={Mail}
              onClick={handleEmail}
            >
              Enviar por Correo
            </Button>

            <Button 
              variant="secondary" 
              className="w-full justify-center" 
              icon={copied ? Check : Copy}
              onClick={handleCopy}
            >
              {copied ? '¡Copiado!' : 'Copiar al Portapapeles'}
            </Button>
          </div>

          <div className="pt-2 border-t border-slate-800">
            <Button variant="secondary" className="w-full justify-center" onClick={onClearError}>
              Descartar Reporte
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
