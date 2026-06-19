import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { BookOpen, KeyRound, User } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const email = `${cedula}@estudiantes.app`;
      let { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // Si falla por credenciales inválidas, puede que no exista en Auth aún.
      // Intentamos registrarlo (asumiendo que Confirmación de Email está desactivada en Supabase).
      if (authError && authError.message === 'Invalid login credentials') {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (signUpError) {
          throw authError; // Lanzamos el error original de login si el registro también falla
        } else if (signUpData.user) {
          // Registro exitoso (y logueado automáticamente si no requiere confirmación)
          data = signUpData;
          authError = null;
        } else {
          throw authError;
        }
      } else if (authError) {
        throw authError;
      }

      // Check if password change is required
      const { data: student, error: studentError } = await supabase
        .from('students')
        .select('require_password_change')
        .eq('cedula', cedula)
        .maybeSingle(); // maybeSingle para no lanzar error si no encuentra (en caso de que la tabla esté vacía por error)

      // Si el estudiante no está en la tabla, lo dejamos pasar pero idealmente debería estar
      if (student?.require_password_change) {
        navigate('/cambiar-password');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message === 'Invalid login credentials' 
        ? 'Cédula o contraseña incorrecta.' 
        : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-blue-500/10 rounded-full mb-4 border border-blue-500/20">
            <BookOpen className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Portal Estudiantil</h2>
          <p className="text-slate-400 text-center">Inicia sesión con tu cédula para acceder a tus entregas</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Cédula de Identidad
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="text"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg pl-10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ej. 32614281"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg pl-10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Si es tu primera vez, tu contraseña es tu número de cédula.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verificando...' : 'Ingresar al Portal'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
