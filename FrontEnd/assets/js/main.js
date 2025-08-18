// MAIN.JS

import { fetchCategories, fetchWorks } from "./api.js";
import { displayConnectedMode, displayGuestMode } from "./auth.js";
import { displayFilters, displayWorks, displayWorksModal } from "./display.js";
import { setupFilter } from "./filters.js";
import { setupDeleteButtons } from "./works.js";

// Initialiser la page
async function init() {
  try {
    const categories = await fetchCategories();
    displayFilters(categories);

    const works = await fetchWorks();
    displayWorks(works)
    setupFilter(works);

    const token = localStorage.getItem('authToken');
    if (token) {
      displayConnectedMode();
      displayWorksModal(works);
      setupDeleteButtons();
    } else {
      displayGuestMode();
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation :", error.message);
  }
}

init();