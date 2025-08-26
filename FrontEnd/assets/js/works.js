// WORKS.JS

import { deleteWorkAPI } from "./api.js";
import { removeWorkFromDOM, showGalleryError,} from "./display.js";

// Activer les boutons de suppression lors du click
export function setupDeleteButtons() {
  const deleteButtons = document.querySelectorAll(".modal-deleteBtn")
  const token = localStorage.getItem("authToken")
  
  deleteButtons.forEach(button => {
    button.addEventListener("click", async () => {
    const workId = button.closest("figure").dataset.id;

    try {
      //throw new Error("Test d'erreur");
      // Supprimer le works de l'API
      await deleteWorkAPI(workId, token);

      // Supprimer le works de la galerie principal
      removeWorkFromDOM(workId, document.querySelector(".gallery"));

      // Supprimer le works de la galerie dans la modal
      removeWorkFromDOM(workId, document.querySelector(".modal-gallery"));

    } catch (error) {
      console.error("Erreur lors de la suppression :", error.message);
      showGalleryError("Échec de la suppression du projet. Vérifiez votre connexion ou réessayez plus tard.");
    }
    });
  });
}