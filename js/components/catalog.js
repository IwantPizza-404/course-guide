document.addEventListener('DOMContentLoaded', function() {
    // Main DOM elements
    const categoriesContainer = document.querySelector('.catalog-categories');
    const catalogCoursesContainer = document.querySelector('.catalog-courses');
    const foundCoursesElement = document.querySelector('.found-courses');
    const sortItems = document.querySelectorAll('.sort-item');
    const filtersMenuBtn = document.querySelector('.filters-menu-btn');
    const catalogFilters = document.querySelector('.catalog-filters');
    
    // Filter elements
    const priceRadios = document.querySelectorAll('input[name="price"]');
    const schoolCheckboxes = document.querySelectorAll('input[name="school"]');
    const levelCheckboxes = document.querySelectorAll('input[name="level"]');
    const internshipCheckbox = document.querySelector('input[name="internship"]');
    const certificateCheckbox = document.querySelector('input[name="certificate"]');
    const resetFiltersButton = document.querySelector('.reset-filters');
    const priceMin = document.querySelector('.price-min');
    const priceMax = document.querySelector('.price-max');
    const durationMin = document.querySelector('.duration-min');
    const durationMax = document.querySelector('.duration-max');
    
    // Filter and sort state
    let filters = {
        category: 'programming',
        price: { type: 'all', min: 0, max: 175000 },
        schools: [],
        levels: [],
        internship: false,
        certificate: false,
        duration: { min: 0, max: 24 }
    };
    
    let sort = {
        field: null,
        direction: 'asc'
    };
    
    // Initialize the page
    createCategoryTabs();
    setupSliders();
    setupEventListeners();
    setupFiltersMenuButton();
    
    // Set default radio button state
    priceRadios.forEach(radio => {
        if (radio.value === filters.price.type) {
            radio.checked = true;
        }
    });
    
    displayFilteredCourses();
    
    // Setup filters menu button for mobile
    function setupFiltersMenuButton() {
        if (filtersMenuBtn) {
            filtersMenuBtn.addEventListener('click', function() {
                if (catalogFilters) {
                    catalogFilters.classList.toggle('active');
                    
                    // Add close button to filters header if not exists
                    if (catalogFilters.classList.contains('active')) {
                        const closeButton = catalogFilters.querySelector('.filters-close');
                        closeButton.addEventListener('click', function() {
                            catalogFilters.classList.remove('active');
                            document.removeEventListener('click', closeFiltersOnClickOutside);
                        });
                        
                        document.addEventListener('click', closeFiltersOnClickOutside);
                    } else {
                        document.removeEventListener('click', closeFiltersOnClickOutside);
                    }
                }
            });
        }
    }
    
    // Close filters when clicking outside
    function closeFiltersOnClickOutside(e) {
        if (catalogFilters && !catalogFilters.contains(e.target) && e.target !== filtersMenuBtn && !filtersMenuBtn.contains(e.target)) {
            catalogFilters.classList.remove('active');
            document.removeEventListener('click', closeFiltersOnClickOutside);
        }
    }
    
    // Create category tabs from courseCategories data
    function createCategoryTabs() {
        let tabsHTML = courseCategories.map(category => {
            const isActive = category.id === filters.category ? 'active' : '';
            return `<a href="#" class="category-tab ${isActive}" data-category="${category.id}">${category.name}</a>`;
        }).join('');
        
        categoriesContainer.innerHTML = tabsHTML;
    }
    
    // Setup sliders for price and duration
    function setupSliders() {
        // Initialize price slider
        const priceSlider = {
            container: document.querySelector('.price-slider'),
            track: document.querySelector('.price-slider .slider-track'),
            leftHandle: document.querySelector('.price-slider .slider-handle.left'),
            rightHandle: document.querySelector('.price-slider .slider-handle.right'),
            min: 0,
            max: 175000
        };
        
        // Initialize duration slider
        const durationSlider = {
            container: document.querySelector('.duration-slider'),
            track: document.querySelector('.duration-slider .slider-track'),
            leftHandle: document.querySelector('.duration-slider .slider-handle.left'),
            rightHandle: document.querySelector('.duration-slider .slider-handle.right'),
            min: 0,
            max: 24
        };
        
        // Initialize slider positions
        updateSliderVisuals(priceSlider, filters.price.min, filters.price.max);
        updateSliderVisuals(durationSlider, filters.duration.min, filters.duration.max);
        
        // Setup draggable functionality
        setupDraggable(priceSlider, 'price');
        setupDraggable(durationSlider, 'duration');
    }
    
    // Setup all event listeners
    function setupEventListeners() {
        // Category tabs
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.addEventListener('click', e => {
                e.preventDefault();
                document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                filters.category = tab.getAttribute('data-category');
                displayFilteredCourses();
            });
        });
        
        // Price radio buttons
        priceRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                filters.price.type = this.value;
                console.log('Price type set to:', filters.price.type);
                displayFilteredCourses();
            });
        });
        
        // School checkboxes
        setupCheckboxGroup(schoolCheckboxes, 'schools');
        
        // Level checkboxes
        setupCheckboxGroup(levelCheckboxes, 'levels');
        
        // Feature checkboxes
        if (internshipCheckbox) {
            // Set initial state
            filters.internship = internshipCheckbox.checked;
            
            internshipCheckbox.addEventListener('change', function() {
                filters.internship = this.checked;
                console.log('Internship filter:', filters.internship);
                displayFilteredCourses();
            });
        }
        
        if (certificateCheckbox) {
            // Set initial state
            filters.certificate = certificateCheckbox.checked;
            
            certificateCheckbox.addEventListener('change', function() {
                filters.certificate = this.checked;
                console.log('Certificate filter:', filters.certificate);
                displayFilteredCourses();
            });
        }
        
        // Price inputs
        if (priceMin && priceMax) {
            setupRangeInputs(priceMin, priceMax, 'price');
        }
        
        // Duration inputs
        if (durationMin && durationMax) {
            setupRangeInputs(durationMin, durationMax, 'duration');
        }
        
        // Reset button
        if (resetFiltersButton) {
            resetFiltersButton.addEventListener('click', resetAllFilters);
        }
        
        // Sorting
        sortItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                const fields = ['title', 'school', 'currentPrice', 'duration', 'features', 'discount'];
                const field = fields[index] || null;
                
                if (sort.field === field) {
                    sort.direction = sort.direction === 'asc' ? 'desc' : 'asc';
                } else {
                    sort.field = field;
                    sort.direction = 'asc';
                }
                
                updateSortArrows(index);
                displayFilteredCourses();
            });
        });
    }
    
    // Helper: Setup checkbox group
    function setupCheckboxGroup(checkboxes, filterKey) {
        // Clear existing filter array
        filters[filterKey] = [];
        
        checkboxes.forEach(checkbox => {
            // Set initial state if checked
            if (checkbox.checked) {
                const value = checkbox.value.toLowerCase();
                filters[filterKey].push(value);
            }
            
            checkbox.addEventListener('change', function() {
                const value = this.value.toLowerCase();
                
                if (this.checked) {
                    // Add to filters if not already present
                    if (!filters[filterKey].includes(value)) {
                        filters[filterKey].push(value);
                    }
                } else {
                    // Remove from filters
                    filters[filterKey] = filters[filterKey].filter(item => item !== value);
                }
                
                console.log(`Updated ${filterKey}:`, filters[filterKey]);
                displayFilteredCourses();
            });
        });
    }
    
    // Helper: Setup range inputs
    function setupRangeInputs(minInput, maxInput, filterKey) {
        minInput.addEventListener('change', function() {
            const value = parseInt(this.value) || 0;
            filters[filterKey].min = value;
            
            const slider = filterKey === 'price' ? 
                document.querySelector('.price-slider') : 
                document.querySelector('.duration-slider');
                
            const maxValue = filterKey === 'price' ? 175000 : 24;
            
            updateSliderVisuals({
                container: slider,
                track: slider.querySelector('.slider-track'),
                leftHandle: slider.querySelector('.slider-handle.left'),
                rightHandle: slider.querySelector('.slider-handle.right'),
                min: 0,
                max: maxValue
            }, value, filters[filterKey].max);
            
            displayFilteredCourses();
        });
        
        maxInput.addEventListener('change', function() {
            const value = parseInt(this.value) || (filterKey === 'price' ? 175000 : 24);
            filters[filterKey].max = value;
            
            const slider = filterKey === 'price' ? 
                document.querySelector('.price-slider') : 
                document.querySelector('.duration-slider');
                
            const maxValue = filterKey === 'price' ? 175000 : 24;
            
            updateSliderVisuals({
                container: slider,
                track: slider.querySelector('.slider-track'),
                leftHandle: slider.querySelector('.slider-handle.left'),
                rightHandle: slider.querySelector('.slider-handle.right'),
                min: 0,
                max: maxValue
            }, filters[filterKey].min, value);
            
            displayFilteredCourses();
        });
    }
    
    // Update slider visuals based on values
    function updateSliderVisuals(slider, minValue, maxValue) {
        if (!slider.track || !slider.leftHandle || !slider.rightHandle) return;
        
        const minPercent = ((minValue - slider.min) / (slider.max - slider.min)) * 100;
        const maxPercent = ((maxValue - slider.min) / (slider.max - slider.min)) * 100;
        
        slider.leftHandle.style.left = minPercent + '%';
        slider.rightHandle.style.left = maxPercent + '%';
        slider.track.style.left = minPercent + '%';
        slider.track.style.right = (100 - maxPercent) + '%';
    }
    
    // Setup draggable slider functionality
    function setupDraggable(slider, filterKey) {
        if (!slider.container || !slider.leftHandle || !slider.rightHandle || !slider.track) return;
        
        const minInput = filterKey === 'price' ? priceMin : durationMin;
        const maxInput = filterKey === 'price' ? priceMax : durationMax;
        const maxValue = filterKey === 'price' ? 175000 : 24;
        
        slider.leftHandle.addEventListener('mousedown', function(e) {
            e.preventDefault();
            const startX = e.clientX;
            const startLeft = parseFloat(slider.leftHandle.style.left) || 0;
            const sliderRect = slider.container.getBoundingClientRect();
            
            function onMouseMove(e) {
                const deltaX = e.clientX - startX;
                const deltaPercent = (deltaX / sliderRect.width) * 100;
                const newLeft = Math.max(0, Math.min(parseFloat(slider.rightHandle.style.left) || 100, startLeft + deltaPercent));
                
                slider.leftHandle.style.left = newLeft + '%';
                slider.track.style.left = newLeft + '%';
                
                const newValue = Math.round((newLeft / 100) * maxValue);
                minInput.value = newValue;
                filters[filterKey].min = newValue;
                
                displayFilteredCourses();
            }
            
            function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
            
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
        
        slider.rightHandle.addEventListener('mousedown', function(e) {
            e.preventDefault();
            const startX = e.clientX;
            const startLeft = parseFloat(slider.rightHandle.style.left) || 100;
            const sliderRect = slider.container.getBoundingClientRect();
            
            function onMouseMove(e) {
                const deltaX = e.clientX - startX;
                const deltaPercent = (deltaX / sliderRect.width) * 100;
                const newLeft = Math.max(parseFloat(slider.leftHandle.style.left) || 0, Math.min(100, startLeft + deltaPercent));
                
                slider.rightHandle.style.left = newLeft + '%';
                slider.track.style.right = (100 - newLeft) + '%';
                
                const newValue = Math.round((newLeft / 100) * maxValue);
                maxInput.value = newValue;
                filters[filterKey].max = newValue;
                
                displayFilteredCourses();
            }
            
            function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
            
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    }
    
    // Reset all filters to default
    function resetAllFilters() {
        // Keep current category
        const currentCategory = filters.category;
        
        // Reset filters
        filters = {
            category: currentCategory,
            price: { type: 'all', min: 0, max: 175000 },
            schools: [],
            levels: [],
            internship: false,
            certificate: false,
            duration: { min: 0, max: 24 }
        };
        
        // Reset sort
        sort = { field: null, direction: 'asc' };
        
        // Reset UI elements
        priceRadios.forEach(radio => {
            radio.checked = radio.value === 'all';
        });
        
        schoolCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        levelCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        if (internshipCheckbox) internshipCheckbox.checked = false;
        if (certificateCheckbox) certificateCheckbox.checked = false;
        
        if (priceMin) priceMin.value = 0;
        if (priceMax) priceMax.value = 175000;
        if (durationMin) durationMin.value = 0;
        if (durationMax) durationMax.value = 24;
        
        // Reset sort arrows
        sortItems.forEach(item => {
            const arrow = item.querySelector('.sort-arrow');
            if (arrow) arrow.classList.remove('active', 'desc');
        });
        
        // Update slider visuals
        setupSliders();
        
        console.log('All filters reset');
        
        // Update display
        displayFilteredCourses();
    }
    
    // Update sort arrows
    function updateSortArrows(activeIndex) {
        sortItems.forEach((item, i) => {
            const arrow = item.querySelector('.sort-arrow');
            if (!arrow) return;
            
            if (i === activeIndex) {
                arrow.classList.add('active');
                arrow.classList.toggle('desc', sort.direction === 'desc');
            } else {
                arrow.classList.remove('active', 'desc');
            }
        });
    }
    
    // Filter courses based on current filters
    function filterCourses(courses) {
        return courses.filter(course => {
            // Price type filter
            if (filters.price.type === 'free') {
                // Check if the course is free (price is 0 or contains "бесплатно")
                const priceText = course.currentPrice.toLowerCase();
                const isFree = priceText.includes('бесплатно') || 
                              priceText.includes('0 руб') || 
                              parseInt(priceText.replace(/\D/g, '')) === 0;
                if (!isFree) return false;
            }
            
            // School filter
            if (filters.schools.length > 0) {
                const schoolLower = course.school.toLowerCase();
                // Check if any of the selected schools match
                const schoolMatch = filters.schools.some(school => {
                    // Map common variations to match with course data
                    const schoolMap = {
                        'skillbox': ['skillbox', 'скилбокс'],
                        'geekbrains': ['geekbrains', 'гикбрейнс'],
                        'netology': ['netology', 'нетология'],
                        'skillfactory': ['skillfactory', 'скилфэктори'],
                        'convertmonster': ['convertmonster', 'конвертмонстер']
                    };
                    
                    // If we have a mapping for this school, check against all variations
                    if (schoolMap[school]) {
                        return schoolMap[school].some(variant => schoolLower.includes(variant));
                    }
                    
                    // Fall back to direct match
                    return schoolLower.includes(school);
                });
                if (!schoolMatch) return false;
            }
            
            // Level filter
            if (filters.levels.length > 0) {
                const levelLower = course.level.toLowerCase();
                // Check if any of the selected levels match
                const levelMap = {
                    'beginner': ['beginner', 'начальный', 'начинающий'],
                    'intermediate': ['intermediate', 'средний'],
                    'professional': ['professional', 'профессиональный', 'продвинутый'],
                    'children': ['children', 'детский', 'для детей']
                };
                
                const levelMatch = filters.levels.some(level => {
                    // If we have a mapping for this level, check against all variations
                    if (levelMap[level]) {
                        return levelMap[level].some(variant => levelLower.includes(variant));
                    }
                    
                    // Fall back to direct match
                    return levelLower.includes(level);
                });
                if (!levelMatch) return false;
            }
            
            // Internship filter
            if (filters.internship && !course.hasInternship) {
                return false;
            }
            
            // Certificate filter
            if (filters.certificate && !course.hasDiploma) {
                return false;
            }
            
            // Price range filter (simplified)
            const coursePrice = parseInt(course.currentPrice.replace(/\D/g, '')) || 0;
            if (coursePrice < filters.price.min || coursePrice > filters.price.max) {
                return false;
            }
            
            // Duration filter (simplified)
            const courseDuration = parseInt(course.duration.replace(/\D/g, '')) || 0;
            if (courseDuration < filters.duration.min || courseDuration > filters.duration.max) {
                return false;
            }
            
            return true;
        });
    }
    
    // Sort courses based on current sort settings
    function sortCourses(courses) {
        if (!sort.field) return courses;
        
        return [...courses].sort((a, b) => {
            let valueA, valueB;
            
            // Get values based on sort field
            switch(sort.field) {
                case 'title':
                case 'school':
                    valueA = a[sort.field];
                    valueB = b[sort.field];
                    break;
                case 'currentPrice':
                    valueA = parseInt(a.currentPrice.replace(/\D/g, '')) || 0;
                    valueB = parseInt(b.currentPrice.replace(/\D/g, '')) || 0;
                    break;
                case 'duration':
                    valueA = parseInt(a.duration.replace(/\D/g, '')) || 0;
                    valueB = parseInt(b.duration.replace(/\D/g, '')) || 0;
                    break;
                case 'features':
                    valueA = (a.hasInternship ? 1 : 0) + (a.hasDiploma ? 1 : 0);
                    valueB = (b.hasInternship ? 1 : 0) + (b.hasDiploma ? 1 : 0);
                    break;
                case 'discount':
                    const oldA = parseInt(a.oldPrice.replace(/\D/g, '')) || 0;
                    const oldB = parseInt(b.oldPrice.replace(/\D/g, '')) || 0;
                    const newA = parseInt(a.currentPrice.replace(/\D/g, '')) || 0;
                    const newB = parseInt(b.currentPrice.replace(/\D/g, '')) || 0;
                    
                    valueA = oldA > 0 ? ((oldA - newA) / oldA * 100) : 0;
                    valueB = oldB > 0 ? ((oldB - newB) / oldB * 100) : 0;
                    break;
                default:
                    return 0;
            }
            
            // Compare based on direction
            if (typeof valueA === 'string') {
                return sort.direction === 'asc' 
                    ? valueA.localeCompare(valueB) 
                    : valueB.localeCompare(valueA);
            } else {
                return sort.direction === 'asc' 
                    ? valueA - valueB 
                    : valueB - valueA;
            }
        });
    }
    
    // Create course card HTML
    function createCourseCardHTML(course) {
        // Create features HTML
        let featuresHTML = `
            <div class="feature-item">
                <div class="feature-icon">
                    <img src="assets/icons/calendar.svg">
                </div>
                <span>${course.duration}</span>
            </div>
            <div class="feature-item">
                <div class="feature-icon">
                    <img src="assets/icons/level.svg">
                </div>
                <span>${course.level}</span>
            </div>
        `;
        
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
        
        return `
            <div class="course-card">
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
                
                <div class="course-price">
                    <div class="price-info">
                        <span class="old-price">${course.oldPrice}</span>
                        <span class="current-price">${course.currentPrice}</span>
                        <span class="monthly-price">${course.monthlyPrice}</span>
                    </div>
                </div>
                
                <div class="course-details">
                    <div class="detail-item">
                        <div class="detail-icon">
                            <img src="assets/icons/time.svg" alt="time">
                        </div>
                        <span>${course.timeType}</span>
                    </div>
                </div>
                
                <div class="course-features">
                    ${featuresHTML}
                </div>
                
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
    
    // Display filtered & sorted courses
    function displayFilteredCourses() {
        // Get and filter courses
        let currentCategoryCourses = coursesByCategory[filters.category] || [];
        let filteredCourses = filterCourses(currentCategoryCourses);
        filteredCourses = sortCourses(filteredCourses);
        
        // Update the count
        if (foundCoursesElement) {
            foundCoursesElement.textContent = `Найдено ${filteredCourses.length} курсов`;
        }
        
        // Display the courses
        catalogCoursesContainer.innerHTML = '';
        
        if (filteredCourses.length > 0) {
            filteredCourses.forEach(course => {
                catalogCoursesContainer.innerHTML += createCourseCardHTML(course);
            });
        } else {
            catalogCoursesContainer.innerHTML = `
                <div class="no-courses">
                    По вашему запросу курсов не найдено. Попробуйте изменить параметры фильтра.
                </div>
            `;
        }
    }
}); 