const indicator = document.querySelector(".indicator");
const navList = document.querySelector(".btn-list");
const icons = document.querySelectorAll(".icon");
const contents = document.querySelectorAll(".contentBx");

function removeClass(name) {
  icons.forEach((icon) =>
    icon.classList.toggle("active", icon.getAttribute("name") === name)
  );
}
function removeContentClass(name) {
  contents.forEach((content) =>
    content.classList.toggle("active", content.getAttribute("name") === name)
  );
}

navList.addEventListener("click", (e) => {
  if (!e.target.classList.contains("icon")) return;
  // console.log(e.target.name);
  const name = e.target.name;
  removeClass(name);
  removeContentClass(name);
  indicator.style.top = `${45*[...icons].indexOf(e.target)}px`;
});

