const palos = ["Oros", "Copas", "Espadas", "Bastos"];
let barajaEspañola = [];
let mano = [];

// Crear la baraja española
for (let palo of palos) {
    for (let numero = 1; numero <= 10; numero++) {
        if (numero === 1) {
            barajaEspañola.push(["As", palo]);
        } else if (numero === 8) {
            barajaEspañola.push(["Sota", palo]);
        } else if (numero === 9) {
            barajaEspañola.push(["Caballo", palo]);
        } else if (numero === 10) {
            barajaEspañola.push(["Rey", palo]);
        } else {
            barajaEspañola.push([String(numero), palo]);
        }
    }
}

// Ordenar de manera aleatoria (Barajar)
function barajar(baraja) {
    baraja.sort(() => Math.random() - 0.5);
}

// Función robar que añade la primera carta al principio de la mano
function robar(baraja, mano) {
    mano.unshift(baraja[0]);
    baraja.shift();
}

// Función robarAleatoria que simula robar una carta aleatoria
function robarAleatoria(baraja, mano) {
    let cartaSeleccionada = Math.floor(Math.random() * baraja.length);
    mano.unshift(baraja[cartaSeleccionada]);
    baraja.splice(cartaSeleccionada, 1);
    
    
    
    // A MACHETE
    let indiceEliminar=1
    for(let i=0;i<baraja.length;i++){
        if (baraja[i][0]===cartaSeleccionada[0]&&baraja[i][1]===cartaSeleccionada[i]){
            indiceEliminar=i
        }
    }
    baraja=baraja.splice[indiceELiminar]
}

// Barajar la baraja antes de robar
barajar(barajaEspañola);

// Simulamos el robo de cartas
robarAleatoria(barajaEspañola, mano);
robar(barajaEspañola,mano)
robar(barajaEspañola, mano);

// Mostramos el mazo restante y la mano
console.log("Mazo restante: ", barajaEspañola);
console.log("Mano: ", mano);
