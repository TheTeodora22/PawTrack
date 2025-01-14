document.addEventListener("DOMContentLoaded", () => {
    const loggedIn = localStorage.getItem("loggedIn");
    const loginLi = document.getElementById("login");
    const accountLi = document.getElementById("account");

    if (loggedIn === "true") {
        accountLi.style.display = "block";
        loginLi.style.display = "none";
    } else {
        loginLi.style.display = "block";
        accountLi.style.display = "none";
    }
});