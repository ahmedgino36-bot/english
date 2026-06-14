const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const quizContainer = document.getElementById("quizContainer");
const resultContainer = document.getElementById("resultContainer");

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");

const nextBtn = document.getElementById("nextBtn");

const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("level");

const progressBar = document.getElementById("progress");

const timerElement = document.getElementById("timer");

const music = document.getElementById("bgMusic");

let currentQuestion = 0;
let score = 0;

let timeLeft = 900;
let timer;

/* Start Test */

startBtn.addEventListener("click", () => {

```
document.querySelector(".header").style.display = "none";
document.querySelector(".gallery").style.display = "none";

startScreen.style.display = "none";
quizContainer.style.display = "block";

music.play().catch(() => {});

startTimer();
loadQuestion();
```

});

/* Load Question */

function loadQuestion(){

```
const q = questions[currentQuestion];

questionElement.textContent =
    `${currentQuestion + 1}. ${q.question}`;

answersElement.innerHTML = "";

q.answers.forEach((answer,index)=>{

    const div = document.createElement("div");

    div.classList.add("answer");

    div.innerHTML = `
        <label>
            <input type="radio"
                   name="answer"
                   value="${index}">
            ${answer}
        </label>
    `;

    answersElement.appendChild(div);
});

updateProgress();
```

}

/* Next Question */

nextBtn.addEventListener("click",()=>{

```
const selected =
document.querySelector(
    'input[name="answer"]:checked'
);

if(!selected){

    alert("Please select an answer.");
    return;
}

if(
    Number(selected.value) ===
    questions[currentQuestion].correct
){
    score++;
}

currentQuestion++;

if(currentQuestion >= questions.length){

    finishQuiz();
    return;
}

loadQuestion();
```

});

/* Progress Bar */

function updateProgress(){

```
const percent =
(currentQuestion / questions.length) * 100;

progressBar.style.width =
percent + "%";
```

}

/* Timer */

function startTimer(){

```
timer = setInterval(()=>{

    timeLeft--;

    const minutes =
    Math.floor(timeLeft / 60);

    const seconds =
    timeLeft % 60;

    timerElement.textContent =
    `${minutes}:${seconds
    .toString()
    .padStart(2,"0")}`;

    if(timeLeft <= 0){

        clearInterval(timer);

        finishQuiz();
    }

},1000);
```

}

/* Finish Quiz */

function finishQuiz(){

```
clearInterval(timer);

quizContainer.style.display = "none";

resultContainer.style.display = "block";

scoreElement.textContent =
`Score: ${score} / ${questions.length}`;

const percentage =
(score / questions.length) * 100;

let level = "";

if(percentage < 20){

    level = "A1 Beginner";
}
else if(percentage < 40){

    level = "A2 Elementary";
}
else if(percentage < 60){

    level = "B1 Intermediate";
}
else if(percentage < 75){

    level = "B2 Upper Intermediate";
}
else if(percentage < 90){

    level = "C1 Advanced";
}
else{

    level = "C2 Proficient";
}

levelElement.textContent =
`Your English Level: ${level}`;

progressBar.style.width = "100%";

localStorage.setItem(
    "mester_score",
    score
);

localStorage.setItem(
    "mester_level",
    level
);
```

}
