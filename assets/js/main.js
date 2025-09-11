// PlanWell Landing Page JavaScript
// Handles GitHub releases, download tracking, and UI interactions

document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const REPO_OWNER = 'cucumbers2blue';
    const REPO_NAME = 'planwell.site';
    const GITHUB_API_BASE = 'https://api.github.com/repos';
    
    // Initialize the page
    init();
    
    function init() {
        setupDownloadButtons();
        setupTabSwitching();
        setupSmoothScrolling();
        fetchLatestRelease();
    }
    
    // Setup download button functionality
    function setupDownloadButtons() {
        const downloadBtn = document.getElementById('download-btn');
        const mainDownloadBtn = document.getElementById('main-download-btn');
        
        if (downloadBtn) {
            downloadBtn.addEventListener('click', handleDownloadClick);
        }
        
        if (mainDownloadBtn) {
            mainDownloadBtn.addEventListener('click', handleDownloadClick);
        }
    }
    
    // Handle download button clicks
    function handleDownloadClick(event) {
        event.preventDefault();
        
        // Track download attempt
        trackEvent('download_clicked', {
            button_location: event.target.id,
            timestamp: new Date().toISOString()
        });
        
        // Get the download URL from the button's data attribute or fetch latest
        const downloadUrl = event.target.dataset.downloadUrl;
        
        if (downloadUrl) {
            initiateDownload(downloadUrl);
        } else {
            fetchLatestReleaseAndDownload();
        }
    }
    
    // Fetch latest release information from GitHub API
    async function fetchLatestRelease() {
        try {
            showLoadingState();
            
            const response = await fetch(`${GITHUB_API_BASE}/${REPO_OWNER}/${REPO_NAME}/releases/latest`);
            
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            
            const release = await response.json();
            updatePageWithReleaseInfo(release);
            hideLoadingState();
            
        } catch (error) {
            console.warn('Could not fetch latest release, using direct download:', error);
            handleFallbackDownload();
            hideLoadingState();
        }
        
        // Always enable fallback after a short delay to ensure buttons work
        setTimeout(() => {
            handleFallbackDownload();
        }, 500);
    }
    
    // Fetch latest release and start download
    async function fetchLatestReleaseAndDownload() {
        try {
            const response = await fetch(`${GITHUB_API_BASE}/${REPO_OWNER}/${REPO_NAME}/releases/latest`);
            
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            
            const release = await response.json();
            const zipAsset = release.assets.find(asset => 
                asset.name.toLowerCase().endsWith('.zip')
            );
            
            if (zipAsset) {
                initiateDownload(zipAsset.browser_download_url);
            } else {
                throw new Error('No ZIP file found in latest release');
            }
            
        } catch (error) {
            console.error('Download error:', error);
            handleFallbackDownload();
        }
    }
    
    // Update page elements with release information
    function updatePageWithReleaseInfo(release) {
        const versionElement = document.getElementById('version');
        const fileSizeElement = document.getElementById('file-size');
        const downloadButtons = [
            document.getElementById('download-btn'),
            document.getElementById('main-download-btn')
        ];
        
        // Update version
        if (versionElement && release.tag_name) {
            versionElement.textContent = release.tag_name.replace(/^v/, '');
        }
        
        // Find ZIP asset
        const zipAsset = release.assets.find(asset => 
            asset.name.toLowerCase().endsWith('.zip')
        );
        
        if (zipAsset) {
            // Update file size
            if (fileSizeElement) {
                fileSizeElement.textContent = formatFileSize(zipAsset.size);
            }
            
            // Update download buttons with actual URL
            downloadButtons.forEach(btn => {
                if (btn) {
                    btn.disabled = false;
                    btn.classList.remove('btn-coming-soon');
                    
                    // Remove icon span and replace with clean text
                    const iconSpan = btn.querySelector('.btn-icon');
                    if (iconSpan) {
                        iconSpan.remove();
                    }
                    
                    // Replace with clean "Download" text only
                    btn.innerHTML = btn.innerHTML
                        .replace('Coming Soon - Final Testing', 'Download')
                        .replace('Coming Soon', 'Download')
                        .replace('🔧', '');
                        
                    // If we still have the complex structure, simplify it
                    if (btn.innerHTML.includes('span')) {
                        btn.innerHTML = 'Download';
                    }
                        
                    btn.dataset.downloadUrl = zipAsset.browser_download_url;
                    btn.dataset.fileName = zipAsset.name;
                }
            });
        }
        
        // Update any release notes or changelog if needed
        updateReleaseNotes(release);
    }
    
    // Format file size in human-readable format
    function formatFileSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 Bytes';
        
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        const size = (bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1);
        
        return `~${size}${sizes[i]}`;
    }
    
    // Initiate file download
    function initiateDownload(url) {
        // Create temporary link and trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = ''; // Let browser determine filename
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Track successful download initiation
        trackEvent('download_started', {
            download_url: url,
            timestamp: new Date().toISOString()
        });
        
        // Show download success message
        showDownloadMessage();
    }
    
    // Handle fallback when GitHub API is not available
    function handleFallbackDownload() {
        // GitHub releases URL for the latest release
        const githubReleasesUrl = `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/latest/download/PlanWell.md-0.1.0-arm64-mac.zip`;
        
        // Enable download buttons and point to GitHub release
        const downloadButtons = [
            document.getElementById('download-btn'),
            document.getElementById('main-download-btn')
        ];
        
        downloadButtons.forEach(btn => {
            if (btn) {
                btn.disabled = false;
                btn.classList.remove('btn-coming-soon');
                
                // Remove icon span and replace with clean text
                const iconSpan = btn.querySelector('.btn-icon');
                if (iconSpan) {
                    iconSpan.remove();
                }
                
                // Replace with clean "Download" text only
                btn.innerHTML = btn.innerHTML
                    .replace('Coming Soon - Final Testing', 'Download')
                    .replace('Coming Soon', 'Download')
                    .replace('🔧', '');
                    
                // If we still have the complex structure, simplify it
                if (btn.innerHTML.includes('span')) {
                    btn.innerHTML = 'Download';
                }
                    
                btn.dataset.downloadUrl = githubReleasesUrl;
                btn.dataset.fileName = 'PlanWell.md-0.1.0-arm64-mac.zip';
                
                // ENSURE click listener is attached when button is updated
                btn.removeEventListener('click', handleDownloadClick); // Remove any existing
                btn.addEventListener('click', handleDownloadClick); // Add fresh listener
            }
        });
        
        // Update file size and version info
        const versionElement = document.getElementById('version');
        const fileSizeElement = document.getElementById('file-size');
        
        if (versionElement) versionElement.textContent = '0.1.0';
        if (fileSizeElement) fileSizeElement.textContent = '~168MB';
        
        trackEvent('direct_download_enabled', {
            download_url: githubReleasesUrl,
            timestamp: new Date().toISOString()
        });
    }
    
    // Setup tab switching for screenshots
    function setupTabSwitching() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab;
                
                // Remove active class from all buttons and content
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const targetContent = document.getElementById(`${targetTab}-tab`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
                
                // Track tab interaction
                trackEvent('screenshot_tab_clicked', {
                    tab: targetTab,
                    timestamp: new Date().toISOString()
                });
            });
        });
    }
    
    // Setup smooth scrolling for navigation links
    function setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = 80; // Account for fixed header
                    const elementPosition = targetElement.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Track navigation
                    trackEvent('navigation_clicked', {
                        target: targetId,
                        timestamp: new Date().toISOString()
                    });
                }
            });
        });
    }
    
    // Show/hide loading state
    function showLoadingState() {
        const downloadButtons = document.querySelectorAll('[id*="download"]');
        downloadButtons.forEach(btn => {
            btn.disabled = true;
            const originalText = btn.innerHTML;
            btn.dataset.originalText = originalText;
            btn.innerHTML = btn.innerHTML.replace(/Download|⬇️/, 'Loading...');
        });
    }
    
    function hideLoadingState() {
        const downloadButtons = document.querySelectorAll('[id*="download"]');
        downloadButtons.forEach(btn => {
            btn.disabled = false;
            if (btn.dataset.originalText) {
                btn.innerHTML = btn.dataset.originalText;
            }
        });
    }
    
    // Show download success message
    function showDownloadMessage() {
        showMessage('Download started! Check your Downloads folder.', 'success');
    }
    
    // Generic message display function
    function showMessage(message, type = 'info') {
        // Create or update message element
        let messageEl = document.getElementById('page-message');
        
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.id = 'page-message';
            messageEl.style.cssText = `
                position: fixed;
                top: 80px;
                right: 24px;
                background: white;
                color: #374151;
                padding: 16px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                border-left: 4px solid var(--primary-blue);
                z-index: 1000;
                max-width: 400px;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease;
            `;
            document.body.appendChild(messageEl);
        }
        
        // Set message and type
        messageEl.textContent = message;
        messageEl.style.borderLeftColor = type === 'success' ? '#10B981' : 
                                         type === 'error' ? '#EF4444' : 
                                         'var(--primary-blue)';
        
        // Show message
        setTimeout(() => {
            messageEl.style.opacity = '1';
            messageEl.style.transform = 'translateX(0)';
        }, 100);
        
        // Hide message after delay
        setTimeout(() => {
            messageEl.style.opacity = '0';
            messageEl.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.parentNode.removeChild(messageEl);
                }
            }, 300);
        }, 4000);
    }
    
    // Update release notes section if it exists
    function updateReleaseNotes(release) {
        const releaseNotesEl = document.getElementById('release-notes');
        if (releaseNotesEl && release.body) {
            releaseNotesEl.innerHTML = marked ? marked(release.body) : release.body;
        }
    }
    
    // Basic event tracking (replace with your analytics service)
    function trackEvent(eventName, eventData = {}) {
        // For now, just log to console
        // Replace with Google Analytics, Plausible, or your preferred analytics
        console.log(`Event: ${eventName}`, eventData);
        
        // Example Google Analytics 4 event tracking:
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
        
        // Example Plausible event tracking:
        if (typeof plausible !== 'undefined') {
            plausible(eventName, { props: eventData });
        }
    }
    
    // Handle intersection observer for animations
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
        
        // Observe elements with animation classes
        const animatedElements = document.querySelectorAll('.feature-card, .path-card');
        animatedElements.forEach(el => observer.observe(el));
    }
    
    // Initialize scroll animations
    setupScrollAnimations();
    
    // Keyboard accessibility
    document.addEventListener('keydown', function(e) {
        // Handle escape key to close any open modals/messages
        if (e.key === 'Escape') {
            const messageEl = document.getElementById('page-message');
            if (messageEl) {
                messageEl.style.opacity = '0';
                messageEl.style.transform = 'translateX(100%)';
            }
        }
    });
    
    // Handle form submissions (if you add contact forms later)
    function setupFormHandling() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                // Handle form submission here
                trackEvent('form_submitted', {
                    form_id: form.id,
                    timestamp: new Date().toISOString()
                });
            });
        });
    }
    
    // Call form setup if needed
    setupFormHandling();
});