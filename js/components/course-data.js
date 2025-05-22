// Course data organized by categories
const courseData = {
    programming: [
        { title: "Все курсы по программированию", url: "#" },
        { title: "Python-разработка", url: "#" },
        { title: "Web-разработка", url: "#" },
        { title: "Мобильная разработка", url: "#" },
        { title: "JavaScript-разработка", url: "#" },
        { title: "Java-разработка", url: "#" },
        { title: "Разработка игр", url: "#" },
        { title: "Создание сайтов", url: "#" },
        { title: "Системное администрирование", url: "#" },
        { title: "QA-тестирование", url: "#" },
        { title: "Android-разработка", url: "#" },
        { title: "Управление разработкой и IT", url: "#" },
        { title: "Frontend-разработка", url: "#" },
        { title: "Разработка игр на Unity", url: "#" },
        { title: "Разработка на C#", url: "#" },
        { title: "PHP-разработка", url: "#" },
        { title: "DevOps", url: "#" },
        { title: "IOS-разработка", url: "#" },
        { title: "Верстка на HTML/CSS", url: "#" },
        { title: "Разработка на C++", url: "#" },
        { title: "Разработка игр на Unreal Engine", url: "#" },
        { title: "Разработка на Kotlin", url: "#" },
        { title: "Информационная безопасность", url: "#" },
        { title: "Golang-разработка", url: "#" },
        { title: "Разработка на Swift", url: "#" },
        { title: "1C-разработка", url: "#" },
        { title: "VR/AR разработка", url: "#" },
        { title: "Фреймворк Laravel", url: "#" }
    ],
    marketing: [
        { title: "Маркетинг", url: "#" },
        { title: "Маркетинг", url: "#" },
        { title: "Маркетинг", url: "#" },
        { title: "Маркетинг", url: "#" },
        { title: "Маркетинг", url: "#" },
        { title: "Маркетинг", url: "#" },
        { title: "Маркетинг", url: "#" },
        { title: "Маркетинг", url: "#" },
        { title: "Маркетинг", url: "#" },
        { title: "Маркетинг", url: "#" },
        { title: "Маркетинг", url: "#" },
    ],
    design: [
        { title: "Дизайн", url: "#" },
        { title: "Дизайн", url: "#" },
        { title: "Дизайн", url: "#" },
        { title: "Дизайн", url: "#" },
        { title: "Дизайн", url: "#" },
        { title: "Дизайн", url: "#" },
        { title: "Дизайн", url: "#" },
        { title: "Дизайн", url: "#" },
        { title: "Дизайн", url: "#" },
        { title: "Дизайн", url: "#" },
        { title: "Дизайн", url: "#" },
        { title: "Дизайн", url: "#" },
    ],
    analytics: [
        { title: "Аналитика", url: "#" },
        { title: "Аналитика", url: "#" },
        { title: "Аналитика", url: "#" },
        { title: "Аналитика", url: "#" },
        { title: "Аналитика", url: "#" },
        { title: "Аналитика", url: "#" },
        { title: "Аналитика", url: "#" },
        { title: "Аналитика", url: "#" },
        { title: "Аналитика", url: "#" },
        { title: "Аналитика", url: "#" },
    ],
    finance: [
        { title: "Финансы", url: "#" },
        { title: "Финансы", url: "#" },
        { title: "Финансы", url: "#" },
        { title: "Финансы", url: "#" },
        { title: "Финансы", url: "#" },
        { title: "Финансы", url: "#" },
        { title: "Финансы", url: "#" },
    ],
    management: [
        { title: "Управление", url: "#" },
    ],
    content: [
        { title: "Контент", url: "#" },
    ]
};

// Function to generate course links
function generateCourseLinks() {
    // For each category in courseData
    Object.keys(courseData).forEach(category => {
        // Find the corresponding tab pane
        const tabPane = document.getElementById(category);
        
        if (tabPane) {
            // Get the courses grid container
            const coursesGrid = tabPane.querySelector('.courses-grid');
            
            if (coursesGrid) {
                // Clear existing content
                coursesGrid.innerHTML = '';
                
                // Generate links for this category
                courseData[category].forEach(course => {
                    // Create link element
                    const courseLink = document.createElement('a');
                    courseLink.href = course.url;
                    courseLink.className = 'course-link';
                    
                    // Add course title
                    courseLink.textContent = course.title;
                    
                    // Add arrow span
                    const arrowSpan = document.createElement('span');
                    arrowSpan.innerHTML = ' <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.22259 3.68784L2.66249 0.127804C2.58015 0.045398 2.47023 0 2.35303 0C2.23583 0 2.12591 0.045398 2.04357 0.127804L1.78139 0.389915C1.61079 0.560711 1.61079 0.838302 1.78139 1.00884L4.7709 3.99834L1.77807 6.99116C1.69573 7.07357 1.65027 7.18342 1.65027 7.30056C1.65027 7.41783 1.69573 7.52768 1.77807 7.61015L2.04025 7.8722C2.12266 7.9546 2.23251 8 2.34971 8C2.46691 8 2.57683 7.9546 2.65917 7.8722L6.22259 4.30891C6.30513 4.22624 6.35046 4.11587 6.3502 3.99854C6.35046 3.88075 6.30513 3.77044 6.22259 3.68784Z" fill="#C4C4C4"/></svg>';
                    courseLink.appendChild(arrowSpan);
                    
                    // Add to grid
                    coursesGrid.appendChild(courseLink);
                });
            }
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', generateCourseLinks); 