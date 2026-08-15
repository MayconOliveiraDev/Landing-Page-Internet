/*Premium Card Interactions*/

document.addEventListener("DOMContentLoaded", () => {

    // Não executa em dispositivos touch
    if (
        window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth < 992
    ) {
        return;
    }

    const cards = document.querySelectorAll(
        ".plan-card, .benefit-card, .step-card"
    );

    cards.forEach(card => {

        const glow = document.createElement("div");
        glow.classList.add("card-glow");
        card.appendChild(glow);

        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = ((x - centerX) / centerX) * 8;
            const rotateX = ((centerY - y) / centerY) * 8;
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-10px)
            `;

            glow.style.opacity = "1";
            glow.style.left = x + "px";
            glow.style.top = y + "px";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = `
                perspective(1000px)
                rotateX(0deg)
                rotateY(0deg)
                translateY(0px)
            `;
            glow.style.opacity = "0";
        });
    });
});