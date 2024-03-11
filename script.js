const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');
const beepSound = new Audio('midia/pong-beep.mp3');
const collisions = [];
const ballImage = new Image();
const goalSound = new Audio('midia/goal.wav');
ballImage.src = 'midia/football.png';



// Desenha o plano de fundo
function drawBackground() {
    context.fillStyle = 'green';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

// Cria a bola
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 30,
    speed: 2,
    dx: 3,
    dy: 3,
    collision: false, // Nova propriedade
    delay: false // Nova propriedade
  };
// Desenha a linha do meio campo
function drawMidLine() {
    context.beginPath();
    context.setLineDash([5, 15]); // Define o estilo da linha como tracejado
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.strokeStyle = 'white';
    context.stroke();
    context.setLineDash([]); // Reseta o estilo da linha
  }

// Cria o jogador
const player = {
  x: 0,
  y: canvas.height / 2 - 50,
  width: 15,
  height: 100,
  dy: 20,
  score: 0
};

const player2 = {
    x: canvas.width - 15,
    y: canvas.height / 2 - 50,
    width: 15,
    height: 100,
    dy: 0.9,
    score: 0,
    speedIncrease: 0.1 // Aumento de velocidade a cada ponto
  };


// Desenha a bola
function drawBall() {
    context.drawImage(ballImage, ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);
  }

// Desenha o jogador
function drawPlayer() {
    const gradient = context.createLinearGradient(player.x, player.y, player.x, player.y + player.height);
    gradient.addColorStop(0, 'blue');
    gradient.addColorStop(1, 'lightblue');
    context.fillStyle = gradient;
    context.fillRect(player.x, player.y, player.width, player.height);
  }
  
  // Desenha o segundo jogador
  function drawPlayer2() {
    const gradient = context.createLinearGradient(player2.x, player2.y, player2.x, player2.y + player2.height);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(1, 'orange');
    context.fillStyle = gradient;
    context.fillRect(player2.x, player2.y, player2.width, player2.height);
  }

// Desenha a pontuação
function drawScore() {
  context.fillStyle = '#fff';
  context.font = '19px Arial';
  context.textAlign = 'center';
  context.textAlign = 'left';
  context.fillText('YOU: ' + player.score, 20, 30);
  context.fillText('COM: ' + player2.score, canvas.width - 100, 30);
}

let gameEnded = false; // Nova variável para rastrear se o jogo terminou


// Move a bola
function moveBall() {
  if (!ball.delay && !gameEnded) {
    ball.x += ball.dx;
    ball.y += ball.dy;
  }

  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy *= -1; // Inverte a direção
  }

  if (ball.x + ball.radius > canvas.width && !ball.delay) {
    ball.dx *= -1; // Inverte a direção
    player.score++; // Adiciona um ponto ao jogador 1
    goalSound.play(); // Toca o som de gol
    ball.delay = true; // Inicia o atraso
    setTimeout(() => {
      ball.delay = false; // Termina o atraso
    }, 2000);
  }

  if (ball.x - ball.radius < 0 && !ball.delay) {
    ball.dx *= -1; // Inverte a direção
    player2.score++; // Adiciona um ponto ao jogador 2
    goalSound.play(); // Toca o som de gol
    ball.delay = true; // Inicia o atraso
    setTimeout(() => {
      ball.delay = false; // Termina o atraso
    }, 2000);
    if (player.score >= 7) {
      alert('Você ganhou!');
      resetGame(); // Reinicia o jogo
    } else if (player2.score >= 7) {
      alert('O computador ganhou!');
      resetGame(); // Reinicia o jogo
    }
  }

  // Verifica se algum dos jogadores atingiu 10 pontos
  if (player.score >= 7 && !gameEnded) {
    alert('Você ganhou!');
    gameEnded = true; // Marca o jogo como terminado
    resetGame(); // Reinicia o jogo
  } else if (player2.score >= 7 && !gameEnded) {
    alert('O computador ganhou!');
    gameEnded = true; // Marca o jogo como terminado
    resetGame(); // Reinicia o jogo
  }
}

// Função para reiniciar o jogo
function resetGame() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = 3;
  ball.dy = 3;
  ball.delay = false;

  player.score = 0;
  player2.score = 0;

  gameEnded = false; // Reinicia a variável gameEnded
}

// Move o jogador
function movePlayer(e) {
  switch(e.keyCode) {
    case 38: // Seta para cima
      player.y -= player.dy;
      break;
    case 40: // Seta para baixo
      player.y += player.dy;
      break;
  }
}

// Move o segundo jogador
function movePlayer2() {
    if (ball.y < player2.y + player2.height / 2) {
      player2.y -= player2.dy;
    } else if (ball.y > player2.y + player2.height / 2) {
      player2.y += player2.dy;
    }
  }

// Limita o movimento do jogador dentro do canvas
function playerBounds() {
  if (player.y < 0) player.y = 0;
  if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

// Limita o movimento do segundo jogador dentro do canvas
function player2Bounds() {
  if (player2.y < 0) player2.y = 0;
  if (player2.y + player2.height > canvas.height) player2.y = canvas.height - player2.height;
}

// Verifica a colisão entre a bola e os jogadores
function checkCollision() {
  if(ball.y + ball.radius > player.y && ball.y - ball.radius < player.y + player.height && ball.dx < 0) {
    if(ball.x - ball.radius < player.x + player.width) {
      ball.dx *= -1;
      collisions.push({x: ball.x, y: ball.y, radius: ball.radius * 2, alpha: 1}); // Adiciona uma nova colisão
      beepSound.play(); // Toca o som
    }
  }

  if(ball.y + ball.radius > player2.y && ball.y - ball.radius < player2.y + player2.height && ball.dx > 0) {
    if(ball.x + ball.radius > player2.x) {
      ball.dx *= -1;
      collisions.push({x: ball.x, y: ball.y, radius: ball.radius * 2, alpha: 1}); // Adiciona uma nova colisão
      beepSound.play(); // Toca o som
    }
  }
}

// Atualiza o jogo
function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawBall();
    drawPlayer();
    drawPlayer2();
    drawMidLine(); 
    drawScore();
  
    // Desenha as colisões
    for (let i = collisions.length - 1; i >= 0; i--) {
      const collision = collisions[i];
      context.fillStyle = `rgba(255, 0, 0, ${collision.alpha})`;
      context.beginPath();
      context.arc(collision.x, collision.y, collision.radius, 0, Math.PI * 2, false);
      context.fill();
  
      // Atualiza a colisão
      collision.radius += 0.5; // Aumenta o raio
      collision.alpha -= 0.01; // Diminui a opacidade
  
      // Remove a colisão se ela já terminou
      if (collision.alpha <= 0) {
        collisions.splice(i, 1);
      }
    }
  
    moveBall();
    movePlayer2();
    playerBounds();
    player2Bounds();
    checkCollision();
  
    requestAnimationFrame(update);
  }

// Adiciona o evento de teclado
window.addEventListener('keydown', movePlayer);

update();