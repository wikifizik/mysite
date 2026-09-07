const AUTO_DELAY = 3000;

document.querySelectorAll('.book-slider').forEach(card => {
  const slides   = card.querySelectorAll('.book-slide');
  const prevBtn  = card.querySelector('.book-prev');
  const nextBtn  = card.querySelector('.book-next');
  const counter  = card.querySelector('.book-counter');
  const dotsBox  = card.querySelector('.book-dots');
  const total    = slides.length;

  let index = 0;
  let timer = null;
  let isHovering = false;

  // Build numbered dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'book-dot' + (i === 0 ? ' active' : '');
    dot.textContent = i + 1;
    dot.addEventListener('click', () => { goTo(i); restart(); });
    dotsBox.appendChild(dot);
  });
  const dots = dotsBox.querySelectorAll('.book-dot');

  function render() {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    dots.forEach((d, i)  => d.classList.toggle('active', i === index));
    counter.textContent = (index + 1) + ' / ' + total;
  }

  function goTo(i) {
    index = (i + total) % total;
    render();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function start() {
    stop();
    timer = setInterval(next, AUTO_DELAY);
  }

  function stop() {
    clearInterval(timer);
    timer = null;
  }

  function restart() {
    stop();
    if (!isHovering) start();
  }

  // ✅ Hover on the CARD
  card.addEventListener('mouseenter', () => { isHovering = true; stop(); });
  card.addEventListener('mouseleave', () => { isHovering = false; start(); });

  // ✅ Hover on NAV BUTTONS (they sit at the edge, card mouseleave can fire)
  prevBtn.addEventListener('mouseenter', () => { isHovering = true; stop(); });
  prevBtn.addEventListener('mouseleave', () => { isHovering = false; start(); });
  nextBtn.addEventListener('mouseenter', () => { isHovering = true; stop(); });
  nextBtn.addEventListener('mouseleave', () => { isHovering = false; start(); });

  // ✅ Hover on DOTS container
  dotsBox.addEventListener('mouseenter', () => { isHovering = true; stop(); });
  dotsBox.addEventListener('mouseleave', () => { isHovering = false; start(); });

  // Navigation
  prevBtn.addEventListener('click', () => { prev(); restart(); });
  nextBtn.addEventListener('click', () => { next(); restart(); });

  // Init
  render();
  start();
});   