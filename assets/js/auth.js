/**
 * Auth Script
 * Gerencia Login, Cadastro, Logout e Agendamentos.
 */

// --- Funções Auxiliares ---
const getEl = (id) => document.getElementById(id);
const showError = (input, msg) => {
    const errDiv = input.nextElementSibling;
    errDiv.innerText = msg;
    errDiv.style.display = 'block';
    input.style.borderColor = 'var(--color-error)';
};
const clearError = (input) => {
    const errDiv = input.nextElementSibling;
    errDiv.style.display = 'none';
    input.style.borderColor = '#ddd';
};

// --- Cadastro ---
if (document.getElementById('form-cadastro')) {
    getEl('form-cadastro').addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = getEl('nome').value;
        const email = getEl('email').value;
        const pass = getEl('senha').value;
        let valid = true;

        if (pass.length < 6) {
            showError(getEl('senha'), 'A senha deve ter no mínimo 6 caracteres.');
            valid = false;
        } else {
            clearError(getEl('senha'));
        }

        if (valid) {
            // Simulação de criação de usuário
            const user = { nome, email, pass, agendamentos: [] };
            localStorage.setItem('psiUserDB_' + email, JSON.stringify(user));
            alert('Cadastro realizado com sucesso! Faça login para continuar.');
            window.location.href = 'login.html';
        }
    });
}

// --- Login ---
if (document.getElementById('form-login')) {
    getEl('form-login').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = getEl('email').value;
        const pass = getEl('senha').value;

        const userDB = JSON.parse(localStorage.getItem('psiUserDB_' + email));

        if (userDB && userDB.pass === pass) {
            // Cria sessão
            localStorage.setItem('psiUser', JSON.stringify(userDB));
            window.location.href = 'painel.html';
        } else {
            showError(getEl('email'), ''); // Visual
            showError(getEl('senha'), 'E-mail ou senha incorretos.');
        }
    });
}

// --- Logout ---
function logout() {
    localStorage.removeItem('psiUser');
    window.location.href = '../index.html';
}

// --- Painel Check ---
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('psiUser'));
    if (!user) {
        window.location.href = 'login.html';
        return null;
    }
    return user;
}

// --- Agendamento ---
if (document.getElementById('form-agendamento')) {
    const user = checkAuth();
    if(user) {
        getEl('form-agendamento').addEventListener('submit', (e) => {
            e.preventDefault();
            const data = getEl('data').value;
            const hora = getEl('hora').value;
            
            // Salva no "DB" e na Sessão
            user.agendamentos.push({ data, hora, status: 'Confirmado' });
            localStorage.setItem('psiUser', JSON.stringify(user));
            localStorage.setItem('psiUserDB_' + user.email, JSON.stringify(user));
            
            alert('Consulta agendada com sucesso!');
            window.location.href = 'painel.html';
        });
    }
}

// --- Renderizar Dashboard ---
if (document.getElementById('painel-nome')) {
    const user = checkAuth();
    if (user) {
        getEl('painel-nome').innerText = user.nome;
        const lista = getEl('lista-consultas');
        
        if (user.agendamentos.length === 0) {
            lista.innerHTML = '<p>Nenhuma consulta agendada.</p>';
        } else {
            lista.innerHTML = user.agendamentos.map(a => `
                <div class="card" style="margin-bottom:10px; border-left: 5px solid var(--color-success)">
                    <strong>Data:</strong> ${a.data} <br>
                    <strong>Horário:</strong> ${a.hora} <br>
                    <small class="badge">Status: ${a.status}</small>
                </div>
            `).join('');
        }
    }
}