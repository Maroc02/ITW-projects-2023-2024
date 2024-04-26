/* *********************** script.js ********************** */
/*  Author: Marek Čupr (xcuprm01)                           */
/*  College: VUT FIT                                        */
/*  Subject: ITW - Project 2                                */
/*  Date: 26. 04. 2024                                      */
/*  Functionality: Implement the javascript functionality.  */
/* ******************************************************** */

/**
 * @brief Call the onLoad function to handle the window load event.
*/
window.onload = onLoad;

/**
 * @brief Call the onScroll function to handle the window scroll event.
*/
window.addEventListener('scroll', onScroll);

/**
 * @brief Call the resizeWindow function to handle the window resize event.
*/
window.addEventListener('resize', resizeWindow);

/**
 * @brief Implement the smooth scroll for desktop navigation links.
*/
document.querySelectorAll('nav .links a').forEach(item => {
    // Get the target element
    item.addEventListener('click', function(e) {
        // Temporarily remove the scroll event listener
        window.removeEventListener('scroll', onScroll);
        e.preventDefault();

        // Apply the smooth scroll effect
        const target = this.getAttribute('href');
        smoothScroll(target);
    });
});

/**
 * @brief Implement the smooth scroll for mobile navigation links.
*/
document.querySelectorAll('.nav-item').forEach(item => {
    // Get the target element
    item.addEventListener('click', function(e) {
        // Temporarily remove the scroll event listener
        window.removeEventListener('scroll', onScroll);
        e.preventDefault();

        // Close the mobile menu
        closeMenu();
        
        // Apply the smooth scroll effect
        const target = this.getAttribute('href');
        setTimeout(function() { smoothScroll(target); }, 300);
    });
});


/**
 * @brief Call the toggleMenu function to handle the menu icon click event.
*/
document.querySelector('.menu-icon').addEventListener('click', toggleMenu);

/**
 * @brief Call the toggleMenu function to handle the close icon click event.
*/
document.querySelector('.close-icon').addEventListener('click', toggleMenu);

/**
 * @brief Call the smoothScroll function to handle the hero button click event.
*/
document.querySelector('.hero-btn').addEventListener('click', function(e) {
    e.preventDefault();
    // Apply the smooth scroll
    const target = '#timeline';
    smoothScroll(target); 
});

/**
 * @brief Call the smoothScroll function to handle the up arrow click event.
*/
document.querySelector('.up').addEventListener('click', function(e) {
    e.preventDefault();
    // Apply the smooth scroll
    const target = '#hero';
    smoothScroll(target);
});

/**
 * @brief Function that sets the height and the padding of the hero section and adds the active class to the navigation links.
*/
function onLoad() {
    // Get the hero section and the navbar height
    var heroSection = document.querySelector('.hero-main');
    var navbarHeight = document.querySelector('nav').offsetHeight;
    // Set the height and the padding of the hero section
    heroSection.style.height = `100vh`;
    heroSection.style.paddingTop = navbarHeight + 'px';
    // Add the active class to the navigation links
    onScroll();
}

/**
 * @brief Functions that adds the slide-in animation to the hero sections and the active class to the navigation links.
*/
function onScroll() {
    // Get the hero sections
    const scrollPosition = window.scrollY;
    const heroLeft = document.querySelector('.hero-left');
    const heroRight = document.querySelector('.hero-right');
    const heroLeftPosition = heroLeft.getBoundingClientRect();

    // Add the slide-in animation to the hero sections
    if (window.innerWidth > 968) {
        if (heroLeftPosition.top < window.innerHeight && heroLeftPosition.bottom >= 0) {
            heroLeft.classList.add('slide-in-left');
            heroRight.classList.add('slide-in-right');
        } else {
            heroLeft.classList.remove('slide-in-left');
            heroRight.classList.remove('slide-in-right');
        }
    } else {
        // Don't animate the hero section on mobile devices
        heroLeft.classList.add('slide-in-left');
    }

    // Add the active class to the navigation links
    document.querySelectorAll('.section').forEach(section => {
        // Get the section position and height
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        // Check if the section is in view
        if (scrollPosition >= sectionTop - 150 && scrollPosition < sectionTop + sectionHeight + 150) {
            // Remove the active class from all the navigation links
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            // Add the active class to the navigation links
            const target = `#${section.getAttribute('id')}`;
            document.querySelector(`nav a[href="${target}"]`).classList.add('active');
        }
    });
}

/**
 * @brief Functions that closes the menu and adds the slide-in animation to the hero sections on desktop devices.
*/
function resizeWindow() {
    // Close the menu on desktop devices
    if (window.innerWidth > 768)
        closeMenu();

    // Add the slide-in animation to hero sections on desktop devices
    const heroRight = document.querySelector('.hero-right');
    if (window.innerWidth > 968) {
        heroRight.classList.add('slide-in-right');
    } else {
        heroRight.classList.remove('slide-in-right');
    }
}

/**
 * @brief Function that implements the smooth scroll effect to the target element.
*/
function smoothScroll(target) {
    // Get the target element
    const targetElement = document.querySelector(target);
    if (targetElement) {
        // Calculate the offset based on the target element
        let offset = 0;
        if (targetElement.id === 'achievements') {
            offset = 105;
        } else if (targetElement.id === 'gallery') {
            offset = 125;
        } else {
            offset = 100;
        }

        // Apply the smooth scroll effect
        window.scrollTo({
            top: targetElement.offsetTop - offset,
            behavior: 'smooth'
        });
    }

    // Add the active class to the navigation links
    setTimeout(function() {
        window.addEventListener('scroll', onScroll);
    }, 500);
}

/**
 * @brief Function that toggles the menu icon.
*/
function toggleMenuIcon() {
    // Get the menu icon and the close icon
    var menuIcon = document.querySelector('.menu-icon');
    var closeIcon = document.querySelector('.close-icon');
    
    // Toggle the menu icon and the close icon
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('show');
}

/**
 * @brief Function that toggles the menu.
*/
function closeMenu() {
    // Get the menu, the menu icon and the close icon
    var menuIcon = document.querySelector('.menu-icon');
    var closeIcon = document.querySelector('.close-icon');
    var menu = document.querySelector('.menu-mobile');

    // Close the menu, hide the close icon and show the menu icon 
    menu.classList.remove('show');
    closeIcon.classList.remove('show');
    menuIcon.classList.remove('hidden');
}

/**
 * @brief Function that toggles the menu.
*/
function toggleMenu() {
    // Get the menu
    var menu = document.querySelector('.menu-mobile');

    // Toggle the menu and the menu icon
    menu.classList.toggle('show');
    toggleMenuIcon();
}

/* End of script.js */