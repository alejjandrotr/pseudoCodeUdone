# Ejercicios Propuestos: Matrices

Llegó el momento de poner a prueba tus conocimientos sobre arreglos multidimensionales. Intenta resolver estos problemas por tu cuenta antes de mirar las soluciones. ¡Usa papel y lápiz si necesitas visualizar la matriz!

## 1. La Diagonal Secundaria

Ya aprendiste a sumar la diagonal principal de una matriz cuadrada (donde `i = j`). Ahora tu reto es calcular la suma de la **diagonal secundaria**. 
La diagonal secundaria es la que cruza desde la esquina superior derecha hasta la esquina inferior izquierda.
*Pista:* En una matriz de N x N indexada desde 1, la diagonal secundaria está formada por las posiciones donde `i + j = N + 1`.

## 2. Matriz Triangular Inferior y Superior

Dada una matriz cuadrada de 5x5 llena de números aleatorios:
1. Genera un algoritmo que convierta en cero (`0`) a todos los elementos que estén estrictamente por **debajo** de la diagonal principal (creando así una matriz triangular superior).
2. Genera otro algoritmo que convierta en cero a todos los elementos que estén estrictamente por **encima** de la diagonal principal (creando una matriz triangular inferior).

*Pista:* Piensa en la relación matemática entre los índices `i` y `j` en las zonas superiores e inferiores de la diagonal.

## 3. Recorrido de Bordes (Perímetro)

Desarrolle un algoritmo que sume **únicamente** los elementos que se encuentran en el borde (perímetro) de una matriz de 4x6 (4 filas, 6 columnas). Es decir, debe sumar los elementos de la primera fila, la última fila, la primera columna y la última columna, sin incluir ningún elemento del interior de la matriz.

*Pista:* No necesitas recorrer toda la matriz. Puedes validar con condicionales si `i` o `j` están en los extremos, o mejor aún, hacer 4 ciclos `Para` pequeños (uno por cada borde).

## 4. Aritmética Clásica: Suma de Matrices

**Planteamiento:** Dadas dos matrices cuadradas A y B de tamaño 4x4 y tipo base entero. Haga un algoritmo que llene ambas matrices y obtenga en una matriz C la suma de las matrices A y B. (Recuerde que la suma se realiza elemento a elemento: `C[i, j] = A[i, j] + B[i, j]`). Muestre la matriz resultante.

## 5. Práctica Integral: Transpuesta y Simétrica

**Planteamiento:** Dada una matriz cuadrada de dimensión 8x8 y tipo base entero. Haga un algoritmo completo para:
1. Llenar la matriz con datos del usuario.
2. Obtener su matriz transpuesta en una nueva estructura.
3. Determinar (imprimiendo un mensaje) si la matriz original ingresada es una matriz simétrica o no.

---

### Diseño
- Integrar estos ejercicios en el componente general de **Ejercicios Propuestos** del curso (el mismo que bloquea las soluciones con un candado por fecha o requiere usar la IA para corregir el razonamiento).
