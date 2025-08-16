// FILTERS.JS

import { displayWorks } from "./display.js";

// Activer les filtres
export function setupFilter(works) {
  const filterButtons = document.querySelectorAll(".filter");
  if (!filterButtons) return;

  filterButtons.forEach(button => {
    button.addEventListener("click", () =>{
      const selectedCategory = button.textContent;

      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filteredWorks = selectedCategory === "Tous"
        ? works
        : works.filter(work => work.category.name === selectedCategory);

        displayWorks(filteredWorks);
    });
  });
}