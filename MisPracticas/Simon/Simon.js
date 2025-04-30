 // ========== PASO 1: DEFINIR VARIABLES DEL JUEGO ==========
        
        // Array para guardar la secuencia de colores que el jugador debe repetir
        let secuencia = [];
        
        // Variable para llevar la cuenta de qué posición de la secuencia está intentando el jugador
        let posicionJugador = 0;
        
        // Nivel actual del juego (longitud de la secuencia)
        let nivel = 1;
        
        // Estado del juego: si está mostrando la secuencia o esperando la respuesta del jugador
        let mostrandoSecuencia = false;
        
        // Obtenemos todos los elementos del DOM que necesitaremos
        const botonRojo = document.getElementById('rojo');
        const botonAzul = document.getElementById('azul');
        const botonVerde = document.getElementById('verde');
        const botonAmarillo = document.getElementById('amarillo');
        const botonInicio = document.getElementById('botonInicio');
        const mensaje = document.getElementById('mensaje');
        const elementoNivel = document.getElementById('nivel');
        
        // Sonidos para cada color (usaremos el Web Audio API)
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const frecuencias = {
            rojo: 329.63,  // Nota E4
            azul: 440.00,  // Nota A4
            verde: 587.33, // Nota D5
            amarillo: 783.99 // Nota G5
        };
        
        // ========== PASO 2: FUNCIONES DEL JUEGO ==========
        
        /**
         * Reproduce un sonido para el color especificado
         * @param {string} color - El color del botón ('rojo', 'azul', 'verde', 'amarillo')
         */
        function reproducirSonido(color) {
            const oscilador = audioContext.createOscillator();
            const ganancia = audioContext.createGain();
            
            oscilador.type = 'sine';
            oscilador.frequency.value = frecuencias[color];
            
            ganancia.gain.value = 0.3;
            ganancia.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscilador.connect(ganancia);
            ganancia.connect(audioContext.destination);
            
            oscilador.start();
            oscilador.stop(audioContext.currentTime + 0.5);
        }
        
        /**
         * Ilumina un botón y reproduce su sonido
         * @param {HTMLElement} elemento - El elemento del botón de color
         */
        function iluminarBoton(elemento) {
            const color = elemento.id;
            
            // Añade la clase 'iluminado' para cambiar la apariencia
            elemento.classList.add('iluminado');
            reproducirSonido(color);
            
            // Después de 500ms, quita la clase 'iluminado'
            setTimeout(() => {
                elemento.classList.remove('iluminado');
            }, 500);
        }
        
        /**
         * Genera un nuevo color aleatorio y lo añade a la secuencia
         */
        function agregarColorSecuencia() {
            // Array con los posibles colores
            const colores = ['rojo', 'azul', 'verde', 'amarillo'];
            
            // Elige un color aleatorio
            const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
            
            // Añade el color a la secuencia
            secuencia.push(colorAleatorio);
        }
        
        /**
         * Muestra la secuencia completa al jugador
         */
        function mostrarSecuencia() {
            mostrandoSecuencia = true;
            mensaje.textContent = 'Mira la secuencia';
            
            let i = 0;
            // Usamos setInterval para mostrar cada color con un retraso
            const intervalo = setInterval(() => {
                const color = secuencia[i];
                const elemento = document.getElementById(color);
                
                iluminarBoton(elemento);
                
                i++;
                if (i >= secuencia.length) {
                    clearInterval(intervalo);
                    setTimeout(() => {
                        mostrandoSecuencia = false;
                        mensaje.textContent = 'Tu turno!';
                    }, 500);
                }
            }, 1000); // Mostramos cada color cada 1 segundo
        }
        
        /**
         * Comprueba si el jugador ha pulsado el color correcto
         * @param {string} color - El color que ha pulsado el jugador
         */
        function comprobarColor(color) {
            // Si el juego está mostrando la secuencia, ignoramos los clicks
            if (mostrandoSecuencia) return;
            
            // Obtenemos el elemento del color pulsado
            const elemento = document.getElementById(color);
            iluminarBoton(elemento);
            
            // Comprobamos si es el color correcto en la secuencia
            if (color === secuencia[posicionJugador]) {
                // Color correcto
                posicionJugador++;
                
                // Si ha completado toda la secuencia
                if (posicionJugador === secuencia.length) {
                    // Aumentamos el nivel
                    nivel++;
                    elementoNivel.textContent = `Nivel: ${nivel}`;
                    mensaje.textContent = 'Bien hecho! Siguiente nivel...';
                    
                    // Esperamos 1 segundo y generamos la siguiente secuencia
                    setTimeout(() => {
                        posicionJugador = 0;
                        agregarColorSecuencia();
                        mostrarSecuencia();
                    }, 1000);
                }
            } else {
                // Color incorrecto - Game Over
                gameOver();
            }
        }
        
        /**
         * Termina el juego y reinicia las variables
         */
        function gameOver() {
            // Reproducimos un sonido de error
            const oscilador = audioContext.createOscillator();
            const ganancia = audioContext.createGain();
            
            oscilador.type = 'sine';
            oscilador.frequency.value = 220; // Nota más baja para sonido de error
            ganancia.gain.value = 0.3;
            
            oscilador.connect(ganancia);
            ganancia.connect(audioContext.destination);
            
            oscilador.start();
            oscilador.stop(audioContext.currentTime + 1);
            
            // Mostramos mensaje de Game Over
            mensaje.textContent = 'Game Over! Puntuación: ' + (nivel - 1);
            
            // Reiniciamos el juego
            secuencia = [];
            posicionJugador = 0;
            nivel = 1;
            elementoNivel.textContent = 'Nivel: 1';
        }
        
        /**
         * Inicia un nuevo juego
         */
        function iniciarJuego() {
            mensaje.textContent = 'Preparado...';
            secuencia = [];
            posicionJugador = 0;
            nivel = 1;
            elementoNivel.textContent = 'Nivel: 1';
            
            // Esperamos 1 segundo antes de empezar
            setTimeout(() => {
                agregarColorSecuencia();
                mostrarSecuencia();
            }, 1000);
        }
        
        // ========== PASO 3: EVENT LISTENERS ==========
        
        // Añadimos event listeners a cada botón de color
        botonRojo.addEventListener('click', () => comprobarColor('rojo'));
        botonAzul.addEventListener('click', () => comprobarColor('azul'));
        botonVerde.addEventListener('click', () => comprobarColor('verde'));
        botonAmarillo.addEventListener('click', () => comprobarColor('amarillo'));
        
        // Event listener para el botón de inicio
        botonInicio.addEventListener('click', iniciarJuego);
        
        // ========== PASO 4: INICIAR EL JUEGO (OPCIONAL) ==========
        // Para que el juego empiece automáticamente al cargar la página, descomenta:
        // iniciarJuego();