import { Exercise } from '../types/exercise.types';

export const ejerciciosData: Exercise[] = [
  {
    numero: 1,
    enunciado: "Sea Días una variable de tipo entero que representa una cantidad válida de días. Haga un algoritmo para determinar su equivalente en años, meses y días. Para este ejercicio asuma que todos los años tienen 365 días y los meses son de 30 días.",
    pseudocodigo: `Algoritmo Convertir_Dias
  Variables:
    dias_totales, anos, meses, dias_restantes: Entero
Inicio
  Escribir "Ingrese la cantidad total de días:"
  Leer dias_totales
  
  anos <- dias_totales DIV 365
  dias_restantes <- dias_totales MOD 365
  
  meses <- dias_restantes DIV 30
  dias_restantes <- dias_restantes MOD 30
  
  Escribir "Equivale a: ", anos, " años, ", meses, " meses y ", dias_restantes, " días."
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    int dias_totales, anos, meses, dias_restantes;\n    \n    printf("Ingrese la cantidad total de días:\\n");\n    scanf("%d", &dias_totales);\n    \n    anos = dias_totales / 365;\n    dias_restantes = dias_totales % 365;\n    \n    meses = dias_restantes / 30;\n    dias_restantes = dias_restantes % 30;\n    \n    printf("Equivale a: %d años, %d meses y %d días.\\n", anos, meses, dias_restantes);\n    \n    return 0;\n}`,
    typescript: `function convertirDias(): void {\n    // Simulando entrada por prompt (navegador) o asumiendo un valor\n    const inputStr = prompt("Ingrese la cantidad total de días:");\n    if (!inputStr) return;\n    \n    let dias_totales: number = parseInt(inputStr, 10);\n    \n    let anos: number = Math.floor(dias_totales / 365);\n    let dias_restantes: number = dias_totales % 365;\n    \n    let meses: number = Math.floor(dias_restantes / 30);\n    dias_restantes = dias_restantes % 30;\n    \n    console.log(\`Equivale a: \${anos} años, \${meses} meses y \${dias_restantes} días.\`);\n}\n\nconvertirDias();`
  },
  {
    numero: 2,
    enunciado: "Sea Segundos una variable que contiene un número entero N, el cual representa una cantidad de segundos. Proponga un algoritmo en donde se pueda determinar su equivalente en días, horas, minutos y segundos.",
    pseudocodigo: `Algoritmo Convertir_Segundos
  Variables:
    segundos_totales, dias, horas, minutos, segundos_restantes: Entero
Inicio
  Escribir "Ingrese la cantidad de segundos:"
  Leer segundos_totales
  
  dias <- segundos_totales DIV 86400
  segundos_restantes <- segundos_totales MOD 86400
  
  horas <- segundos_restantes DIV 3600
  segundos_restantes <- segundos_restantes MOD 3600
  
  minutos <- segundos_restantes DIV 60
  segundos_restantes <- segundos_restantes MOD 60
  
  Escribir dias, " días, ", horas, " horas, ", minutos, " minutos y ", segundos_restantes, " segundos."
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    int segundos_totales, dias, horas, minutos, segundos_restantes;\n    \n    printf("Ingrese la cantidad de segundos:\\n");\n    scanf("%d", &segundos_totales);\n    \n    dias = segundos_totales / 86400;\n    segundos_restantes = segundos_totales % 86400;\n    \n    horas = segundos_restantes / 3600;\n    segundos_restantes = segundos_restantes % 3600;\n    \n    minutos = segundos_restantes / 60;\n    segundos_restantes = segundos_restantes % 60;\n    \n    printf("%d días, %d horas, %d minutos y %d segundos.\\n", dias, horas, minutos, segundos_restantes);\n    \n    return 0;\n}`,
    typescript: `function convertirSegundos(): void {\n    const inputStr = prompt("Ingrese la cantidad de segundos:");\n    if (!inputStr) return;\n    \n    let segundos_totales: number = parseInt(inputStr, 10);\n    \n    let dias: number = Math.floor(segundos_totales / 86400);\n    let segundos_restantes: number = segundos_totales % 86400;\n    \n    let horas: number = Math.floor(segundos_restantes / 3600);\n    segundos_restantes = segundos_restantes % 3600;\n    \n    let minutos: number = Math.floor(segundos_restantes / 60);\n    segundos_restantes = segundos_restantes % 60;\n    \n    console.log(\`\${dias} días, \${horas} horas, \${minutos} minutos y \${segundos_restantes} segundos.\`);\n}\n\nconvertirSegundos();`
  },
  {
    numero: 3,
    enunciado: "Proponga un algoritmo que reciba como entrada 3 números de tipo real y calcule el promedio de éstos.",
    pseudocodigo: `Algoritmo Promedio_Tres_Numeros
  Variables:
    num1, num2, num3, promedio: Real
Inicio
  Escribir "Ingrese el primer número:"
  Leer num1
  Escribir "Ingrese el segundo número:"
  Leer num2
  Escribir "Ingrese el tercer número:"
  Leer num3
  
  promedio <- (num1 + num2 + num3) / 3
  
  Escribir "El promedio es: ", promedio
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    float num1, num2, num3, promedio;\n    \n    printf("Ingrese el primer número:\\n");\n    scanf("%f", &num1);\n    printf("Ingrese el segundo número:\\n");\n    scanf("%f", &num2);\n    printf("Ingrese el tercer número:\\n");\n    scanf("%f", &num3);\n    \n    promedio = (num1 + num2 + num3) / 3.0;\n    \n    printf("El promedio es: %.2f\\n", promedio);\n    \n    return 0;\n}`,
    typescript: `function promedioDeTres(): void {\n    let num1: number = parseFloat(prompt("Ingrese el primer número:") || "0");\n    let num2: number = parseFloat(prompt("Ingrese el segundo número:") || "0");\n    let num3: number = parseFloat(prompt("Ingrese el tercer número:") || "0");\n    \n    let promedio: number = (num1 + num2 + num3) / 3;\n    \n    console.log(\`El promedio es: \${promedio}\`);\n}\n\npromedioDeTres();`
  },
  {
    numero: 4,
    enunciado: "Se requiere un algoritmo que calcule el total a pagar por la compra de 2 artículos que tienen cada uno precio P y Q respectivamente, y a los que se les debe incluir el correspondiente impuesto IVA (12%).",
    pseudocodigo: `Algoritmo Calcular_Pago_Con_IVA
  Variables:
    P, Q, subtotal, iva, total: Real
Inicio
  Escribir "Ingrese el precio del primer artículo (P):"
  Leer P
  Escribir "Ingrese el precio del segundo artículo (Q):"
  Leer Q
  
  subtotal <- P + Q
  iva <- subtotal * 0.12
  total <- subtotal + iva
  
  Escribir "Subtotal: Bs. ", subtotal
  Escribir "IVA (12%): Bs. ", iva
  Escribir "Total a pagar: Bs. ", total
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    float p, q, subtotal, iva, total;\n    \n    printf("Ingrese el precio del primer artículo (P):\\n");\n    scanf("%f", &p);\n    printf("Ingrese el precio del segundo artículo (Q):\\n");\n    scanf("%f", &q);\n    \n    subtotal = p + q;\n    iva = subtotal * 0.12;\n    total = subtotal + iva;\n    \n    printf("Subtotal: Bs. %.2f\\n", subtotal);\n    printf("IVA (12%%): Bs. %.2f\\n", iva);\n    printf("Total a pagar: Bs. %.2f\\n", total);\n    \n    return 0;\n}`,
    typescript: `function calcularPagoConIva(): void {\n    let p: number = parseFloat(prompt("Ingrese el precio del primer artículo (P):") || "0");\n    let q: number = parseFloat(prompt("Ingrese el precio del segundo artículo (Q):") || "0");\n    \n    let subtotal: number = p + q;\n    let iva: number = subtotal * 0.12;\n    let total: number = subtotal + iva;\n    \n    console.log(\`Subtotal: Bs. \${subtotal.toFixed(2)}\`);\n    console.log(\`IVA 12%: Bs. \${iva.toFixed(2)}\`);\n    console.log(\`Total a pagar: Bs. \${total.toFixed(2)}\`);\n}\n\ncalcularPagoConIva();`
  },
  {
    numero: 5,
    enunciado: "Una persona recibe un préstamo de Bs. 5.500.000,00 de un banco, y desea saber cuánto pagará por concepto de intereses, si el banco le cobra una tasa del 27% anual. Desarrolle un algoritmo para resolver este problema.",
    pseudocodigo: `Algoritmo Calcular_Intereses_Prestamo
  Constantes:
    PRESTAMO = 5500000.00
    TASA_ANUAL = 0.27
  Variables:
    intereses: Real
Inicio
  intereses <- PRESTAMO * TASA_ANUAL
  
  Escribir "El pago por intereses será de Bs. ", intereses
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    const double PRESTAMO = 5500000.00;\n    const double TASA_ANUAL = 0.27;\n    double intereses;\n    \n    intereses = PRESTAMO * TASA_ANUAL;\n    \n    printf("El pago por intereses será de Bs. %.2lf\\n", intereses);\n    \n    return 0;\n}`,
    typescript: `function calcularIntereses(): void {\n    const PRESTAMO: number = 5500000.00;\n    const TASA_ANUAL: number = 0.27;\n    \n    let intereses: number = PRESTAMO * TASA_ANUAL;\n    \n    console.log(\`El pago por intereses será de Bs. \${intereses.toFixed(2)}\`);\n}\n\ncalcularIntereses();`
  },
  {
    numero: 6,
    enunciado: "Se requiere calcular a través de un algoritmo, el precio de un boleto de avión, tomando en cuenta el número de kilómetros que se van a recorrer entre el punto de origen y el destino, siendo el precio Bs. 1000 por cada Kilómetro.",
    pseudocodigo: `Algoritmo Precio_Boleto_Avion
  Constantes:
    TARIFA_POR_KM = 1000.00
  Variables:
    kilometros, precio_boleto: Real
Inicio
  Escribir "Ingrese el número de kilómetros a recorrer:"
  Leer kilometros
  
  precio_boleto <- kilometros * TARIFA_POR_KM
  
  Escribir "El precio del boleto de avión es Bs. ", precio_boleto
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    const double TARIFA_POR_KM = 1000.00;\n    double kilometros, precio_boleto;\n    \n    printf("Ingrese el número de kilómetros a recorrer:\\n");\n    scanf("%lf", &kilometros);\n    \n    precio_boleto = kilometros * TARIFA_POR_KM;\n    \n    printf("El precio del boleto de avión es Bs. %.2lf\\n", precio_boleto);\n    \n    return 0;\n}`,
    typescript: `function calcularBoletoAvion(): void {\n    const TARIFA_POR_KM: number = 1000.00;\n    let kilometros: number = parseFloat(prompt("Ingrese kilómetros a recorrer:") || "0");\n    \n    let precio_boleto: number = kilometros * TARIFA_POR_KM;\n    \n    console.log(\`El precio del boleto de avión es Bs. \${precio_boleto.toFixed(2)}\`);\n}\n\ncalcularBoletoAvion();`
  },
  {
    numero: 7,
    enunciado: "El jefe de una fábrica de pañales desechables tiene conocimiento de que su producción diaria es de 700 pañales y que en cada caja donde se empacan para la venta caben 20 pañales. Se requiere proyectar la cantidad de cajas que necesitan para empacar la producción de 7 días.",
    pseudocodigo: `Algoritmo Cajas_Panales
  Constantes:
    DIAS = 7
    PRODUCCION_DIARIA = 700
    CAPACIDAD_CAJA = 20
  Variables:
    produccion_total: Entero
    cajas_necesarias: Real 
Inicio
  produccion_total <- PRODUCCION_DIARIA * DIAS
  cajas_necesarias <- produccion_total / CAPACIDAD_CAJA
  
  Escribir "Se necesitarán ", cajas_necesarias, " cajas para empacar la producción de ", DIAS, " días."
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    const int DIAS = 7;\n    const int PRODUCCION_DIARIA = 700;\n    const int CAPACIDAD_CAJA = 20;\n    \n    int produccion_total;\n    float cajas_necesarias;\n    \n    produccion_total = PRODUCCION_DIARIA * DIAS;\n    cajas_necesarias = (float)produccion_total / CAPACIDAD_CAJA;\n    \n    printf("Se necesitarán %.0f cajas para empacar la producción de %d días.\\n", cajas_necesarias, DIAS);\n    \n    return 0;\n}`,
    typescript: `function proyectarCajasPanales(): void {\n    const DIAS: number = 7;\n    const PRODUCCION_DIARIA: number = 700;\n    const CAPACIDAD_CAJA: number = 20;\n    \n    let produccion_total: number = PRODUCCION_DIARIA * DIAS;\n    let cajas_necesarias: number = Math.ceil(produccion_total / CAPACIDAD_CAJA);\n    \n    console.log(\`Se necesitarán \${cajas_necesarias} cajas para empacar la producción de \${DIAS} días.\`);\n}\n\nproyectarCajasPanales();`
  },
  {
    numero: 8,
    enunciado: "Desarrolle un algoritmo que reciba como entrada la cantidad de respuestas correctas, incorrectas y sin responder que obtuvo un estudiante en una prueba. A fin de calcular la nota, a sabiendas que cada pregunta correcta le da 2 puntos, cada pregunta incorrecta le quita 1 punto y las preguntas sin responder le restan 0,5 puntos.",
    pseudocodigo: `Algoritmo Calcular_Nota
  Variables:
    correctas, incorrectas, sin_responder: Entero
    nota_final: Real
Inicio
  Escribir "Ingrese cantidad de respuestas correctas:"
  Leer correctas
  Escribir "Ingrese cantidad de respuestas incorrectas:"
  Leer incorrectas
  Escribir "Ingrese cantidad de respuestas sin responder:"
  Leer sin_responder
  
  nota_final <- (correctas * 2) - (incorrectas * 1) - (sin_responder * 0.5)
  
  Escribir "La nota definitiva del estudiante es: ", nota_final
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    int correctas, incorrectas, sin_responder;\n    float nota_final;\n    \n    printf("Ingrese cantidad de respuestas correctas:\\n");\n    scanf("%d", &correctas);\n    printf("Ingrese cantidad de respuestas incorrectas:\\n");\n    scanf("%d", &incorrectas);\n    printf("Ingrese cantidad de respuestas sin responder:\\n");\n    scanf("%d", &sin_responder);\n    \n    nota_final = (correctas * 2) - (incorrectas * 1) - (sin_responder * 0.5);\n    \n    printf("La nota definitiva del estudiante es: %.2f\\n", nota_final);\n    \n    return 0;\n}`,
    typescript: `function calcularNota(): void {\n    let correctas: number = parseInt(prompt("Ingrese respuestas correctas:") || "0", 10);\n    let incorrectas: number = parseInt(prompt("Ingrese respuestas incorrectas:") || "0", 10);\n    let sin_responder: number = parseInt(prompt("Ingrese sin responder:") || "0", 10);\n    \n    let nota_final: number = (correctas * 2) - (incorrectas * 1) - (sin_responder * 0.5);\n    \n    console.log(\`La nota definitiva del estudiante es: \${nota_final}\`);\n}\n\ncalcularNota();`
  },
  {
    numero: 9,
    enunciado: "Escriba un algoritmo que permita determinar el número de CD´s necesarios para hacer un respaldo de una información de tamaño conocido. Para ello debe considerar que el tamaño de la información a respaldar está expresada en Gigabyte. Un Cd virgen tiene 700 Megabytes de capacidad disponible y un Gigabyte equivale a 1024 Megabytes.",
    pseudocodigo: `Algoritmo Calcular_CDs_Respaldo
  Constantes:
    CAPACIDAD_CD = 700
    MB_POR_GB = 1024
  Variables:
    info_gb, info_mb: Real
    cds_necesarios: Entero
Inicio
  Escribir "Ingrese el tamaño de la información en Gigabytes (GB):"
  Leer info_gb
  
  info_mb <- info_gb * MB_POR_GB
  
  // Utilizando división y redondeo simulado:
  cds_necesarios <- TRUNC((info_mb + CAPACIDAD_CD - 1) / CAPACIDAD_CD)
  
  Escribir "Se necesitan ", cds_necesarios, " CD´s para el respaldo."
Fin`,
    c: `#include <stdio.h>\n#include <math.h>\n\nint main() {\n    const int CAPACIDAD_CD = 700;\n    const int MB_POR_GB = 1024;\n    float info_gb, info_mb;\n    int cds_necesarios;\n    \n    printf("Ingrese el tamaño de la información en Gigabytes (GB):\\n");\n    scanf("%f", &info_gb);\n    \n    info_mb = info_gb * MB_POR_GB;\n    cds_necesarios = (int)ceil(info_mb / CAPACIDAD_CD);\n    \n    printf("Se necesitan %d CD's para el respaldo.\\n", cds_necesarios);\n    \n    return 0;\n}`,
    typescript: `function calcularCDs(): void {\n    const CAPACIDAD_CD: number = 700;\n    const MB_POR_GB: number = 1024;\n    \n    let info_gb: number = parseFloat(prompt("Ingrese tamaño en GB:") || "0");\n    let info_mb: number = info_gb * MB_POR_GB;\n    \n    let cds_necesarios: number = Math.ceil(info_mb / CAPACIDAD_CD);\n    \n    console.log(\`Se necesitan \${cds_necesarios} CD's para el respaldo.\`);\n}\n\ncalcularCDs();`
  },
  {
    numero: 10,
    enunciado: "Una persona dispone de 1000 dólares y quiere saber a cuántos bolívares equivalían ayer y a cuántos equivalen hoy. Haga un algoritmo para realizar ese cálculo y mostrar los resultados esperados.",
    pseudocodigo: `Algoritmo Dolares_A_Bolivares
  Constantes:
    MONTO_DOLARES = 1000.00
  Variables:
    tasa_ayer, tasa_hoy: Real
    equiv_ayer, equiv_hoy: Real
Inicio
  Escribir "Ingrese la tasa de cambio del dólar de ayer:"
  Leer tasa_ayer
  Escribir "Ingrese la tasa de cambio del dólar de hoy:"
  Leer tasa_hoy
  
  equiv_ayer <- MONTO_DOLARES * tasa_ayer
  equiv_hoy <- MONTO_DOLARES * tasa_hoy
  
  Escribir "Los 1000 Dólares equivalían ayer a Bs. ", equiv_ayer
  Escribir "Hoy equivalen a Bs. ", equiv_hoy
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    const float MONTO_DOLARES = 1000.00;\n    float tasa_ayer, tasa_hoy, equiv_ayer, equiv_hoy;\n    \n    printf("Ingrese la tasa de cambio del dólar de ayer:\\n");\n    scanf("%f", &tasa_ayer);\n    printf("Ingrese la tasa de cambio del dólar de hoy:\\n");\n    scanf("%f", &tasa_hoy);\n    \n    equiv_ayer = MONTO_DOLARES * tasa_ayer;\n    equiv_hoy = MONTO_DOLARES * tasa_hoy;\n    \n    printf("Los 1000 Dólares equivalían ayer a Bs. %.2f\\n", equiv_ayer);\n    printf("Hoy equivalen a Bs. %.2f\\n", equiv_hoy);\n    \n    return 0;\n}`,
    typescript: `function convertirDivisas(): void {\n    const MONTO_DOLARES: number = 1000;\n    \n    let tasa_ayer: number = parseFloat(prompt("Tasa de ayer:") || "0");\n    let tasa_hoy: number = parseFloat(prompt("Tasa de hoy:") || "0");\n    \n    let equiv_ayer: number = MONTO_DOLARES * tasa_ayer;\n    let equiv_hoy: number = MONTO_DOLARES * tasa_hoy;\n    \n    console.log(\`Ayer: Bs. \${equiv_ayer.toFixed(2)}\`);\n    console.log(\`Hoy: Bs. \${equiv_hoy.toFixed(2)}\`);\n}\n\nconvertirDivisas();`
  },
  {
    numero: 11,
    enunciado: "Un centro clínico recibe un presupuesto anual expresado en bolívares. 39% para el área de emergencias; 21% para hospitalización; 25% para traumatología y 15% laboratorio. Haga un algoritmo que reciba como entrada el monto presupuestado e indique por área el correspondiente monto en bolívares.",
    pseudocodigo: `Algoritmo Asignacion_Presupuesto_Clinica
  Variables:
    presupuesto_total: Real
    emergencia, hospitalizacion, traumatologia, laboratorio: Real
Inicio
  Escribir "Ingrese el presupuesto anual del centro clínico (Bs):"
  Leer presupuesto_total
  
  emergencia <- presupuesto_total * 0.39
  hospitalizacion <- presupuesto_total * 0.21
  traumatologia <- presupuesto_total * 0.25
  laboratorio <- presupuesto_total * 0.15
  
  Escribir "Presupuesto Emergencias: Bs. ", emergencia
  Escribir "Presupuesto Hospitalización: Bs. ", hospitalizacion
  Escribir "Presupuesto Traumatología: Bs. ", traumatologia
  Escribir "Presupuesto Laboratorio: Bs. ", laboratorio
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    double presupuesto;\n    \n    printf("Ingrese el presupuesto anual (Bs):\\n");\n    scanf("%lf", &presupuesto);\n    \n    printf("Emergencias (39%%): Bs. %.2lf\\n", presupuesto * 0.39);\n    printf("Hospitalización (21%%): Bs. %.2lf\\n", presupuesto * 0.21);\n    printf("Traumatología (25%%): Bs. %.2lf\\n", presupuesto * 0.25);\n    printf("Laboratorio (15%%): Bs. %.2lf\\n", presupuesto * 0.15);\n    \n    return 0;\n}`,
    typescript: `function asignarPresupuesto(): void {\n    let presupuesto: number = parseFloat(prompt("Presupuesto anual:") || "0");\n    \n    let emergencia: number = presupuesto * 0.39;\n    let hospitalizacion: number = presupuesto * 0.21;\n    let traumatologia: number = presupuesto * 0.25;\n    let laboratorio: number = presupuesto * 0.15;\n    \n    console.log(\`Emergencias: Bs. \${emergencia.toFixed(2)}\`);\n    console.log(\`Hospitalización: Bs. \${hospitalizacion.toFixed(2)}\`);\n    console.log(\`Traumatología: Bs. \${traumatologia.toFixed(2)}\`);\n    console.log(\`Laboratorio: Bs. \${laboratorio.toFixed(2)}\`);\n}\n\nasignarPresupuesto();`
  },
  {
    numero: 12,
    enunciado: "En la constitución de una nueva empresa 3 socios aportan un monto en bolívares para conformar el capital de la misma. Se requiere que diseñe un algoritmo que determine y muestre el porcentaje de aporte de cada socio en el capital.",
    pseudocodigo: `Algoritmo Porcentaje_Aporte_Socios
  Variables:
    aporte1, aporte2, aporte3, capital_total: Real
    porc1, porc2, porc3: Real
Inicio
  Escribir "Ingrese aporte del socio 1:"
  Leer aporte1
  Escribir "Ingrese aporte del socio 2:"
  Leer aporte2
  Escribir "Ingrese aporte del socio 3:"
  Leer aporte3
  
  capital_total <- aporte1 + aporte2 + aporte3
  
  porc1 <- (aporte1 / capital_total) * 100
  porc2 <- (aporte2 / capital_total) * 100
  porc3 <- (aporte3 / capital_total) * 100
  
  Escribir "Capital Total Conformado: Bs. ", capital_total
  Escribir "El Socio 1 aportó el ", porc1, "%"
  Escribir "El Socio 2 aportó el ", porc2, "%"
  Escribir "El Socio 3 aportó el ", porc3, "%"
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    float a1, a2, a3, total;\n    \n    printf("Ingrese aporte socio 1:\\n");\n    scanf("%f", &a1);\n    printf("Ingrese aporte socio 2:\\n");\n    scanf("%f", &a2);\n    printf("Ingrese aporte socio 3:\\n");\n    scanf("%f", &a3);\n    \n    total = a1 + a2 + a3;\n    \n    printf("Capital Total: %.2f\\n", total);\n    printf("Socio 1: %.2f%%\\n", (a1 / total) * 100);\n    printf("Socio 2: %.2f%%\\n", (a2 / total) * 100);\n    printf("Socio 3: %.2f%%\\n", (a3 / total) * 100);\n    \n    return 0;\n}`,
    typescript: `function porcentajeAportes(): void {\n    let a1: number = parseFloat(prompt("Aporte Socio 1:") || "0");\n    let a2: number = parseFloat(prompt("Aporte Socio 2:") || "0");\n    let a3: number = parseFloat(prompt("Aporte Socio 3:") || "0");\n    \n    let total: number = a1 + a2 + a3;\n    \n    console.log(\`Socio 1 aportó \${((a1/total)*100).toFixed(2)}%\`);\n    console.log(\`Socio 2 aportó \${((a2/total)*100).toFixed(2)}%\`);\n    console.log(\`Socio 3 aportó \${((a3/total)*100).toFixed(2)}%\`);\n}\n\nporcentajeAportes();`
  },
  {
    numero: 13,
    enunciado: "El dueño de una empresa adquiere un nuevo producto para la venta, para lo cual requiere de un algoritmo que le ayude a calcular el precio de venta del artículo considerando que obtendrá una ganancia del 30% del precio de compra del mismo.",
    pseudocodigo: `Algoritmo Precio_De_Venta
  Variables:
    precio_compra, ganancia, precio_venta: Real
Inicio
  Escribir "Ingrese el precio de compra del producto:"
  Leer precio_compra
  
  ganancia <- precio_compra * 0.30
  precio_venta <- precio_compra + ganancia
  
  Escribir "La ganancia proyectada es: Bs. ", ganancia
  Escribir "El precio de venta sugerido es: Bs. ", precio_venta
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    float precio_compra, precio_venta;\n    \n    printf("Ingrese el precio de compra:\\n");\n    scanf("%f", &precio_compra);\n    \n    precio_venta = precio_compra + (precio_compra * 0.30);\n    \n    printf("Precio de venta sugerido (30%% ganancia): Bs. %.2f\\n", precio_venta);\n    \n    return 0;\n}`,
    typescript: `function calcularPrecioVenta(): void {\n    let precio_compra: number = parseFloat(prompt("Ingrese precio de compra:") || "0");\n    let precio_venta: number = precio_compra * 1.30;\n    \n    console.log(\`Precio de Venta Sugerido: Bs. \${precio_venta.toFixed(2)}\`);\n}\n\ncalcularPrecioVenta();`
  },
  {
    numero: 14,
    enunciado: "Los obreros de una empresa ganan su salario diario dependiendo de la cantidad de horas trabajadas (Bs. 3000 c/u). Aparte se le asignan Bs. 10000 por bono de alimentación al día y Bs. 5000 por cada hora extra trabajada. Calcule el salario de un día.",
    pseudocodigo: `Algoritmo Salario_Diario_Obrero
  Constantes:
    PAGO_HORA_NORMAL = 3000.00
    PAGO_HORA_EXTRA = 5000.00
    BONO_ALIMENTACION = 10000.00
  Variables:
    horas_normales, horas_extras: Entero
    salario_dia: Real
Inicio
  Escribir "Ingrese cantidad de horas normales trabajadas hoy:"
  Leer horas_normales
  Escribir "Ingrese cantidad de horas extras trabajadas hoy:"
  Leer horas_extras
  
  salario_dia <- (horas_normales * PAGO_HORA_NORMAL) + (horas_extras * PAGO_HORA_EXTRA) + BONO_ALIMENTACION
  
  Escribir "El salario del día del obrero es: Bs. ", salario_dia
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    const double PAGO_NORMAL = 3000.0;\n    const double PAGO_EXTRA = 5000.0;\n    const double BONO = 10000.0;\n    int h_normales, h_extras;\n    double salario;\n    \n    printf("Horas normales:\\n");\n    scanf("%d", &h_normales);\n    printf("Horas extras:\\n");\n    scanf("%d", &h_extras);\n    \n    salario = (h_normales * PAGO_NORMAL) + (h_extras * PAGO_EXTRA) + BONO;\n    \n    printf("Salario total: Bs. %.2lf\\n", salario);\n    \n    return 0;\n}`,
    typescript: `function calcularSalario(): void {\n    const PAGO_NORMAL: number = 3000;\n    const PAGO_EXTRA: number = 5000;\n    const BONO: number = 10000;\n    \n    let h_normales: number = parseInt(prompt("Horas normales:") || "0", 10);\n    let h_extras: number = parseInt(prompt("Horas extras:") || "0", 10);\n    \n    let salario: number = (h_normales * PAGO_NORMAL) + (h_extras * PAGO_EXTRA) + BONO;\n    \n    console.log(\`Salario total del obrero: Bs. \${salario}\`);\n}\n\ncalcularSalario();`
  },
  {
    numero: 15,
    enunciado: "Un profesor dese calcular la nota definitiva obtenida por uno de sus estudiantes. Haga un algoritmo que realice este cálculo considerando que el estudiante presentó 4 evaluaciones que representan el 15, 20, 25 y 40% respectivamente.",
    pseudocodigo: `Algoritmo Nota_Definitiva
  Variables:
    eval1, eval2, eval3, eval4: Real // Notas del 1 al 10 o 20
    nota_definitiva: Real
Inicio
  Escribir "Ingrese la nota de la Evaluación 1 (15%):"
  Leer eval1
  Escribir "Ingrese la nota de la Evaluación 2 (20%):"
  Leer eval2
  Escribir "Ingrese la nota de la Evaluación 3 (25%):"
  Leer eval3
  Escribir "Ingrese la nota de la Evaluación 4 (40%):"
  Leer eval4
  
  nota_definitiva <- (eval1 * 0.15) + (eval2 * 0.20) + (eval3 * 0.25) + (eval4 * 0.40)
  
  Escribir "La nota definitiva del estudiante es: ", nota_definitiva
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    float n1, n2, n3, n4, final;\n    \n    printf("Ingrese Nota 1 (15%%):\\n");\n    scanf("%f", &n1);\n    printf("Ingrese Nota 2 (20%%):\\n");\n    scanf("%f", &n2);\n    printf("Ingrese Nota 3 (25%%):\\n");\n    scanf("%f", &n3);\n    printf("Ingrese Nota 4 (40%%):\\n");\n    scanf("%f", &n4);\n    \n    final = (n1 * 0.15) + (n2 * 0.20) + (n3 * 0.25) + (n4 * 0.40);\n    \n    printf("Nota definitiva: %.2f\\n", final);\n    \n    return 0;\n}`,
    typescript: `function notaDefinitiva(): void {\n    let n1 = parseFloat(prompt("Nota 1:") || "0");\n    let n2 = parseFloat(prompt("Nota 2:") || "0");\n    let n3 = parseFloat(prompt("Nota 3:") || "0");\n    let n4 = parseFloat(prompt("Nota 4:") || "0");\n    \n    let final = (n1 * 0.15) + (n2 * 0.20) + (n3 * 0.25) + (n4 * 0.40);\n    \n    console.log(\`Nota Definitiva: \${final.toFixed(2)}\`);\n}\n\nnotaDefinitiva();`
  },
  {
    numero: 16,
    enunciado: "Suponga que un individuo desea invertir su capital en un banco y desea saber cuánto dinero ganará después de un mes si el banco paga a razón de 2% mensual; haga un algoritmo para resolver este problema.",
    pseudocodigo: `Algoritmo Rendimiento_Mensual_Banco
  Variables:
    capital_inicial, ganancia_mensual, total_retirable: Real
Inicio
  Escribir "Ingrese el capital inicial a invertir:"
  Leer capital_inicial
  
  ganancia_mensual <- capital_inicial * 0.02
  total_retirable <- capital_inicial + ganancia_mensual
  
  Escribir "Ganancia por intereses del mes: Bs. ", ganancia_mensual
  Escribir "Total acumulado en cuenta: Bs. ", total_retirable
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    double capital, ganancia;\n    \n    printf("Ingrese capital inicial:\\n");\n    scanf("%lf", &capital);\n    \n    ganancia = capital * 0.02;\n    \n    printf("Ganancia del mes: Bs. %.2lf\\n", ganancia);\n    printf("Total acumulado: Bs. %.2lf\\n", capital + ganancia);\n    \n    return 0;\n}`,
    typescript: `function rendimientoBanco(): void {\n    let capital: number = parseFloat(prompt("Capital inicial:") || "0");\n    let ganancia: number = capital * 0.02;\n    \n    console.log(\`Ganancia: Bs. \${ganancia.toFixed(2)}\`);\n    console.log(\`Total acumulado: Bs. \${(capital + ganancia).toFixed(2)}\`);\n}\n\nrendimientoBanco();`
  },
  {
    numero: 17,
    enunciado: "Una tienda ofrece un descuento del 15% sobre el total de la compra de cada cliente. Haga un algoritmo para que un cliente pueda conocer el monto otorgado en el descuento recibido y aparte el monto que deberá pagar finalmente.",
    pseudocodigo: `Algoritmo Calcular_Descuento_Tienda
  Constantes:
    PCT_DESCUENTO = 0.15
  Variables:
    monto_compra, descuento, total_esperado: Real
Inicio
  Escribir "Ingrese el total bruto de la compra:"
  Leer monto_compra
  
  descuento <- monto_compra * PCT_DESCUENTO
  total_esperado <- monto_compra - descuento
  
  Escribir "Monto rebajado por descuento: Bs. ", descuento
  Escribir "Monto neto a pagar: Bs. ", total_esperado
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    float compra, descuento, pagar;\n    \n    printf("Ingrese total de la compra:\\n");\n    scanf("%f", &compra);\n    \n    descuento = compra * 0.15;\n    pagar = compra - descuento;\n    \n    printf("Descuento (15%%): Bs. %.2f\\n", descuento);\n    printf("A pagar: Bs. %.2f\\n", pagar);\n    \n    return 0;\n}`,
    typescript: `function descuentoTienda(): void {\n    let compra: number = parseFloat(prompt("Total compras:") || "0");\n    \n    let descuento: number = compra * 0.15;\n    let pagar: number = compra - descuento;\n    \n    console.log(\`Descuento aplicado: Bs. \${descuento.toFixed(2)}\`);\n    console.log(\`A pagar: Bs. \${pagar.toFixed(2)}\`);\n}\n\ndescuentoTienda();`
  },
  {
    numero: 18,
    enunciado: "Escribir un algoritmo para convertir una medida dada en pies a sus equivalentes en: Yardas, Pulgadas, Centímetros, Metros. Tome en cuenta que 1 pie =12 pulgadas, 1 yarda = 3 pies, 1 pulgada = 2.54 cm, 1m= 100 cm.",
    pseudocodigo: `Algoritmo Convertir_Pies
  Variables:
    pies, yardas, pulgadas, centimetros, metros: Real
Inicio
  Escribir "Ingrese la cantidad de pies a convertir:"
  Leer pies
  
  yardas <- pies / 3
  pulgadas <- pies * 12
  centimetros <- pulgadas * 2.54
  metros <- centimetros / 100
  
  Escribir "Equivalencia de ", pies, " pies:"
  Escribir "Yardas: ", yardas
  Escribir "Pulgadas: ", pulgadas
  Escribir "Centímetros: ", centimetros
  Escribir "Metros: ", metros
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    float pies, yd, in, cm, m;\n    \n    printf("Ingrese cantidad de pies:\\n");\n    scanf("%f", &pies);\n    \n    yd = pies / 3.0;\n    in = pies * 12.0;\n    cm = in * 2.54;\n    m = cm / 100.0;\n    \n    printf("Yardas: %.2f\\n", yd);\n    printf("Pulgadas: %.2f\\n", in);\n    printf("Centímetros: %.2f\\n", cm);\n    printf("Metros: %.2f\\n", m);\n    \n    return 0;\n}`,
    typescript: `function conversorMedidas(): void {\n    let pies: number = parseFloat(prompt("Ingrese pies:") || "0");\n    \n    let yd: number = pies / 3;\n    let pulg: number = pies * 12;\n    let cm: number = pulg * 2.54;\n    let m: number = cm / 100;\n    \n    console.log(\`Equivalencias de \${pies} pies:\`);\n    console.log(\`Yardas: \${yd}\\nPulgadas: \${pulg}\\nCentímetros: \${cm}\\nMetros: \${m}\`);\n}\n\nconversorMedidas();`
  },
  {
    numero: 19,
    enunciado: "Un vendedor que tiene su sueldo base mensual y aparte recibe una comisión del 10% del total de las ventas realizadas en el mes. Se requiere un algoritmo para determinar cuánto ganará en un mes en el que hizo tres ventas.",
    pseudocodigo: `Algoritmo Salario_Vendedor_Comisiones
  Constantes:
    PCT_COMISION = 0.10
  Variables:
    sueldo_base: Real
    venta1, venta2, venta3, total_ventas: Real
    comision_total, sueldo_neto: Real
Inicio
  Escribir "Ingrese el sueldo base mensual del vendedor:"
  Leer sueldo_base
  Escribir "Ingrese monto de la Venta 1:"
  Leer venta1
  Escribir "Ingrese monto de la Venta 2:"
  Leer venta2
  Escribir "Ingrese monto de la Venta 3:"
  Leer venta3
  
  total_ventas <- venta1 + venta2 + venta3
  comision_total <- total_ventas * PCT_COMISION
  sueldo_neto <- sueldo_base + comision_total
  
  Escribir "Total de comisiones ganadas: Bs. ", comision_total
  Escribir "Sueldo Total del mes: Bs. ", sueldo_neto
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    float sueldo_base, v1, v2, v3, comisiones, total;\n    \n    printf("Sueldo Base:\\n");\n    scanf("%f", &sueldo_base);\n    printf("Ventas (v1 v2 v3):\\n");\n    scanf("%f %f %f", &v1, &v2, &v3);\n    \n    comisiones = (v1 + v2 + v3) * 0.10;\n    total = sueldo_base + comisiones;\n    \n    printf("Comisiones Ganadas: Bs. %.2f\\n", comisiones);\n    printf("Sueldo Mensual Neto: Bs. %.2f\\n", total);\n    \n    return 0;\n}`,
    typescript: `function ventasVendedor(): void {\n    let base: number = parseFloat(prompt("Sueldo Base:") || "0");\n    let v1: number = parseFloat(prompt("Venta 1:") || "0");\n    let v2: number = parseFloat(prompt("Venta 2:") || "0");\n    let v3: number = parseFloat(prompt("Venta 3:") || "0");\n    \n    let comisiones = (v1 + v2 + v3) * 0.10;\n    let sueldo_total = base + comisiones;\n    \n    console.log(\`Comisiones ganadas: Bs. \${comisiones}\`);\n    console.log(\`Sueldo Neto: Bs. \${sueldo_total}\`);\n}\n\nventasVendedor();`
  },
  {
    numero: 20,
    enunciado: "Un profesor desea saber qué porcentaje de hombres y de porcentaje de mujeres hay en un grupo de estudiantes, proponga un algoritmo para resolver este problema.",
    pseudocodigo: `Algoritmo Porcentaje_Por_Generos
  Variables:
    cant_hombres, cant_mujeres, total_estudiantes: Entero
    porc_hombres, porc_mujeres: Real
Inicio
  Escribir "Ingrese la cantidad de estudiantes hombres:"
  Leer cant_hombres
  Escribir "Ingrese la cantidad de estudiantes mujeres:"
  Leer cant_mujeres
  
  total_estudiantes <- cant_hombres + cant_mujeres
  
  porc_hombres <- (cant_hombres / total_estudiantes) * 100
  porc_mujeres <- (cant_mujeres / total_estudiantes) * 100
  
  Escribir "Porcentaje de Hombres: ", porc_hombres, "%"
  Escribir "Porcentaje de Mujeres: ", porc_mujeres, "%"
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    int hombres, mujeres, total;\n    \n    printf("Hombres:\\n");\n    scanf("%d", &hombres);\n    printf("Mujeres:\\n");\n    scanf("%d", &mujeres);\n    \n    total = hombres + mujeres;\n    \n    printf("Hombres: %.2f%%\\n", ((float)hombres / total) * 100);\n    printf("Mujeres: %.2f%%\\n", ((float)mujeres / total) * 100);\n    \n    return 0;\n}`,
    typescript: `function porcentajesClase(): void {\n    let hom: number = parseInt(prompt("Hombres:") || "0", 10);\n    let muj: number = parseInt(prompt("Mujeres:") || "0", 10);\n    \n    let total: number = hom + muj;\n    \n    console.log(\`Hombres: \${((hom/total)*100).toFixed(2)}%\`);\n    console.log(\`Mujeres: \${((muj/total)*100).toFixed(2)}%\`);\n}\n\nporcentajesClase();`
  },
  {
    numero: 21,
    enunciado: "Diseñe un algoritmo que lea los datos necesarios y calcule la masa, según la fórmula dada: Masa = (presión x volumen) / (0.37 x (temperatura + 460))",
    pseudocodigo: `Algoritmo Calculo_De_Masa
  Variables:
    presion, volumen, temperatura, masa: Real
Inicio
  Escribir "Ingrese la presión del sistema:"
  Leer presion
  Escribir "Ingrese el volumen:"
  Leer volumen
  Escribir "Ingrese la temperatura (Fahrenheit/Grados pertinentes):"
  Leer temperatura
  
  masa <- (presion * volumen) / (0.37 * (temperatura + 460))
  
  Escribir "La masa calculada del sistema es: ", masa
Fin`,
    c: `#include <stdio.h>\n\nint main() {\n    float presion, volumen, temperatura, masa;\n    \n    printf("Presión:\\n");\n    scanf("%f", &presion);\n    printf("Volumen:\\n");\n    scanf("%f", &volumen);\n    printf("Temperatura:\\n");\n    scanf("%f", &temperatura);\n    \n    masa = (presion * volumen) / (0.37 * (temperatura + 460.0));\n    \n    printf("Masa calculada: %.4f\\n", masa);\n    \n    return 0;\n}`,
    typescript: `function calcularMasa(): void {\n    let p: number = parseFloat(prompt("Presión:") || "0");\n    let v: number = parseFloat(prompt("Volumen:") || "0");\n    let t: number = parseFloat(prompt("Temperatura:") || "0");\n    \n    let masa: number = (p * v) / (0.37 * (t + 460));\n    \n    console.log(\`La masa calculada es: \${masa}\`);\n}\n\ncalcularMasa();`
  }
];
