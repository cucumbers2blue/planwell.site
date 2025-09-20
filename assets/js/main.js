// PlanWell Landing Page JavaScript
// Handles lightweight UI interactions (tabs, smooth scrolling, analytics hooks)

document.addEventListener('DOMContentLoaded', function() {
    setupTabSwitching();
    setupSmoothScrolling();
    setupScrollAnimations();
    setupFormHandling();
    wireDownloadAnalytics();

    function wireDownloadAnalytics() {
        const downloadLink = document.getElementById('main-download-btn');
        if (!downloadLink) return;

        downloadLink.addEventListener('click', () => {
            trackEvent('download_clicked', {
                button_location: 'main-download-btn',
                target_url: downloadLink.href,
                timestamp: new Date().toISOString()
            });
        });
    }

    function setupTabSwitching() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab;

                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                button.classList.add('active');
                const targetContent = document.getElementById(`${targetTab}-tab`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }

                trackEvent('screenshot_tab_clicked', {
                    tab: targetTab,
                    timestamp: new Date().toISOString()
                });
            });
        });
    }

    function setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (!targetElement) return;

                e.preventDefault();

                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                trackEvent('navigation_clicked', {
                    target: targetId,
                    timestamp: new Date().toISOString()
                });
            });
        });
    }

    function setupScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.feature-card, .path-card');
        animatedElements.forEach(el => observer.observe(el));
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const messageEl = document.getElementById('page-message');
            if (messageEl) {
                messageEl.style.opacity = '0';
                messageEl.style.transform = 'translateX(100%)';
            }
        }
    });

    function setupFormHandling() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                trackEvent('form_submitted', {
                    form_id: form.id,
                    timestamp: new Date().toISOString()
                });
            });
        });
    }

    function trackEvent(eventName, eventData = {}) {
        console.log(`Event: ${eventName}`, eventData);

        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }

        if (typeof plausible !== 'undefined') {
            plausible(eventName, { props: eventData });
        }
    }
});
