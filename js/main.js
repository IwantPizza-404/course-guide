// Main JS
document.addEventListener('DOMContentLoaded', function() {
    // Search button functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            searchInput.style.opacity = '1';
            searchInput.style.visibility = 'visible';
        });
    }
    
    // Burger menu functionality
    const burgerBtn = document.querySelector('.burger-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const body = document.body;
    
    if (burgerBtn && mobileMenu) {
        // Open mobile menu
        burgerBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });
        
        // Close mobile menu
        function closeMenu() {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            body.style.overflow = ''; // Re-enable scrolling
        }
        
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', closeMenu);
        }
        
        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', closeMenu);
        }
        
        
    }
    
    // Footer dropdown functionality for mobile
    function setupFooterDropdowns() {
        if (window.innerWidth <= 435) {
            const footerTitles = document.querySelectorAll('.footer-title');
            
            footerTitles.forEach(title => {
                title.addEventListener('click', function() {
                    const column = this.parentElement;
                    
                    // Check if this column is already active
                    const isActive = column.classList.contains('active');
                    
                    // Close all other dropdowns
                    document.querySelectorAll('.footer-column').forEach(col => {
                        col.classList.remove('active');
                    });
                    
                    // If it wasn't active, make it active (toggle behavior)
                    if (!isActive) {
                        column.classList.add('active');
                    }
                });
            });
        }
    }
    
    // Initialize footer dropdowns
    setupFooterDropdowns();
    
    // Update on resize
    window.addEventListener('resize', function() {
        setupFooterDropdowns();
    });
});
