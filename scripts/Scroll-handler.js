document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.scroll-container > section');
    const container = document.querySelector('.scroll-container');
    let isScrolling = false;

    // Smooth scroll function
    function smoothScroll(targetSection) {
        isScrolling = true;
        targetSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => { isScrolling = false; }, 500); // Adjust time if needed
    }

    // Scroll event listener
    container.addEventListener('scroll', () => {
        if (isScrolling) return;

        const scrollPosition = container.scrollTop;
        const containerHeight = container.clientHeight;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            // Check if the scroll is close to a section
            if (scrollPosition > sectionTop - sectionHeight / 3 && 
                scrollPosition < sectionTop + sectionHeight / 3) {
                smoothScroll(section);
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const landingSection = document.querySelector('.landing');
    const introductionSection = document.querySelector('.introduction');
  
    // Smooth scroll back to .landing when .introduction is scrolled up
    introductionSection.addEventListener('scroll', () => {
      if (introductionSection.scrollTop === 0) {
        landingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  
  
  