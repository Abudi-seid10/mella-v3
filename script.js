document.addEventListener("DOMContentLoaded", function () {
  // Dark mode functionality
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  // Check system preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  // Check for saved theme preference or use system preference
  const savedTheme =
    localStorage.getItem("theme") || (prefersDark.matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  // Listen for system theme changes
  prefersDark.addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      const newTheme = e.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      updateThemeIcon(newTheme);
    }
  });

  // Theme toggle click handler
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    themeIcon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // Close mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse.classList.contains("show")) {
          navbarCollapse.classList.remove("show");
        }
      }
    });
  });

  // Navbar scroll behavior
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("shadow-sm");
    } else {
      navbar.classList.remove("shadow-sm");
    }
  });

  // Form submission handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const submitButton = contactForm.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.innerHTML = "Sending...";

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          alert("Thank you for your message. We will get back to you soon!");
          contactForm.reset();
        } else {
          throw new Error("Failed to send message");
        }
      } catch (error) {
        alert(
          "Sorry, there was an error sending your message. Please try again later."
        );
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = "Send Message";
      }
    });
  }

  // Animation on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".service-card, .team-card, .testimonial-card"
    );
    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const isVisible = elementTop < window.innerHeight && elementBottom >= 0;

      if (isVisible) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Initial check for elements in viewport
  animateOnScroll();

  // Check for elements on scroll
  window.addEventListener("scroll", animateOnScroll);

  // Custom cursor functionality
  const cursor = document.querySelector(".custom-cursor");
  const cursorFollower = document.querySelector(".custom-cursor-follower");

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    // Add a slight delay to the follower for a nice effect
    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px";
      cursorFollower.style.top = e.clientY + "px";
    }, 50);
  });

  // Add special effects when hovering over interactive elements
  const interactiveElements = document.querySelectorAll(
    "a, button, input, textarea, select, .btn"
  );

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("cursor-hover");
      cursorFollower.classList.add("cursor-hover");
    });

    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("cursor-hover");
      cursorFollower.classList.remove("cursor-hover");
    });
  });

  // Hide cursor when mouse leaves the window
  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
    cursorFollower.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
    cursorFollower.style.opacity = "1";
  });

  // Add click effect
  document.addEventListener("mousedown", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
    cursorFollower.style.transform = "translate(-50%, -50%) scale(0.8)";
  });

  document.addEventListener("mouseup", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
    cursorFollower.style.transform = "translate(-50%, -50%) scale(1)";
  });

  // Scroll Progress Indicator
  const scrollProgress = document.querySelector(".scroll-progress-bar");

  window.addEventListener("scroll", () => {
    // Calculate scroll progress
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;

    // Update progress bar width
    scrollProgress.style.width = `${progress}%`;

    // Hide scroll down indicator after scrolling
    const scrollDownIndicator = document.querySelector(
      ".scroll-down-indicator"
    );
    if (window.pageYOffset > 300 && scrollDownIndicator) {
      scrollDownIndicator.style.opacity = "0";
      scrollDownIndicator.style.pointerEvents = "none";
    } else if (scrollDownIndicator) {
      scrollDownIndicator.style.opacity = "0.8";
      scrollDownIndicator.style.pointerEvents = "auto";
    }
  });
});
