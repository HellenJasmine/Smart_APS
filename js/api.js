// Seletores de elementos do DOM
const modalVacina = document.querySelector('.modal-container');
const modalPesquisarCrianca = document.querySelector('.modal-pesquisarCrianca');
const modalAdicionarOutra = document.querySelector('#modalAdicionarOutra'); // Novo modal

const sVacinaNome = document.querySelector('#vacinaNome');
const sAplicador = document.querySelector('#aplicador');
const sLote = document.querySelector('#lote');
const sDataAplicacao = document.querySelector('#dataAplicacao');
const sEstrategia = document.querySelector('#estrategia');
const vacinaForm = document.querySelector('#vacinaForm');
const filterSelect = document.querySelector('#filterSelect');

const btnAdicionarOutraVacina = document.querySelector('#btnAdicionarOutraVacina'); // Novo botão
const outraVacinaForm = document.querySelector('#outraVacinaForm'); // Novo formulário

const nomeCriancaElement = document.querySelector('#nomeCrianca');
const idadeCriancaElement = document.querySelector('#idadeCrianca');
const cpfCriancaElement = document.querySelector('#cpfCrianca');
const cnsCriancaElement = document.querySelector('#cnsCrianca');

let vacinaSelecionada = null;
let criancaSelecionada = null;

// --- BANCOS DE DADOS DE VACINAS ---

