/* =====================================================
   UNITED HORIZONS PARTY
   Arizona Online — Fictional RP Project
   ===================================================== */


/*
=========================================================
ВАЖНО

После создания Cloudflare Worker сюда нужно вставить
его адрес.

Например:

const APPLICATION_API =
    "https://united-horizons.workers.dev";

НЕ вставляй сюда Discord Webhook.
=========================================================
*/

const APPLICATION_API =
    "PASTE_YOUR_CLOUDFLARE_WORKER_URL_HERE";


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =================================================
           SMOOTH SCROLL
           ================================================= */

        document
            .querySelectorAll('a[href^="#"]')
            .forEach(link => {

                link.addEventListener(
                    "click",
                    event => {

                        const id =
                            link.getAttribute("href");

                        if (
                            !id ||
                            id === "#"
                        ) {
                            return;
                        }

                        const target =
                            document.querySelector(id);

                        if (!target) {
                            return;
                        }

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }
                );

            });


        /* =================================================
           ACTIVE NAVIGATION
           ================================================= */

        const sections =
            document.querySelectorAll(
                "main section[id]"
            );

        const navLinks =
            document.querySelectorAll(
                ".navigation a"
            );


        function updateNavigation() {

            let current = "";

            sections.forEach(section => {

                const top =
                    section.offsetTop - 200;

                const bottom =
                    top + section.offsetHeight;

                if (
                    window.scrollY >= top &&
                    window.scrollY < bottom
                ) {

                    current =
                        section.id;

                }

            });


            navLinks.forEach(link => {

                link.classList.remove(
                    "active"
                );

                if (
                    link.getAttribute("href") ===
                    `#${current}`
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            });

        }


        window.addEventListener(
            "scroll",
            updateNavigation,
            { passive: true }
        );

        updateNavigation();


        /* =================================================
           HEADER
           ================================================= */

        const header =
            document.querySelector(
                ".site-header"
            );


        window.addEventListener(
            "scroll",
            () => {

                if (
                    window.scrollY > 40
                ) {

                    header.style.background =
                        "rgba(3,10,18,.98)";

                } else {

                    header.style.background =
                        "rgba(7,21,37,.96)";

                }

            },
            { passive: true }
        );


        /* =================================================
           REVEAL ANIMATION
           ================================================= */

        const revealElements =
            document.querySelectorAll(
                ".platform-card, .leader-card, .about-main, .about-card"
            );


        revealElements.forEach(element => {

            element.style.opacity = "0";

            element.style.transform =
                "translateY(25px)";

            element.style.transition =
                "opacity .7s ease, transform .7s ease";

        });


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: .12
                }
            );


        revealElements.forEach(element => {

            observer.observe(element);

        });


        /* =================================================
           APPLICATION MODAL
           ================================================= */

        const modal =
            document.getElementById(
                "applicationModal"
            );

        const openButton =
            document.getElementById(
                "openApplication"
            );

        const closeButton =
            document.getElementById(
                "closeApplication"
            );


        function openModal() {

            modal.classList.add(
                "active"
            );

            document.body.classList.add(
                "modal-open"
            );

        }


        function closeModal() {

            modal.classList.remove(
                "active"
            );

            document.body.classList.remove(
                "modal-open"
            );

        }


        openButton.addEventListener(
            "click",
            openModal
        );


        closeButton.addEventListener(
            "click",
            closeModal
        );


        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    closeModal();

                }

            }
        );


        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    modal.classList.contains(
                        "active"
                    )
                ) {

                    closeModal();

                }

            }
        );


        /* =================================================
           APPLICATION FORM
           ================================================= */

        const form =
            document.getElementById(
                "partyApplication"
            );

        const nickname =
            document.getElementById(
                "nickname"
            );

        const realAge =
            document.getElementById(
                "realAge"
            );

        const characterAge =
            document.getElementById(
                "characterAge"
            );

        const reason =
            document.getElementById(
                "reason"
            );

        const counter =
            document.getElementById(
                "reasonCounter"
            );

        const message =
            document.getElementById(
                "formMessage"
            );

        const submitButton =
            document.getElementById(
                "submitApplication"
            );


        reason.addEventListener(
            "input",
            () => {

                counter.textContent =
                    reason.value.length;

            }
        );


        function showMessage(
            text,
            type
        ) {

            message.textContent =
                text;

            message.className =
                `form-message ${type}`;

        }


        form.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                if (
                    APPLICATION_API ===
                    "PASTE_YOUR_CLOUDFLARE_WORKER_URL_HERE"
                ) {

                    showMessage(
                        "Система заявок ещё не подключена.",
                        "error"
                    );

                    return;

                }


                submitButton.disabled =
                    true;

                submitButton.textContent =
                    "SENDING...";


                try {

                    const response =
                        await fetch(
                            APPLICATION_API,
                            {

                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify({

                                        nickname:
                                            nickname.value.trim(),

                                        realAge:
                                            realAge.value,

                                        characterAge:
                                            characterAge.value,

                                        reason:
                                            reason.value.trim()

                                    })

                            }
                        );


                    const data =
                        await response.json();


                    if (!response.ok) {

                        throw new Error(
                            data.error ||
                            "Ошибка отправки."
                        );

                    }


                    showMessage(
                        "✓ Заявка отправлена! Руководство партии рассмотрит её в ближайшее время.",
                        "success"
                    );


                    form.reset();

                    counter.textContent =
                        "0";


                } catch (error) {

                    console.error(
                        error
                    );

                    showMessage(
                        "Не удалось отправить заявку. Попробуйте ещё раз.",
                        "error"
                    );

                }


                submitButton.disabled =
                    false;

                submitButton.textContent =
                    "SUBMIT APPLICATION";

            }
        );


        /* =================================================
           CURRENT YEAR
           ================================================= */

        document
            .querySelectorAll(
                "[data-current-year]"
            )
            .forEach(element => {

                element.textContent =
                    new Date()
                        .getFullYear();

            });


    }
);
