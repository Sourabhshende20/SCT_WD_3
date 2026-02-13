const defaultQuestions = [
    { q: "In which year was Chhatrapati Shivaji Maharaj born?", a: ["1627", "1630", "1640", "1655"], c: 1 },
    { q: "Who was Shivaji Maharaj's mother?", a: ["Rani Lakshmibai", "Jijabai", "Ahilyabai", "Tarabai"], c: 1 },
    { q: "What was the capital of Shivaji Maharaj's kingdom?", a: ["Pune", "Raigad", "Satara", "Sinhagad"], c: 1 },
    { q: "In which year was Shivaji Maharaj crowned?", a: ["1664", "1674", "1680", "1659"], c: 1 },
    { q: "Shivaji Maharaj founded which empire?", a: ["Mughal", "Maratha", "Maurya", "Gupta"], c: 1 }
];

let activeQuestions = [];
let currentIndex = 0;
let userScore = 0;
let timeLeft = 10;
let timerInterval;

const menu = document.getElementById("menu");
const quizBox = document.getElementById("quizBox");
const resultBox = document.getElementById("resultBox");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");

function startQuiz(mode) {
    if (mode === 'default') {
        activeQuestions = defaultQuestions;
    } else {
        const savedData = JSON.parse(localStorage.getItem("quiz")) || [];
        if (savedData.length === 0) {
            alert("No custom questions found! Go to 'Create New Questions' first.");
            return;
        }
        activeQuestions = savedData;
    }

    menu.classList.add("hidden");
    resultBox.classList.add("hidden");
    quizBox.classList.remove("hidden");
    
    currentIndex = 0;
    userScore = 0;
    showQuestion();
}

function showQuestion() {
    resetTimer();
    
    let currentQ = activeQuestions[currentIndex];
    questionEl.textContent = currentQ.q;
    answersEl.innerHTML = "";

    currentQ.a.forEach((option, i) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => handleAnswer(i);
        answersEl.appendChild(btn);
    });
}

function handleAnswer(selectedIndex) {
    const correctIndex = activeQuestions[currentIndex].c;
    if (selectedIndex === correctIndex) {
        userScore++;
    }
    goToNext();
}

function goToNext() {
    currentIndex++;
    if (currentIndex < activeQuestions.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    clearInterval(timerInterval);
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");
    scoreEl.textContent = `${userScore} / ${activeQuestions.length}`;
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 10;
    timerEl.textContent = `Time Left: ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            goToNext();
        }
    }, 1000);
}

document.getElementById("startDefaultBtn").onclick = () => startQuiz('default');
document.getElementById("startCustomBtn").onclick = () => startQuiz('custom');
document.getElementById("nextBtn").onclick = goToNext;

document.getElementById("backToMenuBtn").onclick = () => {
    resultBox.classList.add("hidden");
    menu.classList.remove("hidden");
};

document.getElementById("clearBtn").onclick = () => {
    if(confirm("Are you sure you want to delete all custom questions?")) {
        localStorage.removeItem("quiz");
        alert("Custom quiz deleted!");
    }
};