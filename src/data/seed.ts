import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const seed = async () => {
  const studentsRaw = fs.readFileSync(new URL('./students.json', import.meta.url), 'utf-8');
  const studentsList = JSON.parse(studentsRaw);
  
  const mappedStudents = studentsList.map((s: any) => ({
    cedula: s.cedula,
    nombres: s.nombres,
    apellidos: s.apellidos,
    seccion: s.seccion,
    require_password_change: true
  }));

  console.log(`Inserting ${mappedStudents.length} students...`);
  
  const { data, error } = await supabase.from('students').upsert(mappedStudents, { onConflict: 'cedula' });
  
  if (error) {
    console.error('Error inserting students:', error);
  } else {
    console.log('Students seeded successfully!');
  }
};

seed();
