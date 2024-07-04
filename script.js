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

    document.getElementById('hint-text').textContent = `Categoria: ${selectedCategory}`;

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
  +---+
  |   |
      |
      |
      |
      |
=========`,

            `
  +---+
  |   |
  O   |
      |
      |
      |
=========`,

            `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,

            `
  +---+
  |   |
  O   |
  |\\  |
      |
      |
=========`,

            `
  +---+
  |   |
  O   |
  |\\  |
  /    |
      |
=========`,

            `
  +---+
  |   |
  O   |
  |\\  |
  / \\  |
      |
=========`,

            `
  +---+
  |   |
  O   |
  |\\  |
  / \\  |
      |
=========`,

        ];
        document.getElementById('hangman').textContent = stages[6 - attempts];
    }

    function displayKeyboard() {
        const keyboardContainer = document.getElementById('keyboard');
        keyboardContainer.innerHTML = '';

        const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
        const rows = [
            letters.slice(0, 10),
            letters.slice(10, 19),
            letters.slice(19)
        ];

        rows.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'keyboard-row';
            row.forEach(letter => {
                const button = document.createElement('button');
                button.textContent = letter;
                button.addEventListener('click', () => handleGuess(letter));
                rowDiv.appendChild(button);
            });
            keyboardContainer.appendChild(rowDiv);
        });
    }

    function handleGuess(letter) {
        if (selectedWord.includes(letter)) {
            guessedLetters.push(letter);
            displayWord();
        } else {
            wrongLetters.push(letter);
            attempts--;
            displayHangman();
            if (attempts === 0) {
                showMessage('Você perdeu! A palavra era: ' + selectedWord, 'red');
                disableAllButtons();
            }
        }
        updateUI();
    }

    function updateUI() {
        document.getElementById('wrong-letters').textContent = 'Letras erradas: ' + wrongLetters.join(', ');
        document.getElementById('attempts-count').textContent = 'Tentativas restantes: ' + attempts;
        displayKeyboard();
    }

    function disableAllButtons() {
        const buttons = document.querySelectorAll('#keyboard button');
        buttons.forEach(button => button.disabled = true);
    }

    function showMessage(message, color) {
        const popup = document.createElement('div');
        popup.className = 'message-popup';
        popup.style.backgroundColor = color;
        popup.textContent = message;

        const restartButton = document.createElement('button');
        restartButton.textContent = 'Jogar de novo';
        restartButton.className = 'restart-button';
        restartButton.addEventListener('click', () => location.reload());
        popup.appendChild(restartButton);

        document.body.appendChild(popup);
    }

    function startGame() {
        selectedCategory = categories[Math.floor(Math.random() * categories.length)];
        selectedWord = words[selectedCategory][Math.floor(Math.random() * words[selectedCategory].length)];
        attempts = 6;
        guessedLetters = [];
        wrongLetters = [];
        document.getElementById('hint-text').textContent = `Categoria: ${selectedCategory}`;
        displayWord();
        displayHangman();
        updateUI();
    }

    startGame();
});
