// Exemplo de script.js

// Este código garante que o JavaScript só será executado depois que toda a página HTML for carregada.
document.addEventListener('DOMContentLoaded', function() {

    // --- Funcionalidade do Dropdown (Menu cascata de "Nossos Ebooks") ---
    // Este código faz com que o menu "Nossos Ebooks" apareça e desapareça ao CLICAR nele.
    // Se você preferir que ele funcione apenas ao passar o mouse (que já está no CSS),
    // você pode remover ou comentar este bloco de código JS.
    const dropdown = document.querySelector('.dropdown'); // Seleciona o item do menu que tem o dropdown
    const dropdownMenu = document.querySelector('.dropdown-menu'); // Seleciona o menu que aparece (a sublista)

    // Verifica se os elementos do dropdown existem na página antes de tentar manipulá-los
    if (dropdown && dropdownMenu) {
        // Adiciona um "ouvinte de evento" (event listener) para o clique no item do menu
        dropdown.addEventListener('click', function(event) {
            // event.stopPropagation() impede que o clique se propague para outros elementos da página,
            // o que poderia fechar o dropdown imediatamente.
            event.stopPropagation();
            // Adiciona ou remove a classe 'show' no dropdown-menu.
            // A classe 'show' no CSS fará o menu aparecer ou desaparecer.
            dropdownMenu.classList.toggle('show');
        });

        // Adiciona um ouvinte de evento para cliques em qualquer lugar do documento (na página).
        // Isso faz com que o dropdown se feche se o usuário clicar fora dele.
        document.addEventListener('click', function() {
            if (dropdownMenu.classList.contains('show')) { // Verifica se o menu está visível
                dropdownMenu.classList.remove('show'); // Remove a classe 'show' para escondê-lo
            }
        });
    }

    // --- Funcionalidade simples do Campo de Cadastro de Clientes ---
    // Este código lida com o que acontece quando o botão "Cadastrar" é clicado.
    const signupBtn = document.querySelector('.signup-btn'); // Seleciona o botão "Cadastrar"
    const signupEmailInput = document.querySelector('.customer-signup input[type="email"]'); // Seleciona o campo de email

    // Verifica se o botão e o campo de email existem
    if (signupBtn && signupEmailInput) {
        // Adiciona um ouvinte de evento para o clique no botão "Cadastrar"
        signupBtn.addEventListener('click', function() {
            const email = signupEmailInput.value; // Pega o valor (o email digitado) do campo

            if (email) { // Se o campo de email não estiver vazio
                // Mostra uma mensagem de alerta com o email digitado.
                // IMPORTANTE: Para realmente salvar o email, você precisaria de um backend (código no servidor).
                alert('Email para cadastro: ' + email + ' - Funcionalidade de backend necessária para salvar o email.');
                signupEmailInput.value = ''; // Limpa o campo de email após o "cadastro"
            } else {
                alert('Por favor, digite seu email para cadastro.'); // Se o campo estiver vazio
            }
        });
    }

    // --- Funcionalidade simples do Carrinho de Compras ---
    // Este código simula a adição de itens ao carrinho e exibe a contagem.
    const cartIcon = document.querySelector('.cart-icon'); // Seleciona o ícone do carrinho
    const cartCount = document.querySelector('.cart-count'); // Seleciona o contador de itens no carrinho
    let itemCount = 0; // Variável para armazenar a contagem de itens, começa em zero

    // Seleciona TODOS os botões "Comprar" dos ebooks
    const buyButtons = document.querySelectorAll('.buy-btn');

    // Percorre cada botão "Comprar" encontrado
    buyButtons.forEach(button => {
        // Adiciona um ouvinte de evento para o clique em cada botão "Comprar"
        button.addEventListener('click', function() {
            itemCount++; // Aumenta a contagem de itens em 1
            cartCount.textContent = itemCount; // Atualiza o texto do contador no ícone do carrinho
            alert('Item adicionado ao carrinho! Total: ' + itemCount + ' itens.');
        });
    });

    // Adiciona um ouvinte de evento para o clique no ícone do carrinho
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            // Mostra uma mensagem com o número atual de itens no carrinho.
            // IMPORTANTE: Uma funcionalidade real de carrinho exigiria mais lógica (lista de itens, preços, checkout).
            alert('Você tem ' + itemCount + ' itens no seu carrinho. (Funcionalidade de checkout viria aqui)');
        });
    }
});