const questions = [
    {
        question: "Who assassinated Abraham Lincoln?",
        answers: [
            {
                text: "David Harold",
                correct: false
            },
            {
                text: "John Wilkes Booth",
                correct: true
            },
            {
                text: "Andrew Johnson",
                correct: false
            },
            {
                text: "William H Sewatt",
                correct: false
            }
        ]
    },
    {
        question: "Which is the lightest metal discovered?",
        answers: [
            {
                text: "Lithium",
                correct: true
            },
            {
                text: "Scandium",
                correct: false
            },
            {
                text: "Celsium",
                correct: false
            },
            {
                text: "Strontium",
                correct: false
            }
        ]
    },
    {
        question: "What was the name of the supercontinent before dividing into 7?",
        answers: [
            {
                text: "Stemia",
                correct: false
            },
            {
                text: "Formandum",
                correct: false
            },
            {
                text: "Pangea",
                correct: true
            },
            {
                text: "Picaladus",
                correct: false
            }
        ]
    },
    {
        question: "Which one is the nearest galaxy to Milky Way?",
        answers: [
            {
                text: "Sagitarius Dwarf Galaxy",
                correct: false
            },
            {
                text: "Canis Major Galaxy",
                correct: false
            },
            {
                text: "Triangulum Galaxy",
                correct: false
            },
            {
                text: "Andromeda Galaxy",
                correct: true
            }
        ]
    },
    {
        question: "Who is the most followed person on Instagram?",
        answers: [
            {
                text: "Cristiano Ronaldo",
                correct: true
            },
            {
                text: "Selena Gomez",
                correct: false
            },
            {
                text: "Kylie Jenner",
                correct: false
            },
            {
                text: "Kim Kardashian",
                correct: false
            }
        ]
    },
    {
        question: "Which animal can see with their eyes closed?",
        answers: [
            {
                text: "Chameleon",
                correct: false
            },
            {
                text: "Lemur",
                correct: false
            },
            {
                text: "Skink",
                correct: true
            },
            {
                text: "Komodo Dragon",
                correct: false
            }
        ]
    },
    {
        question: "How many bytes are there in 10 GB?",
        answers: [
            {
                text: "10*(1000) bytes",
                correct: false
            },
            {
                text: "10*(2^10) bytes",
                correct: false
            },
            {
                text: "10*(2^20) bytes",
                correct: false
            },
            {
                text: "10*(2^30) bytes",
                correct: true
            }
        ]
    },
    {
        question: "Which one of these cannot be referred as the value of PI?",
        answers: [
            {
                text: "22/7",
                correct: false
            },
            {
                text: "6.6260715 X 10^-34",
                correct: true
            },
            {
                text: "3.14159...",
                correct: false
            },
            {
                text: "44/14",
                correct: false
            }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestions();
}

function showQuestions(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(event){
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored : ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestions();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();