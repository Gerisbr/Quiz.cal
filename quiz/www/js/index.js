// Globals
var tempResult = 1.01;

function doMath(a, b, c) {
  switch (a) {
    case "+":
      return b + c;
    case "-":
      return b - c;
    case "*":
      return b * c;
    case "/":
      return b / c;
  }
}

function submitAnswer(result) {
  document.querySelector("#mathForm").addEventListener("submit", function(e) {
    e.preventDefault();
    var userAnswer = document.querySelector("#answerInput").value;
    var bool = (result == userAnswer) ? true : false;

    if (bool === true) {
      // Define a cor verde para o sucesso
      document.body.style.backgroundColor = "#34a853";
      setTimeout(function() {
        document.body.style.backgroundColor = "#333";
      }, 1000);
   //Limpa o campo de entrada
      document.querySelector("#answerInput").value = "";
      // Ask a new question
      randomCreator();
    } else {
      // Define a cor vermelha para falha
      document.body.style.backgroundColor = "#dc3545";
      setTimeout(function() {
        document.body.style.backgroundColor = "#333";
      }, 1000);
    }
  });
}

function randomCreator() {
  //Remove a resposta se uma dica foi usada
  if (document.querySelector(".correctAnswer")) {
    document.querySelector(".correctAnswer").remove();
  }

  // Configura os números aleatórios e o operador
  var operators = ["+", "-", "*", "/"];
  var randomIntOne = parseInt((Math.random() * 100), 10);
  var randomIntTwo = parseInt((Math.random() * 100), 10);
  var randomOperator = operators[Math.floor(Math.random() * operators.length)];

  // Cria o texto da pergunta e o define no documento
  var el = document.querySelector(".questionText");
  el.innerHTML = ("What is ").concat(randomIntOne, " ", randomOperator, " ", randomIntTwo, "?");

  
// Faça as contas e arredondar floats para duas casas decimais
  var preliminaryResult = doMath(randomOperator, randomIntOne, randomIntTwo);
  var isFloat = (!Number.isInteger(preliminaryResult)) ? true : false;
  var result = (isFloat === true) ? preliminaryResult.toFixed(2) : preliminaryResult;
  tempResult = result;

 // Definir ouvinte de evento para o formulário com base no tipo de navegador
  var userAnswerInput = document.querySelector("#answerInput");
  if (userAnswerInput.addEventListener) {
    userAnswerInput.addEventListener("submit", submitAnswer(result), false);
  } else if (userAnswerInput.attachEvent) {
    userAnswerInput.attachEvent("onsubmit", submitAnswer(result));
  }

  return result;
}

function answerHelp() {
  
// Verifique se a resposta já não está aparecendo
  if (!document.querySelector(".correctAnswer")) {
    //Mostra a resposta
    document.querySelector(".mathQuestion").innerHTML += ("<p class='text-center correctAnswer m-0 mb-3'>The Answer is " + tempResult + "</p>");
  }
}