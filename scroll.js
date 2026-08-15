/*PROGRESS BAR*/

const progressBar = document.getElementById("progress-bar");

function updateProgressBar() {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / documentHeight) * 100;
    progressBar.style.width = `${progress}%`;
}

/*BACK TO TOP*/

const backToTop = document.getElementById("backToTop");
function toggleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
}

backToTop?.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/*REVEAL*/

const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
(entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("active");
        }
    });
},

{
    threshold:0.15
}

);
revealElements.forEach(element=>{
    observer.observe(element);
});

/*PARALLAX HERO*/

const heroImage = document.querySelector(".hero-image");
function heroParallax(){
    if(!heroImage) return;
    const offset = window.scrollY * 0.15;
    heroImage.style.transform = `translateY(${offset}px)`;
}

/*SCROLL EVENTS*/

let ticking = false;

window.addEventListener("scroll", () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateProgressBar();
            toggleBackToTop();
            heroParallax();
            ticking = false;
        });
        ticking = true;
    }
});

/*INICIALIZACAO*/

updateProgressBar();
toggleBackToTop();
heroParallax();