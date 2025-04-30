
const compañeros = [
    {
        nombre: "Pedro",
        apellido: "González",
        frase: "Mañá veño a traballar en coche",
        imagen: "Img/PedroGonzalez.jpg"
    },
    {
        nombre: "Oliver",
        apellido: "Miguez",
        frase: "Lisa simpson es una niña de mi cole",
        imagen: "Img/Oliver.png"
    },
    {
        nombre: "Jorge",
        apellido: "Durán",
        frase: "¿Unos FIFAS de mientras?",
        imagen: "Img/Jorge.png"
    },
    {
        nombre: "Saúl",
        apellido: "Alvarez",
        frase: "No vuelvo a beber..",
        imagen: "Img/SaulAlvarezMonzon.jpg"
    },
    {
        nombre: "Dima",
        apellido: "Aparicio",
        frase: "¿Nicki Nicole si o no?",
        imagen: "Img/Dima.jpeg"
    },
    {
        nombre: "Samuel",
        apellido: "Hermida",
        frase: "¿Unos métodos aCadea o que?",
        imagen: "Img/samu.jpg"
    },
    {
        nombre: "Oscar",
        apellido: "Rodríguez",
        frase: "Ser dios sería lo más, o si no ser el ser más inteligente sobre la tierra",
        imagen: "Img/Oscar Rodriguez.jpg"
    },
    {
        nombre: "Karly",
        apellido: "Albarrán",
        frase: "Putin",
        imagen: "Img/Karly.jpg"
    },
    {
        nombre: "Andrea",
        apellido: "Mouriño",
        frase: "¿Un fort o que?",
        imagen: "Img/AndreaMouriño.jpg"
    },
    {
        nombre: "Javier",
        apellido: "Portela",
        frase: "Sin miedo al éxito",
        imagen: "Img/Javier.jpg"
    },
    {
        nombre: "Carlos",
        apellido: "Costas",
        frase: "No sé qué poner",
        imagen: "Img/Carlos.jpg"
    },
    {
        nombre: "Saray",
        apellido: "García",
        frase: "Manin, que pedazo de aprobado en progra",
        imagen: "Img/SarayGarcia.jpg"
    },
    {
        nombre: "Piero",
        apellido: "López",
        frase: "¿Un brawl?",
        imagen: "Img/Piero.jpg"
    },
    {
        nombre: "Rubén",
        apellido: "De la Torre",
        frase: "Yo era un aventurero como tú, hasta que recibí una flecha en la rodilla.",
        imagen: "Img/Rubén.jpeg"
    },
    {
        nombre: "Fran",
        apellido: "Prego",
        frase: "¿Me puedo pirar ya?",
        imagen: "Img/FranPrego.jpg"
    },
    {
        nombre: "Gael",
        apellido: "Marcelino",
        frase: "Marichema no quiere venir a clase de pedro",
        imagen: "Img/GaelMarcelino.jpg"
    },
    {
        nombre: "Adrian",
        apellido: "Hermo",
        frase: "Cristiano es mejor que messi",
        imagen: "Img/Adrian Hermo.png"
    },
    {
        nombre: "David",
        apellido: "Iglesias",
        frase: "Salgo escupío por la puerta",
        imagen: "Img/David Iglesias.jpg"
    },
    {
        nombre: "Daniel",
        apellido: "Figueroa",
        frase: "Voy a dejar el CandyCrush",
        imagen: "Img/DanielFigueroa.jpg"
    },
    {
        nombre: "Miguel",
        apellido: "Amboage",
        frase: "Pedro Sánchez dimisión!!!",
        imagen: "Img/MiguelAmboage.jpg"
    },
    {
        nombre: "Borja",
        apellido: "de Saá",
        frase: "Nooooooo la poliziaa!!!!",
        imagen: "Img/Borja.jpeg"
    },
    {
        nombre: "Ivan",
        apellido: "Gutierrez",
        frase: "La ira me consume",
        imagen: "Img/IvanG.jpg"
    },
    {
        nombre: "Manuel",
        apellido: "Carrera",
        frase: "Este finde no salgo que tengo que estudiar",
        imagen: "Img/Manu.jpeg"
    },
    {
        nombre: "Adrián",
        apellido: "Miguez",
        frase: "Dark Souls es el peor juego de la historia",
        imagen: "Img/Adrian Miguez.jpg"
    },
    {
        nombre: "Daniel",
        apellido: "Rodríguez",
        frase: "Eres muy chu chu chuli",
        imagen: "Img/DanielRodriguezTato.webp"
    },
    {
        nombre: "Sofía",
        apellido: "Otero",
        frase: "¡Devoraste hasta el suelo, y aún así te ves divina!",
        imagen: "Img/sofia-otero.jpg"
    }
];


const titulo = document.getElementById('titulo');
const imagen = document.getElementById('imagen-negativa');
const frase = document.getElementById('frase');
const btnXerar = document.getElementById('botonXerar');

function intercambiarLetras(nombre, apellido) {
    if (nombre.length >= 2 && apellido && apellido.length >= 2) {
        const nuevoNombre = apellido.substring(0, 2) + nombre.substring(2);
        const nuevoApellido = nombre.substring(0, 2) + apellido.substring(2);
        return `${nuevoNombre} ${nuevoApellido}`;
    }
    return `${nombre} ${apellido}`;
}

function generarAlumnoMaligno() {
    const aleatorio = Math.floor(Math.random() * compañeros.length);
    const compañero = compañeros[aleatorio];
    
    // Intercambiar primeras letras
    const nombreMaligno = intercambiarLetras(compañero.nombre, compañero.apellido);
    
    // Actualizar la tarjeta
    titulo.textContent = nombreMaligno;
    imagen.src = compañero.imagen;
    imagen.alt = `Evil ${compañero.nombre} ${compañero.apellido}`;
    frase.textContent = `"${compañero.frase}"`;
}

// Generar uno al cargar la página
generarAlumnoMaligno();

// Evento del botón
btnXerar.addEventListener('click', generarAlumnoMaligno);