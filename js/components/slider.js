document.addEventListener('DOMContentLoaded', () => {
    // Initialize Swiper
    const schoolsSwiper = new Swiper('.schools-slider', {
        // Responsive breakpoints
        breakpoints: {
            // When window width is >= 320px
            320: {
                slidesPerView: 1,
                spaceBetween: 15
            },
            // When window width is >= 576px
            576: {
                slidesPerView: 1,
                spaceBetween: 15
            },
            // When window width is >= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            // When window width is >= 992px
            1080: {
                slidesPerView: 4,
                spaceBetween: 15
            }
        },
        
        // Optional parameters
        loop: false,
        speed: 500,
        grabCursor: true,
        
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        
        // Auto play
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        }
    });
});