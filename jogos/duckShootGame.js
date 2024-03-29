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
  }).then(function() {
    // Inicia o cronômetro quando o usuário clicar em "OK"
    var segundos = 0;
    var minutos = 0;
    var horas = 0;
  
    var cronometroElement = document.getElementById('cronometro');
  
    setInterval(function() {
      segundos++;
      if (segundos == 60) {
        minutos++;
        segundos = 0;
      }
      if (minutos == 60) {
        horas++;
        minutos = 0;
      }
      cronometroElement.textContent = (horas < 10 ? '0' + horas : horas) + ':' + (minutos < 10 ? '0' + minutos : minutos) + ':' + (segundos < 10 ? '0' + segundos : segundos);
    }, 1000);
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
    }, 900);

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
if (score % 5 === 0) {
    // Cria um novo elemento para a mensagem
var message = document.createElement('div');
message.style.position = 'fixed';
message.style.top = '50%';
message.style.width = '100%';
message.style.textAlign = 'center';
message.style.backgroundColor = 'yellow';
message.style.color = 'black'; // Adiciona esta linha para mudar a cor do texto para preto
message.style.position = 'fixed';
message.style.top = '20%';
message.style.left = '50%';
message.style.transform = 'translate(-50%, -50%)';



// Cria um novo elemento de imagem para o GIF
var gif = document.createElement('img');
gif.src = '../midia/duck3.gif';
// Define o tamanho do GIF para um valor aleatório entre 50px e 150px
var tamanho = Math.random() * 100 + 50;
gif.style.width = tamanho + 'px';
gif.style.height = tamanho + 'px';

// Posiciona o GIF em uma posição aleatória na tela
gif.style.position = 'fixed';
gif.style.top = Math.random() * (window.innerHeight - tamanho) + 'px';
gif.style.left = Math.random() * (window.innerWidth - tamanho) + 'px';

// Garante que o GIF seja carregado antes de adicioná-lo ao div
gif.onload = function() {
    // Posiciona o GIF em uma posição aleatória na tela
    gif.style.position = 'fixed';
    gif.style.top = Math.max(0, Math.random() * (window.innerHeight - gif.offsetHeight)) + 'px';
    gif.style.left = Math.max(0, Math.random() * (window.innerWidth - gif.offsetWidth)) + 'px';

    // Adiciona o GIF ao div
    message.appendChild(gif);

    // Adiciona o div ao corpo do documento
    document.body.appendChild(message);

    // Remove a mensagem após 30 segundos
    setTimeout(function() {
        document.body.removeChild(message);
    }, 1500);
}
}

        // Verifica se a pontuação é 300
        if (score >= 300) {
            // Se for, remove o evento de clique do pato
            duck.removeEventListener('click', arguments.callee);
        }
    });
}