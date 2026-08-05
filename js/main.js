document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona todos os elementos que possuem a classe .reveal
    const reveals = document.querySelectorAll('.reveal');

    // Configura o observador (Intersection Observer)
    const observerOptions = {
        root: null, // Usa o viewport do navegador
        rootMargin: '0px',
        threshold: 0.15 // Dispara quando 15% do elemento estiver visível
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Se o elemento entrou na tela
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Para de observar depois que já apareceu (opcional, remova se quiser que repita)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Inicia a observação em cada elemento
    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

});