// header sidebar
document.addEventListener("DOMContentLoaded", () => {
      const toggle = document.querySelector(".menu-toggle");
      const navLinks = document.querySelector(".nav-links");

      toggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
      });

      document.addEventListener("click", (e) => {
        if (e.target.classList.contains("close-btn")) {
          navLinks.classList.remove("active");
        }
      });
    });