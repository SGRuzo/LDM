// Array de compañeros (reducido para el ejemplo)
const compañeros = [
    {
        nombre: "Pedro González",
        frase: "Mañá veño a traballar en coche",
        imagen: "Img/PedroGonzalez.jpg"  // Ruta completa a la imagen
    },
    {
        nombre: "Oliver Miguez",
        frase: "Lisa simpson es una niña de mi cole",
        imagen: "Img/Oliver.png"
    },
    {
        nombre: "Jorge Durán",
        frase: "¿Unos FIFAS de mientras?",
        imagen: "Img/Jorge.png"
    },
    // Añadimos todos los compañeros de la misma forma
    {
        nombre: "Saúl",
        frase: "No vuelvo a beber..",
        imagen: "Img/SaulAlvarezMonzon.jpg"
    },
    {
        nombre: "Dima Aparicio",
        frase: "¿Nicki Nicole si o no?",
        imagen: "Img/Dima.jpeg"
    },
    {
        nombre: "Samuel Hermida",
        frase: "¿Unos métodos aCadea o que?",
        imagen: "Img/samu.jpg"
    },
    {
        nombre: "Oscar Rodríguez",
        frase: "Ser dios sería lo más, o si no ser el ser más inteligente sobre la tierra",
        imagen: "Img/Oscar Rodriguez.jpg"
    },
    {
        nombre: "Karly Albarrán",
        frase: "Putin",
        imagen: "Img/Karly.jpg"
    },
    {
        nombre: "Andrea Mouriño",
        frase: "¿Un fort o que?",
        imagen: "Img/AndreaMouriño.jpg"
    },
    {
        nombre: "Javier Portela",
        frase: "Sin miedo al éxito",
        imagen: "Img/Javier.jpg"
    },
    {
        nombre: "Carlos Costas",
        frase: "No sé qué poner",
        imagen: "Img/Carlos.jpg"
    },
    {
        nombre: "Saray",
        frase: "Manin, que pedazo de aprobado en progra",
        imagen: "Img/SarayGarcia.jpg"
    },
    {
        nombre: "Piero",
        frase: "¿Un brawl?",
        imagen: "Img/Piero.jpg"
    },
    {
        nombre: "Rubén De la torre",
        frase: "Yo era un aventurero como tú, hasta que recibí una flecha en la rodilla.",
        imagen: "Img/Rubén.jpeg"
    },
    {
        nombre: "Fran Prego",
        frase: "¿Me puedo pirar ya?",
        imagen: "Img/FranPrego.jpg"
    },
    {
        nombre: "Gael Marcelino",
        frase: "Marichema no quiere venir a clase de pedro",
        imagen: "Img/GaelMarcelino.jpg"
    },
    {
        nombre: "Adrian Hermo",
        frase: "Cristiano es mejor que messi",
        imagen: "Img/Adrian Hermo.png"
    },
    {
        nombre: "David Iglesias",
        frase: "Salgo escupío por la puerta",
        imagen: "Img/David Iglesias.jpg"
    },
    {
        nombre: "Daniel Figueroa",
        frase: "Voy a dejar el CandyCrush",
        imagen: "Img/DanielFigueroa.jpg"
    },
    {
        nombre: "Miguel Amboage",
        frase: "Pedro Sánchez dimisión!!!",
        imagen: "Img/MiguelAmboage.jpg"
    },
    {
        nombre: "Borja de Saá",
        frase: "Nooooooo la poliziaa!!!!",
        imagen: "Img/Borja.jpeg"
    },
    {
        nombre: "Ivan Gutierrez",
        frase: "La ira me consume",
        imagen: "Img/IvanG.jpg"
    },
    {
        nombre: "Manuel Carrera",
        frase: "Este finde no salgo que tengo que estudiar",
        imagen: "Img/Manu.jpeg"
    },
    {
        nombre: "Adrián Miguez Campos",
        frase: "Dark Souls es el peor juego de la historia",
        imagen: "Img/Adrian Miguez.jpg"
    },
    {
        nombre: "Daniel Rodríguez Tato",
        frase: "Eres muy chu chu chuli",
        imagen: "Img/DanielRodriguezTato.webp"
    },
    {
        nombre: "Sofía Otero",
        frase: "¡Devoraste hasta el suelo, y aún así te ves divina!",
        imagen: "Img/sofia-otero.jpg"
    }
];

// Variables del juego
let puntos = 0;
let seleccionImagen = null;
let seleccionFrase = null;
let aciertos = 0;
let cartasImagen = [];
let cartasFrase = [];

// Elementos del DOM
const imagenesContainer = document.getElementById('imagenes-container');
const frasesContainer = document.getElementById('frases-container');
const puntosElement = document.getElementById('puntos');
const mensajeElement = document.getElementById('mensaje');
const botonReiniciar = document.getElementById('botonReiniciar');

