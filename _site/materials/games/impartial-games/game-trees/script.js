const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');
const centralBox = document.getElementById('centralBox');
const whoseTurn = document.getElementById('whoseTurn');

let number = Math.floor(Math.random() * 36) + 15;
let gameOver = false;

centralBox.textContent = number;

// Generate two distinct random numbers between 2 and 9
const randomNumbers = new Set([1,2,3]);
while (randomNumbers.size < 3) {
  randomNumbers.add(Math.floor(Math.random() * 8) + 2);
}
const buttons = Array.from(randomNumbers).sort((a, b) => a - b);
// Add this code after defining the 'buttons' array


function updateNumber(value) {
  if (!gameOver) {
    const newNumber = number - value;
    if (newNumber < 0) {
      alert('Only moves resulting in a positive result remaining.');
    } else {
      number = newNumber;
      centralBox.textContent = number;

      if (number === 0) {
        gameOver = true;
        whoseTurn.textContent = whoseTurn.textContent.includes('Lata') ? 'Game over, Lata won' : 'Game over, Raj won';
      } else {
        whoseTurn.textContent = whoseTurn.textContent.includes('Lata') ? "Raj's turn to move." : "Lata's turn to move.";
      }
    }
  }
}

// Update the button labels and onclick events
const buttonElements = document.querySelectorAll('.button-container button');
buttonElements.forEach((button, index) => {
  button.textContent = buttons[index];
  button.onclick = () => updateNumber(buttons[index]);
});

