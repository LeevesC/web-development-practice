// about me tab change
const cvNav = document.querySelector(".aboutme-cv-nav");
const cvLinks = document.querySelectorAll(".cv-nav-link");
const cvDes = document.querySelectorAll(".cv-des");

cvNav.addEventListener("click", (e) => {
  e.preventDefault();
  if (!e.target.classList.contains("cv-nav-link")) return;
  cvLinks.forEach((ele) => ele.classList.remove("active"));
  e.target.classList.add("active");
  cvDes.forEach((ele) => ele.classList.add("hidden"));
  document.getElementById(`des-${e.target.id}`).classList.remove("hidden");
});

// navigator jump to section
const mainNav = document.querySelector(".main-nav-list");

const scrollSection = function (e) {
  e.preventDefault();
  if (!e.target.classList.contains("main-nav-link")) return;
  const sectionId = e.target.getAttribute("href");
  document.querySelector(`.${sectionId.slice(1)}`).scrollIntoView({ behavior: "smooth" });
  console.log(sectionId);
};
mainNav.addEventListener("click", scrollSection);

