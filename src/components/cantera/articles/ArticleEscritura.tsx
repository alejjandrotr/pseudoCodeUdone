import React from 'react';
import { P, PageSection, PageSubSection, InlineCode, Callout } from '../ArticlePageComponents';
import { VisualCodeTracer, CodeStep } from '../interactive/VisualCodeTracer';

export const ArticleEscritura: React.FC = () => {
  const codeE1 = `Algoritmo HolaMundo
    Escribir "Hola mundo"
FinAlgoritmo`;
  const stepsE1: CodeStep[] = [
    { line: 2, output: 'Hola mundo' }
  ];

  const codeE2 = `Algoritmo SaludoConstante
    Escribir "Hola " + "Bienvenido al sistema " + "de aprendizaje."
FinAlgoritmo`;
  const stepsE2: CodeStep[] = [
    { line: 2, output: 'Hola Bienvenido al sistema de aprendizaje.' }
  ];

  const codeE3 = `Algoritmo MuestraDatos
    Escribir "--- SISTEMA DE INFORMACIÓN ---"
    Escribir "El año actual es: " + 2026
    Escribir "Temperatura: " + 25 + " grados"
FinAlgoritmo`;
  const stepsE3: CodeStep[] = [
    { line: 2, output: '--- SISTEMA DE INFORMACIÓN ---' },
    { line: 3, output: 'El año actual es: 2026' },
    { line: 4, output: 'Temperatura: 25 grados' }
  ];

  return (
    <div>
      <P>
        La <strong className="text-slate-100">escritura</strong> es el acto de mostrar información por pantalla para que el usuario pueda estar informado de lo que el software que estamos creando está realizando o necesita. Es la principal forma en que nuestro algoritmo se comunica con el exterior.
      </P>
      <P>
        A continuación, veremos cómo funciona la escritura mediante distintos ejercicios prácticos. En la pantalla verás el código a la derecha y el resultado en una consola (como un terminal de Windows) a la izquierda.
      </P>

      <PageSection title="Ejercicio 1: Un simple Hola Mundo">
        <P>
          El clásico primer ejercicio en programación. Simplemente le decimos al computador que muestre un texto en la pantalla.
        </P>
        <VisualCodeTracer code={codeE1} steps={stepsE1} />
      </PageSection>

      <PageSection title="Ejercicio 2: Uso de Constantes">
        <P>
          Podemos mostrar textos y también combinarlos (concatenarlos). En este ejercicio no usamos variables, solo constantes de texto que unimos en una sola instrucción.
        </P>
        <VisualCodeTracer code={codeE2} steps={stepsE2} />
        <Callout variant="info">
          El signo <InlineCode>+</InlineCode> nos permite unir (concatenar) distintos fragmentos de texto antes de mostrarlos en pantalla.
        </Callout>
      </PageSection>

      <PageSection title="Ejercicio 3: Combinando Textos y Números">
        <P>
          En este último ejercicio, usaremos varias instrucciones <InlineCode>Escribir</InlineCode> combinando textos, concatenación y números de una forma ingeniosa.
        </P>
        <VisualCodeTracer code={codeE3} steps={stepsE3} />
      </PageSection>
    </div>
  );
};
