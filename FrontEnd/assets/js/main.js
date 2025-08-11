async function init() {
  try {
    // Récuperer les catégories et afficher les filtres
    const categoriesResponse = await fetch("http://localhost:5678/api/categories/");
    if (!categoriesResponse.ok) {
      throw new Error(`HTTP error! status: ${categoriesResponse.status}`);
    }
    const categories = await categoriesResponse.json();
    console.log("Catégories récupérées :", categories);
    displayFilters(categories);
    console.log("Filtres affichés");

    // Récuperer les projets
    const worksResponse = await fetch("http://localhost:5678/api/works/");
    if (!worksResponse.ok) {
      throw new Error(`HTTP error! status: ${worksResponse.status}`);
    }
    const works = await worksResponse.json();
    console.log("Works récupérés :", works);
    displayWorks(works);
    console.log("Works affichés");

    // Activer les filtres
    setupFilter(works);
    console.log("Filtres activés");

  } catch (error) {
    console.error("Erreur lors de l'initialisation :", error.message);
  }
}

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
    })
  })
}

init();