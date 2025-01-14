document.addEventListener("DOMContentLoaded", () => {
    const feedBtn = document.getElementById("feed");
    const playBtn = document.getElementById("play");
    const cleanBtn = document.getElementById("clean");
    const statsDisplay = document.getElementById("stats-display");

    let health = 100;
    let mood = 100;
    let cleanliness = 100;

    // Set up canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 400;
    canvas.height = 300;
    canvas.style.border = "1px solid #ccc";
    document.querySelector("main").appendChild(canvas);

    // Dog sprite images
    const dogIdle = new Image();
    const dogRun = new Image();
    dogIdle.src = "chilldog.gif"; // Replace with your idle dog image
    dogRun.src = "dogrun.gif"; // Replace with your running dog image

    let dogX = canvas.width / 2;
    let dogY = canvas.height / 2;
    let isRunning = false;
    let currentDogImage = dogIdle;

    // Function to draw the dog on the canvas
    function drawDog() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(currentDogImage, dogX, dogY, 50, 50);
    }

    // Update stats display
    function updateStats() {
        statsDisplay.innerHTML = `
            <p><strong>Health:</strong> ${health}</p>
            <p><strong>Mood:</strong> ${mood}</p>
            <p><strong>Cleanliness:</strong> ${cleanliness}</p>
        `;
    }

    updateStats(); // Initial stats
    drawDog(); // Initial draw

    // Event listeners for buttons
    feedBtn.addEventListener("click", () => {
        health = Math.min(health + 10, 100);
        alert("You fed the dog!");
        updateStats();
    });

    cleanBtn.addEventListener("click", () => {
        cleanliness = Math.min(cleanliness + 10, 100);
        alert("You cleaned the dog!");
        updateStats();
    });

    playBtn.addEventListener("click", () => {
        mood = Math.min(mood + 10, 100);
        alert("You played with the dog!");
        isRunning = true;
        currentDogImage = dogRun;
        runDogAround();
        updateStats();
    });

    // Function to move the dog around the canvas
    function runDogAround() {
        let dx = (Math.random() - 0.5) * 5; // Random X direction
        let dy = (Math.random() - 0.5) * 5; // Random Y direction
        const steps = 100; // Number of animation frames

        let stepCount = 0;

        const interval = setInterval(() => {
            if (stepCount >= steps) {
                clearInterval(interval);
                isRunning = false;
                currentDogImage = dogIdle;
                drawDog(); // Draw the idle dog at the final position
                return;
            }

            // Update dog position
            dogX += dx;
            dogY += dy;

            // Prevent the dog from moving out of bounds
            if (dogX < 0 || dogX + 50 > canvas.width) dx = -dx;
            if (dogY < 0 || dogY + 50 >   canvas.height) dy = -dy;

            drawDog();
            stepCount++;
        }, 30); // Update every 30ms
    }

    // Decrease stats over time
    setInterval(() => {
        health = Math.max(health - 1, 0);
        mood = Math.max(mood - 1, 0);
        cleanliness = Math.max(cleanliness - 1, 0);
        updateStats();

        if (health === 0 || mood === 0 || cleanliness === 0) {
            alert("Game over! Your dog needs better care.");
            window.location.reload();
        }
    }, 5000);
});
