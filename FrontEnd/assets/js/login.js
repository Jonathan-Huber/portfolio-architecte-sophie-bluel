const loginForm = document.querySelector("#login form")
const errorDiv = document.querySelector(".errorMessage")

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorDiv.textContent = "";

  const email = loginForm.email.value.trim();
  const password = loginForm.password.value.trim();

  if (!email || !password) {
  errorDiv.textContent = "Veuillez remplir tous les champs.";
  return;
  }

  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 404) {
      errorDiv.textContent = "Email ou mot de passe incorrect.";
    } else {
      errorDiv.textContent = "Impossible de se connecter au serveur. Vérifiez votre connexion ou réessayez plus tard.";
    }
    return;
  }

    const data = await response.json();

    console.log(data)
    localStorage.setItem("authToken", data.token);
    window.location.href = "./index.html";

    } catch (error) {
      errorDiv.textContent = "Impossible de se connecter au serveur. Vérifiez votre connexion ou réessayez plus tard.";
    }
  });