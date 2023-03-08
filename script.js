const currentPlayername = document.querySelector("[data-currentPlayer]");
const boxes = document.querySelectorAll(".box");
const newgameButton = document.querySelector("[data-newgameBtn]");

let currentPlayer;
let gameGrid;
let fillCount = 0;
const winningPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
initGame();

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  currentPlayername.innerText = `Current Player - ${currentPlayer}`;
  currentPlayername.classList.add("active");
  // Need to update UI
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.pointerEvents = "all";
    box.classList.remove("box-background");
  })
}

function swapPlayername() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  // UI update
  currentPlayername.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(index) {
  let answer = "";
  winningPosition.forEach((position) => {
    //all 3 boxes should be non-empty and exactly same in value
    if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                //check if winner is X
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                } 

      // background coloring
      boxes[position[0]].classList.add("box-background");
      boxes[position[1]].classList.add("box-background");
      boxes[position[2]].classList.add("box-background");

      // disabeling pointering
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      })
    }
  });

  // It means we have a winner
  if(answer !== ""){
    currentPlayername.innerText = `Winner Player - ${answer}`;
    newgameButton.classList.add("active");
    return;
  }
  
  // For draw
  if(fillCount === 9){
    currentPlayername.innerText = `Game Tied !`;
    newgameButton.classList.add("active");
  }
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    // Swaping Playername
    swapPlayername();
    // Checking if Game Over or not
    checkGameOver(index);
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    // console.log(index);
    fillCount++;
    handleClick(index);
  });
});

newgameButton.addEventListener("click", initGame);
