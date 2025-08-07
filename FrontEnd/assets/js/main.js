async function fetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works/");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const works = await response.json();
    console.log(works);
  } catch (error) {
    console.error("Erreur lors de la récupération des travaux de l'API :", error.message);
  }
}

fetchWorks();