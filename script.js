let menuBar = document.querySelector("#menu-bar");
let navbar = document.querySelector(".navbar");

menuBar.onclick = () => {
  menuBar.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  menuBar.classList.remove("bx-x");
  navbar.classList.remove("active");
};

// Animation for skill cards
document.addEventListener('DOMContentLoaded', function() {
  const skillCards = document.querySelectorAll('.skill-card');
  
  const animateCards = () => {
      skillCards.forEach((card, index) => {
          setTimeout(() => {
              card.classList.add('visible');
          }, 150 * index);
      });
  };
  
  // Intersection Observer for scroll animation
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              animateCards();
              observer.unobserve(entry.target);
          }
      });
  }, { threshold: 0.1 });
  
  observer.observe(document.querySelector('.skills-container'));
});