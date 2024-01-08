'use strict';

///////////////////// Modal window //////////////////// 
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////// Navigator ////////////////////
// Button fade out animation
// How to use 'Event Delegation'
// advanced working with function
const handleHover = function (e, value) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav__logo');
    siblings.forEach(element => {
      if (element !== link) element.style.opacity = value;
    });
    logo.style.opacity = value;
  }
}

const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', e => handleHover(e, 0.5));
nav.addEventListener('mouseout', e => handleHover(e, 1));

// viewport scrolling
// How to use scrollIntoView();
// Regular Expression
const scrollSection = function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const sectionId = e.target.getAttribute('href');
    const validRegex = /^#[\w-]+$/;
    if (validRegex.test(sectionId)) {
      document.querySelector(sectionId).scrollIntoView({behavior: 'smooth'});
    }
  }
}
nav.addEventListener('click', scrollSection);

// Header sticky
// how to get the size and position relate to viewport of a element
// how to listen distance changing (what event)

const sec1 = document.getElementById('section--1');
// const threshold = nav.getBoundingClientRect().height;

// window.addEventListener('scroll', () => {
//   const distance = sec1.getBoundingClientRect().top;
//   if (distance < threshold) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// })

// how to implement IntersectionObserver()
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
  // console.log(entry.isIntersecting);
};

const options = {
  root: null,
  rootMargin: `-${navHeight}px`,
  threshold: 0,
};

const headerObserver = new IntersectionObserver(stickyNav, options);
headerObserver.observe(header);

///////////////////// Header ////////////////////
// click button jump to a section

const btnScroll = header.querySelector('.btn--scroll-to');
btnScroll.addEventListener('click', () => {
  sec1.scrollIntoView({ behavior: 'smooth'});
});