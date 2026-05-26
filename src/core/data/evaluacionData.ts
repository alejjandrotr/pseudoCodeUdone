import { PrivateExercise, ParcialConfig } from "../types/evaluacion.types";

export const privateExercisesDB: PrivateExercise[] = [
  {
    id: "pe_sec_01",
    categoria: "secuenciales",
    numero: 1,
    enunciado: "Escriba un algoritmo que lea tres notas de exámenes prácticos de un estudiante y calcule su nota promedio ponderada, sabiendo que la primera nota tiene un peso del 30%, la segunda del 30% y la tercera del 40%. Muestre la nota definitiva de la materia.",
    puntosMaximos: 2.5,
    solucionOficial: {
      pseudocodigo: `ALGORITMO PromedioPonderado
DECLARACIÓN
VARIABLES
  nota1, nota2, nota3, promedio: real
INICIO
  ESCRIBIR "Introduzca la nota del primer examen:"
  LEER nota1
  ESCRIBIR "Introduzca la nota del segundo examen:"
  LEER nota2
  ESCRIBIR "Introduzca la nota del tercer examen:"
  LEER nota3
  promedio <- (nota1 * 0.30) + (nota2 * 0.30) + (nota3 * 0.40)
  ESCRIBIR "La nota promedio ponderada es: ", promedio
FIN`,
      c: `#include <stdio.h>

int main() {
    float nota1, nota2, nota3, promedio;
    printf("Introduzca la nota del primer examen:\\n");
    scanf("%f", &nota1);
    printf("Introduzca la nota del segundo examen:\\n");
    scanf("%f", &nota2);
    printf("Introduzca la nota del tercer examen:\\n");
    scanf("%f", &nota3);
    promedio = (nota1 * 0.30) + (nota2 * 0.30) + (nota3 * 0.40);
    printf("La nota promedio ponderada es: %.2f\\n", promedio);
    return 0;
}`,
      typescript: `function calcularPromedioPonderado(nota1: number, nota2: number, nota3: number): number {
  const promedio = (nota1 * 0.30) + (nota2 * 0.30) + (nota3 * 0.40);
  return promedio;
}`
    }
  },
  {
    id: "pe_simp_01",
    categoria: "seleccion-simple",
    numero: 2,
    enunciado: "Escriba un algoritmo que lea la temperatura actual en grados Celsius de un reactor químico. Si la temperatura supera los 100 grados Celsius, debe mostrar en pantalla un mensaje de alerta que diga: 'ALERTA: TEMPERATURA CRÍTICA DETECTADA!'. En cualquier caso, al final debe imprimir 'Monitoreo finalizado'.",
    puntosMaximos: 2.5,
    solucionOficial: {
      pseudocodigo: `ALGORITMO MonitoreoReactor
DECLARACIÓN
VARIABLES
  temp: real
INICIO
  ESCRIBIR "Ingrese la temperatura actual del reactor:"
  LEER temp
  SI (temp > 100) ENTONCES
    ESCRIBIR "ALERTA: TEMPERATURA CRÍTICA DETECTADA!"
  FIN SI
  ESCRIBIR "Monitoreo finalizado"
FIN`,
      c: `#include <stdio.h>

int main() {
    float temp;
    printf("Ingrese la temperatura actual del reactor:\\n");
    scanf("%f", &temp);
    if (temp > 100.0) {
        printf("ALERTA: TEMPERATURA CRÍTICA DETECTADA!\\n");
    }
    printf("Monitoreo finalizado\\n");
    return 0;
}`,
      typescript: `function monitorearReactor(temp: number): void {
  if (temp > 100) {
    console.log("ALERTA: TEMPERATURA CRÍTICA DETECTADA!");
  }
  console.log("Monitoreo finalizado");
}`
    }
  },
  {
    id: "pe_dob_01",
    categoria: "seleccion-doble",
    numero: 3,
    enunciado: "Una tienda ofrece un descuento del 15% sobre el total de la compra si el cliente compra más de 5 artículos. De lo contrario, no se aplica ningún descuento. Escriba un algoritmo que lea la cantidad de artículos y el precio subtotal sin descuento, calcule el descuento aplicable y muestre el monto final neto a pagar.",
    puntosMaximos: 2.5,
    solucionOficial: {
      pseudocodigo: `ALGORITMO DescuentoTienda
DECLARACIÓN
VARIABLES
  cantidad: entero
  subtotal, descuento, total: real
INICIO
  ESCRIBIR "Ingrese la cantidad de articulos comprados:"
  LEER cantidad
  ESCRIBIR "Ingrese el subtotal de la compra:"
  LEER subtotal
  SI (cantidad > 5) ENTONCES
    descuento <- subtotal * 0.15
  SINO
    descuento <- 0.0
  FIN SI
  total <- subtotal - descuento
  ESCRIBIR "Descuento aplicado: ", descuento
  ESCRIBIR "Monto final a pagar: ", total
FIN`,
      c: `#include <stdio.h>

int main() {
    int cantidad;
    float subtotal, descuento, total;
    printf("Ingrese la cantidad de articulos comprados:\\n");
    scanf("%d", &cantidad);
    printf("Ingrese el subtotal de la compra:\\n");
    scanf("%f", &subtotal);
    if (cantidad > 5) {
        descuento = subtotal * 0.15;
    } else {
        descuento = 0.0;
    }
    total = subtotal - descuento;
    printf("Descuento aplicado: %.2f\\n", descuento);
    printf("Monto final a pagar: %.2f\\n", total);
    return 0;
}`,
      typescript: `function calcularTotalCompra(cantidad: number, subtotal: number): { descuento: number, total: number } {
  let descuento = 0;
  if (cantidad > 5) {
    descuento = subtotal * 0.15;
  }
  const total = subtotal - descuento;
  return { descuento, total };
}`
    }
  },
  {
    id: "pe_mult_01",
    categoria: "seleccion-multiple",
    numero: 4,
    enunciado: "Escriba un algoritmo que lea un número entero del 1 al 5 correspondiente a los días de la semana hábil escolar (1 para Lunes, 2 para Martes, 3 para Miércoles, 4 para Jueves y 5 para Viernes). Debe imprimir en pantalla el nombre del día correspondiente. Si el número ingresado está fuera de ese rango, debe imprimir: 'DIA NO VALIDO'.",
    puntosMaximos: 2.5,
    solucionOficial: {
      pseudocodigo: `ALGORITMO DiaSemana
DECLARACIÓN
VARIABLES
  dia: entero
INICIO
  ESCRIBIR "Ingrese un numero del 1 al 5:"
  LEER dia
  CASO dia DE
    1: ESCRIBIR "Lunes"
    2: ESCRIBIR "Martes"
    3: ESCRIBIR "Miercoles"
    4: ESCRIBIR "Jueves"
    5: ESCRIBIR "Viernes"
    SINO: ESCRIBIR "DIA NO VALIDO"
  FIN CASO
FIN`,
      c: `#include <stdio.h>

int main() {
    int dia;
    printf("Ingrese un numero del 1 al 5:\\n");
    scanf("%d", &dia);
    switch (dia) {
        case 1: printf("Lunes\\n"); break;
        case 2: printf("Martes\\n"); break;
        case 3: printf("Miercoles\\n"); break;
        case 4: printf("Jueves\\n"); break;
        case 5: printf("Viernes\\n"); break;
        default: printf("DIA NO VALIDO\\n"); break;
    }
    return 0;
}`,
      typescript: `function obtenerDiaSemana(dia: number): string {
  switch (dia) {
    case 1: return "Lunes";
    case 2: return "Martes";
    case 3: return "Miercoles";
    case 4: return "Jueves";
    case 5: return "Viernes";
    default: return "DIA NO VALIDO";
  }
}`
    }
  },
  {
    id: "pe_anid_01",
    categoria: "anidados",
    numero: 5,
    enunciado: "Escriba un algoritmo que lea la edad de una persona e imprima su clasificación de grupo etario de la siguiente forma: si es menor de 18 años, debe imprimir 'MENOR DE EDAD'; si tiene entre 18 y 64 años (inclusive), debe imprimir 'ADULTO'; si tiene 65 años o más, debe imprimir 'ADULTO MAYOR'.",
    puntosMaximos: 2.5,
    solucionOficial: {
      pseudocodigo: `ALGORITMO ClasificarEdad
DECLARACIÓN
VARIABLES
  edad: entero
INICIO
  ESCRIBIR "Ingrese la edad de la persona:"
  LEER edad
  SI (edad < 18) ENTONCES
    ESCRIBIR "MENOR DE EDAD"
  SINO
    SI (edad >= 18 Y edad <= 64) ENTONCES
      ESCRIBIR "ADULTO"
    SINO
      ESCRIBIR "ADULTO MAYOR"
    FIN SI
  FIN SI
FIN`,
      c: `#include <stdio.h>

int main() {
    int edad;
    printf("Ingrese la edad de la persona:\\n");
    scanf("%d", &edad);
    if (edad < 18) {
        printf("MENOR DE EDAD\\n");
    } else {
        if (edad >= 18 && edad <= 64) {
            printf("ADULTO\\n");
        } else {
            printf("ADULTO MAYOR\\n");
        }
    }
    return 0;
}`,
      typescript: `function clasificarEdad(edad: number): string {
  if (edad < 18) {
    return "MENOR DE EDAD";
  } else if (edad >= 18 && edad <= 64) {
    return "ADULTO";
  } else {
    return "ADULTO MAYOR";
  }
}`
    }
  },
  {
    id: "pe_anid_02",
    categoria: "anidados",
    numero: 6,
    enunciado: "Escriba un algoritmo que lea tres valores reales positivos que representan los lados de un triángulo (ladoA, ladoB, ladoC). Primero, verifique si los lados forman un triángulo válido (la suma de dos lados cualesquiera debe ser estrictamente mayor que el tercer lado; es decir: A+B>C y A+C>B y B+C>A). Si no es válido, imprima 'TRIANGULO INVALIDO'. Si es un triángulo válido, determine y muestre si es 'EQUILATERO' (tres lados iguales), 'ISOSCELES' (dos lados iguales y uno diferente) o 'ESCALENO' (tres lados diferentes).",
    puntosMaximos: 2.5,
    solucionOficial: {
      pseudocodigo: `ALGORITMO TipoTriangulo
DECLARACIÓN
VARIABLES
  a, b, c: real
INICIO
  ESCRIBIR "Ingrese el lado A:"
  LEER a
  ESCRIBIR "Ingrese el lado B:"
  LEER b
  ESCRIBIR "Ingrese el lado C:"
  LEER c
  SI (a + b > c Y a + c > b Y b + c > a) ENTONCES
    SI (a = b Y b = c) ENTONCES
      ESCRIBIR "EQUILATERO"
    SINO
      SI (a = b O a = c O b = c) ENTONCES
        ESCRIBIR "ISOSCELES"
      SINO
        ESCRIBIR "ESCALENO"
      FIN SI
    FIN SI
  SINO
    ESCRIBIR "TRIANGULO INVALIDO"
  FIN SI
FIN`,
      c: `#include <stdio.h>

int main() {
    float a, b, c;
    printf("Ingrese el lado A:\\n");
    scanf("%f", &a);
    printf("Ingrese el lado B:\\n");
    scanf("%f", &b);
    printf("Ingrese el lado C:\\n");
    scanf("%f", &c);
    
    if (a + b > c && a + c > b && b + c > a) {
        if (a == b && b == c) {
            printf("EQUILATERO\\n");
        } else if (a == b || a == c || b == c) {
            printf("ISOSCELES\\n");
        } else {
            printf("ESCALENO\\n");
        }
    } else {
        printf("TRIANGULO INVALIDO\\n");
    }
    return 0;
}`,
      typescript: `function determinarTriangulo(a: number, b: number, c: number): string {
  if (a + b > c && a + c > b && b + c > a) {
    if (a === b && b === c) {
      return "EQUILATERO";
    } else if (a === b || a === c || b === c) {
      return "ISOSCELES";
    } else {
      return "ESCALENO";
    }
  } else {
    return "TRIANGULO INVALIDO";
  }
}`
    }
  },
  {
    id: "pe_starwars_01",
    categoria: "ciclos-sencillos",
    numero: 7,
    enunciado: "Una nave rebelde emprende una misión crítica, cruzando un sector espacial dividido en 10 zonas. La energía de la nave es vital para su supervivencia y está sujeta a los encuentros que tenga en cada zona. Consideraciones:\n- La energía inicial de la nave será un valor proporcionado por el usuario (siempre mayor a 0).\n- En cada zona, se conocerá el número de patrullas imperiales presentes (dato ingresado por el usuario).\n- Las interacciones con las patrullas afectan la energía de la nave: Si hay más de 5 patrullas, la nave pierde el 10% de su energía. Si hay 0 patrullas, la nave recarga el 5% de su energía.\n- Al finalizar el recorrido por las 10 zonas, se debe informar la energía final de la nave.\n- Además, si la energía final de la nave es inferior al 50% de su energía inicial, se debe emitir una alerta de evacuación inmediata.",
    puntosMaximos: 3,
    solucionOficial: {
      pseudocodigo: `ALGORITMO NaveRebelde
DECLARACIÓN
VARIABLES
  energiaInicial, energiaActual: real
  patrullas, i: entero
INICIO
  ESCRIBIR "Ingrese la energia inicial de la nave:"
  LEER energiaInicial
  energiaActual <- energiaInicial
  
  PARA i <- 1 HASTA 10 CON PASO 1 HACER
    ESCRIBIR "Ingrese el numero de patrullas imperiales en la zona ", i, ":"
    LEER patrullas
    SI (patrullas > 5) ENTONCES
      energiaActual <- energiaActual * 0.90
    SINO
      SI (patrullas = 0) ENTONCES
        energiaActual <- energiaActual * 1.05
      FIN SI
    FIN SI
  FIN PARA
  
  ESCRIBIR "La energia final de la nave es: ", energiaActual
  
  SI (energiaActual < energiaInicial * 0.50) ENTONCES
    ESCRIBIR "ALERTA: EVACUACION INMEDIATA!"
  FIN SI
FIN`,
      c: `#include <stdio.h>

int main() {
    float energiaInicial, energiaActual;
    int patrullas, i;
    
    printf("Ingrese la energia inicial de la nave:\\n");
    scanf("%f", &energiaInicial);
    energiaActual = energiaInicial;
    
    for (i = 1; i <= 10; i++) {
        printf("Ingrese el numero de patrullas imperiales en la zona %d:\\n", i);
        scanf("%d", &patrullas);
        if (patrullas > 5) {
            energiaActual = energiaActual * 0.90;
        } else if (patrullas == 0) {
            energiaActual = energiaActual * 1.05;
        }
    }
    
    printf("La energia final de la nave es: %.2f\\n", energiaActual);
    if (energiaActual < energiaInicial * 0.50) {
        printf("ALERTA: EVACUACION INMEDIATA!\\n");
    }
    
    return 0;
}`,
      typescript: `function evaluarNaveRebelde(energiaInicial: number, patrullasPorZona: number[]): { energiaFinal: number, evacuacion: boolean } {
  let energiaActual = energiaInicial;
  for (let i = 0; i < 10; i++) {
    const patrullas = patrullasPorZona[i] || 0;
    if (patrullas > 5) {
      energiaActual *= 0.90;
    } else if (patrullas === 0) {
      energiaActual *= 1.05;
    }
  }
  const evacuacion = energiaActual < energiaInicial * 0.50;
  return { energiaFinal: energiaActual, evacuacion };
}`
    }
  },
  {
    id: "pe_starwars_02",
    categoria: "lectura-escritura-asignacion",
    numero: 8,
    enunciado: "Luke Skywalker necesita determinar la distancia entre dos puntos en el espacio tridimensional para planificar una ruta crucial. Tarea: Calcula la distancia entre dos puntos, P1(x1,y1,z1) y P2(x2,y2,z2), dadas sus coordenadas. La fórmula a emplear es:\nd = sqrt((x2 - x1)^2 + (y2 - y1)^2 + (z2 - z1)^2)",
    puntosMaximos: 2,
    solucionOficial: {
      pseudocodigo: `ALGORITMO Distancia3D
DECLARACIÓN
VARIABLES
  x1, y1, z1, x2, y2, z2, d: real
INICIO
  ESCRIBIR "Ingrese las coordenadas de P1 (x1, y1, z1):"
  LEER x1
  LEER y1
  LEER z1
  ESCRIBIR "Ingrese las coordenadas de P2 (x2, y2, z2):"
  LEER x2
  LEER y2
  LEER z2
  
  d <- RaizCuadrada((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) + (z2 - z1) * (z2 - z1))
  
  ESCRIBIR "La distancia entre P1 y P2 es: ", d
FIN`,
      c: `#include <stdio.h>
#include <math.h>

int main() {
    float x1, y1, z1, x2, y2, z2, d;
    printf("Ingrese las coordenadas de P1 (x1, y1, z1):\\n");
    scanf("%f %f %f", &x1, &y1, &z1);
    printf("Ingrese las coordenadas de P2 (x2, y2, z2):\\n");
    scanf("%f %f %f", &x2, &y2, &z2);
    
    d = sqrt((x2 - x1)*(x2 - x1) + (y2 - y1)*(y2 - y1) + (z2 - z1)*(z2 - z1));
    printf("La distancia entre P1 y P2 es: %.2f\\n", d);
    
    return 0;
}`,
      typescript: `function calcularDistancia3D(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
}`
    }
  },
  {
    id: "pe_starwars_03",
    categoria: "matematico-logico",
    numero: 9,
    enunciado: "Para activar su nuevo sable de luz, Luke debe generar una cantidad específica de energía, que se obtiene al elevar una base de energía a un nivel de enfoque Jedi (exponente).\nTarea: Calcula la energía necesaria para activar el sable de luz, dadas una base y un exponente proporcionados por el usuario. El exponente será un número entero no negativo. (No puede usar el operador **)",
    puntosMaximos: 2,
    solucionOficial: {
      pseudocodigo: `ALGORITMO ActivacionSable
DECLARACIÓN
VARIABLES
  base, resultado: real
  exponente, i: entero
INICIO
  ESCRIBIR "Ingrese la base de energia (real):"
  LEER base
  ESCRIBIR "Ingrese el exponente de enfoque Jedi (entero no negativo):"
  LEER exponente
  
  resultado <- 1.0
  
  PARA i <- 1 HASTA exponente CON PASO 1 HACER
    resultado <- resultado * base
  FIN PARA
  
  ESCRIBIR "La energia necesaria para activar el sable de luz es: ", resultado
FIN`,
      c: `#include <stdio.h>

int main() {
    float base, resultado;
    int exponente, i;
    
    printf("Ingrese la base de energia:\\n");
    scanf("%f", &base);
    printf("Ingrese el exponente de enfoque Jedi:\\n");
    scanf("%d", &exponente);
    
    resultado = 1.0;
    for (i = 1; i <= exponente; i++) {
        resultado = resultado * base;
    }
    
    printf("La energia necesaria para activar el sable de luz es: %.2f\\n", resultado);
    return 0;
}`,
      typescript: `function calcularEnergiaSable(base: number, exponente: number): number {
  let resultado = 1.0;
  for (let i = 0; i < exponente; i++) {
    resultado *= base;
  }
  return resultado;
}`
    }
  },
  {
    id: "pe_starwars_04",
    categoria: "ciclos-largos",
    numero: 10,
    enunciado: "Luke Skywalker debe seleccionar un equipo de guerreros para una nueva misión. Ha convocado a diez aspirantes Jedi, quienes se someterán a tres pruebas clave: control de emociones, manejo de la Fuerza y habilidad con el sable de luz. Cada prueba se evalúa en una escala del 1 al 10. Consideraciones para la afinidad de cada candidato:\n- Promedio mayor a 7 puntos: Guerrero del Lado Luminoso (fuerte dominio en equilibrio)\n- Promedio entre 4 y 7 puntos (inclusive): Indefinido (nivel aceptable, pero con riesgos de inestabilidad)\n- Promedio menor a 4 puntos: Lado Oscuro (bajo control y más susceptible a emociones)\nTarea: Después de evaluar a los diez aspirantes, determina la composición final del equipo de Luke y evalúa el destino de la galaxia.\n- Si la mayoría son Guerreros del Lado Luminoso, la misión tendrá esperanza.\n- Si la mayoría son del Lado Oscuro, el peligro será inminente.\n- Si predominan los Indefinidos, el destino de la galaxia quedará en la incertidumbre.",
    puntosMaximos: 3,
    solucionOficial: {
      pseudocodigo: `ALGORITMO EquipoJedi
DECLARACIÓN
VARIABLES
  i: entero
  nota1, nota2, nota3, promedio: real
  luminoso, indefinido, oscuro: entero
INICIO
  luminoso <- 0
  indefinido <- 0
  oscuro <- 0
  
  PARA i <- 1 HASTA 10 CON PASO 1 HACER
    ESCRIBIR "Ingrese las 3 notas del aspirante ", i, ":"
    LEER nota1
    LEER nota2
    LEER nota3
    
    promedio <- (nota1 + nota2 + nota3) / 3.0
    
    SI (promedio > 7) ENTONCES
      luminoso <- luminoso + 1
      ESCRIBIR "Aspirante ", i, ": Lado Luminoso"
    SINO
      SI (promedio >= 4 Y promedio <= 7) ENTONCES
        indefinido <- indefinido + 1
        ESCRIBIR "Aspirante ", i, ": Indefinido"
      SINO
        oscuro <- oscuro + 1
        ESCRIBIR "Aspirante ", i, ": Lado Oscuro"
      FIN SI
    FIN SI
  FIN PARA
  
  ESCRIBIR "Cantidad de Guerreros del Lado Luminoso: ", luminoso
  ESCRIBIR "Cantidad de Aspirantes Indefinidos: ", indefinido
  ESCRIBIR "Cantidad de Aspirantes del Lado Oscuro: ", oscuro
  
  SI (luminoso > oscuro Y luminoso > indefinido) ENTONCES
    ESCRIBIR "La mision tendra esperanza."
  SINO
    SI (oscuro > luminoso Y oscuro > indefinido) ENTONCES
      ESCRIBIR "El peligro sera inminente."
    SINO
      ESCRIBIR "El destino de la galaxia quedara en la incertidumbre."
    FIN SI
  FIN SI
FIN`,
      c: `#include <stdio.h>

int main() {
    int i;
    float nota1, nota2, nota3, promedio;
    int luminoso = 0, indefinido = 0, oscuro = 0;
    
    for (i = 1; i <= 10; i++) {
        printf("Ingrese las 3 notas del aspirante %d:\\n", i);
        scanf("%f %f %f", &nota1, &nota2, &nota3);
        
        promedio = (nota1 + nota2 + nota3) / 3.0;
        
        if (promedio > 7.0) {
            luminoso++;
            printf("Aspirante %d: Lado Luminoso\\n", i);
        } else if (promedio >= 4.0 && promedio <= 7.0) {
            indefinido++;
            printf("Aspirante %d: Indefinido\\n", i);
        } else {
            oscuro++;
            printf("Aspirante %d: Lado Oscuro\\n", i);
        }
    }
    
    printf("Cantidad de Guerreros del Lado Luminoso: %d\\n", luminoso);
    printf("Cantidad de Aspirantes Indefinidos: %d\\n", indefinido);
    printf("Cantidad de Aspirantes del Lado Oscuro: %d\\n", oscuro);
    
    if (luminoso > oscuro && luminoso > indefinido) {
        printf("La mision tendra esperanza.\\n");
    } else if (oscuro > luminoso && oscuro > indefinido) {
        printf("El peligro sera inminente.\\n");
    } else {
        printf("El destino de la galaxia quedara en la incertidumbre.\\n");
    }
    
    return 0;
}`,
      typescript: `interface JediEvaluationResult {
  luminosos: number;
  indefinidos: number;
  oscuros: number;
  veredicto: string;
}

function evaluarEquipoJedi(aspirantesNotas: [number, number, number][]): JediEvaluationResult {
  let luminosos = 0;
  let indefinidos = 0;
  let oscuros = 0;
  
  for (let i = 0; i < 10; i++) {
    const [n1, n2, n3] = aspirantesNotas[i] || [0, 0, 0];
    const promedio = (n1 + n2 + n3) / 3;
    if (promedio > 7) {
      luminosos++;
    } else if (promedio >= 4 && promedio <= 7) {
      indefinidos++;
    } else {
      oscuros++;
    }
  }
  
  let veredicto = "El destino de la galaxia quedara en la incertidumbre.";
  if (luminosos > oscuros && luminosos > indefinidos) {
    veredicto = "La mision tendra esperanza.";
  } else if (oscuros > luminosos && oscuros > indefinidos) {
    veredicto = "El peligro sera inminente.";
  }
  
  return { luminosos, indefinidos, oscuros, veredicto };
}`
    }
  }
];

export const parcialesConfig: ParcialConfig[] = [
  {
    id: "parcial_1_seleccion",
    titulo: "Evaluación Core · Parcial 1",
    descripcion: "Evaluación teórica-práctica correspondiente a Estructuras Secuenciales y de Selección (Simples, Dobles, Múltiples y Anidadas). Consta de 4 ejercicios seleccionados al azar de distintas categorías.",
    tipo: "aleatorio",
    reglasAleatorias: [
      { categoria: "secuenciales", cantidad: 1 },
      { categoria: "seleccion-doble", cantidad: 1 },
      { categoria: "seleccion-multiple", cantidad: 1 },
      { categoria: "anidados", cantidad: 1 }
    ]
  },
  {
    id: "parcial_1_2025",
    titulo: "Parcial I 2025",
    descripcion: "Evaluación práctica de Star Wars que cubre: 1) Ciclos-Sencillos, 2) Lectura, Escritura y Asignación, 3) Matemático-Lógico, 4) Ciclos-Largos. Consta de 4 ejercicios temáticos fijos.",
    tipo: "fijo",
    ejerciciosFijos: ["pe_starwars_01", "pe_starwars_02", "pe_starwars_03", "pe_starwars_04"]
  }
];
