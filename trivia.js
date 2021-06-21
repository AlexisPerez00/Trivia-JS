//MODULOS

let triviaForm = document.getElementById("trivia");
let questionsContainer = document.getElementById("questionsContent");
let amount = document.getElementById("amount");
let category = document.getElementById("category");
let difficulty = document.getElementById("difficulty");
let type = document.getElementById("type");
let answers = document.getElementsByClassName("answer");

let questions;
let qIndex = 0;
let correct_index_answer;
let score = 0;

let arrayScore = []
let localUserList = JSON.parse(localStorage.getItem("puntuacion"))


const userStorage = () => {
  if(typeof Storage !== "undefined" ) {
    localStorage.setItem("puntuacion", JSON.stringify(arrayScore))
  }
  else {
    alert("tu navegador no es compatible con el localStorage")
  }
}

let getAPIData = e => {
  e.preventDefault();
  let url = `https://opentdb.com/api.php?amount=${amount.value}&category=${category.value}&difficulty=${difficulty.value}&type=${type.value}`;
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      questions = data.results;
      startGame();
    })
    .catch(err => console.log(err));
};

const startGame = () => {
  questionsContainer.style.display = "flex";
  triviaForm.style.display = "none";
  console.log()

  let currentQuestion = questions[qIndex];
  document.getElementById("questionName").innerText = currentQuestion.question;

  if (currentQuestion.incorrect_answers.length == 1) {
    document.getElementById("1").innerText = "True";
    document.getElementById("2").innerText = "False";
    document.getElementById("3").style.display = "none";
    document.getElementById("4").style.display = "none";
    if (currentQuestion.correct_answer === "True") correct_index_answer = 1;
    else correct_index_answer = 2;
  } else {
    document.getElementById("1").style.display = "Block";
    document.getElementById("2").style.display = "Block";
    document.getElementById("3").style.display = "Block";
    document.getElementById("4").style.display = "Block";

    correct_index_answer = Math.floor(Math.random() * 4) + 1;
    document.getElementById(correct_index_answer).innerText =
      currentQuestion.correct_answer;
    // console.log(correct_index_answer);
    let j = 0;
    for (let i = 1; i <= 4; i++) {
      if (i === correct_index_answer) continue;
      document.getElementById(i).innerText =
        currentQuestion.incorrect_answers[j];
      j++;
    }
  }
};


const selectAnswer = id => {
  let answerId = id;
  if (answerId == correct_index_answer) {
    score = score + 1;
  } else {
  }

  if (qIndex < amount.value - 1) {
    qIndex++;
    startGame();
  } else if (qIndex == amount.value - 1) {

    showResults(score);
  }
};

const showResults = () => {
  // event.preventDefault();

  // console.log(`Juego terminado`);
  questionsContainer.innerHTML = "";
  let scoreContainer = document.createElement("div");
  scoreContainer.setAttribute("class", "scoreContainer")
  scoreContainer.innerText = `GAME OVER`;

  let scoreNumber = document.createElement("p");
  scoreNumber.setAttribute("class", "score");
  scoreNumber.innerText = `PUNTUACION: ${score}`

  let restartBtn = document.createElement("a");
  restartBtn.setAttribute("href", "index.html");
  restartBtn.innerText = "RETURN";

  let resultsContainer = document.createElement("div");
  resultsContainer.setAttribute("class", "results")

  questionsContainer.appendChild(scoreContainer);
  questionsContainer.appendChild(restartBtn);
  scoreContainer.appendChild(scoreNumber);
  questionsContainer.appendChild(resultsContainer)

  let name = document.getElementById("name");

  let newUserScore =  {
    name: `${name.value}`,
    score: `${score}`
  }

  if(localUserList === null) {
    localUserList = []
  }
  arrayScore.push(...localUserList, newUserScore);
  userStorage();
  // resultados(newUserScore);




};

// const resultados = (user) => {
//   let resultado = document.createElement("p");
//   resultado.innerText = `${newUserScore.name} with ${newUserScore.score}`
//   resultsContainer.appendChild(resultado)
// }

for (let i = 0; i < answers.length; i++) {
  const element = answers[i];
  element.addEventListener("click", () => selectAnswer(element.id));
}

//Tiempo
// let time = document.getElementById("time")
// let seconds = 10

// const runTime = () => {
//   if(seconds !== 0) {
//     time = seconds
//     seconds--;
//   }
//   else {
//     seconds = 10;
//   }
// setInterval(runTime(), 1000)
// }
// const time = () => {
//   let txtSeconds;
//   if(seconds < 0) {
//     seconds = 59;
//   }

//   if(seconds < 10) {
//     txtSeconds = `0${seconds}`;
//   }
//   else {
//     txtSeconds = seconds
//   }
// }

triviaForm.addEventListener("submit", getAPIData);
