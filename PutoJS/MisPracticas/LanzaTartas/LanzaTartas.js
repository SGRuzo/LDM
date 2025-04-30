// ========== PASO 1: PREPARACIÓN DEL JUEGO ==========
        // Aquí guardamos todas las variables importantes del juego
        
        // Elementos del HTML que vamos a usar
        const juego = document.getElementById('juego');
        const contadorPuntos = document.getElementById('puntos');
        const tiempoRestante = document.getElementById('tiempoRestante');
        const botonIniciar = document.getElementById('iniciar');
        const botonReiniciar = document.getElementById('reiniciar');
        
        // Variables para controlar el juego
        let puntos = 0; // Cuántas tartas has lanzado correctamente
        let tiempo = 30; // Duración del juego en segundos
        let intervaloCaras; // Guardaremos el intervalo que crea caras
        let intervaloTiempo; // Guardaremos el intervalo del temporizador
        let juegoActivo = false; // Para saber si el juego está en marcha

        // Lista de emojis de caras que aparecerán
        const emojis = ['😀', '😎', '🤠', '🧐', '😍', '🤪', '😜', '👽', '🤡', '👻'];
        
        // Emoji cuando le das con la tarta
        const emojiConTarta = '🤡🍰'; // Cara con tarta

        // ========== PASO 2: FUNCIÓN PARA CREAR UNA CARA NUEVA ==========
        function crearCara() {
            // Si el juego no está activo, no creamos caras
            if (!juegoActivo) return;
            
            // Creamos un nuevo elemento div para la cara
            const cara = document.createElement('div');
            cara.className = 'cara';
            
            // Elegimos un emoji aleatorio de nuestra lista
            const emojiAleatorio = emojis[Math.floor(Math.random() * emojis.length)];
            cara.textContent = emojiAleatorio;
            
            // Posición aleatoria dentro del área de juego
            const tamañoJuego = juego.getBoundingClientRect();
            const x = Math.random() * (tamañoJuego.width - 50);
            const y = Math.random() * (tamañoJuego.height - 50);
            
            cara.style.left = `${x}px`;
            cara.style.top = `${y}px`;
            
            // Añadimos la cara al área de juego
            juego.appendChild(cara);
            
            // Evento para cuando haces clic en la cara
            cara.addEventListener('click', function() {
                // Cambiamos el emoji por la cara con tarta
                cara.textContent = emojiConTarta;
                cara.style.cursor = 'default'; // Cambiamos el cursor
                
                // Sumamos un punto y actualizamos el contador
                puntos++;
                contadorPuntos.textContent = puntos;
                
                // Desactivamos nuevos clicks en esta cara
                cara.onclick = null;
                
                // Hacemos desaparecer la cara después de 1 segundo
                setTimeout(() => {
                    cara.remove();
                }, 1000);
            });
            
            // Hacemos desaparecer la cara después de 3 segundos si no le das
            setTimeout(() => {
                if (cara.textContent !== emojiConTarta) {
                    cara.remove();
                }
            }, 3000);
        }

        // ========== PASO 3: FUNCIÓN PARA INICIAR EL JUEGO ==========
        function iniciarJuego() {
            // Limpiamos el área de juego por si había caras anteriores
            juego.innerHTML = '';
            
            // Reiniciamos los contadores
            puntos = 0;
            tiempo = 30;
            contadorPuntos.textContent = puntos;
            tiempoRestante.textContent = tiempo;
            
            // Activamos el juego
            juegoActivo = true;
            
            // Ocultamos el botón de iniciar y mostramos el de reiniciar
            botonIniciar.style.display = 'none';
            botonReiniciar.style.display = 'none';
            
            // Creamos caras nuevas cada segundo
            intervaloCaras = setInterval(crearCara, 1000);
            
            // Temporizador que cuenta hacia atrás
            intervaloTiempo = setInterval(() => {
                tiempo--;
                tiempoRestante.textContent = tiempo;
                
                // Cuando el tiempo llega a 0, terminamos el juego
                if (tiempo <= 0) {
                    terminarJuego();
                }
            }, 1000);
        }

        // ========== PASO 4: FUNCIÓN PARA TERMINAR EL JUEGO ==========
        function terminarJuego() {
            // Desactivamos el juego
            juegoActivo = false;
            
            // Detenemos los intervalos
            clearInterval(intervaloCaras);
            clearInterval(intervaloTiempo);
            
            // Mostramos mensaje final
            const mensajeFinal = document.createElement('div');
            mensajeFinal.style.fontSize = '24px';
            mensajeFinal.style.marginTop = '20px';
            mensajeFinal.textContent = `¡Juego terminado! Puntuación: ${puntos} tartas`;
            juego.appendChild(mensajeFinal);
            
            // Mostramos el botón para reiniciar
            botonReiniciar.style.display = 'inline-block';
        }

        // ========== PASO 5: EVENTOS DE LOS BOTONES ==========
        botonIniciar.addEventListener('click', iniciarJuego);
        botonReiniciar.addEventListener('click', iniciarJuego);

        // ========== PASO 6: INICIAMOS EL JUEGO AUTOMÁTICAMENTE (OPCIONAL) ==========
        // Para que el juego empiece sin necesidad de hacer clic, descomenta esta línea:
        // iniciarJuego();