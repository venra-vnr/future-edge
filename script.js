// FutureEdge Technology — shared site behaviour
document.addEventListener('DOMContentLoaded', function () {

  /* Sticky header shadow on scroll */
  var header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    }, { passive: true });
  }

  /* Mobile nav toggle */
  var toggle = document.querySelector('.menu-toggle');
  var links = document.querySelector('nav.links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  /* Highlight active nav link */
  var here = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('nav.links a[href]').forEach(function (a) {
    var href = a.getAttribute('href').split('/').pop();
    if (href === here || (here === '' && href === 'index.html')) a.classList.add('active');
  });

  /* Hero banner rotation (5 rotating headers) */
  var slides = document.querySelectorAll('.hero-slide');
  var dotsWrap = document.querySelector('.hero-dots');
  if (slides.length) {
    var current = 0;
    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var b = document.createElement('button');
        if (i === 0) b.classList.add('active');
        b.setAttribute('aria-label', 'Show banner ' + (i + 1));
        b.addEventListener('click', function () { setSlide(i); });
        dotsWrap.appendChild(b);
      });
    }
    function setSlide(i) {
      slides[current].classList.remove('active');
      if (dotsWrap) dotsWrap.children[current].classList.remove('active');
      current = i;
      slides[current].classList.add('active');
      if (dotsWrap) dotsWrap.children[current].classList.add('active');
    }
    setInterval(function () { setSlide((current + 1) % slides.length); }, 4200);
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (o) {
        if (o !== item) { o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null; }
      });
      item.classList.toggle('open', !isOpen);
      a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : null;
    });
  });

  /* Testimonial slider */
  var tSlides = document.querySelectorAll('.testi-slide');
  var tNav = document.querySelector('.testi-nav');
  if (tSlides.length) {
    var tCurrent = 0;
    if (tNav) {
      tSlides.forEach(function (_, i) {
        var b = document.createElement('button');
        if (i === 0) b.classList.add('active');
        b.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
        b.addEventListener('click', function () { setT(i); });
        tNav.appendChild(b);
      });
    }
    function setT(i) {
      tSlides[tCurrent].classList.remove('active');
      if (tNav) tNav.children[tCurrent].classList.remove('active');
      tCurrent = i;
      tSlides[tCurrent].classList.add('active');
      if (tNav) tNav.children[tCurrent].classList.add('active');
    }
    setInterval(function () { setT((tCurrent + 1) % tSlides.length); }, 5500);
  }

  /* Gallery lightbox */
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lbImg = lightbox.querySelector('img');
    document.querySelectorAll('.gallery-grid a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        lbImg.src = a.getAttribute('href');
        lbImg.alt = a.querySelector('img').alt;
        lightbox.classList.add('show');
      });
    });
    lightbox.addEventListener('click', function () { lightbox.classList.remove('show'); });
  }

  /* Contact form (client-side demo — wire to a backend or form service for production) */
  var form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = document.getElementById('form-success');
      if (success) {
        success.classList.add('show');
        success.textContent = 'Thanks! Your enquiry has been noted. Our counsellor will call you shortly.';
      }
      form.reset();
    });
  }

  /* Newsletter form */
  var news = document.getElementById('newsletter-form');
  if (news) {
    news.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = news.querySelector('.news-msg');
      if (msg) msg.textContent = 'Subscribed! Watch your inbox for batch updates.';
      news.reset();
    });
  }

  /* Back to top */
  var topBtn = document.querySelector('.fab.top');
  if (topBtn) {
    window.addEventListener('scroll', function () {
      topBtn.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
