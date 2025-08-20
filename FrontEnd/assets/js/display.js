// DISPLAY.JS

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

// Afficher les projets dans la gallery principale
export function displayWorks(works) {
  const gallery = document.querySelector(".gallery");
  gallery.replaceChildren();

  works.forEach(work => {
    const figure = document.createElement("figure");
    figure.dataset.id = work.id;

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

// Afficher les projets dans la modale
export function displayWorksModal(works) {
  const modalGallery = document.querySelector(".modal-gallery");
  modalGallery.replaceChildren();

  works.forEach(work => {
    const figure = document.createElement("figure");
    figure.dataset.id = work.id;

    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("modal-deleteBtn");
    deleteBtn.type = "button";
    
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-trash-can")

    deleteBtn.appendChild(icon);
    figure.appendChild(img);
    figure.appendChild(deleteBtn);
    modalGallery.appendChild(figure);
  });
}

// Basculer la modale en mode "gallery"
export function switchModalGallery() {
  const modalGallery = document.querySelector(".modal-gallery");
  modalGallery.classList.remove("hidden");

  const modalUpload = document.querySelector(".modal-upload");
  modalUpload.classList.add("hidden");

  const modalTitle = document.querySelector("#modal-title");
  modalTitle.textContent = "Galerie photo";

  const btnAddPhoto = document.querySelector("#btn-add-photo");
  btnAddPhoto.classList.remove("hidden");

  const btnValidate = document.querySelector("#btn-validate");
  btnValidate.classList.add("hidden");

  const modalBack = document.querySelector(".modal-back");
  modalBack.classList.add("hidden");
}

// Basculer la modale en mode "upload"
export function switchModalUpload(categories) {
  const modalGallery = document.querySelector(".modal-gallery");
  modalGallery.classList.add("hidden");

  const modalUpload = document.querySelector(".modal-upload");
  modalUpload.classList.remove("hidden");

  const modalTitle = document.querySelector("#modal-title");
  modalTitle.textContent = "Ajout photo";

  const btnAddPhoto = document.querySelector("#btn-add-photo");
  btnAddPhoto.classList.add("hidden");

  const btnValidate = document.querySelector("#btn-validate");
  btnValidate.classList.remove("hidden");

  const modalBack = document.querySelector(".modal-back");
  modalBack.classList.remove("hidden");

  const categorySelect = document.querySelector("#category-select");
  categorySelect.replaceChildren();

  const optionEmpty = document.createElement("option");
  optionEmpty.value = "";
  optionEmpty.selected = true;
  optionEmpty.hidden = true;

  categorySelect.appendChild(optionEmpty);

  categories.forEach(category => {
    const optionCategory = document.createElement("option");
    optionCategory.value = category.id;
    optionCategory.textContent = category.name

    categorySelect.appendChild(optionCategory);
  });
}

// Afficher l'aperçu de l'image dans le label
export function displaySelectedImage(file) {
  const label = document.querySelector(".upload-photo");
  label.replaceChildren();

  // Créer l'image et lui donner l'URL du fichier sélectionné
  const img = document.createElement("img");
  img.classList.add("preview-img");
  img.src = URL.createObjectURL(file);
  img.alt = "Aperçu de l'image";

  label.appendChild(img);
}

// Supprimer un projet dans le DOM
export function removeWorkFromDOM(workId, container) {

const figure = container.querySelector(`figure[data-id='${workId}']`);
  if (figure) figure.remove();
}