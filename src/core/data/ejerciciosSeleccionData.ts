import { Exercise } from '../types/exercise.types';

export const ejerciciosSeleccionData: Exercise[] = [
  {
    numero: 1,
    enunciado: "Dadas dos variables día y mes que representan una fecha, proponga un algoritmo para determinar si se trata de una fecha válida.",
    pseudocodigo: `Algoritmo Fecha_Valida
Declaración
  Variables:
    dia, mes: Entero
    esValida: Logico
Inicio
  Escribir "Ingrese el día:"
  Leer dia
  Escribir "Ingrese el mes:"
  Leer mes
  
  esValida <- Falso
  
  Si (mes >= 1 Y mes <= 12) Entonces
    Caso mes
      1, 3, 5, 7, 8, 10, 12:
        Si (dia >= 1 Y dia <= 31) Entonces
          esValida <- Verdadero
        Fin Si
      4, 6, 9, 11:
        Si (dia >= 1 Y dia <= 30) Entonces
          esValida <- Verdadero
        Fin Si
      2:
        // Asumiendo año no bisiesto para simplificar
        Si (dia >= 1 Y dia <= 28) Entonces
          esValida <- Verdadero
        Fin Si
    Fin Caso
  Fin Si
  
  Si (esValida = Verdadero) Entonces
    Escribir "La fecha es válida."
  Sino
    Escribir "La fecha NO es válida."
  Fin Si
Fin`,
    c: `#include <stdio.h>\n#include <stdbool.h>\n\nint main() {\n    int dia, mes;\n    bool esValida = false;\n    \n    printf("Ingrese el día: ");\n    scanf("%d", &dia);\n    printf("Ingrese el mes: ");\n    scanf("%d", &mes);\n    \n    if (mes >= 1 && mes <= 12) {\n        switch(mes) {\n            case 1: case 3: case 5: case 7: case 8: case 10: case 12:\n                if (dia >= 1 && dia <= 31) esValida = true;\n                break;\n            case 4: case 6: case 9: case 11:\n                if (dia >= 1 && dia <= 30) esValida = true;\n                break;\n            case 2:\n                if (dia >= 1 && dia <= 28) esValida = true;\n                break;\n        }\n    }\n    \n    if (esValida) printf("La fecha es válida.\\n");\n    else printf("La fecha NO es válida.\\n");\n    \n    return 0;\n}`,
    typescript: `function validarFecha(dia: number, mes: number): void {\n    let esValida = false;\n    if (mes >= 1 && mes <= 12) {\n        const dias31 = [1, 3, 5, 7, 8, 10, 12];\n        const dias30 = [4, 6, 9, 11];\n        if (dias31.includes(mes) && dia >= 1 && dia <= 31) esValida = true;\n        else if (dias30.includes(mes) && dia >= 1 && dia <= 30) esValida = true;\n        else if (mes === 2 && dia >= 1 && dia <= 28) esValida = true;\n    }\n    console.log(esValida ? "Válida" : "Inválida");\n}`
  },
  {
    numero: 2,
    enunciado: "Escriba un algoritmo que lea 3 números y determine si uno de ellos es equivalente al resultado de la suma de los otros dos.",
    pseudocodigo: `Algoritmo Suma_Equivalente
Declaración
  Variables:
    A, B, C: Real
Inicio
  Escribir "Ingrese el primer número (A):"
  Leer A
  Escribir "Ingrese el segundo número (B):"
  Leer B
  Escribir "Ingrese el tercer número (C):"
  Leer C
  
  Si (A = B + C) O (B = A + C) O (C = A + B) Entonces
    Escribir "Existe un número que es la suma de los otros dos."
  Sino
    Escribir "No se cumple la condición."
  Fin Si
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    float a, b, c;\n    printf("A: "); scanf("%f", &a);\n    printf("B: "); scanf("%f", &b);\n    printf("C: "); scanf("%f", &c);\n    \n    if (a == b + c || b == a + c || c == a + b) {\n        printf("Se cumple la condición.\\n");\n    } else {\n        printf("No se cumple.\\n");\n    }\n    return 0;\n}`,
    typescript: `function sumaEquivalente(a: number, b: number, c: number): boolean {\n    return a === b + c || b === a + c || c === a + b;\n}`
  },
  {
    numero: 3,
    enunciado: "Escriba un algoritmo que lea tres números enteros y asigne el valor lógico apropiado a las variables booleanas (Triangulo, Equilátero, Isósceles y Escaleno) y muestre como resultado un mensaje 'Es un triángulo' y su tipo, o 'No es un triángulo', según corresponda.",
    pseudocodigo: `Algoritmo Clasificar_Triangulo_Bool
Declaración
  Variables:
    a, b, c: Entero
    Triangulo, Equilatero, Isosceles, Escaleno: Logico
Inicio
  Escribir "Ingrese lado a:"
  Leer a
  Escribir "Ingrese lado b:"
  Leer b
  Escribir "Ingrese lado c:"
  Leer c
  
  // Inicialización
  Triangulo <- Falso
  Equilatero <- Falso
  Isosceles <- Falso
  Escaleno <- Falso
  
  // Verificación de existencia
  Si (a + b > c) Y (a + c > b) Y (b + c > a) Entonces
    Triangulo <- Verdadero
    
    Si (a = b) Y (b = c) Entonces
      Equilatero <- Verdadero
      Escribir "Es un triángulo Equilátero."
    Sino
      Si (a = b) O (b = c) O (a = c) Entonces
        Isosceles <- Verdadero
        Escribir "Es un triángulo Isósceles."
      Sino
        Escaleno <- Verdadero
        Escribir "Es un triángulo Escaleno."
      Fin Si
    Fin Si
  Sino
    Escribir "No es un triángulo."
  Fin Si
Fin`,
    c: `#include <stdio.h>\n#include <stdbool.h>\n\nint main() {\n    int a, b, c;\n    bool Triangulo = false, Equilatero = false, Isosceles = false, Escaleno = false;\n    \n    printf("Lados: "); scanf("%d %d %d", &a, &b, &c);\n    \n    if (a + b > c && a + c > b && b + c > a) {\n        Triangulo = true;\n        if (a == b && b == c) {\n            Equilatero = true;\n            printf("Es un triángulo Equilátero.\\n");\n        } else if (a == b || b == c || a == c) {\n            Isosceles = true;\n            printf("Es un triángulo Isósceles.\\n");\n        } else {\n            Escaleno = true;\n            printf("Es un triángulo Escaleno.\\n");\n        }\n    } else {\n        printf("No es un triángulo.\\n");\n    }\n    return 0;\n}`,
    typescript: `function clasificarTriangulo(a: number, b: number, c: number): void {\n    let Triangulo = (a + b > c && a + c > b && b + c > a);\n    if (Triangulo) {\n        if (a === b && b === c) console.log("Equilátero");\n        else if (a === b || b === c || a === c) console.log("Isósceles");\n        else console.log("Escaleno");\n    } else {\n        console.log("No es triángulo");\n    }\n}`
  },
  {
    numero: 4,
    enunciado: "Determine si un estudiante es apto o no para un ingreso. Si la nota está por debajo de 10, no es apto. Si está por encima de 10 podrá ingresar si su edad es menor o igual a 20 años.",
    pseudocodigo: `Algoritmo Ingreso_Curso
Declaración
  Variables:
    nota: Real
    edad: Entero
Inicio
  Escribir "Ingrese la nota alcanzada:"
  Leer nota
  Escribir "Ingrese la edad del estudiante:"
  Leer edad
  
  Si (nota > 10) Entonces
    Si (edad <= 20) Entonces
      Escribir "Apto para ingresar al curso."
    Sino
      Escribir "No es apto por edad (mayor de 20)."
    Fin Si
  Sino
    Escribir "No es apto por nota (menor o igual a 10)."
  Fin Si
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    float nota;\n    int edad;\n    printf("Nota: "); scanf("%f", &nota);\n    printf("Edad: "); scanf("%d", &edad);\n    \n    if (nota > 10) {\n        if (edad <= 20) printf("Apto.\\n");\n        else printf("No apto por edad.\\n");\n    } else {\n        printf("No apto por nota.\\n");\n    }\n    return 0;\n}`,
    typescript: `function esApto(nota: number, edad: number): string {\n    if (nota > 10) {\n        return edad <= 20 ? "Apto" : "No apto (edad)";\n    }\n    return "No apto (nota)";\n}`
  },
  {
    numero: 5,
    enunciado: "Proponga un algoritmo para calcular la edad actual de una persona, tomando en cuenta la fecha actual y la fecha de nacimiento de la persona.",
    pseudocodigo: `Algoritmo Calcular_Edad_Exacta
Declaración
  Variables:
    dActual, mActual, aActual: Entero
    dNac, mNac, aNac: Entero
    edad: Entero
Inicio
  Escribir "Ingrese día, mes y año actual (separados por espacio):"
  Leer dActual, mActual, aActual
  Escribir "Ingrese día, mes y año de nacimiento:"
  Leer dNac, mNac, aNac
  
  edad <- aActual - aNac
  
  Si (mActual < mNac) Entonces
    edad <- edad - 1
  Sino
    Si (mActual = mNac) Y (dActual < dNac) Entonces
      edad <- edad - 1
    Fin Si
  Fin Si
  
  Escribir "La edad actual es: ", edad, " años."
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    int da, ma, aa, dn, mn, an, edad;\n    printf("Fecha Actual (d m a): "); scanf("%d %d %d", &da, &ma, &aa);\n    printf("Fecha Nacimiento (d m a): "); scanf("%d %d %d", &dn, &mn, &an);\n    \n    edad = aa - an;\n    if (ma < mn || (ma == mn && da < dn)) {\n        edad--;\n    }\n    \n    printf("Edad: %d años\\n", edad);\n    return 0;\n}`,
    typescript: `function calcularEdad(actual: Date, nac: Date): number {\n    let edad = actual.getFullYear() - nac.getFullYear();\n    const m = actual.getMonth() - nac.getMonth();\n    if (m < 0 || (m === 0 && actual.getDate() < nac.getDate())) {\n        edad--;\n    }\n    return edad;\n}`
  },
  {
    numero: 6,
    enunciado: "Se requiere un algoritmo para indicar el mensaje correspondiente a un paciente según su temperatura actual.",
    pseudocodigo: `Algoritmo Mensaje_Temperatura
Declaración
  Variables:
    temp: Real
Inicio
  Escribir "Ingrese la temperatura del paciente:"
  Leer temp
  
  Si (temp > 39) Entonces
    Escribir "Llamar al doctor."
  Sino
    Si (temp >= 38.5) Entonces
      Escribir "Debe tomar una medicina para la fiebre y guardar reposo."
    Sino
      Si (temp > 37) Entonces
        Escribir "Todo está bien."
      Sino
        Escribir "Temperatura normal o baja."
      Fin Si
    Fin Si
  Fin Si
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    float temp;\n    printf("Temperatura: "); scanf("%f", &temp);\n    \n    if (temp > 39.0) printf("Llamar al doctor.\\n");\n    else if (temp >= 38.5) printf("Tomar medicina y reposo.\\n");\n    else if (temp > 37.0) printf("Todo está bien.\\n");\n    else printf("Normal.\\n");\n    \n    return 0;\n}`,
    typescript: `function diagnostico(temp: number): string {\n    if (temp > 39) return "Llamar al doctor";\n    if (temp >= 38.5) return "Medicina y reposo";\n    if (temp > 37) return "Todo bien";\n    return "Normal";\n}`
  },
  {
    numero: 7,
    enunciado: "Proponga en un algoritmo la determinación del signo zodiacal de una persona tomando en cuenta su día y mes de nacimiento.",
    pseudocodigo: `Algoritmo Signo_Zodiacal
Declaración
  Variables:
    dia, mes: Entero
Inicio
  Escribir "Ingrese su día de nacimiento:"
  Leer dia
  Escribir "Ingrese su mes de nacimiento (1-12):"
  Leer mes
  
  Caso mes
    1: Si (dia <= 19) Entonces Escribir "Capricornio" Sino Escribir "Acuario" Fin Si
    2: Si (dia <= 18) Entonces Escribir "Acuario" Sino Escribir "Piscis" Fin Si
    3: Si (dia <= 20) Entonces Escribir "Piscis" Sino Escribir "Aries" Fin Si
    4: Si (dia <= 19) Entonces Escribir "Aries" Sino Escribir "Tauro" Fin Si
    5: Si (dia <= 20) Entonces Escribir "Tauro" Sino Escribir "Géminis" Fin Si
    6: Si (dia <= 20) Entonces Escribir "Géminis" Sino Escribir "Cáncer" Fin Si
    7: Si (dia <= 22) Entonces Escribir "Cáncer" Sino Escribir "Leo" Fin Si
    8: Si (dia <= 22) Entonces Escribir "Leo" Sino Escribir "Virgo" Fin Si
    9: Si (dia <= 22) Entonces Escribir "Virgo" Sino Escribir "Libra" Fin Si
    10: Si (dia <= 22) Entonces Escribir "Libra" Sino Escribir "Escorpio" Fin Si
    11: Si (dia <= 21) Entonces Escribir "Escorpio" Sino Escribir "Sagitario" Fin Si
    12: Si (dia <= 21) Entonces Escribir "Sagitario" Sino Escribir "Capricornio" Fin Si
  Fin Caso
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    int d, m;\n    printf("Día y Mes: "); scanf("%d %d", &d, &m);\n    \n    if ((m==3 && d>=21) || (m==4 && d<=19)) printf("Aries\\n");\n    else if ((m==4 && d>=20) || (m==5 && d<=20)) printf("Tauro\\n");\n    else if ((m==5 && d>=21) || (m==6 && d<=20)) printf("Géminis\\n");\n    // ... simplificado por espacio\n    else printf("Otros signos...\\n");\n    return 0;\n}`,
    typescript: `function obtenerSigno(dia: number, mes: number): string {\n    const signos = ["Capricornio", "Acuario", "Piscis", "Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario"];\n    const fechas = [19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21];\n    return (dia > fechas[mes-1]) ? signos[mes % 12] : signos[mes-1];\n}`
  },
  {
    numero: 8,
    enunciado: "Elabore un algoritmo que lea la edad de 3 personas y determine si existe un patrón de diferencia entre dichas edades.",
    pseudocodigo: `Algoritmo Patron_Edades
Declaración
  Variables:
    e1, e2, e3: Entero
    diff1, diff2: Entero
Inicio
  Escribir "Ingrese edad 1:"
  Leer e1
  Escribir "Ingrese edad 2:"
  Leer e2
  Escribir "Ingrese edad 3:"
  Leer e3
  
  diff1 <- e2 - e1
  diff2 <- e3 - e2
  
  Si (diff1 = diff2) Entonces
    Escribir "Existe un patrón de diferencia constante de: ", diff1
  Sino
    Escribir "No existe un patrón de diferencia constante."
  Fin Si
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    int e1, e2, e3;\n    printf("3 edades: "); scanf("%d %d %d", &e1, &e2, &e3);\n    if ((e2 - e1) == (e3 - e2)) printf("Patrón constante.\\n");\n    else printf("Sin patrón.\\n");\n    return 0;\n}`,
    typescript: `function hayPatron(e1: number, e2: number, e3: number): boolean {\n    return (e2 - e1) === (e3 - e2);\n}`
  },
  {
    numero: 9,
    enunciado: "Elabore un algoritmo que lea la edad de dos hermanos para determinar la edad del mayor y la diferencia de edad con respecto al otro hermano.",
    pseudocodigo: `Algoritmo Diferencia_Hermanos
Declaración
  Variables:
    edad1, edad2, diferencia: Entero
Inicio
  Escribir "Ingrese la edad del primer hermano:"
  Leer edad1
  Escribir "Ingrese la edad del segundo hermano:"
  Leer edad2
  
  Si (edad1 > edad2) Entonces
    diferencia <- edad1 - edad2
    Escribir "El primero es el mayor por ", diferencia, " años."
  Sino
    Si (edad2 > edad1) Entonces
      diferencia <- edad2 - edad1
      Escribir "El segundo es el mayor por ", diferencia, " años."
    Sino
      Escribir "Tienen la misma edad."
    Fin Si
  Fin Si
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    int e1, e2;\n    printf("Edades: "); scanf("%d %d", &e1, &e2);\n    if (e1 > e2) printf("Mayor: %d, Diff: %d\\n", e1, e1-e2);\n    else if (e2 > e1) printf("Mayor: %d, Diff: %d\\n", e2, e2-e1);\n    else printf("Iguales\\n");\n    return 0;\n}`,
    typescript: `function compararHermanos(e1: number, e2: number): void {\n    if (e1 === e2) console.log("Iguales");\n    else console.log(\`Mayor: \${Math.max(e1, e2)}, Diferencia: \${Math.abs(e1 - e2)}\`);\n}`
  },
  {
    numero: 10,
    enunciado: "Calcular el descuento y el monto a pagar por un medicamento si todos los medicamentos cuya fecha de caducidad está a menos de 2 meses de la fecha actual, tienen un descuento del 65%.",
    pseudocodigo: `Algoritmo Descuento_Farmacia
Declaración
  Variables:
    precio, descuento, total: Real
    mesesCaducidad: Entero
Inicio
  Escribir "Ingrese el precio del medicamento:"
  Leer precio
  Escribir "Ingrese cuántos meses faltan para que caduque:"
  Leer mesesCaducidad
  
  Si (mesesCaducidad < 2) Entonces
    descuento <- precio * 0.65
    Escribir "Aplica descuento del 65%."
  Sino
    descuento <- 0
    Escribir "No aplica descuento."
  Fin Si
  
  total <- precio - descuento
  Escribir "Descuento: Bs. ", descuento
  Escribir "Total a pagar: Bs. ", total
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    float precio, desc, total;\n    int meses;\n    printf("Precio: "); scanf("%f", &precio);\n    printf("Meses para caducar: "); scanf("%d", &meses);\n    \n    desc = (meses < 2) ? precio * 0.65 : 0;\n    total = precio - desc;\n    \n    printf("Descuento: %.2f, Total: %.2f\\n", desc, total);\n    return 0;\n}`,
    typescript: `function calcularDescuento(precio: number, meses: number): number {\n    const desc = meses < 2 ? precio * 0.65 : 0;\n    return precio - desc;\n}`
  }
];
