// ===== PASO 1: PREPARACIÓN DEL JUEGO =====
        
        // Emojis que usaremos para las parejas de cartas
        const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
        
        // Variables para controlar el estado del juego
        let cartasVolteadas = []; // Guarda las cartas que están volteadas
        let parejasEncontradas = 0; // Cuenta cuántas parejas se han encontrado
        let intentos = 0; // Cuenta cuántos intentos ha hecho el jugador
        let bloqueo = false; // Evita que se vuelvan a voltear cartas mientras se comprueba una pareja
        
        // Obtenemos los elementos del HTML que necesitamos
        const tablero = document.getElementById('tablero');
        const contador = document.getElementById('contador');
        const botonReiniciar = document.getElementById('reiniciar');
        
        // ===== PASO 2: CREAR LAS CARTAS DEL JUEGO =====
        
        // Función para iniciar el juego
        function iniciarJuego() {
            // Limpiamos el tablero y reiniciamos variables
            tablero.innerHTML = '';
            cartasVolteadas = [];
            parejasEncontradas = 0;
            intentos = 0;
            contador.textContent = 'Intentos: 0';
            
            // Duplicamos los emojis para tener parejas
            let emojisMezclados = [...emojis, ...emojis];
            
            // Mezclamos los emojis para que estén en orden aleatorio
            emojisMezclados = emojisMezclados.sort(() => Math.random() - 0.5);
            
            // Creamos las cartas en el tablero
            emojisMezclados.forEach((emoji, index) => {
                const carta = document.createElement('div');
                carta.className = 'carta';
                carta.dataset.emoji = emoji; // Guardamos el emoji en un atributo data
                carta.dataset.indice = index; // Guardamos el índice para identificarla
                
                // Añadimos evento click a cada carta
                carta.addEventListener('click', voltearCarta);
                
                // Añadimos la carta al tablero
                tablero.appendChild(carta);
            });
        }
        
        // ===== PASO 3: VOLTEAR LAS CARTAS =====
        
        function voltearCarta() {
            // Si el juego está bloqueado o la carta ya está volteada/encontrada, no hacemos nada
            if (bloqueo || this.classList.contains('volteada') || this.classList.contains('encontrada')) {
                return;
            }
            
            // Volteamos la carta (mostramos el emoji)
            this.textContent = this.dataset.emoji;
            this.classList.add('volteada');
            
            // Añadimos la carta a las cartas volteadas
            cartasVolteadas.push(this);
            
            // Si tenemos 2 cartas volteadas, comprobamos si son pareja
            if (cartasVolteadas.length === 2) {
                intentos++;
                contador.textContent = `Intentos: ${intentos}`;
                comprobarPareja();
            }
        }
        
        // ===== PASO 4: COMPROBAR SI LAS CARTAS SON PAREJA =====
        
        function comprobarPareja() {
            bloqueo = true; // Bloqueamos el juego mientras se comprueba
            
            const [carta1, carta2] = cartasVolteadas;
            
            // Comparamos los emojis de las dos cartas
            if (carta1.dataset.emoji === carta2.dataset.emoji) {
                // Son pareja - las marcamos como encontradas
                carta1.classList.add('encontrada');
                carta2.classList.add('encontrada');
                parejasEncontradas++;
                
                // Vaciamos el array de cartas volteadas
                cartasVolteadas = [];
                bloqueo = false;
                
                // Comprobamos si se han encontrado todas las parejas
                if (parejasEncontradas === emojis.length) {
                    setTimeout(() => {
                        alert(`¡Ganaste! Intentos: ${intentos}`);
                    }, 500);
                }
            } else {
                // No son pareja - las volteamos de nuevo después de 1 segundo
                setTimeout(() => {
                    carta1.textContent = '';
                    carta2.textContent = '';
                    carta1.classList.remove('volteada');
                    carta2.classList.remove('volteada');
                    cartasVolteadas = [];
                    bloqueo = false;
                }, 1000);
            }
        }
        
        // ===== PASO 5: REINICIAR EL JUEGO =====
        
        // Añadimos evento al botón de reiniciar
        botonReiniciar.addEventListener('click', iniciarJuego);
        
        // Iniciamos el juego al cargar la página
        iniciarJuego();