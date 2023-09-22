// Константы для представления игрового поля
const EMPTY = '';
const X = 'X';
const O = 'O';

// Переменные для отслеживания текущего состояния игры
let board;
let currentPlayer;
let gameEnded;

// Функция для инициализации новой игры
function newGame() {
  // Инициализация игрового поля как пустого
  board = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
  ];
  // Установка текущего игрока как X
  currentPlayer = X;
  // Игра еще не закончена
  gameEnded = false;
  // Отображение игрового поля
  renderBoard();
  // Установка сообщения о ходе игрока
  setMessage(`Ход игрока ${currentPlayer}`);
}

// Функция для отображения игрового поля
function renderBoard() {
  // Получение контейнера игрового поля
  const boardContainer = document.querySelector('.board');
  // Очистка контейнера
  boardContainer.innerHTML = '';
  
  // Создание ячеек игрового поля
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.row = i;
      cell.dataset.col = j;
      // Добавление обработчика клика на ячейку
      cell.addEventListener('click', makeMove);
      // Установка содержимого ячейки
      cell.textContent = board[i][j];
      // Добавление ячейки в контейнер
      boardContainer.appendChild(cell);
    }
  }
}

// Функция для обработки хода игрока
function makeMove(event) {
  // Если игра уже закончена, то ничего не делаем
  if (gameEnded) {
    return;
  }
  
  // Получение координат ячейки, по которой кликнул игрок
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);
  
  // Если ячейка пуста, то делаем ход
  if (board[row][col] === EMPTY) {
    board[row][col] = currentPlayer;
    event.target.textContent = currentPlayer;
    
    // Проверка на победу или ничью
    if (checkWin(currentPlayer)) {
      gameEnded = true;
      setMessage(`Игрок ${currentPlayer} победил!`);
    } else if (checkDraw()) {
      gameEnded = true;
      setMessage('Ничья!');
    } else {
      // Смена игрока
      currentPlayer = currentPlayer === X ? O : X;
      setMessage(`Ход игрока ${currentPlayer}`);
    }
    
    // Сохранение состояния игры
    saveGame();
  }
}

// Функция для проверки победы
function checkWin(player) {
  // Проверка по горизонтали
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
      return true;
    }
  }
  
  // Проверка по вертикали
  for (let j = 0; j < 3; j++) {
    if (board[0][j] === player && board[1][j] === player && board[2][j] === player) {
      return true;
    }
  }
  
  // Проверка по диагоналям
  if ((board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
      (board[0][2] === player && board[1][1] === player && board[2][0] === player)) {
    return true;
  }
  
  return false;
}

// Функция для проверки ничьей
function checkDraw() {
  // Если все ячейки заполнены, то это ничья
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === EMPTY) {
        return false;
      }
    }
  }
  return true;
}
