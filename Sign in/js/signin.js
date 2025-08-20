// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize the page
    initializePage();
    
    // Set up form event listeners
    setupFormListeners();
    
    // Start floating animation
    startFloatingElements();
});

// Form switching functionality
function switchForm(formType) {
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    
    // Remove active classes
    signinForm.classList.remove('active');
    signupForm.classList.remove('active');
    toggleBtns.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to selected form and button
    if (formType === 'signin') {
        signinForm.classList.add('active');
        toggleBtns[0].classList.add('active');
    } else {
        signupForm.classList.add('active');
        toggleBtns[1].classList.add('active');
    }
}

// Setup form event listeners
function setupFormListeners() {
    // Sign In Form Handler
    document.getElementById('signin-form').addEventListener('submit', function(e) {
        e.preventDefault();
        handleSignIn();
    });

    // Sign Up Form Handler
    document.getElementById('signup-form').addEventListener('submit', function(e) {
        e.preventDefault();
        handleSignUp();
    });

    // Real-time password validation
    const signupPassword = document.getElementById('signup-password');
    const confirmPassword = document.getElementById('signup-confirm');
    
    if (signupPassword && confirmPassword) {
        confirmPassword.addEventListener('input', validatePasswordMatch);
        signupPassword.addEventListener('input', validatePasswordStrength);
    }
}

// Handle Sign In
function handleSignIn() {
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
    
    // Basic validation
    if (!validateEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    if (password.length < 1) {
        showError('Please enter your password');
        return;
    }
    
    // Add loading state
    const submitBtn = document.querySelector('#signin-form .submit-btn');
    setLoadingState(submitBtn, 'Signing In...');
    
    // Simulate API call
    setTimeout(() => {
        showSuccess(`Welcome back! Signed in with: ${email}`);
        removeLoadingState(submitBtn, 'Sign In');
        
        // You can redirect to dashboard or home page here
        // window.location.href = '../index.html';
    }, 2000);
}

// Handle Sign Up
function handleSignUp() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm').value;
    
    // Validation
    if (name.trim().length < 2) {
        showError('Please enter a valid name');
        return;
    }
    
    if (!validateEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    if (password.length < 8) {
        showError('Password must be at least 8 characters long');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }
    
    // Add loading state
    const submitBtn = document.querySelector('#signup-form .submit-btn');
    setLoadingState(submitBtn, 'Creating Account...');
    
    // Simulate API call
    setTimeout(() => {
        showSuccess(`Welcome ${name}! Account created successfully with: ${email}`);
        removeLoadingState(submitBtn, 'Create Account');
        
        // Switch to sign in form after successful signup
        setTimeout(() => {
            switchForm('signin');
            // Pre-fill email in sign-in form
            document.getElementById('signin-email').value = email;
        }, 1500);
    }, 2000);
}

// Validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePasswordStrength() {
    const password = document.getElementById('signup-password').value;
    const requirements = document.querySelector('.password-requirements');
    
    if (password.length === 0) {
        requirements.textContent = 'Password must be at least 8 characters long';
        requirements.style.color = 'rgba(255, 255, 255, 0.6)';
    } else if (password.length < 8) {
        requirements.textContent = `Password too short (${password.length}/8 characters)`;
        requirements.style.color = '#ff6b6b';
    } else {
        requirements.textContent = 'Password strength: Good ✓';
        requirements.style.color = '#51cf66';
    }
}

function validatePasswordMatch() {
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm').value;
    const confirmInput = document.getElementById('signup-confirm');
    
    if (confirmPassword.length === 0) {
        confirmInput.style.borderColor = 'rgba(212, 175, 55, 0.3)';
        return;
    }
    
    if (password === confirmPassword) {
        confirmInput.style.borderColor = '#51cf66';
    } else {
        confirmInput.style.borderColor = '#ff6b6b';
    }
}

// Loading state functions
function setLoadingState(button, text) {
    button.classList.add('loading');
    button.textContent = text;
    button.disabled = true;
}

function removeLoadingState(button, text) {
    button.classList.remove('loading');
    button.textContent = text;
    button.disabled = false;
}

// Notification functions
function showError(message) {
    // You can implement a proper toast notification system here
    alert(`Error: ${message}`);
}

function showSuccess(message) {
    // You can implement a proper toast notification system here
    alert(`Success: ${message}`);
}

// Forgot password functionality
function showForgotPassword() {
    const email = prompt('Enter your email address to reset password:');
    if (email && validateEmail(email)) {
        alert(`Password reset link sent to: ${email}`);
    } else if (email) {
        alert('Please enter a valid email address');
    }
}

// Social login functionality
function socialLogin(provider) {
    alert(`${provider} login will be implemented here`);
    // You can integrate with actual OAuth providers here
    // Example for Google: window.location.href = '/auth/google';
    // Example for Facebook: window.location.href = '/auth/facebook';
}

// Floating elements animation
function createFloatingElement() {
    const element = document.createElement('div');
    element.style.position = 'fixed';
    element.style.width = Math.random() * 6 + 3 + 'px';
    element.style.height = element.style.width;
    element.style.background = `rgba(212, 175, 55, ${Math.random() * 0.3 + 0.1})`;
    element.style.borderRadius = '50%';
    element.style.left = Math.random() * 100 + 'vw';
    element.style.top = '100vh';
    element.style.pointerEvents = 'none';
    element.style.zIndex = '1';
    element.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.3)';
    
    document.body.appendChild(element);
    
    const duration = Math.random() * 10000 + 15000;
    const drift = (Math.random() - 0.5) * 100;
    
    element.animate([
        { transform: `translateY(0) translateX(0)`, opacity: 0 },
        { transform: `translateY(-100vh) translateX(${drift}px)`, opacity: 1 },
        { transform: `translateY(-120vh) translateX(${drift * 1.2}px)`, opacity: 0 }
    ], {
        duration: duration,
        easing: 'linear'
    }).onfinish = () => element.remove();
}

function startFloatingElements() {
    // Create floating elements periodically
    setInterval(createFloatingElement, 5000);
    
    // Add some initial floating elements
    setTimeout(() => {
        for (let i = 0; i < 3; i++) {
            setTimeout(createFloatingElement, i * 1000);
        }
    }, 1000);
}

// Initialize page
function initializePage() {
    // Add any initialization code here
    console.log('BrewCraft Sign In page loaded successfully');
    
    // Add focus effects to inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Switch forms with Tab + Shift
    if (e.key === 'Tab' && e.shiftKey && e.ctrlKey) {
        e.preventDefault();
        const currentForm = document.querySelector('.auth-form.active');
        if (currentForm.id === 'signin-form') {
            switchForm('signup');
        } else {
            switchForm('signin');
        }
    }
    
    // Submit form with Ctrl + Enter
    if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        const activeForm = document.querySelector('.auth-form.active');
        if (activeForm) {
            const submitBtn = activeForm.querySelector('.submit-btn');
            if (submitBtn && !submitBtn.disabled) {
                submitBtn.click();
            }
        }
    }
});

// Add smooth transitions for better UX
function addSmoothTransitions() {
    const style = document.createElement('style');
    style.textContent = `
        .form-group.focused label {
            color: #ffeb3b;
            transform: translateY(-2px);
        }
        
        .form-group {
            transition: all 0.3s ease;
        }
        
        .auth-form {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Call smooth transitions
addSmoothTransitions();