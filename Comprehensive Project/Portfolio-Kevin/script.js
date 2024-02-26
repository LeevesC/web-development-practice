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
