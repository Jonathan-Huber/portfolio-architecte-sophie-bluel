// MODAL.JS

import { displaySelectedImage, switchModalGallery, switchModalUpload } from "./display.js";

// Configurer la modale : ouverture, fermeture et clic en dehors pour la fermer
export function setupModal() {
  const btnEdit = document.querySelector("#btn-edit");
  const modal = document.querySelector(".modal");
  const modalClose = document.querySelector(".modal-close");

  btnEdit.addEventListener("click", () => {
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
  });

  modalClose.addEventListener("click", () => {
    btnEdit.focus();
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      modal.setAttribute("aria-hidden", "true");
    }
  });
}

//// Configurer les boutons de la modale pour switcher entre gallery et upload
export function setupModalButtons(categories) {
  const modalBack = document.querySelector(".modal-back");
  const btnUpload = document.querySelector("#btn-add-photo");

  modalBack.addEventListener("click", switchModalGallery);
  btnUpload.addEventListener("click", () => switchModalUpload(categories));
}

// Configurer la prévisualisation de l'image uploadée
export function setupUploadPreview() {
  const inputFile = document.querySelector("#upload-photo");

  inputFile.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      displaySelectedImage(file);
    }
  });

  // Accessibilité clavier : ouvrir le sélecteur avec Entrée ou Espace
  const uploadLabel = document.querySelector(".upload-photo");

  uploadLabel.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      inputFile.click();
    }
  });
}