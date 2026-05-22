import { Exercise } from '../types/exercise.types';

export const ejerciciosSeleccion2Data: Exercise[] = [
  {
    numero: 11,
    enunciado: `Realice cinco (5) corridas en frío del siguiente algoritmo, considere en cada prueba los siguientes valores correspondientes a cada examen: (10, 5 y 6); (-1, 10 y 5.3); (5, 5 y 5); (9, 4 y 5.9); (10, 5 y 11). Implemente el algoritmo CALCULONOTAS que calcula la nota definitiva de un estudiante usando los porcentajes: PORC1=0.35, PORC2=0.40, PORC3=0.25. Si la BASE100 está entre 40 y 44 y algún examen tiene 7 o más puntos, se le suman 5 puntos adicionales. El estudiante aprueba si su BASE100 >= 45.`,
    pseudocodigo: `Algoritmo CalculoNotas
Declaración
  Constantes
    PORC1 = 0.35
    PORC2 = 0.40
    PORC3 = 0.25
  Variables
    EXAM1, EXAM2, EXAM3: Real
    NOTA1, NOTA2, NOTA3: Real
    DEFI, BASE100: Real
    RESPUESTA: Caracter

Inicio
  Escribir "ALGORITMO QUE CALCULA LA NOTA DEFINITIVA DE UN ESTUDIANTE"
  Escribir "INTRODUZCA LA NOTA DEL EXAMEN 1"
  Leer EXAM1
  Escribir "INTRODUZCA LA NOTA DEL EXAMEN 2"
  Leer EXAM2
  Escribir "INTRODUZCA LA NOTA DEL EXAMEN 3"
  Leer EXAM3

  Si (EXAM1 >= 0 Y EXAM2 >= 0 Y EXAM3 >= 0 Y EXAM1 <= 10 Y EXAM2 <= 10 Y EXAM3 <= 10) Entonces
    NOTA1 <- EXAM1 * PORC1
    NOTA2 <- EXAM2 * PORC2
    NOTA3 <- EXAM3 * PORC3
    DEFI <- NOTA1 + NOTA2 + NOTA3
    BASE100 <- DEFI * 10

    Si (BASE100 >= 40 Y BASE100 <= 44) Entonces
      Si (EXAM1 >= 7 O EXAM2 >= 7 O EXAM3 >= 7) Entonces
        BASE100 <- BASE100 + 5
      Fin Si
    Fin Si

    Si (BASE100 >= 45) Entonces
      RESPUESTA <- "APROBÓ"
    Sino
      RESPUESTA <- "REPROBÓ"
    Fin Si

    Escribir "EL ESTUDIANTE ", RESPUESTA, " LA MATERIA CON ", BASE100 / 10, " PUNTOS"
  Sino
    Escribir "ERROR, LAS NOTAS DE LOS EXÁMENES DEBEN SER VALORES ENTRE 0 Y 10"
  Fin Si
Fin`,
    c: `#include <stdio.h>

int main() {
    const double PORC1 = 0.35, PORC2 = 0.40, PORC3 = 0.25;
    double EXAM1, EXAM2, EXAM3;
    double NOTA1, NOTA2, NOTA3, DEFI, BASE100;
    char *RESPUESTA;

    printf("ALGORITMO QUE CALCULA LA NOTA DEFINITIVA DE UN ESTUDIANTE\\n");
    printf("INTRODUZCA LA NOTA DEL EXAMEN 1: ");
    scanf("%lf", &EXAM1);
    printf("INTRODUZCA LA NOTA DEL EXAMEN 2: ");
    scanf("%lf", &EXAM2);
    printf("INTRODUZCA LA NOTA DEL EXAMEN 3: ");
    scanf("%lf", &EXAM3);

    if (EXAM1 >= 0 && EXAM2 >= 0 && EXAM3 >= 0 &&
        EXAM1 <= 10 && EXAM2 <= 10 && EXAM3 <= 10) {
        NOTA1 = EXAM1 * PORC1;
        NOTA2 = EXAM2 * PORC2;
        NOTA3 = EXAM3 * PORC3;
        DEFI = NOTA1 + NOTA2 + NOTA3;
        BASE100 = DEFI * 10;

        if (BASE100 >= 40 && BASE100 <= 44) {
            if (EXAM1 >= 7 || EXAM2 >= 7 || EXAM3 >= 7) {
                BASE100 += 5;
            }
        }

        RESPUESTA = (BASE100 >= 45) ? "APROBÓ" : "REPROBÓ";
        printf("EL ESTUDIANTE %s LA MATERIA CON %.2lf PUNTOS\\n",
               RESPUESTA, BASE100 / 10);
    } else {
        printf("ERROR, LAS NOTAS DEBEN SER VALORES ENTRE 0 Y 10\\n");
    }
    return 0;
}`,
    typescript: `function calculoNotas(): void {
    const PORC1 = 0.35, PORC2 = 0.40, PORC3 = 0.25;
    
    // Prueba con los 5 casos del enunciado:
    const casos = [
        [10, 5, 6],
        [-1, 10, 5.3],
        [5, 5, 5],
        [9, 4, 5.9],
        [10, 5, 11]
    ];

    casos.forEach(([EXAM1, EXAM2, EXAM3], i) => {
        console.log(\`\\n--- Corrida \${i + 1}: (\${EXAM1}, \${EXAM2}, \${EXAM3}) ---\`);
        if (EXAM1 >= 0 && EXAM2 >= 0 && EXAM3 >= 0 &&
            EXAM1 <= 10 && EXAM2 <= 10 && EXAM3 <= 10) {
            let BASE100 = (EXAM1*PORC1 + EXAM2*PORC2 + EXAM3*PORC3) * 10;
            if (BASE100 >= 40 && BASE100 <= 44) {
                if (EXAM1 >= 7 || EXAM2 >= 7 || EXAM3 >= 7) BASE100 += 5;
            }
            const res = BASE100 >= 45 ? "APROBÓ" : "REPROBÓ";
            console.log(\`EL ESTUDIANTE \${res} CON \${(BASE100/10).toFixed(2)} PUNTOS\`);
        } else {
            console.log("ERROR: NOTAS FUERA DEL RANGO [0, 10]");
        }
    });
}
calculoNotas();`
  },
  {
    numero: 12,
    enunciado: `Diseñe un algoritmo que calcule el promedio de 3 notas de un estudiante, y evalúe si se le otorgarán puntos adicionales: si el promedio es inferior a 5 no se otorgan puntos; si es mayor o igual que 5 y no se le han otorgado puntos adicionales previamente, se suman 2 puntos; si es mayor o igual que 5 y ya se le otorgaron puntos adicionales, se suma 1 punto. La máxima calificación es 20.`,
    pseudocodigo: `Algoritmo Promedio_Con_Puntos_Adicionales
Declaración
  Variables
    nota1, nota2, nota3: Real
    promedio, promedio_final: Real
    puntos_previos: Logico

Inicio
  Escribir "Ingrese la nota 1:"
  Leer nota1
  Escribir "Ingrese la nota 2:"
  Leer nota2
  Escribir "Ingrese la nota 3:"
  Leer nota3
  Escribir "¿Ya se le otorgaron puntos adicionales antes? (Verdadero/Falso):"
  Leer puntos_previos

  promedio <- (nota1 + nota2 + nota3) / 3

  Si (promedio >= 5) Entonces
    Si (puntos_previos = Falso) Entonces
      promedio_final <- promedio + 2
      Escribir "Se suman 2 puntos adicionales."
    Sino
      promedio_final <- promedio + 1
      Escribir "Se suma 1 punto adicional."
    Fin Si
  Sino
    promedio_final <- promedio
    Escribir "No se otorgan puntos adicionales."
  Fin Si

  Si (promedio_final > 20) Entonces
    promedio_final <- 20
  Fin Si

  Escribir "Promedio base: ", promedio
  Escribir "Promedio final: ", promedio_final
Fin`,
    c: `#include <stdio.h>
#include <stdbool.h>

int main() {
    double n1, n2, n3, prom, final_prom;
    int puntos_previos; // 1=true, 0=false

    printf("Nota 1: "); scanf("%lf", &n1);
    printf("Nota 2: "); scanf("%lf", &n2);
    printf("Nota 3: "); scanf("%lf", &n3);
    printf("¿Puntos adicionales previos? (1=Sí, 0=No): ");
    scanf("%d", &puntos_previos);

    prom = (n1 + n2 + n3) / 3.0;

    if (prom >= 5) {
        final_prom = puntos_previos ? prom + 1 : prom + 2;
        printf("Puntos adicionales sumados: %d\\n", puntos_previos ? 1 : 2);
    } else {
        final_prom = prom;
        printf("Sin puntos adicionales.\\n");
    }

    if (final_prom > 20) final_prom = 20;
    printf("Promedio base: %.2f\\n", prom);
    printf("Promedio final: %.2f\\n", final_prom);
    return 0;
}`,
    typescript: `function promedioConPuntos(n1: number, n2: number, n3: number, previos: boolean): void {
    const prom = (n1 + n2 + n3) / 3;
    let final = prom;

    if (prom >= 5) {
        final = previos ? prom + 1 : prom + 2;
        console.log(\`Se suman \${previos ? 1 : 2} puntos adicionales.\`);
    } else {
        console.log("Sin puntos adicionales.");
    }

    if (final > 20) final = 20;
    console.log(\`Promedio base: \${prom.toFixed(2)}\`);
    console.log(\`Promedio final: \${final.toFixed(2)}\`);
}`
  },
  {
    numero: 13,
    enunciado: `Elabore un algoritmo que permita determinar si tres números naturales introducidos por teclado forman una serie de números consecutivos. Ejemplo: 7, 8 y 9.`,
    pseudocodigo: `Algoritmo Numeros_Consecutivos
Declaración
  Variables
    a, b, c: Entero

Inicio
  Escribir "Ingrese el primer número:"
  Leer a
  Escribir "Ingrese el segundo número:"
  Leer b
  Escribir "Ingrese el tercer número:"
  Leer c

  Si (b = a + 1) Y (c = b + 1) Entonces
    Escribir a, ", ", b, " y ", c, " forman una serie de números consecutivos."
  Sino
    Escribir a, ", ", b, " y ", c, " NO forman una serie de números consecutivos."
  Fin Si
Fin`,
    c: `#include <stdio.h>

int main() {
    int a, b, c;
    printf("Tres números: "); scanf("%d %d %d", &a, &b, &c);

    if (b == a + 1 && c == b + 1) {
        printf("%d, %d y %d son consecutivos.\\n", a, b, c);
    } else {
        printf("NO son consecutivos.\\n");
    }
    return 0;
}`,
    typescript: `function sonConsecutivos(a: number, b: number, c: number): boolean {
    return b === a + 1 && c === b + 1;
}
// Ejemplo: sonConsecutivos(7, 8, 9) → true`
  },
  {
    numero: 14,
    enunciado: `Diseñe un algoritmo que determine el mínimo valor entre 3 números diferentes dados y representados en las variables a, b y c. Ejemplo: 5, 2, 7 → el mínimo es 2.`,
    pseudocodigo: `Algoritmo Minimo_De_Tres
Declaración
  Variables
    a, b, c, minimo: Real

Inicio
  Escribir "Ingrese el primer número (a):"
  Leer a
  Escribir "Ingrese el segundo número (b):"
  Leer b
  Escribir "Ingrese el tercer número (c):"
  Leer c

  Si (a < b) Y (a < c) Entonces
    minimo <- a
  Sino
    Si (b < c) Entonces
      minimo <- b
    Sino
      minimo <- c
    Fin Si
  Fin Si

  Escribir "El valor mínimo es: ", minimo
Fin`,
    c: `#include <stdio.h>

int main() {
    double a, b, c, minimo;
    printf("a b c: "); scanf("%lf %lf %lf", &a, &b, &c);

    if (a < b && a < c) minimo = a;
    else if (b < c)     minimo = b;
    else                minimo = c;

    printf("El mínimo es: %.2lf\\n", minimo);
    return 0;
}`,
    typescript: `function minimoTres(a: number, b: number, c: number): number {
    if (a < b && a < c) return a;
    if (b < c) return b;
    return c;
}
// Ejemplo: minimoTres(5, 2, 7) → 2`
  },
  {
    numero: 15,
    enunciado: `Haga un algoritmo que acepte 3 números y posteriormente los ordene de menor a mayor para mostrarlos como resultado. Ejemplo: 3, 7, 4 ordenado queda 3, 4, 7.`,
    pseudocodigo: `Algoritmo Ordenar_Tres_Numeros
Declaración
  Variables
    a, b, c, temp: Real

Inicio
  Escribir "Ingrese el primer número:"
  Leer a
  Escribir "Ingrese el segundo número:"
  Leer b
  Escribir "Ingrese el tercer número:"
  Leer c

  // Ordenamiento por intercambio (Bubble sort simplificado)
  Si (a > b) Entonces
    temp <- a
    a <- b
    b <- temp
  Fin Si
  Si (a > c) Entonces
    temp <- a
    a <- c
    c <- temp
  Fin Si
  Si (b > c) Entonces
    temp <- b
    b <- c
    c <- temp
  Fin Si

  Escribir "Ordenados de menor a mayor: ", a, ", ", b, ", ", c
Fin`,
    c: `#include <stdio.h>

void intercambiar(double *x, double *y) {
    double t = *x; *x = *y; *y = t;
}

int main() {
    double a, b, c;
    printf("a b c: "); scanf("%lf %lf %lf", &a, &b, &c);

    if (a > b) intercambiar(&a, &b);
    if (a > c) intercambiar(&a, &c);
    if (b > c) intercambiar(&b, &c);

    printf("Ordenados: %.2lf, %.2lf, %.2lf\\n", a, b, c);
    return 0;
}`,
    typescript: `function ordenarTres(a: number, b: number, c: number): [number, number, number] {
    if (a > b) [a, b] = [b, a];
    if (a > c) [a, c] = [c, a];
    if (b > c) [b, c] = [c, b];
    return [a, b, c];
}
// Ejemplo: ordenarTres(3, 7, 4) → [3, 4, 7]`
  },
  {
    numero: 16,
    enunciado: `Diseñe un algoritmo que reciba 3 números y determine si éstos forman una serie ascendente o descendente, indicando el patrón. Ejemplo: 2, 4, 6 → serie ascendente con patrón de 2 en 2; 10, 5, 0 → serie descendente con patrón de 5 en 5.`,
    pseudocodigo: `Algoritmo Serie_Ascendente_Descendente
Declaración
  Variables
    a, b, c: Real
    diff1, diff2: Real

Inicio
  Escribir "Ingrese el primer número:"
  Leer a
  Escribir "Ingrese el segundo número:"
  Leer b
  Escribir "Ingrese el tercer número:"
  Leer c

  diff1 <- b - a
  diff2 <- c - b

  Si (diff1 = diff2) Y (diff1 > 0) Entonces
    Escribir "Forman una serie ASCENDENTE con patrón de ", diff1, " en ", diff1
  Sino
    Si (diff1 = diff2) Y (diff1 < 0) Entonces
      Escribir "Forman una serie DESCENDENTE con patrón de ", ABS(diff1), " en ", ABS(diff1)
    Sino
      Escribir "Los números NO forman una serie con patrón constante."
    Fin Si
  Fin Si
Fin`,
    c: `#include <stdio.h>
#include <math.h>

int main() {
    double a, b, c, d1, d2;
    printf("a b c: "); scanf("%lf %lf %lf", &a, &b, &c);

    d1 = b - a;
    d2 = c - b;

    if (d1 == d2 && d1 > 0)
        printf("Serie ASCENDENTE con patrón de %.2lf en %.2lf\\n", d1, d1);
    else if (d1 == d2 && d1 < 0)
        printf("Serie DESCENDENTE con patrón de %.2lf en %.2lf\\n", fabs(d1), fabs(d1));
    else
        printf("NO forman una serie con patrón constante.\\n");
    return 0;
}`,
    typescript: `function tipoSerie(a: number, b: number, c: number): string {
    const d1 = b - a;
    const d2 = c - b;
    if (d1 === d2 && d1 > 0) return \`Ascendente, patrón de \${d1} en \${d1}\`;
    if (d1 === d2 && d1 < 0) return \`Descendente, patrón de \${Math.abs(d1)} en \${Math.abs(d1)}\`;
    return "Sin patrón constante";
}
// Ejemplos: tipoSerie(2,4,6) → "Ascendente, patrón de 2 en 2"
//           tipoSerie(10,5,0) → "Descendente, patrón de 5 en 5"`
  },
  {
    numero: 17,
    enunciado: `Proponga un algoritmo que acepte un número como entrada y determine si es par o impar. (Se sugiere investigar el operador MOD).`,
    pseudocodigo: `Algoritmo Par_O_Impar
Declaración
  Variables
    numero: Entero

Inicio
  Escribir "Ingrese un número entero:"
  Leer numero

  Si (numero MOD 2 = 0) Entonces
    Escribir numero, " es un número PAR."
  Sino
    Escribir numero, " es un número IMPAR."
  Fin Si
Fin`,
    c: `#include <stdio.h>

int main() {
    int n;
    printf("Ingrese un número: "); scanf("%d", &n);

    if (n % 2 == 0)
        printf("%d es PAR.\\n", n);
    else
        printf("%d es IMPAR.\\n", n);
    return 0;
}`,
    typescript: `function parOImpar(n: number): string {
    return n % 2 === 0 ? \`\${n} es PAR\` : \`\${n} es IMPAR\`;
}
// El operador MOD (%) devuelve el resto de la división.
// Si el resto entre 2 es 0, el número es par.`
  },
  {
    numero: 18,
    enunciado: `Se dispone de los límites inferior y superior de un rango [li, lf]. Diseñe un algoritmo que permita verificar si un valor dado L pertenece a dicho rango.`,
    pseudocodigo: `Algoritmo Verificar_Rango
Declaración
  Variables
    li, lf, L: Real

Inicio
  Escribir "Ingrese el límite inferior (li):"
  Leer li
  Escribir "Ingrese el límite superior (lf):"
  Leer lf
  Escribir "Ingrese el valor L a verificar:"
  Leer L

  Si (L >= li) Y (L <= lf) Entonces
    Escribir "El valor ", L, " SÍ pertenece al rango [", li, ", ", lf, "]."
  Sino
    Escribir "El valor ", L, " NO pertenece al rango [", li, ", ", lf, "]."
  Fin Si
Fin`,
    c: `#include <stdio.h>

int main() {
    double li, lf, L;
    printf("Límite inferior: "); scanf("%lf", &li);
    printf("Límite superior: "); scanf("%lf", &lf);
    printf("Valor L: "); scanf("%lf", &L);

    if (L >= li && L <= lf)
        printf("%.2lf SÍ pertenece al rango [%.2lf, %.2lf]\\n", L, li, lf);
    else
        printf("%.2lf NO pertenece al rango.\\n", L);
    return 0;
}`,
    typescript: `function perteneceAlRango(li: number, lf: number, L: number): boolean {
    return L >= li && L <= lf;
}
// Ejemplo: perteneceAlRango(5, 15, 10) → true
//          perteneceAlRango(5, 15, 20) → false`
  },
  {
    numero: 19,
    enunciado: `Realice el algoritmo para verificar si un producto es aceptable para almacenarlo en una tienda. Datos: Código, Año de elaboración, Mes y Año de caducidad. Aceptable si: año de elaboración >= 2018 y caducidad mínima 12/2020. Mensaje "el sistema le asignará un lugar en el almacén" si es aceptable, o "El sistema no puede asignar un lugar en el almacén" si no lo es.`,
    pseudocodigo: `Algoritmo Verificar_Producto
Declaración
  Variables
    codigo: Entero
    anio_elaboracion: Entero
    mes_caducidad, anio_caducidad: Entero
    aceptable: Logico

Inicio
  Escribir "Ingrese el código del producto:"
  Leer codigo
  Escribir "Ingrese el año de elaboración:"
  Leer anio_elaboracion
  Escribir "Ingrese el mes de caducidad (1-12):"
  Leer mes_caducidad
  Escribir "Ingrese el año de caducidad:"
  Leer anio_caducidad

  aceptable <- Falso

  Si (anio_elaboracion >= 2018) Entonces
    Si (anio_caducidad > 2020) Entonces
      aceptable <- Verdadero
    Sino
      Si (anio_caducidad = 2020) Y (mes_caducidad >= 12) Entonces
        aceptable <- Verdadero
      Fin Si
    Fin Si
  Fin Si

  Si (aceptable = Verdadero) Entonces
    Escribir "El sistema le asignará un lugar en el almacén."
  Sino
    Escribir "El sistema no puede asignar un lugar en el almacén."
  Fin Si
Fin`,
    c: `#include <stdio.h>
#include <stdbool.h>

int main() {
    int codigo, anio_elab, mes_cad, anio_cad;
    bool ok = false;

    printf("Código: "); scanf("%d", &codigo);
    printf("Año elaboración: "); scanf("%d", &anio_elab);
    printf("Mes caducidad: "); scanf("%d", &mes_cad);
    printf("Año caducidad: "); scanf("%d", &anio_cad);

    if (anio_elab >= 2018) {
        if (anio_cad > 2020 || (anio_cad == 2020 && mes_cad >= 12))
            ok = true;
    }

    puts(ok ? "El sistema le asignará un lugar en el almacén."
            : "El sistema no puede asignar un lugar en el almacén.");
    return 0;
}`,
    typescript: `function verificarProducto(anioElab: number, mesCad: number, anioCad: number): string {
    const ok = anioElab >= 2018 &&
               (anioCad > 2020 || (anioCad === 2020 && mesCad >= 12));
    return ok
        ? "El sistema le asignará un lugar en el almacén."
        : "El sistema no puede asignar un lugar en el almacén.";
}
// Ejemplo: verificarProducto(2019, 12, 2020) → "...asignará un lugar..."`
  },
  {
    numero: 20,
    enunciado: `Haga un algoritmo que pida como entrada un número del 1 al 7 y como resultado muestre el día de la semana correspondiente (1=Lunes, 2=Martes, ..., 7=Domingo).`,
    pseudocodigo: `Algoritmo Dia_De_La_Semana
Declaración
  Variables
    numero: Entero

Inicio
  Escribir "Ingrese un número del 1 al 7:"
  Leer numero

  Caso numero
    1: Escribir "Lunes"
    2: Escribir "Martes"
    3: Escribir "Miércoles"
    4: Escribir "Jueves"
    5: Escribir "Viernes"
    6: Escribir "Sábado"
    7: Escribir "Domingo"
    Sino: Escribir "Número inválido. Ingrese un valor entre 1 y 7."
  Fin Caso
Fin`,
    c: `#include <stdio.h>

int main() {
    int n;
    printf("Ingrese un número del 1 al 7: "); scanf("%d", &n);

    switch (n) {
        case 1: printf("Lunes\\n"); break;
        case 2: printf("Martes\\n"); break;
        case 3: printf("Miércoles\\n"); break;
        case 4: printf("Jueves\\n"); break;
        case 5: printf("Viernes\\n"); break;
        case 6: printf("Sábado\\n"); break;
        case 7: printf("Domingo\\n"); break;
        default: printf("Número inválido.\\n");
    }
    return 0;
}`,
    typescript: `function diaSemana(n: number): string {
    const dias = ["", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    return n >= 1 && n <= 7 ? dias[n] : "Número inválido";
}
// Ejemplos: diaSemana(1) → "Lunes", diaSemana(7) → "Domingo"`
  },
  {
    numero: 21,
    enunciado: `Haga un algoritmo que permita como entrada de datos un carácter, a fin de verificar si se trata de una "s" o una "n". En caso de introducir "s" o "n" que muestre "entrada correcta", o que muestre "entrada incorrecta" en caso contrario.`,
    pseudocodigo: `Algoritmo Verificar_SN
Declaración
  Variables
    caracter: Caracter

Inicio
  Escribir "Ingrese un carácter (s o n):"
  Leer caracter

  Si (caracter = 's') O (caracter = 'n') Entonces
    Escribir "Entrada correcta."
  Sino
    Escribir "Entrada incorrecta."
  Fin Si
Fin`,
    c: `#include <stdio.h>

int main() {
    char c;
    printf("Ingrese un carácter (s o n): ");
    scanf(" %c", &c);

    if (c == 's' || c == 'n')
        printf("Entrada correcta.\\n");
    else
        printf("Entrada incorrecta.\\n");
    return 0;
}`,
    typescript: `function verificarSN(c: string): string {
    return (c === 's' || c === 'n') ? "Entrada correcta." : "Entrada incorrecta.";
}
// Ejemplos: verificarSN('s') → "Entrada correcta."
//           verificarSN('x') → "Entrada incorrecta."`
  }
];
