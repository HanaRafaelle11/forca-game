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
        const display = selectedWord.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_')).join(' ');
        document.getElementById('word').textContent = display;
        if (!display.includes('_')) {
            showMessage('Parabéns, você ganhou!', 'green');
            disableAllButtons();
        }
    }

    function displayHangman() {
        const stages = [
            ` ----- \n |     \n |     \n |     \n |     \n |     \n ======== `,
            ` ----- \n |     \n |     \n |     \n |     \n |     \n |     \n |     \n ======== `,
            ` ----- \n |     \n |     \n |     \n |     \n |     \n |     \n |     \n ======== `,
            ` ----- \n |     \n |     \n |     \n |     \n |     \n |     \n |     \n ======== `,
            ` ----- \n |     \n |     \n |     \n |     \n |     \n |     \n |     \n ======== `,
            ` ----- \n |     \n |     \n |     \n |     \n |     \n |     \n |     \n ======== `,
            ` ----- \n |     \n |     \n |     \n |     \n |     \n |     \n |     \n ======== `
        ];
        const hangmanStages = [
            ` ----- \n |     \n |     \n |     \n |     \n |     \n |     \n ======== `,
            ` ----- \n |     \n |     \n |     \n |     \n |     \n |     \n |     \n | O \n ======== `,
            ` ----- \n |     \n |     \n |     \n |     \n |     \n |     \n |     \n | O \n | | \n ======== `,
            ` ----- \n |     \n |     \n |     \n |     \n |     \n |     \n |     \n | O \n | | \n | / \n ======== `,
            ` ----- \n |     \n |     \n |     \n |     \n |     \n |     \n |     \n | O \n | | \n | / \\ \n ======== `,
            ` ----- \n |     \n |     \n |     \n |     \n |     \n |     \n |     \n | O \n | | \n | / \\ \n | / \n ======== `,
            ` ----- \n |     \n |     \n |     \n |     \n |     \n |     \n |     \n | O \n | | \n | / \\ \n | / \\ \n ======== `
        ];
        document.getElementById('hangman').innerHTML = hangmanStages[6 - attempts];
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
        selectedCategory = categories[Math.floor(Math.random() * categories.length)];
        selectedWord = words[selectedCategory][Math.floor(Math.random() * words[selectedCategory].length)];
        attempts = 6;
        guessedLetters = [];
        wrongLetters = [];
        document.getElementById('hint-text').textContent = selectedCategory;
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
