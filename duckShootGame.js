// Inicializa o jogo quando a página é carregada
window.onload = init;

function init() {
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
    });
}