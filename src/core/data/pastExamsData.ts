import { PrivateExercise } from '../types/evaluacion.types';

export const pastExamsDB: PrivateExercise[] = [
  {
    id: "pe_gum1_01",
    categoria: "matematico-logico",
    numero: 1,
    enunciado: "Richard le da a Gumball una mesada semanal. Gumball quiere saber exactamente cuánto le queda después de comprar tres cosas que desea.\n\nTarea: Realice un algoritmo que solicite al usuario:\n- La mesada inicial de Gumball (un número entero).\n- El costo de su nuevo videojuego (entero).\n- El costo de la comida en la cafetería (entero).\n- El costo de una entrada al cine (entero).\n\nEl algoritmo debe calcular y mostrar el dinero final restante de Gumball.",
    puntosMaximos: 2,
    solucionOficial: {
      pseudocodigo: `ALGORITMO PresupuestoGumball\nDECLARACIÓN\nVARIABLES\n  mesada, videojuego, comida, cine, restante: entero\nINICIO\n  ESCRIBIR "Ingrese la mesada inicial de Gumball:"\n  LEER mesada\n  ESCRIBIR "Ingrese el costo del videojuego:"\n  LEER videojuego\n  ESCRIBIR "Ingrese el costo de la comida:"\n  LEER comida\n  ESCRIBIR "Ingrese el costo del cine:"\n  LEER cine\n\n  restante <- mesada - (videojuego + comida + cine)\n\n  ESCRIBIR "El dinero restante de Gumball es: ", restante\nFIN`,
      c: `#include <stdio.h>\n\nint main() {\n    int mesada, videojuego, comida, cine, restante;\n    printf("Ingrese la mesada inicial de Gumball:\\n");\n    scanf("%d", &mesada);\n    printf("Ingrese el costo del videojuego:\\n");\n    scanf("%d", &videojuego);\n    printf("Ingrese el costo de la comida:\\n");\n    scanf("%d", &comida);\n    printf("Ingrese el costo del cine:\\n");\n    scanf("%d", &cine);\n\n    restante = mesada - (videojuego + comida + cine);\n\n    printf("El dinero restante de Gumball es: %d\\n", restante);\n    return 0;\n}`,
      typescript: `function calcularRestanteGumball(mesada: number, videojuego: number, comida: number, cine: number): number {\n  const restante = mesada - (videojuego + comida + cine);\n  return restante;\n}`
    }
  },
  {
    id: "pe_gum1_02",
    categoria: "anidados",
    numero: 2,
    enunciado: "Para entrar a la mansión de los Fitzgerald, se deben cumplir 4 condiciones de seguridad.\n\n- Condición 1: El primer dígito debe ser par.\n- Condición 2: La suma del segundo y tercer dígito debe ser menor que 10.\n- Condición 3: El cuarto dígito debe ser igual al primer dígito.\n\nTarea: Realice un algoritmo que solicite al usuario 4 dígitos (enteros del 0 al 9) de forma individual. Utilice condicionales anidados y lógicos para verificar las 3 reglas e imprimir:\n- \"Acceso Concedido a la Mansión Fitzgerald.\" (Si se cumplen las 3 condiciones)\n- \"Acceso Denegado. Código de seguridad incorrecto.\" (Si falla al menos una condición)",
    puntosMaximos: 2.5,
    solucionOficial: {
      pseudocodigo: `ALGORITMO AccesoMansion\nDECLARACIÓN\nVARIABLES\n  d1, d2, d3, d4: entero\nINICIO\n  ESCRIBIR "Ingrese el primer digito:"\n  LEER d1\n  ESCRIBIR "Ingrese el segundo digito:"\n  LEER d2\n  ESCRIBIR "Ingrese el tercer digito:"\n  LEER d3\n  ESCRIBIR "Ingrese el cuarto digito:"\n  LEER d4\n\n  SI (d1 MOD 2 = 0) ENTONCES\n    SI (d2 + d3 < 10) ENTONCES\n      SI (d4 = d1) ENTONCES\n        ESCRIBIR "Acceso Concedido a la Mansión Fitzgerald."\n      SINO\n        ESCRIBIR "Acceso Denegado. Código de seguridad incorrecto."\n      FIN SI\n    SINO\n      ESCRIBIR "Acceso Denegado. Código de seguridad incorrecto."\n    FIN SI\n  SINO\n    ESCRIBIR "Acceso Denegado. Código de seguridad incorrecto."\n  FIN SI\nFIN`,
      c: `#include <stdio.h>\n\nint main() {\n    int d1, d2, d3, d4;\n    printf("Ingrese d1, d2, d3, d4:\\n");\n    scanf("%d %d %d %d", &d1, &d2, &d3, &d4);\n\n    if (d1 % 2 == 0) {\n        if (d2 + d3 < 10) {\n            if (d4 == d1) {\n                printf("Acceso Concedido a la Mansion Fitzgerald.\\n");\n                return 0;\n            }\n        }\n    }\n    printf("Acceso Denegado. Codigo de seguridad incorrecto.\\n");\n    return 0;\n}`,
      typescript: `function verificarAcceso(d1: number, d2: number, d3: number, d4: number): string {\n  if (d1 % 2 === 0 && (d2 + d3 < 10) && d4 === d1) {\n    return "Acceso Concedido a la Mansión Fitzgerald.";\n  }\n  return "Acceso Denegado. Código de seguridad incorrecto.";\n}`
    }
  },
  {
    id: "pe_gum1_03",
    categoria: "ciclos-sencillos",
    numero: 3,
    enunciado: "Carrie (la fantasma) participa en un reto de resistencia y tiene 7000 puntos de \"Energía Fantasma\" inicial. Cada hora, pierde una cantidad de energía.\n\nEn la primera hora pierde 1000 puntos. A partir de la segunda hora, la pérdida de energía se reduce en un 15% respecto a la pérdida de la hora anterior.\n\nTarea: Realice un algoritmo que:\n- Utilice un ciclo para simular 8 horas.\n- Calcule la pérdida de energía de cada hora.\n- Calcule y muestre la Energía Fantasma final de Carrie al terminar la octava hora (Energía Inicial - Suma de todas las pérdidas).",
    puntosMaximos: 2.5,
    solucionOficial: {
      pseudocodigo: `ALGORITMO ResistenciaCarrie\nDECLARACIÓN\nVARIABLES\n  energia, perdida, totalPerdido: real\n  hora: entero\nINICIO\n  energia <- 7000.0\n  perdida <- 1000.0\n  totalPerdido <- 0.0\n\n  PARA hora <- 1 HASTA 8 CON PASO 1 HACER\n    totalPerdido <- totalPerdido + perdida\n    perdida <- perdida * 0.85\n  FIN PARA\n\n  energia <- energia - totalPerdido\n  ESCRIBIR "La Energia Fantasma final de Carrie es: ", energia\nFIN`,
      c: `#include <stdio.h>\n\nint main() {\n    double energia = 7000.0;\n    double perdida = 1000.0;\n    double totalPerdido = 0.0;\n\n    for (int hora = 1; hora <= 8; hora++) {\n        totalPerdido += perdida;\n        perdida *= 0.85;\n    }\n\n    energia -= totalPerdido;\n    printf("La Energia Fantasma final de Carrie es: %.2f\\n", energia);\n    return 0;\n}`,
      typescript: `function calcularEnergiaCarrie(): number {\n  let energia = 7000;\n  let perdida = 1000;\n  let totalPerdido = 0;\n  for (let h = 1; h <= 8; h++) {\n    totalPerdido += perdida;\n    perdida *= 0.85;\n  }\n  return energia - totalPerdido;\n}`
    }
  },
  {
    id: "pe_gum1_04",
    categoria: "ciclos-largos",
    numero: 4,
    enunciado: "Bobert, el robot, debe calibrar su habilidad procesando 12 tareas. Por cada tarea, el usuario debe ingresar la puntuación de Bobert (0 a 100). Bobert necesita saber en cuántas tareas superó un umbral y cuál fue su puntuación máxima.\n\nTarea: Realice un algoritmo que involucre todo (ingreso, condicionales y ciclos) para:\n- Utilizar un ciclo para procesar las 12 tareas.\n- Almacenar la suma total de las puntuaciones.\n- Contar cuántas tareas Bobert terminó con una puntuación de más de 85 puntos.\n- Determinar la puntuación más alta obtenida en las 12 tareas.\n\nAl finalizar el ciclo, mostrar:\n- El promedio de las puntuaciones.\n- La puntuación más alta obtenida.\n- La cantidad de tareas con puntuación superior a 85.",
    puntosMaximos: 3,
    solucionOficial: {
      pseudocodigo: `ALGORITMO RankingBobert\nDECLARACIÓN\nVARIABLES\n  i, puntuacion, suma, superior85, maxima: entero\n  promedio: real\nINICIO\n  suma <- 0\n  superior85 <- 0\n  maxima <- -1\n\n  PARA i <- 1 HASTA 12 CON PASO 1 HACER\n    ESCRIBIR "Ingrese la puntuacion de la tarea ", i, ":"\n    LEER puntuacion\n    suma <- suma + puntuacion\n    \n    SI (puntuacion > 85) ENTONCES\n      superior85 <- superior85 + 1\n    FIN SI\n    \n    SI (puntuacion > maxima) ENTONCES\n      maxima <- puntuacion\n    FIN SI\n  FIN PARA\n\n  promedio <- suma / 12.0\n  ESCRIBIR "El promedio de las puntuaciones es: ", promedio\n  ESCRIBIR "La puntuacion mas alta obtenida es: ", maxima\n  ESCRIBIR "Cantidad de tareas con puntuacion superior a 85: ", superior85\nFIN`,
      c: `#include <stdio.h>\n\nint main() {\n    int puntuacion, suma = 0, superior85 = 0, maxima = -1;\n    for (int i = 1; i <= 12; i++) {\n        printf("Ingrese puntuacion de tarea %d:\\n", i);\n        scanf("%d", &puntuacion);\n        suma += puntuacion;\n        if (puntuacion > 85) {\n            superior85++;\n        }\n        if (puntuacion > maxima) {\n            maxima = puntuacion;\n        }\n    }\n    double promedio = (double)suma / 12.0;\n    printf("El promedio de las puntuaciones es: %.2f\\n", promedio);\n    printf("La puntuacion mas alta obtenida es: %d\\n", maxima);\n    printf("Cantidad de tareas con puntuacion superior a 85: %d\\n", superior85);\n    return 0;\n}`,
      typescript: `function evaluarBobert(puntuaciones: number[]): { promedio: number, maxima: number, superior85: number } {\n  let suma = 0;\n  let superior85 = 0;\n  let maxima = -1;\n  for (let i = 0; i < 12; i++) {\n    const pt = puntuaciones[i] || 0;\n    suma += pt;\n    if (pt > 85) superior85++;\n    if (pt > maxima) maxima = pt;\n  }\n  return { promedio: suma / 12, maxima, superior85 };\n}`
    }
  },
  {
    id: "pe_gum2_01",
    categoria: "matematico-logico",
    numero: 1,
    enunciado: "Richard quiere calcular el costo total de tener su \"carro\" (la bicicleta) durante un mes.\n\nTarea: Realice un algoritmo que solicite:\n- El precio del almuerzo diario que Richard come (un número decimal).\n- La distancia total que Richard planea recorrer en el mes (en kilómetros, entero).\n- El costo por kilómetro de \"mantenimiento\" de su vehículo (un número decimal).\n\nEl algoritmo debe calcular y mostrar el Gasto Total Mensual de Richard, considerando 30 días de almuerzos y el costo total de mantenimiento.",
    puntosMaximos: 2,
    solucionOficial: {
      pseudocodigo: `ALGORITMO CostoCarroRichard\nDECLARACIÓN\nVARIABLES\n  almuerzo, costoKm, gastoTotal: real\n  distancia: entero\nINICIO\n  ESCRIBIR "Ingrese el precio del almuerzo diario:"\n  LEER almuerzo\n  ESCRIBIR "Ingrese la distancia total a recorrer (km):"\n  LEER distancia\n  ESCRIBIR "Ingrese el costo de mantenimiento por kilometro:"\n  LEER costoKm\n\n  gastoTotal <- (almuerzo * 30.0) + (distancia * costoKm)\n\n  ESCRIBIR "El Gasto Total Mensual de Richard es: ", gastoTotal\nFIN`,
      c: `#include <stdio.h>\n\nint main() {\n    double almuerzo, costoKm, gastoTotal;\n    int distancia;\n\n    printf("Ingrese precio almuerzo diario:\\n");\n    scanf("%lf", &almuerzo);\n    printf("Ingrese distancia total (km):\\n");\n    scanf("%d", &distancia);\n    printf("Ingrese costo de mantenimiento por km:\\n");\n    scanf("%lf", &costoKm);\n\n    gastoTotal = (almuerzo * 30.0) + (distancia * costoKm);\n    printf("El Gasto Total Mensual de Richard es: %.2f\\n", gastoTotal);\n    return 0;\n}`,
      typescript: `function calcularGastoMensual(almuerzo: number, distancia: number, costoKm: number): number {\n  const gastoTotal = (almuerzo * 30) + (distancia * costoKm);\n  return gastoTotal;\n}`
    }
  },
  {
    id: "pe_gum2_02",
    categoria: "anidados",
    numero: 2,
    enunciado: "Gumball y Darwin solo salen a jugar si se cumplen ciertas condiciones en casa:\n- Salen si ambos tienen su Habitación Limpia (Respuesta: \"Si\").\n- Salen si solo uno tiene su Habitación Limpia, PERO la hora es antes de las 4 PM (Hora < 16).\n- En cualquier otro caso, se quedan jugando videojuegos.\n\nTarea: Realice un algoritmo que solicite:\n- El estado de la Habitación de Gumball (\"Si\" o \"No\").\n- El estado de la Habitación de Darwin (\"Si\" o \"No\").\n- La Hora actual (un entero entre 0 y 23).\n\nEl algoritmo debe usar condicionales para imprimir:\n- \"¡Gumball y Darwin salen a explorar!\"\n- \"Se quedan en casa, a jugar videojuegos.\"",
    puntosMaximos: 2.5,
    solucionOficial: {
      pseudocodigo: `ALGORITMO DecisionSalida\nDECLARACIÓN\nVARIABLES\n  habGumball, habDarwin: texto\n  hora: entero\nINICIO\n  ESCRIBIR "Habitacion Gumball (Si/No):"\n  LEER habGumball\n  ESCRIBIR "Habitacion Darwin (Si/No):"\n  LEER habDarwin\n  ESCRIBIR "Hora actual (0-23):"\n  LEER hora\n\n  SI (habGumball = "Si" Y habDarwin = "Si") ENTONCES\n    ESCRIBIR "¡Gumball y Darwin salen a explorar!"\n  SINO\n    SI ( (habGumball = "Si" Y habDarwin = "No") O (habGumball = "No" Y habDarwin = "Si") ) Y (hora < 16) ENTONCES\n      ESCRIBIR "¡Gumball y Darwin salen a explorar!"\n    SINO\n      ESCRIBIR "Se quedan en casa, a jugar videojuegos."\n    FIN SI\n  FIN SI\nFIN`,
      c: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char habGumball[5], habDarwin[5];\n    int hora;\n\n    printf("Habitacion Gumball (Si/No):\\n");\n    scanf("%s", habGumball);\n    printf("Habitacion Darwin (Si/No):\\n");\n    scanf("%s", habDarwin);\n    printf("Hora actual:\\n");\n    scanf("%d", &hora);\n\n    int gLimpia = (strcmp(habGumball, "Si") == 0);\n    int dLimpia = (strcmp(habDarwin, "Si") == 0);\n\n    if (gLimpia && dLimpia) {\n        printf("¡Gumball y Darwin salen a explorar!\\n");\n    } else if ((gLimpia || dLimpia) && (hora < 16)) {\n        printf("¡Gumball y Darwin salen a explorar!\\n");\n    } else {\n        printf("Se quedan en casa, a jugar videojuegos.\\n");\n    }\n    return 0;\n}`,
      typescript: `function decidirSalida(habGumball: string, habDarwin: string, hora: number): string {\n  const gL = habGumball === "Si";\n  const dL = habDarwin === "Si";\n  if (gL && dL) {\n    return "¡Gumball y Darwin salen a explorar!";\n  }\n  if ((gL || dL) && hora < 16) {\n    return "¡Gumball y Darwin salen a explorar!";\n  }\n  return "Se quedan en casa, a jugar videojuegos.";\n}`
    }
  },
  {
    id: "pe_gum2_03",
    categoria: "ciclos-sencillos",
    numero: 3,
    enunciado: "Darwin quiere ahorrar para comprarle un regalo a Gumball. Su ahorro diario comienza en $5 y, gracias al efecto compuesto de su alcancía mágica, su ahorro se incrementa en un 10% del ahorro del día anterior, además de su aporte inicial de $5 cada día.\n\nTarea: Realice un algoritmo que:\n- Solicite al usuario la cantidad de días que Darwin va a ahorrar (N).\n- Utilice un ciclo repetitivo (para o mientras) para simular los N días, calculando y sumando el ahorro de cada día.\n- Imprima el monto total acumulado al finalizar el último día.",
    puntosMaximos: 2.5,
    solucionOficial: {
      pseudocodigo: `ALGORITMO AhorroDarwin\nDECLARACIÓN\nVARIABLES\n  n, dia: entero\n  ahorroDia, totalAcumulado: real\nINICIO\n  ESCRIBIR "Ingrese la cantidad de dias a ahorrar:"\n  LEER n\n\n  totalAcumulado <- 0.0\n  ahorroDia <- 5.0\n\n  PARA dia <- 1 HASTA n CON PASO 1 HACER\n    totalAcumulado <- totalAcumulado + ahorroDia\n    ahorroDia <- (ahorroDia * 0.10) + ahorroDia + 5.0\n  FIN PARA\n\n  ESCRIBIR "El monto total acumulado es: ", totalAcumulado\nFIN`,
      c: `#include <stdio.h>\n\nint main() {\n    int n;\n    double ahorroDia = 5.0, totalAcumulado = 0.0;\n    printf("Ingrese dias a ahorrar:\\n");\n    scanf("%d", &n);\n\n    for (int dia = 1; dia <= n; dia++) {\n        totalAcumulado += ahorroDia;\n        ahorroDia = (ahorroDia * 0.10) + ahorroDia + 5.0;\n    }\n\n    printf("El monto total acumulado es: %.2f\\n", totalAcumulado);\n    return 0;\n}`,
      typescript: `function calcularAhorroDarwin(n: number): number {\n  let ahorroDia = 5;\n  let totalAcumulado = 0;\n  for (let dia = 1; dia <= n; dia++) {\n    totalAcumulado += ahorroDia;\n    ahorroDia = (ahorroDia * 0.10) + ahorroDia + 5;\n  }\n  return totalAcumulado;\n}`
    }
  },
  {
    id: "pe_gum3_02",
    categoria: "anidados",
    numero: 2,
    enunciado: "Elmore Junior High clasifica a sus estudiantes según su edad para asignarles actividades:\n- Junior: Edad <= 12.\n- Teen: Edad <= 17.\n- Adult: Edad >= 18.\n\nTarea: Solicite la edad de un estudiante (entero). Utilice condicionales (si, sino si, sino) para imprimir la clasificación a la que pertenece el estudiante (Junior, Teen o Adult).",
    puntosMaximos: 2.5,
    solucionOficial: {
      pseudocodigo: `ALGORITMO ClasificacionEstudiantesElmore\nDECLARACIÓN\nVARIABLES\n  edad: entero\nINICIO\n  ESCRIBIR "Ingrese la edad del estudiante:"\n  LEER edad\n\n  SI (edad <= 12) ENTONCES\n    ESCRIBIR "Junior"\n  SINO\n    SI (edad <= 17) ENTONCES\n      ESCRIBIR "Teen"\n    SINO\n      ESCRIBIR "Adult"\n    FIN SI\n  FIN SI\nFIN`,
      c: `#include <stdio.h>\n\nint main() {\n    int edad;\n    printf("Ingrese la edad del estudiante:\\n");\n    scanf("%d", &edad);\n\n    if (edad <= 12) {\n        printf("Junior\\n");\n    } else if (edad <= 17) {\n        printf("Teen\\n");\n    } else {\n        printf("Adult\\n");\n    }\n    return 0;\n}`,
      typescript: `function clasificarEstudianteElmore(edad: number): string {\n  if (edad <= 12) return "Junior";\n  if (edad <= 17) return "Teen";\n  return "Adult";\n}`
    }
  },
  {
    id: "pe_bat1_01",
    categoria: "matematico-logico",
    numero: 1,
    enunciado: "Batman quiere calcular la energía potencial gravitacional del Batimóvil en una colina.\n\nFórmula: Ep = m * g * h\nDonde:\n- m es la masa del Batimóvil (proporcionada por el usuario).\n- g es la aceleración debida a la gravedad (aproximadamente 9.81 m/s²).\n- h es la altura de la colina (proporcionada por el usuario).\n\nTarea: Desarrolle un algoritmo que solicite la masa y la altura necesarios, calcule y muestre la energía potencial gravitacional.",
    puntosMaximos: 2,
    solucionOficial: {
      pseudocodigo: `ALGORITMO EnergiaPotencialBatimovil\nDECLARACIÓN\nVARIABLES\n  masa, altura, ep: real\nINICIO\n  ESCRIBIR "Ingrese la masa del Batimovil (kg):"\n  LEER masa\n  ESCRIBIR "Ingrese la altura de la colina (m):"\n  LEER altura\n\n  ep <- masa * 9.81 * altura\n\n  ESCRIBIR "La energia potencial gravitacional es: ", ep\nFIN`,
      c: `#include <stdio.h>\n\nint main() {\n    double masa, altura, ep;\n    printf("Ingrese la masa del Batimovil (kg):\\n");\n    scanf("%lf", &masa);\n    printf("Ingrese la altura de la colina (m):\\n");\n    scanf("%lf", &altura);\n\n    ep = masa * 9.81 * altura;\n    printf("La energia potencial gravitacional es: %.2f\\n", ep);\n    return 0;\n}`,
      typescript: `function calcularEnergiaPotencial(masa: number, altura: number): number {\n  const ep = masa * 9.81 * altura;\n  return ep;\n}`
    }
  },
  {
    id: "pe_bat1_02",
    categoria: "ciclos-sencillos",
    numero: 2,
    enunciado: "Batman necesita identificar a los villanos que tienen un número par de crímenes en Gotham City.\n\nTarea: Cree un algoritmo que pida al usuario ingresar dos números enteros que representen un rango de crímenes (un número mínimo y un número máximo). El algoritmo debe mostrar todos los números pares que se encuentran entre esos dos números (incluyéndolos). Si no hay números pares en ese rango, debe mostrar un mensaje indicando esto.",
    puntosMaximos: 2.5,
    solucionOficial: {
      pseudocodigo: `ALGORITMO CrimenesParesGotham\nDECLARACIÓN\nVARIABLES\n  minimo, maximo, i, contadorPares: entero\nINICIO\n  ESCRIBIR "Ingrese el numero minimo de crimenes:"\n  LEER minimo\n  ESCRIBIR "Ingrese el numero maximo de crimenes:"\n  LEER maximo\n\n  contadorPares <- 0\n\n  PARA i <- minimo HASTA maximo CON PASO 1 HACER\n    SI (i MOD 2 = 0) ENTONCES\n      ESCRIBIR i\n      contadorPares <- contadorPares + 1\n    FIN SI\n  FIN PARA\n\n  SI (contadorPares = 0) ENTONCES\n    ESCRIBIR "No hay numeros pares en ese rango."\n  FIN SI\nFIN`,
      c: `#include <stdio.h>\n\nint main() {\n    int minimo, maximo, i, contadorPares = 0;\n    printf("Ingrese el rango minimo y maximo:\\n");\n    scanf("%d %d", &minimo, &maximo);\n\n    for (i = minimo; i <= maximo; i++) {\n        if (i % 2 == 0) {\n            printf("%d\\n", i);\n            contadorPares++;\n        }\n    }\n\n    if (contadorPares == 0) {\n        printf("No hay numeros pares en ese rango.\\n");\n    }\n    return 0;\n}`,
      typescript: `function encontrarCrimenesPares(minimo: number, maximo: number): number[] {\n  const pares: number[] = [];\n  for (let i = minimo; i <= maximo; i++) {\n    if (i % 2 === 0) pares.push(i);\n  }\n  return pares;\n}`
    }
  },
  {
    id: "pe_bat1_03",
    categoria: "anidados",
    numero: 3,
    enunciado: "Bruce Wayne está construyendo un nuevo Batimóvil con varias piezas LEGO. Cada tipo de pieza tiene un costo diferente:\n- ruedas: 50 bs\n- chasis: 100 bs\n- motor: 200 bs\n- accesorios: 25 bs\n\nTarea: Desarrolle un algoritmo que permita al usuario ingresar la cantidad necesaria de cada tipo de pieza y calcule el costo total del Batimóvil.\n- Si el costo supera 500 bs, aplica un descuento del 10%.\n- Además, si se compran más de 4 motores, aplica un descuento adicional del 5%.\nMuestra el costo final después de aplicar todos los descuentos.",
    puntosMaximos: 3,
    solucionOficial: {
      pseudocodigo: `ALGORITMO BatimovilLego\nDECLARACIÓN\nVARIABLES\n  ruedas, chasis, motores, accesorios: entero\n  costoBase, costoFinal: real\nINICIO\n  ESCRIBIR "Ingrese cantidad de ruedas:"\n  LEER ruedas\n  ESCRIBIR "Ingrese cantidad de chasis:"\n  LEER chasis\n  ESCRIBIR "Ingrese cantidad de motores:"\n  LEER motores\n  ESCRIBIR "Ingrese cantidad de accesorios:"\n  LEER accesorios\n\n  costoBase <- (ruedas * 50.0) + (chasis * 100.0) + (motores * 200.0) + (accesorios * 25.0)\n  costoFinal <- costoBase\n\n  SI (costoBase > 500.0) ENTONCES\n    costoFinal <- costoFinal * 0.90\n  FIN SI\n\n  SI (motores > 4) ENTONCES\n    costoFinal <- costoFinal * 0.95\n  FIN SI\n\n  ESCRIBIR "El costo final del Batimovil es: ", costoFinal\nFIN`,
      c: `#include <stdio.h>\n\nint main() {\n    int ruedas, chasis, motores, accesorios;\n    double costoBase, costoFinal;\n\n    printf("Ingrese ruedas, chasis, motores, accesorios:\\n");\n    scanf("%d %d %d %d", &ruedas, &chasis, &motores, &accesorios);\n\n    costoBase = (ruedas * 50.0) + (chasis * 100.0) + (motores * 200.0) + (accesorios * 25.0);\n    costoFinal = costoBase;\n\n    if (costoBase > 500.0) {\n        costoFinal *= 0.90;\n    }\n    if (motores > 4) {\n        costoFinal *= 0.95;\n    }\n\n    printf("El costo final del Batimovil es: %.2f\\n", costoFinal);\n    return 0;\n}`,
      typescript: `function calcularCostoBatimovil(ruedas: number, chasis: number, motores: number, accesorios: number): number {\n  let costo = (ruedas * 50) + (chasis * 105) + (motores * 200) + (accesorios * 25);\n  if (costo > 500) costo *= 0.90;\n  if (motores > 4) costo *= 0.95;\n  return costo;\n}`
    }
  },
  {
    id: "pe_bat1_04",
    categoria: "ciclos-largos",
    numero: 4,
    enunciado: "Batman debe decidir si puede llevar a cabo una misión de rescate en función del número de aliados disponibles y su nivel de habilidad.\n\nTarea: Crea un algoritmo que permita ingresar el número de aliados y su nivel de habilidad (1-10). Si hay al menos 3 aliados con un nivel mayor a 5, imprime \"Misión segura\". De lo contrario, imprime \"Misión peligrosa\".",
    puntosMaximos: 2.5,
    solucionOficial: {
      pseudocodigo: `ALGORITMO DecisionMisionRescate\nDECLARACIÓN\nVARIABLES\n  cantAliados, habilidad, i, aliadosAptos: entero\nINICIO\n  ESCRIBIR "Ingrese el numero de aliados:"\n  LEER cantAliados\n\n  aliadosAptos <- 0\n\n  PARA i <- 1 HASTA cantAliados CON PASO 1 HACER\n    ESCRIBIR "Ingrese el nivel de habilidad del aliado ", i, " (1-10):"\n    LEER habilidad\n    SI (habilidad > 5) ENTONCES\n      aliadosAptos <- aliadosAptos + 1\n    FIN SI\n  FIN PARA\n\n  SI (aliadosAptos >= 3) ENTONCES\n    ESCRIBIR "Misión segura"\n  SINO\n    ESCRIBIR "Misión peligrosa"\n  FIN SI\nFIN`,
      c: `#include <stdio.h>\n\nint main() {\n    int cantAliados, habilidad, i, aliadosAptos = 0;\n    printf("Ingrese numero de aliados:\\n");\n    scanf("%d", &cantAliados);\n\n    for (i = 1; i <= cantAliados; i++) {\n        printf("Habilidad del aliado %d:\\n", i);\n        scanf("%d", &habilidad);\n        if (habilidad > 5) {\n            aliadosAptos++;\n        }\n    }\n\n    if (aliadosAptos >= 3) {\n        printf("Mision segura\\n");\n    } else {\n        printf("Mision peligrosa\\n");\n    }\n    return 0;\n}`,
      typescript: `function evaluarMision(habilidadesAliados: number[]): string {\n  const aliadosAptos = habilidadesAliados.filter(h => h > 5).length;\n  return aliadosAptos >= 3 ? "Misión segura" : "Misión peligrosa";\n}`
    }
  },
  {
    id: "pe_bat2_01",
    categoria: "matematico-logico",
    numero: 1,
    enunciado: "Batman está probando un nuevo resorte en su laboratorio. Usa la Ley de Hooke, que establece que la fuerza ejercida por un resorte es proporcional a su deformación:\n\nF = k * x\nDonde:\n- F es la fuerza (calculada y mostrada).\n- k es la constante del resorte (proporcionada por el usuario).\n- x es la elongación/deformación (proporcionada por el usuario).\n\nTarea: Realice un algoritmo que solicite la constante del resorte y la elongación necesarios, calcule y muestre la fuerza ejercida.",
    puntosMaximos: 2,
    solucionOficial: {
      pseudocodigo: `ALGORITMO LeyHookeResorte\nDECLARACIÓN\nVARIABLES\n  fuerza, kConstante, elongacion: real\nINICIO\n  ESCRIBIR "Ingrese la constante del resorte (k):"\n  LEER kConstante\n  ESCRIBIR "Ingrese la elongacion del resorte (x):"\n  LEER elongacion\n\n  fuerza <- kConstante * elongacion\n\n  ESCRIBIR "La fuerza ejercida es: ", fuerza\nFIN`,
      c: `#include <stdio.h>\n\nint main() {\n    double fuerza, kConstante, elongacion;\n    printf("Ingrese constante k y elongacion x:\\n");\n    scanf("%lf %lf", &kConstante, &elongacion);\n\n    fuerza = kConstante * elongacion;\n    printf("La fuerza ejercida es: %.2f\\n", fuerza);\n    return 0;\n}`,
      typescript: `function calcularLeyHooke(k: number, x: number): number {\n  const f = k * x;\n  return f;\n}`
    }
  },
  {
    id: "pe_bat2_02",
    categoria: "anidados",
    numero: 2,
    enunciado: "En Gotham City, se realizó una votación para elegir al \"Villano del Año\". Los ciudadanos pueden votar por \"Joker\", \"Penguin\" o \"Harley Quinn\".\n\nTarea: Realice un algoritmo que reciba los votos acumulados de cada candidato (un entero para cada uno, sumando un total de 100 votos) y determine:\n- Qué villano ganó.\n- Cuántos votos recibió cada uno.\n- El porcentaje que representa cada opción respecto al total de 100 votos.",
    puntosMaximos: 2.5,
    solucionOficial: {
      pseudocodigo: `ALGORITMO GanadorVillanoAnio\nDECLARACIÓN\nVARIABLES\n  vJoker, vPenguin, vHarley, totalVotos: entero\n  pctJoker, pctPenguin, pctHarley: real\nINICIO\n  ESCRIBIR "Ingrese los votos para Joker:"\n  LEER vJoker\n  ESCRIBIR "Ingrese los votos para Penguin:"\n  LEER vPenguin\n  ESCRIBIR "Ingrese los votos para Harley Quinn:"\n  LEER vHarley\n\n  totalVotos <- vJoker + vPenguin + vHarley\n\n  pctJoker <- (vJoker / 100.0) * 100.0\n  pctPenguin <- (vPenguin / 100.0) * 100.0\n  pctHarley <- (vHarley / 100.0) * 100.0\n\n  ESCRIBIR "Votos Joker: ", vJoker, " (", pctJoker, "%)"\n  ESCRIBIR "Votos Penguin: ", vPenguin, " (", pctPenguin, "%)"\n  ESCRIBIR "Votos Harley Quinn: ", vHarley, " (", pctHarley, "%)"\n\n  SI (vJoker > vPenguin Y vJoker > vHarley) ENTONCES\n    ESCRIBIR "El ganador del Villano del Año es: Joker"\n  SINO\n    SI (vPenguin > vJoker Y vPenguin > vHarley) ENTONCES\n      ESCRIBIR "El ganador del Villano del Año es: Penguin"\n    SINO\n      SI (vHarley > vJoker Y vHarley > vPenguin) ENTONCES\n        ESCRIBIR "El ganador del Villano del Año es: Harley Quinn"\n      SINO\n        ESCRIBIR "Hubo un empate entre los villanos."\n      FIN SI\n    FIN SI\n  FIN SI\nFIN`,
      c: `#include <stdio.h>\n\nint main() {\n    int vJoker, vPenguin, vHarley;\n    printf("Votos Joker, Penguin y Harley:\\n");\n    scanf("%d %d %d", &vJoker, &vPenguin, &vHarley);\n\n    double pJ = (vJoker / 100.0) * 100.0;\n    double pP = (vPenguin / 100.0) * 100.0;\n    double pH = (vHarley / 100.0) * 100.0;\n\n    printf("Joker: %d (%.1f%%)\\n", vJoker, pJ);\n    printf("Penguin: %d (%.1f%%)\\n", vPenguin, pP);\n    printf("Harley: %d (%.1f%%)\\n", vHarley, pH);\n\n    if (vJoker > vPenguin && vJoker > vHarley) {\n        printf("Ganador: Joker\\n");\n    } else if (vPenguin > vJoker && vPenguin > vHarley) {\n        printf("Ganador: Penguin\\n");\n    } else if (vHarley > vJoker && vHarley > vPenguin) {\n        printf("Ganador: Harley Quinn\\n");\n    } else {\n        printf("Hubo un empate\\n");\n    }\n    return 0;\n}`,
      typescript: `function evaluarGanadorVillanos(vJ: number, vP: number, vH: number): string {\n  if (vJ > vP && vJ > vH) return "Joker";\n  if (vP > vJ && vP > vH) return "Penguin";\n  if (vH > vJ && vH > vP) return "Harley Quinn";\n  return "Empate";\n}`
    }
  },
  {
    id: "pe_bat2_03",
    categoria: "ciclos-largos",
    numero: 3,
    enunciado: "Batman lleva un registro de sus misiones completadas. Cada misión tiene un nivel de dificultad del 1 al 5 y una duración en horas.\n\nTarea: Crea un algoritmo que permita ingresar la información de hasta 20 misiones y determine:\n- El promedio de dificultad de las misiones.\n- La misión más larga en horas.\n- Cuántas misiones fueron consideradas \"fáciles\" (nivel 1-2) y cuántas \"difíciles\" (nivel 4-5).",
    puntosMaximos: 3,
    solucionOficial: {
      pseudocodigo: `ALGORITMO RegistroMisionesBatman\nDECLARACIÓN\nVARIABLES\n  i, dificultad, mFaciles, mDificiles: entero\n  duracion, sumaDificultad, maxDuracion, promDificultad: real\nINICIO\n  sumaDificultad <- 0.0\n  maxDuracion <- -1.0\n  mFaciles <- 0\n  mDificiles <- 0\n\n  PARA i <- 1 HASTA 20 CON PASO 1 HACER\n    ESCRIBIR "Ingrese dificultad de la mision ", i, " (1-5):"\n    LEER dificultad\n    ESCRIBIR "Ingrese duracion en horas de la mision ", i, ":"\n    LEER duracion\n\n    sumaDificultad <- sumaDificultad + dificultad\n\n    SI (duracion > maxDuracion) ENTONCES\n      maxDuracion <- duracion\n    FIN SI\n\n    SI (dificultad <= 2) ENTONCES\n      mFaciles <- mFaciles + 1\n    SINO\n      SI (dificultad >= 4) ENTONCES\n        mDificiles <- mDificiles + 1\n      FIN SI\n    FIN SI\n  FIN PARA\n\n  promDificultad <- sumaDificultad / 20.0\n  ESCRIBIR "Promedio de dificultad: ", promDificultad\n  ESCRIBIR "Mision mas larga (horas): ", maxDuracion\n  ESCRIBIR "Misiones faciles: ", mFaciles\n  ESCRIBIR "Misiones dificiles: ", mDificiles\nFIN`,
      c: `#include <stdio.h>\n\nint main() {\n    int dificultad, mFaciles = 0, mDificiles = 0;\n    double duracion, sumaDificultad = 0.0, maxDuracion = -1.0;\n\n    for (int i = 1; i <= 20; i++) {\n        printf("Dificultad y duracion de mision %d:\\n", i);\n        scanf("%d %lf", &dificultad, &duracion);\n        sumaDificultad += dificultad;\n        if (duracion > maxDuracion) {\n            maxDuracion = duracion;\n        }\n        if (dificultad <= 2) {\n            mFaciles++;\n        } else if (dificultad >= 4) {\n            mDificiles++;\n        }\n    }\n\n    printf("Promedio dificultad: %.2f\\n", sumaDificultad / 20.0);\n    printf("Mision mas larga: %.2f horas\\n", maxDuracion);\n    printf("Faciles: %d, Dificiles: %d\\n", mFaciles, mDificiles);\n    return 0;\n}`,
      typescript: `function registrarMisiones(dificultades: number[], duraciones: number[]): { promedioDif: number, maxHrs: number, faciles: number, dificiles: number } {\n  let sumDif = 0, maxD = 0, fac = 0, dif = 0;\n  for(let i=0; i<20; i++) {\n    const d = dificultades[i] || 0;\n    const t = duraciones[i] || 0;\n    sumDif += d;\n    if (t > maxD) maxD = t;\n    if (d <= 2) fac++;\n    else if (d >= 4) dif++;\n  }\n  return { promedioDif: sumDif / 20, maxHrs: maxD, faciles: fac, dificiles: dif };\n}`
    }
  },
  {
    id: "pe_bat3_01",
    categoria: "matematico-logico",
    numero: 1,
    enunciado: "Batman está analizando las frecuencias de las ondas sonoras en Gotham.\n\nFórmula: f = v / λ\nDonde:\n- f es la frecuencia (calculada y mostrada).\n- v es la velocidad de la onda (proporcionada por el usuario).\n- λ es la longitud de onda (proporcionada por el usuario).\n\nTarea: Cree un algoritmo que solicite al usuario los valores de velocidad y longitud de la onda, calcule y muestre la frecuencia resultante.",
    puntosMaximos: 2,
    solucionOficial: {
      pseudocodigo: `ALGORITMO FrecuenciaOndas\nDECLARACIÓN\nVARIABLES\n  frecuencia, velocidad, longitud: real\nINICIO\n  ESCRIBIR "Ingrese la velocidad de la onda (v):"\n  LEER velocidad\n  ESCRIBIR "Ingrese la longitud de onda (lambda):"\n  LEER longitud\n\n  frecuencia <- velocidad / longitud\n\n  ESCRIBIR "La frecuencia de la onda es: ", frecuencia\nFIN`,
      c: `#include <stdio.h>\n\nint main() {\n    double velocidad, longitud, frecuencia;\n    printf("Ingrese velocidad y longitud de onda:\\n");\n    scanf("%lf %lf", &velocidad, &longitud);\n\n    frecuencia = velocidad / longitud;\n    printf("La frecuencia de la onda es: %.2f\\n", frecuencia);\n    return 0;\n}`,
      typescript: `function calcularFrecuenciaOnda(v: number, lambda: number): number {\n  return v / lambda;\n}`
    }
  },
  {
    id: "pe_bat3_02",
    categoria: "ciclos-sencillos",
    numero: 2,
    enunciado: "Batman tiene un registro de misiones completadas en su base de datos. Cada misión tiene un nivel de dificultad del 1 al 5.\n\nTarea: Escribe un algoritmo que permita ingresar los niveles de dificultad de 15 misiones y determine:\n- Cuántas misiones fueron fáciles (nivel 1-2).\n- Cuántas medianas (nivel 3).\n- Cuántas difíciles (nivel 4-5).\n\nMuestra cuántas misiones hay en cada una de las tres categorías al finalizar.",
    puntosMaximos: 2.5,
    solucionOficial: {
      pseudocodigo: `ALGORITMO CategorizarMisiones\nDECLARACIÓN\nVARIABLES\n  i, dificultad, faciles, medianas, dificiles: entero\nINICIO\n  faciles <- 0\n  medianas <- 0\n  dificiles <- 0\n\n  PARA i <- 1 HASTA 15 CON PASO 1 HACER\n    ESCRIBIR "Ingrese dificultad de la mision ", i, " (1-5):"\n    LEER dificultad\n    \n    SI (dificultad <= 2) ENTONCES\n      faciles <- faciles + 1\n    SINO\n      SI (dificultad = 3) ENTONCES\n        medianas <- medianas + 1\n      SINO\n        dificiles <- dificiles + 1\n      FIN SI\n    FIN SI\n  FIN PARA\n\n  ESCRIBIR "Misiones faciles: ", faciles\n  ESCRIBIR "Misiones medianas: ", medianas\n  ESCRIBIR "Misiones dificiles: ", dificiles\nFIN`,
      c: `#include <stdio.h>\n\nint main() {\n    int dificultad, faciles = 0, medianas = 0, dificiles = 0;\n    for (int i = 1; i <= 15; i++) {\n        printf("Dificultad de mision %d:\\n", i);\n        scanf("%d", &dificultad);\n        if (dificultad <= 2) {\n            faciles++;\n        } else if (dificultad == 3) {\n            medianas++;\n        } else {\n            dificiles++;\n        }\n    }\n    printf("Faciles: %d, Medianas: %d, Dificiles: %d\\n", faciles, medianas, dificiles);\n    return 0;\n}`,
      typescript: `function categorizar15Misiones(dificultades: number[]): { faciles: number, medianas: number, dificiles: number } {\n  let fac = 0, med = 0, dif = 0;\n  for (let i = 0; i < 15; i++) {\n    const d = dificultades[i] || 0;\n    if (d <= 2) fac++;\n    else if (d === 3) med++;\n    else dif++;\n  }\n  return { faciles: fac, medianas: med, dificiles: dif };\n}`
    }
  },
  {
    id: "pe_bat3_03",
    categoria: "anidados",
    numero: 3,
    enunciado: "Bruce Wayne está construyendo un nuevo Batimóvil con varias piezas LEGO. Cada tipo de pieza tiene un costo diferente:\n- Ruedas: 60 bs\n- Chasis: 120 bs\n- Motor: 250 bs\n- Accesorios: 30 bs\n\nTarea: Desarrolla un algoritmo que permita al usuario ingresar la cantidad necesaria de cada tipo de pieza y calcule el costo total del Batimóvil.\n- Si el costo total supera 700 bs, aplica un impuesto del 10%.\n- Además, si se compran más de 4 motores, aplica un impuesto adicional del 5%.\nMuestra el costo final después de aplicar todos los impuestos.",
    puntosMaximos: 3,
    solucionOficial: {
      pseudocodigo: `ALGORITMO BatimovilLegoImpuestos\nDECLARACIÓN\nVARIABLES\n  ruedas, chasis, motores, accesorios: entero\n  costoBase, costoFinal: real\nINICIO\n  ESCRIBIR "Ingrese cantidad de ruedas:"\n  LEER ruedas\n  ESCRIBIR "Ingrese cantidad de chasis:"\n  LEER chasis\n  ESCRIBIR "Ingrese cantidad de motores:"\n  LEER motores\n  ESCRIBIR "Ingrese cantidad de accesorios:"\n  LEER accesorios\n\n  costoBase <- (ruedas * 60.0) + (chasis * 120.0) + (motores * 250.0) + (accesorios * 30.0)\n  costoFinal <- costoBase\n\n  SI (costoBase > 700.0) ENTONCES\n    costoFinal <- costoFinal * 1.10\n  FIN SI\n\n  SI (motores > 4) ENTONCES\n    costoFinal <- costoFinal * 1.05\n  FIN SI\n\n  ESCRIBIR "El costo final del Batimovil (con impuestos) es: ", costoFinal\nFIN`,
      c: `#include <stdio.h>\n\nint main() {\n    int ruedas, chasis, motores, accesorios;\n    double costoBase, costoFinal;\n    printf("Ingrese ruedas, chasis, motores, accesorios:\\n");\n    scanf("%d %d %d %d", &ruedas, &chasis, &motores, &accesorios);\n\n    costoBase = (ruedas * 60.0) + (chasis * 120.0) + (motores * 250.0) + (accesorios * 30.0);\n    costoFinal = costoBase;\n\n    if (costoBase > 700.0) {\n        costoFinal *= 1.10;\n    }\n    if (motores > 4) {\n        costoFinal *= 1.05;\n    }\n    printf("El costo final del Batimovil es: %.2f\\n", costoFinal);\n    return 0;\n}`,
      typescript: `function calcularCostoBatimovilImpuestos(ruedas: number, chasis: number, motores: number, accesorios: number): number {\n  let costo = (ruedas * 60) + (chasis * 120) + (motores * 250) + (accesorios * 30);\n  if (costo > 700) costo *= 1.10;\n  if (motores > 4) costo *= 1.05;\n  return costo;\n}`
    }
  },
  {
    id: "pe_bat4_01",
    categoria: "matematico-logico",
    numero: 1,
    enunciado: "Batman está probando la aceleración de su Batimóvil. Si el Batimóvil parte del reposo y acelera uniformemente, la distancia recorrida se puede calcular con la fórmula:\n\nd = v0 * t + 0.5 * a * t^2\nDonde:\n- v0 es la velocidad inicial (en metros por segundo, m/s).\n- a es la aceleración (en metros por segundo al cuadrado, m/s²).\n- t es el tiempo que ha estado en movimiento (en segundos).\n\nTarea: Crea un algoritmo que permita al usuario ingresar la velocidad inicial del Batimóvil, la aceleración y el tiempo que ha estado en movimiento, y luego calcule y muestre la distancia recorrida.",
    puntosMaximos: 2,
    solucionOficial: {
      pseudocodigo: `ALGORITMO DistanciaRecorridaMRUV\nDECLARACIÓN\nVARIABLES\n  v0, a, t, d: real\nINICIO\n  ESCRIBIR "Ingrese la velocidad inicial (v0):"\n  LEER v0\n  ESCRIBIR "Ingrese la aceleracion (a):"\n  LEER a\n  ESCRIBIR "Ingrese el tiempo en movimiento (t):"\n  LEER t\n\n  d <- (v0 * t) + (0.5 * a * t * t)\n\n  ESCRIBIR "La distancia recorrida es: ", d\nFIN`,
      c: `#include <stdio.h>\n\nint main() {\n    double v0, a, t, d;\n    printf("Ingrese v0, a y t:\\n");\n    scanf("%lf %lf %lf", &v0, &a, &t);\n\n    d = (v0 * t) + (0.5 * a * t * t);\n    printf("La distancia recorrida es: %.2f\\n", d);\n    return 0;\n}`,
      typescript: `function calcularDistanciaMRUV(v0: number, a: number, t: number): number {\n  return (v0 * t) + (0.5 * a * t * t);\n}`
    }
  },
  {
    id: "pe_bat4_02",
    categoria: "ciclos-sencillos",
    numero: 2,
    enunciado: "Se realiza una encuesta entre los ciudadanos de Gotham para elegir el mejor vehículo de Batman: el Batimóvil, el Batwing o la Batbike.\n\nTarea: Realiza un algoritmo que recoja 50 votos individuales y determine cuál vehículo fue el más votado, cuántos votos recibió cada uno y el porcentaje que representa cada opción respecto al total de votos.",
    puntosMaximos: 2.5,
    solucionOficial: {
      pseudocodigo: `ALGORITMO VotacionVehiculos\nDECLARACIÓN\nVARIABLES\n  voto, i, vBatimovil, vBatwing, vBatbike: entero\n  pctBatimovil, pctBatwing, pctBatbike: real\nINICIO\n  vBatimovil <- 0\n  vBatwing <- 0\n  vBatbike <- 0\n\n  PARA i <- 1 HASTA 50 CON PASO 1 HACER\n    ESCRIBIR "Ingrese su voto (1: Batimovil, 2: Batwing, 3: Batbike):"\n    LEER voto\n    \n    SI (voto = 1) ENTONCES\n      vBatimovil <- vBatimovil + 1\n    SINO\n      SI (voto = 2) ENTONCES\n        vBatwing <- vBatwing + 1\n      SINO\n        SI (voto = 3) ENTONCES\n          vBatbike <- vBatbike + 1\n        FIN SI\n      FIN SI\n    FIN SI\n  FIN PARA\n\n  pctBatimovil <- (vBatimovil / 50.0) * 100.0\n  pctBatwing <- (vBatwing / 50.0) * 100.0\n  pctBatbike <- (vBatbike / 50.0) * 100.0\n\n  ESCRIBIR "Votos Batimovil: ", vBatimovil, " (", pctBatimovil, "%)"\n  ESCRIBIR "Votos Batwing: ", vBatwing, " (", pctBatwing, "%)"\n  ESCRIBIR "Votos Batbike: ", vBatbike, " (", pctBatbike, "%)"\n\n  SI (vBatimovil > vBatwing Y vBatimovil > vBatbike) ENTONCES\n    ESCRIBIR "El vehiculo ganador es: Batimovil"\n  SINO\n    SI (vBatwing > vBatimovil Y vBatwing > vBatbike) ENTONCES\n      ESCRIBIR "El vehiculo ganador es: Batwing"\n    SINO\n      SI (vBatbike > vBatimovil Y vBatbike > vBatwing) ENTONCES\n        ESCRIBIR "El vehiculo ganador es: Batbike"\n      SINO\n        ESCRIBIR "Hubo un empate entre los vehiculos."\n      FIN SI\n    FIN SI\n  FIN SI\nFIN`,
      c: `#include <stdio.h>\n\nint main() {\n    int voto, vBatimovil = 0, vBatwing = 0, vBatbike = 0;\n    for (int i = 1; i <= 50; i++) {\n        printf("Voto %d (1:Batimovil, 2:Batwing, 3:Batbike):\\n", i);\n        scanf("%d", &voto);\n        if (voto == 1) vBatimovil++;\n        else if (voto == 2) vBatwing++;\n        else if (voto == 3) vBatbike++;\n    }\n    double pBm = (vBatimovil / 50.0) * 100.0;\n    double pBw = (vBatwing / 50.0) * 100.0;\n    double pBb = (vBatbike / 50.0) * 100.0;\n\n    printf("Batimovil: %d (%.1f%%)\\n", vBatimovil, pBm);\n    printf("Batwing: %d (%.1f%%)\\n", vBatwing, pBw);\n    printf("Batbike: %d (%.1f%%)\\n", vBatbike, pBb);\n\n    if (vBatimovil > vBatwing && vBatimovil > vBatbike) printf("Ganador: Batimovil\\n");\n    else if (vBatwing > vBatimovil && vBatwing > vBatbike) printf("Ganador: Batwing\\n");\n    else if (vBatbike > vBatimovil && vBatbike > vBatwing) printf("Ganador: Batbike\\n");\n    else printf("Empate\\n");\n    return 0;\n}`,
      typescript: `function procesarVotosVehiculos(votos: number[]): { bm: number, bw: number, bb: number, ganador: string } {\n  let bm = 0, bw = 0, bb = 0;\n  for(let i=0; i<50; i++) {\n    const v = votos[i] || 0;\n    if (v === 1) bm++;\n    else if (v === 2) bw++;\n    else if (v === 3) bb++;\n  }\n  let ganador = "Empate";\n  if (bm > bw && bm > bb) ganador = "Batimovil";\n  else if (bw > bm && bw > bb) ganador = "Batwing";\n  else if (bb > bm && bb > bw) ganador = "Batbike";\n  return { bm, bw, bb, ganador };\n}`
    }
  },
  {
    id: "pe_bat4_03",
    categoria: "anidados",
    numero: 3,
    enunciado: "Bruce Wayne está construyendo un nuevo Batimóvil con varias piezas LEGO. Cada tipo de pieza tiene un costo diferente: ruedas (50 bs), chasis (100 bs), motor (200 bs) y accesorios (25 bs).\n\nTarea: Crea un algoritmo que permita al usuario ingresar la cantidad de cada tipo de pieza que necesita y calcule el costo total del Batimóvil. Si el costo total supera 500 bs, aplica un descuento del 10%. Muestra el costo final.",
    puntosMaximos: 3,
    solucionOficial: {
      pseudocodigo: `ALGORITMO BatimovilLegoDescuentoSimple\nDECLARACIÓN\nVARIABLES\n  ruedas, chasis, motores, accesorios: entero\n  costoBase, costoFinal: real\nINICIO\n  ESCRIBIR "Cantidad de ruedas:"\n  LEER ruedas\n  ESCRIBIR "Cantidad de chasis:"\n  LEER chasis\n  ESCRIBIR "Cantidad de motores:"\n  LEER motores\n  ESCRIBIR "Cantidad de accesorios:"\n  LEER accesorios\n\n  costoBase <- (ruedas * 50.0) + (chasis * 100.0) + (motores * 200.0) + (accesorios * 25.0)\n  costoFinal <- costoBase\n\n  SI (costoBase > 500.0) ENTONCES\n    costoFinal <- costoFinal * 0.90\n  FIN SI\n\n  ESCRIBIR "El costo final del Batimovil es: ", costoFinal\nFIN`,
      c: `#include <stdio.h>\n\nint main() {\n    int ruedas, chasis, motores, accesorios;\n    double costoBase, costoFinal;\n    printf("Ingrese ruedas, chasis, motores, accesorios:\\n");\n    scanf("%d %d %d %d", &ruedas, &chasis, &motores, &accesorios);\n\n    costoBase = (ruedas * 50.0) + (chasis * 100.0) + (motores * 200.0) + (accesorios * 25.0);\n    costoFinal = costoBase;\n\n    if (costoBase > 500.0) {\n        costoFinal *= 0.90;\n    }\n    printf("El costo final es: %.2f\\n", costoFinal);\n    return 0;\n}`,
      typescript: `function calcularCostoLegoSimple(ruedas: number, chasis: number, motores: number, accesorios: number): number {\n  let costo = (ruedas * 50) + (chasis * 100) + (motores * 200) + (accesorios * 25);\n  if (costo > 500) costo *= 0.90;\n  return costo;\n}`
    }
  },
  {
    id: "pe_bat4_04",
    categoria: "ciclos-largos",
    numero: 4,
    enunciado: "Batman quiere llevar un registro de las misiones completadas y su puntuación.\n\nTarea: Crea un algoritmo que permita ingresar el nombre de hasta 5 misiones y su puntuación (del 1 al 10, entero). Al final, muestra el nombre de la misión con la puntuación más alta y el promedio de las puntuaciones.",
    puntosMaximos: 2.5,
    solucionOficial: {
      pseudocodigo: `ALGORITMO MisionesMaximoYPromedio\nDECLARACIÓN\nVARIABLES\n  i, puntuacion, sumaPuntuaciones, maxPuntuacion: entero\n  nombreMision, misionGanadora: texto\n  promedio: real\nINICIO\n  sumaPuntuaciones <- 0\n  maxPuntuacion <- -1\n  misionGanadora <- ""\n\n  PARA i <- 1 HASTA 5 CON PASO 1 HACER\n    ESCRIBIR "Ingrese el nombre de la mision ", i, ":"\n    LEER nombreMision\n    ESCRIBIR "Ingrese la puntuacion de la mision ", i, " (1-10):"\n    LEER puntuacion\n\n    sumaPuntuaciones <- sumaPuntuaciones + puntuacion\n\n    SI (puntuacion > maxPuntuacion) ENTONCES\n      maxPuntuacion <- puntuacion\n      misionGanadora <- nombreMision\n    FIN SI\n  FIN PARA\n\n  promedio <- sumaPuntuaciones / 5.0\n  ESCRIBIR "Mision con mayor puntuacion: ", misionGanadora, " (", maxPuntuacion, " pts)"\n  ESCRIBIR "Promedio de puntuaciones: ", promedio\nFIN`,
      c: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char nombreMision[50], misionGanadora[50] = "";\n    int puntuacion, sumaPuntuaciones = 0, maxPuntuacion = -1;\n\n    for (int i = 1; i <= 5; i++) {\n        printf("Nombre y puntuacion de mision %d:\\n", i);\n        scanf("%s %d", nombreMision, &puntuacion);\n        sumaPuntuaciones += puntuacion;\n        if (puntuacion > maxPuntuacion) {\n            maxPuntuacion = puntuacion;\n            strcpy(misionGanadora, nombreMision);\n        }\n    }\n    printf("Mejor mision: %s (%d pts)\\n", misionGanadora, maxPuntuacion);\n    printf("Promedio puntuaciones: %.2f\\n", (double)sumaPuntuaciones / 5.0);\n    return 0;\n}`,
      typescript: `function evaluar5Misiones(nombres: string[], puntuaciones: number[]): { mejor: string, promedio: number } {\n  let suma = 0, maxP = -1, mejorM = "";\n  for(let i=0; i<5; i++) {\n    const p = puntuaciones[i] || 0;\n    suma += p;\n    if (p > maxP) {\n      maxP = p;\n      mejorM = nombres[i] || "";\n    }\n  }\n  return { mejor: mejorM, promedio: suma / 5 };\n}`
    }
  }
];
