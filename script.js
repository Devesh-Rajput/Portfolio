// Initialize Lucide icons on load.
// This is necessary because the theme toggle logic changes the data-lucide attribute, 
// requiring the icon library to re-render the SVG.
window.onload = () => {
    lucide.createIcons(); 
};

// Set the current year in the footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// --- 1. Dark/Light Mode Toggle Logic ---
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Function to initialize the theme based on localStorage or system preference
function initializeTheme() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        themeIcon.setAttribute('data-lucide', 'sun');
    } else {
        document.documentElement.classList.remove('dark');
        themeIcon.setAttribute('data-lucide', 'moon');
    }
    // Re-render icons after setting initial state
    lucide.createIcons(); 
}

// Function to handle the theme toggle switch
themeToggle.addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
        themeIcon.setAttribute('data-lucide', 'moon');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
        themeIcon.setAttribute('data-lucide', 'sun');
    }
    // Re-render icons after toggle
    lucide.createIcons(); 
});

initializeTheme(); // Call to set the initial theme

// --- 2. Intersection Observer for Scroll Animations ---
// Select all elements that need to animate on scroll, including new ones
const sections = document.querySelectorAll('.animate-on-scroll');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0 // Observe as soon as any part is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const target = entry.target;
        // Use a slight delay for staggered effect, pulling from data-delay attribute
        const delay = parseInt(target.getAttribute('data-delay') || '0'); 
        
        if (entry.isIntersecting) {
            // Pop In (with stagger delay)
            setTimeout(() => {
                target.classList.add('in-view');
            }, delay);
            // Stop observing once it's visible to prevent re-triggering constantly
            // observer.unobserve(target); // Uncomment this if you only want the animation to happen once
        } else {
            // Pop Out when scrolling away (if you want the animation to re-appear)
            // target.classList.remove('in-view');
        }
    });
}, observerOptions);

// Start observing all elements with the animation class
sections.forEach(section => {
    observer.observe(section);
});

// --- 3. Simple Contact Form Handler (Simulates success, no actual submission) ---
function handleContact(event) {
    event.preventDefault();
    const messageDiv = document.getElementById('contact-message');
    messageDiv.classList.remove('hidden');
    
    // Display success message and hide after 5 seconds
    messageDiv.innerHTML = '<span class="text-green-500">Thank you for your message! I will be in touch soon.</span>';
    
    setTimeout(() => {
        messageDiv.classList.add('hidden');
        event.target.reset(); // Reset the form fields
    }, 5000);
}

// Attach the global function to the window object so the HTML form can find it
window.handleContact = handleContact;