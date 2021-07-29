const img = document.querySelector(".dice");
//img.removeAttribute("hidden");
const roll = document.querySelector(".btn--roll");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
let [current, currentPlayer, opponent] = [0, "player1", "player2"];

resetPlayer = function () {
  eval(currentPlayer).classList.remove("active");
  eval(opponent).classList.add("active");
  current = 0;

  document.querySelector(`.${currentPlayer} .currentScore`).textContent = 0;
  [currentPlayer, opponent] = [opponent, currentPlayer];
};
roll.addEventListener("click", function () {
  let random = Math.ceil(Math.random() * 6);

  document.querySelector(".dice").src = `images/dice-${random}.png`;
  img.removeAttribute("hidden");
  if (random !== 1) {
    if (player1.classList.contains("active")) {
      current += random;

      document.querySelector("#currentScore1").textContent = current;
    } else {
      player2.classList.add("active");
      current += random;

      document.querySelector("#currentScore2").textContent = current;
    }
  } else {
    resetPlayer();
  }
});

document.querySelector(".btn--hold").addEventListener("click", function () {
  let cscore = document.querySelector(`.${currentPlayer} .score`).textContent;
  cscore = Number(cscore) + current;
  document.querySelector(`.${currentPlayer} .score`).textContent = cscore;
  if (cscore >= 20) {
    document.querySelector(`.${currentPlayer}`).classList.add("winner");
    document.querySelector(".btn--roll").disabled = true;
    document.querySelector(".btn--hold").disabled = true;
    img.hidden = true;
  } else resetPlayer();
});

document.querySelector(".btn--new").addEventListener("click", function () {
  document.querySelector(`.player1 .score`).textContent = 0;
  document.querySelector(`.player2 .score`).textContent = 0;
  document.querySelector(`.player1 .currentScore`).textContent = 0;
  document.querySelector(`.player2 .currentScore`).textContent = 0;
  document.querySelector(`.${currentPlayer}`).classList.remove("winner");
  document.querySelector(`.player1`).classList.add("active");
  document.querySelector(`.player2`).classList.remove("active");
  [current, cscore] = [0, 0];
  document.querySelector(".btn--roll").disabled = false;
  document.querySelector(".btn--hold").disabled = false;

  img.hidden = true;
});
