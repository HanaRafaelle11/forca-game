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
        'História': ['napoleão', 'cleópatra', 'hitler', 'gandhi', 'martin luther king', 'maomé', 'lenin', 'winston churchill']
    };

    let chosenCategory;
    let chosenWord;
    let wordLetters;
    let wrongLetters = [];
    let remainingAttempts = 6;

    function getRandomWord() {
        const categories = Object.keys(words);
        chosenCategory = categories[Math.floor(Math.random() * categories.length)];
        const wordList = words[chosenCategory];
        chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
        wordLetters = [...chosenWord];
        return chosenWord;
    }

    function displayWord() {
        const wordDisplay = wordLetters.map(letter => {
            if (letter === ' ') return '&nbsp;';
            return wrongLetters.includes(letter) || document.getElementById('wrong-letters').textContent.includes(letter) ? letter : '_';
        }).join(' ');
        document.getElementById('word').innerHTML = wordDisplay;
    }

    function displayHangman() {
        const stages = [
            '-----\n|   |\n    \n    \n    \n    \n    \n    \n=========\n',
            '-----\n|   |\nO   \n    \n    \n    \n    \n    \n=========\n',
            '-----\n|   |\nO   \n|   \n    \n    \n    \n    \n=========\n',
            '-----\n|   |\nO   \n|/  \n    \n    \n    \n    \n=========\n',
            '-----\n|   |\nO   \n|/\\ \n    \n    \n    \n    \n=========\n',
            '-----\n|   |\nO   \n|/\\ \n/   \n    \n    \n    \n=========\n',
            '-----\n|   |\nO   \n|/\\ \n/ \\ \n    \n    \n    \n=========\n'
        ];
        document.getElementById('hangman').textContent = stages[6 - remainingAttempts];
    }

    function displayAttempts() {
        document.getElementById('attempts-count').textContent = `Tentativas restantes: ${remainingAttempts}`;
    }

    function displayWrongLetters() {
        document.getElementById('wrong-letters').textContent = `Letras erradas: ${wrongLetters.join(', ')}`;
    }

    function handleKeyPress(e) {
        if (remainingAttempts > 0 && !wordLetters.every(letter => wrongLetters.includes(letter))) {
            const letter = e.key.toLowerCase();
            if (!wrongLetters.includes(letter) && chosenWord.includes(letter)) {
                wordLetters.forEach((l, i) => {
                    if (l === letter) {
                        wordLetters[i] = letter;
                    }
                });
            } else if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                remainingAttempts--;
            }
            displayWord();
            displayHangman();
            displayAttempts();
            displayWrongLetters();
        }
    }

    function setupKeyboard() {
        const keyboardContainer = document.getElementById('keyboard');
        keyboardContainer.innerHTML = '';
        const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
        letters.forEach(letter => {
            const button = document.createElement('button');
            button.textContent = letter;
            button.addEventListener('click', () => handleKeyPress({ key: letter }));
            keyboardContainer.appendChild(button);
        });
    }

    function startGame() {
        getRandomWord();
        displayWord();
        displayHangman();
        displayAttempts();
        displayWrongLetters();
        setupKeyboard();
    }

    startGame();
});
