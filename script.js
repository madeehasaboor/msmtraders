// E-commerce Homepage JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initBannerSlider();
    initCountdownTimer();
    initProductCards();
    initSearchFunctionality();
    initMobileMenu();
    initScrollAnimations();
    initCartFunctionality();
    initImageErrorHandling();
});

// Banner Slider with Fade Effect
function initBannerSlider() {
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.banner-dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 1500); // Change slide every 1.5 seconds
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    // Add click event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            stopSlider();
            startSlider(); // Restart auto-slide
        });
    });

    // Pause slider on hover
    const bannerSlider = document.querySelector('.banner-slider');
    bannerSlider.addEventListener('mouseenter', stopSlider);
    bannerSlider.addEventListener('mouseleave', startSlider);

    // Start the slider
    startSlider();
}

// Countdown Timer for Deals of the Day
function initCountdownTimer() {
    const countdownElement = document.querySelector('.countdown-timer');
    
    function updateCountdown() {
        const now = new Date().getTime();
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        const timeLeft = endOfDay.getTime() - now;

        if (timeLeft > 0) {
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            countdownElement.textContent = formattedTime;
        } else {
            countdownElement.textContent = '00:00:00';
        }
    }

    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Product Card Interactions
function initProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Add click event to product cards
        card.addEventListener('click', function() {
            const productName = this.querySelector('h3').textContent;
            const productPrice = this.querySelector('.text-blue-600').textContent;
            
            // Add to recently viewed (simulate)
            addToRecentlyViewed(productName, productPrice, this.querySelector('img').src);
            
            // Show product details (you can implement a modal here)
            showProductModal(productName, productPrice, this.querySelector('img').src);
        });

        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Search Functionality
function initSearchFunctionality() {
    const searchInput = document.querySelector('input[type="text"]');
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.trim();
            if (searchTerm) {
                performSearch(searchTerm);
            }
        }
    });

    // Add search suggestions (optional)
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim();
        if (searchTerm.length > 2) {
            showSearchSuggestions(searchTerm);
        } else {
            hideSearchSuggestions();
        }
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    // Create mobile menu button if it doesn't exist
    const header = document.querySelector('header');
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuButton.className = 'lg:hidden text-gray-600 hover:text-blue-600 transition-colors';
    mobileMenuButton.id = 'mobile-menu-button';
    
    // Insert mobile menu button
    const logo = header.querySelector('.flex.items-center');
    logo.appendChild(mobileMenuButton);

    // Create mobile menu overlay
    const mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobile-menu';
    mobileMenu.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 hidden';
    mobileMenu.innerHTML = `
        <div class="bg-gray-900 border-r border-yellow-500 w-64 h-full p-6">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-lg font-semibold text-yellow-500">Categories</h3>
                <button id="close-mobile-menu" class="text-yellow-500 hover:text-yellow-400">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <nav class="space-y-2">
                <a href="car_care.html" class="block py-2 px-3 text-gray-300 hover:bg-yellow-500 hover:text-black rounded-lg transition-colors">
                    <i class="fas fa-car mr-2"></i>Car Care
                </a>
                <a href="microfiber_and_cleaners.html" class="block py-2 px-3 text-gray-300 hover:bg-yellow-500 hover:text-black rounded-lg transition-colors">
                    <i class="fas fa-home mr-2"></i>House Care
                </a>
                <a href="perfumes.html" class="block py-2 px-3 text-gray-300 hover:bg-yellow-500 hover:text-black rounded-lg transition-colors">
                    <i class="fas fa-spray-can mr-2"></i>Perfumes
                </a>
                <a href="laptops.html" class="block py-2 px-3 text-gray-300 hover:bg-yellow-500 hover:text-black rounded-lg transition-colors">
                    <i class="fas fa-laptop mr-2"></i>Laptops
                </a>
                <a href="electronics.html" class="block py-2 px-3 text-gray-300 hover:bg-yellow-500 hover:text-black rounded-lg transition-colors">
                    <i class="fas fa-mobile-alt mr-2"></i>Electronics
                </a>
                <a href="cosmetics.html" class="block py-2 px-3 text-gray-300 hover:bg-yellow-500 hover:text-black rounded-lg transition-colors">
                    <i class="fas fa-palette mr-2"></i>Cosmetics
                </a>
                <a href="crockery.html" class="block py-2 px-3 text-gray-300 hover:bg-yellow-500 hover:text-black rounded-lg transition-colors">
                    <i class="fas fa-utensils mr-2"></i>Crockery
                </a>
                <a href="sale.html" class="block py-2 px-3 text-gray-300 hover:bg-yellow-500 hover:text-black rounded-lg transition-colors">
                    <i class="fas fa-tags mr-2"></i>Sale
                </a>
                <a href="contact.html" class="block py-2 px-3 text-gray-300 hover:bg-yellow-500 hover:text-black rounded-lg transition-colors">
                    <i class="fas fa-envelope mr-2"></i>Contact
                </a>
            </nav>
        </div>
    `;
    
    document.body.appendChild(mobileMenu);

    // Add event listeners
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
    });

    document.getElementById('close-mobile-menu').addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });

    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            mobileMenu.classList.add('hidden');
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

