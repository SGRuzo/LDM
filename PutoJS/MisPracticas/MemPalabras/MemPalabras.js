// ========== PASO 1: PREPARACIÓN ==========
        // Lista de palabras posibles para el juego
        const palabrasPosibles = [
            "Casa", "Perro", "Árbol", "Libro", "Sol", 
            "Agua", "Tiempo", "Luz", "Flor", "Nube",
            "Montaña", "Mar", "Viento", "Fuego", "Tierra"
        ];
        
        // Obtenemos los elementos del HTML que necesitaremos manipular
        const palabrasContainer = document.getElementById('palabras-container');
        const inputsContainer = document.getElementById('inputs-container');
        const botonComprobar = document.getElementById('comprobar');
        const resultadoDiv = document.getElementById('resultado');
        
        // Variables para almacenar las palabras del juego actual
        let palabrasAleatorias = [];
        let tiempoMostrandoPalabras;

        // ========== PASO 2: FUNCIÓN PARA INICIAR EL JUEGO ==========
        function iniciarJuego() {
            // Limpiamos contenedores de juegos anteriores
            palabrasContainer.innerHTML = '';
            inputsContainer.innerHTML = '';
            resultadoDiv.style.display = 'none';
            
            // Seleccionamos 5 palabras aleatorias sin repetir
            palabrasAleatorias = [];
            while (palabrasAleatorias.length < 5) {
                const palabraAleatoria = palabrasPosibles[Math.floor(Math.random() * palabrasPosibles.length)];
                if (!palabrasAleatorias.includes(palabraAleatoria)) {
                    palabrasAleatorias.push(palabraAleatoria);
                }
            }
            
            // Mostramos las palabras en pantalla
            palabrasAleatorias.forEach(palabra => {
                const elementoPalabra = document.createElement('div');
                elementoPalabra.className = 'palabra';
                elementoPalabra.textContent = palabra;
                palabrasContainer.appendChild(elementoPalabra);
            });
            
            // Ocultamos el contenedor de inputs (aún no es tiempo de escribir)
            inputsContainer.style.display = 'none';
            
            // Configuramos el temporizador para ocultar las palabras después de 10 segundos
            tiempoMostrandoPalabras = setTimeout(() => {
                palabrasContainer.style.display = 'none';
                mostrarInputs();
            }, 10000); // 10000 milisegundos = 10 segundos
        }

        // ========== PASO 3: FUNCIÓN PARA MOSTRAR LOS INPUTS ==========
        function mostrarInputs() {
            // Limpiamos cualquier input previo
            inputsContainer.innerHTML = '<h3>Escribe las palabras que recuerdes:</h3>';
            
            // Creamos 5 inputs (uno por cada palabra a recordar)
            for (let i = 0; i < 5; i++) {
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = `Palabra ${i + 1}`;
                inputsContainer.appendChild(input);
            }
            
            // Mostramos el contenedor de inputs
            inputsContainer.style.display = 'flex';
        }

        // ========== PASO 4: FUNCIÓN PARA COMPROBAR RESPUESTAS ==========
        function comprobarRespuestas() {
            // Obtenemos todos los inputs creados
            const inputs = inputsContainer.querySelectorAll('input');
            let aciertos = 0;
            const respuestasUsuario = [];
            
            // Recorremos cada input para verificar las respuestas
            inputs.forEach(input => {
                const respuesta = input.value.trim();
                if (respuesta !== '') {
                    respuestasUsuario.push(respuesta);
                    
                    // Verificamos si la respuesta está en las palabras originales
                    if (palabrasAleatorias.includes(respuesta)) {
                        aciertos++;
                    }
                }
            });
            
            // Mostramos el resultado al jugador
            resultadoDiv.innerHTML = `
                <p>Acertaste <strong>${aciertos}</strong> de <strong>${palabrasAleatorias.length}</strong> palabras.</p>
                <p>Palabras correctas: <strong>${palabrasAleatorias.join(', ')}</strong></p>
                <p>Tus respuestas: <strong>${respuestasUsuario.join(', ')}</strong></p>
            `;
            resultadoDiv.style.display = 'block';
            
            // Preparamos el juego para una nueva ronda
            palabrasContainer.style.display = 'flex';
            clearTimeout(tiempoMostrandoPalabras);
        }

        // ========== PASO 5: CONFIGURACIÓN DE EVENTOS ==========
        // Al hacer clic en el botón "Comprobar"
        botonComprobar.addEventListener('click', comprobarRespuestas);
        
        // También permitimos usar la tecla Enter para comprobar
        document.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                comprobarRespuestas();
            }
        });

        // ========== PASO 6: INICIAR EL JUEGO POR PRIMERA VEZ ==========
        iniciarJuego();
        
        // Opcional: Botón para reiniciar el juego
        const botonReiniciar = document.createElement('button');
        botonReiniciar.textContent = 'Jugar de nuevo';
        botonReiniciar.style.marginTop = '20px';
        botonReiniciar.addEventListener('click', iniciarJuego);
        document.querySelector('.contenedor').appendChild(botonReiniciar);