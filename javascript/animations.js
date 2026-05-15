// Scroll animation trigger using Intersection Observer
document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe content elements (excluding tables)
  const selectors = [
    '.md-content h1',
    '.md-content h2',
    '.md-content h3',
    '.md-content p',
    '.md-content ul',
    '.md-content ol',
    '.md-content img'
  ];

  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      observer.observe(el);
    });
  });
});
