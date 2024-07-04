// script.js
let palavra = '';
let categoria = '';
let letrasAdvinhadas = new Set();
let tentativas = 6;
let letrasErradas = new Set();

const palavrasECategorias = [
    ['python', 'linguagem de programação'],
    ['programacao', 'linguagem de programação'],
    ['desenvolvimento', 'profissão'],
    ['inteligencia', 'conceito'],
    ['artificial', 'conceito'],
    ['machine', 'tecnologia'],
    ['learning', 'tecnologia'],
    ['tigre', 'animal'],
    ['pizza', 'comida'],
    ['são_paulo', 'lugar'],
    ['paris', 'lugar'],
    ['gato', 'animal'],
    ['cachorro', 'animal'],
    ['hamburguer', 'comida'],
    ['sushi', 'comida'],
    ['rio_de_janeiro', 'lugar'],
];

function escolherPalavraECategoria() {
    const index = Math.floor(Math.random() * palavrasECategorias.length);
    [palavra, categoria] = palavrasECategorias[index];
}

function exibirPalavra() {
    return palavra.split('').map(letra => (letrasAdvinhadas.has(letra) ? letra : '_')).join(' ');
}

function exibirBoneco() {
    const desenhos = [
        `
          -----
          |   |
              |
              |
              |
              |
        =========
        `,
        `
          -----
          |   |
          O   |
              |
              |
              |
        =========
        `,
        `
          -----
          |   |
          O   |
          |   |
              |
              |
        =========
        `,
        `
          -----
          |   |
          O   |
         /|   |
              |
              |
        =========
        `,
        `
          -----
          |   |
          O   |
         /|\\  |
              |
              |
        =========
        `,
        `
          -----
          |   |
          O   |
         /|\\  |
         /    |
              |
        =========
        `,
        `
          -----
          |   |
          O   |
         /|\\  |
         / \\  |
              |
        =========
        `,
    ];

    document.getElementById('boneco').textContent = desenhos[6 - tentativas];
}

function atualizarTela() {
    document.getElementById('dica').textContent = `Dica: A palavra é um ${categoria}.`;
    document.getElementById('palavra').textContent = exibirPalavra();
    document.getElementById('letras-erradas').textContent = `Letras erradas: ${Array.from(letrasErradas).join(' ')}`;
    document.getElementById('letras').innerHTML = '';

    for (let letra of 'abcdefghijklmnopqrstuvwxyz') {
        const button = document.createElement('button');
        button.textContent = letra;
        button.onclick = () => tentarLetra(letra);
        document.getElementById('letras').appendChild(button);
    }

    exibirBoneco();

    if (tentativas === 0) {
        alert(`Você perdeu! A palavra era: ${palavra}`);
        document.getElementById('tentar-novamente').style.display = 'block';
    } else if (!exibirPalavra().includes('_')) {
        alert('Parabéns! Você ganhou!');
        document.getElementById('tentar-novamente').style.display = 'block';
    } else {
        document.getElementById('tentar-novamente').style.display = 'none';
    }
}

function tentarLetra(letra) {
    if (letrasAdvinhadas.has(letra) || letrasErradas.has(letra)) return;

    if (palavra.includes(letra)) {
        letrasAdvinhadas.add(letra);
    } else {
        letrasErradas.add(letra);
        tentativas--;
    }

    atualizarTela();
}

function tentarNovamente() {
    escolherPalavraECategoria();
    letrasAdvinhadas.clear();
    letrasErradas.clear();
    tentativas = 6;
    atualizarTela();
}

escolherPalavraECategoria();
atualizarTela();
