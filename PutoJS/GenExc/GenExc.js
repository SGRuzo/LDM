// Definimos un array (lista) de posibles "personas" que serán el sujeto de la excusa
// Cada elemento es una cadena de texto entre comillas
const personas = [
    "mi perro", "mi abuela", "el algoritmo de TikTok", "un influencer que sigo",
    "mi ex", "el horóscopo", "un meme que vi", "mi terapeuta",
    "un vidente en Instagram", "mi gato", "un youtuber", "mi tarotista"
];

// Definimos un array de posibles "acciones" que serán el verbo de la excusa
const acciones = [
    "borró mi tarea", "me dijo que no lo hiciera", "predijo que sería mala idea",
    "se comió mi computadora", "me hackeó el celular", "me convenció de viajar",
    "me hizo cuestionar mi existencia", "me dijo que era una prueba del universo",
    "me hizo replantearme mis prioridades", "me mostró un video de gatitos",
    "me hizo llorar con un reel", "me dio un ataque de ansiedad existencial"
];

// Definimos un array de posibles "lugares" o situaciones donde ocurrió
const lugares = [
    "en medio de una crisis existencial", "durante mi detox digital",
    "mientras meditaba", "en plena reunión familiar",
    "cuando estaba stalkeando a mi ex", "en medio de un breakdown",
    "durante mi ayuno de dopamina", "mientras organizaba mi altar de cristales",
    "en plena sesión de journaling", "cuando estaba limpiando mi aura",
    "durante mi ritual lunar", "en medio de una sincronicidad cósmica"
];

// Definimos la función principal que genera y muestra la excusa
function generarExcusa() {
    // PASO 1: Seleccionar una persona al azar
    // Math.random() genera un número decimal entre 0 y 1 (ej: 0.456)
    // Multiplicamos por personas.length (12) para obtener un número entre 0 y 11.999...
    // Math.floor() redondea hacia abajo (ej: 5.999 → 5)
    const quien = personas[Math.floor(Math.random() * personas.length)];
    
    // PASO 2: Seleccionar una acción al azar (misma lógica que arriba)
    const accion = acciones[Math.floor(Math.random() * acciones.length)];
    
    // PASO 3: Seleccionar un lugar al azar (misma lógica)
    const lugar = lugares[Math.floor(Math.random() * lugares.length)];
    
    // PASO 4: Construir la excusa completa combinando las partes seleccionadas
    // Usamos template literals (entre backticks ``) para insertar variables fácilmente
    const excusaCompleta = `Lo siento, no pude hacerlo porque ${quien} ${accion} ${lugar}.`;
    
    // PASO 5: Mostrar la excusa en la página web
    // document.getElementById busca el elemento HTML con id="excuse"
    // textContent establece el texto que mostrará ese elemento
    document.getElementById('excusa').textContent = excusaCompleta;
}

// PASO FINAL: Hacer que se genere una excusa automáticamente cuando la página se carga
// window.onload espera a que la página termine de cargarse
// Luego ejecuta la función generarExcusa
window.onload = generarExcusa;