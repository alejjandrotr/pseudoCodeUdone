import React from 'react';
import { P, PageSection, InlineCode } from '../ArticlePageComponents';
import { VariablesMemoryPanel, MemoryStep, VariableState } from '../interactive/VariablesMemoryPanel';

export const ArticleAsignacion: React.FC = () => {
  const codeE1 = `Algoritmo AreaCuadrado
    lado <- 5
    area <- lado * lado
    Escribir "El área del cuadrado es: " + area
FinAlgoritmo`;

  const initialE1: VariableState[] = [
    { name: 'lado', value: null, type: 'number' },
    { name: 'area', value: null, type: 'number' }
  ];

  const stepsE1: MemoryStep[] = [
    { line: 2, variables: { lado: 5 } },
    { line: 3, variables: { lado: 5, area: 25 } },
    { line: 4, variables: { lado: 5, area: 25 }, output: "El área del cuadrado es: 25" }
  ];

  const codeE2 = `Algoritmo CalculoVelocidad
    distancia <- 100
    tiempo <- 2
    velocidad <- distancia / tiempo
    Escribir "La velocidad es: " + velocidad + " km/h"
FinAlgoritmo`;

  const initialE2: VariableState[] = [
    { name: 'distancia', value: null, type: 'number' },
    { name: 'tiempo', value: null, type: 'number' },
    { name: 'velocidad', value: null, type: 'number' }
  ];

  const stepsE2: MemoryStep[] = [
    { line: 2, variables: { distancia: 100 } },
    { line: 3, variables: { distancia: 100, tiempo: 2 } },
    { line: 4, variables: { distancia: 100, tiempo: 2, velocidad: 50 } },
    { line: 5, variables: { distancia: 100, tiempo: 2, velocidad: 50 }, output: "La velocidad es: 50 km/h" }
  ];

  const codeE3 = `Algoritmo RegistroPersona
    nombre <- "Juan Pérez"
    cedula <- "V-12345678"
    Escribir "Registrado: " + nombre + " con CI: " + cedula
FinAlgoritmo`;

  const initialE3: VariableState[] = [
    { name: 'nombre', value: null, type: 'string' },
    { name: 'cedula', value: null, type: 'string' }
  ];

  const stepsE3: MemoryStep[] = [
    { line: 2, variables: { nombre: "Juan Pérez" } },
    { line: 3, variables: { nombre: "Juan Pérez", cedula: "V-12345678" } },
    { line: 4, variables: { nombre: "Juan Pérez", cedula: "V-12345678" }, output: "Registrado: Juan Pérez con CI: V-12345678" }
  ];

  return (
    <div>
      <P>
        La <strong className="text-slate-100">asignación</strong> es el proceso de dar un valor a las variables. A diferencia de las constantes, una variable es un espacio en la memoria donde guardamos un valor que queremos utilizar, un valor que hayamos calculado a través de algún proceso, o simplemente información temporal.
      </P>
      <P>
        A continuación, veremos cómo cambia el valor de las variables dentro de un algoritmo mientras este se ejecuta.
      </P>

      <PageSection title="Ejercicio 1: Área de un Cuadrado">
        <P>
          Calculemos el área de un cuadrado asignando un valor al lado y luego calculando el resultado. Prueba a cambiar el valor inicial de <InlineCode>lado</InlineCode> antes de darle Play.
        </P>
        <VariablesMemoryPanel code={codeE1} steps={stepsE1} initialVariables={initialE1} />
      </PageSection>

      <PageSection title="Ejercicio 2: Cálculo de Velocidad">
        <P>
          La velocidad se calcula dividiendo la distancia entre el tiempo. Vamos a asignar valores a estas variables y calcular el resultado.
        </P>
        <VariablesMemoryPanel code={codeE2} steps={stepsE2} initialVariables={initialE2} />
      </PageSection>

      <PageSection title="Ejercicio 3: Guardar Nombre y Cédula">
        <P>
          Las variables no solo guardan números, también pueden guardar texto.
        </P>
        <VariablesMemoryPanel code={codeE3} steps={stepsE3} initialVariables={initialE3} />
      </PageSection>
    </div>
  );
};
