// MODAL.JS

// Fonction d'initialisation de la modale
export function initModal() {
  const btnEdit = document.querySelector("#btn-edit");
  const modal = document.querySelector(".modal");
  const modalClose = document.querySelector(".modal-close");

  if (!btnEdit || !modal || !modalClose) return;

  btnEdit.addEventListener("click", () => {
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
  });

  modalClose.addEventListener("click", () => {
    btnEdit.focus();
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      modal.setAttribute("aria-hidden", "true");
    }
  });
}