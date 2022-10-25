const Player = (sign, locationPlayed) => {
  this.sign = sign;
  this.locationPlayed = locationPlayed

  return {sign, locationPlayed};
}

const gameBoard = (() => {
  const board = ['','','','','','','','',''];

  const updateGameBoard = (player) => {
    if (board[player.locationPlayed] !== '') return;
    board.splice(player.locationPlayed, 1, player.sign);
    return board;
  }

  return { updateGameBoard };
})();

const gameController = (() => {
  const playerX = Player('X', '');
  const playerO = Player('O', '');

  let currentPlayer = playerX; // initialize current player

  const switchPlayer = () => {
    if (currentPlayer === playerX) {
      currentPlayer = playerO;
    } else {
      currentPlayer = playerX;
    }
  }
  
  const playRound = (e) => {
    currentPlayer.locationPlayed = Number(e.target.dataset.val);
    const updatedBoard = gameBoard.updateGameBoard(currentPlayer);
    displayController.displayBoardContent(updatedBoard);
    switchPlayer();
    displayController.displayNextPlayer(currentPlayer);
  }

  return { playRound };
})();

const displayController = (() => {
  const currentPlayerEl = document.querySelector('.current-player');
  const gameBoardEl = document.querySelectorAll('.game-btn');
  gameBoardEl.forEach( btn => btn.addEventListener('click', gameController.playRound, false));

  const displayBoardContent = (boardArr) => {
    gameBoardEl.forEach( (btn, idx) => btn.textContent = boardArr[idx]);
  }

  const displayNextPlayer = (currentPlayer) => {
    currentPlayerEl.textContent = `Player ${currentPlayer.sign}'s turn`;
  }
  
  return { displayBoardContent, displayNextPlayer };

})();

