import React from 'react';
import { YouTubeEmbed, PageSection, PageSubSection, P, UL, ListItem, Callout } from '../ArticlePageComponents';

export const ArticleVideosRelacionados: React.FC = () => {
  return (
    <div>
      <P>
        En esta sección encontrarás las grabaciones de las clases teóricas y prácticas relacionadas con las **Operaciones Básicas** (Lectura, Escritura y Asignación), así como el uso de operadores avanzados y pruebas de escritorio.
      </P>

      <PageSection title="Video 1: Introducción y Lógica de Programación">
        <YouTubeEmbed videoId="d_Zp9FpS4YA" title="Introducción a los Algoritmos" />
        <PageSubSection title="Cosas Importantes">
          <UL>
            <ListItem><strong className="text-slate-100">Pensamiento Lógico:</strong> Primeros pasos para entender cómo estructurar una solución paso a paso.</ListItem>
            <ListItem><strong className="text-slate-100">¿Qué es un algoritmo?:</strong> Definición práctica y aplicación en la vida cotidiana y el desarrollo de software.</ListItem>
          </UL>
        </PageSubSection>
      </PageSection>

      <PageSection title="Video 2: Conceptos Teóricos">
        <YouTubeEmbed videoId="OCl4E4nfxAU" title="Parte 1/3 - Lectura, Escritura y Asignación" />
        <PageSubSection title="Cosas Importantes">
          <UL>
            <ListItem><strong className="text-slate-100">Estructura del algoritmo:</strong> Se repasa la anatomía básica que incluye la declaración de constantes y variables (enteros, reales, lógicos, cadenas).</ListItem>
            <ListItem><strong className="text-slate-100">Asignación (Operación destructiva):</strong> Dar un valor a una variable sobrescribe el anterior. Se resuelve procesando primero la expresión de la derecha.</ListItem>
            <ListItem><strong className="text-slate-100">Escritura (Salida):</strong> Cómo mostrar cadenas de texto literales combinadas con variables para presentar la información.</ListItem>
            <ListItem><strong className="text-slate-100">Lectura (Entrada):</strong> Capturar datos del teclado. No debe llevar comillas ni paréntesis; es una operación destructiva.</ListItem>
          </UL>
        </PageSubSection>
        <Callout variant="info">
          Este segmento sienta las bases teóricas requeridas para el diseño lógico, diferenciando datos autogenerados de los externos.
        </Callout>
      </PageSection>

      <PageSection title="Video 3: Diseño Secuencial y Pruebas de Escritorio">
        <YouTubeEmbed videoId="kGlgPPRWMSo" title="Parte 2/3 - Análisis y Resolución de Problemas" />
        <PageSubSection title="Cosas Importantes">
          <UL>
            <ListItem><strong className="text-slate-100">Análisis de datos:</strong> Identificación clara de datos de entrada, procesamiento y salida esperada.</ListItem>
            <ListItem><strong className="text-slate-100">Prueba de escritorio:</strong> Visualización paralela de la consola y la tabla de valores en memoria para rastrear variables.</ListItem>
            <ListItem><strong className="text-slate-100">Regla de tres:</strong> Aplicación de fórmulas matemáticas (monto * 100 / total) en la sintaxis del algoritmo.</ListItem>
          </UL>
        </PageSubSection>
        <PageSubSection title="Ejercicios Resueltos">
          <UL>
            <ListItem>Cálculo de Promedio de tres números reales.</ListItem>
            <ListItem>Porcentaje de aportes societarios (caso de negocio).</ListItem>
          </UL>
        </PageSubSection>
      </PageSection>

      <PageSection title="Video 4: División Exacta (DIV) y Residuos (MOD)">
        <YouTubeEmbed videoId="3lheIp28cQ0" title="Parte 3/3 - Conversión de Unidades Temporales" />
        <PageSubSection title="Cosas Importantes">
          <UL>
            <ListItem><strong className="text-slate-100">Operador DIV:</strong> Cómo obtener la porción entera de un cociente (ej: horas completas).</ListItem>
            <ListItem><strong className="text-slate-100">Operador MOD:</strong> Fundamental para rescatar el residuo o "lo que sobra" tras cada extracción de unidad.</ListItem>
            <ListItem><strong className="text-slate-100">Actualización de variables:</strong> Reasignación progresiva de la variable temporal tras calcular cada magnitud.</ListItem>
          </UL>
        </PageSubSection>
        <Callout variant="warning">
          <strong className="text-slate-100">Conversor de Segundos:</strong> Resolución completa de un ejercicio avanzado que desglosa segundos en días, horas, minutos y segundos exactos.
        </Callout>
      </PageSection>
    </div>
  );
};
