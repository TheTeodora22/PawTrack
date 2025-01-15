document.addEventListener("DOMContentLoaded", () => {
    const accountSection = document.getElementById("account-section");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const dogName = document.getElementById("dog_name");
    const dogBreed = document.getElementById("dog_breed");
    const dogAge = document.getElementById("dog_age");

    const loggedIn = localStorage.getItem("loggedIn");
    const userData = JSON.parse(localStorage.getItem("loggedInUser"));


    if (loggedIn === "true" && userData) {

        username.textContent = userData.username;
        email.textContent = userData.email;
        dogName.textContent = userData.dog_name;
        dogBreed.textContent = userData.dog_breed;
        dogAge.textContent = userData.dog_age;


        accountSection.style.display = "block";
    } else {

        alert("Nu esti inregistrat! Redirectionare la pagina de inregistare.");
        window.location.href = "PawTrackLogin.html";
    }
});


function logout() {
    localStorage.removeItem('loggedIn');
    alert('Ai iesit din cont! Redirectionare la pagina de inregistare.');
    window.location.href = 'PawTrackLogin.html';
}


window.onload = function () {
    checkLoginStatus();
    loadAccountDetails();

};
