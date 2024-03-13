// Inicializa o jogo quando a página é carregada
window.onload = init;

function init() {
    console.log('init chamado');
    // Exibe uma caixa de diálogo explicando o jogo
    swal({
      title: "Bem-vindo ao Jogo Duck Dash !",
      text: "Duck Dash é muito mais do que um simples jogo de tiro; é uma experiência de entretenimento cuidadosamente projetada e refinada por uma equipe de especialistas em jogos e cientistas da natureza. Desenvolvido com base em extensas pesquisas e testes rigorosos, Duck Dash oferece uma jornada emocionante pela natureza selvagem, desafiando os jogadores a aprimorarem suas habilidades de pontaria e reflexos. Clique no pato para ganhar pontos. O jogo fica mais difícil depois de 300 pontos.",
      icon: "success",
      button: "Iniciar jogo",
    });

    // Obtém uma referência para o pato
    var duck = document.getElementById('duck');
    // Obtém o tamanho do pato
    var duckWidth = duck.offsetWidth;
    var duckHeight = duck.offsetHeight;

    // Inicializa a pontuação
    var score = 0;

    // Obtém uma referência para o elemento de pontuação
    var scoreElement = document.getElementById('score');

    // Move o pato para uma posição aleatória a cada segundo
    setInterval(function() {
        duck.style.top = Math.random() * (window.innerHeight - duckHeight) + 'px';
        duck.style.left = Math.random() * (window.innerWidth - duckWidth) + 'px';
    }, 1800);

    // Adiciona um evento de clique ao pato
    duck.addEventListener('click', function(event) {
        // Impede que o evento de clique se propague para a área de jogo
        event.stopPropagation();

        // Incrementa a pontuação
        score++;

        // Atualiza a pontuação na tela
        scoreElement.textContent = 'Pontuação: ' + score;
        // Atualiza o elemento de pontuação
        scoreElement.textContent = score;

// Se a pontuação for um múltiplo de 50, mostra uma mensagem e toca um beep
if (score % 4 === 0) {
    // Cria um novo elemento para a mensagem
var message = document.createElement('div');
message.style.position = 'fixed';
message.style.top = '50%';
message.style.width = '100%';
message.style.textAlign = 'center';
message.style.backgroundColor = 'yellow';
message.style.position = 'fixed';
message.style.top = '80%';
message.style.left = '80%';
message.style.transform = 'translate(-50%, -50%)';
message.style.width = '100px'; // Ajuste para o tamanho desejado
message.style.height = '100px'; // Deve ser igual à largura para um quadrado


// Cria um novo elemento de imagem para o GIF
var gif = document.createElement('img');
gif.src = '../midia/duck3.gif';

// Adiciona o GIF ao div
message.appendChild(gif);

// Adiciona o div ao corpo do documento
document.body.appendChild(message);

// Remove a mensagem após 30 segundos
setTimeout(function() {
    document.body.removeChild(message);
}, 1500);
}

        // Verifica se a pontuação é 300
        if (score >= 300) {
            // Se for, remove o evento de clique do pato
            duck.removeEventListener('click', arguments.callee);
        }
    });
}