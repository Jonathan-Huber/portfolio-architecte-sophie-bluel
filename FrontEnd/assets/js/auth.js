// auth.js

import { initModal } from "./modal.js";

// Modifier l'affichage pour le mode connecté
export function displayConnectedMode() {
  const filtersContainer = document.querySelector(".filters-container");
  if (filtersContainer) filtersContainer.classList.add("hidden");

  const btnEdit = document.querySelector("#btn-edit");
  if (btnEdit) {
    btnEdit.classList.remove("hidden");
    initModal()
  }

  const liLogout = document.querySelector("#li-logout");
  if (liLogout) {
    const btnLogout = liLogout.querySelector("#btn-logout");
    if (btnLogout) {
      btnLogout.addEventListener('click', logout);
    }
  }
  const liLogin = document.querySelector("#li-login");
  if (liLogin) liLogin.classList.add("hidden");

  const editBanner = document.getElementById('edit-banner');
  if (editBanner) editBanner.classList.remove('hidden');
}

// Modifier l'affichage pour le mode invité
export function displayGuestMode() {
  const filtersContainer = document.querySelector(".filters-container");
  if (filtersContainer) filtersContainer.classList.remove("hidden");

  const btnEdit = document.querySelector("#btn-edit");
  if (btnEdit) btnEdit.classList.add("hidden");

  const liLogout = document.querySelector("#li-logout");
  if (liLogout) liLogout.classList.add("hidden");

  const liLogin = document.querySelector("#li-login");
  if (liLogin) liLogin.classList.remove("hidden");

  const editBanner = document.getElementById('edit-banner');
  if (editBanner) editBanner.classList.add('hidden');
}

// Déconnecte l'utilisateur en supprimant le token
export function logout() {
  localStorage.removeItem('authToken');
  displayGuestMode();
}