// ==== HEADER SECTION (DARK BUTTON) ===
const darkButton = document.querySelector('.dark-button');
darkButton.addEventListener('click', function () {
  document.documentElement.classList.toggle('dark');

  darkButton.innerHTML = document.documentElement.classList.contains('dark')
    ? `
<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  class="size-4.5"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
  />
</svg>
`
    : `
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="currentColor"
  class="size-4.5"
>
  <path
    fill-rule="evenodd"
    d="M7.455 2.004a.75.75 0 0 1 .26.77 7 7 0 0 0 9.958 7.967.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083Z"
    clip-rule="evenodd"
  />
</svg>
      `;
});

// ==== HEADER SECTION (LOGO CLICK) ===

const logos = document.querySelectorAll('.logo');
logos.forEach((logo) => {
  logo.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
});

// ==== HEADER SECTION (OFFSET MENU) ===
const hamburgerButton = document.querySelector('.hamburger-button');
const offsetMenu = document.querySelector('.offset-menu');

hamburgerButton.addEventListener('click', function () {
  hamburgerButton.classList.toggle('active');
  offsetMenu.classList.toggle('active');
  document.body.classList.toggle('overflow-hidden');
});

document.addEventListener('click', function (event) {
  const isNavMenu = event.target.closest('nav ul li');
  const isBtn = event.target.closest('nav .offset-button');

  if (isNavMenu || isBtn) {
    hamburgerButton.classList.remove('active');
    offsetMenu.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
  }
});

// ==== TRUSTED BY GLOBAL INNOVATORS SECTION (MARQUEE) ====

const logoTrack = document.querySelector('.logo-track');
let position = 0;
let speed = 1;

function animateMarquee() {
  if (!isDragging) {
    position -= speed;
  }

  logoTrack.style.transform = `translateX(${position}px)`;

  const half = logoTrack.scrollWidth / 2;

  if (position <= -half) {
    position += half;
  }

  requestAnimationFrame(animateMarquee);
}

let isDragging = false;
let startX;
let currentX;
let previousPosition = 0;

logoTrack.addEventListener('mousedown', function (e) {
  isDragging = true;
  startX = e.clientX;
  previousPosition = position;
});

document.addEventListener('mousemove', function (e) {
  if (!isDragging) return;

  currentX = e.clientX;

  const deltaX = currentX - startX;

  position = previousPosition + deltaX;

  logoTrack.style.cursor = 'grabbing';
});

document.addEventListener('mouseup', function () {
  isDragging = false;
  logoTrack.style.cursor = 'grab';
});

animateMarquee();
