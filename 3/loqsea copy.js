fetch('https://pokeapi.co/api/v2/pokemon/')
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