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

export function setupAddWorksForm() {
  const form = document.querySelector(".modal-upload-form");
   console.log("Form trouvé ?", form);
    
  if (!form) return;
  const fileInput = document.querySelector("#upload-photo");
  const titleInput = document.querySelector("#title");
  const categorySelect = document.querySelector("#category-select");
  const formErrorDiv = document.querySelector(".form-error");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    formErrorDiv.replaceChildren();

    const title = titleInput.value.trim();
    const category = categorySelect.value;
    const file = fileInput.files[0];

    let errors = [];

    if (!title) errors.push("Veuillez saisir un titre.");
    if (!category) errors.push("Veuillez sélectionner une catégorie.");
    if (!file) errors.push("Veuillez sélectionner une image.");

    if (errors.length > 0) {
      errors.forEach(message => {
        const p = document.createElement("p");
        p.textContent = message;
        formErrorDiv.appendChild(p);
      });
      formErrorDiv.classList.remove("hidden");
      return;
    }
    console.log("Titre :", title, "| Catégorie :", category, "| Fichier :", file);
  });
}