const gameCanvas2 = document.getElementById('gameCanvas2');
const ctx2 = gameCanvas2.getContext('2d');
const centralBox2 = document.getElementById('centralBox2');
const whoseTurn2 = document.getElementById('whoseTurn2');

let number2 = Math.floor(Math.random() * 36) + 15;
let gameOver2 = false;

centralBox2.textContent = number2;

// Generate two distinct random numbers between 2 and 9
const randomNumbers2 = new Set([1]);
while (randomNumbers2.size < 3) {
  randomNumbers2.add(Math.floor(Math.random() * 8) + 2);
}
const buttons2 = Array.from(randomNumbers2).sort((a, b) => a - b);
// Add this code after defining the 'buttons' array

function updateNumber2(value) {
  if (!gameOver2) {
    const newNumber2 = number2 - value;
    if (newNumber2 < 0) {
      alert('Only moves resulting in a positive result remaining.');
    } else {
      number2 = newNumber2;
      centralBox2.textContent = number2;

      if (number2 === 0) {
        gameOver2 = true;
        whoseTurn2.textContent = whoseTurn2.textContent.includes('Lata') ? 'Game over, Lata won' : 'Game over, Raj won';
      } else {
        whoseTurn2.textContent = whoseTurn2.textContent.includes('Lata') ? "Raj's turn to move." : "Lata's turn to move.";
      }
    }
  }
}

// Update the button labels and onclick events
const buttonElements2 = document.querySelectorAll('.button-container2 button');
buttonElements2.forEach((button, index) => {
  button.textContent = buttons2[index];
  button.onclick = () => updateNumber2(buttons2[index]);
});

