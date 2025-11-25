// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links and sections
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Search functionality
    const searchBtn = document.getElementById('searchBtn');
    const searchQuery = document.getElementById('searchQuery');
    const searchResults = document.getElementById('searchResults');
    const exampleResults = document.getElementById('exampleResults');

    function performSearch() {
        const query = searchQuery.value.trim();
        
        if (!query) {
            searchResults.innerHTML = `
                <div class="results-placeholder">
                    <i class="fas fa-search"></i>
                    <p>Please enter a search query</p>
                </div>
            `;
            return;
        }

        // Show loading state
        searchResults.innerHTML = `
            <div class="results-placeholder">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Searching the tax corpus...</p>
            </div>
        `;

        // Simulate search delay
        setTimeout(() => {
            // Show example results
            exampleResults.style.display = 'block';
            searchResults.style.display = 'none';
            
            // Update query in results
            const resultsHeader = exampleResults.querySelector('.results-header h3');
            if (resultsHeader) {
                resultsHeader.innerHTML = `Search Results for: "${query}" <span class="results-count">(5 found)</span>`;
            }
        }, 1000);
    }

    searchBtn.addEventListener('click', performSearch);
    
    searchQuery.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Filter change handlers
    const filters = ['jurisdictionFilter', 'stateFilter', 'docTypeFilter', 'taxTypeFilter'];
    filters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', function() {
                // In a real implementation, this would trigger a new search
                console.log(`Filter changed: ${filterId} = ${this.value}`);
            });
        }
    });

    // Animate stats on dashboard load
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            const numericValue = parseInt(finalValue.replace(/,/g, ''));
            
            if (!isNaN(numericValue)) {
                let current = 0;
                const increment = numericValue / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        stat.textContent = finalValue;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current).toLocaleString();
                    }
                }, 30);
            }
        });
    }

    // Animate breakdown bars
    function animateBreakdown() {
        const breakdownFills = document.querySelectorAll('.breakdown-fill');
        breakdownFills.forEach(fill => {
            const width = fill.style.width;
            fill.style.width = '0%';
            setTimeout(() => {
                fill.style.width = width;
            }, 100);
        });
    }

    // Run animations when dashboard is shown
    const dashboardSection = document.getElementById('dashboard');
    if (dashboardSection && dashboardSection.classList.contains('active')) {
        setTimeout(() => {
            animateStats();
            animateBreakdown();
        }, 300);
    }

    // Re-run animations when switching to dashboard
    const dashboardLink = document.querySelector('a[href="#dashboard"]');
    if (dashboardLink) {
        dashboardLink.addEventListener('click', function() {
            setTimeout(() => {
                animateStats();
                animateBreakdown();
            }, 300);
        });
    }

    // Simulate real-time updates
    function updateActivity() {
        const activityList = document.querySelector('.activity-list');
        if (activityList && document.getElementById('dashboard').classList.contains('active')) {
            // This would be replaced with real API calls in production
            console.log('Simulating activity update...');
        }
    }

    // Update activity every 30 seconds
    setInterval(updateActivity, 30000);

    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.stat-card, .source-card, .result-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Add click effect to buttons
    const buttons = document.querySelectorAll('.search-btn, .source-link');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .search-btn, .source-link {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

