let steel = document.querySelector("#steel");
let water = document.querySelector("#water");
let bug = document.querySelector("#bug");
let dragon = document.querySelector("#dragon");
let electric = document.querySelector("#electric");
let ghost = document.querySelector("#ghost");
let fire = document.querySelector("#fire");
let fairy = document.querySelector("#fairy");
let ice = document.querySelector("#ice");
let fighting = document.querySelector("#fighting");
let normal = document.querySelector("#normal");
let grass = document.querySelector("#grass");
let psychic = document.querySelector("#psychic");
let rock = document.querySelector("#rock");
let dark = document.querySelector("#dark");
let ground = document.querySelector("#ground");
let poison = document.querySelector("#poison");
let flying = document.querySelector("#flying");

let boton = document.querySelector("#boton");

let tipos = [steel, water, bug, dragon, electric, ghost, fire, fairy, ice, fighting, normal, grass, psychic, rock, dark, ground, poison, flying];

boton.addEventListener("click", generarPokemon);

function generarPokemon() {
    let tiposeleccionado = "";

    for (let tipo of tipos) {
        if (tipo.checked) {
            tiposeleccionado = tipo.value;
            break; // Ya lo encontramos, no seguimos buscando
        }
    }

    console.log("Tipo seleccionado: " + tiposeleccionado);

    if (tiposeleccionado === "") {
        console.log("No se ha seleccionado ningún tipo.");
        return;
    }

    fetch(`https://pokeapi.co/api/v2/type/${tiposeleccionado}/`)
    .then (respuestaCorrecta)
    .catch(respuestaIncorrecta)
    
    function respuestaCorrecta(respuesta){
        respuesta.json().then(imprimeData)
    }
    
    function respuestaIncorrecta(){
        console.log("Mala noticia mi gente")
    }
    
    function imprimeData(){
        console.log(data)
    }
}