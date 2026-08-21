/* =========================================================
   MENU.JS
   ========================================================= */

console.log("Menu.JS foi carregado");

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
       ===================================================== */

    const navbar = document.querySelector(".navbar");
    const menuButton = document.querySelector(".menu-mobile");
    const navLinks = document.querySelector(".nav-links");
    const menuIcon = menuButton?.querySelector("i");
    const links = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section");


    /* =====================================================
       VERIFICAÇÃO
       Evita erros caso algum elemento não exista no HTML.
       ===================================================== */

    if (!navbar || !menuButton || !navLinks || !menuIcon) {
        console.error("Erro: elementos do menu não foram encontrados.");
        return;
    }


    /* =====================================================
       NAVBAR SCROLL
       ===================================================== */

    function handleNavbar() {

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    // Executa imediatamente ao carregar
    handleNavbar();

    // Atualiza durante o scroll
    window.addEventListener("scroll", handleNavbar);


    /* =====================================================
       ABRIR MENU MOBILE
       ===================================================== */

    function openMenu() {

        navLinks.classList.add("active");

        document.body.style.overflow = "hidden";

        // Troca somente as classes do ícone
        // sem destruir o elemento <i>
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-xmark");

        menuButton.setAttribute("aria-label", "Fechar Menu");
        menuButton.setAttribute("aria-expanded", "true");

    }


    /* =====================================================
       FECHAR MENU MOBILE
       ===================================================== */

    function closeMenu() {

        navLinks.classList.remove("active");

        document.body.style.overflow = "";

        // Volta para o ícone de menu
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");

        menuButton.setAttribute("aria-label", "Abrir Menu");
        menuButton.setAttribute("aria-expanded", "false");

    }


    /* =====================================================
       BOTÃO DO MENU
       ===================================================== */

    menuButton.addEventListener("click", (event) => {

        /*
         * Impede que o clique continue para o listener
         * de "clique fora do menu".
         *
         * Isso também evita conflitos entre eventos.
         */
        event.stopPropagation();

        if (navLinks.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    /* =====================================================
       FECHAR AO CLICAR EM UM LINK DO MENU
       ===================================================== */

    links.forEach(link => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });


    /* =====================================================
       FECHAR COM ESC
       ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    /* =====================================================
       FECHAR AO CLICAR FORA DO MENU
       ===================================================== */

    document.addEventListener("click", (event) => {

        /*
         * Se o menu não estiver aberto, não faz nada.
         */
        if (!navLinks.classList.contains("active")) {
            return;
        }

        /*
         * Se clicou dentro do menu, não fecha.
         */
        if (navLinks.contains(event.target)) {
            return;
        }

        /*
         * Se clicou no botão, não fecha.
         *
         * O botão já possui stopPropagation(),
         * mas mantemos essa proteção por segurança.
         */
        if (menuButton.contains(event.target)) {
            return;
        }

        /*
         * Qualquer outro lugar da página fecha o menu.
         */
        closeMenu();

    });


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", (event) => {

            event.preventDefault();

            const targetId = anchor.getAttribute("href");

            /*
             * Ignora links vazios como href="#"
             */
            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       SCROLL SPY
       ===================================================== */

    function updateScrollSpy() {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 150;

            if (window.scrollY >= top) {
                current = section.getAttribute("id");
            }

        });


        links.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${current}`) {
                link.classList.add("active");
            }

        });

    }


    // Executa imediatamente
    updateScrollSpy();

    // Atualiza durante o scroll
    window.addEventListener("scroll", updateScrollSpy);

});