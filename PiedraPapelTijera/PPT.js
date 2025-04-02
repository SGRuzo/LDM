  // Definimos las jugadas
  const opciones = ["Piedra", "Papel", "Tijera"];
  let turno = 0; // 0 para jugador 1, 1 para jugador 2
  let jugador1 = null;
  let jugador2 = null;

  // Función para jugar
  function jugada(opcion) {
      if (turno === 0) {
          // Jugador 1 elige
          jugador1 = opcion;
          turno = 1; // Cambio al siguiente turno
      } else if (turno === 1) {
          // Jugador 2 elige
          jugador2 = opcion;
          document.getElementById("result").innerHTML = "Jugador 1 eligió: " + opciones[jugador1] + "<br>Jugador 2 eligió: " + opciones[jugador2];

          // Compara los resultados
          let ganador = determinarGanador(jugador1, jugador2);
          if (ganador === 0) {
              document.getElementById("result").innerHTML += "<br>¡Empate! Se repite la jugada.";
              turno = 0; // Empate, volvemos a comenzar
              jugador1 = null;
              jugador2 = null;
          } else {
              document.getElementById("result").innerHTML += `<br>¡Felicidades Jugador ${ganador}! Eres el ganador.`;
              turno = 0; // Fin del juego
              jugador1 = null;
              jugador2 = null;
          }
      }
  }

  // Función para determinar el ganador
  function determinarGanador(jugador1, jugador2) {
      if (jugador1 === jugador2) {
          return 0; // Empate
      }
      // Lógica de Piedra, Papel o Tijera
      if ((jugador1 === 0 && jugador2 === 2) || (jugador1 === 1 && jugador2 === 0) || (jugador1 === 2 && jugador2 === 1)) {
          return 1; // Gana jugador 1
      } else {
          return 2; // Gana jugador 2
      }
  }