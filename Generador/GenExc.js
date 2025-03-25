document.addEventListener('DOMContentLoaded', function() {
    const excuseText = document.getElementById('excuse-text');
    const generateBtn = document.getElementById('generate-btn');
    const whoSlot = document.getElementById('who-slot').querySelector('.slot-items');
    const howSlot = document.getElementById('how-slot').querySelector('.slot-items');
    const whenSlot = document.getElementById('when-slot').querySelector('.slot-items');
    
    // Arrays con las diferentes partes de la excusa
    const personas = [
        "mi perro",
        "mi abuela",
        "el algoritmo de TikTok",
        "un influencer que sigo",
        "mi ex",
        "el horóscopo",
        "un meme que vi",
        "mi terapeuta",
        "un vidente en Instagram",
        "mi gato",
        "un youtuber",
        "mi tarotista"
    ];
    
    const acciones = [
        "borró mi tarea",
        "me dijo que no lo hiciera",
        "predijo que sería mala idea",
        "se comió mi computadora",
        "me hackeó el celular",
        "me convenció de viajar",
        "me hizo cuestionar mi existencia",
        "me dijo que era una prueba del universo",
        "me hizo replantearme mis prioridades",
        "me mostró un video de gatitos",
        "me hizo llorar con un reel",
        "me dio un ataque de ansiedad existencial"
    ];
    
    const lugares = [
        "en medio de una crisis existencial",
        "durante mi detox digital",
        "mientras meditaba",
        "en plena reunión familiar",
        "cuando estaba stalkeando a mi ex",
        "en medio de un breakdown",
        "durante mi ayuno de dopamina",
        "mientras organizaba mi altar de cristales",
        "en plena sesión de journaling",
        "cuando estaba limpiando mi aura",
        "durante mi ritual lunar",
        "en medio de una sincronicidad cósmica"
    ];
    
    // Variables para guardar las selecciones actuales
    let currentSelection = {
        who: { index: 0, value: "" },
        how: { index: 0, value: "" },
        when: { index: 0, value: "" }
    };

    // Llenar los slots con opciones
    function fillSlots() {
        // Limpiar slots
        whoSlot.innerHTML = '';
        howSlot.innerHTML = '';
        whenSlot.innerHTML = '';
        
        // Llenar slots con suficientes copias para el efecto de scroll
        const copies = 3; // Número de copias para efecto continuo
        
        // Función para llenar un slot específico
        const fillSlot = (slotElement, items) => {
            for (let i = 0; i < copies; i++) {
                items.forEach((item, index) => {
                    const div = document.createElement('div');
                    div.className = 'slot-item';
                    div.textContent = item;
                    div.dataset.originalIndex = index; // Guardamos el índice original
                    slotElement.appendChild(div);
                });
            }
        };
        
        fillSlot(whoSlot, personas);
        fillSlot(howSlot, acciones);
        fillSlot(whenSlot, lugares);
    }
    
    // Función para animar un slot
    function spinSlot(slotElement, items, finalIndex) {
        return new Promise((resolve) => {
            const itemHeight = 100; // Altura de cada item
            const totalItems = items.length;
            const spinDuration = 2000; // Duración en ms
            const spins = 2; // Número de vueltas completas
            
            // Posición inicial (primer item)
            const startPosition = 0;
            // Posición final (item seleccionado después de las vueltas)
            const endPosition = -((spins * totalItems + finalIndex) * itemHeight);
            
            // Animación
            let startTime = null;
            
            function animate(currentTime) {
                if (!startTime) startTime = currentTime;
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / spinDuration, 1);
                
                // Ease-out function
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                
                // Posición actual
                const currentPosition = startPosition + (endPosition - startPosition) * easeProgress;
                slotElement.style.transform = `translateY(${currentPosition}px)`;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    // Ajuste final para asegurar que estamos en la posición correcta
                    slotElement.style.transform = `translateY(${endPosition}px)`;
                    
                    // Encontrar el elemento visible (el que está en el centro visual)
                    const visibleItem = Array.from(slotElement.children).find(item => {
                        const rect = item.getBoundingClientRect();
                        const slotRect = slotElement.parentElement.getBoundingClientRect();
                        return rect.top <= slotRect.top + (slotRect.height / 2) && 
                               rect.bottom >= slotRect.top + (slotRect.height / 2);
                    });
                    
                    // Devolver el índice original del elemento visible
                    resolve(parseInt(visibleItem.dataset.originalIndex));
                }
            }
            
            requestAnimationFrame(animate);
        });
    }
    
    // Función para actualizar la excusa completa
    function updateFinalExcuse() {
        excuseText.textContent = `Lo siento, no pude hacerlo porque ${currentSelection.who.value} ${currentSelection.how.value} ${currentSelection.when.value}.`;
        excuseText.style.animation = 'none';
        void excuseText.offsetWidth; // Trigger reflow
        excuseText.style.animation = 'fadeIn 0.5s ease';
    }
    
    // Función para generar excusa aleatoria con animación
    async function generarExcusa() {
        generateBtn.disabled = true;
        
        // Seleccionar índices aleatorios
        const targetWhoIndex = Math.floor(Math.random() * personas.length);
        const targetHowIndex = Math.floor(Math.random() * acciones.length);
        const targetWhenIndex = Math.floor(Math.random() * lugares.length);
        
        // Animar los slots y obtener los índices reales donde se detuvieron
        const [stoppedWhoIndex, stoppedHowIndex, stoppedWhenIndex] = await Promise.all([
            spinSlot(whoSlot, personas, targetWhoIndex),
            spinSlot(howSlot, acciones, targetHowIndex),
            spinSlot(whenSlot, lugares, targetWhenIndex)
        ]);
        
        // Guardar las selecciones actuales según donde realmente se detuvieron
        currentSelection = {
            who: { index: stoppedWhoIndex, value: personas[stoppedWhoIndex] },
            how: { index: stoppedHowIndex, value: acciones[stoppedHowIndex] },
            when: { index: stoppedWhenIndex, value: lugares[stoppedWhenIndex] }
        };
        
        // Mostrar la excusa completa
        updateFinalExcuse();
        
        generateBtn.disabled = false;
    }
    
    // Evento del botón
    generateBtn.addEventListener('click', generarExcusa);
    
    // Inicializar
    fillSlots();
    generarExcusa(); // Generar una excusa al cargar la página
});