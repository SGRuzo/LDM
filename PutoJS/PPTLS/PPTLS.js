
    // Elementos del HTML
    const opcionesJugador1 = document.querySelectorAll('#jugador1 .opciones img');
    const opcionesJugador2 = document.querySelectorAll('#jugador2 .opciones img');
    const seleccion1 = document.getElementById('seleccion1');
    const seleccion2 = document.getElementById('seleccion2');
    const botonJugar = document.getElementById('botonJugar');
    const textoResultado = document.getElementById('textoResultado');
    const explicacion = document.getElementById('explicacion');
    
    // Variables del juego
    let seleccionJugador1 = null;
    let seleccionJugador2 = null;
    
    // Reglas del juego (qué le gana a qué)
    const reglas = {
        pedra: { gana: ['tesoiras', 'lagarto'], texto: 'Piedra aplasta tijeras y decapita lagarto' },
        papel: { gana: ['pedra', 'spock'], texto: 'Papel cubre piedra y desautoriza Spock' },
        tesoiras: { gana: ['papel', 'lagarto'], texto: 'Tijeras cortan papel y decapitan lagarto' },
        lagarto: { gana: ['papel', 'spock'], texto: 'Lagarto come papel y envenena Spock' },
        spock: { gana: ['pedra', 'tesoiras'], texto: 'Spock vaporiza piedra y rompe tijeras' }
    };
    
    // Nombres para mostrar
    const nombres = {
        pedra: 'Piedra',
        papel: 'Papel',
        tesoiras: 'Tijeras',
        lagarto: 'Lagarto',
        spock: 'Spock'
    };
    
    // Selección de opciones para jugador 1
    opcionesJugador1.forEach(opcion => {
        opcion.addEventListener('click', function() {
            // Quitar selección anterior
            opcionesJugador1.forEach(img => img.classList.remove('seleccionada'));
            
            // Marcar nueva selección
            this.classList.add('seleccionada');
            seleccionJugador1 = this.dataset.opcion;
            seleccion1.textContent = nombres[seleccionJugador1];
            
            // Habilitar botón si ambos tienen selección
            verificarSelecciones();
        });
    });
    
    // Selección de opciones para jugador 2
    opcionesJugador2.forEach(opcion => {
        opcion.addEventListener('click', function() {
            // Quitar selección anterior
            opcionesJugador2.forEach(img => img.classList.remove('seleccionada'));
            
            // Marcar nueva selección
            this.classList.add('seleccionada');
            seleccionJugador2 = this.dataset.opcion;
            seleccion2.textContent = nombres[seleccionJugador2];
            
            // Habilitar botón si ambos tienen selección
            verificarSelecciones();
        });
    });
    
    // Verificar si ambos jugadores han seleccionado
    function verificarSelecciones() {
        if (seleccionJugador1 && seleccionJugador2) {
            botonJugar.disabled = false;
        } else {
            botonJugar.disabled = true;
        }
    }
    
    // Botón de jugar
    botonJugar.addEventListener('click', function() {
        const resultado = determinarGanador(seleccionJugador1, seleccionJugador2);
        
        // Mostrar resultado
        if (resultado === 'empate') {
            textoResultado.textContent = '¡Empate!';
            explicacion.textContent = `Ambos eligieron ${nombres[seleccionJugador1]}`;
        } else if (resultado === 'jugador1') {
            textoResultado.textContent = '¡Jugador 1 gana!';
            explicacion.textContent = reglas[seleccionJugador1].texto;
        } else {
            textoResultado.textContent = '¡Jugador 2 gana!';
            explicacion.textContent = reglas[seleccionJugador2].texto;
        }
    });
    
    // Función para determinar el ganador
    function determinarGanador(opcion1, opcion2) {
        if (opcion1 === opcion2) {
            return 'empate';
        }
        
        if (reglas[opcion1].gana.includes(opcion2)) {
            return 'jugador1';
        } else {
            return 'jugador2';
        }
    }
