const questions = [
    {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
        "Central Process Unit",
        "Computer Personal Unit",
        "Central Processor Unit",
    ],
    },
    {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
        "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
    },
    {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
    },
    {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
        "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
    },
    {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
        "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
    },
    {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
        "Counter Strike: Source",
        "Corrective Style Sheet",
        "Computer Style Sheet",
    ],
    },
    {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
        "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: [
        "Ice Cream Sandwich",
        "Jelly Bean",
        "Marshmallow",
    ],
    },
    {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
    },
    {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
    },
    {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
        "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
    },
];

let unansweredQuestions = questions

window.onload = function () {

    document.getElementById("begin").addEventListener("click", () => {
        document.getElementById("begin").style.display = "none"
        newQuestion()
    })
    // HINTS
    // IF YOU ARE DISPLAYING ALL THE QUESTIONS AT ONCE:
    // For each question, create a container for wrapping it; then create a radio button
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio
    // with, as options, both the correct answer and the incorrect ones
    // (you'll probably need to google how to get the value from a radio button in JS to evaluate the final score)
    //
    // IF YOU ARE DISPLAYING ONE QUESTION AT A TIME
    // Display the first question with the text and the radio buttons
    // when the user selects an answer, pick the next question from the array and replace the old one with it
    // saving the user's choice in a variable
};

// How to calculate the result? You can do it in 2 ways:
// If you are presenting all the questions together, just take all the radio buttons and check if the selected answer === correct_answer
// If you are presenting one question at a time, just add one point or not to the user score if the selected answer === correct_answer

const randomColorGenerator = () => {

    let colors = [["#4aa3a3", "#c0d8d8", "#87b5b5"], ["#a34aa3", "#d8c0d8", "#b587b5"], ["#a3a34a", "#d8d8c0", "#b5b587"]]
    const randomNum = () => Math.floor(Math.random() * 3)

    document.getElementById("question").style.background = colors[randomNum()][0]
    document.getElementById("middle").style.background = colors[randomNum()][1]
    document.getElementById("answers").style.background = colors[randomNum()][2]
}

const newQuestion = () => {
    
    unansweredQuestions.length <= 0 ? (() => {
        document.getElementById("main").style.display = "none"
        document.getElementById("result").innerText = `You did: ${correct}/${correct + wrong}`
        return
    }) :
    document.getElementById("main").style.visibility = "visible"
    document.getElementById("next").style.display = "none"
    document.getElementById("question").innerHTML = ""
    document.getElementById("answers").innerHTML = ""
    document.getElementById("answersResult").innerHTML = ""
    randomColorGenerator()

    let question = unansweredQuestions[Math.floor(Math.random() * unansweredQuestions.length)]
    unansweredQuestions.splice(unansweredQuestions.indexOf(question), 1)
    document.getElementById("question").append(questionNode(question.question))

    document.getElementById("answersLeft").innerText = answersLeft(unansweredQuestions) + " questions to go"

    let allAnswers = question.incorrect_answers
    allAnswers.push(question.correct_answer)
    allAnswers.map(answer => document.getElementById("answers").appendChild(answerNode(question, answer)))
    document.getElementById("score").innerText = `Score: ${correct}/${correct + wrong}`
}

const questionNode = (question) => {

    let node = document.createElement("h2")
    node.innerText = question

    return node
}

let correct = 0
let wrong = 0

const answerNode = (question, answer) => {

    let node = document.createElement("button")
    node.innerText = answer
    node.classList.add("answer")

    const checkAnswer = () => {
        document.getElementById("answersResult").innerText = question.correct_answer === answer ? "Correct!" : "Wrong!"
        document.getElementById("next").style.display = "block"
        document.getElementById("next").addEventListener("click", newQuestion)
        question.correct_answer === answer ? correct++ : wrong++
    }
    node.addEventListener("click", checkAnswer)

    return node
}

const answersLeft = (unansweredQuestions) => unansweredQuestions.length + 1
