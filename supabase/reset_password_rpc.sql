-- Función segura para resetear la contraseña de un estudiante
-- Esta función debe ejecutarse en el SQL Editor de Supabase.

CREATE OR REPLACE FUNCTION admin_reset_student_password(admin_password TEXT, target_cedula TEXT)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Verificación de la contraseña de administrador solicitada (7314)
    IF admin_password != '7314' THEN
        RAISE EXCEPTION 'Contraseña de administrador incorrecta';
    END IF;

    -- Verificar si el estudiante existe
    IF NOT EXISTS (SELECT 1 FROM public.students WHERE cedula = target_cedula) THEN
        RAISE EXCEPTION 'El estudiante con la cédula especificada no existe';
    END IF;

    -- Actualizar la contraseña en auth.users a la misma cédula
    UPDATE auth.users
    SET encrypted_password = crypt(target_cedula, gen_salt('bf'))
    WHERE email = target_cedula || '@estudiantes.app';

    -- Marcar para que pida cambio de contraseña en su próximo inicio de sesión
    UPDATE public.students
    SET require_password_change = true
    WHERE cedula = target_cedula;

    RETURN true;
END;
$$;
