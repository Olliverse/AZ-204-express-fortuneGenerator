const generateBtn = document.getElementById('generateBtn');
const situationInput = document.getElementById('situation');
const resultDiv = document.getElementById('result');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const misfortuneEl = document.getElementById('misfortune');
const numbersEl = document.getElementById('numbers');
const scoreEl = document.getElementById('score');
const interpretationEl = document.getElementById('interpretation');

generateBtn.addEventListener('click', generateFortune);

// Allow Enter key to submit (with Shift+Enter for new line)
situationInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        generateFortune();
    }
});

async function generateFortune() {
    const situation = situationInput.value.trim();

    if (!situation) {
        showError('Please describe your current situation first!');
        return;
    }

    // Hide previous results and errors
    resultDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
    loadingDiv.classList.remove('hidden');

    try {
        const response = await fetch('/api/fortune/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ situation })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to generate fortune');
        }

        const data = await response.json();
        displayFortune(data);

    } catch (error) {
        showError(error.message);
    } finally {
        loadingDiv.classList.add('hidden');
    }
}

function displayFortune(data) {
    misfortuneEl.textContent = data.misfortune;

    // Display lucky numbers
    numbersEl.innerHTML = '';
    data.luckyNumbers.forEach(num => {
        const numEl = document.createElement('div');
        numEl.className = 'number';
        numEl.textContent = num;
        numbersEl.appendChild(numEl);
    });

    // Animate score
    animateScore(data.preventability);

    interpretationEl.textContent = data.interpretation;

    resultDiv.classList.remove('hidden');
}

function animateScore(targetScore) {
    let currentScore = 0;
    const increment = targetScore / 50;
    const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(timer);
        }
        scoreEl.textContent = Math.round(currentScore);
    }, 20);
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    setTimeout(() => {
        errorDiv.classList.add('hidden');
    }, 5000);
}