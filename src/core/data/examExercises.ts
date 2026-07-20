export interface Exercise {
  id: string;
  title: string;
  premise: string;
  level: 'easy' | 'intermediate' | 'hard';
  boilerplate: string;
  boilerplate_ts?: string;
  allowedLanguages: ('cpp' | 'typescript')[];
  readOnlyLines: number[];
  publicTests: { input: string; expected_output: string }[];
  privateTests: { input: string; expected_output: string }[];
}

export const EXAM_EXERCISES: Exercise[] = [
  {
    id: '1',
    title: 'El Sombrero Seleccionador',
    level: 'easy',
    premise: 'Dada una cadena con el nombre y apellido separados por un espacio, devuelve una cadena con las iniciales en mayúscula separadas por un punto.',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\n#include <string>\nusing namespace std;\n// ----------------------\n\nstring obtener_iniciales(string nombre_completo) {\n    // Escribe tu código aquí\n    return "";\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    string nombre;\n    getline(cin, nombre);\n    cout << obtener_iniciales(nombre) << endl;\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: No necesitas leer input manualmente.\n// Simplemente completa la función y retorna el valor.\n// ----------------------\n\nfunction obtener_iniciales(nombre_completo: string): string {\n    // Escribe tu código aquí\n    return "";\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const input = (globalThis as any).__INPUT__.trim();\n    console.log(obtener_iniciales(input));\n}\nmain();\n// ----------------------',
    allowedLanguages: ['typescript'],
    readOnlyLines: [1,2,3,4,5,11,12,13,14,15,16,17,18,19,20],
    publicTests: [
      { input: "Harry Potter\n", expected_output: "H.P" },
      { input: "Hermione Granger\n", expected_output: "H.G" },
      { input: "Ronald Weasley\n", expected_output: "R.W" }
    ],
    privateTests: [
      { input: "Draco Malfoy\n", expected_output: "D.M" },
      { input: "Severus Snape\n", expected_output: "S.S" }
    ]
  },
  {
    id: '2',
    title: 'Detector de Magia Oscura',
    level: 'easy',
    premise: 'El Ministerio de Magia ha instalado un detector de palabras prohibidas. Dada una cadena que representa un hechizo, devuelve "True" si contiene la subcadena "Avada", "Crucio" o "Imperio" (sin importar mayúsculas o minúsculas), y "False" en caso contrario.',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\n#include <string>\nusing namespace std;\n// ----------------------\n\nbool es_hechizo_prohibido(string hechizo) {\n    // Escribe tu código aquí\n    return false;\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    string hechizo;\n    getline(cin, hechizo);\n    cout << (es_hechizo_prohibido(hechizo) ? "True" : "False") << endl;\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Retorna un booleano (true o false)\n// ----------------------\n\nfunction es_hechizo_prohibido(hechizo: string): boolean {\n    // Escribe tu código aquí\n    return false;\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const input = (globalThis as any).__INPUT__.trim();\n    console.log(es_hechizo_prohibido(input) ? "True" : "False");\n}\nmain();\n// ----------------------',
    allowedLanguages: ['typescript'],
    readOnlyLines: [1,2,3,4,5,11,12,13,14,15,16,17,18,19],
    publicTests: [
      { input: "Avada Kedavra\n", expected_output: "True" },
      { input: "Wingardium Leviosa\n", expected_output: "False" },
      { input: "imperio\n", expected_output: "True" }
    ],
    privateTests: [
      { input: "crucio\n", expected_output: "True" },
      { input: "Lumos\n", expected_output: "False" }
    ]
  },
  {
    id: '3',
    title: 'Inventario de Pociones',
    level: 'easy',
    premise: 'Recibes el tamaño N y un arreglo de enteros donde cada número representa la cantidad de pociones en un estante. Devuelve la suma total.',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\nusing namespace std;\n// ----------------------\n\nint contar_pociones(int n, int estantes[]) {\n    // Escribe tu código aquí\n    return 0;\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    int n;\n    cin >> n;\n    int arr[100];\n    for(int i=0; i<n; i++) cin >> arr[i];\n    cout << contar_pociones(n, arr) << endl;\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Recibes un arreglo de números. Devuelve la suma total.\n// ----------------------\n\nfunction contar_pociones(estantes: number[]): number {\n    // Escribe tu código aquí\n    return 0;\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const tokens = (globalThis as any).__INPUT__.trim().split(/\\s+/);\n    const arr = tokens.slice(1).map(Number);\n    console.log(contar_pociones(arr));\n}\nmain();\n// ----------------------',
    allowedLanguages: ['cpp', 'typescript'],
    readOnlyLines: [1,2,3,4,10,11,12,13,14,15,16,17,18,19],
    publicTests: [
      { input: "3\n10 5 2\n", expected_output: "17" },
      { input: "5\n1 1 1 1 1\n", expected_output: "5" },
      { input: "0\n", expected_output: "0" }
    ],
    privateTests: [
      { input: "4\n100 0 0 100\n", expected_output: "200" },
      { input: "2\n-5 5\n", expected_output: "0" }
    ]
  },
  {
    id: '4',
    title: 'Duelo de Varitas',
    level: 'easy',
    premise: 'Recibes la cantidad N de hechizos y un arreglo de cadenas con los nombres de los hechizos lanzados. Encuentra y devuelve el hechizo que más veces fue lanzado. (Asume que no hay empates).',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\n#include <string>\nusing namespace std;\n// ----------------------\n\nstring hechizo_mas_usado(int n, string hechizos[]) {\n    // Escribe tu código aquí\n    return "";\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    int n;\n    cin >> n;\n    string arr[100];\n    for(int i=0; i<n; i++) cin >> arr[i];\n    cout << hechizo_mas_usado(n, arr) << endl;\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Recibes un arreglo de strings. Devuelve el más repetido.\n// ----------------------\n\nfunction hechizo_mas_usado(hechizos: string[]): string {\n    // Escribe tu código aquí\n    return "";\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const tokens = (globalThis as any).__INPUT__.trim().split(/\\s+/);\n    const arr = tokens.slice(1);\n    console.log(hechizo_mas_usado(arr));\n}\nmain();\n// ----------------------',
    allowedLanguages: ['typescript'],
    readOnlyLines: [1,2,3,4,5,11,12,13,14,15,16,17,18,19,20],
    publicTests: [
      { input: "5\nLumos\nNox\nLumos\nCrucio\nLumos\n", expected_output: "Lumos" },
      { input: "3\nExpelliarmus\nExpelliarmus\nProtego\n", expected_output: "Expelliarmus" }
    ],
    privateTests: [
      { input: "4\nAccio\nAccio\nAccio\nNox\n", expected_output: "Accio" }
    ]
  },
  {
    id: '5',
    title: 'Orden de Merlín',
    level: 'intermediate',
    premise: 'Recibes N (cantidad de notas) y un arreglo de enteros. Devuelve la cantidad de alumnos aprobados (out_n) y carga en el arreglo out_notas las notas > 85 ordenadas de mayor a menor.',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\nusing namespace std;\n// ----------------------\n\nvoid top_estudiantes(int n, int notas[], int &out_n, int out_notas[]) {\n    // Escribe tu código aquí\n    out_n = 0;\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    int n;\n    cin >> n;\n    int arr[100];\n    for(int i=0; i<n; i++) cin >> arr[i];\n    int out_n = 0;\n    int out_notas[100];\n    top_estudiantes(n, arr, out_n, out_notas);\n    for(int i=0; i<out_n; i++) {\n        cout << out_notas[i] << (i == out_n - 1 ? "" : " ");\n    }\n    cout << endl;\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Recibes un arreglo de notas. Devuelve un objeto con la cantidad de aprobados y las notas > 85 ordenadas de mayor a menor.\n// ----------------------\n\nfunction top_estudiantes(notas: number[]): { aprobados: number, mejores: number[] } {\n    // Escribe tu código aquí\n    return { aprobados: 0, mejores: [] };\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const tokens = (globalThis as any).__INPUT__.trim().split(/\\s+/);\n    const arr = tokens.slice(1).map(Number);\n    const result = top_estudiantes(arr);\n    console.log(result.mejores.join(" "));\n}\nmain();\n// ----------------------',
    allowedLanguages: ['typescript'],
    readOnlyLines: [1,2,3,4,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],
    publicTests: [
      { input: "5\n80 90 100 85 95\n", expected_output: "100 95 90" },
      { input: "3\n85 80 70\n", expected_output: "" },
      { input: "4\n100 86 90 99\n", expected_output: "100 99 90 86" }
    ],
    privateTests: [
      { input: "2\n100 100\n", expected_output: "100 100" }
    ]
  },
  {
    id: '6',
    title: 'El Mapa del Merodeador',
    level: 'intermediate',
    premise: 'Recibes N (filas), M (columnas) y una matriz de cadenas de texto. Encuentra a "Peter" y asigna en los parametros por referencia out_f y out_c su fila y columna. Si no está, asigna -1 y -1.',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\n#include <string>\nusing namespace std;\n// ----------------------\n\nvoid buscar_intruso(int n, int m, string mapa[20][20], int &out_f, int &out_c) {\n    // Escribe tu código aquí\n    out_f = -1;\n    out_c = -1;\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    int n, m;\n    cin >> n >> m;\n    string mapa[20][20];\n    for(int i=0; i<n; i++) {\n        for(int j=0; j<m; j++) {\n            cin >> mapa[i][j];\n        }\n    }\n    int f, c;\n    buscar_intruso(n, m, mapa, f, c);\n    cout << f << " " << c << endl;\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Recibes una matriz de strings. Devuelve un arreglo con la fila y columna [f, c]. Retorna [-1, -1] si no está.\n// ----------------------\n\nfunction buscar_intruso(mapa: string[][]): [number, number] {\n    // Escribe tu código aquí\n    return [-1, -1];\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const tokens = (globalThis as any).__INPUT__.trim().split(/\\s+/);\n    if(tokens.length < 2) return;\n    const n = Number(tokens[0]);\n    const m = Number(tokens[1]);\n    const mapa: string[][] = [];\n    let idx = 2;\n    for(let i=0; i<n; i++){\n        const row = [];\n        for(let j=0; j<m; j++){\n            row.push(tokens[idx++]);\n        }\n        mapa.push(row);\n    }\n    const [f, c] = buscar_intruso(mapa);\n    console.log(`${f} ${c}`);\n}\nmain();\n// ----------------------',
    allowedLanguages: ['typescript'],
    readOnlyLines: [1,2,3,4,5,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],
    publicTests: [
      { input: "2 2\nHarry Ron\nHermione Peter\n", expected_output: "1 1" },
      { input: "2 2\nSnape Dumbledore\nMinerva Hagrid\n", expected_output: "-1 -1" }
    ],
    privateTests: [
      { input: "3 3\nA B C\nD Peter F\nG H I\n", expected_output: "1 1" }
    ]
  },
  {
    id: '7',
    title: 'La Energía del Traslador',
    level: 'intermediate',
    premise: 'Recibes N y una matriz cuadrada NxN de enteros. Calcula y devuelve la suma de los elementos de su diagonal principal.',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\nusing namespace std;\n// ----------------------\n\nint energia_traslador(int n, int matriz[20][20]) {\n    // Escribe tu código aquí\n    return 0;\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    int n;\n    cin >> n;\n    int matriz[20][20];\n    for(int i=0; i<n; i++) {\n        for(int j=0; j<n; j++) {\n            cin >> matriz[i][j];\n        }\n    }\n    cout << energia_traslador(n, matriz) << endl;\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Recibes una matriz cuadrada NxN. Devuelve la suma de su diagonal principal.\n// ----------------------\n\nfunction energia_traslador(matriz: number[][]): number {\n    // Escribe tu código aquí\n    return 0;\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const tokens = (globalThis as any).__INPUT__.trim().split(/\\s+/);\n    if(tokens.length < 1) return;\n    const n = Number(tokens[0]);\n    const matriz: number[][] = [];\n    let idx = 1;\n    for(let i=0; i<n; i++){\n        const row = [];\n        for(let j=0; j<n; j++){\n            row.push(Number(tokens[idx++]));\n        }\n        matriz.push(row);\n    }\n    console.log(energia_traslador(matriz));\n}\nmain();\n// ----------------------',
    allowedLanguages: ['typescript'],
    readOnlyLines: [1,2,3,4,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
    publicTests: [
      { input: "3\n10 0 0\n0 20 0\n0 0 30\n", expected_output: "60" },
      { input: "2\n5 5\n5 5\n", expected_output: "10" }
    ],
    privateTests: [
      { input: "1\n100\n", expected_output: "100" }
    ]
  },
  {
    id: '8',
    title: 'Cifrado de Runas Antiguas',
    level: 'intermediate',
    premise: 'Recibes N y un arreglo de N palabras. Debes invertir cada palabra individualmente (sin cambiar el orden del arreglo) y devolverlas unidas por un guion "-".',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\n#include <string>\nusing namespace std;\n// ----------------------\n\nstring descifrar_runas(int n, string palabras[]) {\n    // Escribe tu código aquí\n    return "";\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    int n;\n    cin >> n;\n    string arr[100];\n    for(int i=0; i<n; i++) cin >> arr[i];\n    cout << descifrar_runas(n, arr) << endl;\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Recibes un arreglo de palabras. Invierte cada una y únelas por un guion.\n// ----------------------\n\nfunction descifrar_runas(palabras: string[]): string {\n    // Escribe tu código aquí\n    return "";\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const tokens = (globalThis as any).__INPUT__.trim().split(/\\s+/);\n    const arr = tokens.slice(1);\n    console.log(descifrar_runas(arr));\n}\nmain();\n// ----------------------',
    allowedLanguages: ['typescript'],
    readOnlyLines: [1,2,3,4,5,11,12,13,14,15,16,17,18,19,20],
    publicTests: [
      { input: "3\nalohomora lumos nox\n", expected_output: "aromohola-somul-xon" },
      { input: "2\nharry potter\n", expected_output: "yrrah-rettop" }
    ],
    privateTests: [
      { input: "1\nhola\n", expected_output: "aloh" }
    ]
  },
  {
    id: '9',
    title: 'El Torneo de los Tres Magos',
    level: 'hard',
    premise: 'Recibes filas N, columnas M y una matriz NxM. Imprime la matriz transpuesta (MxN) donde las filas se convierten en columnas.',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\nusing namespace std;\n// ----------------------\n\nvoid transponer_puntajes(int n, int m, int matriz[20][20]) {\n    // Escribe tu código aquí\n    \n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    int n, m;\n    cin >> n >> m;\n    int matriz[20][20];\n    for(int i=0; i<n; i++) {\n        for(int j=0; j<m; j++) {\n            cin >> matriz[i][j];\n        }\n    }\n    transponer_puntajes(n, m, matriz);\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Recibes una matriz NxM. Imprime la matriz transpuesta (MxN).\n// Puedes usar console.log(fila.join(" ")) para imprimir.\n// ----------------------\n\nfunction transponer_puntajes(matriz: number[][]): void {\n    // Escribe tu código aquí\n    \n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const tokens = (globalThis as any).__INPUT__.trim().split(/\\s+/);\n    if(tokens.length < 2) return;\n    const n = Number(tokens[0]);\n    const m = Number(tokens[1]);\n    const matriz: number[][] = [];\n    let idx = 2;\n    for(let i=0; i<n; i++){\n        const row = [];\n        for(let j=0; j<m; j++){\n            row.push(Number(tokens[idx++]));\n        }\n        matriz.push(row);\n    }\n    transponer_puntajes(matriz);\n}\nmain();\n// ----------------------',
    allowedLanguages: ['typescript'],
    readOnlyLines: [1,2,3,4,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
    publicTests: [
      { input: "2 3\n1 2 3\n4 5 6\n", expected_output: "1 4\n2 5\n3 6" },
      { input: "3 2\n10 20\n30 40\n50 60\n", expected_output: "10 30 50\n20 40 60" }
    ],
    privateTests: [
      { input: "1 2\n1 2\n", expected_output: "1\n2" }
    ]
  },
  {
    id: '10',
    title: 'La Cámara Secreta',
    level: 'hard',
    premise: 'Dada una matriz NxM, acumula la suma de los elementos que se encuentran en el perímetro (los bordes) de la matriz y devuélvela.',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\nusing namespace std;\n// ----------------------\n\nint suma_perimetro(int n, int m, int matriz[20][20]) {\n    // Escribe tu código aquí\n    return 0;\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    int n, m;\n    cin >> n >> m;\n    int matriz[20][20];\n    for(int i=0; i<n; i++) {\n        for(int j=0; j<m; j++) {\n            cin >> matriz[i][j];\n        }\n    }\n    cout << suma_perimetro(n, m, matriz) << endl;\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Recibes una matriz NxM. Devuelve la suma del perímetro.\n// ----------------------\n\nfunction suma_perimetro(matriz: number[][]): number {\n    // Escribe tu código aquí\n    return 0;\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const tokens = (globalThis as any).__INPUT__.trim().split(/\\s+/);\n    if(tokens.length < 2) return;\n    const n = Number(tokens[0]);\n    const m = Number(tokens[1]);\n    const matriz: number[][] = [];\n    let idx = 2;\n    for(let i=0; i<n; i++){\n        const row = [];\n        for(let j=0; j<m; j++){\n            row.push(Number(tokens[idx++]));\n        }\n        matriz.push(row);\n    }\n    console.log(suma_perimetro(matriz));\n}\nmain();\n// ----------------------',
    allowedLanguages: ['typescript'],
    readOnlyLines: [1,2,3,4,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
    publicTests: [
      { input: "3 3\n1 2 3\n4 5 6\n7 8 9\n", expected_output: "40" },
      { input: "2 2\n1 1\n1 1\n", expected_output: "4" }
    ],
    privateTests: [
      { input: "1 1\n10\n", expected_output: "10" }
    ]
  },
  {
    id: '11',
    title: 'El Meme de Bob Burlón',
    level: 'easy',
    premise: 'Dada una frase de texto en minúsculas, debes devolver una nueva cadena donde las letras alternen entre mayúsculas y minúsculas (ej. "hola" -> "HoLa"). Ignora los espacios para el conteo de la alternancia.',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\n#include <string>\nusing namespace std;\n// ----------------------\n\nstring texto_burlon(string frase) {\n    // Escribe tu código aquí\n    return "";\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    string frase;\n    getline(cin, frase);\n    cout << texto_burlon(frase) << endl;\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Devuelve la frase formateada de forma burlona.\n// ----------------------\n\nfunction texto_burlon(frase: string): string {\n    // Escribe tu código aquí\n    return "";\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const input = (globalThis as any).__INPUT__.trim();\n    console.log(texto_burlon(input));\n}\nmain();\n// ----------------------',
    allowedLanguages: ['typescript'],
    readOnlyLines: [1,2,3,4,5,11,12,13,14,15,16,17],
    publicTests: [
      { input: "hola mundo\n", expected_output: "HoLa MuNdO" },
      { input: "don cangrejo\n", expected_output: "DoN cAnGrEjO" }
    ],
    privateTests: [
      { input: "bob esponja pantalones cuadrados\n", expected_output: "BoB eSpOnJa PaNtAlOnEs CuAdRaDoS" }
    ]
  },
  {
    id: '12',
    title: 'El Mejor Día de Don Cangrejo',
    level: 'easy',
    premise: 'Recibes el tamaño N y un arreglo de ganancias. Devuelve el índice (0-indexado) donde se encuentra el valor máximo. Si hay empate, devuelve el primer índice del máximo.',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\nusing namespace std;\n// ----------------------\n\nint mejor_dia_ganancias(int n, int ganancias[]) {\n    // Escribe tu código aquí\n    return 0;\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    int n;\n    cin >> n;\n    int arr[100];\n    for(int i=0; i<n; i++) cin >> arr[i];\n    cout << mejor_dia_ganancias(n, arr) << endl;\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Recibes un arreglo de ganancias. Devuelve el índice del valor máximo.\n// ----------------------\n\nfunction mejor_dia_ganancias(ganancias: number[]): number {\n    // Escribe tu código aquí\n    return 0;\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const tokens = (globalThis as any).__INPUT__.trim().split(/\\s+/);\n    const arr = tokens.slice(1).map(Number);\n    console.log(mejor_dia_ganancias(arr));\n}\nmain();\n// ----------------------',
    allowedLanguages: ['cpp', 'typescript'],
    readOnlyLines: [1,2,3,4,10,11,12,13,14,15,16,17,18],
    publicTests: [
      { input: "5\n10 20 5 20 15\n", expected_output: "1" },
      { input: "3\n100 500 200\n", expected_output: "1" }
    ],
    privateTests: [
      { input: "4\n5 5 5 5\n", expected_output: "0" }
    ]
  },
  {
    id: '13',
    title: 'Pedidos de Plancton',
    level: 'easy',
    premise: 'Recibes N (cantidad de pedidos) y un arreglo de palabras. Debes contar cuántas veces aparece la palabra exacta "Cangreburger" en el arreglo.',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\n#include <string>\nusing namespace std;\n// ----------------------\n\nint contar_cangreburgers(int n, string pedidos[]) {\n    // Escribe tu código aquí\n    return 0;\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    int n;\n    cin >> n;\n    string arr[100];\n    for(int i=0; i<n; i++) cin >> arr[i];\n    cout << contar_cangreburgers(n, arr) << endl;\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Recibes un arreglo de pedidos. Cuenta las "Cangreburger".\n// ----------------------\n\nfunction contar_cangreburgers(pedidos: string[]): number {\n    // Escribe tu código aquí\n    return 0;\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const tokens = (globalThis as any).__INPUT__.trim().split(/\\s+/);\n    const arr = tokens.slice(1);\n    console.log(contar_cangreburgers(arr));\n}\nmain();\n// ----------------------',
    allowedLanguages: ['typescript'],
    readOnlyLines: [1,2,3,4,5,11,12,13,14,15,16,17,18],
    publicTests: [
      { input: "4\nPizza Cangreburger Malteada Cangreburger\n", expected_output: "2" },
      { input: "3\nKelp Chum Kelp\n", expected_output: "0" }
    ],
    privateTests: [
      { input: "5\nCangreburger Cangreburger Cangreburger Cangreburger Cangreburger\n", expected_output: "5" }
    ]
  },
  {
    id: '14',
    title: 'El Solo de Clarinete',
    level: 'intermediate',
    premise: 'Recibes N y un arreglo de enteros que representan notas musicales. Encuentra la longitud de la secuencia más larga de notas idénticas consecutivas.',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\nusing namespace std;\n// ----------------------\n\nint mejor_secuencia_clarinete(int n, int notas[]) {\n    // Escribe tu código aquí\n    return 0;\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    int n;\n    cin >> n;\n    int arr[100];\n    for(int i=0; i<n; i++) cin >> arr[i];\n    cout << mejor_secuencia_clarinete(n, arr) << endl;\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Recibes un arreglo de notas. Devuelve la racha más larga.\n// ----------------------\n\nfunction mejor_secuencia_clarinete(notas: number[]): number {\n    // Escribe tu código aquí\n    return 0;\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const tokens = (globalThis as any).__INPUT__.trim().split(/\\s+/);\n    const arr = tokens.slice(1).map(Number);\n    console.log(mejor_secuencia_clarinete(arr));\n}\nmain();\n// ----------------------',
    allowedLanguages: ['cpp', 'typescript'],
    readOnlyLines: [1,2,3,4,10,11,12,13,14,15,16,17,18],
    publicTests: [
      { input: "5\n1 2 2 2 3\n", expected_output: "3" },
      { input: "6\n4 4 1 2 2 3\n", expected_output: "2" }
    ],
    privateTests: [
      { input: "1\n5\n", expected_output: "1" }
    ]
  },
  {
    id: '15',
    title: 'Limpieza del Balde de Carnada',
    level: 'intermediate',
    premise: 'Dada una matriz piso de dimensiones NxM, reemplaza todos los números negativos por un 0 y devuelve la matriz modificada.',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\nusing namespace std;\n// ----------------------\n\nvoid limpiar_balde(int n, int m, int piso[20][20]) {\n    // Escribe tu código aquí\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    int n, m;\n    cin >> n >> m;\n    int piso[20][20];\n    for(int i=0; i<n; i++) {\n        for(int j=0; j<m; j++) {\n            cin >> piso[i][j];\n        }\n    }\n    limpiar_balde(n, m, piso);\n    for(int i=0; i<n; i++) {\n        for(int j=0; j<m; j++) {\n            cout << piso[i][j] << (j == m-1 ? "" : " ");\n        }\n        cout << endl;\n    }\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Recibes y modificas la matriz. Devuelve la matriz modificada.\n// ----------------------\n\nfunction limpiar_balde(piso: number[][]): number[][] {\n    // Escribe tu código aquí\n    return piso;\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const tokens = (globalThis as any).__INPUT__.trim().split(/\\s+/);\n    if(tokens.length < 2) return;\n    const n = Number(tokens[0]);\n    const m = Number(tokens[1]);\n    const piso: number[][] = [];\n    let idx = 2;\n    for(let i=0; i<n; i++){\n        const row = [];\n        for(let j=0; j<m; j++){\n            row.push(Number(tokens[idx++]));\n        }\n        piso.push(row);\n    }\n    const res = limpiar_balde(piso);\n    res.forEach(row => console.log(row.join(" ")));\n}\nmain();\n// ----------------------',
    allowedLanguages: ['typescript'],
    readOnlyLines: [1,2,3,4,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
    publicTests: [
      { input: "2 3\n1 -2 3\n-4 5 -6\n", expected_output: "1 0 3\n0 5 0" },
      { input: "2 2\n-1 -1\n-1 -1\n", expected_output: "0 0\n0 0" }
    ],
    privateTests: [
      { input: "1 3\n0 1 2\n", expected_output: "0 1 2" }
    ]
  },
  {
    id: '16',
    title: 'El Código de la Fórmula',
    level: 'intermediate',
    premise: 'Recibes una cadena que contiene letras y números (ej. "a3b4c1"). Extrae todos los dígitos, conviértelos a enteros y devuelve la suma total.',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\n#include <string>\nusing namespace std;\n// ----------------------\n\nint descifrar_formula(string codigo) {\n    // Escribe tu código aquí\n    return 0;\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    string codigo;\n    cin >> codigo;\n    cout << descifrar_formula(codigo) << endl;\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Recibes la cadena. Suma todos los caracteres numéricos.\n// ----------------------\n\nfunction descifrar_formula(codigo: string): number {\n    // Escribe tu código aquí\n    return 0;\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const input = (globalThis as any).__INPUT__.trim();\n    console.log(descifrar_formula(input));\n}\nmain();\n// ----------------------',
    allowedLanguages: ['typescript'],
    readOnlyLines: [1,2,3,4,5,11,12,13,14,15,16,17],
    publicTests: [
      { input: "a3b4c1\n", expected_output: "8" },
      { input: "cangreburger2026\n", expected_output: "10" }
    ],
    privateTests: [
      { input: "no_numeros\n", expected_output: "0" }
    ]
  },
  {
    id: '17',
    title: 'La Estrella de Patricio',
    level: 'intermediate',
    premise: 'Recibes N y una matriz cuadrada NxN de enteros. Calcula y devuelve la suma de los elementos de su diagonal secundaria (esquina superior derecha a inferior izquierda).',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\nusing namespace std;\n// ----------------------\n\nint suma_diagonal_secundaria(int n, int matriz[20][20]) {\n    // Escribe tu código aquí\n    return 0;\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    int n;\n    cin >> n;\n    int matriz[20][20];\n    for(int i=0; i<n; i++) {\n        for(int j=0; j<n; j++) {\n            cin >> matriz[i][j];\n        }\n    }\n    cout << suma_diagonal_secundaria(n, matriz) << endl;\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Recibes una matriz cuadrada NxN. Devuelve la suma de su diagonal secundaria.\n// ----------------------\n\nfunction suma_diagonal_secundaria(matriz: number[][]): number {\n    // Escribe tu código aquí\n    return 0;\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const tokens = (globalThis as any).__INPUT__.trim().split(/\\s+/);\n    if(tokens.length < 1) return;\n    const n = Number(tokens[0]);\n    const matriz: number[][] = [];\n    let idx = 1;\n    for(let i=0; i<n; i++){\n        const row = [];\n        for(let j=0; j<n; j++){\n            row.push(Number(tokens[idx++]));\n        }\n        matriz.push(row);\n    }\n    console.log(suma_diagonal_secundaria(matriz));\n}\nmain();\n// ----------------------',
    allowedLanguages: ['typescript'],
    readOnlyLines: [1,2,3,4,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
    publicTests: [
      { input: "3\n1 2 3\n4 5 6\n7 8 9\n", expected_output: "15" },
      { input: "2\n10 20\n30 40\n", expected_output: "50" }
    ],
    privateTests: [
      { input: "1\n99\n", expected_output: "99" }
    ]
  },
  {
    id: '18',
    title: 'Inspección de Sanidad',
    level: 'hard',
    premise: 'Dada una matriz NxM de 0s y 1s, donde 1 es suciedad, devuelve la cantidad de celdas "Críticas". Una celda es crítica si tiene un 1 y toca al menos otros dos 1s adyacentes (arriba, abajo, izquierda, derecha, no diagonales).',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\nusing namespace std;\n// ----------------------\n\nint zonas_criticas_parrilla(int n, int m, int parrilla[20][20]) {\n    // Escribe tu código aquí\n    return 0;\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    int n, m;\n    cin >> n >> m;\n    int parrilla[20][20];\n    for(int i=0; i<n; i++) {\n        for(int j=0; j<m; j++) {\n            cin >> parrilla[i][j];\n        }\n    }\n    cout << zonas_criticas_parrilla(n, m, parrilla) << endl;\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Recibes la matriz. Devuelve la cantidad de celdas críticas (1s adyacentes a otros >= 2 unos).\n// ----------------------\n\nfunction zonas_criticas_parrilla(parrilla: number[][]): number {\n    // Escribe tu código aquí\n    return 0;\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const tokens = (globalThis as any).__INPUT__.trim().split(/\\s+/);\n    if(tokens.length < 2) return;\n    const n = Number(tokens[0]);\n    const m = Number(tokens[1]);\n    const parrilla: number[][] = [];\n    let idx = 2;\n    for(let i=0; i<n; i++){\n        const row = [];\n        for(let j=0; j<m; j++){\n            row.push(Number(tokens[idx++]));\n        }\n        parrilla.push(row);\n    }\n    console.log(zonas_criticas_parrilla(parrilla));\n}\nmain();\n// ----------------------',
    allowedLanguages: ['typescript'],
    readOnlyLines: [1,2,3,4,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
    publicTests: [
      { input: "3 3\n0 1 0\n1 1 1\n0 1 0\n", expected_output: "1" },
      { input: "3 3\n1 1 1\n1 0 1\n1 1 1\n", expected_output: "8" }
    ],
    privateTests: [
      { input: "2 2\n0 0\n0 0\n", expected_output: "0" }
    ]
  },
  {
    id: '19',
    title: 'El Baile del Gusano',
    level: 'hard',
    premise: 'Dada una matriz NxM, devuelve un arreglo unidimensional recorriéndola en zig-zag: la fila 0 de izq a der, fila 1 de der a izq, fila 2 de izq a der, y así alternando.',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\nusing namespace std;\n// ----------------------\n\nvoid recorrido_gusano(int n, int m, int pista[20][20], int res[]) {\n    // Escribe tu código aquí\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    int n, m;\n    cin >> n >> m;\n    int pista[20][20];\n    for(int i=0; i<n; i++) {\n        for(int j=0; j<m; j++) {\n            cin >> pista[i][j];\n        }\n    }\n    int res[400];\n    recorrido_gusano(n, m, pista, res);\n    for(int i=0; i<n*m; i++) {\n        cout << res[i] << (i == n*m - 1 ? "" : " ");\n    }\n    cout << endl;\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Recibes la matriz. Devuelve la lista en el orden de zig-zag.\n// ----------------------\n\nfunction recorrido_gusano(pista: number[][]): number[] {\n    // Escribe tu código aquí\n    return [];\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const tokens = (globalThis as any).__INPUT__.trim().split(/\\s+/);\n    if(tokens.length < 2) return;\n    const n = Number(tokens[0]);\n    const m = Number(tokens[1]);\n    const pista: number[][] = [];\n    let idx = 2;\n    for(let i=0; i<n; i++){\n        const row = [];\n        for(let j=0; j<m; j++){\n            row.push(Number(tokens[idx++]));\n        }\n        pista.push(row);\n    }\n    console.log(recorrido_gusano(pista).join(" "));\n}\nmain();\n// ----------------------',
    allowedLanguages: ['typescript'],
    readOnlyLines: [1,2,3,4,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],
    publicTests: [
      { input: "3 3\n1 2 3\n4 5 6\n7 8 9\n", expected_output: "1 2 3 6 5 4 7 8 9" },
      { input: "2 2\n10 20\n30 40\n", expected_output: "10 20 40 30" }
    ],
    privateTests: [
      { input: "1 4\n1 2 3 4\n", expected_output: "1 2 3 4" }
    ]
  },
  {
    id: '20',
    title: 'Red de Pesca de Medusas',
    level: 'hard',
    premise: 'Recibes un arreglo de cadenas que representan zonas de pesca. La letra "M" es una medusa. Devuelve un arreglo de enteros con la cantidad de medusas de cada zona, pero ignorando las que estén en el borde de su cadena (índice 0 o índice final).',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\n#include <string>\nusing namespace std;\n// ----------------------\n\nvoid atrapar_medusas(int n, string zonas[], int res[]) {\n    // Escribe tu código aquí\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    int n;\n    cin >> n;\n    string arr[100];\n    for(int i=0; i<n; i++) cin >> arr[i];\n    int res[100];\n    atrapar_medusas(n, arr, res);\n    for(int i=0; i<n; i++) {\n        cout << res[i] << (i == n-1 ? "" : " ");\n    }\n    cout << endl;\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Recibes un arreglo de zonas. Devuelve el conteo de medusas sin contar los extremos de cada zona.\n// ----------------------\n\nfunction atrapar_medusas(zonas: string[]): number[] {\n    // Escribe tu código aquí\n    return [];\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const tokens = (globalThis as any).__INPUT__.trim().split(/\\s+/);\n    const arr = tokens.slice(1);\n    console.log(atrapar_medusas(arr).join(" "));\n}\nmain();\n// ----------------------',
    allowedLanguages: ['typescript'],
    readOnlyLines: [1,2,3,4,9,10,11,12,13,14,15,16,17,18,19,20,21],
    publicTests: [
      { input: "3\n--M-- -M-M- ----M\n", expected_output: "1 1 0" },
      { input: "2\nM-M-M -M-\n", expected_output: "1 1" }
    ],
    privateTests: [
      { input: "1\nM\n", expected_output: "0" }
    ]
  },
  {
    id: '21',
    title: 'El Lenguaje de Yoda',
    level: 'easy',
    premise: 'El Maestro Yoda tiene una forma peculiar de hablar. Dada una cadena que representa una oración simple (palabras separadas por un solo espacio), devuelve una nueva cadena con el orden de las palabras invertido.',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\n#include <string>\nusing namespace std;\n// ----------------------\n\nstring hablar_como_yoda(string frase) {\n    // Escribe tu código aquí\n    return "";\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    string frase;\n    getline(cin, frase);\n    cout << hablar_como_yoda(frase) << endl;\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Devuelve la frase con las palabras en orden invertido.\n// ----------------------\n\nfunction hablar_como_yoda(frase: string): string {\n    // Escribe tu código aquí\n    return "";\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const input = (globalThis as any).__INPUT__.trim();\n    console.log(hablar_como_yoda(input));\n}\nmain();\n// ----------------------',
    allowedLanguages: ['typescript'],
    readOnlyLines: [1,2,3,4,10,11,12,13,14,15,16],
    publicTests: [
      { input: "que la fuerza te acompañe\n", expected_output: "acompañe te fuerza la que" },
      { input: "yo soy tu padre\n", expected_output: "padre tu soy yo" },
      { input: "hola\n", expected_output: "hola" }
    ],
    privateTests: [
      { input: "aprender debes mucho todavía\n", expected_output: "todavía mucho debes aprender" },
      { input: "el camino así es\n", expected_output: "es así camino el" }
    ]
  },
  {
    id: '22',
    title: 'Las Deudas de Han Solo',
    level: 'easy',
    premise: 'Han Solo tiene un registro de sus transacciones recientes en un arreglo de enteros. Los números positivos son ganancias y los negativos son deudas a Jabba el Hutt. Suma y devuelve únicamente el total de los valores negativos (el resultado debe ser un número negativo o 0).',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\nusing namespace std;\n// ----------------------\n\nint calcular_deuda(int n, int transacciones[]) {\n    // Escribe tu código aquí\n    return 0;\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    int arr[100];\n    for(int i=0; i<n; i++) cin >> arr[i];\n    cout << calcular_deuda(n, arr) << endl;\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Recibes un arreglo de enteros (transacciones). Suma las deudas (valores negativos).\n// ----------------------\n\nfunction calcular_deuda(transacciones: number[]): number {\n    // Escribe tu código aquí\n    return 0;\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const tokens = (globalThis as any).__INPUT__.trim().split(/\\s+/);\n    if(tokens.length < 1 || tokens[0] === "") {\n        console.log(0);\n        return;\n    }\n    const arr = tokens.slice(1).map(Number);\n    console.log(calcular_deuda(arr));\n}\nmain();\n// ----------------------',
    allowedLanguages: ['cpp', 'typescript'],
    readOnlyLines: [1,2,3,4,10,11,12,13,14,15,16,17,18],
    publicTests: [
      { input: "4\n10 -5 20 -15\n", expected_output: "-20" },
      { input: "3\n100 50 0\n", expected_output: "0" },
      { input: "5\n-1 -2 -3 -4 -5\n", expected_output: "-15" }
    ],
    privateTests: [
      { input: "1\n-100\n", expected_output: "-100" },
      { input: "0\n\n", expected_output: "0" }
    ]
  },
  {
    id: '23',
    title: 'Calibración del Sable de Luz',
    level: 'easy',
    premise: 'Para que un cristal kyber funcione, su número de serie no debe tener imperfecciones. Recibes una cadena con el número de serie. Debes devolver la misma cadena pero eliminando todos los espacios en blanco y convirtiendo todas las letras a mayúsculas.',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\n#include <string>\nusing namespace std;\n// ----------------------\n\nstring calibrar_cristal(string serie) {\n    // Escribe tu código aquí\n    return "";\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    string serie;\n    getline(cin, serie);\n    cout << calibrar_cristal(serie) << endl;\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Limpia la cadena eliminando espacios y pasando a mayúsculas.\n// ----------------------\n\nfunction calibrar_cristal(serie: string): string {\n    // Escribe tu código aquí\n    return "";\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const input = (globalThis as any).__INPUT__.trim();\n    console.log(calibrar_cristal(input));\n}\nmain();\n// ----------------------',
    allowedLanguages: ['typescript'],
    readOnlyLines: [1,2,3,4,10,11,12,13,14,15,16,17],
    publicTests: [
      { input: "ky b E r 1 2\n", expected_output: "KYBER12" },
      { input: "  sith  \n", expected_output: "SITH" },
      { input: "ABC\n", expected_output: "ABC" }
    ],
    privateTests: [
      { input: " x y z \n", expected_output: "XYZ" },
      { input: "  \n", expected_output: "" }
    ]
  },
  {
    id: '24',
    title: 'Salto al Hiperespacio',
    level: 'intermediate',
    premise: 'Para que el Halcón Milenario salte al hiperespacio sin chocar con una estrella, las coordenadas de navegación deben ser estrictamente crecientes. Recibes un arreglo de enteros. Devuelve True si cada número es mayor al anterior, o False en caso contrario.',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\nusing namespace std;\n// ----------------------\n\nbool salto_seguro(int n, int coordenadas[]) {\n    // Escribe tu código aquí\n    return false;\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    int arr[100];\n    for(int i=0; i<n; i++) cin >> arr[i];\n    cout << (salto_seguro(n, arr) ? "True" : "False") << endl;\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Recibes un arreglo de enteros. Devuelve True si es estrictamente creciente, o False si no.\n// ----------------------\n\nfunction salto_seguro(coordenadas: number[]): boolean {\n    // Escribe tu código aquí\n    return false;\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const tokens = (globalThis as any).__INPUT__.trim().split(/\\s+/);\n    if(tokens.length < 1 || tokens[0] === "") {\n        console.log("True");\n        return;\n    }\n    const arr = tokens.slice(1).map(Number);\n    console.log(salto_seguro(arr) ? "True" : "False");\n}\nmain();\n// ----------------------',
    allowedLanguages: ['cpp', 'typescript'],
    readOnlyLines: [1,2,3,4,10,11,12,13,14,15,16,17,18],
    publicTests: [
      { input: "4\n1 3 5 8\n", expected_output: "True" },
      { input: "4\n1 3 3 8\n", expected_output: "False" },
      { input: "3\n10 5 20\n", expected_output: "False" }
    ],
    privateTests: [
      { input: "1\n100\n", expected_output: "True" },
      { input: "2\n10 20\n", expected_output: "True" },
      { input: "2\n20 10\n", expected_output: "False" }
    ]
  },
  {
    id: '25',
    title: 'Radar Rebelde',
    level: 'intermediate',
    premise: 'La base de Hoth tiene un radar representado por una matriz NxM de cadenas. Debes contar cuántas naves enemigas hay en el sector. Devuelve el número de veces que aparece exactamente la cadena "TIE" en toda la matriz.',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\n#include <string>\nusing namespace std;\n// ----------------------\n\nint contar_cazas_imperiales(int n, int m, string radar[20][20]) {\n    // Escribe tu código aquí\n    return 0;\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    int n, m;\n    if (!(cin >> n >> m)) return 0;\n    string radar[20][20];\n    for(int i=0; i<n; i++) {\n        for(int j=0; j<m; j++) {\n            cin >> radar[i][j];\n        }\n    }\n    cout << contar_cazas_imperiales(n, m, radar) << endl;\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Recibes una matriz de cadenas NxM. Cuenta cuántas veces aparece exactamente "TIE".\n// ----------------------\n\nfunction contar_cazas_imperiales(radar: string[][]): number {\n    // Escribe tu código aquí\n    return 0;\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const tokens = (globalThis as any).__INPUT__.trim().split(/\\s+/);\n    if(tokens.length < 2) return;\n    const n = Number(tokens[0]);\n    const m = Number(tokens[1]);\n    const radar: string[][] = [];\n    let idx = 2;\n    for(let i=0; i<n; i++){\n        const row = [];\n        for(let j=0; j<m; j++){\n            row.push(tokens[idx++]);\n        }\n        radar.push(row);\n    }\n    console.log(contar_cazas_imperiales(radar));\n}\nmain();\n// ----------------------',
    allowedLanguages: ['typescript'],
    readOnlyLines: [1,2,3,4,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
    publicTests: [
      { input: "2 3\nX-Wing TIE Y-Wing\nTIE Star-Destroyer TIE\n", expected_output: "3" },
      { input: "2 2\nFalcon Falcon\nFalcon Falcon\n", expected_output: "0" },
      { input: "1 1\nTIE\n", expected_output: "1" }
    ],
    privateTests: [
      { input: "3 2\nTIE tie\nTie TIE\nTIE TIE\n", expected_output: "4" },
      { input: "2 2\nTI E TIE_fighter\n_TIE TIE\n", expected_output: "1" }
    ]
  },
  {
    id: '26',
    title: 'Escudos Deflectores',
    level: 'intermediate',
    premise: 'La energía de los escudos de una nave es una matriz cuadrada NxN de enteros. El piloto te pide verificar una sección específica. Recibes la matriz y un número entero fila. Devuelve la suma de todos los valores que se encuentran únicamente en esa fila (recuerda que los índices comienzan en 0).',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\nusing namespace std;\n// ----------------------\n\nint energia_seccion(int n, int escudos[20][20], int fila) {\n    // Escribe tu código aquí\n    return 0;\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    int n, fila;\n    if (!(cin >> n >> fila)) return 0;\n    int escudos[20][20];\n    for(int i=0; i<n; i++) {\n        for(int j=0; j<n; j++) {\n            cin >> escudos[i][j];\n        }\n    }\n    cout << energia_seccion(n, escudos, fila) << endl;\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Recibes la matriz cuadrada NxN y la fila a sumar.\n// ----------------------\n\nfunction energia_seccion(escudos: number[][], fila: number): number {\n    // Escribe tu código aquí\n    return 0;\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const tokens = (globalThis as any).__INPUT__.trim().split(/\\s+/);\n    if(tokens.length < 2) return;\n    const n = Number(tokens[0]);\n    const fila = Number(tokens[1]);\n    const escudos: number[][] = [];\n    let idx = 2;\n    for(let i=0; i<n; i++){\n        const row = [];\n        for(let j=0; j<n; j++){\n            row.push(Number(tokens[idx++]));\n        }\n        escudos.push(row);\n    }\n    console.log(energia_seccion(escudos, fila));\n}\nmain();\n// ----------------------',
    allowedLanguages: ['typescript'],
    readOnlyLines: [1,2,3,4,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
    publicTests: [
      { input: "3 1\n10 20 30\n40 50 60\n70 80 90\n", expected_output: "150" },
      { input: "2 0\n5 5\n10 10\n", expected_output: "10" },
      { input: "3 2\n1 2 3\n4 5 6\n7 8 9\n", expected_output: "24" }
    ],
    privateTests: [
      { input: "1 0\n99\n", expected_output: "99" },
      { input: "2 1\n1 2\n3 4\n", expected_output: "7" }
    ]
  },
  {
    id: '27',
    title: 'Droide Astromecánico',
    level: 'intermediate',
    premise: 'BB-8 está recibiendo una transmisión codificada. Necesitas saber si es de la Resistencia. Devuelve True si la cadena contiene la misma cantidad de letras "R" (mayúsculas o minúsculas) que de letras "B" (mayúsculas o minúsculas).',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\n#include <string>\nusing namespace std;\n// ----------------------\n\nbool verificar_transmision(string mensaje) {\n    // Escribe tu código aquí\n    return false;\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    string mensaje;\n    getline(cin, mensaje);\n    cout << (verificar_transmision(mensaje) ? "True" : "False") << endl;\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Devuelve True si el mensaje tiene la misma cantidad de Rs que de Bs (case-insensitive).\n// ----------------------\n\nfunction verificar_transmision(mensaje: string): boolean {\n    // Escribe tu código aquí\n    return false;\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const input = (globalThis as any).__INPUT__.trim();\n    console.log(verificar_transmision(input) ? "True" : "False");\n}\nmain();\n// ----------------------',
    allowedLanguages: ['typescript'],
    readOnlyLines: [1,2,3,4,10,11,12,13,14,15,16,17],
    publicTests: [
      { input: "R2D2-B9\n", expected_output: "True" },
      { input: "RRbb\n", expected_output: "True" },
      { input: "R2-D2\n", expected_output: "False" }
    ],
    privateTests: [
      { input: "BB-8 Resistance\n", expected_output: "False" },
      { input: "R-B\n", expected_output: "True" },
      { input: "rRbB\n", expected_output: "True" },
      { input: "Ninguna de las dos letras\n", expected_output: "True" },
      { input: "r\n", expected_output: "False" }
    ]
  },
  {
    id: '28',
    title: 'Impacto de Torpedo de Protones',
    level: 'hard',
    premise: 'Un torpedo impacta en la Estrella de la Muerte. Recibes una matriz NxM de enteros (todos inicializados en 1, que significa "intacto") y las coordenadas del impacto (fila, columna). Debes cambiar a 0 ("destruido") la celda del impacto y sus vecinas inmediatas arriba, abajo, izquierda y derecha. Devuelve la matriz modificada, asegurándote de no salirte de los límites del arreglo.',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\nusing namespace std;\n// ----------------------\n\nvoid impacto_torpedo(int n, int m, int superficie[20][20], int fila, int columna) {\n    // Escribe tu código aquí\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    int n, m, f, c;\n    if (!(cin >> n >> m >> f >> c)) return 0;\n    int superficie[20][20];\n    for(int i=0; i<n; i++) {\n        for(int j=0; j<m; j++) {\n            cin >> superficie[i][j];\n        }\n    }\n    impacto_torpedo(n, m, superficie, f, c);\n    for(int i=0; i<n; i++) {\n        for(int j=0; j<m; j++) {\n            cout << superficie[i][j] << (j == m-1 ? "" : " ");\n        }\n        cout << endl;\n    }\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Recibes y modificas la matriz. Devuelve la matriz modificada.\n// ----------------------\n\nfunction impacto_torpedo(superficie: number[][], fila: number, columna: number): number[][] {\n    // Escribe tu código aquí\n    return superficie;\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const tokens = (globalThis as any).__INPUT__.trim().split(/\\s+/);\n    if(tokens.length < 4) return;\n    const n = Number(tokens[0]);\n    const m = Number(tokens[1]);\n    const fila = Number(tokens[2]);\n    const columna = Number(tokens[3]);\n    const superficie: number[][] = [];\n    let idx = 4;\n    for(let i=0; i<n; i++){\n        const row = [];\n        for(let j=0; j<m; j++){\n            row.push(Number(tokens[idx++]));\n        }\n        superficie.push(row);\n    }\n    const res = impacto_torpedo(superficie, fila, columna);\n    res.forEach(row => console.log(row.join(" ")));\n}\nmain();\n// ----------------------',
    allowedLanguages: ['typescript'],
    readOnlyLines: [1,2,3,4,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
    publicTests: [
      { input: "3 3 1 1\n1 1 1\n1 1 1\n1 1 1\n", expected_output: "1 0 1\n0 0 0\n1 0 1" },
      { input: "3 3 0 0\n1 1 1\n1 1 1\n1 1 1\n", expected_output: "0 0 1\n0 1 1\n1 1 1" },
      { input: "2 2 1 0\n1 1\n1 1\n", expected_output: "0 1\n0 0" }
    ],
    privateTests: [
      { input: "1 3 0 1\n1 1 1\n", expected_output: "0 0 0" },
      { input: "4 4 3 3\n1 1 1 1\n1 1 1 1\n1 1 1 1\n1 1 1 1\n", expected_output: "1 1 1 1\n1 1 1 1\n1 1 1 0\n1 1 0 0" }
    ]
  },
  {
    id: '29',
    title: 'La Ruta de Kessel',
    level: 'hard',
    premise: 'Para encontrar la ruta más rápida, el computador de navegación divide el espacio en sectores (una matriz NxM de enteros, donde cada número es el tiempo en parsecs). Debes encontrar el valor mínimo de cada fila y devolver un arreglo unidimensional con esos valores en orden.',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\nusing namespace std;\n// ----------------------\n\nvoid ruta_mas_corta(int n, int m, int sectores[20][20], int res[]) {\n    // Escribe tu código aquí\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    int n, m;\n    if (!(cin >> n >> m)) return 0;\n    int sectores[20][20];\n    for(int i=0; i<n; i++) {\n        for(int j=0; j<m; j++) {\n            cin >> sectores[i][j];\n        }\n    }\n    int res[20];\n    ruta_mas_corta(n, m, sectores, res);\n    for(int i=0; i<n; i++) {\n        cout << res[i] << (i == n-1 ? "" : " ");\n    }\n    cout << endl;\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Recibes la matriz sectores NxM. Devuelve un arreglo con el valor mínimo de cada fila.\n// ----------------------\n\nfunction ruta_mas_corta(sectores: number[][]): number[] {\n    // Escribe tu código aquí\n    return [];\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const tokens = (globalThis as any).__INPUT__.trim().split(/\\s+/);\n    if(tokens.length < 2) return;\n    const n = Number(tokens[0]);\n    const m = Number(tokens[1]);\n    const sectores: number[][] = [];\n    let idx = 2;\n    for(let i=0; i<n; i++){\n        const row = [];\n        for(let j=0; j<m; j++){\n            row.push(Number(tokens[idx++]));\n        }\n        sectores.push(row);\n    }\n    console.log(ruta_mas_corta(sectores).join(" "));\n}\nmain();\n// ----------------------',
    allowedLanguages: ['typescript'],
    readOnlyLines: [1,2,3,4,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],
    publicTests: [
      { input: "3 3\n10 20 30\n5 15 25\n100 2 80\n", expected_output: "10 5 2" },
      { input: "2 4\n1 2 3 4\n-1 -2 -3 -4\n", expected_output: "1 -4" }
    ],
    privateTests: [
      { input: "1 3\n9 9 9\n", expected_output: "9" },
      { input: "3 1\n10\n20\n30\n", expected_output: "10 20 30" }
    ]
  },
  {
    id: '30',
    title: 'Holograma Imperial',
    level: 'hard',
    premise: 'Los códigos de acceso del Imperio siempre forman matrices perfectamente simétricas. Dada una matriz cuadrada NxN, verifica si es simétrica respecto a su diagonal principal (es decir, si el elemento en [i][j] es exactamente igual al elemento en [j][i] para todas las posiciones). Devuelve True si lo es, o False en caso contrario.',
    boilerplate: '// --- ZONA PROTEGIDA ---\n#include <iostream>\nusing namespace std;\n// ----------------------\n\nbool es_simetrica(int n, int matriz[20][20]) {\n    // Escribe tu código aquí\n    return false;\n}\n\n// --- ZONA PROTEGIDA ---\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    int matriz[20][20];\n    for(int i=0; i<n; i++) {\n        for(int j=0; j<n; j++) {\n            cin >> matriz[i][j];\n        }\n    }\n    cout << (es_simetrica(n, matriz) ? "True" : "False") << endl;\n    return 0;\n}\n// ----------------------',
    boilerplate_ts: '// --- ZONA PROTEGIDA ---\n// TypeScript: Recibes una matriz cuadrada NxN. Devuelve True si es simétrica, o False en caso contrario.\n// ----------------------\n\nfunction es_simetrica(matriz: number[][]): boolean {\n    // Escribe tu código aquí\n    return false;\n}\n\n// --- ZONA PROTEGIDA ---\nfunction main() {\n    const tokens = (globalThis as any).__INPUT__.trim().split(/\\s+/);\n    if(tokens.length < 1 || tokens[0] === "") return;\n    const n = Number(tokens[0]);\n    const matriz: number[][] = [];\n    let idx = 1;\n    for(let i=0; i<n; i++){\n        const row = [];\n        for(let j=0; j<n; j++){\n            row.push(Number(tokens[idx++]));\n        }\n        matriz.push(row);\n    }\n    console.log(es_simetrica(matriz) ? "True" : "False");\n}\nmain();\n// ----------------------',
    allowedLanguages: ['typescript'],
    readOnlyLines: [1,2,3,4,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
    publicTests: [
      { input: "3\n1 2 3\n2 4 5\n3 5 6\n", expected_output: "True" },
      { input: "3\n1 2 3\n2 4 5\n3 9 6\n", expected_output: "False" }
    ],
    privateTests: [
      { input: "1\n100\n", expected_output: "True" },
      { input: "2\n1 2\n3 4\n", expected_output: "False" }
    ]
  }
];
