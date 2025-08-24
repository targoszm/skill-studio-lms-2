// MatDash LMS - Professional Learning Management System
// Main Application Class

class MatDashLMS {
    constructor() {
        this.currentView = 'dashboard';
        this.currentStep = 1;
        this.maxStep = 10;
        this.isDarkMode = false;
        this.charts = {};
        this.selectedAvatar = null;
        this.isInitialized = false;
        this.courseData = {};
        
        // Application data from provided JSON
        this.data = {
            courseTemplates: [
                {
                    id: "template_001",
                    name: "Corporate Training",
                    category: "Business",
                    description: "Professional corporate training with modern design",
                    slides: 12,
                    thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
                    features: ["Professional Design", "Charts & Graphs", "Team Photos"],
                    colors: ["#1976d2", "#ffffff", "#f5f5f5"]
                },
                {
                    id: "template_002",
                    name: "Educational Course",
                    category: "Education", 
                    description: "Student-friendly educational content template",
                    slides: 15,
                    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
                    features: ["Interactive Elements", "Progress Tracking", "Student-Friendly"],
                    colors: ["#4caf50", "#ffffff", "#e8f5e8"]
                },
                {
                    id: "template_003",
                    name: "Creative Workshop", 
                    category: "Creative",
                    description: "Bold creative workshop presentation",
                    slides: 10,
                    thumbnail: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop",
                    features: ["Bold Colors", "Creative Layouts", "Inspiration Focus"],
                    colors: ["#ff9800", "#ffffff", "#fff3e0"]
                },
                {
                    id: "template_004",
                    name: "Tech Innovation",
                    category: "Technology",
                    description: "Modern technology presentation template", 
                    slides: 14,
                    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
                    features: ["Modern Design", "Tech Graphics", "Code Examples"],
                    colors: ["#2196f3", "#ffffff", "#e3f2fd"]
                },
                {
                    id: "template_005",
                    name: "Healthcare Training",
                    category: "Healthcare",
                    description: "Medical and healthcare training template",
                    slides: 16,
                    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop", 
                    features: ["Medical Graphics", "Compliance Ready", "Patient Focus"],
                    colors: ["#00bcd4", "#ffffff", "#e0f2f1"]
                }
            ],
            avatars: [
                {
                    id: "avatar_001",
                    name: "Dr. Sarah Mitchell",
                    personality: "Professional Educator",
                    gender: "Female",
                    style: "Academic",
                    description: "Experienced professor with warm, authoritative presence",
                    languages: ["English", "Spanish", "French"],
                    thumbnail: "https://images.unsplash.com/photo-1559829412-65cef734b83e?w=300&h=400&fit=crop&crop=face",
                    voicePreview: "Clear, articulate, and engaging teaching style",
                    bestFor: ["Academic courses", "Professional training", "Detailed explanations"]
                },
                {
                    id: "avatar_002", 
                    name: "Marcus Johnson",
                    personality: "Friendly Instructor",
                    gender: "Male",
                    style: "Casual",
                    description: "Approachable instructor with engaging style",
                    languages: ["English", "German", "Italian"],
                    thumbnail: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face",
                    voicePreview: "Warm, conversational, and encouraging tone",
                    bestFor: ["Creative courses", "Skill tutorials", "Motivational content"]
                },
                {
                    id: "avatar_003",
                    name: "Elena Rodriguez", 
                    personality: "Business Executive",
                    gender: "Female",
                    style: "Corporate",
                    description: "Confident executive with authoritative presence",
                    languages: ["English", "Spanish", "Portuguese"],
                    thumbnail: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=400&fit=crop&crop=face",
                    voicePreview: "Confident, clear, and results-oriented delivery", 
                    bestFor: ["Corporate training", "Leadership courses", "Business strategy"]
                },
                {
                    id: "avatar_004",
                    name: "David Chen",
                    personality: "Tech Expert",
                    gender: "Male", 
                    style: "Technical",
                    description: "Tech-savvy instructor for complex topics",
                    languages: ["English", "Mandarin", "Japanese"],
                    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face",
                    voicePreview: "Precise, methodical, and detail-oriented",
                    bestFor: ["Technical training", "Software tutorials", "Data analysis"]
                }
            ],
            analytics: {
                totalStudents: 15420,
                activeCourses: 89,
                completionRate: 78.5,
                avgRating: 4.7,
                totalRevenue: 245000,
                monthlyGrowth: 12.5,
                recentActivity: [
                    { user: "Sarah Johnson", action: "completed", course: "Machine Learning Basics", time: "2 hours ago" },
                    { user: "Mike Chen", action: "started", course: "Digital Marketing", time: "4 hours ago" },
                    { user: "Emma Davis", action: "achieved 95% in", course: "UI/UX Fundamentals", time: "6 hours ago" }
                ]
            },
            courses: [
                {
                    id: "course_001",
                    title: "Machine Learning Fundamentals", 
                    description: "Comprehensive introduction to machine learning concepts and practical applications",
                    instructor: "Dr. Sarah Mitchell",
                    category: "Technology",
                    students: 1247,
                    rating: 4.8,
                    level: "intermediate",
                    duration: "8 weeks",
                    status: "Active"
                },
                {
                    id: "course_002",
                    title: "Digital Marketing Strategy",
                    description: "Master modern digital marketing techniques and strategies", 
                    instructor: "Marcus Johnson",
                    category: "Business", 
                    students: 856,
                    rating: 4.6,
                    level: "beginner",
                    duration: "6 weeks",
                    status: "Active"
                },
                {
                    id: "course_003",
                    title: "UI/UX Design Principles",
                    description: "Learn to create beautiful and functional user interfaces",
                    instructor: "Elena Rodriguez",
                    category: "Design",
                    students: 542, 
                    rating: 4.9,
                    level: "intermediate",
                    duration: "10 weeks", 
                    status: "Active"
                },
                {
                    id: "course_004",
                    title: "Data Science with Python",
                    description: "Advanced data science techniques using Python and modern libraries",
                    instructor: "David Chen",
                    category: "Technology",
                    students: 1089,
                    rating: 4.7, 
                    level: "advanced",
                    duration: "12 weeks",
                    status: "Active"
                }
            ],
            students: [
                {
                    id: "student_001",
                    name: "Alex Thompson",
                    email: "alex.thompson@email.com",
                    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
                    enrolledCourses: 3,
                    totalProgress: 74.5,
                    joinDate: "2024-01-15", 
                    status: "Active"
                },
                {
                    id: "student_002",
                    name: "Emily Rodriguez",
                    email: "emily.rodriguez@email.com",
                    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
                    enrolledCourses: 2, 
                    totalProgress: 95.2,
                    joinDate: "2024-01-08",
                    status: "Active"
                },
                {
                    id: "student_003", 
                    name: "Michael Chen",
                    email: "michael.chen@email.com",
                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
                    enrolledCourses: 4,
                    totalProgress: 62.8,
                    joinDate: "2024-02-01",
                    status: "Active"
                },
                {
                    id: "student_004",
                    name: "Sarah Johnson", 
                    email: "sarah.johnson@email.com",
                    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
                    enrolledCourses: 2,
                    totalProgress: 34.2,
                    joinDate: "2024-02-20",
                    status: "Active"
                }
            ]
        };

        this.init();
    }

