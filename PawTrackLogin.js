document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form");
    const usernameField = document.getElementById("username");
    const passwordField = document.getElementById("password");


    const validateInput = (field, regex) => {
        return regex.test(field.value.trim());
    };


    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); 

        const username = usernameField.value.trim();
        const password = passwordField.value.trim();


        const usernameRegex = /^[a-zA-Z0-9_]{4,16}$/; 
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 


        if (!validateInput(usernameField, usernameRegex)) {
            alert("Username invalid! Folosește doar litere, cifre și _ (4-16 caractere).");
            return;
        }

        if (!validateInput(passwordField, passwordRegex)) {
            alert("Parola invalidă! Minim 8 caractere, inclusiv o literă și o cifră.");
            return;
        }

  
        fetch("users.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Eroare la citirea fișierului JSON!");
                }
                return response.json();
            })
            .then((users) => {
                const validUser = users.find(
                    (user) => user.username === username && user.password === password
                );

                if (validUser) {
                    localStorage.setItem("loggedIn", "true");
                    localStorage.setItem("loggedInUser", JSON.stringify(validUser));
                    alert(`Bine ai venit, ${validUser.fullname}!`);
                    window.location.href = "PawTrackAccountDetails.html"; 
                } else {
                    alert("Nume de utilizator sau parolă incorectă!");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("A apărut o eroare la autentificare.");
            });
    });
});
