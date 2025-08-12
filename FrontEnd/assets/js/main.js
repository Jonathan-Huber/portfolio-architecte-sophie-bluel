// Récuperer les catégories et afficher les filtres
async function fetchCategories() {
const response = await fetch("http://localhost:5678/api/categories/");
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}
const categories = await response.json();
displayFilters(categories);
return categories;
}

// Récuperer les projets
async function fetchWorks() {
const response = await fetch("http://localhost:5678/api/works/");
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}
const works = await response.json();
displayWorks(works);
return works;
}

// Afficher les projets
function displayWorks(works) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  works.forEach(work => {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}

// Afficher les filtres
function displayFilters(categories) {
  const filtersContainer = document.querySelector(".filters-container");
  filtersContainer.innerHTML = "";

  const allButton = document.createElement("button");
    allButton.classList.add("filter", "active"); 
    allButton.type = "button";
    allButton.textContent = "Tous";
    filtersContainer.appendChild(allButton);

  categories.forEach(category => {
    const filter = document.createElement("button");
    filter.classList.add("filter"); 
    filter.type = "button";
    filter.textContent = category.name;
    filtersContainer.appendChild(filter);
  });
}

// Activer les filtres
function setupFilter(works) {
  const filterButtons = document.querySelectorAll(".filter");

  filterButtons.forEach(button => {
    button.addEventListener("click", () =>{
      const selectedCategory = button.textContent;

      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filteredWorks = selectedCategory === "Tous"
        ? works
        : works.filter(work => work.category.name === selectedCategory);

        displayWorks(filteredWorks);
    });
  });
}

// Initialiser la page
async function init() {
  try {
    await fetchCategories();
    const works = await fetchWorks();
    setupFilter(works);
  } catch (error) {
    console.error("Erreur lors de l'initialisation :", error.message);
  }
}

init();