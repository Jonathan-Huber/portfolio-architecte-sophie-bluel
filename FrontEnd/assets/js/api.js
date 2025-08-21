// API.JS

// Récuperer les catégories
export async function fetchCategories() {
  const response = await fetch("http://localhost:5678/api/categories/");
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// Récuperer les projets
export async function fetchWorks() {
  const response = await fetch("http://localhost:5678/api/works/");
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// Supprimer un projet dans L'API
export async function deleteWorkAPI(workId, token) {
  const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  
  if (!response.ok) {
    throw new Error(`Échec de la suppression du projet (code ${response.status})`);
  }
  return true;
}

// Ajouter un projet dans l'API
export async function addWorkAPI({ title, category, file }, token) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("image", file);

  const response = await fetch("http://localhost:5678/api/works/", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  });

  if (!response.ok) {
    throw new Error(`Échec de l'ajout du projet (code ${response.status})`);
  }

  return response.json();
}