// Cart Functionality
function initCartFunctionality() {
    const cartButton = document.querySelector('.fa-shopping-cart').parentElement;
    const cartBadge = cartButton.querySelector('span');
    
    // Add to cart functionality
    document.addEventListener('click', function(e) {
        if (e.target.closest('.product-card')) {
            const card = e.target.closest('.product-card');
            const productName = card.querySelector('h3').textContent;
            const productPrice = card.querySelector('.text-blue-600').textContent;
            
            addToCart(productName, productPrice);
        }
    });

    function addToCart(name, price) {
        // Animate cart badge
        cartBadge.classList.add('cart-badge');
        setTimeout(() => {
            cartBadge.classList.remove('cart-badge');
        }, 600);
        
        // Update cart count
        const currentCount = parseInt(cartBadge.textContent);
        cartBadge.textContent = currentCount + 1;
        
        // Show success message
        showNotification(`${name} added to cart!`);
    }
}

// Utility Functions
function addToRecentlyViewed(name, price, imageSrc) {
    const recentlyViewed = document.querySelector('.space-y-3');
    const newItem = document.createElement('div');
    newItem.className = 'flex items-center space-x-3';
    newItem.innerHTML = `
        <img src="${imageSrc}" alt="${name}" class="w-12 h-12 object-cover rounded">
        <div>
            <p class="text-sm font-medium text-gray-800">${name}</p>
            <p class="text-xs text-gray-500">${price}</p>
        </div>
    `;
    
    // Add to top of recently viewed
    recentlyViewed.insertBefore(newItem, recentlyViewed.firstChild);
    
    // Remove excess items (keep only 3)
    const items = recentlyViewed.querySelectorAll('div');
    if (items.length > 3) {
        recentlyViewed.removeChild(items[items.length - 1]);
    }
}

function showProductModal(name, price, imageSrc) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-md w-full p-6">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold">Product Details</h3>
                <button class="text-gray-600 hover:text-blue-600" onclick="this.closest('.fixed').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <img src="${imageSrc}" alt="${name}" class="w-full h-48 object-cover rounded-lg mb-4">
            <h4 class="text-lg font-semibold mb-2">${name}</h4>
            <p class="text-2xl font-bold text-blue-600 mb-4">${price}</p>
            <div class="flex space-x-3">
                <button class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Add to Cart
                </button>
                <button class="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                    View Details
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function performSearch(term) {
    showNotification(`Searching for: ${term}`);
    // Implement actual search functionality here
}

function showSearchSuggestions(term) {
    // Implement search suggestions here
}

function hideSearchSuggestions() {
    // Hide search suggestions
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
initLazyLoading();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll event listener with debouncing
window.addEventListener('scroll', debounce(() => {
    // Handle scroll events here
}, 100));

// Image Error Handling and Visibility
function initImageErrorHandling() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Ensure image is visible
        img.style.display = 'block';
        img.style.opacity = '1';
        img.style.visibility = 'visible';
        
        // Handle image load errors
        img.addEventListener('error', function() {
            console.warn('Image failed to load:', this.src);
            
            // Create a placeholder div
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #374151 0%, #4b5563 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #9ca3af;
                font-size: 14px;
                border-radius: 8px;
                min-height: 100px;
            `;
            placeholder.textContent = 'Image not available';
            
            // Replace the broken image with placeholder
            this.parentNode.replaceChild(placeholder, this);
        });
        
        // Handle successful image load
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.visibility = 'visible';
        });
        
        // Preload images for better performance
        if (img.src && img.src !== '') {
            const preloadImg = new Image();
            preloadImg.src = img.src;
        }
    });
    
    // Lazy loading for better performance
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        // Observe all images for lazy loading
        images.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }
}
