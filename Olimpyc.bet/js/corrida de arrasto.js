let balance = parseFloat(localStorage.getItem('balance')) || 100; // Recupera o saldo do armazenamento local ou usa 100 como padrão

document.addEventListener('DOMContentLoaded', () => {
    updateBalanceDisplay(); // Atualiza a exibição do saldo ao carregar a página
});

function placeBet() {
    const horseOdds = parseFloat(document.getElementById('horse').value);
    const betAmount = parseFloat(document.getElementById('amount').value);

    if (betAmount > balance) {
        alert('Saldo insuficiente!');
        return;
    }

    balance -= betAmount; // Subtrai o valor da aposta do saldo
    const result = Math.random() < 0.4; // Simula uma vitória ou perda aleatória (50% chance)

    if (result) {
        const winnings = betAmount * horseOdds;
        balance += winnings; // Adiciona os ganhos ao saldo
        alert('Você ganhou! Seu saldo aumentou.');
    } else {
        alert('Você perdeu. Tente novamente!');
    }

    localStorage.setItem('balance', balance); // Salva o saldo atualizado no armazenamento local
    updateBalanceDisplay(); // Atualiza a exibição do saldo
}

function updateBalanceDisplay() {
    document.getElementById('balance').textContent = `R$ ${balance.toFixed(2)}`;
}
