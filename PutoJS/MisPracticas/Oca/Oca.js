// ===== VARIABLES DEL JUEGO =====
let posicionJugador = 0; // Empieza en la casilla 0 (la 1 en el tablero)
let turno = 1;
let enPozo = false;
let turnosEnPozo = 0;
let turnosEnCarcel = 0;

// ===== DEFINICIÓN DE CASILLAS ESPECIALES =====
const casillasEspeciales = {
    // Ocas (de oca a oca y tiro porque me toca)
    5: { tipo: "oca", emoji: "🦢", mensaje: "¡De oca a oca y tiro porque me toca!", movimiento: "siguiente-oca" },
    9: { tipo: "oca", emoji: "🦢", mensaje: "¡De oca a oca y tiro porque me toca!", movimiento: "siguiente-oca" },
    14: { tipo: "oca", emoji: "🦢", mensaje: "¡De oca a oca y tiro porque me toca!", movimiento: "siguiente-oca" },
    18: { tipo: "oca", emoji: "🦢", mensaje: "¡De oca a oca y tiro porque me toca!", movimiento: "siguiente-oca" },
    23: { tipo: "oca", emoji: "🦢", mensaje: "¡De oca a oca y tiro porque me toca!", movimiento: "siguiente-oca" },
    27: { tipo: "oca", emoji: "🦢", mensaje: "¡De oca a oca y tiro porque me toca!", movimiento: "siguiente-oca" },
    32: { tipo: "oca", emoji: "🦢", mensaje: "¡De oca a oca y tiro porque me toca!", movimiento: "siguiente-oca" },
    36: { tipo: "oca", emoji: "🦢", mensaje: "¡De oca a oca y tiro porque me toca!", movimiento: "siguiente-oca" },
    41: { tipo: "oca", emoji: "🦢", mensaje: "¡De oca a oca y tiro porque me toca!", movimiento: "siguiente-oca" },
    45: { tipo: "oca", emoji: "🦢", mensaje: "¡De oca a oca y tiro porque me toca!", movimiento: "siguiente-oca" },
    50: { tipo: "oca", emoji: "🦢", mensaje: "¡De oca a oca y tiro porque me toca!", movimiento: "siguiente-oca" },
    54: { tipo: "oca", emoji: "🦢", mensaje: "¡De oca a oca y tiro porque me toca!", movimiento: "siguiente-oca" },
    59: { tipo: "oca", emoji: "🦢", mensaje: "¡De oca a oca y tiro porque me toca!", movimiento: "siguiente-oca" },
    
    // Puentes (del 6 al 12)
    6: { tipo: "puente", emoji: "🌉", mensaje: "¡Puente! Avanzas al otro puente", movimiento: 6 },
    12: { tipo: "puente", emoji: "🌉", mensaje: "¡Puente! Avanzas al otro puente", movimiento: -6 },
    
    // Posada (casilla 19)
    19: { tipo: "posada", emoji: "🏠", mensaje: "¡Posada! Pierdes 1 turno", pierdeTurno: 1 },
    
    // Pozo (casilla 31)
    31: { tipo: "pozo", emoji: "🕳️", mensaje: "¡Pozo! Quedas atrapado hasta que otro jugador caiga aquí", efecto: "pozo" },
    
    // Laberinto (casilla 42)
    42: { tipo: "laberinto", emoji: "🌀", mensaje: "¡Laberinto! Retrocedes a la casilla 30", movimiento: -12 },
    
    // Cárcel (casilla 52)
    52: { tipo: "carcel", emoji: "🔒", mensaje: "¡Cárcel! Pierdes 2 turnos", pierdeTurno: 2 },
    
    // Dados (casillas 26 y 53)
    26: { tipo: "dados", emoji: "🎲", mensaje: "¡Dados! Avanzas a la casilla 53", movimiento: 27 },
    53: { tipo: "dados", emoji: "🎲", mensaje: "¡Dados! Retrocedes a la casilla 26", movimiento: -27 },
    
    // Muerte (casilla 58)
    58: { tipo: "muerte", emoji: "💀", mensaje: "¡Muerte! Vuelves a empezar", movimiento: -57 },
    
    // Jardín de la Oca (casilla 63)
    62: { tipo: "jardin", emoji: "🏆", mensaje: "¡Has llegado al Jardín de la Oca! ¡Ganaste!" }
};

