// ===== DASHBOARD FUNCTIONALITY =====

// Datos de ejemplo para el dashboard
const mockData = {
    user: {
        name: "Explorador",
        email: "explorador@vmind.com",
        age: 25,
        points: 1250,
        streak: 7
    },
    progress: {
        completed: 12,
        inProgress: 3,
        total: 25,
        percentage: 48
    },
    roadmap: [
        {
            id: 1,
            title: "Fundamentos de Python",
            description: "Aprende los conceptos básicos de Python",
            status: "completed",
            difficulty: "easy",
            duration: "2 horas",
            resources: ["video", "ejercicios", "documentación"]
        },
        {
            id: 2,
            title: "Estructuras de Datos",
            description: "Listas, tuplas, diccionarios y sets",
            status: "completed",
            difficulty: "medium",
            duration: "3 horas",
            resources: ["video", "ejercicios", "documentación"]
        },
        {
            id: 3,
            title: "Funciones y Módulos",
            description: "Crear y usar funciones, importar módulos",
            status: "in-progress",
            difficulty: "medium",
            duration: "4 horas",
            resources: ["video", "ejercicios", "documentación"]
        },
        {
            id: 4,
            title: "Programación Orientada a Objetos",
            description: "Clases, objetos, herencia y polimorfismo",
            status: "pending",
            difficulty: "hard",
            duration: "6 horas",
            resources: ["video", "ejercicios", "documentación"]
        },
        {
            id: 5,
            title: "Manejo de Excepciones",
            description: "Try, except, finally y manejo de errores",
            status: "pending",
            difficulty: "medium",
            duration: "3 horas",
            resources: ["video", "ejercicios", "documentación"]
        }
    ],
    notes: [
        {
            id: 1,
            title: "Conceptos básicos de Python",
            content: "Variables, tipos de datos, operadores...",
            createdAt: "2024-01-15",
            updatedAt: "2024-01-15"
        },
        {
            id: 2,
            title: "Listas y diccionarios",
            content: "Métodos importantes de listas...",
            createdAt: "2024-01-16",
            updatedAt: "2024-01-16"
        }
    ],
    resources: [
        {
            id: 1,
            title: "Python para Principiantes",
            description: "Guía completa desde cero",
            category: "articulos",
            url: "#",
            saved: true
        },
        {
            id: 2,
            title: "Estructuras de Datos en Python",
            description: "Video tutorial explicativo",
            category: "videos",
            url: "#",
            saved: false
        },
        {
            id: 3,
            title: "Documentación Oficial",
            description: "Referencia completa de Python",
            category: "enlaces",
            url: "#",
            saved: true
        }
    ],
    activity: [
        {
            id: 1,
            type: "completed",
            text: "Completaste 'Fundamentos de Python'",
            time: "Hace 2 horas",
            icon: "✅"
        },
        {
            id: 2,
            type: "note",
            text: "Creaste una nueva nota",
            time: "Hace 1 día",
            icon: "📝"
        },
        {
            id: 3,
            type: "resource",
            text: "Guardaste un recurso",
            time: "Hace 2 días",
            icon: "📚"
        }
    ],
    weeklyActivity: [true, true, true, false, true, true, false] // Últimos 7 días
};

// Clase principal del Dashboard
class Dashboard {
    constructor() {
        this.currentView = 'dashboard';
        this.data = mockData;
        this.init();
    }

    init() {
        this.loadUserData();
        this.setupEventListeners();
        this.renderDashboard();
        this.renderRoadmap();
        this.renderNotes();
        this.renderResources();
        this.renderWeeklyActivity();
        this.renderRecentActivity();
        this.renderNextTasks();
        
        // La tarjeta de perfil inicia colapsada por defecto
        const profileCardTop = document.getElementById('profileCardTop');
        profileCardTop.classList.remove('expanded');
    }

