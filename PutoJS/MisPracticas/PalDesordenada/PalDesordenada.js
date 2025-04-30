 // =============================================
        // PASO 1: PREPARACIÓN - Definimos nuestras variables
        // =============================================
        
        // Lista de palabras para el juego (se irán eliminando)
        let palabrasDisponibles = [
            'casa', 'perro', 'gato', 'arbol', 'sol', 
            'luna', 'agua', 'flor', 'libro', 'mesa'
        ];
        
        // Variables para llevar el control del juego
        let palabraActual = '';
        let palabraMezclada = '';
        let puntaje = 0;
        
        // Obtenemos los elementos del HTML que necesitaremos manipular
        const elementoPalabra = document.getElementById('palabraMezclada');
        const inputRespuesta = document.getElementById('respuestaUsuario');
        const elementoMensaje = document.getElementById('mensaje');
        const elementoPuntos = document.getElementById('puntos');
        const botonComprobar = document.getElementById('botonComprobar');
        const botonSaltar = document.getElementById('botonSaltar');
        const mensajeFinJuego = document.getElementById('finJuego');
        
        
        // =============================================
        // PASO 2: FUNCIONES PRINCIPALES DEL JUEGO
        // =============================================
        
        /**
         * Función para mezclar las letras de una palabra
         */
        function mezclarPalabra(palabra) {
            let letras = palabra.split('');
            letras.sort(() => 0.5 - Math.random());
            return letras.join('');
        }
        
        /**
         * Función para seleccionar una nueva palabra aleatoria
         */
        function seleccionarPalabraAleatoria() {
            // Si no quedan palabras, mostramos mensaje final
            if (palabrasDisponibles.length === 0) {
                finDelJuego();
                return false;
            }
            
            // Seleccionamos un índice aleatorio
            const indiceAleatorio = Math.floor(Math.random() * palabrasDisponibles.length);
            
            // Obtenemos la palabra y la eliminamos del array
            palabraActual = palabrasDisponibles[indiceAleatorio];
            palabrasDisponibles.splice(indiceAleatorio, 1);
            
            return true;
        }
        
        /**
         * Función para preparar una nueva palabra del juego
         */
        function nuevaPalabra() {
            // Intentamos seleccionar una nueva palabra
            if (!seleccionarPalabraAleatoria()) {
                return; // Si no hay palabras, salimos
            }
            
            // Mezclamos las letras
            palabraMezclada = mezclarPalabra(palabraActual);
            
            // Mostramos la palabra mezclada en pantalla
            elementoPalabra.textContent = palabraMezclada;
            
            // Limpiamos el input y el mensaje anterior
            inputRespuesta.value = '';
            elementoMensaje.textContent = '';
            
            // Ponemos el foco en el input para escribir
            inputRespuesta.focus();
        }
        
        /**
         * Función para comprobar si la respuesta es correcta
         */
        function comprobarRespuesta() {
            const respuesta = inputRespuesta.value.toLowerCase().trim();
            
            if (respuesta === palabraActual) {
                // Respuesta correcta
                puntaje += 10;
                elementoPuntos.textContent = puntaje;
                elementoMensaje.textContent = '¡Correcto! +10 puntos';
                elementoMensaje.style.color = '#2ecc71';
                
                // Pasamos a la siguiente palabra
                setTimeout(nuevaPalabra, 1000);
            } else {
                // Respuesta incorrecta
                elementoMensaje.textContent = 'Incorrecto. Intenta de nuevo.';
                elementoMensaje.style.color = '#e74c3c';
                inputRespuesta.focus();
            }
        }
        
        /**
         * Función que se ejecuta cuando se acaban las palabras
         */
        function finDelJuego() {
            // Ocultamos elementos del juego
            elementoPalabra.style.display = 'none';
            inputRespuesta.style.display = 'none';
            botonComprobar.style.display = 'none';
            botonSaltar.style.display = 'none';
            
            // Mostramos mensaje final
            mensajeFinJuego.style.display = 'block';
            elementoMensaje.textContent = `Puntuación final: ${puntaje} puntos`;
        }
        
        
        // =============================================
        // PASO 3: CONFIGURAR EVENTOS (CLICKS, TECLAS)
        // =============================================
        
        botonComprobar.addEventListener('click', comprobarRespuesta);
        
        inputRespuesta.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                comprobarRespuesta();
            }
        });
        
        botonSaltar.addEventListener('click', function() {
            elementoMensaje.textContent = `La palabra era: ${palabraActual}`;
            elementoMensaje.style.color = '#3498db';
            
            setTimeout(nuevaPalabra, 1500);
        });
        
        
        // =============================================
        // PASO 4: INICIAR EL JUEGO
        // =============================================
        
        nuevaPalabra();