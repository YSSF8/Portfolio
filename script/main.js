document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = [
        '.about-content',
        '.detail-item',
        '.title',
        '.about-text p',
        '.skills-group',
        '.skill-item',
        '.project-card',
        '.contact-text',
        '.contact-item'
    ].map(selector => [...document.querySelectorAll(selector)]).flat();

    elementsToAnimate.forEach(element => {
        element.classList.add('fade-slide');
    });

    document.querySelectorAll('.skill-level').forEach(skillBar => {
        const targetWidth = skillBar.style.width;
        skillBar.style.width = '0%';
        skillBar.dataset.targetWidth = targetWidth;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                if (entry.target.classList.contains('skill-item')) {
                    const skillBar = entry.target.querySelector('.skill-level');
                    if (skillBar) {
                        setTimeout(() => {
                            skillBar.style.width = skillBar.dataset.targetWidth;
                        }, 300);
                    }
                }

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    const burgerMenu = document.querySelector('.burger-menu');
    const rightSide = document.querySelector('.right-side');

    burgerMenu.addEventListener('click', () => {
        rightSide.classList.toggle('active');

        const icon = burgerMenu.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-bar')) {
            rightSide.classList.remove('active');
            const icon = burgerMenu.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    rightSide.querySelectorAll('.link').forEach(link => {
        link.addEventListener('click', () => {
            rightSide.classList.remove('active');
            const icon = burgerMenu.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    setTimeout(() => {
        window.scrollTo(0, 0);
    });
});