// ==============================================
        // PASO 1: VARIABLES DEL JUEGO - Aquí guardamos los recursos
        // ==============================================
        let recursos = {
            madera: 0,
            piedra: 0,
            comida: 0
        };

        // ==============================================
        // PASO 2: OBTENER ELEMENTOS DEL HTML - Conectamos JS con HTML
        // ==============================================
        // Contadores visuales
        const contadorMadera = document.getElementById('contadorMadera');
        const contadorPiedra = document.getElementById('contadorPiedra');
        const contadorComida = document.getElementById('contadorComida');
        
        // Botones
        const btnMadera = document.getElementById('btnMadera');
        const btnPiedra = document.getElementById('btnPiedra');
        const btnComida = document.getElementById('btnComida');
        
        // Área de construcciones
        const areaConstrucciones = document.getElementById('construcciones');

        // ==============================================
        // PASO 3: FUNCIÓN PARA ACTUALIZAR LOS CONTADORES
        // ==============================================
        function actualizarContadores() {
            // Actualizamos los números en pantalla
            contadorMadera.textContent = recursos.madera;
            contadorPiedra.textContent = recursos.piedra;
            contadorComida.textContent = recursos.comida;
            
            // Llamamos a la función que verifica construcciones
            verificarConstrucciones();
        }

        // ==============================================
        // PASO 4: FUNCIÓN PARA VERIFICAR QUÉ SE PUEDE CONSTRUIR
        // ==============================================
        function verificarConstrucciones() {
            let mensaje = "";
            
            // Verificamos si tenemos recursos para una cabaña
            if (recursos.madera >= 5 && recursos.piedra >= 3) {
                mensaje += "¡Puedes construir una CABAÑA! 🏠<br>";
            }
            
            // Verificamos si tenemos recursos para un horno
            if (recursos.piedra >= 8) {
                mensaje += "¡Puedes construir un HORNO! 🏭<br>";
            }
            
            // Verificamos si tenemos recursos para una granja
            if (recursos.madera >= 3 && recursos.comida >= 10) {
                mensaje += "¡Puedes construir una GRANJA! 🌾<br>";
            }
            
            // Si no hay construcciones disponibles
            if (mensaje === "") {
                mensaje = "Sigue recolectando recursos para construir cosas";
            }
            
            // Mostramos el mensaje en el HTML
            areaConstrucciones.innerHTML = mensaje;
        }

        // ==============================================
        // PASO 5: EVENTOS DE LOS BOTONES - Qué pasa al hacer clic
        // ==============================================
        btnMadera.addEventListener('click', function() {
            recursos.madera += 1; // Añadimos 1 de madera
            actualizarContadores(); // Actualizamos la pantalla
        });
        
        btnPiedra.addEventListener('click', function() {
            recursos.piedra += 1; // Añadimos 1 de piedra
            actualizarContadores(); // Actualizamos la pantalla
        });
        
        btnComida.addEventListener('click', function() {
            recursos.comida += 1; // Añadimos 1 de comida
            actualizarContadores(); // Actualizamos la pantalla
        });

        // ==============================================
        // PASO 6: INICIALIZAR EL JUEGO - Mostrar valores iniciales
        // ==============================================
        actualizarContadores();