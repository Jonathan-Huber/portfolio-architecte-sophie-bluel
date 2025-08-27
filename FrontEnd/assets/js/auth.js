// auth.js
// Fonctions pour gérer l'affichage et l'état de l'utilisateur :
// - afficher ou masquer certains éléments selon que l'utilisateur est connecté ou invité
// - gérer la déconnexion en supprimant le token et en réaffichant le mode invité
// - ajouter l'écouteur pour le bouton de logout

// Modifier l'affichage pour le mode connecté
export function displayConnectedMode() {
  document.querySelector("#edit-banner").classList.remove('hidden');
  document.querySelector("#li-login").classList.add("hidden");
  document.querySelector("#li-logout").classList.remove("hidden");
  document.querySelector("#btn-edit").classList.remove("hidden");
  document.querySelector(".filters-container").classList.add("hidden");
}

// Modifier l'affichage pour le mode invité
export function displayGuestMode() {
  document.querySelector("#edit-banner").classList.add('hidden');
  document.querySelector("#li-login").classList.remove("hidden");
  document.querySelector("#li-logout").classList.add("hidden");
  document.querySelector("#btn-edit").classList.add("hidden");
  document.querySelector(".filters-container").classList.remove("hidden");
}

// Déconnecte l'utilisateur en supprimant le token
export function logout() {
  localStorage.removeItem('authToken');
  displayGuestMode();
}

// Ajouter l'écouteur sur le bouton logout
document.querySelector("#li-logout").addEventListener("click", logout);