    // Initialize Application
    init() {
        console.log('Initializing MatDash LMS...');
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        this.setupEventListeners();
        this.setupThemeToggle();
        this.setupNavigation();
        this.setupModals();
        this.setupWizard();
        this.renderDashboard();
        this.showView('dashboard');
        this.isInitialized = true;
        
        // Show welcome notification
        setTimeout(() => {
            this.showToast('success', 'Welcome to MatDash LMS', 'Your professional learning platform is ready!');
        }, 1000);
        
        console.log('MatDash LMS initialized successfully');
    }

    // Navigation System
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item[data-view]');
        
        navItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            if (link) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const view = item.getAttribute('data-view');
                    this.navigateToView(view);
                });
            }
        });

        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                const sidebar = document.getElementById('sidebar');
                if (sidebar) {
                    sidebar.classList.toggle('open');
                }
            });
        }
    }

    navigateToView(viewName) {
        console.log(`Navigating to: ${viewName}`);
        
        // Update navigation state
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeNavItem = document.querySelector(`[data-view="${viewName}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }

        // Update breadcrumb
        const currentPage = document.getElementById('current-page');
        if (currentPage) {
            const pageTitle = viewName.charAt(0).toUpperCase() + viewName.slice(1).replace('-', ' ');
            currentPage.textContent = pageTitle;
        }

        // Show/hide views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });

        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) {
            targetView.classList.add('active');
            this.currentView = viewName;
            
            // Load view-specific content
            this.loadViewContent(viewName);
            
            // Close sidebar on mobile
            const sidebar = document.getElementById('sidebar');
            if (sidebar) {
                sidebar.classList.remove('open');
            }
        }
    }

    loadViewContent(viewName) {
        switch(viewName) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'courses':
                this.renderCourses();
                break;
            case 'create-course':
                this.renderCreateCourse();
                break;
            case 'templates':
                this.renderTemplates();
                break;
            case 'students':
                this.renderStudents();
                break;
            case 'avatars':
                this.renderAvatars();
                break;
            case 'analytics':
                this.renderAnalytics();
                break;
        }
    }

    showView(viewName) {
        this.navigateToView(viewName);
    }

    // Dashboard Rendering
    renderDashboard() {
        console.log('Rendering dashboard...');
        this.renderDashboardCharts();
        this.renderRecentActivity();
    }

    renderDashboardCharts() {
        // Clear existing charts
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.destroy === 'function') {
                chart.destroy();
            }
        });
        this.charts = {};

        // Wait for Chart.js to be available
        if (typeof Chart === 'undefined') {
            setTimeout(() => this.renderDashboardCharts(), 100);
            return;
        }

        // Enrollments Chart
        const enrollmentsCtx = document.getElementById('enrollments-chart');
        if (enrollmentsCtx) {
            this.charts.enrollments = new Chart(enrollmentsCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Enrollments',
                        data: [320, 420, 520, 680, 750, 890],
                        borderColor: '#1976d2',
                        backgroundColor: 'rgba(25, 118, 210, 0.1)',
                        tension: 0.4,
                        fill: true,
                        borderWidth: 3
                    }, {
                        label: 'Completions', 
                        data: [280, 380, 440, 590, 680, 780],
                        borderColor: '#4caf50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        tension: 0.4,
                        fill: true,
                        borderWidth: 3
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            align: 'end'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: '#f1f4f8'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }

        // Categories Chart
        const categoriesCtx = document.getElementById('categories-chart');
        if (categoriesCtx) {
            this.charts.categories = new Chart(categoriesCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Technology', 'Business', 'Design', 'Healthcare', 'Creative'],
                    datasets: [{
                        data: [25, 18, 15, 12, 10],
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
                        borderWidth: 0,
                        cutout: '60%'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true
                            }
                        }
                    }
                }
            });
        }
    }

    renderRecentActivity() {
        const activityList = document.getElementById('activity-list');
        if (!activityList) return;

        const activities = this.data.analytics.recentActivity;
        const avatars = [
            'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=44&h=44&fit=crop&crop=face',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=44&h=44&fit=crop&crop=face',
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=44&h=44&fit=crop&crop=face'
        ];

        const activityHTML = activities.map((activity, index) => `
            <div class="activity-item">
                <img src="${avatars[index % avatars.length]}" alt="${activity.user}" class="activity-avatar">
                <div class="activity-content">
                    <p class="activity-text"><strong>${activity.user}</strong> ${activity.action} <em>${activity.course}</em></p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            </div>
        `).join('');

        activityList.innerHTML = activityHTML;
    }

    // Create Course Wizard
    setupWizard() {
        const nextBtn = document.getElementById('next-step-btn');
        const prevBtn = document.getElementById('prev-step-btn');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextStep());
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevStep());
        }

        // Setup step click navigation
        document.addEventListener('click', (e) => {
            if (e.target.closest('.step')) {
                const step = e.target.closest('.step');
                const stepNum = parseInt(step.getAttribute('data-step'));
                if (stepNum && stepNum !== this.currentStep) {
                    this.currentStep = stepNum;
                    this.updateWizardStep();
                    this.renderWizardContent();
                }
            }
        });
    }

    renderCreateCourse() {
        console.log('Rendering create course wizard...');
        this.currentStep = 1;
        this.updateWizardStep();
        this.renderWizardContent();
    }

    renderWizardContent() {
        // Clear all step content first
        document.querySelectorAll('.step-content').forEach(content => {
            content.remove();
        });

        const wizardContent = document.querySelector('.wizard-content');
        if (!wizardContent) return;

        let stepHTML = '';

        switch(this.currentStep) {
            case 1:
                stepHTML = `
                    <div class="step-content active" id="step-1">
                        <div class="form-card">
                            <div class="card-header">
                                <h3 class="card-title">Course Information</h3>
                                <p class="card-subtitle">Enter basic details about your course</p>
                            </div>
                            <div class="card-content">
                                <form class="course-form">
                                    <div class="form-row">
                                        <div class="form-group">
                                            <label class="form-label">Course Title *</label>
                                            <input type="text" class="form-control" id="course-title" placeholder="Enter course title" value="${this.courseData.title || ''}">
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label">Category</label>
                                            <select class="form-control" id="course-category">
                                                <option value="business" ${this.courseData.category === 'business' ? 'selected' : ''}>Business</option>
                                                <option value="technology" ${this.courseData.category === 'technology' ? 'selected' : ''}>Technology</option>
                                                <option value="education" ${this.courseData.category === 'education' ? 'selected' : ''}>Education</option>
                                                <option value="creative" ${this.courseData.category === 'creative' ? 'selected' : ''}>Creative</option>
                                                <option value="healthcare" ${this.courseData.category === 'healthcare' ? 'selected' : ''}>Healthcare</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label">Course Description *</label>
                                        <textarea class="form-control" id="course-description" rows="4" placeholder="Describe what students will learn">${this.courseData.description || ''}</textarea>
                                    </div>
                                    
                                    <div class="form-row">
                                        <div class="form-group">
                                            <label class="form-label">Duration</label>
                                            <input type="text" class="form-control" id="course-duration" placeholder="e.g., 6 weeks" value="${this.courseData.duration || ''}">
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label">Difficulty Level</label>
                                            <select class="form-control" id="course-level">
                                                <option value="beginner" ${this.courseData.level === 'beginner' ? 'selected' : ''}>Beginner</option>
                                                <option value="intermediate" ${this.courseData.level === 'intermediate' ? 'selected' : ''}>Intermediate</option>
                                                <option value="advanced" ${this.courseData.level === 'advanced' ? 'selected' : ''}>Advanced</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                `;
                break;

            case 2:
                stepHTML = `
                    <div class="step-content active" id="step-2">
                        <div class="form-card">
                            <div class="card-header">
                                <h3 class="card-title">Choose Your AI Avatar</h3>
                                <p class="card-subtitle">Select an AI avatar that will present your course content</p>
                            </div>
                            <div class="card-content">
                                <div class="avatar-grid" id="wizard-avatar-grid">
                                    ${this.data.avatars.map(avatar => `
                                        <div class="avatar-option ${this.selectedAvatar?.id === avatar.id ? 'selected' : ''}" data-avatar-id="${avatar.id}">
                                            <img src="${avatar.thumbnail}" alt="${avatar.name}">
                                            <div class="avatar-info">
                                                <div class="avatar-name">${avatar.name}</div>
                                                <div class="avatar-style">${avatar.style}</div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;

            case 3:
                stepHTML = `
                    <div class="step-content active" id="step-3">
                        <div class="form-card">
                            <div class="card-header">
                                <h3 class="card-title">Choose Template</h3>
                                <p class="card-subtitle">Select a professional template for your course</p>
                            </div>
                            <div class="card-content">
                                <div class="templates-grid">
                                    ${this.data.courseTemplates.slice(0, 3).map(template => `
                                        <div class="template-card" data-template-id="${template.id}">
                                            <img src="${template.thumbnail}" alt="${template.name}" class="template-thumbnail">
                                            <div class="template-body">
                                                <h3 class="template-title">${template.name}</h3>
                                                <p class="template-description">${template.description}</p>
                                                <div class="template-meta">
                                                    <span>${template.slides} slides</span>
                                                    <span>${template.category}</span>
                                                </div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;

            case 4:
                stepHTML = `
                    <div class="step-content active" id="step-4">
                        <div class="form-card">
                            <div class="card-header">
                                <h3 class="card-title">Upload Content</h3>
                                <p class="card-subtitle">Upload your course materials (PDF, PowerPoint, or Video)</p>
                            </div>
                            <div class="card-content">
                                <div class="upload-area" style="border: 2px dashed var(--border); border-radius: var(--radius-lg); padding: var(--space-2xl); text-align: center; background: var(--surface-hover);">
                                    <div style="font-size: 48px; color: var(--text-disabled); margin-bottom: var(--space-md);">📁</div>
                                    <h4>Drag and drop your files here</h4>
                                    <p style="color: var(--text-secondary); margin: var(--space-sm) 0;">or click to browse</p>
                                    <button class="btn btn-primary" style="margin-top: var(--space-md);">Browse Files</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;

            case 5:
                stepHTML = `
                    <div class="step-content active" id="step-5">
                        <div class="form-card">
                            <div class="card-header">
                                <h3 class="card-title">Course Builder</h3>
                                <p class="card-subtitle">Organize and edit your course content with drag-and-drop interface</p>
                            </div>
                            <div class="card-content">
                                <div style="display: grid; grid-template-columns: 1fr 2fr; gap: var(--space-lg); min-height: 400px;">
                                    <div style="border: 1px solid var(--border); border-radius: var(--radius-lg); padding: var(--space-lg);">
                                        <h4>Course Outline</h4>
                                        <div style="margin-top: var(--space-md);">
                                            <div style="padding: var(--space-sm); background: var(--surface-hover); border-radius: var(--radius-md); margin-bottom: var(--space-sm);">📑 Introduction</div>
                                            <div style="padding: var(--space-sm); background: var(--surface-hover); border-radius: var(--radius-md); margin-bottom: var(--space-sm);">📚 Chapter 1</div>
                                            <div style="padding: var(--space-sm); background: var(--surface-hover); border-radius: var(--radius-md); margin-bottom: var(--space-sm);">📚 Chapter 2</div>
                                            <div style="padding: var(--space-sm); background: var(--surface-hover); border-radius: var(--radius-md); margin-bottom: var(--space-sm);">✅ Summary</div>
                                        </div>
                                    </div>
                                    <div style="border: 1px solid var(--border); border-radius: var(--radius-lg); padding: var(--space-lg); display: flex; align-items: center; justify-content: center; background: var(--surface-hover);">
                                        <div style="text-align: center; color: var(--text-secondary);">
                                            <div style="font-size: 48px; margin-bottom: var(--space-md);">🎨</div>
                                            <h4>Slide Editor</h4>
                                            <p>Select a slide to edit</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;

            case 6:
                stepHTML = `
                    <div class="step-content active" id="step-6">
                        <div class="form-card">
                            <div class="card-header">
                                <h3 class="card-title">Create Assessments</h3>
                                <p class="card-subtitle">Build quizzes and assessments with branching logic</p>
                            </div>
                            <div class="card-content">
                                <div class="form-group">
                                    <label class="form-label">Assessment Type</label>
                                    <select class="form-control">
                                        <option>Multiple Choice Quiz</option>
                                        <option>True/False Questions</option>
                                        <option>Essay Questions</option>
                                        <option>Practical Assignment</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Question 1</label>
                                    <input type="text" class="form-control" placeholder="Enter your question">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Answer Options</label>
                                    <input type="text" class="form-control" placeholder="Option A" style="margin-bottom: var(--space-sm);">
                                    <input type="text" class="form-control" placeholder="Option B" style="margin-bottom: var(--space-sm);">
                                    <input type="text" class="form-control" placeholder="Option C" style="margin-bottom: var(--space-sm);">
                                    <input type="text" class="form-control" placeholder="Option D">
                                </div>
                                <button class="btn btn-outline">Add Question</button>
                            </div>
                        </div>
                    </div>
                `;
                break;

            case 7:
                stepHTML = `
                    <div class="step-content active" id="step-7">
                        <div class="form-card">
                            <div class="card-header">
                                <h3 class="card-title">Course Preview</h3>
                                <p class="card-subtitle">Preview your course before generating the AI avatar</p>
                            </div>
                            <div class="card-content">
                                <div style="background: #000; border-radius: var(--radius-lg); aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; color: white; margin-bottom: var(--space-lg);">
                                    <div style="text-align: center;">
                                        <div style="font-size: 48px; margin-bottom: var(--space-md);">▶️</div>
                                        <h4>Course Preview</h4>
                                        <p>Click to preview your course content</p>
                                    </div>
                                </div>
                                <div style="display: flex; gap: var(--space-md); justify-content: center;">
                                    <button class="btn btn-outline">Edit Course</button>
                                    <button class="btn btn-primary">Continue</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;

            case 8:
                stepHTML = `
                    <div class="step-content active" id="step-8">
                        <div class="form-card">
                            <div class="card-header">
                                <h3 class="card-title">Generate AI Avatar</h3>
                                <p class="card-subtitle">Create your AI-powered video presentation</p>
                            </div>
                            <div class="card-content">
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-lg);">
                                    <div>
                                        <h4>Selected Avatar</h4>
                                        <div style="text-align: center; padding: var(--space-lg);">
                                            ${this.selectedAvatar ? `
                                                <img src="${this.selectedAvatar.thumbnail}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin-bottom: var(--space-md);">
                                                <h5>${this.selectedAvatar.name}</h5>
                                                <p style="color: var(--text-secondary);">${this.selectedAvatar.style}</p>
                                            ` : `
                                                <div style="color: var(--text-secondary);">
                                                    <div style="font-size: 48px; margin-bottom: var(--space-md);">👤</div>
                                                    <p>No avatar selected</p>
                                                </div>
                                            `}
                                        </div>
                                    </div>
                                    <div>
                                        <h4>Generation Settings</h4>
                                        <div class="form-group">
                                            <label class="form-label">Voice Style</label>
                                            <select class="form-control">
                                                <option>Professional</option>
                                                <option>Conversational</option>
                                                <option>Enthusiastic</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label">Language</label>
                                            <select class="form-control">
                                                <option>English</option>
                                                <option>Spanish</option>
                                                <option>French</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div style="text-align: center; margin-top: var(--space-lg);">
                                    <button class="btn btn-primary" onclick="lms.generateAvatar()">Generate Avatar Video</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;

            case 9:
                stepHTML = `
                    <div class="step-content active" id="step-9">
                        <div class="form-card">
                            <div class="card-header">
                                <h3 class="card-title">Avatar Preview</h3>
                                <p class="card-subtitle">Review your AI-generated avatar before publishing</p>
                            </div>
                            <div class="card-content">
                                <div id="avatar-preview" style="background: #000; border-radius: var(--radius-lg); aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; color: white; margin-bottom: var(--space-lg);">
                                    <div style="text-align: center;">
                                        <div style="font-size: 48px; margin-bottom: var(--space-md);">▶️</div>
                                        <p>Avatar preview will appear here after generation</p>
                                    </div>
                                </div>
                                <div style="display: flex; gap: var(--space-md); justify-content: center;">
                                    <button class="btn btn-primary" onclick="lms.nextStep()">Continue</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;

            case 10:
                stepHTML = `
                    <div class="step-content active" id="step-10">
                        <div class="form-card">
                            <div class="card-header">
                                <h3 class="card-title">Publish Avatar</h3>
                                <p class="card-subtitle">Make your avatar available for courses</p>
                            </div>
                            <div class="card-content" style="text-align: center;">
                                <p style="margin-bottom: var(--space-lg);">Your avatar is ready to be published.</p>
                                <button class="btn btn-primary">Publish Avatar</button>
                            </div>
                        </div>
                    </div>
                `;
                break;

            default:
                stepHTML = `
                    <div class="step-content active">
                        <div style="text-align: center; padding: var(--space-2xl);">
                            <h3>Step ${this.currentStep}</h3>
                            <p>This step content will be implemented soon.</p>
                        </div>
                    </div>
                `;
        }

        // Insert the new step content
        const navigationElement = wizardContent.querySelector('.wizard-navigation');
        if (navigationElement) {
            navigationElement.insertAdjacentHTML('beforebegin', stepHTML);
        } else {
            wizardContent.insertAdjacentHTML('beforeend', stepHTML);
        }

        // Setup avatar selection for step 2
        if (this.currentStep === 2) {
            this.setupWizardAvatarSelection();
        }
    }

    setupWizardAvatarSelection() {
        document.querySelectorAll('#wizard-avatar-grid .avatar-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('#wizard-avatar-grid .avatar-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                option.classList.add('selected');
                const avatarId = option.getAttribute('data-avatar-id');
                this.selectedAvatar = this.data.avatars.find(a => a.id === avatarId);
                this.showToast('success', 'Avatar Selected', `${this.selectedAvatar.name} selected`);
            });
        });
    }

    nextStep() {
        if (this.currentStep < this.maxStep) {
            // Validate current step
            if (this.validateCurrentStep()) {
                this.currentStep++;
                this.updateWizardStep();
                this.renderWizardContent();
                this.showToast('info', 'Step Complete', `Proceeding to step ${this.currentStep}`);
            }
        } else {
            this.completeWizard();
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateWizardStep();
            this.renderWizardContent();
        }
    }

    validateCurrentStep() {
        switch(this.currentStep) {
            case 1:
                const title = document.getElementById('course-title')?.value;
                const description = document.getElementById('course-description')?.value;
                if (!title || !description) {
                    this.showToast('error', 'Validation Error', 'Please fill in required fields');
                    return false;
                }
                this.courseData.title = title;
                this.courseData.description = description;
                this.courseData.category = document.getElementById('course-category')?.value;
                this.courseData.duration = document.getElementById('course-duration')?.value;
                this.courseData.level = document.getElementById('course-level')?.value;
                return true;
            case 2:
                if (!this.selectedAvatar) {
                    this.showToast('error', 'Avatar Required', 'Please select an avatar');
                    return false;
                }
                return true;
            default:
                return true;
        }
    }

    updateWizardStep() {
        // Update step indicator
        const stepIndicator = document.getElementById('step-indicator');
        if (stepIndicator) {
            stepIndicator.textContent = `Step ${this.currentStep} of ${this.maxStep}`;
        }

        // Update step visual state
        document.querySelectorAll('.step').forEach(step => {
            const stepNum = parseInt(step.getAttribute('data-step'));
            step.classList.remove('active', 'completed');
            
            if (stepNum === this.currentStep) {
                step.classList.add('active');
            } else if (stepNum < this.currentStep) {
                step.classList.add('completed');
            }
        });

        // Update navigation buttons
        const prevBtn = document.getElementById('prev-step-btn');
        const nextBtn = document.getElementById('next-step-btn');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentStep === 1;
        }
        
        if (nextBtn) {
            if (this.currentStep === this.maxStep) {
                nextBtn.innerHTML = 'Publish Avatar <span class="material-icons">publish</span>';
            } else {
                nextBtn.innerHTML = 'Next <span class="material-icons">arrow_forward</span>';
            }
        }
    }

    completeWizard() {
        this.showToast('success', 'Course Created!', 'Your course has been successfully created');
        setTimeout(() => {
            this.navigateToView('courses');
        }, 2000);
    }

    // Templates Rendering
    renderTemplates() {
        console.log('Rendering templates...');
        
        const templatesGrid = document.getElementById('templates-grid');
        if (!templatesGrid) return;

        const templatesHTML = this.data.courseTemplates.map(template => `
            <div class="template-card" data-template-id="${template.id}">
                <img src="${template.thumbnail}" alt="${template.name}" class="template-thumbnail">
                <div class="template-body">
                    <h3 class="template-title">${template.name}</h3>
                    <p class="template-description">${template.description}</p>
                    <div class="template-meta">
                        <span>${template.slides} slides</span>
                        <span>${template.category}</span>
                    </div>
                    <div class="template-features">
                        ${template.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        templatesGrid.innerHTML = templatesHTML;

        // Setup template selection
        document.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', () => {
                const templateId = card.getAttribute('data-template-id');
                const template = this.data.courseTemplates.find(t => t.id === templateId);
                this.showToast('success', 'Template Selected', `${template.name} template selected`);
            });
        });
    }

    // Courses Management
    renderCourses() {
        console.log('Rendering courses...');
        
        const coursesGrid = document.getElementById('courses-grid');
        if (!coursesGrid) return;

        const coursesHTML = this.data.courses.map(course => `
            <div class="course-card" data-course-id="${course.id}">
                <div class="course-header">
                    <span class="material-icons">library_books</span>
                </div>
                <div class="course-body">
                    <h3 class="course-title">${course.title}</h3>
                    <p class="course-description">${course.description}</p>
                    
                    <div class="course-meta">
                        <span class="course-level ${course.level}">${course.level}</span>
                        <div class="course-rating">
                            <span class="material-icons">star</span>
                            <span>${course.rating}</span>
                        </div>
                    </div>
                    
                    <div class="course-stats">
                        <span>${course.students.toLocaleString()} students</span>
                        <span>${course.duration}</span>
                    </div>
                    
                    <div class="course-actions">
                        <button class="btn btn-outline course-edit-btn" data-course-id="${course.id}">
                            <span class="material-icons">edit</span>
                            Edit
                        </button>
                        <button class="btn btn-primary course-view-btn" data-course-id="${course.id}">
                            <span class="material-icons">visibility</span>
                            View
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        coursesGrid.innerHTML = coursesHTML;
        this.setupCourseActions();
    }

    setupCourseActions() {
        document.querySelectorAll('.course-edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const courseId = btn.getAttribute('data-course-id');
                const course = this.data.courses.find(c => c.id === courseId);
                this.showToast('info', 'Edit Course', `Opening editor for: ${course.title}`);
            });
        });

        document.querySelectorAll('.course-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const courseId = btn.getAttribute('data-course-id');
                const course = this.data.courses.find(c => c.id === courseId);
                this.showToast('info', 'View Course', `Viewing: ${course.title}`);
            });
        });
    }

    // Students Management
    renderStudents() {
        console.log('Rendering students...');
        
        const studentsTableBody = document.getElementById('students-table-body');
        if (!studentsTableBody) return;

        const studentsHTML = this.data.students.map(student => `
            <tr data-student-id="${student.id}">
                <td>
                    <div class="student-info">
                        <img src="${student.avatar}" alt="${student.name}" class="student-avatar">
                        <div class="student-details">
                            <div class="student-name">${student.name}</div>
                            <div class="student-email">${student.email}</div>
                        </div>
                    </div>
                </td>
                <td>${student.email}</td>
                <td>${student.enrolledCourses}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${student.totalProgress}%"></div>
                        </div>
                        <span style="font-size: 0.75rem; color: var(--text-secondary);">${student.totalProgress}%</span>
                    </div>
                </td>
                <td>${new Date(student.joinDate).toLocaleDateString()}</td>
                <td>
                    <span class="status-badge ${student.status.toLowerCase()}">${student.status}</span>
                </td>
            </tr>
        `).join('');

        studentsTableBody.innerHTML = studentsHTML;
        this.setupStudentSearch();
    }

    setupStudentSearch() {
        const searchInput = document.getElementById('student-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const rows = document.querySelectorAll('#students-table-body tr');
                
                rows.forEach(row => {
                    const studentId = row.getAttribute('data-student-id');
                    const student = this.data.students.find(s => s.id === studentId);
                    
                    if (student) {
                        const matches = student.name.toLowerCase().includes(searchTerm) || 
                                       student.email.toLowerCase().includes(searchTerm);
                        row.style.display = matches ? '' : 'none';
                    }
                });
            });
        }
    }

    // Avatars Management
    renderAvatars() {
        console.log('Rendering avatars...');
        
        const avatarGrid = document.getElementById('avatar-grid');
        if (!avatarGrid) return;

        const avatarsHTML = this.data.avatars.map(avatar => `
            <div class="avatar-option" data-avatar-id="${avatar.id}">
                <img src="${avatar.thumbnail}" alt="${avatar.name}">
                <div class="avatar-info">
                    <div class="avatar-name">${avatar.name}</div>
                    <div class="avatar-style">${avatar.style}</div>
                </div>
            </div>
        `).join('');

        avatarGrid.innerHTML = avatarsHTML;
        this.setupAvatarSelection();
    }

    setupAvatarSelection() {
        document.querySelectorAll('#avatar-grid .avatar-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('#avatar-grid .avatar-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                option.classList.add('selected');
                const avatarId = option.getAttribute('data-avatar-id');
                this.selectedAvatar = this.data.avatars.find(avatar => avatar.id === avatarId);
                
                // Update language options
                this.updateLanguageOptions();
                this.showToast('success', 'Avatar Selected', `${this.selectedAvatar.name} has been selected`);
            });
        });
    }

    updateLanguageOptions() {
        const languageSelect = document.getElementById('avatar-language');
        if (languageSelect && this.selectedAvatar) {
            languageSelect.innerHTML = this.selectedAvatar.languages.map(lang => 
                `<option value="${lang.toLowerCase()}">${lang}</option>`
            ).join('');
        }
    }

    // Analytics Rendering  
    renderAnalytics() {
        console.log('Rendering analytics...');
        this.renderAnalyticsCharts();
        this.renderCoursePerformance();
    }

    renderAnalyticsCharts() {
        if (typeof Chart === 'undefined') {
            setTimeout(() => this.renderAnalyticsCharts(), 100);
            return;
        }

        const progressCtx = document.getElementById('progress-trends-chart');
        if (progressCtx) {
            if (this.charts.progressTrends) {
                this.charts.progressTrends.destroy();
            }
            
            this.charts.progressTrends = new Chart(progressCtx, {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
                    datasets: [{
                        label: 'Average Progress',
                        data: [65, 72, 78, 82, 85, 88],
                        borderColor: '#1976d2',
                        backgroundColor: 'rgba(25, 118, 210, 0.1)',
                        tension: 0.4,
                        fill: true,
                        borderWidth: 3
                    }, {
                        label: 'Completion Rate',
                        data: [45, 52, 61, 68, 75, 78],
                        borderColor: '#4caf50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        tension: 0.4,
                        fill: true,
                        borderWidth: 3
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            grid: {
                                color: '#f1f4f8'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }
    }

    renderCoursePerformance() {
        const performanceContainer = document.getElementById('course-performance');
        if (!performanceContainer) return;

        const performanceHTML = this.data.courses.slice(0, 5).map(course => `
            <div class="performance-item">
                <div>
                    <div class="performance-course">${course.title}</div>
                    <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px;">
                        ${course.students} students enrolled
                    </div>
                </div>
                <div class="performance-score">${(course.rating * 20).toFixed(1)}%</div>
            </div>
        `).join('');

        performanceContainer.innerHTML = performanceHTML;
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Create Course Button
        const createCourseBtn = document.getElementById('create-course-btn');
        if (createCourseBtn) {
            createCourseBtn.addEventListener('click', () => {
                this.navigateToView('create-course');
            });
        }

        // Generate Avatar Button
        const generateAvatarBtn = document.getElementById('generate-avatar-btn');
        if (generateAvatarBtn) {
            generateAvatarBtn.addEventListener('click', () => {
                this.generateAvatar();
            });
        }

        // Add objective button functionality
        window.addObjective = () => {
            const objectivesList = document.getElementById('objectives-list');
            if (objectivesList) {
                const newObjective = document.createElement('div');
                newObjective.className = 'objective-item';
                newObjective.innerHTML = `
                    <input type="text" class="form-control" placeholder="Enter learning objective">
                    <button type="button" class="btn btn-outline btn-sm" onclick="removeObjective(this)">
                        <span class="material-icons">remove</span>
                    </button>
                `;
                objectivesList.appendChild(newObjective);
            }
        };

        window.removeObjective = (btn) => {
            btn.closest('.objective-item').remove();
        };
    }

    // Theme Toggle
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        const themeToggle = document.getElementById('theme-toggle');
        
        if (this.isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (themeToggle) {
                themeToggle.querySelector('.material-icons').textContent = 'light_mode';
            }
            this.showToast('info', 'Theme Changed', 'Switched to dark mode');
        } else {
            document.documentElement.removeAttribute('data-theme');
            if (themeToggle) {
                themeToggle.querySelector('.material-icons').textContent = 'dark_mode';
            }
            this.showToast('info', 'Theme Changed', 'Switched to light mode');
        }
    }

    // Modal Management
    setupModals() {
        // Modal close functionality
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay') || 
                e.target.classList.contains('modal-close')) {
                this.closeAllModals();
            }
        });

        // Prevent modal content clicks from closing modal
        document.querySelectorAll('.modal-content').forEach(content => {
            content.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
    }

    // Avatar Generation
    generateAvatar() {
        if (!this.selectedAvatar) {
            this.showToast('error', 'No Avatar Selected', 'Please select an avatar first');
            return;
        }

        const script = document.getElementById('avatar-script')?.value;
        if (!script || script.trim().length === 0) {
            this.showToast('error', 'No Script', 'Please enter a script for the avatar');
            return;
        }

        this.showModal('progress-modal');
        this.simulateAvatarGeneration();
    }

    simulateAvatarGeneration() {
        const progressFill = document.getElementById('progress-fill');
        const progressStatus = document.getElementById('progress-status');
        const progressDetail = document.getElementById('progress-detail');

        const steps = [
            { progress: 25, status: 'Analyzing script...', detail: 'Processing text and identifying key points' },
            { progress: 50, status: 'Generating avatar...', detail: 'Creating AI-powered avatar movements' },
            { progress: 75, status: 'Rendering video...', detail: 'Combining audio and visual elements' },
            { progress: 100, status: 'Complete!', detail: 'Your avatar video is ready' }
        ];

        let currentStep = 0;

        const updateProgress = () => {
            if (currentStep < steps.length) {
                const step = steps[currentStep];
                
                if (progressFill) progressFill.style.width = `${step.progress}%`;
                if (progressStatus) progressStatus.textContent = step.status;
                if (progressDetail) progressDetail.textContent = step.detail;

                currentStep++;

                if (currentStep < steps.length) {
                    setTimeout(updateProgress, 1500);
                } else {
                    setTimeout(() => {
                        this.closeModal('progress-modal');
                        this.currentStep++;
                        this.updateWizardStep();
                        this.renderWizardContent();
                        this.showAvatarPreview();
                        this.showToast('success', 'Avatar Generated', 'Your AI avatar video has been generated successfully!');
                    }, 1000);
                }
            }
        };

        updateProgress();
    }

    showAvatarPreview() {
        const previewContainer = document.getElementById('avatar-preview');
        if (previewContainer) {
            previewContainer.innerHTML = `
                <video controls style="width: 100%; border-radius: 8px; margin-bottom: 16px;">
                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <div style="text-align: center;">
                    <button class="btn btn-primary" onclick="lms.downloadAvatar()">
                        <span class="material-icons">download</span>
                        Download
                    </button>
                </div>
            `;
        }
    }

    downloadAvatar() {
        this.showToast('success', 'Download Started', 'Avatar video download has started');
    }

    // Toast Notification System
    showToast(type, title, message) {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;

        const iconMap = {
            success: 'check_circle',
            error: 'error',
            warning: 'warning',
            info: 'info'
        };

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <span class="material-icons">${iconMap[type]}</span>
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
        `;

        toastContainer.appendChild(toast);

        // Auto remove after 4 seconds
        setTimeout(() => {
            this.removeToast(toast);
        }, 4000);

        // Click to remove
        toast.addEventListener('click', () => {
            this.removeToast(toast);
        });
    }

    removeToast(toast) {
        if (toast.parentNode) {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }
    }
}

// Initialize the application
const lms = new MatDashLMS();

// Global functions for inline event handlers
window.lms = lms;

// Handle keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        lms.closeAllModals();
    }
    
    if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        lms.toggleTheme();
    }
});

// Handle window resize for responsive charts
window.addEventListener('resize', () => {
    if (lms.currentView === 'dashboard') {
        setTimeout(() => lms.renderDashboardCharts(), 200);
    }
    if (lms.currentView === 'analytics') {
        setTimeout(() => lms.renderAnalyticsCharts(), 200);
    }
});

// Handle clicks outside sidebar to close on mobile
document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    
    if (sidebar && !sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
        sidebar.classList.remove('open');
    }
});

console.log('MatDash LMS application loaded successfully');
// ---- Skill Studio: load color overrides last (do not remove) ----
(function(){
  var id='skill-overrides-css';
  if(!document.getElementById(id)){
    var l=document.createElement('link'); l.rel='stylesheet'; l.href='overrides.css'; l.id=id;
    document.head.appendChild(l);
  }
})();
// ---- Skill Studio: load color overrides last (do not remove) ----
(function () {
  var id = 'skill-overrides-css';
  if (!document.getElementById(id)) {
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'overrides.css';
    l.id = id;
    document.head.appendChild(l);
  }
})();
