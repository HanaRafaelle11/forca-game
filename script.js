document.addEventListener('DOMContentLoaded', () => {
    const words = ['javascript', 'python', 'java', 'ruby', 'html', 'css'];
    const hints = {
        javascript: 'linguagem de programação',
        python: 'linguagem de programação',
        java: 'linguagem de programação',
        ruby: 'linguagem de programação',
        html: 'linguagem de marcação',
        css: 'linguagem de estilo'
    };

    let selectedWord = words[Math.floor(Math.random() * words.length)];
    let hint = hints[selectedWord];
    let attempts = 6;
    let guessedLetters = [];
    let wrongLetters = [];

    document.getElementById('hint-text').textContent = hint;

    function displayWord() {
        const display = selectedWord.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_')).join(' ');
        document.getElementById('word').textContent = display;
        if (!display.includes('_')) {
            document.getElementById('message').textContent = 'Parabéns, você ganhou!';
        }
    }

    function displayHangman() {
        const stages = [
            `
  -----
  |   |
  |   
  |  
  |   
  |
  ========
            `,
            `
  -----
  |   |
  |   O
  |  
  |   
  |
  ========
            `,
            `
  -----
  |   |
  |   O
  |   |
  |   
  |
  ========
            `,
            `
  -----
  |   |
  |   O
  |  /|
  |   
  |
  ========
            `,
            `
  -----
  |   |
  |   O
  |  /|\\
  |   
  |
  ========
            `,
            `
  -----
  |   |
  |   O
  |  /|\\
  |  / 
  |
  ========
            `,
            `
  -----
  |   |
  |   O
  |  /|\\
  |  / \\
  |
  ========
            `
        ];
        document.getElementById('hangman').textContent = stages[6 - attempts];
    }

    function displayKeyboard() {
        const keyboardContainer = document.getElementById('keyboard');
        keyboardContainer.innerHTML = '';
        'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
            const button = document.createElement('button');
            button.textContent = letter;
            button.addEventListener('click', () => handleGuess(letter));
            keyboardContainer.appendChild(button);
        });
    }

    function handleGuess(letter) {
        if (selectedWord.includes(letter)) {
            guessedLetters.push(letter);
        } else {
            wrongLetters.push(letter);
            attempts--;
        }
        updateGame();
    }

    function updateGame() {
        displayWord();
        displayHangman();
        document.getElementById('attempts-count').textContent = attempts;
        document.getElementById('wrong-letters').textContent = `Letras erradas: ${wrongLetters.join(', ')}`;
        if (attempts === 0) {
            document.getElementById('message').textContent = `Você perdeu! A palavra era "${selectedWord}".`;
            document.querySelectorAll('#keyboard button').forEach(button => button.disabled = true);
        }
    }

    displayWord();
    displayHangman();
    displayKeyboard();
});
