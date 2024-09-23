const canvas = document.getElementById('raceCanvas');
const ctx = canvas.getContext('2d');
const trackRadius = canvas.width / 2 - 20; // Raio da pista
const ballRadius = 15; // Raio das bolinhas
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const totalLaps = 2; // Corrida de 2 voltas
const lapAngle = 2 * Math.PI * totalLaps; // Ângulo total para 2 voltas

// Dados dos cavalos (bolinhas) com cores e velocidades
const balls = [
    { color: '#FF0000', angle: 0, speed: 0.032, laps: 0, finished: false },
    { color: '#00FF00', angle: 0, speed: 0.035, laps: 0, finished: false },
    { color: '#0000FF', angle: 0, speed: 0.033, laps: 0, finished: false },
    { color: '#FFFF00', angle: 0, speed: 0.036, laps: 0, finished: false }
];

let raceOngoing = false; // Indica se a corrida está em andamento
let betColor = ''; // Cor do cavalo apostado
let betAmount = 0; // Valor da aposta
let raceInterval; // Intervalo da corrida

// Função para desenhar a pista e a linha de chegada
function drawTrack() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenhar a pista circular
    ctx.beginPath();
    ctx.arc(centerX, centerY, trackRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#073d1d'; // Cor da pista
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
    
    // Desenhar a linha de chegada
    ctx.beginPath();
    ctx.moveTo(centerX - trackRadius, centerY);
    ctx.lineTo(centerX + trackRadius, centerY);
    ctx.strokeStyle = 'red'; // Cor da linha de chegada
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

// Função para desenhar os cavalos (bolinhas)
function drawBalls() {
    balls.forEach(ball => {
        if (!ball.finished) {
            ctx.beginPath();
            const x = centerX + (trackRadius - ballRadius) * Math.cos(ball.angle);
            const y = centerY + (trackRadius - ballRadius) * Math.sin(ball.angle);
            ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
            ctx.fillStyle = ball.color;
            ctx.fill();
            ctx.closePath();
        }
    });
}

// Função para atualizar a posição dos cavalos
function updateBalls() {
    let allFinished = true;
    balls.forEach(ball => {
        if (!ball.finished) {
            ball.angle += ball.speed;
            if (ball.angle >= lapAngle) {
                ball.angle -= lapAngle;
                ball.laps++;
                if (ball.laps >= totalLaps) {
                    ball.finished = true;
                }
            }
            allFinished = false; // Se algum cavalo não terminou, a corrida continua
        }
    });

    if (allFinished) {
        clearInterval(raceInterval);
        const winner = balls.find(ball => ball.finished);
        const resultText = `Cavalo ${winner.color} venceu a corrida! ${winner.color === betColor ? 'Você ganhou a aposta!' : 'Você perdeu a aposta.'}`;
        document.getElementById('race-result').innerText = resultText;
    }
}

// Função para iniciar a corrida
function startRace() {
    if (raceOngoing) return;

    raceOngoing = true;
    drawTrack();
    raceInterval = setInterval(() => {
        drawTrack();
        updateBalls();
        drawBalls();
    }, 50); // Atualizar a cada 50 ms
}

// Adicionar evento de clique ao botão de iniciar a corrida
document.getElementById('start-race').addEventListener('click', () => {
    const colorSelect = document.getElementById('color-select');
    const betAmountInput = document.getElementById('bet-amount');

    betColor = colorSelect.value;
    betAmount = parseFloat(betAmountInput.value);
    
    if (isNaN(betAmount) || betAmount <= 0) {
        alert('Por favor, insira um valor válido para a aposta.');
        return;
    }
    
    // Resetar estado dos cavalos antes de iniciar a corrida
    balls.forEach(ball => {
        ball.angle = 0;
        ball.laps = 0;
        ball.finished = false;
    });

    startRace();
});

// Desenhar a pista inicialmente
drawTrack();
