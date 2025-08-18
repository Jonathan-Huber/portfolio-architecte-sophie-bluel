// WORKS.JS

// Activer les boutons de suppression lors du click
export function setupDeleteButtons() {
  const deleteButtons = document.querySelectorAll(".modal-deleteBtn")
  const token = localStorage.getItem("authToken")
  
  deleteButtons.forEach(button => {
    button.addEventListener("click", async () => {
    const workId = button.closest("figure").dataset.id;

    console.log("Tu as cliqué sur le bouton delete du projet avec l'Id :", workId)
    });
  });
}