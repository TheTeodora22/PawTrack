document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const fullname = document.getElementById("fullname");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm_password");
    const dogName = document.getElementById("dog_name");
    const dogBreed = document.getElementById("dog_breed");
    const dogAge = document.getElementById("dog_age");

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return regex.test(password);
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault(); 

        // Validation
        if (!validateEmail(email.value)) {
            alert("Email invalid!");
            return;
        }

        if (!validatePassword(password.value)) {
            alert("Parola trebuie să aibă minim 8 caractere, inclusiv o literă și o cifră!");
            return;
        }

        if (password.value !== confirmPassword.value) {
            alert("Parolele nu se potrivesc!");
            return;
        }

        fetch("users.json")
            .then((response) => response.json())
            .then((users) => {
                const userExists = users.some((user) => user.username === username.value || user.email === email.value);
                if (userExists) {
                    alert("Utilizatorul sau email-ul există deja!");
                } else {
                    const newUser = {
                        fullname: fullname.value,
                        username: username.value,
                        email: email.value,
                        password: password.value,
                        dog_name: dogName.value,
                        dog_breed: dogBreed.value,
                        dog_age: dogAge.value,
                    };


                    let existingUsers = JSON.parse(localStorage.getItem("users")) || [];
                    existingUsers.push(newUser);
                    localStorage.setItem("users", JSON.stringify(existingUsers));
                    alert("Cont creat cu succes!");


                    window.location.href = "PawTrackLogin.html";
                }
            })
            .catch((error) => console.error("Error fetching users.json:", error));
    });
});
