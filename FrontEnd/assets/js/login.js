// LOGIN.js
// Gestion du formulaire de connexion :
// - intercepter la soumission du formulaire
// - vérifier que les champs sont remplis
// - envoyer les identifiants à l'API via un POST
// - afficher un message d'erreur en cas d'identifiants invalides ou problème serveur
// - stocker le token dans localStorage
// - rediriger vers la page principale

const loginForm = document.querySelector("#login form")
const errorDiv = document.querySelector(".errorMessage")

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorDiv.textContent = "";

  const email = loginForm.email.value.trim();
  const password = loginForm.password.value.trim();

  // Vérifier que tous les champs sont remplis
  if (!email || !password) {
  errorDiv.textContent = "Veuillez remplir tous les champs.";
  return;
  }

  try {
    // Envoyer les identifiants à l'API
    const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
    });

    // Vérifier la réponse HTTP
    if (!response.ok) {
      if (response.status === 401 || response.status === 404) {
        errorDiv.textContent = "Email ou mot de passe incorrect.";
      } else {
        errorDiv.textContent = "Impossible de se connecter au serveur. Vérifiez votre connexion ou réessayez plus tard.";
      }
      return;
    }

    // Récupérer le token le stocker dans le localStorage et rediriger sur l'index
    const data = await response.json();
    localStorage.setItem("authToken", data.token);
    window.location.href = "./index.html";

    } catch (error) {
      errorDiv.textContent = "Impossible de se connecter au serveur. Vérifiez votre connexion ou réessayez plus tard.";
    }
  });