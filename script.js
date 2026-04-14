document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DO CONTADOR ---
    const counterElement = document.getElementById('view-counter');
    let count = 1405;

    setInterval(() => {
        const incremento = Math.floor(Math.random() * 5) + 1;
        count += incremento;
        if(counterElement) {
            counterElement.textContent = count;
            counterElement.style.color = '#fff'; 
            setTimeout(() => {
                counterElement.style.color = 'var(--primary-orange)';
            }, 200);
        }
    }, 4000);

    // --- LÓGICA DAS ABAS ---
    window.openMedia = function(type) {
        document.querySelectorAll('.media-content').forEach(c => c.classList.remove('active-content'));
        document.querySelectorAll('.media-content').forEach(c => c.style.display = 'none'); // Segurança extra
        
        const selected = document.getElementById('content-' + type);
        if(selected) {
            selected.style.display = 'block';
            setTimeout(() => selected.classList.add('active-content'), 10);
        }
    }

    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // --- LÓGICA DA SIDEBAR ---
    window.updatePlayer = function(element) {
        const display = document.getElementById('sidebar-display');
        const content = element.getAttribute('data-embed');
        
        if (content) display.innerHTML = content;
        else display.innerHTML = '<p style="color:#fff; text-align:center;">Conteúdo indisponível</p>';

        document.querySelectorAll('.grid-square').forEach(sq => sq.classList.remove('active-item'));
        element.classList.add('active-item');
    }

    // --- INICIALIZAÇÃO DO CALENDÁRIO ---
    // Atrasamos um pouquinho (100ms) para garantir que o arquivo eventos.js carregou
    setTimeout(() => {
        renderizarCalendario(mesAtual, anoAtual);
    }, 100);

    console.log("Publigibi System Online - Versão Modular");
});

/* ============================================================
   LÓGICA DO CALENDÁRIO (SEM OS DADOS, SÓ O MOTOR)
   ============================================================ */

// Configurações Iniciais
let anoAtual = 2026;
let mesAtual = 0; // 0 = Janeiro
const nomesMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

function renderizarCalendario(mes, ano) {
    const grid = document.getElementById('calendar-days');
    const titulo = document.getElementById('mes-ano-titulo');
    const displayEventos = document.getElementById('event-list-display');
    
    if(!grid || !titulo) return;

    grid.innerHTML = "";
    displayEventos.innerHTML = '<p style="font-size: 0.8rem; color: #888;">Selecione um dia destacado.</p>';
    titulo.innerText = `${nomesMeses[mes]} ${ano}`;

    const primeiroDiaDaSemana = new Date(ano, mes, 1).getDay();
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();

    for (let i = 0; i < primeiroDiaDaSemana; i++) {
        const vazio = document.createElement('div');
        vazio.classList.add('cal-day', 'empty');
        grid.appendChild(vazio);
    }

    for (let dia = 1; dia <= diasNoMes; dia++) {
        const elDia = document.createElement('div');
        elDia.classList.add('cal-day');
        elDia.innerText = dia;

        const chaveData = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        
        // AQUI ESTÁ O SEGREDO: Ele busca a variável bancoDeEventos que está no OUTRO arquivo
        if (typeof bancoDeEventos !== 'undefined' && bancoDeEventos[chaveData]) {
            elDia.classList.add('has-event');
            elDia.title = bancoDeEventos[chaveData];
            elDia.onclick = function() {
                displayEventos.innerHTML = `<strong style="color: #FFA500;">${dia}/${mes + 1}/${ano}:</strong><br>${bancoDeEventos[chaveData]}`;
            };
        }

        grid.appendChild(elDia);
    }
}

window.mudarMes = function(direcao) {
    mesAtual += direcao;
    if (mesAtual < 0) { mesAtual = 11; anoAtual--; } 
    else if (mesAtual > 11) { mesAtual = 0; anoAtual++; }
    renderizarCalendario(mesAtual, anoAtual);
};