document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('register-modal');
    const closeModalButton = document.getElementById('close-modal');
    const registerForm = document.getElementById('register-form');

    // Função para abrir o modal
    function openModal() {
        modal.style.display = 'block';
    }

    // Função para fechar o modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Adiciona eventos ao botão de fechar
    closeModalButton.addEventListener('click', closeModal);

    // Fecha o modal se o usuário clicar fora do conteúdo
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Verifica se o modal já foi exibido usando localStorage
    if (!localStorage.getItem('modalShown')) {
        openModal();
        localStorage.setItem('modalShown', 'true');
    }

    // Manipula o envio do formulário
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        localStorage.setItem('username', username); // Armazena o nome do usuário
        closeModal();
    });
});
