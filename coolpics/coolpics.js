const menuButton = document.querySelector("#menuButton");
const menu = document.querySelector("#mainMenu");

menuButton.addEventListener("click", () => {
  menu.classList.toggle("hide");
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", !expanded);
});