// Builds the navigation bar dynamically based on page sections
function buildNav() {
    console.log('Building navigation'); // Debug: Confirm nav build
    const navList = document.getElementById('nav-list');
    if (!navList) {
        console.error('Nav list element not found: #nav-list');
        return;
    }
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const li = document.createElement('li');
        li.textContent = section.querySelector('h2').textContent;
        li.dataset.section = section.dataset.section;
        li.addEventListener('click', () => scrollToSection(section));
        navList.appendChild(li);
    });
}

// Scrolls smoothly to the specified section
function scrollToSection(section) {
    console.log('Scrolling to section:', section.id); // Debug: Confirm scroll
    section.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(section);
}

// Sets the specified section as active with distinct styling
function setActiveSection(section) {
    console.log('Setting active section:', section.id); // Debug: Confirm active section
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    section.classList.add('active');
}

// Observes sections to detect which is in view and set as active
function observeSections() {
    console.log('Observing sections'); // Debug: Confirm observer setup
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveSection(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('section').forEach(section => observer.observe(section));
}

// Validates form input for name, email, and comment
function validateForm(name, email, comment) {
    console.log('Validating form:', { name, email, comment }); // Debug: Check input values
    const error = document.getElementById('error-message');
    if (!error) {
        console.error('Error element not found: #error-message');
        return false;
    }
    error.classList.add('hidden');
    
    // Check if fields are empty
    if (name.length === 0 || email.length === 0 || comment.length === 0) {
        error.textContent = 'All fields are required.';
        error.classList.remove('hidden');
        console.log('Validation failed: All fields are required');
        return false;
    }
    
    // Check if email contains @
    if (!email.includes('@')) {
        error.textContent = 'Please enter a valid email address.';
        error.classList.remove('hidden');
        console.log('Validation failed: Invalid email');
        return false;
    }
    
    console.log('Validation passed');
    return true;
}

// Adds a comment to the page
function addComment(name, email, comment) {
    console.log('Adding comment:', { name, email, comment }); // Debug: Confirm comment is being added
    const commentsList = document.getElementById('comments-list');
    if (!commentsList) {
        console.error('Comments list element not found: #comments-list');
        return;
    }
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.innerHTML = `<p><strong>${name}</strong> (${email}): ${comment}</p>`;
    commentsList.appendChild(commentDiv); // Append comment to the page
}

// Loads saved comments from localStorage on page load
function loadComments() {
    console.log('Loading comments from localStorage'); // Debug: Confirm loading
    const commentsList = document.getElementById('comments-list');
    if (!commentsList) {
        console.error('Comments list element not found: #comments-list');
        return;
    }
    const comments = JSON.parse(localStorage.getItem('comments') || '[]');
    
    // Clear existing comments to prevent duplicates
    commentsList.innerHTML = '';
    
    // Add each comment to the page
    comments.forEach(({ name, email, comment }) => {
        addComment(name, email, comment);
    });
}

// Handles form submission, validates input, and updates the page
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    console.log('Form submitted'); // Debug: Confirm form submission
    const form = document.getElementById('comment-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const commentInput = document.getElementById('comment');
    
    if (!form || !nameInput || !emailInput || !commentInput) {
        console.error('Form or input elements not found');
        return;
    }
        function handleFormSubmit(event) {
        event.preventDefault(); // Prevent default form submission
        console.log('Form submitted'); // Debug: Confirm form submission
        const form = document.getElementById('comment-form');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const commentInput = document.getElementById('comment');
        
        if (!form || !nameInput || !emailInput || !commentInput) {
            console.error('Form or input elements not found');
            return;
        }
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const comment = commentInput.value.trim();
        
        console.log('Form values:', { name, email, comment }); // Debug: Log raw input values
        
        if (validateForm(name, email, comment)) {
            // Add comment to the page dynamically
            addComment(name, email, comment);
            
            // Save to localStorage
            const comments = JSON.parse(localStorage.getItem('comments') || '[]');
            comments.push({ name, email, comment });
            localStorage.setItem('comments', JSON.stringify(comments));
            
            // Clear form fields after successful submission
            form.reset();
            console.log('Form cleared'); // Debug: Confirm form reset
        }
    }
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const comment = commentInput.value.trim();
    
    console.log('Form values:', { name, email, comment }); // Debug: Log raw input values
    
    if (validateForm(name, email, comment)) {
        // Add comment to the page dynamically
        addComment(name, email, comment);
        
        // Save to localStorage
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        comments.push({ name, email, comment });
        localStorage.setItem('comments', JSON.stringify(comments));
        
        // Clear form fields after successful submission
        form.reset();
        console.log('Form cleared'); // Debug: Confirm form reset
    }
}

// Hides the navigation bar when scrolling stops
function hideNavOnScrollStop() {
    console.log('Setting up nav hide on scroll'); // Debug: Confirm setup
    const header = document.querySelector('header');
    if (!header) {
        console.error('Header element not found');
        return;
    }
    window.addEventListener('scroll', () => {
        header.classList.remove('hidden');
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            header.classList.add('hidden');
        }, 2000);
    });
}

// Manages the scroll-to-top button visibility and functionality
function handleScrollTopButton() {
    console.log('Setting up scroll-to-top button'); // Debug: Confirm setup
    const button = document.getElementById('scroll-top');
    if (!button) {
        console.error('Scroll top button not found: #scroll-top');
        return;
    }
    const fold = window.innerHeight;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > fold) {
            button.classList.remove('hidden');
        } else {
            button.classList.add('hidden');
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Initializes the page on load
function init() {
    console.log('Initializing page'); // Debug: Confirm initialization
    const form = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');
    
    if (!form) {
        console.error('Form element not found: #comment-form');
        return;
    }
    if (!commentsList) {
        console.error('Comments list element not found: #comments-list');
        return;
    }
    
    buildNav();
    observeSections();
    loadComments();
    form.addEventListener('submit', handleFormSubmit);
    hideNavOnScrollStop();
    handleScrollTopButton();
}

// Global scroll timeout variable
let scrollTimeout;

// Start the page initialization
document.addEventListener('DOMContentLoaded', init);