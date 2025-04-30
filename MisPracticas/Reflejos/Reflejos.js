 // ========== PASO 1: OBTENER ELEMENTOS DEL DOM ==========
        // Seleccionamos el botón y el área de mensajes del HTML
        const boton = document.getElementById('botonReflejos');
        const mensaje = document.getElementById('mensaje');
        
        // Variables para controlar el estado del juego
        let esperandoClick = false; // ¿Estamos esperando que el usuario haga clic?
        let tiempoInicio = 0; // Guardará el momento en que el botón se ponga verde
        let timeoutId = null; // Guarda la referencia al temporizador

        // ========== PASO 2: FUNCIÓN PARA INICIAR EL JUEGO ==========
        function iniciarJuego() {
            // Configuración inicial
            boton.style.backgroundColor = 'red';
            boton.textContent = 'Espera...';
            mensaje.textContent = '';
            esperandoClick = false;
            
            // Si había un temporizador pendiente, lo cancelamos
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            
            // Generamos un tiempo aleatorio entre 2 y 6 segundos (2000-6000 milisegundos)
            const tiempoAleatorio = Math.random() * 4000 + 2000;
            
            // Programamos el cambio a verde para después del tiempo aleatorio
            timeoutId = setTimeout(cambiarAVerde, tiempoAleatorio);
        }

        // ========== PASO 3: FUNCIÓN CUANDO EL BOTÓN SE PONE VERDE ==========
        function cambiarAVerde() {
            boton.style.backgroundColor = 'green';
            boton.textContent = '¡Ahora!';
            tiempoInicio = Date.now(); // Guardamos el momento exacto en que se puso verde
            esperandoClick = true; // Ahora sí permitimos clics válidos
        }

        // ========== PASO 4: MANEJAR CLICS DEL USUARIO ==========
        boton.addEventListener('click', function() {
            if (!esperandoClick) {
                // El usuario hizo clic demasiado pronto
                mensaje.textContent = 'Muy rápido ¡No hagas trampa!';
                mensaje.style.color = 'red';
                iniciarJuego(); // Reiniciamos el juego
            } else {
                // El usuario hizo clic en el momento correcto
                const tiempoReaccion = Date.now() - tiempoInicio; // Calculamos el tiempo de reacción
                mensaje.textContent = `¡Bien! Tiempo de reacción: ${tiempoReaccion} ms`;
                mensaje.style.color = 'green';
                iniciarJuego(); // Reiniciamos para otra ronda
            }
        });

        // ========== PASO 5: INICIAR EL JUEGO POR PRIMERA VEZ ==========
        iniciarJuego();