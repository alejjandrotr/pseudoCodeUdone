-- Students table
CREATE TABLE public.students (
    cedula VARCHAR(20) PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    seccion VARCHAR(20),
    require_password_change BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Projects table
CREATE TABLE public.projects (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    min_members INTEGER DEFAULT 1,
    max_members INTEGER DEFAULT 3,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Groups table
CREATE TABLE public.groups (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES public.projects(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Group members table
CREATE TABLE public.group_members (
    group_id INTEGER REFERENCES public.groups(id) ON DELETE CASCADE,
    student_cedula VARCHAR(20) REFERENCES public.students(cedula) ON DELETE CASCADE,
    PRIMARY KEY (group_id, student_cedula)
);

-- Deliveries table
CREATE TABLE public.deliveries (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES public.projects(id) ON DELETE CASCADE,
    group_id INTEGER REFERENCES public.groups(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'submitted',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- AI Reports table
CREATE TABLE public.ai_reports (
    id SERIAL PRIMARY KEY,
    delivery_id INTEGER REFERENCES public.deliveries(id) ON DELETE CASCADE,
    puntuacion INTEGER, -- e.g. out of 25
    analisis_errores TEXT,
    ai_usage_detection TEXT,
    justificacion TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Defense Questions table
CREATE TABLE public.defense_questions (
    id SERIAL PRIMARY KEY,
    delivery_id INTEGER REFERENCES public.deliveries(id) ON DELETE CASCADE,
    pregunta TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Code Exercises Bank table (Fase 3)
CREATE TABLE public.code_exercises_bank (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    premise TEXT NOT NULL,
    language VARCHAR(50) DEFAULT 'cpp',
    boilerplate_code TEXT NOT NULL,
    hidden_tests JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Exam Sessions table (Fase 3)
CREATE TABLE public.exam_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_ci VARCHAR(20) REFERENCES public.students(cedula) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'in_progress',
    start_time TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    end_time TIMESTAMP WITH TIME ZONE,
    ip_address VARCHAR(45),
    copy_paste_count INTEGER DEFAULT 0,
    final_score NUMERIC(5,2),
    file_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Configuración de Storage para Parciales
INSERT INTO storage.buckets (id, name, public) 
VALUES ('parciales_codigo', 'parciales_codigo', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de Seguridad para Storage (Permitir subida y lectura a usuarios autenticados)
CREATE POLICY "Permitir subida a autenticados" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'parciales_codigo');

CREATE POLICY "Permitir lectura publica" 
ON storage.objects FOR SELECT 
TO public 
USING (bucket_id = 'parciales_codigo');
