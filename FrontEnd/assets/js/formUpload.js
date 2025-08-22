// FORMUPLOAD.JS

import { addWorkAPI } from "./api.js";
import { displaySelectedImage } from "./display.js";

// Sélecteurs globaux
const fileInput = document.querySelector("#upload-photo");
const titleInput = document.querySelector("#title");
const categorySelect = document.querySelector("#category-select");
const submitButton = document.querySelector("#btn-validate");
const form = document.querySelector(".modal-upload-form");
const formErrorDiv = document.querySelector(".form-error");
const fileErrorDiv = document.querySelector(".file-error");

// Vérifier la validité du fichier dans #upload-photo
function isFileValid() {
  fileErrorDiv.replaceChildren();
  const file = fileInput.files[0];
  if (!file) return false;

  const validTypes = ["image/jpeg", "image/png"];
  const maxSize = 4 * 1024 * 1024;

  if (!validTypes.includes(file.type)) {
    fileErrorDiv.textContent = "Format non valide (JPG ou PNG uniquement).";
    fileErrorDiv.classList.remove("hidden");
    return false;
  }

  if (file.size > maxSize) {
    fileErrorDiv.textContent = "Image trop lourde (max 4 Mo).";
    fileErrorDiv.classList.remove("hidden");
    return false;
  }

  fileErrorDiv.classList.add("hidden");
  displaySelectedImage(file);
  return true;
}

// Vérifier que tous les champs sont remplis
function areFieldsComplete() {
  return titleInput.value.trim() !== "" &&
         categorySelect.value !== "" &&
         fileInput.files.length > 0;
}

// Mettre à jour le bouton
function updateSubmitButton() {
  const ok = areFieldsComplete() && isFileValid();
  if (!ok) {
    submitButton.classList.add("disabled");
  } else {
    submitButton.classList.remove("disabled");
  }
}

// Gèrer la soumission du formulaire, envoie à l’API puis réinitialiser.
async function handleFormSubmit(e) {
  e.preventDefault();
  formErrorDiv.replaceChildren();

  const title = titleInput.value.trim();
  const category = categorySelect.value;
  const file = fileInput.files[0];

  let errors = [];

  if (!title) errors.push("Veuillez saisir un titre.");
  if (!category) errors.push("Veuillez sélectionner une catégorie.");
  if (!file) {
    errors.push("Veuillez sélectionner une image.");
  } else if (!isFileValid()) {
    errors.push("L’image doit être JPG/PNG et < 4 Mo.");
  }

  if (errors.length > 0) {
    errors.forEach(message => {
      const p = document.createElement("p");
      p.textContent = message;
      formErrorDiv.appendChild(p);
    });
    formErrorDiv.classList.remove("hidden");
    return;
  }

  const token = localStorage.getItem("authToken");
  await addWorkAPI({ title, category, file }, token);

  form.reset();
}

export function setupFormListeners() {
  fileInput.addEventListener("change", () => {
    isFileValid();
    updateSubmitButton();
  });

  titleInput.addEventListener("input", updateSubmitButton);
  categorySelect.addEventListener("change", updateSubmitButton);
  
  const uploadLabel = document.querySelector(".upload-photo");
  uploadLabel.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      inputFile.click();
    }
  });

  updateSubmitButton();
  form.addEventListener("submit", handleFormSubmit);
}