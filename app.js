let numerosSorteados = [];
const limite = 10;
let secretNumber = randomNumber();
let tentativas = 0;
const resetButton = document.querySelector("#reiniciar");
const button = document.querySelector("button");

mensagemInicial();

function selectElement(tag, texto, func) {
  const elemento = document.querySelector(tag);
  elemento.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female");

  if (func != undefined) {
    elemento.onclick = func;
  }
}

function mensagemInicial() {
  selectElement("h1", "Jogo do número secreto");
  selectElement("p", "Informe um número de 1 a 10");
}

function verifyGuess() {
  const fieldValue = document.querySelector("input").value;
  tentativas++;

  let tentativaOption = tentativas > 1 ? "tentativas":"tentativa";
  if(fieldValue == secretNumber) {
    selectElement("h1", "Você venceu!");
    selectElement("p", `Você descobriu o número secreto, com ${tentativas} ${tentativaOption}`);
    resetButton.removeAttribute("disabled");
    button.setAttribute("disabled", "true");
  } else if(fieldValue > secretNumber) {
    selectElement("p", `O número secreto é menor que ${fieldValue}`);
    limpaCampo();
  } else {
    selectElement("p", `O número secreto é maior que ${fieldValue}`);
    limpaCampo();
  }
}

function randomNumber() {
  const random = parseInt(Math.random() * limite) + 1;
  let qtNumerosSorteados = numerosSorteados.length;

  if(qtNumerosSorteados === limite) {
    numerosSorteados = [];
  }

  if(numerosSorteados.includes(random)) {
    return randomNumber();
  } else {
    numerosSorteados.push(random);
    return random;
  }
}

function limpaCampo() {
  const field = document.querySelector("input");
  field.value = "";
}

function resetGame() {
  limpaCampo();
  tentativas = 0;
  secretNumber = randomNumber();
  resetButton.setAttribute("disabled", "true");
  button.removeAttribute("disabled");
  mensagemInicial();
}