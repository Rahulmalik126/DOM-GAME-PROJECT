let body = document.querySelector("body");
let container = document.createElement("div");
container.className = "container";
let rows = document.createElement("div");
rows.className = "rowFlex";

function shuffleArray(arr) {
  // function to shuffle the array to get the random set of blocks
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function startTimer() {
  // function to calculate the time
  let time = 0;
  let timerId = setInterval(() => {
    time++;
    timerDiv.textContent = `TIME: ${time} Sec`;
  }, 1000);
  return timerId;
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
shuffleArray(arr);

for (let i = 0; i < 16; i++) {
  // creating cards
  let block = document.createElement("div");
  block.className = "block";
  let front = document.createElement("img");
  front.src = "Assets/block.png";
  front.className = "front";
  let item = document.createElement("img");
  item.src = `Assets/${arr[i]}.png`;
  item.className = "item";
  block.setAttribute("number", `${arr[i]}`);
  block.appendChild(front);
  block.appendChild(item);
  rows.appendChild(block);
}

let prev = null;
let moves = 0;
let movesDiv = document.createElement("div");
movesDiv.textContent = `MOVES: ${moves}`;
movesDiv.className = "moves";
container.appendChild(movesDiv);

let first = true;
let timerId;
let counter = 0;

container.addEventListener("click", (event) => {
  //event called every time block is clicked
  if (event.target.className === "front") {
    if (first) {
      timerId = startTimer();
      first = false;
    }
    let movesDiv = document.querySelector(".moves");
    moves++;
    movesDiv.textContent = `MOVES: ${moves}`;
    event.target.parentElement.style.transform = "rotateY(180deg)";
    if (prev != null) {
      setTimeout(() => {
        if (prev !== event.target.parentElement.getAttribute("number")) {
          event.target.parentElement.style.transform = "rotateY(0deg)";
          let wrong = document.querySelectorAll(`[number="${prev}"]`);
          Array.from(wrong).forEach((block) => {
            block.style.transform = "rotateY(0deg)";
          });
        } else {
          let wrong = document.querySelectorAll(`[number="${prev}"]`);
          Array.from(wrong).forEach((block) => {
            block.style.background =
              "linear-gradient(rgb(248, 197, 103) 0%, orange 50%)";
            block.style.borderRadius = "0.3rem";
          });
          counter++;
          console.log(`out ${counter}`);
          if (counter === 8) {
            clearInterval(timerId);
          }
        }
        prev = null;
      }, 500);
    } else {
      prev = event.target.parentElement.getAttribute("number");
    }
  }
  let movesDiv = document.createElement("div");
  movesDiv.textContent = `moves`;
});

let timerDiv = document.createElement("div");
timerDiv.textContent = `TIME: 0 Sec`;
timerDiv.className = "timer";

container.appendChild(rows);
container.appendChild(timerDiv);
body.appendChild(container);

let reset = document.createElement("div");
reset.textContent = "RESET";
reset.className = "reset";
body.appendChild(reset);

reset.addEventListener("click", () => {
  // function to reset the game
  window.location.reload();
});
