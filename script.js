// --- DOM Element References ---
const name1Input = document.getElementById('name1');
const name2Input = document.getElementById('name2');
const calculateBtn = document.getElementById('calculateBtn');
const tryAgainBtn = document.getElementById('tryAgainBtn');
const calculatorDiv = document.getElementById('calculator');
const resultDiv = document.getElementById('result-display');
const percentageSpan = document.getElementById('percentage');
const messageP = document.getElementById('message');
const resultHeader = resultDiv.querySelector('h2');
const heartPath = resultDiv.querySelector('.heart-path');

// --- Event Listeners ---
calculateBtn.addEventListener('click', calculateLove);
tryAgainBtn.addEventListener('click', resetCalculator);

// --- Functions ---

/**
 * Initiates the love calculation process.
 */
function calculateLove() {
    const name1 = name1Input.value.trim();
    const name2 = name2Input.value.trim();

    if (name1 === '' || name2 === '') {
        // A custom, cute modal could replace this alert for a better experience
        alert('Please enter both names!');
        return;
    }

    // Hide the input form and show the result display
    calculatorDiv.classList.add('hidden');
    resultDiv.classList.remove('hidden');
    resultDiv.style.opacity = '0';

    // Start the calculation animation
    startCalculationAnimation(name1, name2);
}

/**
 * Resets the calculator to its initial state.
 */
function resetCalculator() {
    resultDiv.classList.add('hidden');
    calculatorDiv.classList.remove('hidden');
    name1Input.value = '';
    name2Input.value = '';
    // Reset animation elements
    percentageSpan.textContent = '0%';
    percentageSpan.classList.add('opacity-0');
    resultHeader.textContent = 'Your Result is...';
    heartPath.style.animation = 'none'; // Stop current animation
    // Force reflow to restart animation
    heartPath.offsetHeight; 
    heartPath.style.animation = null; 
}

/**
 * Manages the sequence of animations for revealing the result.
 * @param {string} name1 - The first name.
 * @param {string} name2 - The second name.
 */
function startCalculationAnimation(name1, name2) {
     setTimeout(() => {
        resultDiv.style.opacity = '1';
        heartPath.style.animation = 'draw-heart 3s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards';
    }, 100);

    // Calculate the score after a delay
    setTimeout(() => {
        const score = calculateScore(name1, name2);
        animatePercentage(score);
    }, 2500); // Wait for heart to nearly finish drawing
}

/**
 * Animates the percentage counter from 0 to the final score.
 * @param {number} finalScore - The calculated love score.
 */
function animatePercentage(finalScore) {
    percentageSpan.classList.remove('opacity-0');
    let currentScore = 0;
    const interval = setInterval(() => {
        currentScore++;
        if (currentScore > finalScore) {
            currentScore = finalScore;
        }
        percentageSpan.textContent = `${currentScore}%`;

        if (currentScore === finalScore) {
            clearInterval(interval);
            messageP.textContent = getResultMessage(finalScore);
        }
    }, 30); // Speed of the counter
}

/**
 * Calculates a "love score" based on the names.
 * This is a simple, deterministic algorithm for fun.
 * @param {string} n1 - The first name.
 * @param {string} n2 - The second name.
 * @returns {number} The calculated score between 40 and 100.
 */
function calculateScore(n1, n2) {
    const combinedNames = (n1 + n2).toLowerCase().replace(/ /g,'');
    let sum = 0;
    for (let i = 0; i < combinedNames.length; i++) {
        sum += combinedNames.charCodeAt(i);
    }
    const score = (sum % 61) + 40; 
    return score;
}

/**
 * Returns a message based on the score.
 * @param {number} score - The final love score.
 * @returns {string} The result message.
 */
function getResultMessage(score) {
    if (score > 90) return "It's a perfect match! So sweet!";
    if (score > 80) return "You two are adorable together!";
    if (score > 70) return "A very strong and happy connection!";
    if (score > 60) return "There's a spark of something special.";
    if (score > 50) return "A good friendship is a great start!";
    return "Every great love story starts somewhere.";
}

// --- Background Heart Animation ---
const heartsContainer = document.getElementById('hearts-container');
const numHearts = 15;

for (let i = 0; i < numHearts; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.animationDelay = `${Math.random() * 8}s`;
    const size = Math.random() * 20 + 10;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.opacity = Math.random() * 0.5 + 0.2;
    heartsContainer.appendChild(heart);
}