    loadUserData() {
        // Cargar datos del usuario desde localStorage
        const userData = localStorage.getItem('userData');
        if (!userData) {
            // Si no hay datos de usuario, redirigir al login
            window.location.href = 'login.html';
            return;
        }
        
        try {
            const parsedUserData = JSON.parse(userData);
            this.data.user = parsedUserData;
            
            // Actualizar datos del usuario con información más completa si es necesario
            if (parsedUserData.id) {
                const fullUserData = TestUsers.getUserById(parsedUserData.id);
                if (fullUserData) {
                    this.data.user = { ...parsedUserData, ...fullUserData };
                }
            }
        } catch (error) {
            console.error('Error al parsear datos del usuario:', error);
            window.location.href = 'login.html';
            return;
        }
    }

    setupEventListeners() {
        // Toggle de la tarjeta de perfil
        document.getElementById('profileCardHeader').addEventListener('click', () => {
            this.toggleProfileCard();
        });

        // Navegación del sidebar
        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const view = e.currentTarget.dataset.view;
                this.switchView(view);
            });
        });

        // Acciones rápidas
        document.querySelectorAll('.action-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.switchView(view);
            });
        });

        // Cerrar sesión
        document.getElementById('sidebarLogoutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.logout();
        });

        // Modal de perfil
        document.querySelector('[data-view="perfil"]').addEventListener('click', (e) => {
            e.preventDefault();
            this.openProfileModal();
        });

        document.getElementById('closePerfilModal').addEventListener('click', () => {
            this.closeProfileModal();
        });

        document.getElementById('cancelProfile').addEventListener('click', () => {
            this.closeProfileModal();
        });

        document.getElementById('profileForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProfile();
        });

        // Nueva nota (desde vista notas)
        document.getElementById('newNoteBtn').addEventListener('click', () => {
            this.createNewNote();
        });

        // Continuar aprendizaje
        document.getElementById('continueLearning').addEventListener('click', () => {
            this.continueLearning();
        });

        // Filtro de recursos
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.filterResources(e.target.value);
        });
    }

    toggleProfileCard() {
        const profileCardTop = document.getElementById('profileCardTop');
        profileCardTop.classList.toggle('expanded');
    }



    switchView(view) {
        // Ocultar todas las vistas
        document.querySelectorAll('.view-content').forEach(content => {
            content.classList.remove('active');
        });

        // Remover clase active de todos los links
        document.querySelectorAll('.nav-item').forEach(link => {
            link.classList.remove('active');
        });

        // Mostrar vista seleccionada
        const targetView = document.getElementById(`${view}-view`);
        if (targetView) {
            targetView.classList.add('active');
        }

        // Activar link correspondiente
        const activeLink = document.querySelector(`[data-view="${view}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        this.currentView = view;
    }

    renderDashboard() {
        // Actualizar datos del usuario en el dashboard
        document.getElementById('userName').textContent = this.data.user.name;
        document.getElementById('userPoints').textContent = this.data.user.points.toLocaleString();
        document.getElementById('userStreak').textContent = `${this.data.user.streak} días`;

        // Actualizar datos del usuario en el sidebar
        document.getElementById('sidebarUserName').textContent = this.data.user.name;
        
        // Actualizar barra de XP
        const currentXP = this.data.user.points;
        const nextLevelXP = 2000; // XP necesaria para el siguiente nivel
        const xpProgress = (currentXP / nextLevelXP) * 100;
        const remainingXP = nextLevelXP - currentXP;
        
        document.getElementById('sidebarXP').textContent = currentXP.toLocaleString();
        document.getElementById('sidebarXPNext').textContent = nextLevelXP.toLocaleString();
        document.getElementById('sidebarXPFill').style.width = `${xpProgress}%`;
        document.getElementById('sidebarXPRemaining').textContent = `${remainingXP} XP para el siguiente nivel`;
        
        // Actualizar elementos de la tarjeta expandible
        document.getElementById('sidebarXP').textContent = currentXP.toLocaleString();
        document.getElementById('sidebarXPNext').textContent = nextLevelXP.toLocaleString();
        document.getElementById('sidebarXPFill').style.width = `${xpProgress}%`;

        // Actualizar progreso
        document.getElementById('mainProgress').textContent = `${this.data.progress.percentage}%`;
        document.getElementById('progressFill').style.width = `${this.data.progress.percentage}%`;
        document.getElementById('completedNodes').textContent = this.data.progress.completed;
        document.getElementById('inProgressNodes').textContent = this.data.progress.inProgress;
        document.getElementById('currentStreak').textContent = this.data.user.streak;
    }

    renderRoadmap() {
        const roadmapGrid = document.getElementById('roadmapGrid');
        roadmapGrid.innerHTML = '';

        this.data.roadmap.forEach(node => {
            const nodeElement = document.createElement('div');
            nodeElement.className = 'roadmap-node';
            nodeElement.innerHTML = `
                <div class="node-header">
                    <h3 class="node-title">${node.title}</h3>
                    <span class="node-status ${node.status}">${this.getStatusText(node.status)}</span>
                </div>
                <p class="node-description">${node.description}</p>
                <div class="node-meta">
                    <span>${node.duration}</span>
                    <span class="task-difficulty ${node.difficulty}">${this.getDifficultyText(node.difficulty)}</span>
                </div>
            `;
            roadmapGrid.appendChild(nodeElement);
        });
    }

    renderNotes() {
        const notasList = document.getElementById('notasList');
        notasList.innerHTML = '';

        this.data.notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note-item';
            noteElement.innerHTML = `
                <div class="note-title">${note.title}</div>
                <div class="note-preview">${note.content}</div>
                <div class="note-meta">
                    <span>Creada: ${this.formatDate(note.createdAt)}</span>
                    <span>Actualizada: ${this.formatDate(note.updatedAt)}</span>
                </div>
            `;
            notasList.appendChild(noteElement);
        });
    }

    renderResources() {
        const recursosGrid = document.getElementById('recursosGrid');
        recursosGrid.innerHTML = '';

        this.data.resources.forEach(resource => {
            const resourceElement = document.createElement('div');
            resourceElement.className = 'recurso-card';
            resourceElement.innerHTML = `
                <h3 class="recurso-title">${resource.title}</h3>
                <p class="recurso-description">${resource.description}</p>
                <div class="recurso-meta">
                    <span>${this.getCategoryText(resource.category)}</span>
                    <button class="save-recurso-btn ${resource.saved ? 'saved' : ''}" 
                            onclick="dashboard.toggleSaveResource(${resource.id})">
                        ${resource.saved ? 'Guardado' : 'Guardar'}
                    </button>
                </div>
            `;
            recursosGrid.appendChild(resourceElement);
        });
    }

    renderWeeklyActivity() {
        const calendar = document.getElementById('activityCalendar');
        calendar.innerHTML = '';

        const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        
        days.forEach((day, index) => {
            const dayElement = document.createElement('div');
            dayElement.className = `calendar-day ${this.data.weeklyActivity[index] ? 'active' : 'inactive'}`;
            dayElement.textContent = day;
            calendar.appendChild(dayElement);
        });
    }

    renderRecentActivity() {
        const activityList = document.getElementById('recentActivity');
        activityList.innerHTML = '';

        this.data.activity.forEach(activity => {
            const activityElement = document.createElement('div');
            activityElement.className = 'activity-item';
            activityElement.innerHTML = `
                <div class="activity-icon">${activity.icon}</div>
                <div class="activity-content">
                    <div class="activity-text">${activity.text}</div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            `;
            activityList.appendChild(activityElement);
        });
    }

    renderNextTasks() {
        const tasksList = document.getElementById('nextTasks');
        tasksList.innerHTML = '';

        const nextTasks = this.data.roadmap.filter(node => 
            node.status === 'pending' || node.status === 'in-progress'
        ).slice(0, 3);

        nextTasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task-item';
            taskElement.innerHTML = `
                <div class="task-icon">📚</div>
                <div class="task-info">
                    <div class="task-title">${task.title}</div>
                    <div class="task-meta">${task.duration} • ${this.getDifficultyText(task.difficulty)}</div>
                </div>
                <span class="task-difficulty ${task.difficulty}">${this.getDifficultyText(task.difficulty)}</span>
            `;
            tasksList.appendChild(taskElement);
        });
    }



    openProfileModal() {
        const modal = document.getElementById('perfilModal');
        const form = document.getElementById('profileForm');
        
        // Llenar formulario con datos actuales
        document.getElementById('profileName').value = this.data.user.name;
        document.getElementById('profileEmail').value = this.data.user.email;
        document.getElementById('profileAge').value = this.data.user.age;
        
        modal.classList.add('active');
    }

    closeProfileModal() {
        const modal = document.getElementById('perfilModal');
        modal.classList.remove('active');
    }

    saveProfile() {
        const formData = {
            name: document.getElementById('profileName').value,
            email: document.getElementById('profileEmail').value,
            age: parseInt(document.getElementById('profileAge').value)
        };

        // Actualizar datos
        this.data.user = { ...this.data.user, ...formData };
        
        // Guardar en localStorage
        localStorage.setItem('vmind_user', JSON.stringify(this.data.user));
        
        // Actualizar UI
        this.renderDashboard();
        this.closeProfileModal();
        
        // Mostrar mensaje de éxito
        this.showNotification('Perfil actualizado correctamente', 'success');
    }

    logout() {
        // Limpiar localStorage y sessionStorage
        localStorage.removeItem('userData');
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('loginTimestamp');
        sessionStorage.clear();
        
        // Redirigir al login
        window.location.href = 'login.html';
    }

    createNewNote() {
        const noteTitle = prompt('Título de la nota:');
        if (noteTitle) {
            const noteContent = prompt('Contenido de la nota:');
            if (noteContent) {
                const newNote = {
                    id: Date.now(),
                    title: noteTitle,
                    content: noteContent,
                    createdAt: new Date().toISOString().split('T')[0],
                    updatedAt: new Date().toISOString().split('T')[0]
                };
                
                this.data.notes.unshift(newNote);
                this.renderNotes();
                this.showNotification('Nota creada correctamente', 'success');
            }
        }
    }

    continueLearning() {
        const nextNode = this.data.roadmap.find(node => node.status === 'pending');
        if (nextNode) {
            this.showNotification(`Continuando con: ${nextNode.title}`, 'info');
            // Aquí iría la lógica para abrir el contenido del nodo
        } else {
            this.showNotification('¡Felicidades! Has completado todo el roadmap', 'success');
        }
    }

    toggleSaveResource(resourceId) {
        const resource = this.data.resources.find(r => r.id === resourceId);
        if (resource) {
            resource.saved = !resource.saved;
            this.renderResources();
            this.showNotification(
                resource.saved ? 'Recurso guardado' : 'Recurso eliminado de guardados',
                'info'
            );
        }
    }

    filterResources(category) {
        const recursosGrid = document.getElementById('recursosGrid');
        recursosGrid.innerHTML = '';

        const filteredResources = category 
            ? this.data.resources.filter(r => r.category === category)
            : this.data.resources;

        filteredResources.forEach(resource => {
            const resourceElement = document.createElement('div');
            resourceElement.className = 'recurso-card';
            resourceElement.innerHTML = `
                <h3 class="recurso-title">${resource.title}</h3>
                <p class="recurso-description">${resource.description}</p>
                <div class="recurso-meta">
                    <span>${this.getCategoryText(resource.category)}</span>
                    <button class="save-recurso-btn ${resource.saved ? 'saved' : ''}" 
                            onclick="dashboard.toggleSaveResource(${resource.id})">
                        ${resource.saved ? 'Guardado' : 'Guardar'}
                    </button>
                </div>
            `;
            recursosGrid.appendChild(resourceElement);
        });
    }

    // Métodos auxiliares
    getStatusText(status) {
        const statusMap = {
            'pending': 'Pendiente',
            'in-progress': 'En progreso',
            'completed': 'Completado'
        };
        return statusMap[status] || status;
    }

    getDifficultyText(difficulty) {
        const difficultyMap = {
            'easy': 'Fácil',
            'medium': 'Medio',
            'hard': 'Difícil'
        };
        return difficultyMap[difficulty] || difficulty;
    }

    getCategoryText(category) {
        const categoryMap = {
            'articulos': 'Artículo',
            'videos': 'Video',
            'pdfs': 'PDF',
            'enlaces': 'Enlace'
        };
        return categoryMap[category] || category;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES');
    }

    showNotification(message, type = 'info') {
        // Crear notificación temporal
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            z-index: 3000;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Inicializar dashboard cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new Dashboard();
});

// Estilos para animaciones de notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
