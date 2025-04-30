// =================================================================
        // PASO 1: DEFINIR TODOS LOS INGREDIENTES DISPONIBLES
        // =================================================================
        const todosIngredientes = [
            '🐛 Gusano', '🧀 Queso podrido', '🥓 Bacon rancio', 
            '🍌 Plátano negro', '🥛 Leche agria', '🍞 Pan mohoso',
            '🍕 Pizza fría de 5 días', '🍫 Chocolate derretido y viejo',
            '🍗 Pollo medio crudo', '🍣 Sushi pasado', '🥚 Huevo podrido',
            '🍅 Tomate fermentado', '🦠 Bacteria', '🕷️ Araña'
        ];

        // =================================================================
        // PASO 2: DEFINIR LAS RECETAS POSIBLES
        // =================================================================
        const recetas = {
            '🐛 Gusano+🧀 Queso podrido': {
                nombre: '🐛 Gusano en Queso Podrido',
                imagen: 'https://ejemplo.com/gusano-queso.jpg',
                descripcion: '¡Delicioso gusano bañado en queso fermentado! 🤢'
            },
            '🍞 Pan mohoso+🧀 Queso podrido+🥓 Bacon rancio': {
                nombre: '🍞 Sándwich de Queso y Bacon Rancio',
                imagen: 'https://ejemplo.com/sandwich-rancio.jpg',
                descripcion: 'Pan mohoso con queso azul y bacon de 3 semanas. ¡Ñam! 🤮'
            },
            '🍌 Plátano negro+🍕 Pizza fría de 5 días': {
                nombre: '🍌 Pizza con Plátano Podrido',
                imagen: 'https://ejemplo.com/pizza-platano.jpg',
                descripcion: 'La combinación que nadie pidió pero todos temen. 🤮'
            },
            '🍫 Chocolate derretido y viejo+🍗 Pollo medio crudo': {
                nombre: '🍫 Pollo con Chocolate Rancio',
                imagen: 'https://ejemplo.com/pollo-chocolate.jpg',
                descripcion: 'Porque el dulce y salado no siempre funciona. 🤢'
            }
        };

        // =================================================================
        // PASO 3: OBTENER ELEMENTOS DEL DOM Y VARIABLES DEL JUEGO
        // =================================================================
        const opcion1 = document.getElementById('opcion1');
        const opcion2 = document.getElementById('opcion2');
        const ingredientesSeleccionados = document.getElementById('ingredientesSeleccionados');
        const recetaResultado = document.getElementById('recetaResultado');
        const nombreReceta = document.getElementById('nombreReceta');
        const imagenReceta = document.getElementById('imagenReceta');
        const descripcionReceta = document.getElementById('descripcionReceta');
        const btnReiniciar = document.getElementById('btnReiniciar');

        let ingredientesActuales = [];
        let ingredientesElegidos = [];
        let ingredientesUsadosEnRonda = [];

        // =================================================================
        // PASO 4: FUNCIÓN PARA MOSTRAR NUEVAS OPCIONES DE INGREDIENTES
        // =================================================================
        function mostrarOpciones() {
            // Filtramos ingredientes que no se hayan usado en esta ronda
            const ingredientesDisponibles = todosIngredientes.filter(
                ingrediente => !ingredientesUsadosEnRonda.includes(ingrediente)
            );

            // Si no hay suficientes ingredientes, reiniciamos los usados
            if (ingredientesDisponibles.length < 2) {
                ingredientesUsadosEnRonda = [];
                return mostrarOpciones();
            }

            // Seleccionamos 2 ingredientes aleatorios diferentes
            let ingredienteA, ingredienteB;
            
            do {
                ingredienteA = ingredientesDisponibles[Math.floor(Math.random() * ingredientesDisponibles.length)];
                ingredienteB = ingredientesDisponibles[Math.floor(Math.random() * ingredientesDisponibles.length)];
            } while (ingredienteA === ingredienteB);

            // Mostramos las opciones
            opcion1.textContent = ingredienteA;
            opcion2.textContent = ingredienteB;

            // Guardamos los ingredientes actuales para no repetirlos
            ingredientesActuales = [ingredienteA, ingredienteB];
            ingredientesUsadosEnRonda.push(ingredienteA, ingredienteB);
        }

        // =================================================================
        // PASO 5: FUNCIÓN PARA MANEJAR LA SELECCIÓN DE INGREDIENTES
        // =================================================================
        function seleccionarIngrediente(ingrediente) {
            // Añadimos el ingrediente a los elegidos
            ingredientesElegidos.push(ingrediente);
            
            // Actualizamos la lista visual
            actualizarListaIngredientes();
            
            // Comprobamos si hay recetas disponibles
            comprobarRecetas();
            
            // Mostramos nuevas opciones
            mostrarOpciones();
        }

        // =================================================================
        // PASO 6: ACTUALIZAR LA LISTA VISUAL DE INGREDIENTES
        // =================================================================
        function actualizarListaIngredientes() {
            ingredientesSeleccionados.innerHTML = '';
            ingredientesElegidos.forEach(ingrediente => {
                const elemento = document.createElement('div');
                elemento.className = 'ingrediente';
                elemento.textContent = ingrediente;
                ingredientesSeleccionados.appendChild(elemento);
            });
        }

        // =================================================================
        // PASO 7: COMPROBAR SI LOS INGREDIENTES FORMAN UNA RECETA
        // =================================================================
        function comprobarRecetas() {
            // Convertimos el array a string para comparar (ej: "ing1+ing2+ing3")
            const combinacionActual = ingredientesElegidos.join('+');
            
            // Comprobamos todas las recetas para ver si alguna coincide
            for (const combinacion in recetas) {
                // Dividimos la combinación de la receta en ingredientes
                const ingredientesReceta = combinacion.split('+');
                
                // Comprobamos si todos los ingredientes de la receta están en los elegidos
                const recetaEncontrada = ingredientesReceta.every(ingrediente => 
                    ingredientesElegidos.includes(ingrediente)
                );
                
                if (recetaEncontrada) {
                    mostrarReceta(recetas[combinacion]);
                    return; // Salimos de la función si encontramos una receta
                }
            }
        }

        // =================================================================
        // PASO 8: MOSTRAR LA RECETA ENCONTRADA
        // =================================================================
        function mostrarReceta(receta) {
            nombreReceta.textContent = receta.nombre;
            imagenReceta.src = receta.imagen;
            imagenReceta.alt = receta.nombre;
            descripcionReceta.textContent = receta.descripcion;
            recetaResultado.style.display = 'block';
            
            // Deshabilitamos las opciones hasta reiniciar
            opcion1.style.pointerEvents = 'none';
            opcion2.style.pointerEvents = 'none';
        }

        // =================================================================
        // PASO 9: REINICIAR EL JUEGO
        // =================================================================
        function reiniciarJuego() {
            ingredientesElegidos = [];
            ingredientesUsadosEnRonda = [];
            ingredientesSeleccionados.innerHTML = '';
            recetaResultado.style.display = 'none';
            opcion1.style.pointerEvents = 'auto';
            opcion2.style.pointerEvents = 'auto';
            mostrarOpciones();
        }

        // =================================================================
        // PASO 10: ASIGNAR EVENT LISTENERS
        // =================================================================
        opcion1.addEventListener('click', () => seleccionarIngrediente(ingredientesActuales[0]));
        opcion2.addEventListener('click', () => seleccionarIngrediente(ingredientesActuales[1]));
        btnReiniciar.addEventListener('click', reiniciarJuego);

        // =================================================================
        // PASO 11: INICIAR EL JUEGO
        // =================================================================
        mostrarOpciones();