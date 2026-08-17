/*WHATSAPP.JS*/

document.addEventListener("DOMContentLoaded", () => {
    const whatsappButton = document.querySelector(".whatsapp-float");
    if (!whatsappButton) return;

    /*CONFIGURAÇÃO*/

    const PHONE = "5514981767503"; // <-- Alterar para o número do Provedor

    const MESSAGE =
        "Olá! 👋 Vim pelo site da Conecta + e gostaria de contratar um plano de internet."; // <-- Alterar para o nome do provedor

    /*LINK*/

    const url =
        `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;

    whatsappButton.href = url;
    whatsappButton.target = "_blank";
    whatsappButton.rel = "noopener noreferrer";
});

/*TRACK CLICK*/

whatsappButton.addEventListener("click", () => {

    console.log("WhatsApp clicado");

    /*
    Futuramente:

    gtag('event','whatsapp_click');

    fbq('trackCustom','WhatsAppClick');

    */
});

/*IDLE ANIMATION*/

let idleTimer;

function startIdleAnimation(){
    whatsappButton.classList.add("idle");
}

function resetIdleTimer(){
    whatsappButton.classList.remove("idle");
    clearTimeout(idleTimer);
    idleTimer = setTimeout(startIdleAnimation,8000);
}

["mousemove","scroll","keydown","touchstart"]

.forEach(event=>{
    window.addEventListener(event,resetIdleTimer);
});

resetIdleTimer();