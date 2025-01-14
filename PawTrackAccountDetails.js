document.addEventListener("DOMContentLoaded", () => {
    const accountSection = document.getElementById("account-section");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const dogName = document.getElementById("dog_name");
    const dogBreed = document.getElementById("dog_breed");
    const dogAge = document.getElementById("dog_age");

    const loggedIn = localStorage.getItem("loggedIn");
    const userData = JSON.parse(localStorage.getItem("loggedInUser"));

    // Check if user is logged in
    if (loggedIn === "true" && userData) {
        // Populate the account details
        username.textContent = userData.username;
        email.textContent = userData.email;
        dogName.textContent = userData.dog_name;
        dogBreed.textContent = userData.dog_breed;
        dogAge.textContent = userData.dog_age;

        // Show the account section
        accountSection.style.display = "block";
    } else {
        // Redirect to login page if not logged in
        alert("You are not logged in! Redirecting to login page.");
        window.location.href = "PawTrackLogin.html";
    }
});

// Function to log out
function logout() {
    localStorage.removeItem('loggedIn');
    alert('You have been logged out. Redirecting to login page.');
    window.location.href = 'PawTrackLogin.html';
}

// Attach event listeners
window.onload = function () {
    checkLoginStatus();
    loadAccountDetails();

};
