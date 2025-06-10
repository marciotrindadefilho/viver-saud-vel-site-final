const { createClient } = require('@supabase/supabase-js');
const assert = require('assert');

const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

async function cadastrarUsuario(email, senha) {
    const { data, error } = await supabase.auth.signUp({ email, password: senha });
    return { data, error };
}

test('cadastro de usuário', async () => {
    const email = 'teste@example.com';
    const senha = 'senha123';
    const { data, error } = await cadastrarUsuario(email, senha);
    
    assert.strictEqual(error, null);
    assert.strictEqual(data.user.email, email);
});