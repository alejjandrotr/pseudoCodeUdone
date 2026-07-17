import React from 'react';
import { P, PageSection, YouTubeEmbed, Strong, Callout, InlineCode } from '../ArticlePageComponents';
import { PenTool, Download, MonitorUp } from 'lucide-react';

export const ArticleVideoArreglos2: React.FC = () => {
  return (
    <div>
      <P>
        En esta segunda parte sobre la estructura de datos tipo Arreglo (Array), se profundiza en las operaciones fundamentales que se pueden realizar sobre estas estructuras una vez que han sido declaradas. Específicamente, trabajaremos con la <strong>Asignación</strong>, <strong>Lectura</strong> y <strong>Escritura</strong> de datos.
      </P>

      <YouTubeEmbed 
        videoId="MCnzp-QHZ8U" 
        title="DATOS 1 - Arreglos (Asignación, Escritura y Lectura) (2/5)" 
      />

      <PageSection title="1. Asignación en Arreglos">
        <P>
          La asignación no es más que el simple hecho de darle o guardar un valor específico dentro de una variable. En el caso de los arreglos, al ser estructuras de múltiples posiciones, la asignación se realiza indicando exactamente en qué <Strong>índice o posición</Strong> se desea guardar el dato.
        </P>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl hover:border-brand-500/30 transition-colors">
            <h4 className="text-brand-400 font-bold mb-2 flex items-center gap-2">
              <PenTool size={16} /> Asignación Directa
            </h4>
            <p className="text-slate-300 text-sm mb-3">Puedes asignar un valor indicando el número de la posición estática.</p>
            <div className="bg-black/50 p-2 rounded text-emerald-400 font-mono text-sm border border-slate-800">
              Arreglo[4] = 5
            </div>
          </div>
          
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl hover:border-brand-500/30 transition-colors">
            <h4 className="text-brand-400 font-bold mb-2 flex items-center gap-2">
              <PenTool size={16} /> Con Operaciones
            </h4>
            <p className="text-slate-300 text-sm mb-3">Puedes realizar sumas o restas directamente en el índice al momento de asignar.</p>
            <div className="bg-black/50 p-2 rounded text-emerald-400 font-mono text-sm border border-slate-800">
              Arreglo[2+3] = 7 <span className="text-slate-500 text-xs ml-2">// Guarda el 7 en la pos 5</span>
            </div>
          </div>
        </div>

        <P>
          <Strong>Uso de Variables como Índices:</Strong> No estás obligado a colocar un número fijo. Puedes utilizar una variable entera (como <InlineCode>i</InlineCode>, <InlineCode>index</InlineCode> o <InlineCode>j</InlineCode>) para representar la posición. Por ejemplo, si <InlineCode>i = 4</InlineCode>, entonces <InlineCode>Arreglo[i] = 7</InlineCode> guardará el 7 en la posición 4.
        </P>
        
        <Callout variant="warning">
          <Strong>Naturaleza Destructiva:</Strong> Si en una posición ya había un valor (por ejemplo, un 5) y asignamos uno nuevo (por ejemplo, un 7), el valor anterior se sobreescribe y se pierde irrecuperablemente.
        </Callout>
      </PageSection>

      <PageSection title="2. Lectura de Arreglos">
        <P>
          La operación de lectura ocurre cuando solicitamos un dato externo, generalmente por teclado (input del usuario), y lo guardamos dentro del arreglo.
        </P>
        
        <div className="flex gap-4 items-start bg-slate-900 border border-slate-800 p-5 rounded-xl my-4">
          <div className="bg-indigo-500/20 text-indigo-400 p-2 rounded-lg shrink-0">
            <Download size={20} />
          </div>
          <div className="space-y-2">
            <p className="text-slate-300 text-sm">
              Para leer, utilizamos instrucciones como <InlineCode>Leer Arreglo[1]</InlineCode>. El dato que el usuario escriba, se guardará directamente en esa posición específica de la memoria estructurada.
            </p>
            <p className="text-slate-300 text-sm">
              Al igual que en la asignación, la posición donde se lee el dato puede estar definida por una variable (Ej. <InlineCode>Leer Arreglo[i]</InlineCode>). Esto es sumamente útil cuando combinamos esta operación con ciclos (bucles) para llenar un arreglo completo dinámicamente.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection title="3. Escritura de Arreglos">
        <P>
          La escritura es el proceso de tomar la información que ya está almacenada en una o varias posiciones de nuestro arreglo y mostrarla al usuario en pantalla (output).
        </P>
        
        <div className="flex gap-4 items-start bg-slate-900 border border-slate-800 p-5 rounded-xl my-4">
          <div className="bg-teal-500/20 text-teal-400 p-2 rounded-lg shrink-0">
            <MonitorUp size={20} />
          </div>
          <div className="space-y-2">
            <p className="text-slate-300 text-sm">
              Usamos instrucciones como <InlineCode>Escribir Arreglo[i]</InlineCode>.
            </p>
            <p className="text-slate-300 text-sm">
              El programa evaluará la posición (por ejemplo, si <InlineCode>i = 2</InlineCode>), buscará qué hay guardado en la casilla número 2 del arreglo, y mostrará ese valor exacto en la pantalla (Ej. si la casilla 2 tenía el número <InlineCode>251</InlineCode>, escribirá <InlineCode>251</InlineCode>).
            </p>
            <p className="text-slate-300 text-sm">
              Se pueden combinar mensajes de texto con los valores del arreglo para darle mejor contexto al usuario, como:
              <br/>
              <span className="inline-block mt-2 font-mono text-xs text-brand-300 bg-black/40 px-2 py-1 rounded">Escribir "El número ingresado fue: ", Arreglo[i]</span>
            </p>
          </div>
        </div>
        
        <Callout variant="tip">
          Para aprovechar todo el potencial de la lectura, escritura y asignación utilizando variables en los índices, es altamente recomendable usar estructuras repetitivas (como el ciclo PARA / FOR) para recorrer el arreglo de inicio a fin sin necesidad de escribir código repetitivo.
        </Callout>
      </PageSection>
    </div>
  );
};
