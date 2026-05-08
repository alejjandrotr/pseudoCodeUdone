import React from 'react';
import { P, PageSection, InlineCode } from '../ArticlePageComponents';
import { InteractiveConsole, InteractiveStep } from '../interactive/InteractiveConsole';
import { VariableState } from '../interactive/VariablesMemoryPanel';

export const ArticleLectura: React.FC = () => {
  const codeE1 = `Algoritmo VelocidadLectura
    Escribir "Ingrese la distancia recorrida (km):"
    Leer distancia
    Escribir "Ingrese el tiempo transcurrido (h):"
    Leer tiempo
    velocidad <- distancia / tiempo
    Escribir "La velocidad calculada es: " + velocidad + " km/h"
FinAlgoritmo`;

  const initialE1: VariableState[] = [
    { name: 'distancia', value: null, type: 'number' },
    { name: 'tiempo', value: null, type: 'number' },
    { name: 'velocidad', value: null, type: 'number' }
  ];

  const stepsE1: InteractiveStep[] = [
    { line: 2, type: 'print', output: 'Ingrese la distancia recorrida (km):' },
    { line: 3, type: 'read', variable: 'distancia' },
    { line: 4, type: 'print', output: 'Ingrese el tiempo transcurrido (h):' },
    { line: 5, type: 'read', variable: 'tiempo' },
    { line: 6, type: 'assign', variable: 'velocidad', value: (v) => Number(v.distancia) / Number(v.tiempo) },
    { line: 7, type: 'print', output: (v) => `La velocidad calculada es: ${v.velocidad} km/h` }
  ];

  const codeE2 = `Algoritmo AreaCuadradoLectura
    Escribir "Ingrese el lado del cuadrado:"
    Leer lado
    area <- lado * lado
    Escribir "El área del cuadrado es: " + area
FinAlgoritmo`;

  const initialE2: VariableState[] = [
    { name: 'lado', value: null, type: 'number' },
    { name: 'area', value: null, type: 'number' }
  ];

  const stepsE2: InteractiveStep[] = [
    { line: 2, type: 'print', output: 'Ingrese el lado del cuadrado:' },
    { line: 3, type: 'read', variable: 'lado' },
    { line: 4, type: 'assign', variable: 'area', value: (v) => Number(v.lado) * Number(v.lado) },
    { line: 5, type: 'print', output: (v) => `El área del cuadrado es: ${v.area}` }
  ];

  const codeE3 = `Algoritmo RegistroPersonaLectura
    Escribir "Ingrese su nombre:"
    Leer nombre
    Escribir "Ingrese su cédula:"
    Leer cedula
    Escribir "Registro completado para: " + nombre + " - " + cedula
FinAlgoritmo`;

  const initialE3: VariableState[] = [
    { name: 'nombre', value: null, type: 'string' },
    { name: 'cedula', value: null, type: 'string' }
  ];

  const stepsE3: InteractiveStep[] = [
    { line: 2, type: 'print', output: 'Ingrese su nombre:' },
    { line: 3, type: 'read', variable: 'nombre' },
    { line: 4, type: 'print', output: 'Ingrese su cédula:' },
    { line: 5, type: 'read', variable: 'cedula' },
    { line: 6, type: 'print', output: (v) => `Registro completado para: ${v.nombre} - ${v.cedula}` }
  ];

  return (
    <div>
      <P>
        Cuando utilizamos la instrucción <strong className="text-slate-100">leer</strong>, estamos dándole valor a una variable de una forma muy diferente a la asignación directa. Esta vez, los valores no son controlados directamente por nosotros en el código, sino que son proporcionados por el usuario a través del teclado.
      </P>
      <P>
        Esto permite la modificación de lo que ocurre dentro de nuestra aplicación y la hace mucho más dinámica, ya que empezamos a interactuar activamente con el usuario.
      </P>

      <PageSection title="Ejercicio 1: Cálculo de Velocidad Interactivo">
        <P>
          Vamos a repetir el ejercicio de la velocidad, pero esta vez los valores de distancia y tiempo los pediremos al usuario a través de la terminal.
        </P>
        <InteractiveConsole code={codeE1} steps={stepsE1} initialVariables={initialE1} />
      </PageSection>

      <PageSection title="Ejercicio 2: Área de un Cuadrado Interactivo">
        <P>
          En este ejercicio, le pediremos al usuario que ingrese la medida del lado del cuadrado.
        </P>
        <InteractiveConsole code={codeE2} steps={stepsE2} initialVariables={initialE2} />
      </PageSection>

      <PageSection title="Ejercicio 3: Registro de Persona">
        <P>
          Pediremos el nombre y la cédula directamente al usuario.
        </P>
        <InteractiveConsole code={codeE3} steps={stepsE3} initialVariables={initialE3} />
      </PageSection>
    </div>
  );
};
