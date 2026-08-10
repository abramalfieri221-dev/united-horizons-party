/*
=========================================================
UNITED HORIZONS PARTY
Arizona Online — Fictional RP Project
=========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    const navigationLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    navigationLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length <= 1
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const navLinks = document.querySelectorAll(
        ".navigation a:not(.nav-button)"
    );

    const updateActiveNavigation = () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 180;
            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                currentSection = section.id;
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    };

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".platform-card, .leader-card, .news-card, .about-main, .about-card"
    );

    revealElements.forEach(element => {

        element.style.opacity = "0";
        element.style.transform = "translateY(25px)";
        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

    });


    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.style.opacity = "1";
                entry.target.style.transform =
                    "translateY(0)";

                revealObserver.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       HEADER SCROLL EFFECT
       ===================================================== */

    const header = document.querySelector(".site-header");

    const updateHeader = () => {

        if (!header) {
            return;
        }

        if (window.scrollY > 40) {

            header.style.background =
                "rgba(3, 10, 18, 0.98)";

        } else {

            header.style.background =
                "rgba(7, 21, 37, 0.96)";

        }

    };

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =====================================================
       HERO PARALLAX
       ===================================================== */

    const hero = document.querySelector(".hero");

    if (hero) {

        window.addEventListener(
            "scroll",
            () => {

                const scrollPosition = window.scrollY;

                if (scrollPosition < hero.offsetHeight) {

                    const heroBackground =
                        hero.querySelector(".hero::before");

                    hero.style.backgroundPosition =
                        `center ${scrollPosition * 0.15}px`;

                }

            },
            { passive: true }
        );

    }


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const yearElements =
        document.querySelectorAll("[data-current-year]");

    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       BUTTON INTERACTION
       ===================================================== */

    const buttons =
        document.querySelectorAll(".button");

    buttons.forEach(button => {

        button.addEventListener("mouseenter", () => {

            button.style.transform =
                "translateY(-2px)";

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform =
                "translateY(0)";

        });

    });


    /* =====================================================
       CONSOLE MESSAGE
       ===================================================== */

    console.log(
        "%cUNITED HORIZONS PARTY",
        "font-size: 20px; font-weight: 900;"
    );

    console.log(
        "%cArizona Online — Fictional Roleplay Project",
        "font-size: 12px;"
    );

});
