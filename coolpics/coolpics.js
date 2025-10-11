const menuButton = document.querySelector("#menuButton");

function toggleMenu() {
  const menu = document.querySelector(".menu");
  menu.classList.toggle("hide");
}

// Toggle menu when the button is clicked
menuButton.addEventListener("click", toggleMenu);

// Handle screen resize
function handleResize() {
  const menu = document.querySelector(".menu");
  if (window.innerWidth > 1000) {
    menu.classList.remove("hide");
  } else {
    menu.classList.add("hide");
  }
}

// Check screen size on load
handleResize();

// Check again whenever the window is resized
window.addEventListener("resize", handleResize);
// Select all gallery images
const galleryImages = document.querySelectorAll(".gallery img");

galleryImages.forEach(image => {
  image.addEventListener("click", function () {
    // Create the dialog element
    const dialog = document.createElement("dialog");

    // Insert the HTML for the large image and close button
    dialog.innerHTML = `
      <img src="${image.src}" alt="${image.alt}">
      <button class="close-viewer">X</button>
    `;

    // Add the dialog to the body and show it
    document.body.appendChild(dialog);
    dialog.showModal();

    // Close button event
    const closeButton = dialog.querySelector(".close-viewer");
    closeButton.addEventListener("click", () => {
      dialog.close();
      dialog.remove();
    });
  });
});
