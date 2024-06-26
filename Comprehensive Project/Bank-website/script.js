"use strict";

///////////////////// Modal window ////////////////////
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

///////////////////// Navigator ////////////////////
// Button fade out animation
// How to use 'Event Delegation'
// advanced working with function
const handleHover = function (e, value) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector(".nav__logo");
    siblings.forEach((element) => {
      if (element !== link) element.style.opacity = value;
    });
    logo.style.opacity = value;
  }
};

const nav = document.querySelector(".nav");
nav.addEventListener("mouseover", (e) => handleHover(e, 0.5));
nav.addEventListener("mouseout", (e) => handleHover(e, 1));

// viewport scrolling
// How to use scrollIntoView();
// Regular Expression
const scrollSection = function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const sectionId = e.target.getAttribute("href");
    const validRegex = /^#[\w-]+$/;
    if (validRegex.test(sectionId)) {
      document.querySelector(sectionId).scrollIntoView({ behavior: "smooth" });
    }
  }
};
nav.addEventListener("click", scrollSection);

// Header sticky
// how to get the size and position relate to viewport of a element
// how to listen distance changing (what event)

const sec1 = document.getElementById("section--1");
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
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
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

const btnScroll = header.querySelector(".btn--scroll-to");
btnScroll.addEventListener("click", () => {
  sec1.scrollIntoView({ behavior: "smooth" });
});

///////////////////// Reveal sections ////////////////////
const sects = document.querySelectorAll(".section");

const sectionShow = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry.target);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
const optionSec = {
  root: null,
  rootMargin: "0px",
  threshold: 0.15,
};
const secShow = new IntersectionObserver(sectionShow, optionSec);

sects.forEach((section) => {
  secShow.observe(section);
});

///////////////////// Section1 Lazy loading ////////////////////
const imgs = sec1.querySelectorAll("img");
// Using Promise for Lazy loading the image
// function loadImage(imgEle, src) {
//   return new Promise((resolve, reject) => {
//     imgEle.addEventListener("load", function () {
//       resolve(imgEle);
//     });
//     imgEle.addEventListener("error", function () {
//       reject(new Error("Failed to load image"));
//     });
//     imgEle.setAttribute("src", src);
//   });
// }

// imgs.forEach((img) => {
//   const imgSrc = img.getAttribute("data-src");
//   loadImage(img, imgSrc)
//     .then((res) => {
//       console.log("Image loaded successfully");
//       res.classList.remove("lazy-img");
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// });

// Using Intersection Observer for lazy loading the image
const imgAct = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  // const realImg = entry.target.getAttribute("data-src");
  // entry.target.setAttribute("src", realImg);
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    this.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imgOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const imgInter = new IntersectionObserver(imgAct, imgOptions);
imgs.forEach((img) => imgInter.observe(img));

///////////////////// Section2 Tab highlight ////////////////////
const operationContainer = document.querySelector(".operations__tab-container");
const operaTabs = operationContainer.querySelectorAll(".operations__tab");
const operaContent = document.querySelectorAll(".operations__content");

// My way
// operationContainer.addEventListener('click', (e) => {
//   if(e.target.classList.contains('operations__tab')) {
//     operaTabs.forEach(tab => tab.classList.remove('operations__tab--active'));
//     e.target.classList.add('operations__tab--active');

//     const operationId = e.target.dataset.tab;
//     operaContent.forEach(cont => cont.classList.remove('operations__content--active'));
//     operaContent[operationId-1].classList.add('operations__content--active');
//   }
// })

// using Early return
operationContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".btn");
  if (!clicked) return;
  operaTabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  operaContent.forEach((cont) =>
    cont.classList.remove("operations__content--active")
  );

  clicked.classList.add("operations__tab--active");
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

///////////////////// Section3 Carousel ////////////////////
const slides = document.querySelectorAll(".slide");
const leftBtn = document.querySelector(".slider__btn--left");
const rightBtn = document.querySelector(".slider__btn--right");
// const dots = document.querySelectorAll('.dots__dot');

// const rotateSlide = function (i) {
//   slides.forEach((s, ind) => {
//     s.style.transform = `translateX(${100*(ind + i)}%)`;
//   });
//   dots.forEach((d) => {
//     d.classList.remove('dots__dot--active');
//   })
//   dots[`${Math.abs(i)}`].classList.add('dots__dot--active');
// };

// rotateSlide(0);
// let i = 0;

// leftBtn.addEventListener('click', () => {
//   i++;
//   if (i>0) i = -2;
//   rotateSlide(i);
// });
// rightBtn.addEventListener('click', () => {
//   i--;
//   if(i <= -(slides.length)) i = 0;
//   rotateSlide(i);
// })

// the way above to control the dots is fixed.
// If the testimonials adding to 4 or 5,
// we have to change the HTML file, which is annoying

// So, below is better way.
const dotsContainer = document.querySelector(".dots");
const dotsGene = function () {
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
// initialize dots
dotsGene();

const dots = document.querySelectorAll('.dots__dot');
const rotateSlide = function (i) {
  slides.forEach((s, ind) => {
    s.style.transform = `translateX(${100*(ind + i)}%)`;
  });
  dots.forEach((d) => {
    d.classList.remove('dots__dot--active');
  })
  dots[`${Math.abs(i)}`].classList.add('dots__dot--active');
};

rotateSlide(0);
let i = 0;

leftBtn.addEventListener('click', () => {
  i++;
  if (i>0) i = -2;
  rotateSlide(i);
});
rightBtn.addEventListener('click', () => {
  i--;
  if(i <= -(slides.length)) i = 0;
  rotateSlide(i);
})