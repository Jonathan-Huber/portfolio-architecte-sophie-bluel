// DISPLAY.JS

//==============
// Display Index
//==============

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

// Ajouter un projet dans la galerie principale
export function addWorkToGallery(work) {
  const gallery = document.querySelector(".gallery");

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
}

//===============
// Display modale
//===============

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
  document.querySelector(".modal-gallery").classList.remove("hidden");
  document.querySelector(".modal-upload").classList.add("hidden");

  document.querySelector("#modal-title").textContent = "Galerie photo";

  document.querySelector("#btn-add-photo").classList.remove("hidden");
  document.querySelector("#btn-validate").classList.add("hidden");
  document.querySelector(".modal-back").classList.add("hidden");
}

// Basculer la modale en mode "upload"
export function switchModalUpload(categories) {
  document.querySelector(".modal-gallery").classList.add("hidden");
  document.querySelector(".modal-upload").classList.remove("hidden");

  document.querySelector("#modal-title").textContent = "Ajout photo";

  document.querySelector("#btn-add-photo").classList.add("hidden");
  document.querySelector("#btn-validate").classList.remove("hidden");
  document.querySelector(".modal-back").classList.remove("hidden");

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

// Ajouter un projet dans la modale
export function addWorkToModal(work) {
  const modalGallery = document.querySelector(".modal-gallery");

  const figure = document.createElement("figure");
  figure.dataset.id = work.id;

  const img = document.createElement("img");
  img.src = work.imageUrl;
  img.alt = work.title;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("modal-deleteBtn");
  deleteBtn.type = "button";

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-trash-can");

  deleteBtn.appendChild(icon);
  figure.appendChild(img);
  figure.appendChild(deleteBtn);
  modalGallery.appendChild(figure);
}

//===================
// Display FormUpload
//===================

// Afficher l'aperçu de l'image dans le label
export function displaySelectedImage(file) {
  const divUploadInfo = document.querySelector(".upload-info")
  const previewImg = document.querySelector(".preview-img")

  divUploadInfo.classList.add("hidden");
  previewImg.classList.remove("hidden");
  previewImg.src = URL.createObjectURL(file);
}

// Supprimer l'aperçu de l'image sélectionnée
export function clearPreview() {
  const divUploadInfo = document.querySelector(".upload-info")
  const previewImg = document.querySelector(".preview-img")

  previewImg.src = "";
  previewImg.classList.add("hidden");
  divUploadInfo.classList.remove("hidden");
}

// Afficher le message d'erreur du fichier
export function displayFileError() {
  const fileErrorDiv = document.querySelector(".file-error");
  fileErrorDiv.textContent = "Image trop lourde (max 4 Mo).";
  fileErrorDiv.classList.remove("hidden");
}

// Masquer le message d'erreur du fichier
export function hideFileError() {
  const fileErrorDiv = document.querySelector(".file-error");
  fileErrorDiv.textContent = "";
  fileErrorDiv.classList.add("hidden");
}

//======================
// Display Index & Modal
//======================

// Supprimer un projet dans le DOM & modal
export function removeWorkFromDOM(workId, container) {

const figure = container.querySelector(`figure[data-id='${workId}']`);
  if (figure) figure.remove();
}