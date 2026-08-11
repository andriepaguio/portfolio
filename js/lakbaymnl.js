/*=========================================*
    LAKBAYMNL CASE STUDY
*=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=====================================
    ELEMENTS
    =====================================*/

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".sidebar-menu nav a");
    const backToTop = document.getElementById("backToTop");
    const counters = document.querySelectorAll("[data-target]");

    /*=====================================
    ACTIVE SIDEBAR LINK
    =====================================*/

    function updateActiveSection() {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                current = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveSection);
    updateActiveSection();

    /*=====================================
    SMOOTH SCROLL
    =====================================*/

    navLinks.forEach(link => {

        link.addEventListener("click", e => {

            e.preventDefault();

            const target = document.querySelector(link.getAttribute("href"));

            if (!target) return;

            window.scrollTo({

                top: target.offsetTop - 60,
                behavior: "smooth"

            });

        });

    });

    /*=====================================
    BACK TO TOP
    =====================================*/

    function toggleBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }

    if (backToTop) {

        window.addEventListener("scroll", toggleBackToTop);

        toggleBackToTop();

        backToTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,
                behavior: "smooth"

            });

        });

    }

    /*=====================================
    SCROLL REVEAL
    =====================================*/

    const revealElements = document.querySelectorAll(`
        .section-heading,
        .overview-card,
        .feature-card,
        .challenge-card,
        .solution-showcase,
        .research-card,
        .insights-wrapper,
        .persona-card,
        .process-block,
        .design-evolution,
        .evolution-card,
        .showcase-hero,
        .screen-card,
        .highlight-card,
        .reflection .overview-card
    `);

    const revealObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("reveal");
                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.15

    });

    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

    /*=====================================
    RESEARCH COUNTER ANIMATION
    =====================================*/

    function animateCounter(counter) {

        const target = parseFloat(counter.dataset.target);
        const suffix = counter.dataset.suffix || "";
        const isDecimal = counter.dataset.decimal === "true";

        let current = 0;

        const duration = 1800;
        const step = target / (duration / 16);

        function updateCounter() {

            current += step;

            if (current >= target) current = target;

            counter.textContent = isDecimal
                ? current.toFixed(2) + suffix
                : Math.floor(current) + suffix;

            if (current < target) {
                requestAnimationFrame(updateCounter);
            }

        }

        updateCounter();

    }

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.6

    });

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

    /*=====================================
    IMAGE HOVER EFFECT
    =====================================*/

    const images = document.querySelectorAll(
        ".screen-card img, .showcase-phone img"
    );

    images.forEach(image => {

        image.addEventListener("mouseenter", () => {

            image.style.transition = ".35s ease";

        });

        image.addEventListener("mousemove", (e) => {

            const rect = image.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateY = (x / rect.width - 0.5) * 8;
            const rotateX = -(y / rect.height - 0.5) * 8;

            image.style.transform =
                `perspective(800px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.05)`;

        });

        image.addEventListener("mouseleave", () => {

            image.style.transform =
                "perspective(800px) rotateX(0) rotateY(0) scale(1)";

        });

    });

    /*=====================================
    PAGE LOADED
    =====================================*/

    document.body.classList.add("loaded");

});