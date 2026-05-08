import React, { useState } from 'react';
import { CheckCircle, XCircle, FlaskConical, ChevronDown, ChevronUp } from 'lucide-react';

interface ExerciseItem {
  id: number;
  label: string;
  expression: string;
  solution: string;
}

interface IdentifierRow {
  identifier: string;
  valid: boolean;
  reason: string;
}

const VALUES_HEADER = 'A = 15, B = 4, C = 10, D = Verdadero, E = Falso';

const NAMING_EXERCISES: { id: number; scenario: string; example: string }[] = [
  { id: 1, scenario: 'Una variable para almacenar el nombre de un país.', example: 'nombrePais' },
  { id: 2, scenario: 'Un acumulador para los goles anotados por el equipo local.', example: 'golesLocal' },
  { id: 3, scenario: 'Una variable que indique si la puerta de una casa está abierta o cerrada (Lógico).', example: 'puertaAbierta' },
  { id: 4, scenario: 'El precio final de un producto después de aplicar impuestos.', example: 'precioFinal' },
  { id: 5, scenario: 'Una constante para el valor máximo de intentos de una contraseña.', example: 'MAX_INTENTOS' },
];

const IDENTIFIER_ROWS: IdentifierRow[] = [
  { identifier: '1er_Puntaje', valid: false, reason: 'Empieza por un número. Debe ser puntaje_1 o primerPuntaje.' },
  { identifier: 'nombre estudiante', valid: false, reason: 'Contiene un espacio en blanco. Debe ser nombre_estudiante.' },
  { identifier: 'saldo-cuenta', valid: false, reason: 'El guion medio (-) es un operador de resta. Usa _.' },
  { identifier: 'calcularPromedio', valid: true, reason: 'Válido. Usa la nomenclatura CamelCase.' },
  { identifier: '¿activo?', valid: false, reason: 'Contiene caracteres especiales (¿, ?). Solo se permite el piso.' },
  { identifier: 'IVA%', valid: false, reason: 'El símbolo % no está permitido en identificadores.' },
  { identifier: 'TOTAL_VENTAS', valid: true, reason: 'Válido. Común para constantes.' },
];

const MATH_EXERCISES: ExerciseItem[] = [
  { id: 1, label: 'Aritmética básica', expression: 'A + B * 2', solution: '23' },
  { id: 2, label: 'Uso de DIV', expression: 'A DIV B', solution: '3' },
  { id: 3, label: 'Uso de MOD', expression: 'A MOD B', solution: '3' },
  { id: 4, label: 'Prioridad de paréntesis', expression: '(A + C) DIV B', solution: '6' },
  { id: 5, label: 'Comparación simple', expression: 'A <> (B * 3 + 3)', solution: 'Falso — 15 no es diferente de 15' },
  { id: 6, label: 'Lógica con Y', expression: '(A > C) Y D', solution: 'Verdadero' },
  { id: 7, label: 'Lógica con O', expression: '(B > A) O E', solution: 'Falso' },
  { id: 8, label: 'Combinada', expression: '(A MOD 2 = 0) O (C DIV 2 = 5)', solution: 'Verdadero' },
  { id: 9, label: 'Negación', expression: 'NO (D Y E)', solution: 'Verdadero' },
  { id: 10, label: 'Desafío Final', expression: '((A + B) > C) Y (NO E)', solution: 'Verdadero' },
];

const RevealButton: React.FC<{ solution: string }> = ({ solution }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 ${
          open
            ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
            : 'bg-slate-800/50 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 border border-slate-700/50'
        }`}
      >
        {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        {open ? 'Ocultar solución' : 'Ver Solución'}
      </button>
      {open && (
        <div className="mt-2 px-3 py-2 bg-brand-500/10 border border-brand-500/20 rounded-lg text-brand-200 text-sm font-mono animate-slide-up">
          → {solution}
        </div>
      )}
    </div>
  );
};

export const ExerciseLabView: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Intro */}
      <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/40 text-slate-300 text-sm leading-relaxed">
        Este artículo está diseñado para ser tu <strong className="text-slate-100">laboratorio de práctica interactivo</strong>.
        Haz clic en <strong className="text-brand-300">"Ver Solución"</strong> para revelar la respuesta de cada ejercicio.
      </div>

      {/* Section 1: Naming Variables */}
      <section>
        <h2 className="text-xl font-bold text-brand-200 mb-1 flex items-center gap-2">
          <FlaskConical size={18} className="text-brand-400" />
          Sección 1: Nombrando Variables
        </h2>
        <p className="text-slate-400 text-sm mb-4">
          Propón un nombre de variable que cumpla con las reglas: empezar con letra, sin espacios, usar solo <code className="bg-slate-800 px-1 rounded text-brand-200">_</code> o CamelCase y ser descriptivo.
        </p>
        <div className="space-y-3">
          {NAMING_EXERCISES.map((ex) => (
            <div key={ex.id} className="p-4 rounded-xl bg-slate-800/20 border border-slate-700/40">
              <p className="text-slate-300 text-sm">
                <span className="text-brand-400 font-bold mr-2">{ex.id}.</span>
                {ex.scenario}
              </p>
              <RevealButton solution={`Ejemplo válido: ${ex.example}`} />
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Identifier Validation Table */}
      <section>
        <h2 className="text-xl font-bold text-brand-200 mb-1">Sección 2: Identificación de Errores</h2>
        <p className="text-slate-400 text-sm mb-4">
          Analiza cuáles de los siguientes identificadores son válidos y por qué.
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-700/50">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                <th className="text-left px-4 py-3">Identificador</th>
                <th className="text-center px-4 py-3">¿Válido?</th>
                <th className="text-left px-4 py-3">Razón / Corrección</th>
              </tr>
            </thead>
            <tbody>
              {IDENTIFIER_ROWS.map((row, i) => (
                <tr
                  key={i}
                  className={`border-t border-slate-800/50 ${
                    row.valid ? 'hover:bg-emerald-500/5' : 'hover:bg-red-500/5'
                  } transition-colors`}
                >
                  <td className="px-4 py-3 font-mono text-brand-100">{row.identifier}</td>
                  <td className="px-4 py-3 text-center">
                    {row.valid ? (
                      <CheckCircle size={18} className="text-emerald-400 mx-auto" />
                    ) : (
                      <XCircle size={18} className="text-red-400 mx-auto" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-400">{row.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Math Expressions */}
      <section>
        <h2 className="text-xl font-bold text-brand-200 mb-1">Sección 3: Operaciones con Variables</h2>
        <p className="text-slate-400 text-sm mb-2">
          Resuelve las siguientes expresiones usando los valores iniciales:
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {VALUES_HEADER.split(', ').map((v) => (
            <span key={v} className="px-3 py-1 bg-slate-800/60 border border-slate-700/50 rounded-full text-xs font-mono text-brand-200">
              {v}
            </span>
          ))}
        </div>
        <div className="space-y-3">
          {MATH_EXERCISES.map((ex) => (
            <div key={ex.id} className="p-4 rounded-xl bg-slate-800/20 border border-slate-700/40">
              <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                <span className="text-brand-400 font-bold text-sm w-5 flex-shrink-0">{ex.id}.</span>
                <div className="flex-1">
                  <span className="text-slate-400 text-sm">{ex.label}: </span>
                  <code className="text-brand-100 font-mono text-sm bg-slate-900/60 px-2 py-0.5 rounded">
                    {ex.expression}
                  </code>
                  <RevealButton solution={ex.solution} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
