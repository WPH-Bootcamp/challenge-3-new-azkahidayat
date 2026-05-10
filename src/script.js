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

// ==== OUR PROCESS SECTION (TIMELINE - ACCORDION) ====
const items = document.querySelectorAll('.our-process-item');

items.forEach((item, index) => {
  const btn = item.querySelector('.acc-chev-btn');

  btn.addEventListener('click', function () {
    const isActive = item.classList.contains('active');
    const content = item.querySelector('.content-conteiner');
    const icon = btn.querySelector('svg');

    if (!isActive) {
      icon.classList.add('rotate-180');
      item.classList.add('active');
      content.style.height = content.scrollHeight + 'px';
    } else {
      icon.classList.remove('rotate-180');
      item.classList.remove('active');
      content.style.height = '0px';
    }
  });
});

// ==== BUILT FOR YOUR INDUSTRY SECTION (TABS) ====
const tabButtons = document.querySelectorAll('.tabs-buttons button');
const tabContents = document.querySelectorAll('.tab-contents .content');

tabButtons.forEach((button) => {
  button.addEventListener('click', function () {
    let btnDataTab = this.dataset.tab;

    // reset button
    tabButtons.forEach((button) => {
      button.dataset.active = 'false';
    });

    // change state
    this.dataset.active = 'true';

    tabContents.forEach((content) => {
      // reset content
      content.dataset.active = 'false';

      // change state
      const contentDataTab = content.dataset.tab;

      if (btnDataTab === contentDataTab) {
        content.dataset.active = 'true';
      }
    });
  });
});

// ==== WHAT PARTNERS SAY SECTION (TESTIMONY - CAROUSEL) ====

const dotButtons = document.querySelectorAll('.dot');
const track = document.querySelector('.testimony-track');
const outerWrapper = document.querySelector('.outer-wrapper');
const cards = document.querySelectorAll('.card');

let activeIndex = 1;

dotButtons[activeIndex].dataset.active = 'true';
renderCarousel();

window.addEventListener('resize', renderCarousel);

dotButtons.forEach((button, index) => {
  button.addEventListener('click', function () {
    // reset button
    dotButtons.forEach((button) => {
      button.dataset.active = 'false';
    });

    activeIndex = index;
    this.dataset.active = 'true';
    renderCarousel();
  });
});

function renderCarousel() {
  if (window.innerWidth < 1024) {
    track.style.transform = `translateX(-${activeIndex * 100}%)`;
  } else {
    const wrapperCenterPosition = outerWrapper.clientWidth / 2;

    const activeCard = cards[activeIndex];
    const cardCenterPosition =
      activeCard.offsetLeft + activeCard.clientWidth / 2;

    track.style.transform = `translateX(${wrapperCenterPosition - cardCenterPosition}px)`;
  }
}

// ==== NEED HELP? SECTION (FAQ ACCORDION) ====
const needHelpAccItems = document.querySelectorAll('.need-help-acc-item');

let activeItemIndex = null;

needHelpAccItems.forEach((item, index) => {
  const button = item.querySelector('.faq-acc-button');

  button.addEventListener('click', function () {
    if (index === activeItemIndex) {
      activeItemIndex = null;
    } else {
      activeItemIndex = index;
    }

    renderAcc();
  });
});

function renderAcc() {
  needHelpAccItems.forEach((item, index) => {
    const content = item.querySelector('.faq-acc-content');
    const verticalLine = item.querySelector('.vertical-line');

    if (index === activeItemIndex) {
      content.style.height = `${content.scrollHeight}px`;
      verticalLine.classList.add('opacity-0');
    } else {
      content.style.height = `0px`;
      verticalLine.classList.remove('opacity-0');
    }
  });
}

