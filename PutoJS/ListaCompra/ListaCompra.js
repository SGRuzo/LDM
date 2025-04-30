// Esperamos a que el DOM (la estructura de la página) esté completamente cargado
// antes de ejecutar nuestro código JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // PASO 1: Obtenemos referencias a los elementos HTML que necesitaremos
    // Input donde el usuario escribe nuevos ítems
    const inputNuevoItem = document.getElementById('nuevoItem');
    // Botón para agregar ítems a la lista
    const botonAgregar = document.getElementById('botonAgregar');
    // Botón para limpiar toda la lista
    const botonLimpiar = document.getElementById('botonLimpiar');
    // Elemento <ul> o <ol> que contendrá nuestra lista de compras
    const listaCompra = document.getElementById('listaCompra');

    // PASO 2: Definimos la función para añadir un nuevo ítem a la lista
    function agregarItem() {
        // Obtenemos el texto del input y eliminamos espacios en blanco al inicio/final
        const textoItem = inputNuevoItem.value.trim();
        
        // Validación: Si el texto está vacío después de trim()
        if (textoItem === '') {
            // Mostramos una alerta al usuario
            alert('Por favor, escribe un producto');
            // Salimos de la función sin hacer nada más
            return;
        }
        
        // Creamos un nuevo elemento <li> para la lista
        const nuevoItem = document.createElement('li');
        // Asignamos el texto del input como contenido del nuevo ítem
        nuevoItem.textContent = textoItem;
        // Añadimos el nuevo ítem como hijo de la lista de compras
        listaCompra.appendChild(nuevoItem);
        
        // Limpiamos el input para prepararlo para un nuevo ítem
        inputNuevoItem.value = '';
        // Ponemos el foco nuevamente en el input para facilitar la escritura
        inputNuevoItem.focus();
    }

    // PASO 3: Definimos la función para limpiar toda la lista
    function limpiarLista() {
        // Vaciamos todo el contenido HTML de la lista (todos los <li>)
        listaCompra.innerHTML = '';
    }

    // PASO 4: Configuramos los event listeners (escuchadores de eventos)
    
    // Cuando se hace click en el botón "Agregar", ejecuta la función agregarItem()
    botonAgregar.addEventListener('click', agregarItem);
    
    // Cuando se hace click en el botón "Limpiar", ejecuta la función limpiarLista()
    botonLimpiar.addEventListener('click', limpiarLista);

    // PASO 5: Mejoramos la usabilidad - Permitir añadir con la tecla Enter
    inputNuevoItem.addEventListener('keypress', function(e) {
        // Verificamos si la tecla presionada fue Enter (código 13)
        if (e.key === 'Enter') {
            // Si es Enter, llamamos a la función agregarItem()
            agregarItem();
        }
    });

    // PASO 6: Mejoramos la experiencia de usuario
    // Al cargar la página, el cursor ya está en el input para escribir
    inputNuevoItem.focus();
});