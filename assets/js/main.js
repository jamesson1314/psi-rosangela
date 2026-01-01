/**
 * Main Script - Psi Rosângela
 * Responsável pela estrutura global, menu e animações.
 */

document.addEventListener('DOMContentLoaded', () => {
    initLayout();
    initAnimations();
});

// --- Injeção de Layout (Header/Footer) ---
function initLayout() {
    // Detecta se está na raiz ou em subpasta para ajustar caminhos
    const isRoot = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
    const pathPrefix = isRoot ? 'pages/' : '';
    const homeLink = isRoot ? 'index.html' : '../index.html';
    const assetPrefix = isRoot ? 'assets/' : '../assets/';

    // Verifica Login
    const user = JSON.parse(localStorage.getItem('psiUser'));
    
    // HTML do Header
    const headerHTML = `
        <div class="dev-banner">⚠️ PROJETO FICTÍCIO PARA FINS DE PORTFÓLIO - NENHUM SERVIÇO REAL</div>
        <div class="container nav-flex">
            <a href="${homeLink}" class="logo">
                <span style="color:var(--color-primary)">Ψ</span> Psi Rosângela
            </a>
            <button class="mobile-toggle" aria-label="Abrir Menu">☰</button>
            <ul class="nav-links">
                <li><a href="${homeLink}">Home</a></li>
                <li><a href="${isRoot ? 'pages/' : ''}sobre.html">Sobre</a></li>
                <li><a href="${isRoot ? 'pages/' : ''}servicos.html">Serviços</a></li>
                <li><a href="${isRoot ? 'pages/' : ''}equipe.html">Equipe</a></li>
                ${user ? 
                    `<li><a href="${isRoot ? 'pages/' : ''}painel.html" style="color:var(--color-primary); font-weight:bold">Meu Painel</a></li>` :
                    `<li><a href="${isRoot ? 'pages/' : ''}login.html" class="btn btn-outline" style="padding: 5px 15px;">Entrar</a></li>`
                }
            </ul>
        </div>
    `;

    // HTML do Footer
    const footerHTML = `
        <div class="container" style="padding: 2rem 0; text-align: center;">
            <p>© ${new Date().getFullYear()} Psi Rosângela. Todos os direitos reservados.</p>
            <p style="font-size: 0.9rem; margin-top: 10px;">
                <a href="${isRoot ? 'pages/' : ''}privacidade.html">Política de Privacidade</a> | 
                <a href="${isRoot ? 'pages/' : ''}contato.html">Contato</a>
            </p>
        </div>
    `;

    document.querySelector('header').innerHTML = headerHTML;
    document.querySelector('footer').innerHTML = footerHTML;

    // Mobile Menu Logic
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav-links');
    
    if(toggle) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            toggle.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
        });
    }
}

// --- Scroll Animations ---
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, h2, p').forEach(el => {
        el.style.opacity = '0'; // Initial state
        observer.observe(el);
    });
}