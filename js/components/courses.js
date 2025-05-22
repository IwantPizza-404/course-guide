// Wait for the HTML to fully load before running our code
document.addEventListener('DOMContentLoaded', function() {
    // Get the HTML elements we need to work with
    const categoriesContainer = document.getElementById('course-categories');
    const courseListContainer = document.getElementById('course-list');
    
    // Step 1: Create all category buttons
    createCategoryButtons();
    
    // Step 2: Show courses from the first category by default
    showCoursesByCategory(courseCategories[0].id);
    
    // Function that creates all the category buttons
    function createCategoryButtons() {
        // Clear any existing buttons first
        categoriesContainer.innerHTML = '';
        
        // Create HTML for all category buttons
        let buttonsHTML = '';
        
        // Loop through each category and create a button for it
        for(let i = 0; i < courseCategories.length; i++) {
            let category = courseCategories[i];
            let activeClass = i === 0 ? 'active' : '';
            
            // Add button HTML
            buttonsHTML += `
                <button class="category-btn ${activeClass}" data-category-id="${category.id}">
                    ${category.name}
                </button>
            `;
        }
        
        // Add all buttons to the container at once
        categoriesContainer.innerHTML = buttonsHTML;
        
        // Add click events to all buttons
        let buttons = categoriesContainer.querySelectorAll('.category-btn');
        for(let i = 0; i < buttons.length; i++) {
            buttons[i].onclick = function() {
                // Remove active class from all buttons
                for(let j = 0; j < buttons.length; j++) {
                    buttons[j].classList.remove('active');
                }
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show courses for this category
                showCoursesByCategory(this.dataset.categoryId);
            };
        }
    }
    
    // Function that displays courses for a selected category
    function showCoursesByCategory(categoryId) {
        // Clear any existing courses
        courseListContainer.innerHTML = '';
        
        // Get the courses for this category
        let courses = coursesByCategory[categoryId];
        
        // If there are no courses, show a message
        if(!courses || courses.length === 0) {
            courseListContainer.innerHTML = `
                <div class="no-courses">
                    Нет доступных курсов в этой категории
                </div>
            `;
            return;
        }
        
        // Create HTML for all course cards
        let coursesHTML = '';
        
        // Add each course card
        for(let i = 0; i < courses.length; i++) {
            coursesHTML += createCourseCardHTML(courses[i]);
        }
        
        // Add all courses to the container at once
        courseListContainer.innerHTML = coursesHTML;
    }
    
    // Function that creates HTML for a single course card
    function createCourseCardHTML(course) {
        // Create features HTML based on course data
        let featuresHTML = `
            <!-- Duration feature -->
            <div class="feature-item">
                <div class="feature-icon">
                    <img src="assets/icons/calendar.svg">
                </div>
                <span>${course.duration}</span>
            </div>
            
            <!-- Level feature -->
            <div class="feature-item">
                <div class="feature-icon">
                    <img src="assets/icons/level.svg">
                </div>
                <span>${course.level}</span>
            </div>
        `;
        
        // Add internship badge if the course has it
        if(course.hasInternship) {
            featuresHTML += `
                <div class="feature-item">
                    <div class="feature-icon">
                        <img src="assets/icons/suitcase.svg">
                    </div>
                    <span>Стажировка</span>
                </div>
            `;
        }
        
        // Add diploma badge if the course has it
        if(course.hasDiploma) {
            featuresHTML += `
                <div class="feature-item">
                    <div class="feature-icon">
                        <img src="assets/icons/diploma.svg">
                    </div>
                    <span>Диплом</span>
                </div>
            `;
        }
        
        // Return the complete HTML for the course card
        return `
            <div class="course-card">
                <!-- 1. Course title and school section -->
                <div class="course-info">
                    <h3 class="course-title">${course.title}</h3>
                </div>

                <div class="school-info">
                    <span class="school-name">${course.school}</span>
                    <div class="rating">
                        <span class="star">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_1_574)">
                                    <path d="M6.61417 0.561591C6.68666 0.414743 6.83621 0.321777 6.99998 0.321777C7.16376 0.321749 7.31333 0.414715 7.38582 0.561562L9.064 3.96141C9.22181 4.2811 9.52681 4.50273 9.87964 4.55397L13.6318 5.09941C13.7939 5.12299 13.9285 5.23649 13.9791 5.39225C14.0297 5.54799 13.9875 5.71898 13.8703 5.83331L11.1554 8.48C10.9001 8.72891 10.7836 9.08745 10.8438 9.4388L11.4844 13.1752C11.5121 13.3367 11.4457 13.4998 11.3132 13.596C11.1808 13.6923 11.0051 13.7049 10.8602 13.6287L7.50409 11.8647C7.18853 11.6988 6.81152 11.6988 6.4959 11.8647L3.14013 13.6287C2.99516 13.7049 2.81951 13.6921 2.68704 13.5959C2.55453 13.4996 2.48821 13.3365 2.51587 13.1751L3.15675 9.43897C3.21705 9.0875 3.10054 8.72891 2.84519 8.47995L0.130155 5.83334C0.0129044 5.71901 -0.0293321 5.54802 0.0212835 5.39228C0.071899 5.23654 0.206533 5.12304 0.368605 5.09944L4.12063 4.55403C4.47346 4.50273 4.77849 4.28113 4.9363 3.96138L6.61417 0.561591Z" fill="#FFB800"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_1_574">
                                <rect width="14" height="14" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </span>
                        <span class="rating-value">${course.rating}</span>
                    </div>
                    <span class="reviews">Отзывы о школе ${course.reviews}</span>
                </div>
                
                <!-- 2. Price section -->
                <div class="course-price">
                    <div class="price-info">
                        <span class="old-price">${course.oldPrice}</span>
                        <span class="current-price">${course.currentPrice}</span>
                        <span class="monthly-price">${course.monthlyPrice}</span>
                    </div>
                </div>
                
                <!-- 3. Course details section -->
                <div class="course-details">
                    <div class="detail-item">
                        <div class="detail-icon">
                            <img src="assets/icons/time.svg" alt="time">
                        </div>
                        <span>${course.timeType}</span>
                    </div>
                </div>
                
                <!-- 4. Course features section -->
                <div class="course-features">
                    ${featuresHTML}
                </div>
                
                <!-- 5. Buttons section -->
                <div class="course-actions">
                    <a href="#" class="btn btn-primary">На сайт курса</a>
                    <a href="#" class="btn btn-secondary">Подробнее</a>
                    <button class="btn-compare">
                        <span class="compare-icon">
                            <img src="assets/icons/shuffle.svg">
                        </span>
                        Добавить к сравнению
                    </button>
                </div>
            </div>
        `;
    }
}); 