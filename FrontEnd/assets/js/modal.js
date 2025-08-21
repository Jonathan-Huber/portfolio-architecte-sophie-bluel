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

// Configurer les boutons de la modale pour switcher entre gallery et upload
export function setupModalButtons(categories) {
  const modalBack = document.querySelector(".modal-back");
  const btnUpload = document.querySelector("#btn-add-photo");

  modalBack.addEventListener("click", switchModalGallery);
  btnUpload.addEventListener("click", () => switchModalUpload(categories));
}

// Configurer la sélection d'image avec vérification, aperçu et support clavier
export function setupUploadFile() {
  const inputFile = document.querySelector("#upload-photo");
  const fileErrorDiv = document.querySelector(".file-error");

  const maxSize = 4 * 1024 * 1024; // 4 Mo
  const validTypes = ["image/jpeg", "image/png"];

  inputFile.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!validTypes.includes(file.type)) {
      fileErrorDiv.textContent = "Veuillez sélectionner une image au format PNG ou JPEG.";
      fileErrorDiv.classList.remove("hidden");
      return;
    }

    if(file.size > maxSize) {
      fileErrorDiv.textContent = "Veuillez sélectionner une image de moins de 4 Mo.";
      fileErrorDiv.classList.remove("hidden");
      return
    }
    
    fileErrorDiv.textContent = "";
    fileErrorDiv.classList.add("hidden");

    displaySelectedImage(file);
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