// Configuração do Supabase (SUAS CREDENCIAIS!)
// ATENÇÃO: Substitua 'SUA_URL_DO_PROJETO_SUPABASE' e 'SUA_CHAVE_ANON_PUBLICA'
// pelas informações que você salvou do painel do Supabase.
const SUPABASE_URL = 'https://umkqeyfuqxivjvhkxear.supabase.co'; // <--- Adicionado aspas simples aqui
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVta3FleWZ1cXhpdmp2aGt4ZWFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NjQ3NTAsImV4cCI6MjA2NTA0MDc1MH0.P6_U-9xDr2ahTJKT1RjZjnyCEICWJIlPOkqQnzH_WO4'; // <--- Adicionado aspas simples aqui
const supabase = Supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', function() 
{
    // --- Funcionalidade do Menu Hambúrguer (Abre/Fecha) ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (hamburgerMenu && navbarCollapse) {
        hamburgerMenu.addEventListener('click', function() {
            navbarCollapse.classList.toggle('open');
            // Opcional: Alternar ícone (hambúrguer para X)
            const icon = hamburgerMenu.querySelector('i');
            if (icon) 
                {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Fechar o menu hambúrguer ao clicar em um link
        const navLinksInsideCollapse = navbarCollapse.querySelectorAll('.nav-links a');
        navLinksInsideCollapse.forEach(link => {
            link.addEventListener('click', function() {
                // Adiciona um pequeno atraso para que a navegação ocorra antes do menu fechar bruscamente
                setTimeout(() => {
                    if (navbarCollapse.classList.contains('open')) {
                        navbarCollapse.classList.remove('open');
                        const icon = hamburgerMenu.querySelector('i');
                        if (icon) {
                            icon.classList.add('fa-bars');
                            icon.classList.remove('fa-times');
                        }
                    }
                }, 100);
            });
        });

        // Fechar o menu hambúrguer se clicar fora dele
        document.addEventListener('click', function(event) {
            if (navbarCollapse.classList.contains('open') &&
                !navbarCollapse.contains(event.target) &&
                !hamburgerMenu.contains(event.target)) {
                navbarCollapse.classList.remove('open');
                const icon = hamburgerMenu.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }

    // --- Lógica dos Dropdowns (Nossos Ebooks, Mais) ---
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');

        if (dropdownLink && dropdownMenu) {
            dropdownLink.addEventListener('click', function(event) {
                event.preventDefault(); // Previne a navegação para # (ou outros links de dropdowns)
                event.stopPropagation(); // Impede que o clique se propague e feche outros elementos

                // Fecha outros dropdowns abertos no mesmo nível
                const parentUl = dropdown.closest('ul');
                if (parentUl) {
                    parentUl.querySelectorAll('.dropdown-menu.show').forEach(otherMenu => {
                        if (otherMenu !== dropdownMenu) {
                            otherMenu.classList.remove('show');
                        }
                    });
                }

                dropdownMenu.classList.toggle('show');
            });
        }
    });

    // Fechar dropdowns (não o menu hambúrguer) ao clicar fora
    document.addEventListener('click', function(event) {
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            // Garante que não está clicando no próprio link do dropdown ou em seu filho
            if (!menu.closest('.dropdown').contains(event.target)) {
                menu.classList.remove('show');
            }
        });
    });


    // --- Funcionalidade simples do Campo de Cadastro de Clientes (Newsletter na Navbar) ---
    const signupBtnNavbar = document.querySelector('.customer-signup .signup-btn');
    const signupEmailInputNavbar = document.querySelector('.customer-signup input[type="email"]');

    if (signupBtnNavbar && signupEmailInputNavbar) {
        signupBtnNavbar.addEventListener('click', async function() { // async para Supabase
            const email = signupEmailInputNavbar.value;
            if (email) {
                // Simulação de cadastro newsletter (frontend)
                alert('Email para newsletter: ' + email + ' - (Integracao Supabase viria aqui para newsletter)');
                // Exemplo REAL com Supabase para newsletter (apenas se for para a tabela de newsletter)
                // const { data, error } = await supabase.from('newsletter_subscribers').insert([{ email: email }]);
                // if (error) { console.error('Erro ao assinar newsletter:', error.message); alert('Erro ao assinar!'); }
                // else { alert('Assinatura da newsletter realizada com sucesso!'); signupEmailInputNavbar.value = ''; }
                signupEmailInputNavbar.value = ''; // Limpa o campo
            } else {
                alert('Por favor, digite seu email para a newsletter.');
            }
        });
    }

    // --- Funcionalidade simples do Carrinho de Compras ---
    const cartIcon = document.querySelector('.cart-icon');
    const cartCount = document.querySelector('.cart-count');
    let itemCount = 0;

    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            itemCount++;
            cartCount.textContent = itemCount;
            alert('Item adicionado ao carrinho! Total: ' + itemCount + ' itens.');
        });
    });

    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            alert('Você tem ' + itemCount + ' itens no seu carrinho. (Funcionalidade de checkout viria aqui)');
        });
    }

    // --- SUPABASE: Funções de Cadastro e Login (Para login.html e cadastro.html) ---

    // Função para mostrar mensagem de status (sucesso/erro)
    function showMessage(elementId, message, isSuccess) {
        const messageElement = document.getElementById(elementId);
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.className = 'message ' + (isSuccess ? 'success' : 'error');
            messageElement.style.display = 'block';
            setTimeout(() => {
                messageElement.style.display = 'none';
            }, 5000); // Esconde a mensagem após 5 segundos
        }
    }

    // Lógica para a página de Cadastro (cadastro.html)
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Previne o envio padrão do formulário

            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
            const signupMessageElement = 'signup-message';

            if (password.length < 6) {
                showMessage(signupMessageElement, 'A senha deve ter no mínimo 6 caracteres.', false);
                return;
            }
            if (password !== confirmPassword) {
                showMessage(signupMessageElement, 'As senhas não coincidem.', false);
                return;
            }

            // Realiza o cadastro com Supabase
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            });

            if (error) {
                showMessage(signupMessageElement, 'Erro ao cadastrar: ' + error.message, false);
            } else {
                showMessage(signupMessageElement, 'Cadastro realizado! Verifique seu e-mail para confirmar a conta.', true);
                // Limpa os campos
                signupForm.reset();
            }
        });
    }

    // Lógica para a página de Login (login.html)
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Previne o envio padrão do formulário

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const loginMessageElement = 'login-message';

            // Realiza o login com Supabase
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                showMessage(loginMessageElement, 'Erro ao fazer login: ' + error.message, false);
            } else {
                showMessage(loginMessageElement, 'Login bem-sucedido! Redirecionando...', true);
                // Opcional: Redirecionar o usuário para uma página após o login
                // window.location.href = 'pagina-de-boas-vindas.html';
                console.log('Usuário logado:', data.user);
            }
        });
    }

    // Opcional: Verificar o estado de autenticação ao carregar a página
    // async function checkAuth() {
    //     const { data: { user } } = await supabase.auth.getUser();
    //     if (user) {
    //         console.log('Usuário logado:', user);
    //         // Atualizar UI para mostrar que o usuário está logado
    //     } else {
    //         console.log('Nenhum usuário logado.');
    //     }
    // }
    // checkAuth(); // Chamar ao carregar a página
});