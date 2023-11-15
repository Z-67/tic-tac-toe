const cells = document.querySelectorAll('cell'); 
const restartButton= document.querySelector('.restart')
const winStatement = document.getElementById('winStatement');


let isX = true; // Initialize game state so this is Xs turn
let gameOver = false; // used to not allow certain actions when game is over

cells.forEach(cell => {
    cell.clicked = false;

    cell.addEventListener('click', () => {
        if (gameOver || cell.clicked) {
            return; // Ignore clicks if the game is over or the cell has already been clicked
        }
      
      if (!cell.clicked) {// if the cell has already been clicked, wont allow it to overwrite content
        
        cell.textContent = isX ? 'X' : 'O';//if isX is true, cell.textContent will be set to 'X' if isX is false, it will be set to 'O'
        cell.style.color = 'black';  
        cell.clicked = true;  // so content stays in cell when mouseleaves
        
        isX = !isX;// Switch the game state for the next player's turn after each click
        
        checkForWin();//check for win after each move
        checkForDraw();
    }
});

    //when hovering over cell
    cell.addEventListener('mouseover', () => {
        if (!cell.clicked && !gameOver) {//if cell has not been clicked and game is not over, show hover effect
            cell.textContent = isX ? 'X' : 'O'; // Display X or O on hover based on if isX=true 
            cell.style.color = '#ccc'; // give grey colour
        }
    });

    cell.addEventListener('mouseout', () => {
        if (!cell.clicked) {
            cell.textContent = '';// when mouse leaves cell, hover effect will stop aswell
        }
    });
});

restartButton.addEventListener('click', () => { 
    // Clear the content and reset the clicked state for each cell
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.color = ''; // Reset text color
        cell.clicked = false;
        cell.classList.remove('winning');
        winStatement.textContent = '';
    });

    // Reset game state
    isX = true;
    gameOver = false;
});

function checkForWin() {
    // Define winning combinations 
    let winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    // Check each winning combination
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        // Check if the wining combinations of cells have the same content
        if (cells[a].textContent !== '' &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent) {
            // give cells winning class in CSS so they will have a line through
            cells[a].classList.add('winning');
            cells[b].classList.add('winning');
            cells[c].classList.add('winning');

            // end game when there is a winner
            gameOver = true;

            // Display the win statement on the page
            winStatement.textContent = `${cells[a].textContent} wins!`;

        }
    }
}

function checkForDraw() {
    // Check if all cells are clicked and check there is no winning combination by calling a function
    const isDraw = Array.from(cells).every(cell => cell.clicked) && !checkWinningCombinations();

    if (isDraw) {
        winStatement.textContent = "It's a draw!";
        gameOver = true; 
    }
}

// function to check if there are winning combinations
function checkWinningCombinations() {
    // check every cell, if one them have a winning class added then the function will return true
    for (const cell of cells) {
        if (cell.classList.contains('winning')) {
            return true;
        }
    }
    return false;
}
