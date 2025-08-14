// Here is the code that will run when the page loads
window.addEventListener('DOMContentLoaded', () => {
    const rows = document.querySelectorAll('.wordle-grid') // All rows
    let currentRowIndex = 0 // Which line are we on
    let currentTileInRow = 0 // Box index in line

    const turkishLetters = /^[abcçdefgğhıijklmnoöprsştuüvyz]$/i;

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
            
         if (key.length === 1 && turkishLetters.test(key) && currentTileInRow < currentRow.length){
            if (currentTileInRow < currentRow.length) {
                currentRow[currentTileInRow].textContent = key.toLocaleUpperCase('tr-TR')
                currentTileInRow++
            }
                
        }
        
    })
})