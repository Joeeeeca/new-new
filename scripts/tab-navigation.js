const links = document.querySelectorAll('.nav__link');
const light = document.querySelector('.nav__light');
let isTransitioning = false; // Flag to prevent double transitions

// Function to move the light to the selected link
function moveLight(linkElement) {
    const { offsetLeft, offsetWidth } = linkElement;
    const newLeft = offsetLeft + (offsetWidth / 2) - (light.offsetWidth / 2);
    console.log(`Moving light to: ${newLeft}px`); // Log the new position
    light.style.left = `${newLeft}px`; // Move the light
}

// Function to set the active link
function setActiveLink(linkActive) {
    console.log(`Setting active link: ${linkActive.textContent}`); // Log the active link
    links.forEach(link => {
        link.classList.remove('active'); // Remove active class from all links
    });
    linkActive.classList.add('active'); // Add active class to the clicked/current link
}

// Function to set the initial active link from local storage or current page
function setInitialActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html'; // Get current page
    const lastActiveLink = localStorage.getItem('activeLink') || currentPage; // Fallback to current page if no storage
    console.log(`Current page: ${currentPage}`); // Log the current page
    console.log(`Last active link: ${lastActiveLink}`); // Log the last active link

    // Iterate over the links and match the href with the current page or stored active link
    links.forEach(link => {
        const linkHref = link.querySelector('a').getAttribute('href'); // Get the href of the link
        
        if (linkHref === lastActiveLink) { // If link matches the stored active or current page
            setActiveLink(link); // Set this link as active
            moveLight(link); // Move the light to the active link
            console.log(`Light positioned at: ${linkHref}`); // Log the active link
        }
    });
}

// Set the initial active link on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded. Setting initial active link.');
    setInitialActiveLink(); // Set the initial active link based on the last active link

    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault(); // Prevent immediate navigation
            const targetLink = event.currentTarget;

            // Check if already transitioning
            if (isTransitioning) {
                console.log('Transition already in progress.');
                return; // Prevent additional transitions
            }

            // Store the active link in local storage
            const targetHref = targetLink.querySelector('a').getAttribute('href');
            localStorage.setItem('activeLink', targetHref); // Store the href in local storage
            console.log(`Active link stored: ${targetHref}`);

            // Set transitioning flag
            isTransitioning = true;

            // Move the light and set active link
            setActiveLink(targetLink); // Activate the clicked link
            moveLight(targetLink); // Move the light to the clicked link

            // Use a timeout to navigate after a slight delay to allow the transition to complete
            setTimeout(() => {
                window.location.href = targetHref; // Navigate to the new page
                console.log(`Navigating to: ${targetHref}`);
                isTransitioning = false; // Reset the flag after navigation
            }, 300); // Adjust this delay to match your desired transition timing
        });
    });
});

// Directly set the light position on page load without transition
window.addEventListener('load', () => {
    console.log('Page loaded. Checking current active link.');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(link => {
        const linkHref = link.querySelector('a').getAttribute('href');
        if (linkHref === currentPage) {
            moveLight(link); // Move the light to the currently loaded page link
            setActiveLink(link); // Set the active link
        }
    });
});

// Observe the window resize event to adjust light position if necessary
window.addEventListener('resize', () => {
    const activeLink = document.querySelector('.nav__link.active');
    if (activeLink) {
        moveLight(activeLink); // Re-adjust the light position based on the active link
    }
});

// Function to adjust light position for smaller screens
function adjustLightPosition(linkElement) {
    const { offsetLeft, offsetWidth } = linkElement;
    light.style.left = `${offsetLeft + (offsetWidth / 2) - (light.offsetWidth / 2)}px`;
}

// Adjust light position based on screen size at page load
window.addEventListener('load', () => {
    const activeLink = document.querySelector('.nav__link.active');
    if (activeLink) {
        adjustLightPosition(activeLink); // Adjust the light position for the active link on load
    }
});
