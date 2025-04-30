// Esperamos a que la página esté completamente cargada
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Obtenemos los elementos del HTML que vamos a usar
    const contenedorCartas = document.getElementById('manoCartas');
    const contadorPalos = document.getElementById('contadorPalos');
    const botonNuevaMano = document.getElementById('botonNuevaMano');

    // 2. Definimos los palos de la baraja española
    const palos = ['Bastos', 'Copas', 'Espadas', 'Oros'];
    
    // 3. Función para generar una nueva mano de cartas
    function generarMano() {
        // Limpiamos las cartas anteriores
        contenedorCartas.innerHTML = '';
        
        // Creamos un contador para cada palo
        const contador = {
            Bastos: 0,
            Copas: 0,
            Espadas: 0,
            Oros: 0
        };

        // Array para evitar cartas repetidas
        const cartasGeneradas = [];

        // Generamos 7 cartas aleatorias
        for (let i = 0; i < 7; i++) {
            let palo, numero, carta;
            
            // Generamos cartas hasta encontrar una que no esté repetida
            do {
                palo = palos[Math.floor(Math.random() * 4)]; // Elige un palo al azar
                numero = Math.floor(Math.random() * 10) + 1; // Número entre 1 y 10
                carta = palo + numero; // Ejemplo: "Bastos5"
            } while (cartasGeneradas.includes(carta));
            
            // Guardamos la carta generada
            cartasGeneradas.push(carta);
            contador[palo]++; // Aumentamos el contador del palo

            // Creamos la imagen de la carta (sin mostrar el nombre)
            const imagenCarta = document.createElement('img');
            imagenCarta.src = `cartas/${palo}/${palo.toLowerCase().slice(0, -1)}${numero}.png`;
            imagenCarta.alt = 'Carta de baraja española'; // Texto alternativo genérico
            imagenCarta.className = 'carta';
            // Hemos eliminado el atributo title que mostraba el nombre
            
            // Añadimos la carta al contenedor
            contenedorCartas.appendChild(imagenCarta);
        }

        // Mostramos el contador de palos
        mostrarContador(contador);
    }

    // 4. Función para mostrar cuántas cartas hay de cada palo
    function mostrarContador(contador) {
        let textoHTML = '<h3>Cartas por palo:</h3>';
        
        // Recorremos cada palo y añadimos su cantidad
        textoHTML += `<p>Bastos: ${contador.Bastos}</p>`;
        textoHTML += `<p>Copas: ${contador.Copas}</p>`;
        textoHTML += `<p>Espadas: ${contador.Espadas}</p>`;
        textoHTML += `<p>Oros: ${contador.Oros}</p>`;
        
        contadorPalos.innerHTML = textoHTML;
    }

    // 5. Cuando se hace clic en el botón, generamos nueva mano
    botonNuevaMano.addEventListener('click', generarMano);
    
    // Generamos una mano al cargar la página
    generarMano();
});