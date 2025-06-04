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
const pokemonImagen = document.getElementById('pokemon-imagen');
const pokemonNombre = document.querySelector('h1');
const pokemonHeight = document.getElementById('pokemon-height');
const pokemonWeight = document.getElementById('pokemon-weight');
const pokemonTipo = document.getElementById('pokemon-tipo');
const pokemonHabilidades = document.getElementById('pokemon-habilidades');
const resultado = document.getElementById('resultado');
let tipos = [steel, water, bug, dragon, electric, ghost, fire, fairy, ice, fighting, normal, grass, psychic, rock, dark, ground, poison, flying];


boton.addEventListener("click", generarPokemon);

function generarPokemon() {
    let tiposeleccionado = "";

    for (let tipo of tipos) {
        if (tipo.checked) {
            tiposeleccionado = tipo.value;
            break; 
        }
    }

    console.log("Tipo seleccionado: " + tiposeleccionado);

    if (tiposeleccionado === "") {
        resultado.textContent ="No se ha seleccionado ningún tipo.";
        return;
    }

    fetch(`https://pokeapi.co/api/v2/type/${tiposeleccionado}/`)
    .then(seleccionPokemon)
    .catch(respuestaIncorrecta);

    function seleccionPokemon(respuesta) {
        return respuesta.json().then(function(data) {
            let listaPokemon = data.pokemon;
            let indiceAleatorio = Math.floor(Math.random() * listaPokemon.length);
            let pokemonSeleccionado = listaPokemon[indiceAleatorio].pokemon;
            
            // Aquí hacemos la segunda petición para obtener los detalles del Pokémon
            return fetch(pokemonSeleccionado.url);
        })
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(mostrarPokemon)
        .catch(respuestaIncorrecta);
    }

    function respuestaIncorrecta(error) {
        console.error("Error:", error);
        resultado.textContent = "Ocurrió un error al obtener los datos del Pokémon";
    }
}

function mostrarPokemon(pokemonData) {
    // Mostrar información del Pokémon
    pokemonNombre.textContent = pokemonData.name; // Cambiado de 'nombre' a 'name'
    pokemonImagen.src = pokemonData.sprites.front_default || 'placeholder.png';
    pokemonHeight.textContent = (pokemonData.height / 10) + " m"; // Convertir a metros
    pokemonWeight.textContent = (pokemonData.weight / 10) + " kg"; // Convertir a kg  
    
    // Mostrar tipos
    let tiposPokemon = pokemonData.types.map(function(tipo) {
        return tipo.type.name; // Cambiado de 'nombre' a 'name'
    });
    pokemonTipo.textContent = tiposPokemon.join(', ');
    
    // Mostrar habilidades
    let habilidadesPokemon = pokemonData.abilities.map(function(habilidad) {
        return habilidad.ability.name; // Cambiado de 'nombre' a 'name'
    });
    pokemonHabilidades.textContent = habilidadesPokemon.join(', ');
    
    resultado.textContent = ""; // Limpiar mensajes de error
}



function obtenerColorTipo(tipo) {
            const colores = {
                'acero': '#B8B8D0',
                'agua': '#6890F0',
                'bicho': '#A8B820',
                'dragón': '#7038F8',
                'eléctrico': '#F8D030',
                'fantasma': '#705898',
                'fuego': '#F08030',
                'hada': '#EE99AC',
                'hielo': '#98D8D8',
                'lucha': '#C03028',
                'normal': '#A8A878',
                'planta': '#78C850',
                'psíquico': '#F85888',
                'roca': '#B8A038',
                'siniestro': '#705848',
                'tierra': '#E0C068',
                'veneno': '#A040A0',
                'volador': '#A890F0'
            };
            
            return colores[tipo] || '#777777';
        }
