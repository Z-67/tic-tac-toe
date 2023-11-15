const cells = document.querySelectorAll('cell'); 
const restartButton= document.querySelector('.restart')

// Initialize game state so this is Xs turn
let isX = true;


cells.forEach(cell => {
    cell.clicked = false;
    cell.addEventListener('click', () => {
      // if the cell has already been clicked, cant overwrite content
      if (!cell.clicked) {
        // Add 'X' or 'O' to the cell when it's clicked
        cell.textContent = isX ? 'X' : 'O';
        cell.style.color = 'black';  // Change color to black
        cell.clicked = true;  // so content stays in cell when mouseleaves
        // Switch the game state for the next player's turn
        isX = !isX;
        //check for win after each move
        checkForWin();
    }
});

    // Change hover effect based on game state
    cell.addEventListener('mouseover', () => {
        if (!cell.clicked) {
            cell.textContent = isX ? 'X' : 'O'; // Display 'X' or 'O' on hover
            cell.style.color = '#ccc';  
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
    });

    // Reset game state
    isX = true;
});

function checkForWin() {
    // Define winning combinations (indices of cells in a row/column/diagonal)
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    // Check each winning combination
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        // Check if the cells have the same content and are not empty
        if (cells[a].textContent !== '' &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent) {
            // Mark the winning cells with a line-through
            cells[a].classList.add('winning');
            cells[b].classList.add('winning');
            cells[c].classList.add('winning');

            // Display the win statement on the page   
            const winStatement = document.getElementById('winStatement');
            winStatement.textContent = `${cells[a].textContent} wins!`;
            

        }
    }
}