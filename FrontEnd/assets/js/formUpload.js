// FORMUPLOAD.JS

import { addWorkAPI } from "./api.js";
import { addWorkToGallery, addWorkToModal, clearPreview, displayFileError, displaySelectedImage, hideFileError, switchModalGallery } from "./display.js";
import { closeModal } from "./modal.js";
import { setupDeleteButtons } from "./works.js";

// Sélecteurs globaux
const fileInput = document.querySelector("#upload-photo");
const titleInput = document.querySelector("#title");
const categorySelect = document.querySelector("#category-select");
const submitButton = document.querySelector("#btn-validate");
const form = document.querySelector(".modal-upload-form");

// Vérifier la validité du fichier dans #upload-photo
function isFileValid() {
  const file = fileInput.files[0];
  if (!file) return false;

  const maxSize = 4 * 1024 * 1024;

  if (file.size > maxSize) {
    return false;
  } else
  return true;
}

function handleFilePreview() {
  const file = fileInput.files[0];
  if (!file) {
    clearPreview();
    hideFileError();
    return;
  }

  if (!isFileValid()) {
    clearPreview();
    displayFileError();
    return;
  }

  displaySelectedImage(file);
  hideFileError();
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
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
}

// Valider le formulaire, envoyer à l'API et mettre à jour le DOM
async function handleFormSubmit(e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const category = categorySelect.value;
  const file = fileInput.files[0];

  const token = localStorage.getItem("authToken");
  const createdWork = await addWorkAPI({ title, category, file }, token);
  
  addWorkToGallery(createdWork);
  addWorkToModal(createdWork);

  form.reset();
  clearPreview();
  updateSubmitButton();
  setupDeleteButtons();

  switchModalGallery();
  closeModal();
}

// Configurer les écouteurs du formulaire pour gérer l'aperçu, la validation et la soumission
export function setupFormListeners() {
  fileInput.addEventListener("change", () => {
    handleFilePreview();
    updateSubmitButton();
  });

  titleInput.addEventListener("input", updateSubmitButton);
  categorySelect.addEventListener("change", updateSubmitButton);
  
  const uploadLabel = document.querySelector(".upload-photo");
  uploadLabel.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      fileInput.click();
    }
  });

  updateSubmitButton();
  form.addEventListener("submit", handleFormSubmit);
}