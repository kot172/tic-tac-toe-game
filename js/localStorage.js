// Функция для сохранения игры в localStorage
function saveGame() {
    localStorage.setItem('board', JSON.stringify(board));
    localStorage.setItem('currentPlayer', currentPlayer);
    localStorage.setItem('gameEnded', gameEnded);
  }
  
  // Функция для загрузки игры из localStorage
  function loadGame() {
    const savedBoard = localStorage.getItem('board');
    const savedCurrentPlayer = localStorage.getItem('currentPlayer');
    const savedGameEnded = localStorage.getItem('gameEnded');
    
    if (savedBoard && savedCurrentPlayer && savedGameEnded) {
      board = JSON.parse(savedBoard);
      currentPlayer = savedCurrentPlayer;
      gameEnded = savedGameEnded === 'true';
      renderBoard();
      setMessage(`Ход игрока ${currentPlayer}`);
    } else {
      newGame();
    }
  }