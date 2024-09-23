document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o saldo com o valor armazenado ou 0 se não houver valor armazenado
    let balance = parseFloat(localStorage.getItem('balance')) || 0;

    // Atualiza a exibição do saldo ao carregar a página
    updateBalanceDisplay();

    // Adiciona evento aos botões de depósito
    const depositButtons = document.querySelectorAll('.deposit-button');
    depositButtons.forEach(button => {
        button.addEventListener('click', () => {
            const amount = parseFloat(button.getAttribute('data-amount'));
            deposit(amount);
        });
    });

    // Adiciona evento ao formulário de saque
    const saqueForm = document.getElementById('saque-form');
    const mensagem = document.getElementById('mensagem');

    saqueForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const valor = parseFloat(document.getElementById('valor').value);

        if (valor && valor > 0) {
            if (valor <= balance) {
                balance -= valor;
                localStorage.setItem('balance', balance);
                updateBalanceDisplay();
                mensagem.textContent = `Solicitação de saque de R$ ${valor.toFixed(2)} foi realizada com sucesso!`;
            } else {
                mensagem.textContent = 'Saldo insuficiente para realizar o saque.';
            }
        } else {
            mensagem.textContent = 'Por favor, insira um valor válido.';
        }

        mensagem.classList.remove('hidden');
    });

    // Atualiza o nome de usuário na página de perfil
    const userNameElement = document.getElementById('user-name');
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
        userNameElement.textContent = storedUserName;
    }
});

function deposit(amount) {
    let balance = parseFloat(localStorage.getItem('balance')) || 0;
    balance += amount;
    localStorage.setItem('balance', balance);
    updateBalanceDisplay();
}

function updateBalanceDisplay() {
    document.getElementById('balance-display').textContent = `Saldo: R$ ${parseFloat(localStorage.getItem('balance')).toFixed(2)}`;
}
