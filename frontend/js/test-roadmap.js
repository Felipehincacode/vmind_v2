// ===== TEST ROADMAP SIMPLIFICADO =====

class TestRoadmap {
    constructor() {
        this.currentPlanetIndex = 0;
        this.notes = [];
        this.currentPlanetId = null;
        this.currentResource = null;
        
        // Datos del roadmap de Python con tareas y recursos reales
        this.pythonRoadmap = {
            fundamentals: {
                name: "Fundamentos de Python",
                description: "Los cimientos de tu viaje de programación",
                status: "completed",
                tasks: [
                    { id: 1, title: "Crear tu primer programa 'Hola Mundo'", description: "Escribe y ejecuta tu primer código Python", xp: 50, completed: false },
                    { id: 2, title: "Aprender sobre variables", description: "Entiende cómo crear y usar variables", xp: 75, completed: false },
                    { id: 3, title: "Practicar con tipos de datos", description: "Trabaja con strings, números y booleanos", xp: 100, completed: false },
                    { id: 4, title: "Usar operadores básicos", description: "Aprende operadores aritméticos y lógicos", xp: 75, completed: false },
                    { id: 5, title: "Crear tu primer proyecto", description: "Combina todo lo aprendido en un proyecto", xp: 150, completed: false }
                ],
                resources: [
                    {
                        id: 1,
                        title: "Python para Principiantes",
                        description: "Curso completo de fundamentos de Python",
                        type: "video",
                        url: "https://www.youtube.com/embed/kqtD5dpn9C8",
                        icon: "🎥"
                    },
                    {
                        id: 2,
                        title: "Documentación Oficial de Python",
                        description: "Guía oficial de Python para principiantes",
                        type: "documentation",
                        url: "https://docs.python.org/3/tutorial/",
                        icon: "📚"
                    },
                    {
                        id: 3,
                        title: "Ejercicios Prácticos",
                        description: "Ejercicios interactivos de fundamentos",
                        type: "exercise",
                        url: "https://www.w3schools.com/python/python_exercises.asp",
                        icon: "💻"
                    }
                ]
            },
            "control-flow": {
                name: "Control de Flujo",
                description: "Aprende a controlar el flujo de tu programa",
                status: "in-progress",
                tasks: [
                    { id: 1, title: "Usar condicionales if/else", description: "Aprende a tomar decisiones en tu código", xp: 100, completed: false },
                    { id: 2, title: "Implementar bucles for", description: "Repite acciones con bucles", xp: 125, completed: false },
                    { id: 3, title: "Trabajar con bucles while", description: "Bucles con condición de parada", xp: 125, completed: false },
                    { id: 4, title: "Crear funciones básicas", description: "Organiza tu código en funciones", xp: 150, completed: false },
                    { id: 5, title: "Proyecto: Calculadora", description: "Crea una calculadora usando control de flujo", xp: 200, completed: false }
                ],
                resources: [
                    {
                        id: 1,
                        title: "Control de Flujo en Python",
                        description: "Tutorial completo de condicionales y bucles",
                        type: "video",
                        url: "https://www.youtube.com/embed/8ext9G7xspg",
                        icon: "🎥"
                    },
                    {
                        id: 2,
                        title: "Funciones en Python",
                        description: "Guía completa de funciones",
                        type: "video",
                        url: "https://www.youtube.com/embed/9Os0o3wzS_I",
                        icon: "🎥"
                    },
                    {
                        id: 3,
                        title: "Ejercicios de Lógica",
                        description: "Problemas de lógica de programación",
                        type: "exercise",
                        url: "https://www.practicepython.org/",
                        icon: "💻"
                    }
                ]
            },
            "data-structures": {
                name: "Estructuras de Datos",
                description: "Organiza y manipula datos eficientemente",
                status: "locked",
                tasks: [
                    { id: 1, title: "Trabajar con listas", description: "Aprende a crear y manipular listas", xp: 100, completed: false },
                    { id: 2, title: "Usar tuplas", description: "Entiende las tuplas y sus características", xp: 75, completed: false },
                    { id: 3, title: "Crear diccionarios", description: "Organiza datos con pares clave-valor", xp: 125, completed: false },
                    { id: 4, title: "Operaciones con sets", description: "Trabaja con conjuntos únicos", xp: 100, completed: false },
                    { id: 5, title: "Comprensión de listas", description: "Optimiza tu código con comprensiones", xp: 150, completed: false }
                ],
                resources: [
                    {
                        id: 1,
                        title: "Estructuras de Datos en Python",
                        description: "Tutorial completo de listas, tuplas y diccionarios",
                        type: "video",
                        url: "https://www.youtube.com/embed/daefaLgNkw0",
                        icon: "🎥"
                    },
                    {
                        id: 2,
                        title: "Diccionarios en Python",
                        description: "Guía completa de diccionarios",
                        type: "video",
                        url: "https://www.youtube.com/embed/daefaLgNkw0",
                        icon: "🎥"
                    },
                    {
                        id: 3,
                        title: "Comprensión de Listas",
                        description: "Optimización con list comprehensions",
                        type: "video",
                        url: "https://www.youtube.com/embed/3dt4OGnU5sM",
                        icon: "🎥"
                    }
                ]
            },
            "functions": {
                name: "Funciones Avanzadas",
                description: "Domina las funciones y técnicas avanzadas",
                status: "locked",
                tasks: [
                    { id: 1, title: "Crear funciones lambda", description: "Funciones anónimas para operaciones simples", xp: 100, completed: false },
                    { id: 2, title: "Implementar decoradores", description: "Modifica funciones con decoradores", xp: 150, completed: false },
                    { id: 3, title: "Trabajar con generadores", description: "Crea iteradores eficientes", xp: 125, completed: false },
                    { id: 4, title: "Funciones recursivas", description: "Funciones que se llaman a sí mismas", xp: 150, completed: false },
                    { id: 5, title: "Args y kwargs", description: "Funciones con argumentos variables", xp: 125, completed: false }
                ]
            },
            "oop": {
                name: "Programación Orientada a Objetos",
                description: "Organiza tu código con clases y objetos",
                status: "locked",
                tasks: [
                    { id: 1, title: "Crear clases básicas", description: "Define tus primeras clases", xp: 150, completed: false },
                    { id: 2, title: "Implementar herencia", description: "Reutiliza código con herencia", xp: 175, completed: false },
                    { id: 3, title: "Usar métodos especiales", description: "Personaliza el comportamiento de objetos", xp: 150, completed: false },
                    { id: 4, title: "Encapsulación", description: "Protege datos con encapsulación", xp: 125, completed: false },
                    { id: 5, title: "Proyecto: Sistema de biblioteca", description: "Crea un sistema completo con POO", xp: 250, completed: false }
                ],
                resources: [
                    {
                        id: 1,
                        title: "POO en Python",
                        description: "Tutorial completo de clases y objetos",
                        type: "video",
                        url: "https://www.youtube.com/embed/JeznW_7DlB0",
                        icon: "🎥"
                    },
                    {
                        id: 2,
                        title: "Herencia en Python",
                        description: "Guía de herencia y polimorfismo",
                        type: "video",
                        url: "https://www.youtube.com/embed/RSl87lqOXDE",
                        icon: "🎥"
                    },
                    {
                        id: 3,
                        title: "Proyecto POO",
                        description: "Proyecto práctico con POO",
                        type: "video",
                        url: "https://www.youtube.com/embed/8ext9G7xspg",
                        icon: "🎥"
                    }
                ]
            },
            "modules": {
                name: "Módulos y Paquetes",
                description: "Organiza y reutiliza tu código",
                status: "locked",
                tasks: [
                    { id: 1, title: "Importar módulos", description: "Usa módulos de la biblioteca estándar", xp: 75, completed: false },
                    { id: 2, title: "Crear módulos propios", description: "Organiza tu código en módulos", xp: 100, completed: false },
                    { id: 3, title: "Trabajar con paquetes", description: "Estructura proyectos complejos", xp: 125, completed: false },
                    { id: 4, title: "Instalar paquetes externos", description: "Usa pip para instalar librerías", xp: 75, completed: false },
                    { id: 5, title: "Entornos virtuales", description: "Aísla dependencias de proyectos", xp: 100, completed: false }
                ],
                resources: [
                    {
                        id: 1,
                        title: "Módulos en Python",
                        description: "Tutorial de módulos y paquetes",
                        type: "video",
                        url: "https://www.youtube.com/embed/0oTh1CXRaQ0",
                        icon: "🎥"
                    },
                    {
                        id: 2,
                        title: "Pip y PyPI",
                        description: "Guía de instalación de paquetes",
                        type: "video",
                        url: "https://www.youtube.com/embed/4Ej0LwjCDZQ",
                        icon: "🎥"
                    },
                    {
                        id: 3,
                        title: "Entornos Virtuales",
                        description: "Tutorial de venv y virtualenv",
                        type: "video",
                        url: "https://www.youtube.com/embed/N5vscPTWKOk",
                        icon: "🎥"
                    }
                ]
            },
            "exceptions": {
                name: "Manejo de Excepciones",
                description: "Escribe código robusto y maneja errores",
                status: "locked",
                tasks: [
                    { id: 1, title: "Try/except básico", description: "Captura y maneja errores", xp: 100, completed: false },
                    { id: 2, title: "Tipos de excepciones", description: "Conoce las excepciones más comunes", xp: 75, completed: false },
                    { id: 3, title: "Context managers", description: "Usa with para manejo de recursos", xp: 125, completed: false },
                    { id: 4, title: "Excepciones personalizadas", description: "Crea tus propias excepciones", xp: 100, completed: false },
                    { id: 5, title: "Logging", description: "Registra eventos y errores", xp: 125, completed: false }
                ],
                resources: [
                    {
                        id: 1,
                        title: "Manejo de Excepciones",
                        description: "Tutorial completo de try/except",
                        type: "video",
                        url: "https://www.youtube.com/embed/8ext9G7xspg",
                        icon: "🎥"
                    },
                    {
                        id: 2,
                        title: "Context Managers",
                        description: "Guía de with statements",
                        type: "video",
                        url: "https://www.youtube.com/embed/8ext9G7xspg",
                        icon: "🎥"
                    },
                    {
                        id: 3,
                        title: "Logging en Python",
                        description: "Tutorial de logging",
                        type: "video",
                        url: "https://www.youtube.com/embed/8ext9G7xspg",
                        icon: "🎥"
                    }
                ]
            },
            "file-io": {
                name: "Archivos y I/O",
                description: "Lee y escribe datos en archivos",
                status: "locked",
                tasks: [
                    { id: 1, title: "Leer archivos de texto", description: "Abre y lee archivos", xp: 100, completed: false },
                    { id: 2, title: "Escribir archivos", description: "Crea y modifica archivos", xp: 100, completed: false },
                    { id: 3, title: "Trabajar con CSV", description: "Procesa datos tabulares", xp: 125, completed: false },
                    { id: 4, title: "Serialización JSON", description: "Guarda y carga datos estructurados", xp: 100, completed: false },
                    { id: 5, title: "Proyecto: Gestor de archivos", description: "Crea una aplicación de gestión de archivos", xp: 200, completed: false }
                ],
                resources: [
                    {
                        id: 1,
                        title: "Archivos en Python",
                        description: "Tutorial de lectura y escritura",
                        type: "video",
                        url: "https://www.youtube.com/embed/8ext9G7xspg",
                        icon: "🎥"
                    },
                    {
                        id: 2,
                        title: "CSV en Python",
                        description: "Guía de procesamiento CSV",
                        type: "video",
                        url: "https://www.youtube.com/embed/8ext9G7xspg",
                        icon: "🎥"
                    },
                    {
                        id: 3,
                        title: "JSON en Python",
                        description: "Tutorial de JSON",
                        type: "video",
                        url: "https://www.youtube.com/embed/8ext9G7xspg",
                        icon: "🎥"
                    }
                ]
            },
            "web": {
                name: "Desarrollo Web",
                description: "Crea aplicaciones web con Python",
                status: "locked",
                tasks: [
                    { id: 1, title: "Primera app con Flask", description: "Crea tu primera aplicación web", xp: 150, completed: false },
                    { id: 2, title: "Rutas y templates", description: "Define rutas y crea vistas", xp: 125, completed: false },
                    { id: 3, title: "APIs REST", description: "Crea APIs para comunicación", xp: 175, completed: false },
                    { id: 4, title: "Bases de datos web", description: "Conecta tu app con una base de datos", xp: 150, completed: false },
                    { id: 5, title: "Despliegue", description: "Publica tu aplicación en la web", xp: 200, completed: false }
                ],
                resources: [
                    {
                        id: 1,
                        title: "Flask Tutorial",
                        description: "Tutorial completo de Flask",
                        type: "video",
                        url: "https://www.youtube.com/embed/8ext9G7xspg",
                        icon: "🎥"
                    },
                    {
                        id: 2,
                        title: "APIs REST",
                        description: "Guía de APIs REST",
                        type: "video",
                        url: "https://www.youtube.com/embed/8ext9G7xspg",
                        icon: "🎥"
                    },
                    {
                        id: 3,
                        title: "Despliegue Web",
                        description: "Tutorial de despliegue",
                        type: "video",
                        url: "https://www.youtube.com/embed/8ext9G7xspg",
                        icon: "🎥"
                    }
                ]
            },
            "data-science": {
                name: "Data Science",
                description: "Analiza y visualiza datos",
                status: "locked",
                tasks: [
                    { id: 1, title: "Introducción a Pandas", description: "Manipula datos con DataFrames", xp: 150, completed: false },
                    { id: 2, title: "Análisis básico", description: "Explora y limpia datos", xp: 125, completed: false },
                    { id: 3, title: "Visualización con Matplotlib", description: "Crea gráficos y visualizaciones", xp: 150, completed: false },
                    { id: 4, title: "Jupyter Notebooks", description: "Trabaja en notebooks interactivos", xp: 100, completed: false },
                    { id: 5, title: "Proyecto: Análisis de datos", description: "Realiza un análisis completo de datos", xp: 250, completed: false }
                ],
                resources: [
                    {
                        id: 1,
                        title: "Pandas Tutorial",
                        description: "Tutorial completo de Pandas",
                        type: "video",
                        url: "https://www.youtube.com/embed/8ext9G7xspg",
                        icon: "🎥"
                    },
                    {
                        id: 2,
                        title: "Matplotlib",
                        description: "Guía de visualización",
                        type: "video",
                        url: "https://www.youtube.com/embed/8ext9G7xspg",
                        icon: "🎥"
                    },
                    {
                        id: 3,
                        title: "Jupyter Notebooks",
                        description: "Tutorial de Jupyter",
                        type: "video",
                        url: "https://www.youtube.com/embed/8ext9G7xspg",
                        icon: "🎥"
                    }
                ]
            }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderRoadmap();
        this.initializeRoadmap();
    }

    setupEventListeners() {
        // Controles del slider
        const prevBtn = document.getElementById('prevPlanet');
        const nextBtn = document.getElementById('nextPlanet');
        
        console.log('Setting up slider controls:', prevBtn, nextBtn);
        
        prevBtn.addEventListener('click', () => {
            console.log('Prev button clicked');
            this.navigatePlanet(-1);
        });

        nextBtn.addEventListener('click', () => {
            console.log('Next button clicked');
            this.navigatePlanet(1);
        });
    }

    renderRoadmap() {
        const sliderTrack = document.getElementById('sliderTrack');
        const planetOrder = ['fundamentals', 'control-flow', 'data-structures', 'functions', 'oop', 'modules', 'exceptions', 'file-io', 'web', 'data-science'];
        
        sliderTrack.innerHTML = '';
        
        planetOrder.forEach((planetId, index) => {
            const planetData = this.pythonRoadmap[planetId];
            const planetCard = document.createElement('div');
            planetCard.className = `planet-card ${planetData.status}`;
            planetCard.dataset.planet = planetId;
            planetCard.dataset.index = index;
            
            planetCard.innerHTML = `
                <div class="planet-image">
                    <img src="assets/ui_elements/planeta${(index % 4) + 1}.png" alt="${planetData.name}">
                </div>
                <div class="planet-info">
                    <h3>${planetData.name}</h3>
                    <p>${planetData.description}</p>
                </div>
                <div class="planet-status">
                    ${this.getStatusIcon(planetData.status)}
                </div>
            `;
            
            sliderTrack.appendChild(planetCard);
        });
        
        this.updateSliderControls();
        
        // Debug: verificar que los planetas se renderizaron
        console.log('Planets rendered:', document.querySelectorAll('.planet-card').length);
    }

    initializeRoadmap() {
        // Asegurar que el primer planeta esté centrado y visible
        this.currentPlanetIndex = 0;
        
        // Forzar la posición inicial sin transform para asegurar visibilidad
        const sliderTrack = document.getElementById('sliderTrack');
        const sliderContainer = document.querySelector('.slider-container');
        
        // Debug: verificar que los elementos existen
        console.log('Slider elements:', {
            sliderTrack: !!sliderTrack,
            sliderContainer: !!sliderContainer,
            containerWidth: sliderContainer?.clientWidth,
            trackWidth: sliderTrack?.scrollWidth
        });
        
        sliderTrack.style.transform = 'translateX(0px)';
        
        // Esperar un momento y luego aplicar el centrado
        setTimeout(() => {
            this.scrollToPlanet(0);
            this.updateSliderControls();
            console.log('Roadmap initialized successfully');
        }, 100);
    }

    getStatusIcon(status) {
        switch (status) {
            case 'completed': return '✓';
            case 'in-progress': return '⟳';
            case 'locked': return '🔒';
            default: return '⏳';
        }
    }

    updateSliderControls() {
        const prevBtn = document.getElementById('prevPlanet');
        const nextBtn = document.getElementById('nextPlanet');
        
        // Habilitar/deshabilitar botones basado en el índice actual
        prevBtn.disabled = this.currentPlanetIndex === 0;
        nextBtn.disabled = this.currentPlanetIndex === 9;
        
        // Agregar clases visuales para el estado disabled
        prevBtn.classList.toggle('disabled', this.currentPlanetIndex === 0);
        nextBtn.classList.toggle('disabled', this.currentPlanetIndex === 9);
    }

    navigatePlanet(direction) {
        console.log('navigatePlanet called with direction:', direction, 'currentIndex:', this.currentPlanetIndex);
        const newIndex = this.currentPlanetIndex + direction;
        if (newIndex >= 0 && newIndex <= 9) {
            this.currentPlanetIndex = newIndex;
            this.scrollToPlanet(newIndex);
            this.updateSliderControls();
        }
    }

    scrollToPlanet(index) {
        const sliderTrack = document.getElementById('sliderTrack');
        const sliderContainer = document.querySelector('.slider-container');
        const cardWidth = 200; // Ancho de cada tarjeta
        const gap = 32; // Gap entre tarjetas
        const totalCardWidth = cardWidth + gap;
        const containerWidth = sliderContainer.clientWidth;
        
        // Asegurar que el índice esté dentro del rango válido
        const clampedIndex = Math.max(0, Math.min(9, index));
        
        // Calcular la posición para centrar el planeta
        const targetPosition = clampedIndex * totalCardWidth;
        const centerOffset = (containerWidth - cardWidth) / 2;
        const finalPosition = targetPosition - centerOffset;
        
        // Calcular el máximo scroll posible
        const totalWidth = 10 * totalCardWidth;
        const maxScroll = Math.max(0, totalWidth - containerWidth);
        const clampedPosition = Math.max(0, Math.min(maxScroll, finalPosition));
        
        console.log('scrollToPlanet:', {
            index: clampedIndex,
            containerWidth,
            targetPosition,
            centerOffset,
            finalPosition: clampedPosition,
            maxScroll
        });
        
        // Aplicar la transformación
        sliderTrack.style.transform = `translateX(-${clampedPosition}px)`;
        this.currentPlanetIndex = clampedIndex;
        
        // Actualizar la clase active en los planetas
        document.querySelectorAll('.planet-card').forEach((card, i) => {
            card.classList.toggle('active', i === clampedIndex);
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.testRoadmap = new TestRoadmap();
});
