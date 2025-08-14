// Récuperer les catégories et afficher les filtres
async function fetchCategories() {
const response = await fetch("http://localhost:5678/api/categories/");
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}
const categories = await response.json();
displayFilters(categories);
return categories;
}

// Récuperer les projets
async function fetchWorks() {
const response = await fetch("http://localhost:5678/api/works/");
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}
const works = await response.json();
displayWorks(works);
return works;
}

// Afficher les projets
function displayWorks(works) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  works.forEach(work => {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}

// Afficher les projets dans la modale
function displayWorksModal(works) {
  const modalGallery = document.querySelector(".modal-gallery");
  modalGallery.innerHTML = "";

  works.forEach(work => {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;

    const trashBtn = document.createElement("button");
    trashBtn.classList.add("modal-trashBtn");
    trashBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

    figure.appendChild(img);
    figure.appendChild(trashBtn);
    modalGallery.appendChild(figure);
  });
}

// Afficher les filtres
function displayFilters(categories) {
  const filtersContainer = document.querySelector(".filters-container");
  filtersContainer.innerHTML = "";

  const allButton = document.createElement("button");
    allButton.classList.add("filter", "active"); 
    allButton.type = "button";
    allButton.textContent = "Tous";
    filtersContainer.appendChild(allButton);

  categories.forEach(category => {
    const filter = document.createElement("button");
    filter.classList.add("filter"); 
    filter.type = "button";
    filter.textContent = category.name;
    filtersContainer.appendChild(filter);
  });
}

// Activer les filtres
function setupFilter(works) {
  const filterButtons = document.querySelectorAll(".filter");

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

// Modifier l'affichage pour le mode connecté
function displayConnectedMode() {
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
function displayGuestMode() {
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

// Fonction d'initialisation de la modale
function initModal() {
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

// Déconnecte l'utilisateur en supprimant le token
function logout() {
  localStorage.removeItem('authToken');
  displayGuestMode();
}

// Initialiser la page
async function init() {
  try {
    await fetchCategories();
    const works = await fetchWorks();
    setupFilter(works);

    const token = localStorage.getItem('authToken');
    if (token) {
      displayConnectedMode();
      displayWorksModal(works);
    } else {
      displayGuestMode();
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation :", error.message);
  }
}

init();