// Common JavaScript for all pages

// DOM Ready Function
document.addEventListener('DOMContentLoaded', function() {
  // Initialize navigation functionality
  initNavigation();
  
  // Initialize animations
  initAnimations();
  
  // Initialize audio/video enhancements
  initMediaEnhancements();
});

// Navigation Functionality
function initNavigation() {
  const hamburger = document.querySelector('.hamburger-menu');
  const navOverlay = document.querySelector('.nav-overlay');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Toggle navigation menu
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navOverlay.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = navOverlay.classList.contains('active') ? 'hidden' : '';
    });
  }
  
  // Close menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Close menu when clicking outside
  navOverlay.addEventListener('click', function(e) {
    if (e.target === navOverlay) {
      hamburger.classList.remove('active');
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Highlight active page in navigation
  highlightActivePage();
}

// Highlight active page in navigation
function highlightActivePage() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Initialize animations
function initAnimations() {
  // Add scroll-triggered animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  document.querySelectorAll('.card, .profile-card, .social-link').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Initialize media enhancements
function initMediaEnhancements() {
  // Custom audio player styling
  const audioPlayers = document.querySelectorAll('audio');
  
  audioPlayers.forEach(audio => {
    // Add custom controls if needed
    audio.addEventListener('play', function() {
      this.parentElement.classList.add('playing');
    });
    
    audio.addEventListener('pause', function() {
      this.parentElement.classList.remove('playing');
    });
  });
  
  // Video enhancements
  const videos = document.querySelectorAll('video');
  
  videos.forEach(video => {
    video.addEventListener('play', function() {
      this.parentElement.classList.add('playing');
    });
    
    video.addEventListener('pause', function() {
      this.parentElement.classList.remove('playing');
    });
  });
}

// Utility function for smooth scrolling
function smoothScrollTo(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Add scroll indicator functionality
window.addEventListener('scroll', function() {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator && window.scrollY > 100) {
    scrollIndicator.style.opacity = '0';
  }
});

// Add loading animation
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
  
  // Remove loading animation after a delay
  setTimeout(() => {
    const loader = document.querySelector('.loader');
    if (loader) {
      loader.style.display = 'none';
    }
  }, 1000);
});

// Add error handling for media elements
document.addEventListener('error', function(e) {
  if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO' || e.target.tagName === 'AUDIO') {
    console.warn('Media failed to load:', e.target.src);
    // You could add a fallback image or show an error message here
  }
}, true);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
  // ESC key closes navigation
  if (e.key === 'Escape') {
    const hamburger = document.querySelector('.hamburger-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    
    if (hamburger && navOverlay && navOverlay.classList.contains('active')) {
      hamburger.classList.remove('active');
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});

// Add touch device optimizations
if ('ontouchstart' in window) {
  document.body.classList.add('touch-device');
  
  // Improve touch interactions
  document.addEventListener('touchstart', function() {
    // Add any touch-specific optimizations here
  }, { passive: true });
}

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}