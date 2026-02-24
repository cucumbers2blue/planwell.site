// PlanWell Desktop website interactions (no analytics, no tracking)

document.addEventListener('DOMContentLoaded', () => {
  const yearTargets = document.querySelectorAll('[data-year]');
  const currentYear = new Date().getFullYear();
  yearTargets.forEach((node) => {
    node.textContent = String(currentYear);
  });

  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const targetSelector = button.getAttribute('data-copy');
      if (!targetSelector) {
        return;
      }

      const source = document.querySelector(targetSelector);
      if (!source) {
        return;
      }

      const text = source.textContent ? source.textContent.trim() : '';
      if (!text) {
        return;
      }

      const originalLabel = button.textContent;

      try {
        await navigator.clipboard.writeText(text);
        button.textContent = 'Copied';
      } catch (_error) {
        button.textContent = 'Copy failed';
      }

      window.setTimeout(() => {
        if (originalLabel) {
          button.textContent = originalLabel;
        }
      }, 1200);
    });
  });

  const carousels = document.querySelectorAll('[data-carousel]');
  carousels.forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const dots = Array.from(carousel.querySelectorAll('.carousel-dot'));
    const prevButton = carousel.querySelector('[data-carousel-prev]');
    const nextButton = carousel.querySelector('[data-carousel-next]');

    if (slides.length === 0) {
      return;
    }

    let current = 0;
    let timer = null;

    const showSlide = (index) => {
      const normalized = (index + slides.length) % slides.length;
      current = normalized;

      slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === normalized);
      });

      dots.forEach((dot, i) => {
        const isActive = i === normalized;
        dot.classList.toggle('is-active', isActive);
        if (isActive) {
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.removeAttribute('aria-current');
        }
      });
    };

    const schedule = () => {
      if (slides.length < 2) {
        return;
      }
      window.clearInterval(timer);
      timer = window.setInterval(() => {
        showSlide(current + 1);
      }, 4500);
    };

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        showSlide(current - 1);
        schedule();
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        showSlide(current + 1);
        schedule();
      });
    }

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const next = Number(dot.getAttribute('data-carousel-dot'));
        if (!Number.isNaN(next)) {
          showSlide(next);
          schedule();
        }
      });
    });

    carousel.addEventListener('mouseenter', () => {
      window.clearInterval(timer);
    });

    carousel.addEventListener('mouseleave', () => {
      schedule();
    });

    showSlide(0);
    schedule();
  });
});
