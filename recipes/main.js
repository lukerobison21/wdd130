import recipes from "./recipes.mjs";

// Generate a random number from 0 to num-1
function getRandomIndex(num) {
    return Math.floor(Math.random() * num);
}

// Select a random recipe from the list
function getRandomRecipe() {
    const index = getRandomIndex(recipes.length);
    return recipes[index];
}

// Create rating HTML markup
function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    let stars = "⭐".repeat(fullStars);

    if (halfStar) {
        stars += "✩";  // Half star look
    }

    return `
        <span class="rating" role="img" aria-label="${rating} out of 5 stars">
            ${stars}
        </span>
    `;
}

// Create tags HTML markup
function renderTags(tags) {
    return tags
        .map(tag => `<span class="tag">${tag}</span>`)
        .join("");
}

// Create full recipe card markup
function renderRecipeCard(recipe) {
    return `
        <section class="recipe-card">

            <img src="${recipe.image}" alt="${recipe.name}">

            <div class="recipe-content">
                ${renderTags(recipe.tags)}

                <h2>${recipe.name}</h2>

                ${renderStars(recipe.rating)}

                <p class="description">
                    ${recipe.description}
                </p>
            </div>

        </section>
    `;
}

// Render a list of recipes to the page
function renderRecipeList(list) {
    const main = document.querySelector("main");

    if (list.length === 0) {
        main.innerHTML = `<p>No recipes found.</p>`;
        return;
    }

    main.innerHTML = list.map(renderRecipeCard).join("");
}

// ---- SEARCH LOGIC -------------------------------------------------

// Handles button click
function searchHandler(event) {
    event.preventDefault();

    const input = document.querySelector(".search-container input");
    const query = input.value.toLowerCase().trim();

    const results = filterRecipes(query);

    // sort alphabetically by name
    results.sort((a, b) => a.name.localeCompare(b.name));

    // render results
    renderRecipeList(results);
}

// Filters recipes based on search terms
function filterRecipes(query) {
    return recipes.filter((recipe) => {
        const nameMatch = recipe.name.toLowerCase().includes(query);
        const descMatch = recipe.description.toLowerCase().includes(query);

        // search inside tags
        const tagMatch = recipe.tags.find(tag =>
            tag.toLowerCase().includes(query)
        );

        // search ingredients list if recipe has them
        const ingredientMatch =
            recipe.ingredients &&
            recipe.ingredients.find(item =>
                item.toLowerCase().includes(query)
            );

        return nameMatch || descMatch || tagMatch || ingredientMatch;
    });
}

// ---- INIT ---------------------------------------------------------

function init() {
    // render a random recipe first
    const featured = getRandomRecipe();
    renderRecipeList([featured]);

    // attach search listener
    const button = document.querySelector(".search-container button");
    button.addEventListener("click", searchHandler);
}

window.addEventListener("DOMContentLoaded", init);
