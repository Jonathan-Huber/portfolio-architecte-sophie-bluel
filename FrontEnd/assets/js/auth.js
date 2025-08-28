// auth.js
// Gestion de l'état utilisateur :
// - gérer la déconnexion en supprimant le token et en réaffichant le mode invité
// - vérifier l'état de connexion au chargement de la page
// - ajouter l'écouteur pour le bouton de logout

import { displayConnectedMode, displayGuestMode } from "./display.js";

// Déconnecte l'utilisateur en supprimant le token
export function logout() {
  localStorage.removeItem('authToken');
  displayGuestMode();
}

// Vérifie l'état d'authentification au chargement de la page
export function checkAuthState() {
  const token = localStorage.getItem("authToken");
  if (token) {
    displayConnectedMode();
  } else {
    displayGuestMode();
  }
}

// Ajouter l'écouteur sur le bouton logout
document.querySelector("#li-logout").addEventListener("click", logout);