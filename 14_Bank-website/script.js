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

// How to use 'Event Delegation'
const navigator = document.querySelector('.nav');
const navLinks = navigator.querySelectorAll('.nav__link');


navigator.addEventListener('mouseover', (e) => {
  if(e.target.classList.contains('nav__link')) {
    navLinks.forEach(link => {
      if(link !== e.target) {
        link.style.opacity = 0.3;
      }
    });
  };
});

navigator.addEventListener('mouseout', e => {
  if(e.target.classList.contains('nav__link')) {
    navLinks.forEach(link => link.style.opacity = 1);
  }
})
