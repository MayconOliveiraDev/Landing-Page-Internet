document.addEventListener("DOMContentLoaded", () => {

    const faqItems = document.querySelectorAll(".faq-item");
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        question.setAttribute("aria-expanded", "false");
        answer.style.maxHeight = "0px";
        question.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            // Fecha todos
            faqItems.forEach(faq => {
                faq.classList.remove("active");
                faq.querySelector(".faq-question")
                    .setAttribute("aria-expanded", "false");
                faq.querySelector(".faq-answer")
                    .style.maxHeight = "0px";
            });

            // Abre somente o clicado
            if (!isActive) {
                item.classList.add("active");
                question.setAttribute("aria-expanded", "true");
                answer.style.maxHeight =
                    answer.scrollHeight + "px";
            }
        });
    });
});