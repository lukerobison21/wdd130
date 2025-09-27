document.addEventListener("DOMContentLoaded", () => {
  const themeSelect = document.getElementById("theme-select");
  const logo = document.querySelector(".logo");
  themeSelect.addEventListener("change", () => {
    if (themeSelect.value === "dark") {
      document.body.classList.add("dark");
      logo.src = "byui-logo_white.png";
    } else {
      document.body.classList.remove("dark");
      logo.src = "byui-logo_blue.webp";
    }
  });
});