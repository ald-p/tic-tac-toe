const Player = (sign, locationPlayed) => {
  this.sign = sign;
  this.locationPlayed = locationPlayed

  return {sign, locationPlayed};
}

const gameBoard = (() => {
  const board = ['','','','','','','','',''];

  const updateGameBoard = (player) => {
    board.splice(player.locationPlayed, 1, player.sign);
    return board;
  }

  const getBoardContent = (idxArr) => {
    return !idxArr ? idxArr : idxArr.map( idx => board[idx]);
  }

  const resetBoard = () => {
    board.forEach( (item, idx) => board[idx] = '');
  }

  return { updateGameBoard, getBoardContent, resetBoard };
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

  const checkTie = () => {
    const currentBoard = gameBoard.getBoardContent([0,1,2,3,4,5,6,7,8]);
    return !currentBoard.includes('') ? true : false;
  }

  const determineWinner = () => {
    const winCombos = [[0,1,2], 
    [3,4,5], 
    [6,7,8], 
    [0,3,6], 
    [1,4,7], 
    [2,5,8], 
    [2,4,6], 
    [0,4,8]];

    const allEqual = arr => !arr ? false : arr.every(val => val === arr[0]);
    
    const winningCombo = winCombos.reduce( (winningCombo, currentCombo) => {
      const boardContent = gameBoard.getBoardContent(currentCombo);
      if (boardContent.join('') === '') return winningCombo;
      return allEqual(boardContent) ? currentCombo : winningCombo;
    }, '');

    if (winningCombo === '') {
      return false;
    } else {
      return {winnerSign: (gameBoard.getBoardContent(winningCombo))[0], winningCombo: winningCombo};
    }
  }
  
  const playRound = (e) => {
    e.target.disabled = true
    currentPlayer.locationPlayed = Number(e.target.dataset.val);

    const updatedBoard = gameBoard.updateGameBoard(currentPlayer);
    displayController.displayBoardContent(updatedBoard);

    if (!determineWinner()) {
      switchPlayer();
      displayController.displayNextPlayer(currentPlayer);
      if (checkTie()) displayController.displayTie();
    } else {
      const winner = determineWinner();
      displayController.displayWinner(winner);
    }
  }

  const resetGame = () => {
    currentPlayer = playerX;
    displayController.resetDisplay();
    gameBoard.resetBoard();
  }

  return { playRound, resetGame };
})();

const displayController = (() => {
  const currentPlayerEl = document.querySelector('.current-player');
  const resetBtn = document.querySelector('.reset');
  const gameBoardEl = Array.from(document.querySelectorAll('.game-btn'));
  gameBoardEl.forEach( btn => btn.addEventListener('click', gameController.playRound, false));
  resetBtn.addEventListener('click', gameController.resetGame, false);

  const displayBoardContent = (boardArr) => {
    gameBoardEl.forEach( (btn, idx) => btn.textContent = boardArr[idx]);
  }

  const displayNextPlayer = (currentPlayer) => {
    currentPlayerEl.textContent = `Player ${currentPlayer.sign}'s turn`;
  }

  const displayWinner = (winner) => {
    currentPlayerEl.textContent = 
    `Player ${winner.winnerSign} wins! Click Reset to play again.`;
    const winningGameBtns = gameBoardEl.filter( el => winner.winningCombo.includes(Number(el.dataset.val)));
    winningGameBtns.forEach( btn => btn.classList.add('winning-btn'));
    gameBoardEl.forEach( btn => btn.disabled = true);
  }

  const displayTie = () => {
    currentPlayerEl.textContent = `Tie game! Click Reset to play again.`;
  }

  const resetDisplay = () => {
    gameBoardEl.forEach( btn => {
      btn.disabled = false;
      btn.textContent = '';
      btn.className = 'game-btn';
    });
    currentPlayerEl.textContent = `Player X's turn`;
  }
  
  return { displayBoardContent, displayNextPlayer, displayWinner, displayTie, resetDisplay };
})();

