// script.js

// Configuração do Supabase (SUAS NOVAS CREDENCIAIS!)
// Cole a NOVA Project URL que você copiou do painel do Supabase.
const SUPABASE_URL = 'https://dkdkkfjhelucgovvobln.supabase.co'; 
// Cole a NOVA chave 'anon public' que você copiou do painel do Supabase.
// Lembre-se, para o navegador, ela precisa ser uma string.
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrZGtrZmpoZWx1Y2dvdnZvYmxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NTM0MDQsImV4cCI6MjA2NTIyOTQwNH0.KOF2qE_bGbbAPvH4pNtWGvcy0X1YbVybrPI5bh6cCyA'; 

// Inicialização do Supabase: Mantenha esta linha exatamente como está.
// Ela usa o objeto global 'Supabase' (com 'S' maiúsculo) criado pela tag <script> do CDN.
const supabase = Supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


document.addEventListener('DOMContentLoaded', function() {

    // --- Funcionalidade do Menu Hambúrguer (Abre/Fecha) ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (hamburgerMenu && navbarCollapse) {
        hamburgerMenu.addEventListener('click', function() {
            navbarCollapse.classList.toggle('open');
            const icon = hamburgerMenu.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Fechar o menu hambúrguer ao clicar em um link
        const navLinksInsideCollapse = navbarCollapse.querySelectorAll('.nav-links a');
        navLinksInsideCollapse.forEach(link => {
            link.addEventListener('click', function() {
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
                event.preventDefault();
                event.stopPropagation();

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
            if (!menu.closest('.dropdown').contains(event.target)) {
                menu.classList.remove('show');
            }
        });
    });


    // --- Funcionalidade simples do Campo de Cadastro de Clientes (Newsletter na Navbar) ---
    const signupBtnNavbar = document.querySelector('.customer-signup .signup-btn');
    const signupEmailInputNavbar = document.querySelector('.customer-signup input[type="email"]');

    if (signupBtnNavbar && signupEmailInputNavbar) {
        signupBtnNavbar.addEventListener('click', async function() {
            const email = signupEmailInputNavbar.value;
            if (email) {
                alert('Email para newsletter: ' + email + ' - (Integracao Supabase viria aqui para newsletter)');
                signupEmailInputNavbar.value = '';
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

    function showMessage(elementId, message, isSuccess) {
        const messageElement = document.getElementById(elementId);
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.className = 'message ' + (isSuccess ? 'success' : 'error');
            messageElement.style.display = 'block';
            setTimeout(() => {
                messageElement.style.display = 'none';
            }, 5000);
        }
    }

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async function(event) {
            event.preventDefault();

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

            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            });

            if (error) {
                showMessage(signupMessageElement, 'Erro ao cadastrar: ' + error.message, false);
            } else {
                showMessage(signupMessageElement, 'Cadastro realizado! Verifique seu e-mail para confirmar a conta.', true);
                signupForm.reset();
            }
        });
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const loginMessageElement = 'login-message';

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                showMessage(loginMessageElement, 'Erro ao fazer login: ' + error.message, false);
            } else {
                showMessage(loginMessageElement, 'Login bem-sucedido! Redirecionando...', true);
                console.log('Usuário logado:', data.user);
            }
        });
    }
});