// ==== READY TO START SECTION (FORM - MODAL) ====
const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  let isValid = true;

  const name = this.querySelector('#name');
  const email = this.querySelector('#email');
  const message = this.querySelector('#message');
  const checkboxInputs = this.querySelectorAll('.checkbox-input');

  isValid = validateInput(name, 'Please enter your name!') && isValid;
  isValid = validateInput(email, 'Please enter your email!') && isValid;
  isValid = validateInput(message, 'Please enter your message!') && isValid;
  isValid = validateInput(checkboxInputs, 'Choose at least one!') && isValid;

  if (isValid) {
    form.reset();
    const formInputs = form.querySelectorAll('.form-input');
    const submitButton = form.querySelector('.submit-button');

    formInputs.forEach((input) => {
      input.disabled = true;
    });

    submitButton.disabled = true;
    submitButton.innerText = 'Sending Your Message...';

    setTimeout(() => {
      formInputs.forEach((input) => {
        input.disabled = false;
      });
      submitButton.disabled = false;
      submitButton.innerText = 'Send';
      document.body.classList.add('overflow-hidden');
      renderModal();
    }, 1000);
  }
});

function validateInput(elementInput, errorMessage) {
  if (elementInput instanceof NodeList) {
    const checkboxErrorMessageContainer = form.querySelector(
      '.checkbox-error-container'
    );
    let isChecked = false;

    elementInput.forEach((input) => {
      if (input.checked) {
        isChecked = true;
        checkboxErrorMessageContainer.innerText = '';
        return;
      }
    });

    if (!isChecked) {
      checkboxErrorMessageContainer.innerText = errorMessage;
    }

    return isChecked;
  }

  const inputWrapper = elementInput.closest('.input-wrapper');
  const errorMessageContainer = inputWrapper.querySelector('.error-container');

  if (elementInput.value.trim() === '') {
    elementInput.classList.remove('border-gray-300');
    elementInput.classList.add('border-[#FF623E]');
    errorMessageContainer.innerText = errorMessage;
    return false;
  }

  elementInput.classList.add('border-gray-300');
  elementInput.classList.remove('border-[#FF623E]');
  errorMessageContainer.innerText = '';
  return true;
}

const modal = document.querySelector('.modal');

function renderModal() {
  let success = {
    src: './assets/img/modal-images/success.png',
    alt: 'an envelop with a check mark',
    title: 'Message Received!',
    paragraph:
      "Thanks for reaching out — we'll get back to you as soon as possible.",
    textBtn: 'Back to Home',
  };

  let fail = {
    src: './assets/img/modal-images/fail.png',
    alt: 'an envelop with a cross mark',
    title: 'Oops! Something went wrong.',
    paragraph:
      "We couldn't send your message. Please try again or check your connection.",
    textBtn: 'Try Again',
  };

  const modalBox = modal.querySelector('.modal-box');

  modal.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
  modal.classList.add('opacity-100', 'scale-100', 'pointer-events-auto');

  let isSuccess = Math.random() * 3 < 2;

  if (isSuccess) {
    updateUI(success, modalBox);
  } else {
    updateUI(fail, modalBox);
  }
}

document.addEventListener('click', function (e) {
  const isCloseButton = e.target.closest('.close-button');
  const isOverlay = e.target.closest('.overlay');

  if (isCloseButton || isOverlay) {
    modal.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
    modal.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
    document.body.classList.remove('overflow-hidden');
  }
});

function updateUI(status, modalBox) {
  modalBox.innerHTML = `
<div class="flex justify-center w-full pt-6 bg-[#FAFAFA] dark:bg-[#0A0D12]">
  <img
    src=${status.src}
    alt=${status.alt}
    class='size-35'
  />
</div>
<div class="text flex flex-col gap-2 px-6 items-center">
  <h3 class="text-lg lg:text-xl font-bold">${status.title}</h3>
  <p class="text-sm lg:text-base font-medium text-center">
    ${status.paragraph}
  </p>
</div>
<div class=" px-6 w-full">
  <button class="close-button btn mt-3">${status.textBtn}</button>
</div>  
  `;
}
