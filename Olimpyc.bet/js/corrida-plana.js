// Inicializa o saldo com o valor armazenado ou 100 se não houver valor armazenado
let balance = parseFloat(localStorage.getItem('balance')) || 0;

// Atualiza a exibição do saldo ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    updateBalanceDisplay();
});

function placeBet() {
    const betValue = parseFloat(document.getElementById('bet-value').value);
    const betMessageElement = document.getElementById('bet-message');

    if (isNaN(betValue) || betValue <= 0) {
        betMessageElement.textContent = 'Valor da aposta inválido.';
        betMessageElement.style.color = 'red';
        return;
    }

    if (betValue > balance) {
        betMessageElement.textContent = 'Saldo insuficiente para realizar esta aposta.';
        betMessageElement.style.color = 'red';
        return;
    }

    balance -= betValue; // Subtrai o valor da aposta do saldo
    const result = Math.random() < 0.5; // Simula uma vitória ou perda aleatória (50% chance)

    if (result) {
        // Supondo que o usuário ganhe 2 vezes o valor da aposta
        const winnings = betValue * 2;
        balance += winnings; // Adiciona os ganhos ao saldo
        betMessageElement.textContent = 'Você ganhou! Seu saldo aumentou.';
        betMessageElement.style.color = 'green';
    } else {
        betMessageElement.textContent = 'Você perdeu. Tente novamente!';
        betMessageElement.style.color = 'red';
    }

    // Salva o saldo atualizado no armazenamento local
    localStorage.setItem('balance', balance);
    updateBalanceDisplay(); // Atualiza a exibição do saldo
}

function updateBalanceDisplay() {
    // Atualiza o saldo na exibição
    document.getElementById('balance').textContent = `R$ ${balance.toFixed(2)}`;
}

function startRace() {
    const horses = document.querySelectorAll('.horse');
    const finishLine = document.querySelector('.finish-line');
    const resultElement = document.getElementById('race-result');

    let winner = null;
    const speeds = [Math.random() * 10 + 5, Math.random() * 10 + 5, Math.random() * 10 + 5, Math.random() * 10 + 5];
    let raceInterval = setInterval(() => {
        horses.forEach((horse, index) => {
            const newLeft = (parseFloat(horse.style.left) || 0) + speeds[index];
            if (newLeft >= finishLine.offsetLeft - horse.offsetWidth) {
                clearInterval(raceInterval);
                winner = index + 1;
                horse.style.left = `${finishLine.offsetLeft - horse.offsetWidth}px`;
                resultElement.textContent = `Cavalo ${winner} ganhou a corrida!`;
            } else {
                horse.style.left = `${newLeft}px`;
            }
        });
    }, 50);
}
