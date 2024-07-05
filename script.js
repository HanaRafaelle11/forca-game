document.addEventListener('DOMContentLoaded', () => {
    const words = {
        'Animais': ['cachorro', 'gato', 'elefante', 'girafa', 'tigre', 'leão', 'macaco', 'urso', 'baleia', 'tubarão', 'passarinho', 'tartaruga', 'cavalo', 'peixe', 'cobra', 'sapo', 'rato', 'pato', 'galinha', 'boi'],
        'Comidas e Bebidas': ['maçã', 'banana', 'cenoura', 'bolo', 'feijoada', 'lasanha', 'pão', 'pizza', 'arroz', 'feijão', 'suco', 'refrigerante'],
        'Cores': ['vermelho', 'azul', 'amarelo', 'verde', 'laranja', 'roxo', 'rosa', 'preto', 'branco', 'cinza', 'marrom'],
        'Cidades e Países': ['são paulo', 'rio de janeiro', 'brasil', 'argentina', 'alemanha', 'frança', 'portugal', 'japão', 'china', 'egito', 'londres'],
        'Profissões': ['médico', 'advogado', 'professor', 'engenheiro', 'enfermeiro', 'policial', 'bombeiro', 'dentista', 'arquiteto'],
        'Esportes': ['futebol', 'basquete', 'vôlei', 'natação', 'tênis', 'boxe', 'ciclismo', 'corrida', 'surfe'],
        'Marcas': ['nike', 'adidas', 'apple', 'samsung', 'honda', 'toyota', 'ford', 'chevrolet', 'puma', 'gucci', 'prada'],
        'Famosos': ['beyoncé', 'brad pitt', 'angelina jolie', 'madonna', 'michael jackson', 'elvis presley', 'bill gates', 'steve jobs'],
        'Personagens': ['batman', 'superman', 'spiderman', 'harry potter', 'hermione', 'frodo', 'aragorn', 'sherlock holmes'],
        'História': ['napoleão', 'cleópatra', 'hitler', 'gandhi', 'martin luther king', 'abraham lincoln', 'joana d\'arc'],
        'Ciência': ['física', 'química', 'biologia', 'astronomia', 'geologia', 'genética', 'evolução', 'gravidade'],
        'Geografia': ['atlântico', 'pacífico', 'himalaia', 'everest', 'nilo', 'amazonas', 'sahara', 'andés'],
        'Mitologia': ['zeus', 'hera', 'poseidon', 'hades', 'apolo', 'atena', 'hercules', 'perseu'],
        'Festa Junina': ['canjica', 'pamonha', 'quadrilha', 'pescaria', 'fogos', 'balão', 'milho'],
        'Natal': ['papai noel', 'presente', 'árvore', 'presépio', 'panetone', 'ceia', 'sino', 'estrela']
    };

    const categories = Object.keys(words);
    let selectedCategory = categories[Math.floor(Math.random() * categories.length)];
    let selectedWord = words[selectedCategory][Math.floor(Math.random() * words[selectedCategory].length)];
    let attempts = 6;
    let guessedLetters = [];
    let wrongLetters = [];

    document.getElementById('hint-text').textContent = selectedCategory;

    function displayWord() {
        const display = selectedWord.split('').map(letter => (letter === ' ' ? ' ' : (guessedLetters.includes(letter) ? letter : '_'))).join(' ');
        document.getElementById('word').textContent = display;
        if (display.replace(/\s+/g, '') === selectedWord) {
            showMessage('Parabéns, você ganhou!', 'green');
            disableAllButtons();
        }
    }

    function displayHangman() {
        const stages = [
            ` 
  +---+
  |   |
      |
      |
      |
      |
=========
            `,
            ` 
  +---+
  |   |
  O   |
      |
      |
      |
=========
            `,
            ` 
  +---+
  |   |
  O   |
  |   |
      |
      |
=========
            `,
            ` 
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========
            `,
            ` 
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========
            `,
            ` 
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========
            `,
            ` 
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========
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

        // Criar duas linhas para o teclado
        const firstRow = document.createElement('div');
        firstRow.classList.add('keyboard-row');
        firstHalf.forEach(button => firstRow.appendChild(button));
        keyboardContainer.appendChild(firstRow);

        const secondRow = document.createElement('div');
        secondRow.classList.add('keyboard-row');
        secondHalf.forEach(button => secondRow.appendChild(button));
        keyboardContainer.appendChild(secondRow);
    }

    function handleGuess(letter, button) {
        button.disabled = true;
        if (selectedWord.includes(letter)) {
            guessedLetters.push(letter);
            displayWord();
        } else {
            wrongLetters.push(letter);
            attempts--;
            displayHangman();
            document.getElementById('attempts-count').textContent = attempts;
            document.getElementById('wrong-letters').textContent = `Letras erradas: ${wrongLetters.join(' ')}`;
            if (attempts === 0) {
                showMessage('Você perdeu! A palavra era: ' + selectedWord, 'red');
                disableAllButtons();
            }
        }
    }

    function showMessage(message, color) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message-popup');
        messageDiv.style.backgroundColor = color;
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);

        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 3000);
    }

    function disableAllButtons() {
        document.querySelectorAll('#keyboard button').forEach(button => button.disabled = true);
    }

    function resetGame() {
        selectedCategory = categories[Math.floor(Math.random() * categories.length)];
        selectedWord = words[selectedCategory][Math.floor(Math.random() * words[selectedCategory].length)];
        attempts = 6;
        guessedLetters = [];
        wrongLetters = [];
        document.getElementById('hint-text').textContent = selectedCategory;
        document.getElementById('attempts-count').textContent = attempts;
        document.getElementById('wrong-letters').textContent = 'Letras erradas:';
        displayWord();
        displayHangman();
        displayKeyboard();
        document.getElementById('message').textContent = '';
    }

    displayWord();
    displayHangman();
    displayKeyboard();

    // Adicionando o botão "Jogue de novo"
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Jogue de novo';
    restartButton.classList.add('restart-button');
    restartButton.addEventListener('click', resetGame);
    document.body.appendChild(restartButton);
});
