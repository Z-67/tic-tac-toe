const cells = document.querySelectorAll('cell'); 
const restartButton= document.querySelector('.restart')

// Initialize game state so this is Xs turn
let isX = true;

// Add a click event listener to each cell
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
            cell.textContent = '';
        }
    });
});

restartButton.addEventListener('click', () => { 
    // Clear the content and reset the clicked state for each cell
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.color = ''; // Reset text color
        cell.clicked = false;
    });

    // Reset game state
    isX = true;
});