const vacinasRotina = {
    "Ao nascer": [
        { nome: 'BCG', dose: 'Dose única', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
        { nome: 'Hepatite B', dose: '1º DOSE', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' }
    ],
    "2 meses": [
        { nome: 'Pentavalente', dose: '1º DOSE', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
        { nome: 'VIP', dose: '1º DOSE', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
        { nome: 'Pneumocócia 10V', dose: '1º DOSE', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
        { nome: 'Rotavíris', dose: '1º DOSE', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' }
    ],
    "3 meses": [
        { nome: 'Meningo C', dose: '1º DOSE', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' }
    ],
    "4 meses": [
        { nome: 'Pentavalente', dose: '2º DOSE', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
        { nome: 'VIP', dose: '2º DOSE', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
        { nome: 'Pneumocócia 10V', dose: '2º DOSE', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
        { nome: 'Rotavíris', dose: '2º DOSE', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' }
    ],
    "5 meses": [
        { nome: 'Meningo C', dose: '2º DOSE', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' }
    ],
    "6 meses": [
        { nome: 'Pentavalente', dose: '3º DOSE', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
        { nome: 'VIP', dose: '3º DOSE', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
    ],
     "9 meses": [
        { nome: 'Febre Amarela', dose: 'DOSE ÚNICA', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' }
    ],
    "12 meses": [
        { nome: 'Pneumocócica 10V', dose: 'REFORÇO', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
        { nome: 'Meningo C', dose: 'REFORÇO', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
        { nome: 'Tríplice viral', dose: '1º DOSE', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' }
    ],
     "15 meses": [
        { nome: 'DTP', dose: '1º REFORÇO', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
        { nome: 'VIP', dose: 'REFORÇO', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
        { nome: 'Hepatite A', dose: '1º DOSE', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
        { nome: 'Tetraviral', dose: '1º DOSE', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
        { nome: 'Varicela', dose: '1º DOSE', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' }

    ],
    "4 anos": [
        { nome: 'DTP', dose: '2º REFORÇO', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
        { nome: 'Varicela', dose: '2º DOSE', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' }

    ]
};

const vacinasCampanha = {
  "Campanha Nacional": [
    { nome: "Influenza (Gripe)", dose: "ANUAL", aplicador: "", lote: "", dataAplicacao: "", status: "naoTomadas" },
    { nome: "Covid-19 Campanha", dose: "DOSE EXTRA", aplicador: "", lote: "", dataAplicacao: "", status: "naoTomadas" },
    { nome: "Poliomielite Campanha", dose: "GOTINHA", aplicador: "", lote: "", dataAplicacao: "", status: "naoTomadas" }
  ],
  "Campanha Sazonal": [
    { nome: "Febre Amarela Campanha", dose: "DOSE ÚNICA", aplicador: "", lote: "", dataAplicacao: "", status: "naoTomadas" },
    { nome: "Meningite Campanha", dose: "DOSE EXTRA", aplicador: "", lote: "", dataAplicacao: "", status: "naoTomadas" }
  ],
  "Campanha Especial": [
    { nome: "HPV Campanha", dose: "DOSE EXTRA", aplicador: "", lote: "", dataAplicacao: "", status: "naoTomadas" },
    { nome: "Hepatite A Campanha", dose: "DOSE EXTRA", aplicador: "", lote: "", dataAplicacao: "", status: "naoTomadas" }
  ]
};

let outrasVacinas = [];

let container = document.getElementById('vacinas-container');

// --- FUNÇÕES DE RENDERIZAÇÃO ---

function renderVacinas(filter) {
    container.innerHTML = '';
    btnAdicionarOutraVacina.style.display = 'none';

    if (filter === 'rotina') {
        renderGroups(vacinasRotina);
    } else if (filter === 'campanha') {
        renderGroups(vacinasCampanha);
    } else if (filter === 'outros') {
        if (outrasVacinas.length > 0) {
            renderGroups({ "Outras Vacinas Aplicadas": outrasVacinas });
        }
        btnAdicionarOutraVacina.style.display = 'block';
    }
    atualizarCoresVacinas(); // Atualiza as cores sempre que o filtro muda
}

function renderGroups(groups) {
    Object.keys(groups).forEach(groupName => {
        let titulo = document.createElement('div');
        titulo.className = 'vacina-titulo';
        titulo.textContent = groupName;
        container.appendChild(titulo);
        
        groups[groupName].forEach(vacina => {
            let row = document.createElement('div');
            row.className = 'vacina-row';
            
            let nome = document.createElement('div');
            nome.className = 'vacina-nome';
            nome.textContent = vacina.nome;

            let doseInfo = document.createElement('div');
            doseInfo.className = 'dose-info';
            
            let doseText = document.createElement('div');
            doseText.className = 'dose-text';
            doseText.textContent = vacina.dose;

            let dataText = document.createElement('div');
            dataText.className = 'data-text';
            dataText.textContent = vacina.dataAplicacao || '';

            doseInfo.appendChild(doseText);
            doseInfo.appendChild(dataText);
            
            row.appendChild(nome);
            row.appendChild(doseInfo);
            container.appendChild(row);

            vacina.row = row;

            const openModalHandler = () => abrirModalVacina(vacina, row, doseInfo);
            nome.addEventListener('click', openModalHandler);
            doseInfo.addEventListener('click', openModalHandler);

            if (vacina.dataAplicacao) {
                row.classList.add('vacina-aplicada');
            }
        });
    });
}

// --- LÓGICA DOS MODAIS ---

function abrirModalVacina(vacina, row, doseInfo) {
    vacinaSelecionada = vacina;
    vacinaSelecionada.row = row;
    vacinaSelecionada.doseInfo = doseInfo;
    sVacinaNome.value = vacina.nome;
    sAplicador.value = vacina.aplicador;
    sLote.value = vacina.lote;
    sDataAplicacao.value = vacina.dataAplicacao;
    sEstrategia.value = vacina.estrategia || 'rotina';
    modalVacina.classList.add('active');
}

// Event listener para fechar modais
document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', () => {
        modalVacina.classList.remove('active');
        modalAdicionarOutra.classList.remove('active');
    });
});

btnAdicionarOutraVacina.addEventListener('click', () => {
    outraVacinaForm.reset();
    modalAdicionarOutra.classList.add('active');
});

// --- SUBMISSÃO DOS FORMULÁRIOS ---

vacinaForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!vacinaSelecionada || !criancaSelecionada) {
        alert("Selecione uma criança e uma vacina antes de salvar.");
        return;
    }

    vacinaSelecionada.aplicador = sAplicador.value.trim();
    vacinaSelecionada.lote = sLote.value.trim();
    vacinaSelecionada.dataAplicacao = sDataAplicacao.value.trim();
    vacinaSelecionada.estrategia = sEstrategia.value;

    const doseInfo = vacinaSelecionada.row.querySelector('.dose-info');
    if(!doseInfo) return;

    let dataAplicacaoText = doseInfo.querySelector('.data-text');

    if (vacinaSelecionada.dataAplicacao) {
        vacinaSelecionada.status = 'tomada';
        dataAplicacaoText.textContent = `Data: ${vacinaSelecionada.dataAplicacao}`;
    } else {
        vacinaSelecionada.status = 'naoTomadas';
        dataAplicacaoText.textContent = '';
    }

    // Salvar no localStorage
    let criancas = carregarCriancas();
    let indexCrianca = criancas.findIndex(c => c.nome === criancaSelecionada.nome);
    if (indexCrianca !== -1) {
        if (!criancas[indexCrianca].vacinas) criancas[indexCrianca].vacinas = {};
        // Aqui você pode decidir como salvar as diferentes categorias de vacinas
        criancas[indexCrianca].vacinas.rotina = vacinasRotina;
        criancas[indexCrianca].vacinas.campanha = vacinasCampanha;
        criancas[indexCrianca].vacinas.outros = outrasVacinas;
        localStorage.setItem('dbcriancas', JSON.stringify(criancas));
    }

    alert("Vacina salva com sucesso!");
    modalVacina.classList.remove('active');
    atualizarCoresVacinas();
});

outraVacinaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const novaVacina = {
        nome: document.getElementById('outraVacinaNome').value,
        dose: document.getElementById('outraVacinaDose').value,
        aplicador: document.getElementById('outraAplicador').value,
        lote: document.getElementById('outraLote').value,
        dataAplicacao: document.getElementById('outraDataAplicacao').value,
        status: 'tomada' // Assume-se que foi aplicada ao ser adicionada
    };
    outrasVacinas.push(novaVacina);
    renderVacinas('outros');
    modalAdicionarOutra.classList.remove('active');
});


// --- LÓGICA DA CRIANÇA E ATUALIZAÇÃO DE CORES (Seu código original adaptado) ---

function carregarCriancas() {
    return JSON.parse(localStorage.getItem('dbcriancas')) ?? [];
}

document.querySelector('#crianca').addEventListener('submit', (event) => {
    event.preventDefault();
    const tipoPesquisa = document.querySelector('input[name="tipoPesquisa"]:checked').value;
    const valorPesquisa = document.querySelector('#campoPesquisa').value.trim();
    const resultado = pesquisarCrianca(tipoPesquisa, valorPesquisa);
    if (resultado.length > 0) {
        exibirResultadoCrianca(resultado[0]);
    } else {
        alert("Nenhuma criança encontrada.");
    }
});

function pesquisarCrianca(tipoPesquisa, valorPesquisa) {
    const criancas = carregarCriancas();
    return criancas.filter(crianca =>
        crianca[tipoPesquisa]?.toLowerCase().trim() === valorPesquisa.toLowerCase().trim()
    );
}

function exibirResultadoCrianca(crianca) {
    criancaSelecionada = crianca;
    nomeCriancaElement.textContent = crianca.nome;
    let idade = mostrarIdadePorExtenso(crianca.dataNascimento);
    idadeCriancaElement.textContent = `Idade: ${idade.anos} anos, ${idade.meses} meses e ${idade.dias} dias`;
    cpfCriancaElement.textContent = `CPF: ${crianca.cpf}`;
    cnsCriancaElement.textContent = `CNS: ${crianca.cns}`;
    modalPesquisarCrianca.classList.remove('active');
    localStorage.setItem('criancaSelecionada', JSON.stringify(crianca));
    
    // Carregar dados de vacinas da criança, se existirem
    if (crianca.vacinas) {
        Object.assign(vacinasRotina, crianca.vacinas.rotina || {});
        Object.assign(vacinasCampanha, crianca.vacinas.campanha || {});
        outrasVacinas = crianca.vacinas.outros || [];
    }
    
    renderVacinas(filterSelect.value);
}

function mostrarIdadePorExtenso(dataNascimento) {
    let hoje = new Date();
    let nascimento = new Date(dataNascimento);
    let anos = hoje.getFullYear() - nascimento.getFullYear();
    let meses = hoje.getMonth() - nascimento.getMonth();
    let dias = hoje.getDate() - nascimento.getDate();

    if (dias < 0) {
        meses--;
        dias += new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
    }
    if (meses < 0) {
        anos--;
        meses += 12;
    }
    return { anos, meses, dias };
}

function calcularIdadeEmMeses(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let meses = (hoje.getFullYear() - nascimento.getFullYear()) * 12;
    meses -= nascimento.getMonth();
    meses += hoje.getMonth();
    return meses <= 0 ? 0 : meses;
}

function atualizarCoresVacinas() {
    if (!criancaSelecionada || !criancaSelecionada.dataNascimento) return;

    const idadeCriancaEmMeses = calcularIdadeEmMeses(criancaSelecionada.dataNascimento);

    const todosGruposDeVacinas = [vacinasRotina, vacinasCampanha, { "outros": outrasVacinas }];

    todosGruposDeVacinas.forEach(grupo => {
        Object.keys(grupo).forEach(idadeVacina => {
            let idadeRecomendadaMeses = converterIdadeParaMeses(idadeVacina);
            
            grupo[idadeVacina].forEach(vacina => {
                if (!vacina.row) return;

                const doseInfo = vacina.row.querySelector('.dose-info');
                if (!doseInfo) return;

                doseInfo.classList.remove('vacina-aplicada', 'vacina-atrasada', 'vacina-pendente');

                if (vacina.status === 'tomada') {
                    doseInfo.classList.add('vacina-aplicada');
                } else if (idadeCriancaEmMeses >= idadeRecomendadaMeses) {
                    doseInfo.classList.add('vacina-atrasada');
                } else {
                    doseInfo.classList.add('vacina-pendente');
                }
            });
        });
    });
}

function converterIdadeParaMeses(idade) {
    if (idade.toLowerCase().includes("ao nascer")) return 0;
    if (idade.toLowerCase().includes("ano")) return parseInt(idade) * 12;
    if (idade.toLowerCase().includes("mese")) return parseInt(idade);
    return 999; // Para grupos como "Campanha Nacional", não se aplica a lógica de idade
}


// --- INICIALIZAÇÃO ---
filterSelect.addEventListener('change', () => renderVacinas(filterSelect.value));

window.onload = function() {
    modalPesquisarCrianca.classList.add('active');
    // A renderização inicial agora acontece após a seleção da criança
};