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

    // Inicializa a pontuação
    var score = 0;

    // Obtém uma referência para o elemento de pontuação
    var scoreElement = document.getElementById('score');

    // Move o pato para uma posição aleatória a cada segundo
    setInterval(function() {
        duck.style.top = Math.random() * window.innerHeight + 'px';
        duck.style.left = Math.random() * window.innerWidth + 'px';
    }, 1000);

    // Adiciona um evento de clique ao pato
    duck.addEventListener('click', function(event) {
        // Impede que o evento de clique se propague para a área de jogo
        event.stopPropagation();

        // Incrementa a pontuação
        score++;

        // Atualiza a pontuação na tela
        scoreElement.textContent = 'Pontuação: ' + score;

        // Verifica se a pontuação é 300
        if (score >= 300) {
            // Se for, remove o evento de clique do pato
            duck.removeEventListener('click', arguments.callee);
        }
    });
}