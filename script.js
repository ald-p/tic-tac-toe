const gameBoard = (() => {
  const board = ['','','','','','','','',''];

  return { board };
})();

const Player = (sign) => {
  this.sign = sign;

  return {sign};
}

const displayController = (() => {
  const currentPlayerEl = document.querySelector('.current-player');
  const gameBoardEl = document.querySelectorAll('.game-btn');

  const displayBoardContent = (boardArr) => {
    gameBoardEl.forEach( (btn, idx) => btn.textContent = boardArr[idx]);
  }
})();

const gameController = (() => {
  const playerX = Player('X');
  const playerO = Player('O');
  
})();