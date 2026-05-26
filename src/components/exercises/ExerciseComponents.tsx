import React, { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";

interface LanguageTabProps {
  label: string;
  active: boolean;
  onClick: () => void;
  icon?: React.ElementType;
}

export const LanguageTab: React.FC<LanguageTabProps> = ({ 
  label, 
  active, 
  onClick, 
  icon: Icon 
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2 ${
      active
        ? "border-brand-500 text-brand-400 bg-brand-500/10"
        : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
    }`}
  >
    {Icon && <Icon size={16} />}
    {label}
  </button>
);

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState("");
  const [modelName, setModelName] = useState("gemini-2.5-flash");

  useEffect(() => {
    if (isOpen) {
      setApiKey(localStorage.getItem("gemini_api_key") || "");
      setModelName(localStorage.getItem("gemini_model") || "gemini-2.5-flash");
    }
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem("gemini_api_key", apiKey.trim());
    localStorage.setItem("gemini_model", modelName);
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Configuración IA" 
      icon={<Settings size={20} />}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Modelo de Gemini
          </label>
          <select
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all mb-4"
          >
            <option value="gemini-2.5-flash">Gemini 2.5 Flash (Recomendado/Rápido y Preciso)</option>
            <option value="gemini-2.5-pro">Gemini 2.5 Pro (Máxima Inteligencia)</option>
            <option value="gemini-2.0-flash">Gemini 2.0 Flash (Veloz/Estable)</option>
            <option value="gemini-1.5-flash">Gemini 1.5 Flash (Legado Rápido)</option>
            <option value="gemini-1.5-pro">Gemini 1.5 Pro (Legado Potente)</option>
          </select>
          
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-slate-300">
              Gemini API Key
            </label>
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1 underline"
            >
              Obtener Token Aquí
            </a>
          </div>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
          />
          <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 mt-3">
            <p className="text-xs text-slate-400 mb-2">
              <strong>¿Cómo conseguir el token?</strong><br/>
              1. Haz clic en el enlace "Obtener Token Aquí".<br/>
              2. Inicia sesión con tu cuenta de Google.<br/>
              3. Haz clic en "Create API key" en Google AI Studio.<br/>
              4. Copia la clave generada y pégala aquí.
            </p>
            <p className="text-xs text-slate-500 italic">
              Esta clave se guarda localmente en tu navegador y solo se usa para corregir tus ejercicios.
            </p>
          </div>
        </div>
        <Button onClick={handleSave} className="w-full">
          Guardar Configuración
        </Button>
      </div>
    </Modal>
  );
};
