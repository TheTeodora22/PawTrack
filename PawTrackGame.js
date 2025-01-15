document.addEventListener("DOMContentLoaded", () => {
    const feedBtn = document.getElementById("feed");
    const playBtn = document.getElementById("play");
    const cleanBtn = document.getElementById("clean");
    const statsDisplay = document.getElementById("stats-display");
    const gameArea = document.getElementById("game-area");
    const dogElement = document.getElementById("dog");

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
    dogIdle.src = "chilldog.gif"; 
    dogRun.src = "dogrun.gif"; 

    let dx = 0;
    let dogX = canvas.width / 2;
    let dogY = canvas.height / 2;
    let isRunning = false;
    let currentDogImage = dogIdle;

    const grassSVG = new Image();
    grassSVG.src = "grass.svg"; // Replace with the path to your SVG file

    function highlightButton(btn) {
        btn.classList.add("active");
        setTimeout(() => btn.classList.remove("active"), 500);
    }

    function addEffect(effectId, effectSrc, style = {}) {
        let effectElement = document.getElementById(effectId);

        if (!effectElement) {
            effectElement = document.createElement("img");
            effectElement.id = effectId;
            effectElement.src = effectSrc;
            effectElement.alt = effectId;
            effectElement.className = "effect";
            gameArea.appendChild(effectElement);
        }

        // Apply styles
        Object.assign(effectElement.style, style);
    }
    function removeEffect(effectId) {
        const effectElement = document.getElementById(effectId);
        if (effectElement) {
            effectElement.remove();
        }
    }

    function drawBackground() {
        const pattern = ctx.createPattern(grassSVG, "repeat"); // Create a repeating pattern
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with the pattern
    }

    // Function to draw the dog on the canvas
    function drawDog() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();

        ctx.save(); 

        if (dx > 0 || isRunning === false) {
            ctx.translate(dogX, dogY);
        } else {
            ctx.scale(-1, 1);
            ctx.translate(-dogX - 80, dogY);
        }

        ctx.drawImage(currentDogImage, 0, 0, 80, 80);
        ctx.restore(); 
    }

    grassSVG.onload = () => {
        drawDog(); 
    };


    function updateStats() {
        statsDisplay.innerHTML = `
            <p><strong>Sănătate:</strong> ${health}</p>
            <p><strong>Stare de spirit:</strong> ${mood}</p>
            <p><strong>Curățenie:</strong> ${cleanliness}</p>
        `;
    }

    updateStats(); 
    drawDog(); 


    feedBtn.addEventListener("click", () => {
        health = Math.min(health + 10, 100);

        addEffect("food-bowl", "food-bowl.svg", {
            position: "absolute",
            bottom: "10px",
            left: `${dogElement.offsetLeft - 60}px`,
            width: "50px",
        });

        setTimeout(() => removeEffect("food-bowl"), 3000); 
        updateStats();
    });

    cleanBtn.addEventListener("click", () => {
        cleanliness = Math.min(cleanliness + 10, 100);

        addEffect("bubbles", "bubbles.svg", {
            position: "absolute",
            top: `${dogElement.offsetTop + 70}px`,
            left: `${dogElement.offsetLeft }px`,
            width: "50px",
        });
        setTimeout(() => removeEffect("bubbles"), 3000); 
        updateStats();
    });

    playBtn.addEventListener("click", () => {
        if (isRunning) return;

        addEffect("ball", "ball.svg", {
            position: "absolute",
            bottom: "10px",
            left: `${dogElement.offsetLeft + 100}px`,
            width: "40px",
        });


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
                removeEffect("ball");
                drawDog(); // Draw the idle dog at the final position
                updateStats();
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
        <label for="canvasWidth">Lățime Canvas (max 1000):</label>
        <input type="number" id="canvasWidth" name="canvasWidth" value="${canvas.width}" max="1000" min="100" required>
        <label for="canvasHeight">Înălțime Canvas (max 900):</label>
        <input type="number" id="canvasHeight" name="canvasHeight" value="${canvas.height}" max="900" min="100" required>
        <button type="submit">Aplică</button>
    `;
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

setInterval(() => {
    health = Math.max(health - 1, 0);
    mood = Math.max(mood - 1, 0);
    cleanliness = Math.max(cleanliness - 1, 0);

    if (cleanliness < 50) {
        // Add dirt SVG near the dog's feet
        addEffect("dirt", "dirt.svg", {
            position: "absolute",
            bottom: "10px",
            left: `${dogElement.offsetLeft + 20}px`,
            width: "50px",
        });
    } else {
        removeEffect("dirt");
    }

    updateStats();

    if (health === 0 || mood === 0 || cleanliness === 0) {
        alert("Game over! Câinele tău are nevoie de mai multă grijă.");
        window.location.reload();
    }
}, 5000); // Check every 5 seconds
});

document.addEventListener("DOMContentLoaded", () => {
    const gameArea = document.getElementById("game-area");

    // Highlight game area on click and display element details
    gameArea.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent the event from bubbling up
        const clickedElement = event.target; // Get the clicked element
        const currentArea = event.currentTarget; // Reference to the event's target container

        // Add a temporary highlight class to the game area
        currentArea.classList.add("highlight");
        setTimeout(() => currentArea.classList.remove("highlight"), 500);


        const computedStyle = getComputedStyle(clickedElement);
        const bgColor = computedStyle.backgroundColor || "none";
        alert(`Background color of clicked element: ${bgColor}`);
    });

    // Example: Toggling a class on the dog element when hovered
    const dogElement = document.getElementById("dog");
    dogElement.addEventListener("mouseenter", () => {
        dogElement.classList.add("hovered");
    });
    dogElement.addEventListener("mouseleave", () => {
        dogElement.classList.remove("hovered");
    });

    const style = document.createElement("style");
    style.textContent = `
        .highlight {
            outline: 2px solid red;
        }
        .hovered {
            transform: scale(1.1);
            transition: transform 0.3s ease-in-out;
        }
    `;
    document.head.appendChild(style);
});

