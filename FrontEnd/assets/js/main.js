// MAIN.JS

import { fetchCategories, fetchWorks } from "./api.js";
import { displayConnectedMode, displayGuestMode } from "./auth.js";
import { displayFilters, displayWorks, displayWorksModal, showIndexError } from "./display.js";
import { setupFilter } from "./filters.js";
import { setupFormListeners } from "./formUpload.js";
import { setupModal, setupModalButtons } from "./modal.js";
import { setupDeleteButtons } from "./works.js";

// Initialiser la page
async function init() {
  const token = localStorage.getItem('authToken');

  let categories = [];
  try {
    // throw new Error("Test d'erreur");
    categories = await fetchCategories();
    displayFilters(categories);
  } catch (error) {
    console.error("Erreur lors du chargement des catégories :", error.message);

    if(!token){
    showIndexError("Impossible de charger les filtres. Vérifiez votre connexion ou réessayez plus tard.");
    }

  }

  let works = [];
  try {
    //throw new Error("Test d'erreur");
    works = await fetchWorks();
    displayWorks(works)
    setupFilter(works);
  } catch (error) {
    console.error("Erreur lors du chargement des projets :", error.message);
    showIndexError("Impossible de charger la galerie. Vérifiez votre connexion ou réessayez plus tard.");
  }

    if (token) {
      displayConnectedMode();
      displayWorksModal(works);
      setupDeleteButtons();
      setupModal();
      setupModalButtons(categories);
      setupFormListeners();
    } else {
      displayGuestMode();
    }
}

init();