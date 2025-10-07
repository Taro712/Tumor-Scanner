// JavaScript for Brain Tumor Detection AI Frontend

document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const uploadForm = document.getElementById('uploadForm');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    const resultsSection = document.getElementById('resultsSection');
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const predictionResult = document.getElementById('predictionResult');
    const confidenceResult = document.getElementById('confidenceResult');

    // File input change handler
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                showError('Please select a valid image file.');
                return;
            }

            // Validate file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                showError('File size must be less than 10MB.');
                return;
            }

            // Show image preview
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImg.src = e.target.result;
                imagePreview.style.display = 'block';
                analyzeBtn.disabled = false;
                hideError();
                hideResults();
            };
            reader.readAsDataURL(file);
        } else {
            hidePreview();
        }
    });

    // Form submission handler
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const file = fileInput.files[0];
        if (!file) {
            showError('Please select an image file first.');
            return;
        }

        // Show loading state
        showLoading();
        hideError();
        hideResults();

        // Create form data
        const formData = new FormData();
        formData.append('file', file);

        // Send request to backend
        fetch('/predict', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            hideLoading();
            
            if (data.success) {
                showResults(data);
            } else {
                showError(data.error || 'An error occurred during analysis.');
            }
        })
        .catch(err => {
            hideLoading();
            showError('Network error. Please check your connection and try again.');
            console.error('Error:', err);
        });
    });

    // Show image preview
    function showPreview() {
        imagePreview.style.display = 'block';
    }

    // Hide image preview
    function hidePreview() {
        imagePreview.style.display = 'none';
        previewImg.src = '';
        analyzeBtn.disabled = true;
    }

    // Show loading state
    function showLoading() {
        loading.style.display = 'block';
        analyzeBtn.disabled = true;
    }

    // Hide loading state
    function hideLoading() {
        loading.style.display = 'none';
        analyzeBtn.disabled = false;
    }

    // Show error message
    function showError(message) {
        document.getElementById('errorMessage').textContent = message;
        error.style.display = 'block';
        hideLoading();
    }

    // Hide error message
    function hideError() {
        error.style.display = 'none';
    }

    // Show results
    function showResults(data) {
        const { prediction } = data;
        
        // Update prediction result
        predictionResult.textContent = prediction;
        predictionResult.className = `prediction ${prediction.toLowerCase().replace(' ', '-')}`;
        
        // Hide confidence section completely
        confidenceResult.innerHTML = '';
        
        // Show results section with animation
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Hide results
    function hideResults() {
        resultsSection.style.display = 'none';
    }

    // Reset form function (called from HTML)
    window.resetForm = function() {
        fileInput.value = '';
        hidePreview();
        hideResults();
        hideError();
        
        // Reset button state
        analyzeBtn.disabled = true;
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Show info modal
    window.showInfo = function() {
        document.getElementById('infoModal').style.display = 'flex';
    };

    // Close modal
    window.closeModal = function() {
        document.getElementById('infoModal').style.display = 'none';
    };

    // Close modal when clicking outside
    document.getElementById('infoModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Drag and drop functionality
    const uploadCard = document.querySelector('.upload-card');
    
    uploadCard.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadCard.style.borderColor = 'var(--accent-color)';
        uploadCard.style.backgroundColor = 'var(--accent-bg)';
    });

    uploadCard.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadCard.style.borderColor = 'var(--border-color)';
        uploadCard.style.backgroundColor = 'var(--card-bg)';
    });

    uploadCard.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadCard.style.borderColor = 'var(--border-color)';
        uploadCard.style.backgroundColor = 'var(--card-bg)';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                fileInput.files = files;
                fileInput.dispatchEvent(new Event('change'));
            } else {
                showError('Please drop a valid image file.');
            }
        }
    });

    // Add smooth scrolling for better UX
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

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Enter key on file input label
        if (e.key === 'Enter' && e.target.classList.contains('file-input-label')) {
            fileInput.click();
        }
    });

    // Add focus styles for accessibility
    const focusableElements = document.querySelectorAll('button, input, a, [tabindex]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Add loading animation for better visual feedback
    function addPulseAnimation() {
        const analyzeBtn = document.getElementById('analyzeBtn');
        if (!analyzeBtn.disabled) {
            analyzeBtn.style.animation = 'pulse 2s infinite';
        }
    }

    // Remove pulse animation
    function removePulseAnimation() {
        const analyzeBtn = document.getElementById('analyzeBtn');
        analyzeBtn.style.animation = 'none';
    }

    // Add CSS for pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    // Initialize app state
    analyzeBtn.disabled = true;
    
    // Add success animation for results
    function animateResults() {
        const resultsCard = document.querySelector('.results-card');
        resultsCard.style.animation = 'slideIn 0.5s ease';
    }

    // Enhanced error handling with retry option
    function showErrorWithRetry(message) {
        const errorContent = document.querySelector('.error-content');
        const retryBtn = document.createElement('button');
        retryBtn.textContent = 'Retry';
        retryBtn.className = 'retry-btn';
        retryBtn.style.cssText = `
            background: var(--accent-color);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 10px;
            font-size: 0.9rem;
        `;
        retryBtn.onclick = function() {
            hideError();
            if (fileInput.files.length > 0) {
                uploadForm.dispatchEvent(new Event('submit'));
            }
        };
        
        showError(message);
        errorContent.appendChild(retryBtn);
    }

    // Console log for debugging
    console.log('Brain Tumor Detection AI Frontend loaded successfully');
});
