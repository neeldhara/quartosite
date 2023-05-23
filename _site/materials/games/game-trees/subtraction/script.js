const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');
const centralBox = document.getElementById('centralBox');
const whoseTurn = document.getElementById('whoseTurn');
const instructions = document.getElementById('instructions');
const instructionsModal = document.getElementById('instructionsModal');
const closeModal = document.querySelector('.close');

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
const instructionsText = document.getElementById('instructionsText');
const updatedText = instructionsText.textContent.replace('{num1}', buttons[0]).replace('{num2}', buttons[1]).replace('{num3}', buttons[2]);
instructionsText.textContent = updatedText;

instructions.addEventListener('click', () => {
  instructionsModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
  instructionsModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === instructionsModal) {
    instructionsModal.style.display = 'none';
  }
});

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
document.getElementById("myForm").addEventListener("submit", function(event){
    event.preventDefault();
    
    var a = document.getElementById("numA").value;
    var b = document.getElementById("numB").value;
    var n = document.getElementById("numN").value;
    
    var output = document.getElementById("output");
    var p = document.createElement("p");
    p.textContent = buildTree(n, a, b, "");
    
    output.appendChild(p);
  });
  
  function buildTree(n, a, b, prefix) {
    n = Number(n);
    a = Number(a);
    b = Number(b);
  
    if(n < 0) {
      return "";
    }
    
    var tree = prefix + n + "\n";
    prefix += "|-";
    
    tree += buildTree(n - 1, a, b, prefix);
    tree += buildTree(n - a, a, b, prefix);
    tree += buildTree(n - b, a, b, prefix);
    
    return tree;
  }