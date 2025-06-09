
// Configuração do Supabase
// ATENÇÃO: Substitua 'SUA_URL_DO_PROJETO_SUPABASE' e 'SUA_CHAVE_ANON_PUBLICA'
// pelas informações que você salvou do painel do Supabase.
const SUPABASE_URL = https://umkqeyfuqxivjvhkxear.supabase.co;
const SUPABASE_ANON_KEY = m8w6omFXQYrO4t1x;
const supabase = Supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Abaixo deste código, você pode adicionar suas funcionalidades JavaScript existentes.

// ... o restante do seu código script.js (o document.addEventListener('DOMContentLoaded', function() { ... }) ...// Exemplo de script.js

// Este código garante que o JavaScript só será executado depois que toda a página HTML for carregada.document.addEventListener('DOMContentLoaded', function() {
    // --- NOVO: Funcionalidade do Menu Hambúrguer (Abre/Fecha) ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (hamburgerMenu && navbarCollapse) {
        hamburgerMenu.addEventListener('click', function() {
            navbarCollapse.classList.toggle('open'); // Alterna a classe 'open'
            // Opcional: Alternar ícone (hambúrguer para X)
            // hamburgerMenu.querySelector('i').classList.toggle('fa-bars');
            // hamburgerMenu.querySelector('i').classList.toggle('fa-times');
        });

        // Fechar o menu hambúrguer ao clicar em um link
        const navLinksInsideCollapse = navbarCollapse.querySelectorAll('.nav-links a');
        navLinksInsideCollapse.forEach(link => {
            link.addEventListener('click', function() {
                // Adiciona um pequeno atraso para que a navegação ocorra antes do menu fechar bruscamente
                setTimeout(() => {
                    if (navbarCollapse.classList.contains('open')) {
                        navbarCollapse.classList.remove('open');
                        // Se tiver a lógica de ícone, também reverteria aqui
                        // hamburgerMenu.querySelector('i').classList.add('fa-bars');
                        // hamburgerMenu.querySelector('i').classList.remove('fa-times');
                    }
                }, 100); // 100ms de atraso
            });
        });

        // Fechar o menu hambúrguer se clicar fora dele (apenas em mobile)
        document.addEventListener('click', function(event) {
            // Se o menu estiver aberto e o clique não for no hambúrguer nem dentro do menu
            if (navbarCollapse.classList.contains('open') &&
                !navbarCollapse.contains(event.target) &&
                !hamburgerMenu.contains(event.target)) {
                navbarCollapse.classList.remove('open');
                // Reverter ícone se aplicável
            }
        });
    }

    // --- ATENÇÃO: Lógica dos Dropdowns (Nossos Ebooks, Mais) ---
    // Esta lógica deve ser revisada para funcionar bem tanto em desktop (hover)
    // quanto em mobile (clique, dentro do menu colapsado).
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');

        if (dropdownLink && dropdownMenu) {
            // Lógica de clique para mobile e fallback para desktop
            dropdownLink.addEventListener('click', function(event) {
                // Previne a navegação imediata do link para dropdowns
                event.preventDefault();
                // Previne que o clique se propague para elementos pai (ex: fechar menu hambúrguer)
                event.stopPropagation();

                // Fecha outros dropdowns abertos NO MESMO CONTEXTO (desktop ou mobile)
                const parentUl = dropdown.closest('ul');
                if (parentUl) {
                    parentUl.querySelectorAll('.dropdown-menu.show').forEach(otherMenu => {
                        if (otherMenu !== dropdownMenu) {
                            otherMenu.classList.remove('show');
                        }
                    });
                }

                // Alterna a visibilidade do dropdown atual
                dropdownMenu.classList.toggle('show');
            });
        }
    });

    // Fechar dropdowns (não o menu hambúrguer) ao clicar fora
    document.addEventListener('click', function(event) {
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            // Garante que não está clicando no próprio link do dropdown
            if (!menu.closest('.dropdown').contains(event.target)) {
                menu.classList.remove('show');
            }
        });
    });

    // ... (resto do seu código JavaScript: signupBtn, cartIcon, buyButtons) ...
});
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