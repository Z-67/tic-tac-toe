// Select all cells
const cells = document.querySelectorAll('cell');

// Initialize game state
let isX = true;

// Add a click event listener to each cell
cells.forEach(cell => {
    cell.clicked = false;
    cell.addEventListener('click', () => {
      // Check if the cell has already been clicked
      if (!cell.clicked) {
        // Add 'X' or 'O' to the cell when it's clicked
        cell.textContent = isX ? 'X' : 'O';
        cell.style.color = 'black';  // Change color to black
        cell.clicked = true;  
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
