// PASO 1: Creamos un array con todos los compañeros y sus datos
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

// PASO 2: Obtenemos los elementos del DOM que necesitaremos
const inputNombre = document.getElementById('inputNombre');
const divSugerencias = document.getElementById('sugerencias');
const botonBuscar = document.getElementById('botonBuscar');
const divResultado = document.getElementById('resultado');
const imgCompanero = document.getElementById('imagenCompanero');
const pFrase = document.getElementById('fraseCompanero');

// Variable para guardar el compañero seleccionado
let companeroSeleccionado = null;

// PASO 3: Función para mostrar sugerencias mientras se escribe
inputNombre.addEventListener('input', function() {
    const textoBusqueda = this.value.toLowerCase();
    
    // Filtramos los compañeros que coincidan con la búsqueda
    const sugerencias = compañeros.filter(comp => 
        comp.nombre.toLowerCase().includes(textoBusqueda)
    );

    // Mostramos las sugerencias
    if (textoBusqueda.length > 0 && sugerencias.length > 0) {
        divSugerencias.innerHTML = '';
        sugerencias.forEach(comp => {
            const divSugerencia = document.createElement('div');
            divSugerencia.className = 'sugerencia';
            divSugerencia.textContent = comp.nombre;
            
            // Al hacer clic en una sugerencia, la seleccionamos
            divSugerencia.addEventListener('click', function() {
                inputNombre.value = comp.nombre;
                companeroSeleccionado = comp;
                divSugerencias.style.display = 'none';
            });
            
            divSugerencias.appendChild(divSugerencia);
        });
        divSugerencias.style.display = 'block';
    } else {
        divSugerencias.style.display = 'none';
    }
});

// PASO 4: Función para buscar y mostrar el compañero
botonBuscar.addEventListener('click', function() {
    // Si no hay compañero seleccionado, buscamos por el texto
    if (!companeroSeleccionado) {
        const nombreBuscado = inputNombre.value.trim();
        if (nombreBuscado === '') {
            alert('Por favor, escribe un nombre');
            return;
        }
        
        // Buscamos el compañero (insensible a mayúsculas)
        companeroSeleccionado = compañeros.find(comp => 
            comp.nombre.toLowerCase() === nombreBuscado.toLowerCase()
        );
        
        if (!companeroSeleccionado) {
            alert('No se encontró el compañero');
            return;
        }
    }
    
    // Mostramos el resultado
    imgCompanero.src = companeroSeleccionado.imagen;
    imgCompanero.alt = `Foto de ${companeroSeleccionado.nombre}`;
    pFrase.textContent = `"${companeroSeleccionado.frase}"`;
    divResultado.style.display = 'block';
    
    // Reseteamos para la próxima búsqueda
    companeroSeleccionado = null;
});

// Ocultar sugerencias al hacer clic fuera
document.addEventListener('click', function(e) {
    if (e.target !== inputNombre) {
        divSugerencias.style.display = 'none';
    }
});