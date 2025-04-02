// Función para que el jugador elija piedra, papel o tijera
function piedraPapelTijera(numeroJugador) {
    let resultado = "";
    while (resultado !== "piedra" && resultado !== "papel" && resultado !== "tijera") {
        // Asumimos que 'numeroJugador' es un parámetro que determina el jugador
        // Aquí se debería implementar algún método para capturar la elección del jugador, 
        // por ejemplo, a través de una entrada de usuario. 
        // Como no se tiene este detalle, dejaremos el resultado como un valor manual.
        resultado = prompt("Jugador " + numeroJugador + ", elige piedra, papel o tijera:").toLowerCase();
    }
    return resultado;
}

// Función para decidir el ganador
function decidirGanador(j1, j2) {
    let mensaje = "";
    
    // Condiciones de victoria
    if ((j1 === "piedra" && j2 === "tijera") || 
        (j1 === "tijera" && j2 === "papel") || 
        (j1 === "papel" && j2 === "piedra")) {
        mensaje = "Jugador 1 gana";
    } else if ((j2 === "piedra" && j1 === "tijera") || 
               (j2 === "tijera" && j1 === "papel") || 
               (j2 === "papel" && j1 === "piedra")) {
        mensaje = "Jugador 2 gana";
    } else {
        mensaje = "Ha sido empate";
    }
    
    return mensaje;
}

// Simulación del juego
function jugar() {
    // El jugador 1 y el jugador 2 eligen sus opciones
    let j1 = piedraPapelTijera(1);
    let j2 = piedraPapelTijera(2);

    // Mostrar los resultados y decidir el ganador
    console.log("Jugador 1 elige: " + j1);
    console.log("Jugador 2 elige: " + j2);

    // Decidir y mostrar el ganador
    let resultado = decidirGanador(j1, j2);
    console.log(resultado);
}

// Ejecutar el juego
jugar();
