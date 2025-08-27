// MODAL.JS
// Gestion de la modale :
// - ouverture et fermeture de la modale principale avec gestion du focus pour l'accessibilité
// - basculer entre le mode galerie et le mode formulaire d'upload
// - réinitialiser les erreurs affichées lors de la fermeture
// - configuration des boutons pour naviguer dans la modale

import { hideGalleryError, hideUploadError, switchModalGallery, switchModalUpload } from "./display.js";

// Configurer la modale : ouverture, fermeture et clic en dehors pour la fermer
export function setupModal() {
  const btnEdit = document.querySelector("#btn-edit");
  const modal = document.querySelector(".modal");
  const modalClose = document.querySelector(".modal-close");

  btnEdit.addEventListener("click", () => {
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    // focus sur le bouton de fermeture de la modale.
    modal.querySelector(".modal-close").focus();
  });

  modalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

// fermer la modal
export function closeModal() {
  const modal = document.querySelector(".modal");
  const btnEdit = document.querySelector("#btn-edit");

  // focus sur le bouton d'ouverture' de la modale.
  btnEdit.focus();
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");

  hideGalleryError();
  hideUploadError();
}

// Configurer les boutons de la modale pour switcher entre gallery et upload
export function setupModalButtons(categories) {
  const modalBack = document.querySelector(".modal-back");
  const btnUpload = document.querySelector("#btn-add-photo");

  modalBack.addEventListener("click", () => {
    switchModalGallery();

    // focus sur le bouton de fermeture de la modale.
    document.querySelector(".modal-close").focus();
  });

  btnUpload.addEventListener("click", () => {
    switchModalUpload(categories);

    // focus sur le premier input du formulaire
    document.querySelector(".upload-photo").focus();
  });
}