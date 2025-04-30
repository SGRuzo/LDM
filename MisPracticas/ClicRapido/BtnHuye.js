// === PASO 3: OBTENEMOS LOS ELEMENTOS DEL HTML ===
const boton = document.getElementById('botonEsquivo');
const mensaje = document.getElementById('mensaje');

// === PASO 4: COLOCAMOS EL BOTÓN EN EL CENTRO INICIALMENTE ===
// Usamos una función para poder llamarla luego al reiniciar
function centrarBoton() {
    // Calculamos la posición central restando la mitad del ancho/alto del botón
    const centroX = (window.innerWidth - boton.offsetWidth) / 2;
    const centroY = (window.innerHeight - boton.offsetHeight) / 2;
    
    // Aplicamos las posiciones calculadas
    boton.style.left = centroX + 'px';
    boton.style.top = centroY + 'px';
}

// Llamamos a la función para centrar el botón al cargar la página
centrarBoton();

// === PASO 5: HACEMOS QUE EL BOTÓN HUYA AL PASAR EL RATÓN ===
boton.addEventListener('mouseenter', function() {
    // Calculamos posiciones aleatorias dentro de la ventana visible
    // Math.random() da un número entre 0 y 1
    // Multiplicamos por el ancho/alto disponible (restamos el tamaño del botón)
    const nuevaX = Math.random() * (window.innerWidth - boton.offsetWidth);
    const nuevaY = Math.random() * (window.innerHeight - boton.offsetHeight);
    
    // Movemos el botón a las nuevas coordenadas
    boton.style.left = nuevaX + 'px';
    boton.style.top = nuevaY + 'px';
    
    // Cambiamos el color para dar feedback visual
    boton.style.backgroundColor = '#ff6348';
});

// === PASO 6: DETECTAMOS CUANDO LO ATRAPAN (CLIC) ===
boton.addEventListener('click', function() {
    // Mostramos el mensaje de victoria
    mensaje.textContent = '¡Lo atrapaste! 🎉';
    mensaje.style.opacity = '1'; // Hacemos visible el mensaje
    
    // Congelamos el botón para que no siga huyendo
    boton.style.backgroundColor = '#2ed573';
    boton.textContent = '¡Me pillaste!';
    
    // Removemos el evento mouseenter para que deje de moverse
    boton.onmouseenter = null;
    
    // Opcional: Botón para reiniciar el juego
    setTimeout(() => {
        const reiniciar = confirm('¿Quieres jugar de nuevo?');
        if (reiniciar) {
            location.reload(); // Recarga la página
        }
    }, 1000);
});

// === PASO 7 (EXTRA): MANEJAMOS EL REDIMENSIONADO DE VENTANA ===
window.addEventListener('resize', function() {
    // Si el botón está fuera de la pantalla al cambiar el tamaño
    const botonX = parseInt(boton.style.left) || 0;
    const botonY = parseInt(boton.style.top) || 0;
    
    if (botonX > window.innerWidth - boton.offsetWidth || 
        botonY > window.innerHeight - boton.offsetHeight) {
        centrarBoton(); // Lo volvemos a centrar
    }
});