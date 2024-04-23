window.onload = function() {
    var navbarHeight = document.querySelector('nav').offsetHeight;
    var heroSection = document.querySelector('.hero-main');
    heroSection.style.height = `calc(100vh - ${navbarHeight}px)`;
    heroSection.style.paddingTop = navbarHeight + 'px';
    onScroll();
};

// Event listener for window resize
window.addEventListener('resize', function() {
    // Close the menu if the screen width is greater than 768px (desktop view)
    if (window.innerWidth > 768) {
        closeMenu();
    }
});

// Function to toggle between menu icon and close icon
function toggleMenuIcon() {
    var menuIcon = document.querySelector('.menu-icon');
    var closeIcon = document.querySelector('.close-icon');
    
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('show');
}

// Function to toggle the navigation menu
function toggleMenu() {
    var menu = document.querySelector('.menu-mobile');
    menu.classList.toggle('show');
    toggleMenuIcon();
}

function closeMenu() {
    var menu = document.querySelector('.menu-mobile');
    var closeIcon = document.querySelector('.close-icon');
    var menuIcon = document.querySelector('.menu-icon');
    menu.classList.remove('show');
    closeIcon.classList.add('show');
    menuIcon.classList.add('hidden');
    toggleMenuIcon(); // Hide the close icon and show the menu icon
}

// Event listener for the menu toggle button
document.querySelector('.menu-icon').addEventListener('click', toggleMenu);
document.querySelector('.close-icon').addEventListener('click', toggleMenu);

// Function to handle smooth scrolling
function smoothScroll(target) {
    const targetElement = document.querySelector(target);
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop - 115,
            behavior: 'smooth' // Use smooth scrolling behavior
        });
    }

    // Set a timeout to add the event listener back after 1 second
    setTimeout(function() {
        window.addEventListener('scroll', onScroll);
    }, 600); // 1000 milliseconds = 1 second
}

// Attach click event listeners to navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {

        // Remove the event listener temporarily
        window.removeEventListener('scroll', onScroll);

        e.preventDefault(); // Prevent default anchor behavior
        const target = this.getAttribute('href');
        smoothScroll(target); // Smooth scroll to the target section
    });
});

// Attach click event listeners to navigation links
document.querySelectorAll('.nav-item').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        closeMenu(); // Close the menu
        
        e.preventDefault(); // Prevent default anchor behavior
        const target = this.getAttribute('href');

        // Wait for 1 second before executing the smooth scroll
        setTimeout(function() {
            smoothScroll(target); // Smooth scroll to the target section
        }, 300); // 1000 milliseconds = 1 second
    });
});

// Function to determine which section is currently in view
function onScroll() {
    const scrollPosition = window.scrollY;
    document.querySelectorAll('.section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop - 150 && scrollPosition < sectionTop + sectionHeight + 150) {
            // Remove active class from all navigation links
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            // Add active class to the corresponding navigation link
            const target = `#${section.getAttribute('id')}`;
            document.querySelector(`nav a[href="${target}"]`).classList.add('active');
        }
    });
}

// Attach scroll event listener to window
window.addEventListener('scroll', onScroll);