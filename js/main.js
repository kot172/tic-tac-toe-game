
// Функция для отображения сообщения
function setMessage(message) {
  const messageContainer = document.querySelector('.message');
  messageContainer.textContent = message;
}


// Обработчик события нажатия на кнопку "Новая игра"
document.getElementById('new-game-button').addEventListener('click', () => {
  localStorage.clear();
  newGame();
});

// Инициализация игры при загрузке страницы
loadGame();