// Función para mezclar array (Fisher-Yates)
function mezclarArray(array) {
    const nuevoArray = [...array];
    for (let i = nuevoArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nuevoArray[i], nuevoArray[j]] = [nuevoArray[j], nuevoArray[i]];
    }
    return nuevoArray;
}

// Función para crear las cartas del juego
function crearCartas() {
    // Limpiar contenedores
    imagenesContainer.innerHTML = '';
    frasesContainer.innerHTML = '';
    
    // Resetear variables
    puntos = 0;
    aciertos = 0;
    puntosElement.textContent = '0';
    seleccionImagen = null;
    seleccionFrase = null;
    
    // Mezclar compañeros
    const compañerosMezclados = mezclarArray(compañeros);
    
    // Crear cartas de imágenes
    cartasImagen = compañerosMezclados.map((comp, index) => {
        const carta = document.createElement('div');
        carta.className = 'carta';
        carta.dataset.id = index;
        
        const img = document.createElement('img');
        img.src = comp.imagen;
        img.alt = `Imagen de ${comp.nombre}`;
        img.className = 'carta-imagen';
        
        carta.appendChild(img);
        imagenesContainer.appendChild(carta);
        
        carta.addEventListener('click', () => seleccionarCarta('imagen', index));
        return carta;
    });
    
    // Mezclar frases
    const frasesMezcladas = mezclarArray([...compañerosMezclados]);
    
    // Crear cartas de frases
    cartasFrase = frasesMezcladas.map((comp, index) => {
        const carta = document.createElement('div');
        carta.className = 'carta carta-frase';
        carta.dataset.id = index;
        carta.textContent = comp.frase;
        frasesContainer.appendChild(carta);
        
        carta.addEventListener('click', () => seleccionarCarta('frase', index));
        return carta;
    });
}

// Función para manejar selección de cartas
function seleccionarCarta(tipo, id) {
    if (tipo === 'imagen') {
        // Deseleccionar si ya está seleccionada
        if (seleccionImagen === id) {
            cartasImagen[id].classList.remove('seleccionada');
            seleccionImagen = null;
            return;
        }
        
        // Limpiar selección anterior
        if (seleccionImagen !== null) {
            cartasImagen[seleccionImagen].classList.remove('seleccionada');
        }
        
        // Seleccionar nueva carta
        cartasImagen[id].classList.add('seleccionada');
        seleccionImagen = id;
    } else {
        // Deseleccionar si ya está seleccionada
        if (seleccionFrase === id) {
            cartasFrase[id].classList.remove('seleccionada');
            seleccionFrase = null;
            return;
        }
        
        // Limpiar selección anterior
        if (seleccionFrase !== null) {
            cartasFrase[seleccionFrase].classList.remove('seleccionada');
        }
        
        // Seleccionar nueva carta
        cartasFrase[id].classList.add('seleccionada');
        seleccionFrase = id;
    }
    
    // Comprobar si hay dos selecciones
    if (seleccionImagen !== null && seleccionFrase !== null) {
        comprobarPareja();
    }
}

// Función para comprobar si es una pareja correcta
function comprobarPareja() {
    const cartaImg = cartasImagen[seleccionImagen];
    const cartaFrase = cartasFrase[seleccionFrase];
    
    // Comprobar si coinciden los índices originales
    if (parseInt(cartaImg.dataset.id) === parseInt(cartaFrase.dataset.id)) {
        // Acierto
        cartaImg.classList.remove('seleccionada');
        cartaImg.classList.add('correcta');
        cartaFrase.classList.remove('seleccionada');
        cartaFrase.classList.add('correcta');
        
        // Sumar puntos
        puntos += 10;
        aciertos++;
        puntosElement.textContent = puntos;
        
        // Mostrar mensaje
        mostrarMensaje('¡Correcto! +10 puntos', 'acierto');
        
        // Comprobar si se completó el juego
        if (aciertos === compañeros.length) {
            setTimeout(() => {
                mostrarMensaje(`¡Ganaste! Puntuación: ${puntos} puntos`, 'acierto');
            }, 500);
        }
    } else {
        // Error
        mostrarMensaje('Inténtalo de nuevo', 'error');
    }
    
    // Resetear selecciones después de un tiempo
    setTimeout(() => {
        if (parseInt(cartaImg.dataset.id) !== parseInt(cartaFrase.dataset.id)) {
            cartaImg.classList.remove('seleccionada');
            cartaFrase.classList.remove('seleccionada');
        }
        seleccionImagen = null;
        seleccionFrase = null;
    }, 1000);
}

// Función para mostrar mensajes
function mostrarMensaje(texto, tipo) {
    mensajeElement.textContent = texto;
    mensajeElement.className = `mensaje ${tipo}`;
    mensajeElement.style.display = 'block';
    
    setTimeout(() => {
        mensajeElement.style.display = 'none';
    }, 1500);
}

// Evento para reiniciar el juego
botonReiniciar.addEventListener('click', crearCartas);

// Iniciar el juego al cargar
crearCartas();