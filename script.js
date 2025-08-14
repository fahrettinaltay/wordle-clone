// Here is the code that will run when the page loads
window.addEventListener('DOMContentLoaded', () => {
    const rows = document.querySelectorAll('.wordle-grid') // All rows
    let currentRowIndex = 0 // Which line are we on
    let currentTileInRow = 0 // Box index in line

    // It works when any key is pressed on the keyboard, the information about the pressed key is in event.key
    window.addEventListener('keydown', (event) => {
        const key = event.key;
        const currentRow = rows[currentRowIndex].querySelectorAll('.tile') // Boxes in the current row

        if (key === 'Backspace' && currentTileInRow > 0) {
                currentTileInRow--
                currentRow[currentTileInRow].textContent = ''
        }
        
        
        if (key === 'Enter' && currentTileInRow === 5 ) {
            currentRowIndex++
            currentTileInRow = 0
        }
            
         if (key.length === 1 && key.match(/[a-z]/i)){
            if (currentTileInRow < currentRow.length) {
                currentRow[currentTileInRow].textContent = key.toUpperCase()
                currentTileInRow++
            }
                
        }
        
    })
})