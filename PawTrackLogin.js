document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form");
    const usernameField = document.getElementById("username");
    const passwordField = document.getElementById("password");

    // Helper function: Validate input using regex
    const validateInput = (field, regex) => {
        return regex.test(field.value.trim());
    };

    // Event listener for form submission
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent default form submission

        const username = usernameField.value.trim();
        const password = passwordField.value.trim();

        // Regular expressions for validation
        const usernameRegex = /^[a-zA-Z0-9_]{4,16}$/; // Allow 4-16 alphanumeric or underscore
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Min 8 characters, 1 letter, 1 digit

        // Validate username and password
        if (!validateInput(usernameField, usernameRegex)) {
            alert("Username invalid! Folosește doar litere, cifre și _ (4-16 caractere).");
            return;
        }

        if (!validateInput(passwordField, passwordRegex)) {
            alert("Parola invalidă! Minim 8 caractere, inclusiv o literă și o cifră.");
            return;
        }

        // Fetch user data from JSON
        fetch("users.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Eroare la citirea fișierului JSON!");
                }
                return response.json();
            })
            .then((users) => {
                // Check credentials
                const validUser = users.find(
                    (user) => user.username === username && user.password === password
                );

                if (validUser) {
                    // Save login state and user data in localStorage
                    localStorage.setItem("loggedIn", "true");
                    localStorage.setItem("loggedInUser", JSON.stringify(validUser));
                    alert(`Bine ai venit, ${validUser.fullname}!`);
                    window.location.href = "PawTrackAccountDetails.html"; // Redirect to account page
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
