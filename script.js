// Select all cells
const cells = document.querySelectorAll('cell');

// Initialize game state
let isX = true;

// Add a click event listener to each cell
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        // Add 'X' or 'O' to cell when it's clicked
        cell.textContent = isX ? 'X' : 'O';
        cell.style.color = 'black';  // Change color to black
        cell.clicked = true;  // Add this line
        // Switch the game state
        isX = !isX;
    });

    // Change hover effect based on game state
    cell.addEventListener('mouseover', () => {
        if (!cell.clicked) {
            cell.textContent = isX ? 'X' : 'O';
            cell.style.color = '#ccc';  // Add this line
        }
    });

    cell.addEventListener('mouseout', () => {
        if (!cell.clicked) {
            cell.textContent = '';
        }
    });
});
