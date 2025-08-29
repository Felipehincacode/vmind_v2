// ===== DASHBOARD CON NAVEGACIÓN POR SCROLL STICKY =====

class Dashboard {
    constructor() {
        this.currentSection = 'home';
        this.sections = ['home', 'roadmap', 'notas', 'recursos'];
        this.quotes = [
            { text: "El aprendizaje es un tesoro que seguirá a su dueño a todas partes.", author: "Proverbio chino" },
            { text: "La educación es el arma más poderosa que puedes usar para cambiar el mundo.", author: "Nelson Mandela" },
            { text: "El conocimiento es poder, pero la práctica es la clave del dominio.", author: "Confucio" },
            { text: "Cada día es una nueva oportunidad para aprender algo nuevo.", author: "Desconocido" },
            { text: "La mente que se abre a una nueva idea nunca vuelve a su tamaño original.", author: "Albert Einstein" }
        ];
        this.notes = [];
        this.resources = [];
        this.charts = {};
        this.quillEditor = null;
        this.resourceQuillEditor = null;
        
        // Variables del slider
        this.currentPlanetIndex = 0;
        this.isDragging = false;
        this.dragStartX = 0;
        this.dragStartY = 0;
        this.dragStartScrollLeft = 0;
        
        // Datos del roadmap de Python con tareas
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
                    "Video: Introducción a Python",
                    "Documentación oficial de Python",
                    "Ejercicios prácticos interactivos",
                    "Quiz de fundamentos"
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
                    "Video: Control de flujo en Python",
                    "Tutorial interactivo de funciones",
                    "Ejercicios de lógica de programación",
                    "Proyecto: Calculadora básica"
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
                    "Video: Estructuras de datos en Python",
                    "Guía completa de diccionarios",
                    "Ejercicios de manipulación de datos",
                    "Proyecto: Sistema de inventario"
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
                ],
                resources: [
                    "Video: Funciones avanzadas",
                    "Tutorial de decoradores",
                    "Guía de generadores",
                    "Proyecto: Framework de decoradores"
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
                    "Video: POO en Python",
                    "Tutorial de clases y objetos",
                    "Guía de herencia",
                    "Proyecto: Sistema de gestión de biblioteca"
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
                    "Video: Módulos y paquetes",
                    "Guía de pip y PyPI",
                    "Tutorial de entornos virtuales",
                    "Proyecto: Paquete personalizado"
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
                    "Video: Manejo de excepciones",
                    "Guía de context managers",
                    "Tutorial de logging",
                    "Proyecto: Sistema de logging"
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
                    "Video: Archivos y I/O",
                    "Guía de CSV en Python",
                    "Tutorial de JSON",
                    "Proyecto: Gestor de archivos"
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
                    "Video: Desarrollo web con Python",
                    "Tutorial de Flask",
                    "Guía de Django",
                    "Proyecto: Blog web"
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
                    "Video: Data Science con Python",
                    "Tutorial de Pandas",
                    "Guía de Matplotlib",
                    "Proyecto: Análisis de datos"
                ]
            }
        };
        
        this.init();
    }

    init() {
        this.loadUserData();
        this.setupEventListeners();
        this.initializeScrollNavigation();
        this.renderDashboard();
        this.initializeCharts();
        this.loadNotes();
        this.loadResources();
        this.setupQuillEditor();
        this.setupResourceQuillEditor();
        this.renderRoadmap();
        this.setupDragAndDrop();
        
        // Asegurar que el roadmap se inicialice correctamente después de que todo esté listo
        setTimeout(() => {
            this.initializeRoadmap();
        }, 500);
    }

    loadUserData() {
        const userData = localStorage.getItem('userData');
        if (!userData) {
            window.location.href = 'login.html';
            return;
        }

        try {
            const parsedUserData = JSON.parse(userData);
            const user = TestUsers.getUserById(parsedUserData.id);
            
            if (user) {
                this.userData = user;
                this.updateUserInterface();
            } else {
                window.location.href = 'login.html';
            }
        } catch (error) {
            console.error('Error loading user data:', error);
            window.location.href = 'login.html';
        }
    }

    updateUserInterface() {
        // Actualizar sidebar
        document.getElementById('sidebarUserName').textContent = this.userData.name;
        document.getElementById('sidebarAvatar').src = 'assets/ui_elements/avatar.png';
        document.getElementById('sidebarXPFill').style.width = `${(this.userData.points / 2000) * 100}%`;
        document.getElementById('sidebarXP').textContent = this.userData.points.toLocaleString();
        document.getElementById('sidebarXPNext').textContent = '2,000';

        // Actualizar home
        document.getElementById('userName').textContent = this.userData.name;
        
        // Actualizar cita inspiradora
        const randomQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        document.getElementById('quoteText').textContent = randomQuote.text;
        document.getElementById('quoteAuthor').textContent = `- ${randomQuote.author}`;

        // Actualizar streak
        this.updateStreakDisplay();
    }

    updateStreakDisplay() {
        const streakDays = document.querySelectorAll('.streak-day-mini');
        const currentStreak = this.userData.streak;
        
        streakDays.forEach((day, index) => {
            if (index < currentStreak) {
                day.classList.add('active');
            } else {
                day.classList.remove('active');
            }
        });
    }

    setupEventListeners() {
        // Toggle de la tarjeta de perfil
        document.getElementById('profileCardHeader').addEventListener('click', () => {
            this.toggleProfileCard();
        });

        // Navegación por scroll
        document.querySelectorAll('.scroll-nav .nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.scrollToSection(section);
            });
        });

        // Indicadores de scroll
        document.querySelectorAll('.scroll-dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                const sectionIndex = parseInt(e.currentTarget.dataset.section);
                this.scrollToSectionByIndex(sectionIndex);
            });
        });

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

        // Botones de notas
        document.getElementById('newNoteBtn').addEventListener('click', () => {
            this.openNoteModal();
        });

        document.getElementById('newQuickNote').addEventListener('click', () => {
            this.openNoteModal();
        });

        // Modal de notas
        document.getElementById('closeNoteModal').addEventListener('click', () => {
            this.closeNoteModal();
        });

        document.getElementById('cancelNote').addEventListener('click', () => {
            this.closeNoteModal();
        });

        document.getElementById('saveNote').addEventListener('click', () => {
            this.saveNote();
        });

        // Modal de recursos
        document.getElementById('closeResourceModal').addEventListener('click', () => {
            this.closeResourceModal();
        });

        // Modal de planetas
        document.getElementById('closePlanetModal').addEventListener('click', () => {
            this.closePlanetModal();
        });

        document.getElementById('closePlanetBtn').addEventListener('click', () => {
            this.closePlanetModal();
        });

        document.getElementById('startPlanetBtn').addEventListener('click', () => {
            this.startPlanetLearning();
        });

        // Cerrar sesión
        document.getElementById('sidebarLogoutBtn').addEventListener('click', () => {
            this.logout();
        });

        // Event listeners para modales
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-backdrop')) {
                this.closeNoteModal();
                this.closeResourceModal();
                this.closePlanetModal();
            }
        });

        // Listener para resize de ventana
        window.addEventListener('resize', () => {
            // Reajustar el roadmap cuando cambie el tamaño de la ventana
            setTimeout(() => {
                this.scrollToPlanet(this.currentPlanetIndex);
            }, 100);
        });
    }

    initializeScrollNavigation() {
        const main = document.querySelector('.dashboard-main');
        let isScrolling = false;

        main.addEventListener('scroll', () => {
            if (isScrolling) return;
            
            isScrolling = true;
            setTimeout(() => {
                isScrolling = false;
            }, 100);

            this.updateActiveSection();
        });

        // Scroll suave entre secciones
        this.setupSmoothScroll();
    }

    setupSmoothScroll() {
        const main = document.querySelector('.dashboard-main');
        main.style.scrollBehavior = 'smooth';
    }

    updateActiveSection() {
        const main = document.querySelector('.dashboard-main');
        const scrollTop = main.scrollTop;
        const sectionHeight = window.innerHeight;
        const currentIndex = Math.floor(scrollTop / sectionHeight);
        
        const newSection = this.sections[currentIndex] || 'home';
        
        if (newSection !== this.currentSection) {
            this.currentSection = newSection;
            this.updateNavigation();
            this.updateScrollIndicators(currentIndex);
        }
    }

    updateNavigation() {
        document.querySelectorAll('.scroll-nav .nav-item').forEach(item => {
            item.classList.remove('active');
        });

        const activeNavItem = document.querySelector(`[data-section="${this.currentSection}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }
    }

    updateScrollIndicators(activeIndex) {
        document.querySelectorAll('.scroll-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }

    scrollToSection(section) {
        const sectionIndex = this.sections.indexOf(section);
        if (sectionIndex === -1) return;

        this.scrollToSectionByIndex(sectionIndex);
    }

    scrollToSectionByIndex(index) {
        const main = document.querySelector('.dashboard-main');
        const sectionHeight = window.innerHeight;
        const targetScroll = index * sectionHeight;

        main.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });

        this.currentSection = this.sections[index];
        this.updateNavigation();
        this.updateScrollIndicators(index);
    }

    toggleProfileCard() {
        const profileCardTop = document.getElementById('profileCardTop');
        profileCardTop.classList.toggle('expanded');
    }

    initializeCharts() {
        this.initializeProgressChart();
        this.initializeStreakChart();
    }

    initializeProgressChart() {
        const ctx = document.getElementById('progressChart').getContext('2d');
        
        this.charts.progress = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Completado', 'Pendiente'],
                datasets: [{
                    data: [1, 9],
                    backgroundColor: [
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(255, 255, 255, 0.1)'
                    ],
                    borderColor: [
                        'rgba(16, 185, 129, 1)',
                        'rgba(255, 255, 255, 0.2)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                cutout: '70%'
            }
        });
    }

    initializeStreakChart() {
        const ctx = document.getElementById('streakChart').getContext('2d');
        
        this.charts.streak = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                datasets: [{
                    label: 'Horas de estudio',
                    data: [2, 3, 1, 4, 2, 3, 1],
                    borderColor: 'rgba(255, 110, 199, 1)',
                    backgroundColor: 'rgba(255, 110, 199, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                }
            }
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
            planetCard.draggable = true;
            
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
            
            planetCard.addEventListener('click', () => {
                if (planetData.status !== 'locked') {
                    this.openPlanetModal(planetId);
                }
            });
            
            sliderTrack.appendChild(planetCard);
        });
        
        this.updateRoadmapProgress();
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

    updateRoadmapProgress() {
        const planetOrder = ['fundamentals', 'control-flow', 'data-structures', 'functions', 'oop', 'modules', 'exceptions', 'file-io', 'web', 'data-science'];
        const completedPlanets = planetOrder.filter(planetId => this.pythonRoadmap[planetId].status === 'completed').length;
        const inProgressPlanets = planetOrder.filter(planetId => this.pythonRoadmap[planetId].status === 'in-progress').length;
        const progressPercentage = ((completedPlanets + inProgressPlanets * 0.5) / planetOrder.length) * 100;
        
        document.getElementById('roadmapProgress').style.width = `${progressPercentage}%`;
        document.getElementById('progressText').textContent = `${completedPlanets} completados, ${inProgressPlanets} en progreso de ${planetOrder.length} planetas`;
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

    setupDragAndDrop() {
        const sliderTrack = document.getElementById('sliderTrack');
        let isDragging = false;
        let startX = 0;
        let startScrollLeft = 0;
        
        sliderTrack.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            
            // Obtener la posición actual del transform
            const transform = window.getComputedStyle(sliderTrack).transform;
            if (transform !== 'none') {
                const matrix = new DOMMatrix(transform);
                startScrollLeft = -matrix.m41;
            } else {
                startScrollLeft = 0;
            }
            
            sliderTrack.style.cursor = 'grabbing';
            sliderTrack.classList.add('dragging');
            e.preventDefault();
        });
        
        sliderTrack.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            
            const currentX = e.clientX;
            const diff = startX - currentX;
            const newScrollLeft = startScrollLeft + diff;
            
            // Limitar el rango de movimiento
            const sliderContainer = document.querySelector('.slider-container');
            const containerWidth = sliderContainer.clientWidth;
            const cardWidth = 200;
            const gap = 32;
            const totalCardWidth = cardWidth + gap;
            const totalWidth = 10 * totalCardWidth; // 10 planetas * totalCardWidth
            const maxScroll = Math.max(0, totalWidth - containerWidth);
            const clampedScroll = Math.max(0, Math.min(maxScroll, newScrollLeft));
            
            sliderTrack.style.transform = `translateX(-${clampedScroll}px)`;
        });
        
        sliderTrack.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                sliderTrack.style.cursor = 'grab';
                sliderTrack.classList.remove('dragging');
                
                // Snap al planeta más cercano
                this.snapToNearestPlanet();
            }
        });
        
        sliderTrack.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                sliderTrack.style.cursor = 'grab';
                sliderTrack.classList.remove('dragging');
                this.snapToNearestPlanet();
            }
        });
        
        // Prevenir selección de texto durante el drag
        sliderTrack.addEventListener('selectstart', (e) => {
            if (isDragging) {
                e.preventDefault();
            }
        });
    }
    
    snapToNearestPlanet() {
        const sliderTrack = document.getElementById('sliderTrack');
        const sliderContainer = document.querySelector('.slider-container');
        const transform = window.getComputedStyle(sliderTrack).transform;
        let currentTranslate = 0;
        
        if (transform !== 'none') {
            const matrix = new DOMMatrix(transform);
            currentTranslate = -matrix.m41;
        }
        
        const cardWidth = 200;
        const gap = 32;
        const totalCardWidth = cardWidth + gap;
        const containerWidth = sliderContainer.clientWidth;
        
        // Calcular qué planeta está más cerca del centro
        const centerOffset = (containerWidth - cardWidth) / 2;
        const centerPosition = currentTranslate + centerOffset;
        const planetIndex = Math.round(centerPosition / totalCardWidth);
        const clampedIndex = Math.max(0, Math.min(9, planetIndex));
        
        this.currentPlanetIndex = clampedIndex;
        this.scrollToPlanet(clampedIndex);
        this.updateSliderControls();
    }

    setupQuillEditor() {
        this.quillEditor = new Quill('#noteEditor', {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline'],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link', 'image'],
                    ['clean']
                ]
            },
            placeholder: 'Escribe tu nota aquí...'
        });
    }

    setupResourceQuillEditor() {
        this.resourceQuillEditor = new Quill('#resourceNoteEditor', {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline'],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link'],
                    ['clean']
                ]
            },
            placeholder: 'Toma notas mientras ves el video...'
        });
    }

    loadNotes() {
        const savedNotes = localStorage.getItem('userNotes');
        this.notes = savedNotes ? JSON.parse(savedNotes) : [
            {
                id: 1,
                title: 'Conceptos de Python',
                content: '<p>Variables, funciones, clases...</p>',
                tags: ['python', 'fundamentos'],
                createdAt: new Date().toISOString()
            }
        ];
        this.renderNotes();
    }

    renderNotes() {
        const notesGrid = document.getElementById('notesGrid');
        notesGrid.innerHTML = '';

        this.notes.forEach(note => {
            const noteCard = document.createElement('div');
            noteCard.className = 'note-card';
            noteCard.innerHTML = `
                <h3>${note.title}</h3>
                <div class="content">${note.content}</div>
                <div class="note-tags">
                    ${note.tags.map(tag => `<span class="note-tag">${tag}</span>`).join('')}
                </div>
            `;
            noteCard.addEventListener('click', () => {
                this.editNote(note);
            });
            notesGrid.appendChild(noteCard);
        });
    }

    loadResources() {
        this.resources = [
            {
                id: 1,
                title: 'Fundamentos de Python',
                description: 'Video introductorio a Python',
                type: 'video',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                planet: 'fundamentals',
                tags: ['python', 'fundamentos']
            },
            {
                id: 2,
                title: 'Estructuras de Datos',
                description: 'Listas, tuplas y diccionarios',
                type: 'video',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                planet: 'data-structures',
                tags: ['python', 'estructuras']
            },
            {
                id: 3,
                title: 'Programación Orientada a Objetos',
                description: 'Clases y objetos en Python',
                type: 'video',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                planet: 'oop',
                tags: ['python', 'poo']
            }
        ];
        this.renderResources();
    }

    renderResources() {
        const resourcesGrid = document.getElementById('resourcesGrid');
        resourcesGrid.innerHTML = '';

        this.resources.forEach(resource => {
            const resourceCard = document.createElement('div');
            resourceCard.className = 'resource-card';
            resourceCard.innerHTML = `
                <div class="resource-thumbnail">
                    <span>🎥</span>
                </div>
                <div class="resource-content">
                    <h3 class="resource-title">${resource.title}</h3>
                    <p class="resource-description">${resource.description}</p>
                    <div class="resource-meta">
                        <span>Planeta: ${resource.planet}</span>
                        <span>Video</span>
                    </div>
                </div>
            `;
            resourceCard.addEventListener('click', () => {
                this.openResourceModal(resource);
            });
            resourcesGrid.appendChild(resourceCard);
        });
    }

    openPlanetModal(planetId) {
        const planetData = this.pythonRoadmap[planetId];
        if (!planetData) return;

        const modal = document.getElementById('planetModal');
        const title = document.getElementById('planetTitle');
        const name = document.getElementById('planetModalName');
        const description = document.getElementById('planetModalDescription');
        const status = document.getElementById('planetModalStatus');
        const image = document.getElementById('planetModalImage');
        const tasks = document.getElementById('planetModalTasks');
        const resources = document.getElementById('planetModalResources');
        const completedTasks = document.getElementById('completedTasks');
        const totalTasks = document.getElementById('totalTasks');
        const xpEarned = document.getElementById('xpEarned');

        title.textContent = planetData.name;
        name.textContent = planetData.name;
        description.textContent = planetData.description;
        status.textContent = this.getStatusText(planetData.status);
        
        const planetOrder = ['fundamentals', 'control-flow', 'data-structures', 'functions', 'oop', 'modules', 'exceptions', 'file-io', 'web', 'data-science'];
        const planetIndex = planetOrder.indexOf(planetId);
        image.src = `assets/ui_elements/planeta${(planetIndex % 4) + 1}.png`;

        // Renderizar tareas
        const completedCount = planetData.tasks.filter(task => task.completed).length;
        const totalCount = planetData.tasks.length;
        const earnedXP = planetData.tasks.filter(task => task.completed).reduce((sum, task) => sum + task.xp, 0);

        completedTasks.textContent = completedCount;
        totalTasks.textContent = totalCount;
        xpEarned.textContent = `${earnedXP} XP`;

        tasks.innerHTML = planetData.tasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
                <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="dashboard.toggleTask('${planetId}', ${task.id})"></div>
                <div class="task-content">
                    <div class="task-title">${task.title}</div>
                    <div class="task-description">${task.description}</div>
                </div>
                <div class="task-xp">
                    <span>⭐</span>
                    <span>${task.xp} XP</span>
                </div>
            </div>
        `).join('');

        // Renderizar recursos
        resources.innerHTML = planetData.resources.map(resource => 
            `<div class="resource-item">📚 ${resource}</div>`
        ).join('');

        modal.classList.add('active');
        this.currentPlanetId = planetId;
    }

    toggleTask(planetId, taskId) {
        const planetData = this.pythonRoadmap[planetId];
        const task = planetData.tasks.find(t => t.id === taskId);
        
        if (task) {
            // Verificar si ya hay una tarea marcada
            const completedTasks = planetData.tasks.filter(t => t.completed).length;
            
            if (task.completed) {
                // Desmarcar tarea
                task.completed = false;
                this.userData.points -= task.xp;
            } else {
                // Intentar marcar tarea
                if (completedTasks >= 1) {
                    // Mostrar easter egg warning
                    this.showEasterEggWarning();
                    return;
                } else {
                    // Marcar tarea
                    task.completed = true;
                    this.userData.points += task.xp;
                }
            }
            
            // Guardar en localStorage
            localStorage.setItem('userData', JSON.stringify(this.userData));
            
            // Verificar si se completó el planeta
            this.checkPlanetCompletion(planetId);
            
            // Actualizar UI
            this.updateUserInterface();
            this.updateRoadmapProgress();
            this.openPlanetModal(planetId); // Recargar modal
        }
    }
    
    showEasterEggWarning() {
        const warning = document.getElementById('easterEggWarning');
        warning.style.display = 'block';
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            warning.style.display = 'none';
        }, 3000);
    }

    checkPlanetCompletion(planetId) {
        const planetData = this.pythonRoadmap[planetId];
        const allTasksCompleted = planetData.tasks.every(task => task.completed);
        
        if (allTasksCompleted && planetData.status !== 'completed') {
            planetData.status = 'completed';
            
            // Desbloquear siguiente planeta
            this.unlockNextPlanet(planetId);
        }
    }

    unlockNextPlanet(completedPlanetId) {
        const planetOrder = ['fundamentals', 'control-flow', 'data-structures', 'functions', 'oop', 'modules', 'exceptions', 'file-io', 'web', 'data-science'];
        const currentIndex = planetOrder.indexOf(completedPlanetId);
        const nextIndex = currentIndex + 1;
        
        if (nextIndex < planetOrder.length) {
            const nextPlanetId = planetOrder[nextIndex];
            this.pythonRoadmap[nextPlanetId].status = 'in-progress';
            
            // Actualizar UI
            this.renderRoadmap();
        }
    }

    closePlanetModal() {
        const modal = document.getElementById('planetModal');
        modal.classList.remove('active');
        this.currentPlanetId = null;
    }

    startPlanetLearning() {
        if (this.currentPlanetId) {
            // Aquí iría la lógica para comenzar el aprendizaje del planeta
            alert(`¡Comenzando aprendizaje de ${this.pythonRoadmap[this.currentPlanetId].name}!`);
            this.closePlanetModal();
        }
    }

    getStatusText(status) {
        const statusMap = {
            'completed': 'Completado',
            'in-progress': 'En Progreso',
            'locked': 'Bloqueado'
        };
        return statusMap[status] || status;
    }

    openNoteModal(note = null) {
        const modal = document.getElementById('noteModal');
        const titleInput = document.getElementById('noteTitle');
        const modalTitle = document.getElementById('modalTitle');

        if (note) {
            modalTitle.textContent = 'Editar Nota';
            titleInput.value = note.title;
            this.quillEditor.root.innerHTML = note.content;
            this.currentEditingNote = note;
        } else {
            modalTitle.textContent = 'Nueva Nota';
            titleInput.value = '';
            this.quillEditor.setText('');
            this.currentEditingNote = null;
        }

        modal.classList.add('active');
    }

    closeNoteModal() {
        const modal = document.getElementById('noteModal');
        modal.classList.remove('active');
        this.currentEditingNote = null;
    }

    saveNote() {
        const title = document.getElementById('noteTitle').value.trim();
        const content = this.quillEditor.root.innerHTML;
        const tags = document.getElementById('noteTags').value.split(',').map(tag => tag.trim()).filter(tag => tag);

        if (!title) {
            alert('Por favor ingresa un título para la nota');
            return;
        }

        if (this.currentEditingNote) {
            // Editar nota existente
            this.currentEditingNote.title = title;
            this.currentEditingNote.content = content;
            this.currentEditingNote.tags = tags;
        } else {
            // Crear nueva nota
            const newNote = {
                id: Date.now(),
                title,
                content,
                tags,
                createdAt: new Date().toISOString()
            };
            this.notes.unshift(newNote);
        }

        localStorage.setItem('userNotes', JSON.stringify(this.notes));
        this.renderNotes();
        this.closeNoteModal();
    }

    editNote(note) {
        this.openNoteModal(note);
    }

    openResourceModal(resource) {
        const modal = document.getElementById('resourceModal');
        const videoFrame = document.getElementById('videoFrame');
        const resourceTitle = document.getElementById('resourceTitle');

        resourceTitle.textContent = resource.title;
        videoFrame.src = resource.url;

        modal.classList.add('active');
    }

    closeResourceModal() {
        const modal = document.getElementById('resourceModal');
        const videoFrame = document.getElementById('videoFrame');
        
        videoFrame.src = '';
        modal.classList.remove('active');
    }

    renderDashboard() {
        // El dashboard se renderiza automáticamente con el HTML
        // Solo necesitamos actualizar datos dinámicos
        this.updateUserInterface();
    }

    logout() {
        localStorage.removeItem('userData');
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('loginTimestamp');
        sessionStorage.clear();
        
        window.location.href = 'login.html';
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new Dashboard();
});
