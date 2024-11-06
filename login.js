document
  .querySelector("#signUpButton")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const user = {
      name,
      email,
      password,
    };

    fetch("https://ticket-hack-backend-beige.vercel.app/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          // Redirige vers la page d'accueil si le compte est créé
          setTimeout(() => {
            window.location.href =
              "https://ticket-hack-frontend-jade.vercel.app/index.html";
          }, 500);
        } else {
          // Affiche un message d'erreur si l'email est déjà lié à un compte
          document.querySelector(
            "#signUp"
          ).innerHTML += `<p>Email déjà lié à un compte</p>`;
        }
      });
  })

document
  .querySelector("#signUpButton")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const email = document.querySelector("#emailSignIn").value;
    const password = document.querySelector("#passwordSignIn").value;

    const connectingUser = {
      email,
      password,
    };

    fetch("https://ticket-hack-backend-beige.vercel.app/users/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(connectingUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          // Redirige vers la page d'accueil si le compte est créé
          setTimeout(() => {
            window.location.href =
              "https://ticket-hack-frontend-jade.vercel.app/index.html";
          }, 500);
        } else {
          // Affiche un message d'erreur si l'email est déjà lié à un compte
          document.querySelector(
            "#signUp"
          ).innerHTML += `<p>Mauvais email ou mot de passe</p>`;
        }
      });
  });
