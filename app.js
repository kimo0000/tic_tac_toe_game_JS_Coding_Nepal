const playerChoice = document.querySelector(".player_choice"),
  playerX = playerChoice.querySelector(".btns .x"),
  playerO = playerChoice.querySelector(".btns .o");

const playGame = document.querySelector(".play_game"),
  headerChoice = playGame.querySelector("header"),
  zoneGame = playGame.querySelector(".zone_game"),
  allBox = playGame.querySelectorAll(".zone_game span");

const finalGame = document.querySelector(".final_game"),
  msgFinal = finalGame.querySelector(".msg_final"),
  btnReplay = finalGame.querySelector(".replay");

//   console.log();

let playerSign = "x";
let signBit = true;

for (let i = 0; i < allBox.length; i++) {
  allBox[i].setAttribute("onclick", "clickedBox(this)");
}

playerX.addEventListener("click", () => {
  playerChoice.classList.add("hide");
  playGame.classList.add("show");
});

playerO.addEventListener("click", () => {
  playerChoice.classList.add("hide");
  playGame.classList.add("show");
  headerChoice.classList.add("active", "player");
});

function clickedBox(el) {
  if (headerChoice.classList.contains("player")) {
    el.innerHTML = `<i class="fa-regular fa-circle"></i>`;
    headerChoice.classList.remove("active", "player");
    playerSign = "o";
    el.setAttribute("id", playerSign);
  } else {
    el.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    headerChoice.classList.add("active", "player");
    el.setAttribute("id", playerSign);
  }

  selectWinner();
  zoneGame.style.pointerEvents = "none";
  el.style.pointerEvents = "none";
  setTimeout(() => {
    bit(signBit);
  }, 600);
}

function bit(signBit) {
  if (signBit) {
    playerSign = "x";
    let arr = [];
    for (let i = 0; i < allBox.length; i++) {
      if (allBox[i].childElementCount == 0) {
        arr.push(i);
      }
    }

    let randomEl = arr[Math.floor(Math.random() * arr.length)];
    if (arr.length) {
      if (headerChoice.classList.contains("player")) {
        allBox[randomEl].innerHTML = `<i class="fa-regular fa-circle"></i>`;
        headerChoice.classList.remove("active", "player");
        playerSign = "o";
        allBox[randomEl].setAttribute("id", playerSign);
      } else {
        allBox[randomEl].innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        headerChoice.classList.add("active", "player");
        let playerSign = "x";
        allBox[randomEl].setAttribute("id", playerSign);
      }
    }

    selectWinner();

    playerSign = "x";
    zoneGame.style.pointerEvents = "auto";
    allBox[randomEl].style.pointerEvents = "none";
  }
}

function getClass(idName) {
  return document.querySelector(".box_" + idName).id;
}

function checkClass(val1, val2, val3, sign) {
  if (
    getClass(val1) == sign &&
    getClass(val2) == sign &&
    getClass(val3) == sign
  ) {
    return true;
  }
}

function selectWinner() {
  if (
    checkClass(1, 2, 3, playerSign) ||
    checkClass(4, 5, 6, playerSign) ||
    checkClass(7, 8, 9, playerSign) ||
    checkClass(1, 4, 7, playerSign) ||
    checkClass(2, 5, 8, playerSign) ||
    checkClass(3, 6, 9, playerSign) ||
    checkClass(1, 5, 9, playerSign) ||
    checkClass(3, 5, 7, playerSign)
  ) {
    signBit = false;
    bit(signBit);
    setTimeout(() => {
      playGame.classList.remove("show");
      finalGame.classList.add("show");
      msgFinal.innerHTML = `Congra Player <span>${playerSign}</span> Is win!`;
    }, 600);
    console.log(signBit);
  } else {
    if (
      getClass(1) != "" &&
      getClass(2) != "" &&
      getClass(3) != "" &&
      getClass(4) != "" &&
      getClass(5) != "" &&
      getClass(6) != "" &&
      getClass(7) != "" &&
      getClass(8) != "" &&
      getClass(9) != ""
    ) {
      signBit = false;
      bit(signBit);
      setTimeout(() => {
        playGame.classList.remove("show");
        finalGame.classList.add("show");
        msgFinal.innerHTML = `Match Has Draw`;
      }, 600);
      console.log(signBit);
    }
  }
}

btnReplay.addEventListener("click", () => window.location.reload());
