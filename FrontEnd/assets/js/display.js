// DISPLAY.JS

// Afficher les projets dans la gallery principale
export function displayWorks(works) {
  const gallery = document.querySelector(".gallery");
  gallery.replaceChildren();

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

// Afficher les filtres au dessus de la gallery principale
export function displayFilters(categories) {
  const filtersContainer = document.querySelector(".filters-container");
  filtersContainer.replaceChildren();

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

// Afficher les projets dans la modale
export function displayWorksModal(works) {
  const modalGallery = document.querySelector(".modal-gallery");
  modalGallery.replaceChildren();

  works.forEach(work => {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("modal-deleteBtn");
    deleteBtn.type = "button";
    deleteBtn.dataset.id = work.id;

    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-trash-can")

    deleteBtn.appendChild(icon);
    figure.appendChild(img);
    figure.appendChild(deleteBtn);
    modalGallery.appendChild(figure);
  });
}