document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in-up');

    function checkVisibility() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            // Если элемент в зоне видимости (верх элемента выше нижней границы окна)
            if (elementTop < windowHeight - 50) { // 50px — запас перед появлением
                element.classList.add('visible');
            }
        });
    }

    // Проверяем при загрузке и при прокрутке
    window.addEventListener('load', checkVisibility);
    window.addEventListener('scroll', checkVisibility);

    // Первая проверка (на случай, если элементы уже в зоне видимости)
    checkVisibility();
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Отключаем наблюдение после появления
        }
    });
}, { threshold: 0.1 }); // Срабатывает при 10% видимости элемента

document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));