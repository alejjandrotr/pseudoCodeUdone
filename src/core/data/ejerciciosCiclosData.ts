import { Exercise } from '../types/exercise.types';

export const ejerciciosCiclosData: Exercise[] = [
  {
    numero: 1,
    enunciado: `Haga un algoritmo que lea en cada iteración un carácter; las iteraciones terminan con la entrada del carácter "*". Como salida debe mostrar la concatenación de los caracteres leídos.`,
    pseudocodigo: `Algoritmo Concatenar_Caracteres
Declaración
  Variables
    caracter: Caracter
    cadena: Caracter

Inicio
  cadena <- ""
  Escribir "Ingrese caracteres uno por uno (escriba '*' para terminar):"
  Leer caracter

  Mientras (caracter <> '*') Hacer
    cadena <- cadena + caracter
    Leer caracter
  Fin Mientras

  Escribir "Cadena concatenada: ", cadena
Fin`,
    c: `#include <stdio.h>
#include <string.h>

int main() {
    char c;
    char cadena[256] = "";

    printf("Ingrese caracteres (termine con '*'):\\n");
    scanf(" %c", &c);

    while (c != '*') {
        strncat(cadena, &c, 1);
        scanf(" %c", &c);
    }

    printf("Cadena concatenada: %s\\n", cadena);
    return 0;
}`,
    typescript: `function concatenarCaracteres(): string {
    // Simulación con un arreglo de entrada
    const entrada = ['H', 'o', 'l', 'a', '*'];
    let cadena = "";

    let i = 0;
    while (i < entrada.length && entrada[i] !== '*') {
        cadena += entrada[i];
        i++;
    }

    console.log(\`Cadena concatenada: \${cadena}\`);
    return cadena;
}
// Con entrada ['H','o','l','a','*'] → "Hola"`
  },
  {
    numero: 2,
    enunciado: `Proponga un algoritmo que lea una serie de números enteros; las iteraciones terminan cuando se introduzca el número 0. Al finalizar debe mostrar: total de números procesados, total de positivos, total de negativos, cantidad de pares e impares.`,
    pseudocodigo: `Algoritmo Estadisticas_Numeros
Declaración
  Variables
    numero: Entero
    total, positivos, negativos, pares, impares: Entero

Inicio
  total <- 0
  positivos <- 0
  negativos <- 0
  pares <- 0
  impares <- 0

  Escribir "Ingrese números enteros (0 para terminar):"
  Leer numero

  Mientras (numero <> 0) Hacer
    total <- total + 1

    Si (numero > 0) Entonces
      positivos <- positivos + 1
    Sino
      negativos <- negativos + 1
    Fin Si

    Si (numero MOD 2 = 0) Entonces
      pares <- pares + 1
    Sino
      impares <- impares + 1
    Fin Si

    Leer numero
  Fin Mientras

  Escribir "Total procesados: ", total
  Escribir "Positivos: ", positivos
  Escribir "Negativos: ", negativos
  Escribir "Pares: ", pares
  Escribir "Impares: ", impares
Fin`,
    c: `#include <stdio.h>

int main() {
    int n, total = 0, pos = 0, neg = 0, par = 0, imp = 0;

    printf("Ingrese números (0 termina): ");
    scanf("%d", &n);

    while (n != 0) {
        total++;
        if (n > 0) pos++; else neg++;
        if (n % 2 == 0) par++; else imp++;
        scanf("%d", &n);
    }

    printf("Total: %d | Positivos: %d | Negativos: %d\\n", total, pos, neg);
    printf("Pares: %d | Impares: %d\\n", par, imp);
    return 0;
}`,
    typescript: `function estadisticasNumeros(nums: number[]): void {
    let [total, pos, neg, par, imp] = [0, 0, 0, 0, 0];

    for (const n of nums) {
        if (n === 0) break;
        total++;
        if (n > 0) pos++; else neg++;
        if (n % 2 === 0) par++; else imp++;
    }

    console.log(\`Total: \${total}, Positivos: \${pos}, Negativos: \${neg}\`);
    console.log(\`Pares: \${par}, Impares: \${imp}\`);
}
// Ejemplo: estadisticasNumeros([3, -2, 7, -4, 0])`
  },
  {
    numero: 3,
    enunciado: `Desarrolle un algoritmo que permita la lectura iterativa de una serie de 40 números enteros, a fin de determinar cuáles fueron el mayor y el menor número de la serie.`,
    pseudocodigo: `Algoritmo Mayor_Y_Menor
Declaración
  Constantes
    TOTAL = 40
  Variables
    numero, mayor, menor: Entero
    i: Entero

Inicio
  Escribir "Ingrese el primer número:"
  Leer numero
  mayor <- numero
  menor <- numero

  Para i <- 2 Hasta TOTAL Hacer
    Escribir "Ingrese el número ", i, ":"
    Leer numero

    Si (numero > mayor) Entonces
      mayor <- numero
    Fin Si

    Si (numero < menor) Entonces
      menor <- numero
    Fin Si
  Fin Para

  Escribir "El MAYOR número de la serie es: ", mayor
  Escribir "El MENOR número de la serie es: ", menor
Fin`,
    c: `#include <stdio.h>
#define TOTAL 40

int main() {
    int n, mayor, menor;

    printf("Número 1: "); scanf("%d", &n);
    mayor = menor = n;

    for (int i = 2; i <= TOTAL; i++) {
        printf("Número %d: ", i); scanf("%d", &n);
        if (n > mayor) mayor = n;
        if (n < menor) menor = n;
    }

    printf("Mayor: %d, Menor: %d\\n", mayor, menor);
    return 0;
}`,
    typescript: `function mayorYMenor(nums: number[]): { mayor: number, menor: number } {
    // Se espera exactamente 40 números
    let mayor = nums[0], menor = nums[0];

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > mayor) mayor = nums[i];
        if (nums[i] < menor) menor = nums[i];
    }

    console.log(\`Mayor: \${mayor}, Menor: \${menor}\`);
    return { mayor, menor };
}
// Ejemplo con 5 números para ilustrar: mayorYMenor([4, -1, 99, 23, 0])`
  },
  {
    numero: 4,
    enunciado: `Dado un par de números enteros P y S. Realice un algoritmo para determinar el producto P*S mediante sumas sucesivas.`,
    pseudocodigo: `Algoritmo Producto_Por_Sumas
Declaración
  Variables
    P, S: Entero
    producto: Entero
    i: Entero

Inicio
  Escribir "Ingrese el multiplicando P:"
  Leer P
  Escribir "Ingrese el multiplicador S:"
  Leer S

  producto <- 0
  Para i <- 1 Hasta S Hacer
    producto <- producto + P
  Fin Para

  Escribir "El producto de ", P, " * ", S, " = ", producto
Fin`,
    c: `#include <stdio.h>

int main() {
    int P, S, producto = 0;
    printf("P: "); scanf("%d", &P);
    printf("S: "); scanf("%d", &S);

    for (int i = 0; i < S; i++)
        producto += P;

    printf("%d * %d = %d\\n", P, S, producto);
    return 0;
}`,
    typescript: `function productoPorSumas(P: number, S: number): number {
    let producto = 0;
    for (let i = 0; i < S; i++) {
        producto += P;
    }
    console.log(\`\${P} * \${S} = \${producto} (por sumas sucesivas)\`);
    return producto;
}
// Ejemplo: productoPorSumas(3, 5) → suma P cinco veces: 3+3+3+3+3 = 15`
  },
  {
    numero: 5,
    enunciado: `Dado un par de números enteros P y S. Realice un algoritmo para determinar la división de P/S mediante restas sucesivas.`,
    pseudocodigo: `Algoritmo Division_Por_Restas
Declaración
  Variables
    P, S: Entero
    cociente, residuo: Entero

Inicio
  Escribir "Ingrese el dividendo P:"
  Leer P
  Escribir "Ingrese el divisor S:"
  Leer S

  cociente <- 0
  residuo <- P

  Si (S = 0) Entonces
    Escribir "Error: División por cero no permitida."
  Sino
    Mientras (residuo >= S) Hacer
      residuo <- residuo - S
      cociente <- cociente + 1
    Fin Mientras

    Escribir P, " / ", S, " = ", cociente, " con residuo ", residuo
  Fin Si
Fin`,
    c: `#include <stdio.h>

int main() {
    int P, S, cociente = 0, residuo;
    printf("P (dividendo): "); scanf("%d", &P);
    printf("S (divisor): "); scanf("%d", &S);

    if (S == 0) {
        printf("Error: División por cero.\\n");
        return 1;
    }

    residuo = P;
    while (residuo >= S) {
        residuo -= S;
        cociente++;
    }

    printf("%d / %d = %d, residuo: %d\\n", P, S, cociente, residuo);
    return 0;
}`,
    typescript: `function divisionPorRestas(P: number, S: number): void {
    if (S === 0) { console.log("Error: División por cero."); return; }

    let cociente = 0;
    let residuo = P;

    while (residuo >= S) {
        residuo -= S;
        cociente++;
    }

    console.log(\`\${P} / \${S} = \${cociente} con residuo \${residuo}\`);
}
// Ejemplo: divisionPorRestas(17, 5) → 17/5 = 3 con residuo 2`
  },
  {
    numero: 6,
    enunciado: `Elabore un algoritmo que genere la nómina detallada de un grupo de 10 empleados. Por cada empleado mostrar: sueldo base, bono por horas extras (Bs. 7000 c/u), bono de productividad (10% del total de ventas), bono de transporte (Bs. 24000 igual para todos), deducciones (2% del sueldo base) y sueldo neto. Al final mostrar: total de empleados con horas extras, monto total por horas extras, monto total de nómina y total de bono de productividad.`,
    pseudocodigo: `Algoritmo Nomina_Empleados
Declaración
  Constantes
    NUM_EMPLEADOS = 10
    COSTO_HORA_EXTRA = 7000
    BONO_TRANSPORTE = 24000
    PCT_PRODUCTIVIDAD = 0.10
    PCT_DEDUCCION = 0.02
  Variables
    i: Entero
    sueldo_base, ventas: Real
    horas_extras: Entero
    bono_extra, bono_prod, deduccion, sueldo_neto: Real
    total_extra_empleados, total_monto_extras: Entero
    total_nomina, total_bono_prod: Real
    total_extra_empleados: Entero

Inicio
  total_extra_empleados <- 0
  total_monto_extras <- 0
  total_nomina <- 0
  total_bono_prod <- 0

  Para i <- 1 Hasta NUM_EMPLEADOS Hacer
    Escribir "=== Empleado ", i, " ==="
    Escribir "Sueldo base:"
    Leer sueldo_base
    Escribir "Horas extras trabajadas:"
    Leer horas_extras
    Escribir "Total de ventas del mes:"
    Leer ventas

    bono_extra <- horas_extras * COSTO_HORA_EXTRA
    bono_prod <- ventas * PCT_PRODUCTIVIDAD
    deduccion <- sueldo_base * PCT_DEDUCCION
    sueldo_neto <- sueldo_base + bono_extra + bono_prod + BONO_TRANSPORTE - deduccion

    Escribir "Sueldo base: Bs. ", sueldo_base
    Escribir "Bono horas extras: Bs. ", bono_extra
    Escribir "Bono productividad: Bs. ", bono_prod
    Escribir "Bono transporte: Bs. ", BONO_TRANSPORTE
    Escribir "Deducciones: Bs. ", deduccion
    Escribir "SUELDO NETO: Bs. ", sueldo_neto

    Si (horas_extras > 0) Entonces
      total_extra_empleados <- total_extra_empleados + 1
      total_monto_extras <- total_monto_extras + bono_extra
    Fin Si

    total_nomina <- total_nomina + sueldo_neto
    total_bono_prod <- total_bono_prod + bono_prod
  Fin Para

  Escribir "=== RESUMEN DE NÓMINA ==="
  Escribir "Empleados con horas extras: ", total_extra_empleados
  Escribir "Total pagado en horas extras: Bs. ", total_monto_extras
  Escribir "Monto total de nómina: Bs. ", total_nomina
  Escribir "Total bonos de productividad: Bs. ", total_bono_prod
Fin`,
    c: `#include <stdio.h>
#define N 10

int main() {
    const double H_EXT = 7000, TRANSP = 24000, PPROD = 0.10, PDED = 0.02;
    double base, ventas, neto, prod, ext, ded;
    int hext;
    int cnt_ext = 0;
    double tot_ext = 0, nomina = 0, tot_prod = 0;

    for (int i = 1; i <= N; i++) {
        printf("== Empleado %d ==\\n", i);
        printf("Sueldo base: "); scanf("%lf", &base);
        printf("Horas extras: "); scanf("%d", &hext);
        printf("Total ventas: "); scanf("%lf", &ventas);

        ext = hext * H_EXT;
        prod = ventas * PPROD;
        ded = base * PDED;
        neto = base + ext + prod + TRANSP - ded;

        printf("Neto: %.2f\\n", neto);

        if (hext > 0) { cnt_ext++; tot_ext += ext; }
        nomina += neto;
        tot_prod += prod;
    }

    printf("\\nResumen: Ext=%d empleados, Bs.%.2f | Nómina=Bs.%.2f | Prod=Bs.%.2f\\n",
           cnt_ext, tot_ext, nomina, tot_prod);
    return 0;
}`,
    typescript: `interface Empleado {
    sueldoBase: number;
    horasExtras: number;
    ventas: number;
}

function generarNomina(empleados: Empleado[]): void {
    const HORA_EXT = 7000, TRANSP = 24000, P_PROD = 0.10, P_DED = 0.02;
    let cntExt = 0, montoExt = 0, totalNomina = 0, totalProd = 0;

    empleados.forEach((e, i) => {
        const ext = e.horasExtras * HORA_EXT;
        const prod = e.ventas * P_PROD;
        const ded = e.sueldoBase * P_DED;
        const neto = e.sueldoBase + ext + prod + TRANSP - ded;

        console.log(\`\\nEmpleado \${i + 1}: Neto = Bs. \${neto.toFixed(2)}\`);

        if (e.horasExtras > 0) { cntExt++; montoExt += ext; }
        totalNomina += neto;
        totalProd += prod;
    });

    console.log(\`\\nResumen: \${cntExt} con extras, Monto extras: Bs.\${montoExt}\`);
    console.log(\`Nómina total: Bs.\${totalNomina.toFixed(2)}, Productividad: Bs.\${totalProd.toFixed(2)}\`);
}`
  },
  {
    numero: 7,
    enunciado: `Un profesor evalúa a sus estudiantes con 3 exámenes (50%), 3 proyectos (20%) y 1 trabajo (30%). Por cada estudiante calcule su nota definitiva. Al final totalice: aprobados (nota >= 4.5), reprobados y estudiantes con derecho a recuperación (nota > 3.75 y < 4.5).`,
    pseudocodigo: `Algoritmo Desempenio_Estudiantes
Declaración
  Variables
    i, j: Entero
    num_estudiantes: Entero
    exam, proy, trabajo: Real
    prom_examen, prom_proy: Real
    nota_definitiva: Real
    aprobados, reprobados, recuperacion: Entero

Inicio
  Escribir "Ingrese la cantidad de estudiantes:"
  Leer num_estudiantes

  aprobados <- 0
  reprobados <- 0
  recuperacion <- 0

  Para i <- 1 Hasta num_estudiantes Hacer
    Escribir "=== Estudiante ", i, " ==="
    prom_examen <- 0
    prom_proy <- 0

    Para j <- 1 Hasta 3 Hacer
      Escribir "Nota del examen ", j, ":"
      Leer exam
      prom_examen <- prom_examen + exam
    Fin Para
    prom_examen <- prom_examen / 3

    Para j <- 1 Hasta 3 Hacer
      Escribir "Nota del proyecto ", j, ":"
      Leer proy
      prom_proy <- prom_proy + proy
    Fin Para
    prom_proy <- prom_proy / 3

    Escribir "Nota del trabajo final:"
    Leer trabajo

    nota_definitiva <- (prom_examen * 0.50) + (prom_proy * 0.20) + (trabajo * 0.30)
    Escribir "Nota definitiva: ", nota_definitiva

    Si (nota_definitiva >= 4.5) Entonces
      aprobados <- aprobados + 1
      Escribir "Estado: APROBADO"
    Sino
      Si (nota_definitiva > 3.75) Entonces
        recuperacion <- recuperacion + 1
        Escribir "Estado: DERECHO A RECUPERACIÓN"
      Sino
        reprobados <- reprobados + 1
        Escribir "Estado: REPROBADO"
      Fin Si
    Fin Si
  Fin Para

  Escribir "=== TOTALES ==="
  Escribir "Aprobados: ", aprobados
  Escribir "Reprobados: ", reprobados
  Escribir "Con derecho a recuperación: ", recuperacion
Fin`,
    c: `#include <stdio.h>

int main() {
    int n, aprobados = 0, reprobados = 0, recup = 0;
    double pe, pp, t, nota;

    printf("Cantidad de estudiantes: "); scanf("%d", &n);

    for (int i = 1; i <= n; i++) {
        pe = 0; pp = 0;
        printf("\\n== Estudiante %d ==\\n", i);
        for (int j = 0; j < 3; j++) { double e; scanf("%lf", &e); pe += e; }
        for (int j = 0; j < 3; j++) { double p; scanf("%lf", &p); pp += p; }
        scanf("%lf", &t);

        nota = (pe/3 * 0.50) + (pp/3 * 0.20) + (t * 0.30);
        printf("Nota: %.2f\\n", nota);

        if (nota >= 4.5) aprobados++;
        else if (nota > 3.75) recup++;
        else reprobados++;
    }

    printf("\\nAprobados: %d, Reprobados: %d, Recuperación: %d\\n",
           aprobados, reprobados, recup);
    return 0;
}`,
    typescript: `interface Estudiante {
    examenes: [number, number, number];
    proyectos: [number, number, number];
    trabajo: number;
}

function evaluarCurso(estudiantes: Estudiante[]): void {
    let aprobados = 0, reprobados = 0, recup = 0;

    estudiantes.forEach((e, i) => {
        const promEx = (e.examenes[0] + e.examenes[1] + e.examenes[2]) / 3;
        const promPr = (e.proyectos[0] + e.proyectos[1] + e.proyectos[2]) / 3;
        const nota = promEx * 0.50 + promPr * 0.20 + e.trabajo * 0.30;

        console.log(\`Estudiante \${i + 1}: Nota = \${nota.toFixed(2)}\`);

        if (nota >= 4.5) aprobados++;
        else if (nota > 3.75) recup++;
        else reprobados++;
    });

    console.log(\`\\nAprobados: \${aprobados} | Reprobados: \${reprobados} | Recuperación: \${recup}\`);
}`
  },
  {
    numero: 8,
    enunciado: `Elabore un algoritmo que permita determinar si un número dado por el usuario pertenece a la serie Fibonacci. (La serie Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34...).`,
    pseudocodigo: `Algoritmo Verificar_Fibonacci
Declaración
  Variables
    numero: Entero
    a, b, fib: Entero
    esFib: Logico

Inicio
  Escribir "Ingrese un número entero:"
  Leer numero

  a <- 0
  b <- 1
  esFib <- Falso

  Si (numero = 0) O (numero = 1) Entonces
    esFib <- Verdadero
  Sino
    fib <- a + b
    Mientras (fib <= numero) Hacer
      Si (fib = numero) Entonces
        esFib <- Verdadero
      Fin Si
      a <- b
      b <- fib
      fib <- a + b
    Fin Mientras
  Fin Si

  Si (esFib = Verdadero) Entonces
    Escribir numero, " SÍ pertenece a la serie Fibonacci."
  Sino
    Escribir numero, " NO pertenece a la serie Fibonacci."
  Fin Si
Fin`,
    c: `#include <stdio.h>
#include <stdbool.h>

int main() {
    int n, a = 0, b = 1, fib;
    bool esFib = false;

    printf("Número: "); scanf("%d", &n);

    if (n == 0 || n == 1) {
        esFib = true;
    } else {
        fib = a + b;
        while (fib <= n) {
            if (fib == n) { esFib = true; break; }
            a = b; b = fib; fib = a + b;
        }
    }

    printf("%d %s pertenece a Fibonacci.\\n", n, esFib ? "SÍ" : "NO");
    return 0;
}`,
    typescript: `function esFibonacci(n: number): boolean {
    if (n < 0) return false;
    if (n === 0 || n === 1) return true;

    let a = 0, b = 1;
    let fib = a + b;

    while (fib <= n) {
        if (fib === n) return true;
        [a, b] = [b, fib];
        fib = a + b;
    }
    return false;
}

// Pruebas:
[0, 1, 3, 5, 8, 13, 21, 4, 6, 10].forEach(n =>
    console.log(\`\${n}: \${esFibonacci(n) ? "ES" : "NO ES"} Fibonacci\`)
);`
  }
];
