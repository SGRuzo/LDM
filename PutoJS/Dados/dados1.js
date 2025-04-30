// Paso 1: Obtener elementos del HTML
const btnLanzar = document.getElementById('btnLanzar');
const numeroDadosInput = document.getElementById('numeroDados');
const areaDados = document.getElementById('areaDados');
const resultadoSuma = document.getElementById('resultadoSuma');




// Paso 2: Función para crear un dado en el HTML
function crearDado() {
    // Creamos el contenedor del dado
    const dado = document.createElement('div');
    dado.className = 'dado';
    
    // Creamos las 6 caras del dado con sus clases correspondientes
    const caras = [
        {nombre: 'frente', clase: 'frente'},
        {nombre: 'atras', clase: 'atras'},
        {nombre: 'arriba', clase: 'arriba'},
        {nombre: 'abajo', clase: 'abajo'},
        {nombre: 'derecha', clase: 'derecha'},
        {nombre: 'izquierda', clase: 'izquierda'}
    ];
    
    // Añadimos cada cara al dado
    caras.forEach(cara => {
        const caraElemento = document.createElement('div');
        caraElemento.className = `cara ${cara.clase}`;
        dado.appendChild(caraElemento);
    });
    
    return dado;
}

// Paso 3: Función para obtener un número aleatorio entre 1 y 6
function obtenerNumeroAleatorio() {
    return Math.floor(Math.random() * 6) + 1;
}

// Paso 4: Función para girar el dado y mostrar un resultado específico
function girarDado(dado, resultado) {
    // Aplicamos la animación de giro
    dado.style.animation = 'girando 2s';
    
    // Después de la animación, mostramos el resultado
    setTimeout(() => {
        // Eliminamos la animación
        dado.style.animation = 'none';
        
        // Rotamos el dado según el resultado obtenido
        switch(resultado) {
            case 1:
                dado.style.transform = 'rotateX(0deg) rotateY(0deg)';
                break;
            case 2:
                dado.style.transform = 'rotateX(-90deg) rotateY(0deg)';
                break;
            case 3:
                dado.style.transform = 'rotateX(0deg) rotateY(90deg)';
                break;
            case 4:
                dado.style.transform = 'rotateX(0deg) rotateY(-90deg)';
                break;
            case 5:
                dado.style.transform = 'rotateX(90deg) rotateY(0deg)';
                break;
            case 6:
                dado.style.transform = 'rotateX(180deg) rotateY(0deg)';
                break;
        }
    }, 2000);
    
    return resultado;
}

// Paso 5: Función principal que se ejecuta al hacer clic en el botón
function lanzarDados() {
    // Obtenemos el número de dados que quiere el usuario
    const numeroDados = parseInt(numeroDadosInput.value);
    
    // Validamos que el número esté entre 1 y 10
    if (numeroDados < 1 || numeroDados > 10 || isNaN(numeroDados)) {
        alert('Por favor, introduce un número entre 1 y 10');
        return;
    }
    
    // Limpiamos el área de dados y el resultado anterior
    areaDados.innerHTML = '';
    resultadoSuma.textContent = 'Suma: 0';
    
    // Variable para acumular la suma de todos los dados
    let sumaTotal = 0;
    
    // Creamos y lanzamos cada dado
    for (let i = 0; i < numeroDados; i++) {
        // Creamos un nuevo dado
        const dado = crearDado();
        areaDados.appendChild(dado);
        
        // Obtenemos un número aleatorio para este dado
        const resultado = obtenerNumeroAleatorio();
        
        // Giramos el dado después de un pequeño retraso para que no todos giren a la vez
        setTimeout(() => {
            girarDado(dado, resultado);
            
            // Actualizamos la suma después de que termine la animación
            setTimeout(() => {
                sumaTotal += resultado;
                resultadoSuma.textContent = `Suma: ${sumaTotal}`;
            }, 2000);
        }, i * 200); // Pequeño retraso entre cada dado
    }
}

// Paso 6: Añadir el evento click al botón
btnLanzar.addEventListener('click', lanzarDados);