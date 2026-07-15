class ScrollReveal {
  constructor() {
    this.elements = document.querySelectorAll('[data-reveal]');
    if (!this.elements.length) return;
    this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || 0;
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, parseInt(delay));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    this.elements.forEach((el) => observer.observe(el));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ScrollReveal();
});
