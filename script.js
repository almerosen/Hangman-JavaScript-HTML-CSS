let words = ["football", "golf", "hockey", "cycling", "badminton"];

let word = "";
let remainingCorrectLetters = "";
let wrongGuess = 0;
let rightGuessedLetters = [];
let wrongGuessedLetters = [];


const bodyparts = document.querySelectorAll(".bodyparts");
const wordDisplay = document.querySelector(".wordDisplay")
const guessInput = document.getElementById("guessLetterInput")
const wrongGuessedLettersDisplay = document.getElementById("wrong-guessed-letters")
const answerContainer = document.querySelector(".answer")
const wrongGuessesContainer = document.querySelector(".wrong-guesses-container")

const btnStart = document.querySelector(".start-button-container");

const btnGuess = document.querySelector("#guessButton");
const btnReset = document.querySelector("#resetButton");
const btnLostPlayAgain = document.querySelector(".lost-play-again-button");
const btnWonPlayAgain = document.querySelector(".won-play-again-button");

const hideBodyParts = () => {
     bodyparts.forEach(part => part.classList.add("hidden"))
}
const showBodyPart = () => {
    bodyparts[4 - wrongGuess].classList.remove("hidden")
}

const startGame = () => {
    word = words[Math.floor(Math.random() * words.length)]
    console.log("Word to guess:", word)
    remainingCorrectLetters = word.length; 

    word.split(" ")
    for (let i = 0; i < word.length; i++) {
        wordDisplay.innerHTML += `<div class="wordDisplay-letters"></div>`
    }

    answerContainer.classList.toggle("hidden");
    wrongGuessesContainer.classList.toggle("hidden");
    btnStart.classList.toggle("hidden");

    hideBodyParts()

    if (wrongGuess === 0) {
        wrongGuessedLettersDisplay.classList.add("hidden")
    }
}


const guessLetter = () => {

    const guess = guessInput.value.toLowerCase()


    if (rightGuessedLetters.includes(guess) || wrongGuessedLetters.includes(guess)) {
        alert("You have already guessed that letter")
        guessInput.value = ""
        return
    }

    if (word.includes(guess)) {
        word.split("").forEach((letter, index) => {
            if (letter === guess) {
                rightGuessedLetters.push(guess)
                document.querySelectorAll(".wordDisplay-letters")[index].innerHTML = `<p>${guess.toUpperCase()}</p>` 
                remainingCorrectLetters--
                remainingCorrectLetters > 0 ? console.log("Correct guess. Remaining letters:", remainingCorrectLetters) : console.log("You won!")

            }
        })

    } else {
        wrongGuess++
        wrongGuessedLetters.push(guess)
        wrongGuessedLettersDisplay.classList.remove("hidden")
        console.log(`Wrong guesses: ${wrongGuess}`)
        showBodyPart()
    }

    if (remainingCorrectLetters === 0) {
        document.querySelector("#win-container").classList = "";
        document.querySelector(".won-lost-word__txt").innerHTML = `The correct word was: ${word}`;
    }
    
    if (wrongGuess === 4) {
        document.querySelector("#loose-container").classList.toggle("hidden");
        document.querySelector(".lost-word__txt").innerHTML = `The correct word was: ${word}`;
    }

    guessInput.focus();
    guessInput.value = "";
    wrongGuessedLettersDisplay.innerHTML = wrongGuessedLetters.join(" ").toUpperCase();
};


const resetGame = () => {
    word = "";
    remainingCorrectLetters = 0;
    wrongGuess = 0;
    wrongGuessedLetters = [];
    rightGuessedLetters = [];
    hideBodyParts()

    wordDisplay.innerHTML = ""
    wrongGuessedLettersDisplay.innerHTML = "";
    answerContainer.classList.toggle("hidden");
    wrongGuessesContainer.classList.toggle("hidden");
    btnStart.classList.toggle("hidden");
}


btnStart.addEventListener('click', startGame);
btnGuess.addEventListener('click', guessLetter);
btnReset.addEventListener('click', resetGame);
btnLostPlayAgain.addEventListener('click', resetGame);
btnLostPlayAgain.addEventListener('click', () => {
    document.querySelector("#loose-container").classList.toggle("hidden");
})
btnWonPlayAgain.addEventListener('click', resetGame);
btnWonPlayAgain.addEventListener('click', () => {
    document.querySelector("#win-container").classList.toggle("hidden");
})






