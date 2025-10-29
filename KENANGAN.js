// Gallery modal functionality for KENANGAN page
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.querySelector('.modal-image');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    const zoomButtons = document.querySelectorAll('.zoom-btn');
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    let currentImageIndex = 0;
    const images = Array.from(galleryImages);
    
    // Open modal when clicking zoom button
    zoomButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            currentImageIndex = index;
            openModal();
        });
    });
    
    // Also open modal when clicking the image directly
    galleryImages.forEach((image, index) => {
        image.addEventListener('click', function() {
            currentImageIndex = index;
            openModal();
        });
    });
    
    function openModal() {
        modal.style.display = 'block';
        modalImage.src = images[currentImageIndex].src;
        modalImage.alt = images[currentImageIndex].alt;
        document.body.style.overflow = 'hidden';
        
        // Add animation class
        modal.classList.add('active');
    }
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        modal.classList.remove('active');
    }
    
    function showImage(index) {
        if (index >= 0 && index < images.length) {
            currentImageIndex = index;
            modalImage.src = images[currentImageIndex].src;
            modalImage.alt = images[currentImageIndex].alt;
            
            // Add fade animation
            modalImage.style.opacity = '0';
            setTimeout(() => {
                modalImage.style.opacity = '1';
            }, 200);
        }
    }
    
    // Event listeners
    modalClose.addEventListener('click', closeModal);
    
    modalPrev.addEventListener('click', function(e) {
        e.stopPropagation();
        showImage(currentImageIndex - 1);
    });
    
    modalNext.addEventListener('click', function(e) {
        e.stopPropagation();
        showImage(currentImageIndex + 1);
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            switch(e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    showImage(currentImageIndex - 1);
                    break;
                case 'ArrowRight':
                    showImage(currentImageIndex + 1);
                    break;
            }
        }
    });
    
    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    modal.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    modal.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next image
            showImage(currentImageIndex + 1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous image
            showImage(currentImageIndex - 1);
        }
    }
    
    // Add loading animation to gallery items
    const photoCards = document.querySelectorAll('.photo-card');
    photoCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
    
    // Add hover effects to photo cards
    photoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.03)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});