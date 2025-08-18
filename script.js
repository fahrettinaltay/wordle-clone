window.addEventListener('DOMContentLoaded', () => {
    const rows = document.querySelectorAll('.wordle-grid'); // All rows
    let currentRowIndex = 0; // Which line are we on
    let currentTileInRow = 0; // Box index in line

    const turkishLetters = /^[abcçdefgğhıijklmnoöprsştuüvyz]$/i;

    // Tuşları işleyen ana fonksiyon
    function handleKeyPress(event) {
        const key = event.key;
        const currentRow = rows[currentRowIndex].querySelectorAll('.tile');

        if (key === 'Backspace' && currentTileInRow > 0) {
            currentTileInRow--;
            currentRow[currentTileInRow].textContent = '';
            return;
        }

        if (key === 'Enter' && currentTileInRow === 5) {
            currentRowIndex++;
            currentTileInRow = 0;
            return;
        }

        if (key.length === 1 && turkishLetters.test(key) && currentTileInRow < currentRow.length) {
            currentRow[currentTileInRow].textContent = key.toLocaleUpperCase('tr-TR');
            currentTileInRow++;
        }
    }

    // Klavye ile tuşlara basıldığında
    window.addEventListener('keydown', handleKeyPress);

    // Sanal klavye tuşlarına tıklandığında
    document.querySelectorAll(".keyboard button").forEach(button => {
        button.addEventListener("click", () => {
            let key = button.getAttribute("data-key");

            // Enter ve Backspace özel durumu
            if (key === "Backspace") key = "Backspace";
            else if (key === "Enter" || key === "↵") key = "Enter";

            handleKeyPress({ key });
        });
    });
});
