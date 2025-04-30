// ===== CONFIGURACIÓN INICIAL =====
const palabras = ["PERRO", "GATOS", "CASAS", "ARBOL", "FLOR", "LIBRO", "MESAS", "SILLA", "RATON", "PLAYA"];
let palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
let intentoActual = 0;

// Elementos del DOM
const tablero = document.getElementById("tablero");
const inputPalabra = document.getElementById("inputPalabra");
const btnProbar = document.getElementById("btnProbar");
const mensaje = document.getElementById("mensaje");

// ===== CREAR TABLERO INVERTIDO =====
function crearTablero() {
    // Creamos 6 filas (de 0 a 5)
    for (let i = 0; i < 6; i++) {
        const fila = document.createElement("div");
        fila.className = "fila";
        fila.id = `fila-${i}`;
        
        // Creamos 5 círculos (letras) por fila
        for (let j = 0; j < 5; j++) {
            const letra = document.createElement("div");
            letra.className = "letra";
            letra.id = `letra-${i}-${j}`;
            fila.appendChild(letra);
        }
        
        // Añadimos la fila al tablero (como usamos column-reverse en CSS, se añadirán de abajo hacia arriba)
        tablero.appendChild(fila);
    }
}

crearTablero();

// ===== MANEJAR INTENTO DEL JUGADOR =====
function probarPalabra() {
    const palabraIntento = inputPalabra.value.toUpperCase().trim();
    
    // Validaciones
    if (palabraIntento.length !== 5) {
        mensaje.textContent = "¡Debe ser una palabra de 5 letras!";
        mensaje.style.color = "#e74c3c";
        inputPalabra.focus();
        return;
    }
    
    if (!/^[A-ZÁÉÍÓÚÑ]+$/i.test(palabraIntento)) {
        mensaje.textContent = "¡Solo se permiten letras!";
        mensaje.style.color = "#e74c3c";
        inputPalabra.focus();
        return;
    }
    
    // Mostrar palabra en el tablero (en la fila correspondiente)
    mostrarPalabraEnTablero(palabraIntento);
    
    // Comprobar aciertos
    comprobarLetras(palabraIntento);
    
    // Limpiar input y preparar para siguiente intento
    inputPalabra.value = "";
    inputPalabra.focus();
    
    // Comprobar si ganó o perdió
    comprobarResultado(palabraIntento);
    
    // Incrementar intento
    intentoActual++;
}

// ===== MOSTRAR PALABRA EN EL TABLERO =====
function mostrarPalabraEnTablero(palabra) {
    const filaActual = document.getElementById(`fila-${intentoActual}`);
    
    for (let i = 0; i < 5; i++) {
        const letra = filaActual.children[i];
        letra.textContent = palabra[i];
    }
}

// ===== COMPROBAR LETRAS =====
function comprobarLetras(palabraIntento) {
    const filaActual = document.getElementById(`fila-${intentoActual}`);
    let letrasCorrectas = Array(5).fill(false);
    
    // 1. Buscar letras correctas en posición correcta (verde)
    for (let i = 0; i < 5; i++) {
        if (palabraIntento[i] === palabraSecreta[i]) {
            filaActual.children[i].classList.add("correcta");
            letrasCorrectas[i] = true;
        }
    }
    
    // 2. Buscar letras correctas pero mal ubicadas (amarillo)
    for (let i = 0; i < 5; i++) {
        if (!letrasCorrectas[i]) {
            for (let j = 0; j < 5; j++) {
                if (!letrasCorrectas[j] && palabraIntento[i] === palabraSecreta[j]) {
                    filaActual.children[i].classList.add("presente");
                    break;
                }
            }
        }
    }
    
    // 3. Marcar letras incorrectas (gris)
    for (let i = 0; i < 5; i++) {
        if (!filaActual.children[i].classList.contains("correcta") && 
            !filaActual.children[i].classList.contains("presente")) {
            filaActual.children[i].classList.add("ausente");
        }
    }
}

// ===== COMPROBAR RESULTADO FINAL =====
function comprobarResultado(palabraIntento) {
    if (palabraIntento === palabraSecreta) {
        mensaje.textContent = "¡Felicidades! ¡Has ganado! 🎉";
        mensaje.style.color = "#27ae60";
        btnProbar.disabled = true;
        inputPalabra.disabled = true;
    } else if (intentoActual === 5) {
        mensaje.textContent = `¡Game Over! La palabra era: ${palabraSecreta}`;
        mensaje.style.color = "#e74c3c";
        btnProbar.disabled = true;
        inputPalabra.disabled = true;
    } else {
        mensaje.textContent = "";
    }
}

// ===== EVENT LISTENERS =====
btnProbar.addEventListener("click", probarPalabra);

inputPalabra.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        probarPalabra();
    }
});

// Auto-enfoque al cargar la página
inputPalabra.focus();

// Filtro para solo letras
inputPalabra.addEventListener("input", function() {
    this.value = this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]/g, "");
});