// ===== FUNCIÓN PARA CREAR EL TABLERO =====
function crearTablero() {
    const tablero = document.getElementById('tablero');
    tablero.innerHTML = '';
    
    // Creamos las 63 casillas (0 a 62 en el array)
    for (let i = 0; i < 63; i++) {
        const casilla = document.createElement('div');
        casilla.className = 'casilla';
        casilla.id = `casilla-${i}`;
        
        // Número de casilla (1-63)
        const numero = document.createElement('span');
        numero.textContent = i + 1;
        casilla.appendChild(numero);
        
        // Añadimos emojis a las casillas especiales
        if (casillasEspeciales[i]) {
            const emoji = document.createElement('span');
            emoji.textContent = casillasEspeciales[i].emoji;
            emoji.style.fontSize = '20px';
            casilla.appendChild(emoji);
            casilla.classList.add(casillasEspeciales[i].tipo);
        }
        
        tablero.appendChild(casilla);
    }
    
    // Colocamos al jugador en la casilla inicial
    document.getElementById('casilla-0').classList.add('con-ficha');
    actualizarPosicion();
}

// ===== FUNCIÓN PARA LANZAR EL DADO =====
function lanzarDado() {
    // Verificamos si el jugador está en el pozo
    if (enPozo) {
        document.getElementById('mensaje').textContent = "Estás en el pozo. Espera a que otro jugador caiga aquí.";
        turno++;
        actualizarTurno();
        return;
    }
    
    // Verificamos si está en la cárcel
    if (turnosEnCarcel > 0) {
        turnosEnCarcel--;
        document.getElementById('mensaje').textContent = `En la cárcel. Te quedan ${turnosEnCarcel} turnos sin jugar.`;
        turno++;
        actualizarTurno();
        return;
    }
    
    // Verificamos si ya ganó
    if (posicionJugador === 62) {
        document.getElementById('mensaje').textContent = "¡Ya has ganado! Recarga la página para jugar de nuevo.";
        return;
    }
    
    const dado = Math.floor(Math.random() * 6) + 1; // Número aleatorio del 1 al 6
    document.getElementById('dado').textContent = `🎲 ${dado}`;
    
    // Movemos al jugador
    moverJugador(dado);
}

// ===== FUNCIÓN PARA MOVER AL JUGADOR =====
function moverJugador(pasos) {
    // Quitamos la ficha de la posición actual
    document.getElementById(`casilla-${posicionJugador}`).classList.remove('con-ficha');
    
    // Calculamos nueva posición
    let nuevaPosicion = posicionJugador + pasos;
    
    // Verificamos si pasó la meta (debe caer exactamente en la 63)
    if (nuevaPosicion > 62) {
        const exceso = nuevaPosicion - 62;
        nuevaPosicion = 62 - exceso;
        document.getElementById('mensaje').textContent = `Te pasaste! Retrocedes ${exceso} casillas.`;
    }
    
    posicionJugador = nuevaPosicion;
    
    // Verificamos si cayó en casilla especial
    if (casillasEspeciales[posicionJugador]) {
        const efecto = casillasEspeciales[posicionJugador];
        document.getElementById('mensaje').textContent = efecto.mensaje;
        
        // Aplicamos efectos especiales
        if (efecto.movimiento === "siguiente-oca") {
            // Buscamos la siguiente oca
            for (let i = posicionJugador + 1; i < 63; i++) {
                if (casillasEspeciales[i] && casillasEspeciales[i].tipo === "oca") {
                    posicionJugador = i;
                    document.getElementById('mensaje').textContent += ` Avanzas a la casilla ${i + 1}`;
                    break;
                }
            }
        } else if (efecto.movimiento) {
            posicionJugador += efecto.movimiento;
        }
        
        // Efecto pozo
        if (efecto.efecto === "pozo") {
            enPozo = true;
            turnosEnPozo = 0;
        }
        
        // Efecto perder turnos
        if (efecto.pierdeTurno) {
            if (efecto.pierdeTurno === 2) {
                turnosEnCarcel = 2;
            } else {
                // Para la posada (1 turno)
                document.getElementById('mensaje').textContent += " No juegas el próximo turno.";
            }
        }
        
        // Aseguramos que no salga del tablero
        if (posicionJugador < 0) posicionJugador = 0;
        if (posicionJugador > 62) posicionJugador = 62;
    } else {
        document.getElementById('mensaje').textContent = `Avanzas ${pasos} casillas. Ahora estás en la ${posicionJugador + 1}.`;
    }
    
    // Verificamos si ganó
    if (posicionJugador === 62) {
        document.getElementById('mensaje').textContent = "¡Felicidades! ¡Has llegado al Jardín de la Oca y ganaste el juego!";
    }
    
    // Colocamos la ficha en la nueva posición
    document.getElementById(`casilla-${posicionJugador}`).classList.add('con-ficha');
    turno++;
    
    // Actualizamos la interfaz
    actualizarTurno();
    actualizarPosicion();
}

// ===== FUNCIONES AUXILIARES =====
function actualizarTurno() {
    document.getElementById('contadorTurnos').textContent = turno;
}

function actualizarPosicion() {
    document.getElementById('posicionActual').textContent = posicionJugador + 1;
}

// ===== INICIALIZAMOS EL JUEGO =====
crearTablero();
document.getElementById('lanzarDado').addEventListener('click', lanzarDado);