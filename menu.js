/*MENU.JS*/
console.log("Menu.JS foi carregado")

document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    const menuButton = document.querySelector(".menu-mobile");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links a");


    /*NAVBAR SCROLL*/
    function handleNavbar(){
        if(window.scrollY > 50){
            navbar.classList.add("scrolled");
        }else{
            navbar.classList.remove("scrolled");
        }
    }
    handleNavbar();
    window.addEventListener("scroll", handleNavbar);

    /*MENU MOBILE*/

    function openMenu(){
        navLinks.classList.add("active");
        document.body.style.overflow = "hidden";
        menuButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    }

    function closeMenu(){
        navLinks.classList.remove("active");
        document.body.style.overflow = "";
        menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }

    menuButton.addEventListener("click", () => {
        navLinks.classList.contains("active")
            ? closeMenu()
            : openMenu();
    });

    /*FECHAR AO CLICAR NO LINK*/

    links.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    /*ESC*/

    document.addEventListener("keydown", e => {
        if(e.key === "Escape"){
            closeMenu();
        }
    });
});

    /*CLICK FORA*/

document.addEventListener("click", (event)=>{

    const menu = document.querySelector(".nav-links");
    const button = document.querySelector(".menu-mobile");

    if(
        menu.classList.contains("active") &&
        !menu.contains(event.target) &&
        !button.contains(event.target)
    )
    {
        menu.classList.remove("active");
        document.body.style.overflow="";
        button.innerHTML='<i class="fa-solid fa-bars"></i>';

    }

});

    /*SMOOTH SCROLL*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",(e)=>{
        e.preventDefault();
        const target=document.querySelector(anchor.getAttribute("href"));
        if(!target) return;
        target.scrollIntoView({
            behavior:"smooth",
            block:"start"
        });
    });
});

    /*SCROLL SPY*/

const sections=document.querySelectorAll("section");

window.addEventListener("scroll",()=>{
    let current="";

    sections.forEach(section=>{
        const top=section.offsetTop-150;
        const height=section.offsetHeight;
        if(window.scrollY>=top){
            current=section.getAttribute("id");
        }
    });

    links.forEach(link=>{
        link.classList.remove("active");
        if(link.getAttribute("href")==="#" + current){
            link.classList.add("active");
        }
    });
});