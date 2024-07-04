// Função para iniciar o jogo da forca
function iniciarJogo() {
    const palavra = 'python';
    const dica = 'linguagem de programação';
    const letrasErradas = [];
    const letrasCorretas = [];
    let tentativasRestantes = 6;

    // Atualiza a dica
    document.getElementById('dica').innerText = `Dica: ${dica}`;

    // Atualiza o display da palavra com espaços para letras não adivinhadas
    function atualizarPalavra() {
        const palavraElement = document.getElementById('palavra');
        palavraElement.innerHTML = palavra.split('').map(letra => {
            return (letrasCorretas.includes(letra)) ? letra : '_';
        }).join(' ');
    }

    // Atualiza as letras erradas
    function atualizarLetrasErradas() {
        document.getElementById('letrasErradas').innerText = `Letras erradas: ${letrasErradas.join(', ')}`;
    }

    // Atualiza as letras disponíveis
    function atualizarLetrasDisponiveis() {
        const letrasDisponiveis = 'abcdefghijklmnopqrstuvwxyz';
        const letrasDisponiveisElement = document.getElementById('letrasDisponiveis');
        letrasDisponiveisElement.innerHTML = letrasDisponiveis.split('').map(letra => {
            return `<button onclick="adivinharLetra('${letra}')">${letra}</button>`;
        }).join(' ');
    }

    // Função chamada ao clicar em uma letra
    window.adivinharLetra = function(letra) {
        if (palavra.includes(letra)) {
            letrasCorretas.push(letra);
        } else {
            letrasErradas.push(letra);
            tentativasRestantes--;
        }

        atualizarPalavra();
        atualizarLetrasErradas();
        atualizarLetrasDisponiveis();

        if (tentativasRestantes === 0) {
            alert('Você perdeu! A palavra era ' + palavra);
            document.getElementById('tentarNovamente').style.display = 'block';
        } else if (palavra.split('').every(letra => letrasCorretas.includes(letra))) {
            alert('Parabéns, você ganhou!');
            document.getElementById('tentarNovamente').style.display = 'block';
        }
    };

    // Inicializa o jogo
    atualizarPalavra();
    atualizarLetrasDisponiveis();
    atualizarLetrasErradas();
    document.getElementById('tentarNovamente').style.display = 'none';

    // Configura o botão "Tentar Novamente"
    document.getElementById('tentarNovamente').onclick = () => {
        window.location.reload();
    };
}

// Inicia o jogo quando a página carrega
window.onload = iniciarJogo;
