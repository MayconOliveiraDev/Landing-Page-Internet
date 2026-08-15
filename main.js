document.addEventListener("DOMContentLoaded", () => {

    console.log("%cMAX NET",
        "font-size:24px;color:#00C2FF;font-weight:bold;"
    );

    console.log("Landing desenvolvida por Maycon Oliveira 🚀");

    initializeLazyLoading();
});

function initializeLazyLoading(){
    const images=document.querySelectorAll("img[data-src]");
    if(!images.length) return;
    const observer=new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{
            if(entry.isIntersecting){
                const img=entry.target;
                img.src=img.dataset.src;
                img.removeAttribute("data-src");
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img=>observer.observe(img));
}
