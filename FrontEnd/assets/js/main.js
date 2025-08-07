async function fetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works/");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const works = await response.json();

    displayWorks(works);

  } catch (error) {
    console.error("Erreur lors de la récupération des travaux de l'API :", error.message);
  }
}

async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories/");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const categories = await response.json();

    console.log(categories)

  } catch (error) {
    console.error("Erreur lors de la récupération des catégories de l'API :", error.message);
  }
}

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

fetchWorks();
fetchCategories();