/*LOADING SCREEN*/

document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("loader");
    if (!loader) return;

    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
            document.body.classList.add("loaded");
        }, 700);
    });
});