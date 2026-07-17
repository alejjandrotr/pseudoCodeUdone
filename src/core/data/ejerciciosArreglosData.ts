import { Exercise } from '../types/exercise.types';

export const ejerciciosArreglosData: Exercise[] = [
  {
    numero: 1,
    enunciado: `Dados los arreglos A, B y C, todos de tamaño 5 y tipo base entero. Haga un algoritmo que: reciba los datos de entrada de cada arreglo; muestre los datos de cada arreglo; busque en los arreglos un número dado por el usuario, a fin de mostrar el nombre del arreglo y la posición que ocupa el número (mostrar la ocurrencia del número cada vez que lo encuentre); obtener en un nuevo arreglo la suma de las posiciones paralelas de A, B y C.`,
    pseudocodigo: `Algoritmo Busqueda_Suma_Paralela
Declaracion
  Constantes
    TAM = 5
  Variables
    A, B, C, Suma: Arreglo[TAM] de Entero
    i, numeroBuscado: Entero
    encontrado: Logico

Inicio
  // Entrada de datos
  Para i <- 1 Hasta TAM Hacer
    Escribir "Ingrese elemento ", i, " de A:"
    Leer A[i]
    Escribir "Ingrese elemento ", i, " de B:"
    Leer B[i]
    Escribir "Ingrese elemento ", i, " de C:"
    Leer C[i]
  Fin Para

  // Mostrar datos
  Escribir "--- Arreglo A ---"
  Para i <- 1 Hasta TAM Hacer
    Escribir A[i]
  Fin Para
  Escribir "--- Arreglo B ---"
  Para i <- 1 Hasta TAM Hacer
    Escribir B[i]
  Fin Para
  Escribir "--- Arreglo C ---"
  Para i <- 1 Hasta TAM Hacer
    Escribir C[i]
  Fin Para

  // Búsqueda
  Escribir "Ingrese número a buscar:"
  Leer numeroBuscado
  encontrado <- Falso

  Para i <- 1 Hasta TAM Hacer
    Si A[i] = numeroBuscado Entonces
      Escribir "Encontrado en A, posición ", i
      encontrado <- Verdadero
    Fin Si
    Si B[i] = numeroBuscado Entonces
      Escribir "Encontrado en B, posición ", i
      encontrado <- Verdadero
    Fin Si
    Si C[i] = numeroBuscado Entonces
      Escribir "Encontrado en C, posición ", i
      encontrado <- Verdadero
    Fin Si
  Fin Para

  Si encontrado = Falso Entonces
    Escribir "El número no se encontró en ningún arreglo."
  Fin Si

  // Suma paralela
  Escribir "--- Arreglo Suma ---"
  Para i <- 1 Hasta TAM Hacer
    Suma[i] <- A[i] + B[i] + C[i]
    Escribir "Suma[", i, "] = ", Suma[i]
  Fin Para
Fin`,
    c: `#include <stdio.h>
#define TAM 5

int main() {
    int A[TAM], B[TAM], C[TAM], Suma[TAM];
    int i, num;
    int encontrado = 0;

    for(i=0; i<TAM; i++) {
        printf("A[%d]: ", i); scanf("%d", &A[i]);
        printf("B[%d]: ", i); scanf("%d", &B[i]);
        printf("C[%d]: ", i); scanf("%d", &C[i]);
    }

    printf("\\nMostrar arreglos:\\n");
    for(i=0; i<TAM; i++) {
        printf("A[%d]=%d, B[%d]=%d, C[%d]=%d\\n", i, A[i], i, B[i], i, C[i]);
    }

    printf("\\nNumero a buscar: ");
    scanf("%d", &num);
    for(i=0; i<TAM; i++) {
        if(A[i] == num) { printf("En A, pos %d\\n", i); encontrado = 1; }
        if(B[i] == num) { printf("En B, pos %d\\n", i); encontrado = 1; }
        if(C[i] == num) { printf("En C, pos %d\\n", i); encontrado = 1; }
    }
    if(!encontrado) printf("No se encontro.\\n");

    printf("\\nSuma Paralela:\\n");
    for(i=0; i<TAM; i++) {
        Suma[i] = A[i] + B[i] + C[i];
        printf("Suma[%d] = %d\\n", i, Suma[i]);
    }

    return 0;
}`,
    typescript: `function busquedaYSumaParalela(A: number[], B: number[], C: number[], numBuscado: number) {
  const tam = 5;
  const suma: number[] = new Array(tam);
  let encontrado = false;

  console.log("Datos:", {A, B, C});

  for(let i=0; i<tam; i++) {
    if(A[i] === numBuscado) { console.log(\`En A, pos \${i}\`); encontrado = true; }
    if(B[i] === numBuscado) { console.log(\`En B, pos \${i}\`); encontrado = true; }
    if(C[i] === numBuscado) { console.log(\`En C, pos \${i}\`); encontrado = true; }
  }
  if(!encontrado) console.log("No encontrado.");

  for(let i=0; i<tam; i++) {
    suma[i] = A[i] + B[i] + C[i];
    console.log(\`Suma[\${i}] = \${suma[i]}\`);
  }
}`
  },
  {
    numero: 2,
    enunciado: `Dados los arreglos Nombres y Apellidos, de tamaño 4 y tipo base cadena. Haga un algoritmo que reciba los datos de entrada de cada arreglo; obtenga un nuevo arreglo llamado NombreApellido que contenga la concatenación.`,
    pseudocodigo: `Algoritmo Concatenar_Nombres
Declaracion
  Constantes
    TAM = 4
  Variables
    Nombres, Apellidos, NombreApellido: Arreglo[TAM] de Cadena
    i: Entero

Inicio
  Para i <- 1 Hasta TAM Hacer
    Escribir "Ingrese nombre ", i, ":"
    Leer Nombres[i]
    Escribir "Ingrese apellido ", i, ":"
    Leer Apellidos[i]
  Fin Para

  Escribir "--- Arreglo NombreApellido ---"
  Para i <- 1 Hasta TAM Hacer
    NombreApellido[i] <- Nombres[i] + " " + Apellidos[i]
    Escribir NombreApellido[i]
  Fin Para
Fin`,
    c: `#include <stdio.h>
#include <string.h>
#define TAM 4

int main() {
    char Nombres[TAM][50];
    char Apellidos[TAM][50];
    char NombreApellido[TAM][100];
    int i;

    for(i=0; i<TAM; i++) {
        printf("Nombre %d: ", i);
        scanf("%s", Nombres[i]);
        printf("Apellido %d: ", i);
        scanf("%s", Apellidos[i]);
    }

    printf("\\n--- Resultados ---\\n");
    for(i=0; i<TAM; i++) {
        strcpy(NombreApellido[i], Nombres[i]);
        strcat(NombreApellido[i], " ");
        strcat(NombreApellido[i], Apellidos[i]);
        printf("%s\\n", NombreApellido[i]);
    }
    
    return 0;
}`,
    typescript: `function concatenarNombres(nombres: string[], apellidos: string[]) {
  const tam = 4;
  const nombreApellido: string[] = new Array(tam);

  for(let i=0; i<tam; i++) {
    nombreApellido[i] = nombres[i] + " " + apellidos[i];
    console.log(nombreApellido[i]);
  }
}`
  },
  {
    numero: 3,
    enunciado: `Dado el arreglo Tiempos, de tamaño 10 y tipo base real, guardar tiempos de un maratón. Calcular: menor y mayor tiempo, promedio, y cantidad de tiempos iguales o por debajo del promedio.`,
    pseudocodigo: `Algoritmo Tiempos_Maraton
Declaracion
  Constantes
    TAM = 10
  Variables
    Tiempos: Arreglo[TAM] de Real
    i, cont_debajo: Entero
    menor, mayor, suma, promedio: Real

Inicio
  Escribir "Ingrese tiempo 1:"
  Leer Tiempos[1]
  menor <- Tiempos[1]
  mayor <- Tiempos[1]
  suma <- Tiempos[1]

  Para i <- 2 Hasta TAM Hacer
    Escribir "Ingrese tiempo ", i, ":"
    Leer Tiempos[i]
    
    Si Tiempos[i] < menor Entonces
      menor <- Tiempos[i]
    Fin Si
    Si Tiempos[i] > mayor Entonces
      mayor <- Tiempos[i]
    Fin Si
    suma <- suma + Tiempos[i]
  Fin Para

  promedio <- suma / TAM
  cont_debajo <- 0

  Para i <- 1 Hasta TAM Hacer
    Si Tiempos[i] <= promedio Entonces
      cont_debajo <- cont_debajo + 1
    Fin Si
  Fin Para

  Escribir "Mayor tiempo: ", mayor
  Escribir "Menor tiempo: ", menor
  Escribir "Promedio: ", promedio
  Escribir "Corredores <= al promedio: ", cont_debajo
Fin`,
    c: `#include <stdio.h>
#define TAM 10

int main() {
    float tiempos[TAM];
    float menor, mayor, suma = 0, promedio;
    int cont = 0, i;

    for(i=0; i<TAM; i++) {
        printf("Tiempo %d: ", i+1);
        scanf("%f", &tiempos[i]);
        if(i == 0) {
            menor = tiempos[i];
            mayor = tiempos[i];
        } else {
            if(tiempos[i] < menor) menor = tiempos[i];
            if(tiempos[i] > mayor) mayor = tiempos[i];
        }
        suma += tiempos[i];
    }

    promedio = suma / TAM;

    for(i=0; i<TAM; i++) {
        if(tiempos[i] <= promedio) {
            cont++;
        }
    }

    printf("\\nMayor: %.2f", mayor);
    printf("\\nMenor: %.2f", menor);
    printf("\\nPromedio: %.2f", promedio);
    printf("\\nIgual o debajo prom: %d\\n", cont);

    return 0;
}`,
    typescript: `function estadisticasMaraton(tiempos: number[]) {
  let menor = tiempos[0], mayor = tiempos[0], suma = 0;
  
  for(let i=0; i<tiempos.length; i++) {
    if(tiempos[i] < menor) menor = tiempos[i];
    if(tiempos[i] > mayor) mayor = tiempos[i];
    suma += tiempos[i];
  }
  
  const prom = suma / tiempos.length;
  let cont = 0;
  
  for(let i=0; i<tiempos.length; i++) {
    if(tiempos[i] <= prom) cont++;
  }
  
  console.log(\`Mayor: \${mayor}, Menor: \${menor}, Promedio: \${prom}\`);
  console.log(\`Corredores <= prom: \${cont}\`);
}`
  },
  {
    numero: 4,
    enunciado: `Dado un arreglo contentivo de las edades de 20 personas, ordenarlo de menor a mayor utilizando el Método de Ordenamiento Burbuja.`,
    pseudocodigo: `Algoritmo Ordenar_Edades
Declaracion
  Constantes
    TAM = 20
  Variables
    Edades: Arreglo[TAM] de Entero
    i, j, aux: Entero

Inicio
  Para i <- 1 Hasta TAM Hacer
    Escribir "Ingrese edad ", i, ":"
    Leer Edades[i]
  Fin Para

  // Método de la Burbuja
  Para i <- 1 Hasta TAM-1 Hacer
    Para j <- 1 Hasta TAM-i Hacer
      Si Edades[j] > Edades[j+1] Entonces
        aux <- Edades[j]
        Edades[j] <- Edades[j+1]
        Edades[j+1] <- aux
      Fin Si
    Fin Para
  Fin Para

  Escribir "--- Edades Ordenadas ---"
  Para i <- 1 Hasta TAM Hacer
    Escribir Edades[i]
  Fin Para
Fin`,
    c: `#include <stdio.h>
#define TAM 20

int main() {
    int edades[TAM];
    int i, j, aux;

    for(i=0; i<TAM; i++) {
        printf("Edad %d: ", i+1);
        scanf("%d", &edades[i]);
    }

    for(i=0; i<TAM-1; i++) {
        for(j=0; j<TAM-i-1; j++) {
            if(edades[j] > edades[j+1]) {
                aux = edades[j];
                edades[j] = edades[j+1];
                edades[j+1] = aux;
            }
        }
    }

    printf("\\nEdades Ordenadas:\\n");
    for(i=0; i<TAM; i++) {
        printf("%d ", edades[i]);
    }
    printf("\\n");
    return 0;
}`,
    typescript: `function ordenarEdades(edades: number[]) {
  const tam = edades.length;
  for(let i=0; i<tam-1; i++) {
    for(let j=0; j<tam-i-1; j++) {
      if(edades[j] > edades[j+1]) {
        let aux = edades[j];
        edades[j] = edades[j+1];
        edades[j+1] = aux;
      }
    }
  }
  console.log("Ordenadas:", edades);
}`
  },
  {
    numero: 5,
    enunciado: `Concurso: 4 candidatos, 3 pruebas (0-10). Utilizando arreglos paralelos, calcular: suma de calificaciones por candidato, nombre del que obtuvo mayor suma, y promedio de notas por prueba.`,
    pseudocodigo: `Algoritmo Concurso_Candidatos
Declaracion
  Constantes
    CANDIDATOS = 4
  Variables
    Nombres: Arreglo[CANDIDATOS] de Cadena
    P1, P2, P3, Sumas: Arreglo[CANDIDATOS] de Real
    i: Entero
    mayorSuma: Real
    ganador: Cadena
    promP1, promP2, promP3: Real

Inicio
  promP1 <- 0
  promP2 <- 0
  promP3 <- 0

  Para i <- 1 Hasta CANDIDATOS Hacer
    Escribir "Nombre del candidato ", i, ":"
    Leer Nombres[i]
    Escribir "Nota Prueba 1:"
    Leer P1[i]
    Escribir "Nota Prueba 2:"
    Leer P2[i]
    Escribir "Nota Prueba 3:"
    Leer P3[i]

    Sumas[i] <- P1[i] + P2[i] + P3[i]
    promP1 <- promP1 + P1[i]
    promP2 <- promP2 + P2[i]
    promP3 <- promP3 + P3[i]
  Fin Para

  mayorSuma <- Sumas[1]
  ganador <- Nombres[1]

  Escribir "--- Suma por candidato ---"
  Para i <- 1 Hasta CANDIDATOS Hacer
    Escribir Nombres[i], ": ", Sumas[i]
    Si Sumas[i] > mayorSuma Entonces
      mayorSuma <- Sumas[i]
      ganador <- Nombres[i]
    Fin Si
  Fin Para

  Escribir "Ganador absoluto: ", ganador, " con ", mayorSuma, " ptos."
  Escribir "Promedio Prueba 1: ", promP1 / CANDIDATOS
  Escribir "Promedio Prueba 2: ", promP2 / CANDIDATOS
  Escribir "Promedio Prueba 3: ", promP3 / CANDIDATOS
Fin`,
    c: `#include <stdio.h>
#define CAND 4

int main() {
    char nom[CAND][50];
    float p1[CAND], p2[CAND], p3[CAND], sumas[CAND];
    float m1=0, m2=0, m3=0, mayorSuma;
    int i, idxGanador = 0;

    for(i=0; i<CAND; i++) {
        printf("Candidato %d: ", i+1); scanf("%s", nom[i]);
        printf("Prueba 1: "); scanf("%f", &p1[i]);
        printf("Prueba 2: "); scanf("%f", &p2[i]);
        printf("Prueba 3: "); scanf("%f", &p3[i]);

        sumas[i] = p1[i] + p2[i] + p3[i];
        m1 += p1[i]; m2 += p2[i]; m3 += p3[i];
    }

    mayorSuma = sumas[0];
    for(i=0; i<CAND; i++) {
        printf("%s suma: %.2f\\n", nom[i], sumas[i]);
        if(sumas[i] > mayorSuma) {
            mayorSuma = sumas[i];
            idxGanador = i;
        }
    }

    printf("\\nGanador: %s con %.2f\\n", nom[idxGanador], mayorSuma);
    printf("Promedios -> P1:%.2f P2:%.2f P3:%.2f\\n", m1/CAND, m2/CAND, m3/CAND);

    return 0;
}`,
    typescript: `function evaluarCandidatos(noms: string[], p1: number[], p2: number[], p3: number[]) {
  const sumas: number[] = [];
  let m1=0, m2=0, m3=0;
  
  for(let i=0; i<4; i++) {
    sumas[i] = p1[i] + p2[i] + p3[i];
    m1+=p1[i]; m2+=p2[i]; m3+=p3[i];
  }

  let mayor = sumas[0], ganador = noms[0];
  for(let i=0; i<4; i++) {
    if(sumas[i] > mayor) {
      mayor = sumas[i];
      ganador = noms[i];
    }
  }

  console.log(\`Ganador: \${ganador} (\${mayor})\`);
  console.log(\`Promedios: P1=\${m1/4}, P2=\${m2/4}, P3=\${m3/4}\`);
}`
  },
  {
    numero: 6,
    enunciado: `Concurso UDO: 5 aspirantes (Cédula, nombre, 3 evaluaciones: 10%, 40%, 50%). Calcular definitiva. En empate, pedir nota concurso, si empata, entrevista 100%. Conocer promedio de notas en cada examen globalmente.`,
    pseudocodigo: `Algoritmo Concurso_UDO
Declaracion
  Constantes
    ASP = 5
  Variables
    Cedulas, Nombres: Arreglo[ASP] de Cadena
    E1, E2, E3, Definitivas: Arreglo[ASP] de Real
    i, idxGanador, idxEmpate: Entero
    mayorNota, prom1, prom2, prom3: Real
    hayEmpate: Logico
    notaDesempate1, notaDesempate2: Real

Inicio
  prom1 <- 0; prom2 <- 0; prom3 <- 0

  Para i <- 1 Hasta ASP Hacer
    Escribir "Cédula y Nombre de ", i, ":"
    Leer Cedulas[i], Nombres[i]
    Escribir "Nota Entrevista (10%), Escrito (40%), Oral (50%):"
    Leer E1[i], E2[i], E3[i]
    
    Definitivas[i] <- (E1[i]*0.1) + (E2[i]*0.4) + (E3[i]*0.5)
    prom1 <- prom1 + E1[i]
    prom2 <- prom2 + E2[i]
    prom3 <- prom3 + E3[i]
  Fin Para

  mayorNota <- Definitivas[1]
  idxGanador <- 1
  hayEmpate <- Falso

  Para i <- 2 Hasta ASP Hacer
    Si Definitivas[i] > mayorNota Entonces
      mayorNota <- Definitivas[i]
      idxGanador <- i
      hayEmpate <- Falso
    Sino
      Si Definitivas[i] = mayorNota Entonces
        hayEmpate <- Verdadero
        idxEmpate <- i
      Fin Si
    Fin Si
  Fin Para

  Si hayEmpate = Verdadero Entonces
    Escribir "EMPATE entre ", Nombres[idxGanador], " y ", Nombres[idxEmpate]
    Escribir "Ingrese nota asignatura para ", Nombres[idxGanador], ":"
    Leer notaDesempate1
    Escribir "Ingrese nota asignatura para ", Nombres[idxEmpate], ":"
    Leer notaDesempate2
    
    Si notaDesempate1 > notaDesempate2 Entonces
      Escribir "Ganador post-desempate 1: ", Nombres[idxGanador]
    Sino
      Si notaDesempate2 > notaDesempate1 Entonces
        Escribir "Ganador post-desempate 1: ", Nombres[idxEmpate]
      Sino
        Escribir "Persiste el empate. Entrevista 100% final."
        Escribir "Entrevista ", Nombres[idxGanador], ":"
        Leer notaDesempate1
        Escribir "Entrevista ", Nombres[idxEmpate], ":"
        Leer notaDesempate2
        Si notaDesempate1 > notaDesempate2 Entonces
          Escribir "Ganador Absoluto: ", Nombres[idxGanador]
        Sino
          Escribir "Ganador Absoluto: ", Nombres[idxEmpate]
        Fin Si
      Fin Si
    Fin Si
  Sino
    Escribir "Ganador Absoluto: ", Nombres[idxGanador], " con ", mayorNota
  Fin Si

  Escribir "Promedio Entrevista: ", prom1/ASP
  Escribir "Promedio Escrito: ", prom2/ASP
  Escribir "Promedio Oral: ", prom3/ASP
Fin`,
    c: `#include <stdio.h>
#define ASP 5

int main() {
    char nom[ASP][50];
    float e1, e2, e3, defs[ASP], mayor;
    float p1=0, p2=0, p3=0;
    int i, win=0, tie=-1;

    for(i=0; i<ASP; i++) {
        printf("Aspirante %d nombre: ", i+1); scanf("%s", nom[i]);
        printf("E1 E2 E3: "); scanf("%f %f %f", &e1, &e2, &e3);
        defs[i] = (e1*0.1) + (e2*0.4) + (e3*0.5);
        p1+=e1; p2+=e2; p3+=e3;
    }

    mayor = defs[0];
    for(i=1; i<ASP; i++) {
        if(defs[i] > mayor) { mayor = defs[i]; win = i; tie = -1; }
        else if(defs[i] == mayor) { tie = i; }
    }

    if(tie != -1) {
        float nd1, nd2;
        printf("Empate! Nota asignatura %s: ", nom[win]); scanf("%f", &nd1);
        printf("Nota asignatura %s: ", nom[tie]); scanf("%f", &nd2);
        if(nd1 > nd2) printf("Gana %s\\n", nom[win]);
        else if(nd2 > nd1) printf("Gana %s\\n", nom[tie]);
        else {
            printf("Empate 2! Entrevista 100%% %s: ", nom[win]); scanf("%f", &nd1);
            printf("Entrevista 100%% %s: ", nom[tie]); scanf("%f", &nd2);
            if(nd1 > nd2) printf("Gana %s\\n", nom[win]);
            else printf("Gana %s\\n", nom[tie]);
        }
    } else {
        printf("Ganador: %s con %.2f\\n", nom[win], mayor);
    }
    printf("Promedios -> E1:%.2f, E2:%.2f, E3:%.2f\\n", p1/ASP, p2/ASP, p3/ASP);

    return 0;
}`,
    typescript: `function concursoUdo(noms: string[], e1: number[], e2: number[], e3: number[]) {
  const defs: number[] = [];
  let win = 0, tie = -1;

  for(let i=0; i<5; i++) {
    defs[i] = (e1[i]*0.1) + (e2[i]*0.4) + (e3[i]*0.5);
  }

  let mayor = defs[0];
  for(let i=1; i<5; i++) {
    if(defs[i] > mayor) { mayor = defs[i]; win = i; tie = -1; }
    else if(defs[i] === mayor) { tie = i; }
  }

  if(tie !== -1) {
    console.log(\`EMPATE entre \${noms[win]} y \${noms[tie]}. Requiere desempate manual.\`);
  } else {
    console.log(\`Ganador directo: \${noms[win]} con \${mayor}\`);
  }
}`
  }
];
