import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { Mic, MicOff, UploadCloud, Users, Bot, CheckCircle, AlertTriangle } from 'lucide-react';

// Types
interface Student {
  cedula: string;
  nombres: string;
  apellidos: string;
}

export const ProjectDeliveryPage: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Project & Student Data
  const [project, setProject] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [availableStudents, setAvailableStudents] = useState<Student[]>([]);
  
  // Form State
  const [selectedGroupMembers, setSelectedGroupMembers] = useState<string[]>([]);
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [pseudoFile, setPseudoFile] = useState<File | null>(null);
  const [codeFile, setCodeFile] = useState<File | null>(null);
  const [apiKey, setApiKey] = useState('');
  
  // UI State
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    fetchInitialData();
    setupSpeechRecognition();
  }, [projectId]);

  const fetchInitialData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate('/login-estudiantes'); return; }
      
      const cedula = user.email?.split('@')[0];
      setCurrentUser({ cedula });
      setSelectedGroupMembers([cedula!]);

      // Get project details
      const { data: projData, error: projError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();
        
      if (projError) throw projError;
      setProject(projData);

      // Get students not in another group for this project
      // For simplicity in this demo, we'll fetch all students and filter locally, 
      // ideally done via a view or complex query
      const { data: allStudents } = await supabase.from('students').select('*');
      const { data: allDeliveries } = await supabase.from('deliveries').select('group_id').eq('project_id', projectId);
      
      let unavailableCedulas: string[] = [];
      if (allDeliveries && allDeliveries.length > 0) {
        const groupIds = allDeliveries.map(d => d.group_id);
        const { data: gmData } = await supabase.from('group_members').select('student_cedula').in('group_id', groupIds);
        unavailableCedulas = gmData?.map(g => g.student_cedula) || [];
      }

      const available = allStudents?.filter(s => s.cedula !== cedula && !unavailableCedulas.includes(s.cedula)) || [];
      setAvailableStudents(available);

    } catch (err) {
      console.error(err);
      setError('Error al cargar datos del proyecto.');
    } finally {
      setLoading(false);
    }
  };

  const setupSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'es-VE';

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + ' ';
          }
        }
        if (finalTranscript) {
          setTranscript(prev => prev + finalTranscript);
        }
      };
      
      recognitionRef.current = recognition;
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      if (!recognitionRef.current) {
        setError("Tu navegador no soporta el dictado por voz. Usa Chrome o Edge.");
        return;
      }
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const toggleMember = (cedula: string) => {
    let newMembers = [...selectedGroupMembers];
    if (newMembers.includes(cedula)) {
      newMembers = newMembers.filter(c => c !== cedula);
    } else {
      newMembers.push(cedula);
    }
    setSelectedGroupMembers(newMembers);

    // Validate size
    if (project) {
      if (newMembers.length < project.min_members || newMembers.length > project.max_members) {
        setWarning(`Atención: Está entregando con una cantidad de integrantes (${newMembers.length}) distinta a la permitida (${project.min_members}-${project.max_members}). Debe tener previa aprobación o podría perder el proyecto. Toda variación debe ser consultada.`);
      } else {
        setWarning(null);
      }
    }
  };

  const handleDelivery = async () => {
    if (!pseudoFile || !codeFile) {
      setError("Debes subir tanto el pseudocódigo como el código fuente.");
      return;
    }
    if (transcript.length < 50) {
      setError("La explicación transcrita es muy corta. Por favor dicta una explicación completa.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // 1. Create Group
      const { data: groupData, error: groupError } = await supabase
        .from('groups')
        .insert([{ project_id: projectId }])
        .select()
        .single();
      if (groupError) throw groupError;

      const groupId = groupData.id;

      // 2. Add Members
      const membersToInsert = selectedGroupMembers.map(c => ({ group_id: groupId, student_cedula: c }));
      const { error: membersError } = await supabase.from('group_members').insert(membersToInsert);
      if (membersError) throw membersError;

      // 3. Upload Files
      const basePath = `proyecto${projectId}/${groupId}/archivosGenerados`;
      
      await supabase.storage.from('student-deliveries').upload(`${basePath}/pseudocodigo.txt`, pseudoFile);
      await supabase.storage.from('student-deliveries').upload(`${basePath}/codigo.${codeFile.name.split('.').pop()}`, codeFile);
      
      const transcriptBlob = new Blob([transcript], { type: 'text/plain' });
      await supabase.storage.from('student-deliveries').upload(`${basePath}/transcripcion.txt`, transcriptBlob);

      // 4. Record Delivery
      const { data: deliveryData, error: deliveryError } = await supabase
        .from('deliveries')
        .insert([{ project_id: projectId, group_id: groupId, status: 'submitted' }])
        .select()
        .single();
      if (deliveryError) throw deliveryError;

      // 5. AI Evaluation (Si hay API Key, lo intentamos. Si falla, igual terminamos la entrega).
      if (apiKey) {
        try {
          // LLamada manual usando fetch o SDK. Asumiendo SDK de Gemini:
          const { GoogleGenAI } = await import('@google/genai');
          const ai = new GoogleGenAI({ apiKey });
          
          const pseudoText = await pseudoFile.text();
          const codeText = await codeFile.text();
          
          const prompt = `
            Actúa como un profesor estricto de programación.
            Evalúa la siguiente entrega de proyecto.
            Pseudocódigo:
            ${pseudoText}
            
            Código Fuente:
            ${codeText}
            
            Explicación transcrita del estudiante:
            ${transcript}
            
            Debes responder ESTRICTAMENTE en formato JSON con la siguiente estructura:
            {
              "puntuacion": (numero entero del 0 al 25),
              "analisis_errores": "descripcion de errores encontrados",
              "ai_usage_detection": "tu opinion de si uso IA y por que",
              "preguntas": ["pregunta1", "pregunta2", "pregunta3", "pregunta4", "pregunta5", "pregunta6", "pregunta7"]
            }
          `;

          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
              responseMimeType: "application/json",
            }
          });

          const aiResult = JSON.parse(response.text!);

          // Guardar reporte
          await supabase.from('ai_reports').insert([{
            delivery_id: deliveryData.id,
            puntuacion: aiResult.puntuacion,
            analisis_errores: aiResult.analisis_errores,
            ai_usage_detection: aiResult.ai_usage_detection,
            justificacion: "Autogenerado"
          }]);

          // Guardar preguntas
          const questions = aiResult.preguntas.map((p: string) => ({ delivery_id: deliveryData.id, pregunta: p }));
          await supabase.from('defense_questions').insert(questions);

        } catch (aiErr) {
          console.error("Error en la IA, pero la entrega se guardó:", aiErr);
        }
      }

      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Error al procesar la entrega.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-slate-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Entregar Proyecto</h1>
        <p className="text-slate-400 mb-8">{project?.nombre}</p>

        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg mb-6">{error}</div>}
        {warning && <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 p-4 rounded-lg mb-6 flex gap-3 items-start"><AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" /> <p>{warning}</p></div>}

        <div className="space-y-8">
          {/* Step 1: Group */}
          <section className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-blue-400" /> 1. Formación de Equipo</h2>
            <p className="text-sm text-slate-400 mb-4">Selecciona a tus compañeros (Mínimo {project?.min_members}, Máximo {project?.max_members}).</p>
            
            <div className="max-h-48 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
              {availableStudents.map(s => (
                <label key={s.cedula} className="flex items-center gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                  <input type="checkbox" checked={selectedGroupMembers.includes(s.cedula)} onChange={() => toggleMember(s.cedula)} className="rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900" />
                  <div>
                    <p className="text-sm font-medium text-slate-200">{s.nombres} {s.apellidos}</p>
                    <p className="text-xs text-slate-500">C.I: {s.cedula}</p>
                  </div>
                </label>
              ))}
              {availableStudents.length === 0 && <p className="text-slate-500 text-sm italic">No hay compañeros disponibles.</p>}
            </div>
          </section>

          {/* Step 2: Voice */}
          <section className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2"><Mic className="w-5 h-5 text-blue-400" /> 2. Explicación del Proyecto</h2>
            <p className="text-sm text-slate-400 mb-4">Dicta la explicación completa de cómo desarrollaron el proyecto. Esto es obligatorio para validar autoría.</p>
            
            <div className="flex flex-col gap-4">
              <button onClick={toggleRecording} type="button" className={`flex items-center justify-center gap-2 py-4 rounded-xl font-medium transition-all ${isRecording ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'}`}>
                {isRecording ? <><MicOff className="w-5 h-5" /> Detener Grabación</> : <><Mic className="w-5 h-5" /> Iniciar Dictado</>}
              </button>
              
              <div className="relative">
                <textarea 
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  className="w-full h-32 bg-slate-950 border border-slate-800 rounded-lg p-4 text-sm text-slate-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Tu explicación aparecerá aquí..."
                />
              </div>
            </div>
          </section>

          {/* Step 3: Files */}
          <section className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2"><UploadCloud className="w-5 h-5 text-blue-400" /> 3. Archivos del Proyecto</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Pseudocódigo (.txt)</label>
                <input type="file" accept=".txt" onChange={e => setPseudoFile(e.target.files?.[0] || null)} className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-400 hover:file:bg-blue-500/20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Código Fuente (C, C++, Pascal, TS)</label>
                <input type="file" accept=".c,.cpp,.pas,.ts,.txt" onChange={e => setCodeFile(e.target.files?.[0] || null)} className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500/10 file:text-green-400 hover:file:bg-green-500/20" />
              </div>
            </div>
          </section>

          {/* Step 4: AI Config */}
          <section className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2"><Bot className="w-5 h-5 text-blue-400" /> 4. Validación Inteligente (Opcional)</h2>
            <p className="text-sm text-slate-400 mb-4">Ingresa tu Token de API para realizar la revisión preeliminar de tu código.</p>
            <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="API Key (Gemini)" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" />
          </section>

          {/* Submit */}
          <button onClick={handleDelivery} disabled={submitting} className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all">
            {submitting ? 'Enviando Entrega...' : <><CheckCircle className="w-6 h-6" /> Entregar Proyecto</>}
          </button>
        </div>
      </div>
    </div>
  );
};
