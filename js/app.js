/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
  [0, 1, 2, 3],[41, 40, 39, 38],[7, 8, 9, 10],
  [34, 33, 32, 31],[14, 15, 16, 17],[27, 26, 25, 24],
  [21, 22, 23, 24],[20, 19, 18, 17],[28, 29, 30, 31],
  [13, 12, 11, 10],[35, 36, 37, 38],[6, 5, 4, 3],
  [0, 7, 14, 21],[41, 34, 27, 20],[1, 8, 15, 22],
  [40, 33, 26, 19],[2, 9, 16, 23],[39, 32, 25, 18],
  [3, 10, 17, 24],[38, 31, 24, 17],[4, 11, 18, 25],
  [37, 30, 23, 16],[5, 12, 19, 26],[36, 29, 22, 15],
  [6, 13, 20, 27],[35, 28, 21, 14],[0, 8, 16, 24],
  [41, 33, 25, 17],[7, 15, 23, 31],[34, 26, 18, 10],
  [14, 22, 30, 38],[27, 19, 11, 3],[35, 29, 23, 17],
  [6, 12, 18, 24],[28, 22, 16, 10],[13, 19, 25, 31],
  [21, 15, 9, 3],[20, 26, 32, 38],[36, 30, 24, 18],
  [5, 11, 17, 23],[37, 31, 25, 19],[4, 10, 16, 22],
  [2, 10, 18, 26],[39, 31, 23, 15],[1, 9, 17, 25],
  [40, 32, 24, 16],[9, 17, 25, 33],[8, 16, 24, 32],
  [11, 17, 23, 29],[12, 18, 24, 30],[1, 2, 3, 4],
  [5, 4, 3, 2],[8, 9, 10, 11],[12, 11, 10, 9],
  [15, 16, 17, 18],[19, 18, 17, 16],[22, 23, 24, 25],
  [26, 25, 24, 23],[29, 30, 31, 32],[33, 32, 31, 30],
  [36, 37, 38, 39],[40, 39, 38, 37],[7, 14, 21, 28],
  [8, 15, 22, 29],[9, 16, 23, 30],[10, 17, 24, 31],
  [11, 18, 25, 32],[12, 19, 26, 33],[13, 20, 27, 34],
]
/*---------------------------- Variables (state) ----------------------------*/
let turn , winner, board;
/*------------------------ Cached Element References ------------------------*/
const cells =document.querySelectorAll('.cell')
const gameBoardElement =document.querySelector('.grid');
const gameStatus= document.getElementById("text")
const darkMode= document.getElementById("dark-mode")
const resetBtn =document.getElementById('reset')
let sound = new Audio('./sounds/kick-bass.mp3')

/*----------------------------- Event Listeners -----------------------------*/
cells.forEach(element => {
  element.addEventListener('click',handleClick)
  });
 
  resetBtn.addEventListener('click', init)
 

/*---------------------------- Functions ----------------------------*/
init()
function init() {
  board =[null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,
    null,null,null,null,null,null,null]

  turn =1
  winner =null;
  gameStatus.textContent ="It is player  🔴   turn"
  render();
  
}

function render() {
  board.forEach((cell,index) => {
    if (cell === 1){

      cells[index].style.backgroundColor = 'red';
      sound.play();
    }
    else if (cell === -1) {

      cells[index].style.backgroundColor = 'yellow'
    }else{
      cells[index].style.backgroundColor = 'white'
    }

  });

  renderText()
  }
  function renderText() {
    if (!winner){
      gameStatus.innerText =`It is Player ${turn ===1 ? "🔴" : "🟡"}'s turn ` ;
  
    } else if ( winner === "T"){
      gameStatus.innerText =" It is a TIE 🔴 🟡, Try agian! ";
  
    } else{
      gameStatus.innerText =`Congrats ${winner === 1 ? "Player 🔴" : "Player 🟡 " } won  `
      confetti.start(2000)
    }
    
  }

  function handleClick(event) {
    let cellIndex = parseInt(event.target.id)
    if (board[cellIndex] || winner) {
      return;
    } else{
      let upCells = 35 ;
      while (board[cellIndex+upCells] !==null){
      upCells -=7;
    }
    board[cellIndex+upCells] = turn;
  }
  
    turn = turn * -1;
    findTheWinner()
    render ()
  
  }


  function findTheWinner() {
    for (let i = 0; i < winningCombos.length; i++){
        let combo = winningCombos[i];
        const a = combo[0]
        const b = combo[1]
        const c = combo[2]
        const d = combo[3]
if(Math.abs(board[a]+board[b]+board[c]+board[d])===4){
winner = board[a];
}
    
      if (!board.includes(null)&& winner ===null){
        winner = "T";
      }
      
    } 
  }

  function toggleLightMode() {
    let element = document.body;
    element.classList.toggle("dark-mode");
  }

  