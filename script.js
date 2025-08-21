let wordList = []

fetch('words.json')
    .then(response => response.json())    // convert json to js
    .then(data => {
        wordList = data
        todayWord = wordList[Math.floor(Math.random() * wordList.length)]
        console.log("The words in today: ", todayWord)
    })
    .catch(error => console.error("JSON loading is failed.", error))



window.addEventListener('DOMContentLoaded', () => {
    const rows = document.querySelectorAll('.wordle-grid'); // All rows
    let currentRowIndex = 0; // Which line are we on
    let currentTileInRow = 0; // Box index in line
    const maxRows = 6
    const wordLength = 5
    const turkishLetters = /^[abcçdefgğhıijklmnoöprsştuüvyz]$/i;

    // Main function of operating the keys
    function handleKeyPress(event) {
        
        const key = event.key;
        const currentRow = rows[currentRowIndex].querySelectorAll('.tile');
        
        // -- BACKSPACE --
        if (key === 'Backspace' && currentTileInRow > 0) {
            currentTileInRow--;
            currentRow[currentTileInRow].textContent = '';
            return;
        }
        // -- ENTER --
        if (key === 'Enter' && currentTileInRow === wordLength) {
            let guess = ""
            currentRow.forEach(tile => guess += tile.textContent.toLocaleLowerCase('tr-TR'))

            // Check the word
            for (let i = 0; i < wordLength; i++) {
                    let letter = currentRow[i].textContent.toLocaleLowerCase('tr-TR')

                    if (letter === todayWord[i]) {
                        currentRow[i].style.backgroundColor = "green"
                    } else if (todayWord.includes(letter)) {
                        currentRow[i].style.backgroundColor = "gold"
                    } else {
                        currentRow[i].style.backgroundColor = "gray"
                    }
                }
            if (guess === todayWord) {
                setTimeout(() => alert("Congratulations! You found the word!"), 200)
            } 

            currentRowIndex++;
            currentTileInRow = 0;

            if (currentRowIndex === maxRows) {
                setTimeout(() => alert("❌ Game Over! The correct word is: " + todayWord), 200);
            }
            return;

        }
        
        // -- LETTER ENTRY --
        if (key.length === 1 && turkishLetters.test(key) && currentTileInRow < currentRow.length) {
            currentRow[currentTileInRow].textContent = key.toLocaleUpperCase('tr-TR');
            currentTileInRow++;
        }
    }

    // Keyboard
    window.addEventListener('keydown', handleKeyPress);

    // Virtual Keyboard
    document.querySelectorAll(".keyboard button").forEach(button => {
        button.addEventListener("click", () => {
            let key = button.getAttribute("data-key");

            if (key === "Backspace") key = "Backspace";
            else if (key === "Enter" || key === "↵") key = "Enter";

            handleKeyPress({ key });
        });
    });
});

