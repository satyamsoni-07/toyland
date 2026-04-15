/**
 * ToyLand - Main JavaScript
 * Handles Loading, Theme Toggle, Navbar, Cart, Counter Animation, and Form Validation
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Loader Animation
    const loader = document.getElementById("loader");
    // Adding a slight delay to ensure user sees the "Fun" loading screen
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 500); // Wait for transition
    }, 1500);

    // 2. Sticky Navbar and Active Links
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
            navbar.style.height = "70px";
        } else {
            navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
            navbar.style.height = "80px";
        }
    });

    // 3. Hamburger Menu Toggle (Mobile)
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        const icon = hamburger.querySelector("i");
        if(navLinks.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });

    // Close mobile menu when link clicked
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            const icon = hamburger.querySelector("i");
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        });
    });

    // 4. Dark/Light Theme Toggle
    const themeToggleBtn = document.getElementById("theme-toggle");
    const body = document.body;
    const themeIcon = themeToggleBtn.querySelector("i");

    // Check localStorage for preferred theme
    const savedTheme = localStorage.getItem("toyland-theme");
    if (savedTheme === "dark") {
        body.classList.replace("light-mode", "dark-mode");
        themeIcon.classList.replace("fa-moon", "fa-sun");
    }

    themeToggleBtn.addEventListener("click", () => {
        if (body.classList.contains("light-mode")) {
            body.classList.replace("light-mode", "dark-mode");
            themeIcon.classList.replace("fa-moon", "fa-sun");
            localStorage.setItem("toyland-theme", "dark");
        } else {
            body.classList.replace("dark-mode", "light-mode");
            themeIcon.classList.replace("fa-sun", "fa-moon");
            localStorage.setItem("toyland-theme", "light");
        }
    });

    // 5. Shopping Cart Logic (Counter)
    const cartCountEl = document.getElementById("cart-count");
    const addCartBtns = document.querySelectorAll(".add-to-cart-btn");
    let cartCount = 0;

    addCartBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            cartCount++;
            cartCountEl.textContent = cartCount;
            
            // Add a little pop animation to the count
            cartCountEl.style.transform = "scale(1.5)";
            setTimeout(() => {
                cartCountEl.style.transform = "scale(1)";
            }, 300);

            // Change button text temporarily
            const originalText = this.textContent;
            this.textContent = "Added!";
            this.style.backgroundColor = "var(--secondary)";
            this.style.borderColor = "var(--secondary)";
            this.style.color = "white";

            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = "transparent";
                this.style.borderColor = "var(--primary)";
                this.style.color = "var(--primary)";
            }, 2000);
        });
    });

    // 6. Number Counter in About Section
    const counters = document.querySelectorAll(".counter");
    let started = false; // Prevent multiple triggers

    const startCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60 FPS
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                    if(target === 50000) counter.innerText = "50k+";
                    if(target === 1500) counter.innerText = "1500+";
                }
            };
            updateCounter();
        });
    };

    // Trigger counters on scroll
    window.addEventListener("scroll", () => {
        const aboutSection = document.getElementById("about");
        if(aboutSection) {
            const sectionPos = aboutSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.3;
            if(sectionPos < screenPos && !started) {
                startCounters();
                started = true;
            }
        }
    });

    // 7. Contact Form Validation
    const contactForm = document.getElementById("contact-form");
    
    // Create an alert element dynamically
    const alertBox = document.createElement("div");
    alertBox.className = "alert success";
    alertBox.innerHTML = "<i class='fa-solid fa-circle-check'></i> Thank you! Your message has been sent.";
    contactForm.appendChild(alertBox);

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");
        let isValid = true;

        // Reset errors
        [name, email, message].forEach(el => {
            el.parentElement.classList.remove("error");
        });

        if(name.value.trim() === "") {
            name.parentElement.classList.add("error");
            isValid = false;
        }

        if(email.value.trim() === "" || !email.value.includes("@")) {
            email.parentElement.classList.add("error");
            isValid = false;
        }

        if(message.value.trim() === "") {
            message.parentElement.classList.add("error");
            isValid = false;
        }

        if(isValid) {
            // Show Success
            alertBox.classList.add("show");
            contactForm.reset();
            
            setTimeout(() => {
                alertBox.classList.remove("show");
            }, 5000);
        }
    });
});
