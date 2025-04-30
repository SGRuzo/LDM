// === PASO 3: VARIABLES GLOBALES ===
        // Obtenemos todos los elementos del HTML que necesitaremos
        const juego = document.getElementById('juego');
        const jugador = document.getElementById('jugador');
        const infoPuntaje = document.getElementById('puntaje');
        const gameOverScreen = document.getElementById('gameOver');
        const puntajeFinal = document.getElementById('puntajeFinal');
        const botonReiniciar = document.getElementById('reiniciar');
        
        // Variables para controlar el estado del juego
        let puntaje = 0;
        let juegoActivo = true;
        let velocidadObstaculos = 5; // Velocidad inicial de caída
        let intervaloObstaculos; // Guardará nuestro intervalo para generarlos
        let posicionJugador = 175; // Posición horizontal inicial del jugador
        const velocidadJugador = 10; // Cuántos píxeles se mueve el jugador
        
        // === PASO 4: FUNCIÓN PARA MOVER AL JUGADOR ===
        function moverJugador(direccion) {
            if (!juegoActivo) return; // Si el juego terminó, no hacer nada
            
            // Calculamos la nueva posición
            if (direccion === 'izquierda') {
                posicionJugador -= velocidadJugador;
            } else if (direccion === 'derecha') {
                posicionJugador += velocidadJugador;
            }
            
            // Limitar al jugador dentro de los bordes del juego
            if (posicionJugador < 0) posicionJugador = 0;
            if (posicionJugador > juego.clientWidth - jugador.clientWidth) {
                posicionJugador = juego.clientWidth - jugador.clientWidth;
            }
            
            // Aplicamos la nueva posición
            jugador.style.left = posicionJugador + 'px';
        }
        
        // === PASO 5: DETECTAR TECLAS DEL TECLADO ===
        document.addEventListener('keydown', function(event) {
            // Flecha izquierda (código 37) o tecla A (código 65)
            if (event.keyCode === 37 || event.keyCode === 65) {
                moverJugador('izquierda');
            }
            // Flecha derecha (código 39) o tecla D (código 68)
            else if (event.keyCode === 39 || event.keyCode === 68) {
                moverJugador('derecha');
            }
        });
        
        // === PASO 6: CREAR OBSTÁCULOS ===
        function crearObstaculo() {
            if (!juegoActivo) return; // Si el juego terminó, no crear más
            
            // Creamos un nuevo elemento div para el obstáculo
            const obstaculo = document.createElement('div');
            obstaculo.className = 'obstaculo';
            
            // Posición aleatoria en la parte superior
            const posicionX = Math.random() * (juego.clientWidth - 50);
            obstaculo.style.left = posicionX + 'px';
            obstaculo.style.top = '0px';
            
            // Añadimos el obstáculo al juego
            juego.appendChild(obstaculo);
            
            // Movemos el obstáculo hacia abajo
            let posicionY = 0;
            const caidaObstaculo = setInterval(function() {
                if (!juegoActivo) {
                    clearInterval(caidaObstaculo);
                    return;
                }
                
                posicionY += velocidadObstaculos;
                obstaculo.style.top = posicionY + 'px';
                
                // === PASO 7: DETECTAR COLISIONES ===
                // Verificamos si el obstáculo chocó con el jugador
                if (
                    posicionY + 50 > juego.clientHeight - 70 && // 70 = jugador.posY + altura
                    posicionX + 50 > posicionJugador && 
                    posicionX < posicionJugador + 50
                ) {
                    terminarJuego();
                    clearInterval(caidaObstaculo);
                }
                
                // Si el obstáculo sale de la pantalla, lo eliminamos
                if (posicionY > juego.clientHeight) {
                    obstaculo.remove();
                    clearInterval(caidaObstaculo);
                    aumentarPuntaje();
                }
            }, 20); // Actualizamos cada 20 milisegundos
        }
        
        // === PASO 8: MANEJAR PUNTAJE ===
        function aumentarPuntaje() {
            if (!juegoActivo) return;
            
            puntaje += 1;
            infoPuntaje.textContent = puntaje;
            
            // Aumentar dificultad cada 10 puntos
            if (puntaje % 10 === 0) {
                velocidadObstaculos += 0.5;
            }
        }
        
        // === PASO 9: TERMINAR EL JUEGO ===
        function terminarJuego() {
            juegoActivo = false;
            clearInterval(intervaloObstaculos);
            
            // Mostrar pantalla de Game Over
            puntajeFinal.textContent = puntaje;
            gameOverScreen.style.display = 'flex';
        }
        
        // === PASO 10: REINICIAR EL JUEGO ===
        function reiniciarJuego() {
            // Limpiar obstáculos existentes
            document.querySelectorAll('.obstaculo').forEach(obs => obs.remove());
            
            // Reiniciar variables
            juegoActivo = true;
            puntaje = 0;
            velocidadObstaculos = 5;
            posicionJugador = 175;
            
            // Actualizar UI
            infoPuntaje.textContent = '0';
            gameOverScreen.style.display = 'none';
            jugador.style.left = posicionJugador + 'px';
            
            // Volver a generar obstáculos
            intervaloObstaculos = setInterval(crearObstaculo, 1000);
        }
        
        // === PASO 11: INICIAR EL JUEGO ===
        // Configurar el botón de reinicio
        botonReiniciar.addEventListener('click', reiniciarJuego);
        
        // Iniciar generación de obstáculos
        intervaloObstaculos = setInterval(crearObstaculo, 1000); // Nuevo obstáculo cada segundo
        
        // Posicionar al jugador al inicio
        jugador.style.left = posicionJugador + 'px';