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
    canvas.width = 500;
    canvas.height = 400;
    canvas.style.border = "1px solid #ccc";
    document.querySelector("main").appendChild(canvas);

    // Dog sprite images
    const dogIdle = new Image();
    const dogRun = new Image();
    dogIdle.src = "chilldog.gif"; // Replace with your idle dog image
    dogRun.src = "dogrun.gif"; // Replace with your running dog image

    let dx = 0;
    let dogX = canvas.width / 2;
    let dogY = canvas.height / 2;
    let isRunning = false;
    let currentDogImage = dogIdle;

    const grassSVG = new Image();
    grassSVG.src = "grass.svg"; // Replace with the path to your SVG file

    function drawBackground() {
        const pattern = ctx.createPattern(grassSVG, "repeat"); // Create a repeating pattern
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with the pattern
    }

    // Function to draw the dog on the canvas
    function drawDog() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();

        ctx.save(); // Save the current canvas state

        if (dx > 0 || isRunning === false) {
            // Dog moving to the right, normal orientation
            ctx.translate(dogX, dogY);
        } else {
            // Dog moving to the left, flip horizontally
            ctx.scale(-1, 1);
            ctx.translate(-dogX - 80, dogY); // Adjust for flipped orientation
        }

        ctx.drawImage(currentDogImage, 0, 0, 80, 80);
        ctx.restore(); // Restore the canvas state
    }

    grassSVG.onload = () => {
        drawDog(); // Initial draw with the SVG background
    };

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
        updateStats();
    });

    cleanBtn.addEventListener("click", () => {
        cleanliness = Math.min(cleanliness + 10, 100);
        updateStats();
    });

    playBtn.addEventListener("click", () => {
        if (isRunning) return;

        mood = Math.min(mood + 10, 100);
        isRunning = true;
        currentDogImage = dogRun; // Set the dog image to running
        runDogAround();
        updateStats();
    });

    // Function to move the dog around the canvas
    function runDogAround() {
        dx = (Math.random() - 0.5) * 5; // Random X direction
        let dy = (Math.random() - 0.5) * 5; // Random Y direction
        const steps = 300; // Number of animation frames

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
            if (dogX < 0 || dogX + 80 > canvas.width) dx = -dx;
            if (dogY < 0 || dogY + 80 > canvas.height) dy = -dy;

            drawDog();
            stepCount++;
        }, 30); // Update every 30ms
    }

    // Create a settings form for resizing the canvas
    const settingsForm = document.createElement("form");
    settingsForm.innerHTML = `
        <label for="canvasWidth">Canvas Width (max 500):</label>
        <input type="number" id="canvasWidth" name="canvasWidth" value="${canvas.width}" max="1000" min="100" required>
        <label for="canvasHeight">Canvas Height (max 400):</label>
        <input type="number" id="canvasHeight" name="canvasHeight" value="${canvas.height}" max="900" min="100" required>
        <button type="submit">Apply</button>
    `;
    settingsForm.style.margin = "10px";
    document.querySelector("main").appendChild(settingsForm);

    // Handle canvas resizing via form
    settingsForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const newWidth = parseInt(settingsForm.canvasWidth.value);
        const newHeight = parseInt(settingsForm.canvasHeight.value);

        if (newWidth > 0 && newWidth <= 1000 && newHeight > 0 && newHeight <= 900) {
            // Resize canvas and adjust elements
            canvas.width = newWidth;
            canvas.height = newHeight;

            dogX = Math.min(dogX, canvas.width - 80); // Ensure dog stays within bounds
            dogY = Math.min(dogY, canvas.height - 80);

            drawDog(); // Redraw everything with new dimensions
        }
    });
});
