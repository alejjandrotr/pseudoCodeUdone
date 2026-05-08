import { Professor } from "../types/professor.types";

// Importación de imágenes
import profMentorFace from "../../assets/professors/prof_mentor_face.png";
import profMentorFull from "../../assets/professors/prof_mentor_full.png";
import profGuiaFace from "../../assets/professors/prof_guia_face.png";
import profGuiaFull from "../../assets/professors/prof_guia_full.png";
import profConceptualFace from "../../assets/professors/prof_conceptual_face.png";
import profConceptualFull from "../../assets/professors/prof_conceptual_full.png";
import profEstrictoFace from "../../assets/professors/prof_estricto_face.png";
import profEstrictoFull from "../../assets/professors/prof_estricto_full.png";
import profImplacableFace from "../../assets/professors/prof_implacable_face.png";
import profImplacableFull from "../../assets/professors/prof_implacable_full.png";

export const professorsData: Professor[] = [
  {
    id: "prof_mentor",
    name: "Prof. Mentor",
    avatarUrl: profMentorFace,
    fullImageUrl: profMentorFull,
    difficultyLevel: "100% Ayuda (Fácil)",
    shortStory: "Un profesor paciente y dedicado. Su objetivo principal es que aprendas haciendo, pero si te atascas, te mostrará el camino paso a paso y te dará la solución completa para que puedas compararla con tu código.",
    promptBehavior: "Corrige el código, señala TODOS los errores, y proporciona el código corregido completo simulando una ejecución de consola exitosa."
  },
  {
    id: "prof_guia",
    name: "Prof. Guía",
    avatarUrl: profGuiaFace,
    fullImageUrl: profGuiaFull,
    difficultyLevel: "75% Ayuda (Intermedio-Fácil)",
    shortStory: "Cree en el aprendizaje a través de ejemplos. Si te equivocas, no te dará la respuesta exacta a tu problema, pero te mostrará pequeños fragmentos de código similares para inspirarte a encontrar la solución.",
    promptBehavior: "Señala los errores encontrados. Proporciona pequeños fragmentos de código de ejemplo parecidos (pero NO des la solución completa exacta)."
  },
  {
    id: "prof_conceptual",
    name: "Prof. Conceptual",
    avatarUrl: profConceptualFace,
    fullImageUrl: profConceptualFull,
    difficultyLevel: "50% Ayuda (Intermedio)",
    shortStory: "Para este profesor, la teoría lo es todo. Jamás escribirá una línea de código por ti. En cambio, te explicará detalladamente qué concepto estás aplicando mal para que tu cerebro haga el resto del trabajo.",
    promptBehavior: "NO des código bajo ninguna circunstancia. Explica conceptualmente qué está mal (ej. 'Estás usando mal la asignación' o 'Te falta leer una variable')."
  },
  {
    id: "prof_estricto",
    name: "Prof. Estricto",
    avatarUrl: profEstrictoFace,
    fullImageUrl: profEstrictoFull,
    difficultyLevel: "25% Ayuda (Avanzado)",
    shortStory: "No tiene mucho tiempo que perder. Dará un vistazo rápido a tu código y simplemente te indicará en qué línea te equivocaste. Depende completamente de ti descubrir cuál fue el error exacto.",
    promptBehavior: "Solo señala en qué línea o parte general está el error (ej. 'Hay un error de sintaxis en la línea 4' o 'Revisa cómo imprimes el resultado'). No expliques el concepto ni des código."
  },
  {
    id: "prof_implacable",
    name: "Prof. Implacable",
    avatarUrl: profImplacableFace,
    fullImageUrl: profImplacableFull,
    difficultyLevel: "0% Ayuda (Extremo)",
    shortStory: "Antiguo evaluador de las competencias de programación más duras. Si tu código no compila o no sigue estrictamente las normas UDONE, simplemente te dirá 'INCORRECTO'. Buena suerte.",
    promptBehavior: "Solo responde 'CORRECTO' o 'INCORRECTO'. Nada más. Ni una sola palabra adicional."
  }
];
