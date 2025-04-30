
let recursos = {
    click: 0
}

const contador = document.getElementById('contador')
const comments = document.getElementById('comentarios');
const btnClick = document.getElementById('btnClick')
const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')

function actualizarContadores() {
    // Actualizamos los números en pantalla
    contador.textContent = recursos.click;
}


btnClick.addEventListener('click', function () {
    recursos.click += recursos.x // Añadimos 1 de click
    actualizarContadores() // Actualizamos la pantalla
    comments.innerHTML = ''
});

btn1.addEventListener('click', function () {
    if (recursos.click >= 100) { // Si hay suficcientes recursos
        recursos.click -= 100 // Eliminamos 100 del contador
        actualizarContadores() // Actualizamos la pantalla
        comments.innerHTML = ''

    } else {
        comments.innerHTML = 'No tienes suficientes recursos para +1, llega a 100.<br>';
    }
    
});

btn2.addEventListener('click', function () {
    if (recursos.click >= 1000) { // Si hay suficcientes recursos
        recursos.click -= 1000 // Eliminamos 1000 del contador
        recursos.x *= 2;
        actualizarContadores() // Actualizamos la pantalla
        comments.innerHTML = ''

    } else {
        comments.innerHTML = 'No tienes suficientes recursos para +1, llega a 1000.<br>';
    }
});

actualizarContadores()