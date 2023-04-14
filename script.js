var question = 0;
var seconds = 60;
const timer = document.getElementById('Timer');
var timerInterval;
var temporaryMessageTimeout;
const quizHeader = document.getElementById('quiz-header');
const questions = document.getElementById('questions');

//Load quiz questions and answers from questions.js
const quiz = questions;

//Quiz questions
function setQuestion() {
    quizHeader.textContent = quiz[question].question;
    const answers = quiz[question].choices;
    document.getElementById('answer1').innerHTML = "1. " + answers[0]
    document.getElementById('answer2').innerHTML = "2. " + answers[1]
    document.getElementById('answer3').innerHTML = "3. " + answers[2]
    document.getElementById('answer4').innerHTML = "4. " + answers[3]
}

// Adding hidden element
document.querySelector('.start-quiz').onclick = function () {
    questions.hidden = false;
    document.getElementById('starting-section').hidden = true;
    setQuestion();
    timerInterval = setInterval(function () {
        timer.innerHTML = --seconds;
    }, 1000);
}

function showTemporaryMessage(type) {
    if (type === "correct") {
        document.getElementById('correct').hidden = false;
        document.getElementById('wrong').hidden = true;
    } else {
        document.getElementById('correct').hidden = true;
        document.getElementById('wrong').hidden = false;
    }
    document.getElementById('temp-results').hidden = false;
    temporaryMessageTimeout = setTimeout(function () {
        document.getElementById('temp-results').hidden = true;
    }, 2000)
}

//Function for checking answers
function answer(userAnswer) {
    clearTimeout(temporaryMessageTimeout);
    if (userAnswer == quiz[question].answer) {
        showTemporaryMessage("Correct")
    } else {
        seconds -= 10;
        timer.innerHTML = seconds;
        showTemporaryMessage("Wrong")
    }

    question += 1;
    if (question < quiz.length) {
        setQuestion();
    } else {
        quizHeader.innerHTML = "All done";
        questions.hidden = true;
        document.getElementById('quiz-results').hidden = false;
        clearInterval(timerInterval);
        if (seconds < 0) {
            seconds = 0
        }
        document.getElementById('results').innerHTML = seconds;
    }
}

document.getElementById('answer1').onclick = function () { answer(1) };
document.getElementById('answer2').onclick = function () { answer(2) };
document.getElementById('answer3').onclick = function () { answer(3) };
document.getElementById('answer4').onclick = function () { answer(4) };


document.getElementById('submit').onclick = function () {
    var initials = document.getElementById('initials').value;
    if (!initials || initials.length > 3) {
        showTemporaryMessage("Wrong");
        return;
    }
    initials = initials.toUpperCase();
    const scores = JSON.parse(localStorage.getItem("scores")) || [];
    const score = { initials, seconds }
    scores.push(score);
    seconds = 0;
    scores.sort(function (a, b) {
        return b.seconds - a.seconds
    });
    localStorage.setItem("scores", JSON.stringify(scores))
    window.location.href = "./highscore.html";
};


