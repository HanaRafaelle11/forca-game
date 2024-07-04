document.addEventListener('DOMContentLoaded', () => {
    const words = [
        'cachorro', 'gato', 'elefante', 'girafa', 'tigre', 'leão', 'macaco', 'urso', 'baleia', 'tubarão',
        'passarinho', 'tartaruga', 'cavalo', 'peixe', 'cobra', 'sapo', 'rato', 'pato', 'galinha', 'boi'
    ];
    const hints = {
        cachorro: 'animal',
        gato: 'animal',
        elefante: 'animal',
        girafa: 'animal',
        tigre: 'animal',
        leão: 'animal',
        macaco: 'animal',
        urso: 'animal',
        baleia: 'animal',
        tubarão: 'animal',
        passarinho: 'animal',
        tartaruga: 'animal',
        cavalo: 'animal',
        peixe: 'animal',
        cobra: 'animal',
        sapo: 'animal',
        rato: 'animal',
        pato: 'animal',
        galinha: 'animal',
        boi: 'animal'
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
            showMessage('Parabéns, você ganhou!', 'green');
            disableAllButtons();
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
            button.addEventListener('click', () => handleGuess(letter, button));
            keyboardContainer.appendChild(button);
        });

        // Dividir o teclado em dois blocos
        const buttons = Array.from(keyboardContainer.children);
        const firstHalf = buttons.slice(0, 13);
        const secondHalf = buttons.slice(13);
        
        const row1 = document.createElement('div');
        row1.className = 'keyboard-row';
        firstHalf.forEach(button => row1.appendChild(button));
        keyboardContainer.appendChild(row1);

        const row2 = document.createElement('div');
        row2.className = 'keyboard-row';
        secondHalf.forEach(button => row2.appendChild(button));
        keyboardContainer.appendChild(row2);
    }

    function handleGuess(letter, button) {
        button.disabled = true;
        if (selectedWord.includes(letter)) {
            guessedLetters.push(letter);
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                attempts--;
            }
        }
        updateGame();
    }

    function updateGame() {
        displayWord();
        displayHangman();
        document.getElementById('attempts-count').textContent = attempts;
        document.getElementById('wrong-letters').textContent = `Letras erradas: ${wrongLetters.join(', ')}`;
        if (attempts === 0) {
            showMessage(`Você perdeu! A palavra era "${selectedWord}".`, 'red');
            disableAllButtons();
        }
    }

    function disableAllButtons() {
        document.querySelectorAll('#keyboard button').forEach(button => button.disabled = true);
    }

    function showMessage(message, color) {
        const messageContainer = document.createElement('div');
        messageContainer.textContent = message;
        messageContainer.className = 'message-popup';
        messageContainer.style.backgroundColor = color;
        document.body.appendChild(messageContainer);

        const restartButton = document.createElement('button');
        restartButton.textContent = 'Jogue de novo';
        restartButton.className = 'restart-button';
        restartButton.addEventListener('click', () => {
            document.body.removeChild(messageContainer);
            resetGame();
        });
        messageContainer.appendChild(restartButton);
    }

    function resetGame() {
        selectedWord = words[Math.floor(Math.random() * words.length)];
        hint = hints[selectedWord];
        attempts = 6;
        guessedLetters = [];
        wrongLetters = [];

        document.getElementById('hint-text').textContent = hint;
        document.getElementById('message').textContent = '';
        displayWord();
        displayHangman();
        displayKeyboard();
        document.getElementById('wrong-letters').textContent = '';
        document.getElementById('attempts-count').textContent = attempts;
    }

    displayWord();
    displayHangman();
    displayKeyboard();
});
