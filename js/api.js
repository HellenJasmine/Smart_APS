
const modalVacina = document.querySelector('.modal-container');
const modalPesquisarCrianca = document.querySelector('.modal-pesquisarCrianca');

const sVacinaNome = document.querySelector('#vacinaNome');
const sAplicador = document.querySelector('#aplicador');
const sLote = document.querySelector('#lote');
const sDataAplicacao = document.querySelector('#dataAplicacao');
const sEstrategia = document.querySelector('#estrategia');
const btnSalvarVacina = document.querySelector('#vacinaForm');
const filterSelect = document.querySelector('#filterSelect');

const nomeCriancaElement = document.querySelector('#nomeCrianca');
const idadeCriancaElement = document.querySelector('#idadeCrianca');
const cpfCriancaElement = document.querySelector('#cpfCrianca');
const cnsCriancaElement = document.querySelector('#cnsCrianca');

let vacinaSelecionada = null;
let criancaSelecionada = null;

let vacinas = {
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
        { nome: 'Covid-19', dose: '1º DOSE', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' }
    ],
    "7 meses": [
        { nome: 'Covid-19', dose: '2º DOSE', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' }
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
        { nome: 'Tetraviral', dose: '1º DOSE', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' }
    ],
    "4 anos": [
        { nome: 'DTP', dose: '2º REFORÇO', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
        { nome: 'Febre Amarela', dose: 'REFORÇO', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
        { nome: 'Varicela', dose: '1º DOSE', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' }
    ],
    "5 anos": [
        { nome: 'Pneumocócica 23-V', dose: '2º REFORÇO', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
        { nome: 'Febre Amarela', dose: 'REFORÇO', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' }
    ],
    "7 anos": [
        { nome: 'Difteria e Tétano', dose: '3º REFORÇO', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' }
    ],
    "9 anos": [
        { nome: 'HPV', dose: '3º REFORÇO', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' }
    ],
    "10 anos": [
        { nome: 'HPV', dose: '3º REFORÇO', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' }
    ]
};

let container = document.getElementById('vacinas-container');

Object.keys(vacinas).forEach(idade => {
    let titulo = document.createElement('div');
    titulo.className = 'vacina-titulo';
    titulo.textContent = idade;
    container.appendChild(titulo);
    
    vacinas[idade].forEach(vacina => {
        let row = document.createElement('div');
        row.className = 'vacina-row';
        
        let nome = document.createElement('div');
        nome.className = 'vacina-nome';
        nome.textContent = vacina.nome;

        let doseContainer = document.createElement('div');
        doseContainer.className = 'dose-container';

        
        let doseInfo = document.createElement('div');
        doseInfo.className = 'dose-info';
        
        let doseText = document.createElement('div');
        doseText.className = 'dose-text';
        doseText.textContent = vacina.dose;

        let dataText = document.createElement('div');
        dataText.className = 'data-text';
        dataText.textContent = vacina.dataAplicacao || ''; // Mostra a data apenas se existir

        doseInfo.appendChild(doseText);
        doseInfo.appendChild(dataText);
        
        row.appendChild(nome);
        row.appendChild(doseInfo);
        container.appendChild(row);

        vacina.row = row;
        vacina.dataAplicacaoElement = dataAplicacao;

        // Adiciona event listeners para abrir o modal ao clicar na dose ou no nome da vacina
        nome.addEventListener('click', () => {
            console.log("Cliquei no nome da vacina");
            abrirModalVacina(vacina, row, doseInfo);
        });
        doseInfo.addEventListener('click', () => {
            console.log("Cliquei na dose da vacina");
            abrirModalVacina(vacina, row, doseInfo);
        });
        if (vacina.dataAplicacao) {
            row.classList.add('vacina-aplicada');
        }

    });
});

// Função para abrir o modal e preencher os campos do formulário
function abrirModalVacina(vacina, row, doseInfo) {
    console.log("Abrindo modal para vacina:", vacina); 
    vacinaSelecionada = vacina;
    vacinaSelecionada.row = row;
    vacinaSelecionada.doseInfo = doseInfo;
    sVacinaNome.value = vacina.nome;
    sAplicador.value = vacina.aplicador;
    sLote.value = vacina.lote;
    sDataAplicacao.value = vacina.dataAplicacao;
    sEstrategia.value = vacina.estrategia || 'rotina'; // Define um valor padrão se não houver estratégia
    modalVacina.classList.add('active');
    console.log(vacinas);
}

btnSalvarVacina.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita recarregar a página

    if (!vacinaSelecionada || !criancaSelecionada) {
        alert("Selecione uma criança e uma vacina antes de salvar.");
        return;
    }

    // Atualiza os dados da vacina
    vacinaSelecionada.aplicador = sAplicador.value.trim();
    vacinaSelecionada.lote = sLote.value.trim();
    vacinaSelecionada.dataAplicacao = sDataAplicacao.value.trim();
    vacinaSelecionada.estrategia = sEstrategia.value;


    const doseInfo = vacinaSelecionada.row.querySelector('.dose-info');
    
    
    if(!doseInfo) return;
    let doseText = doseInfo.querySelector('.dose-text'); // Seleciona o elemento da dose
    let dataAplicacaoText = doseInfo.querySelector('.data-text'); // Seleciona o elemento da data

    if (!dataAplicacaoText) {
        // Se não existir, cria um elemento de data
        dataAplicacaoText = document.createElement('div');
        dataAplicacaoText.className = 'data-text';
        doseInfo.appendChild(dataAplicacaoText);
    }

    doseInfo.classList.remove('vacina-atrasada', 'vacina-aplicada', 'vacina-pendente');

    if (vacinaSelecionada.dataAplicacao) {
        vacinaSelecionada.status = 'tomada';
        doseInfo.classList.add('vacina-aplicada');
        dataAplicacaoText.textContent = `Data: ${vacinaSelecionada.dataAplicacao}`;
    } else {
        vacinaSelecionada.status = 'naoTomadas';
        dataAplicacaoText.textContent = '';
    }

    // Atualiza o banco de dados da criança
    let criancas = carregarCriancas();
    let indexCrianca = criancas.findIndex(c => c.nome === criancaSelecionada.nome);

    if (indexCrianca !== -1) {
        if (!criancas[indexCrianca].vacinas) {
            criancas[indexCrianca].vacinas = {};
        }
        criancas[indexCrianca].vacinas = vacinas;
        localStorage.setItem('dbcriancas', JSON.stringify(criancas));
    }

    alert("Vacina salva com sucesso!");
    modalVacina.classList.remove('active'); // Fecha o modal após salvar
    atualizarCoresVacinas();
});



function carregarCriancas() {
    return JSON.parse(localStorage.getItem('dbcriancas')) ?? [];
}
document.addEventListener('click', function(event) {
    if (modalPesquisarCrianca.classList.contains('active') && event.target === modalPesquisarCrianca) {
        modalPesquisarCrianca.classList.remove('active');
    }
});

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
    document.getElementById('nomeCrianca').textContent = `${crianca.nome}`;
    document.getElementById('dataNascimentoCrianca').textContent = `Data de Nascimento: ${crianca.dataNascimento}`;
    document.getElementById('idadeCrianca').textContent = `Idade: ${idade.anos} anos, ${idade.meses} meses e ${idade.dias} dias`;
    document.getElementById('cpfCrianca').textContent = `CPF: ${crianca.cpf}`;
    document.getElementById('cnsCrianca').textContent = `CNS: ${crianca.cns}`;
    modalPesquisarCrianca.classList.remove('active');
    localStorage.setItem('criancaSelecionada', JSON.stringify(crianca));
    atualizarCoresVacinas(); // Atualiza as cores das vacinas com base na idade da criança
}

function carregarCriancas() {
    return JSON.parse(localStorage.getItem('dbcriancas')) ?? [];
}

document.addEventListener('click', function(event) {
    if (modalPesquisarCrianca.classList.contains('active') && event.target === modalPesquisarCrianca) {
        modalPesquisarCrianca.classList.remove('active');
    }
});

// Carregar a última criança selecionada ao iniciar
window.onload = function() {
    modalPesquisarCrianca.classList.add('active');
    
};



function mostrarIdadePorExtenso(dataNascimento) {
    let hoje = new Date();
    let nascimento = new Date(dataNascimento);

    let anos = hoje.getFullYear() - nascimento.getFullYear();
    let meses = hoje.getMonth() - nascimento.getMonth();
    let dias = hoje.getDate() - nascimento.getDate();

    if (dias < 0) {
        meses--;
        let ultimoDiaMesAnterior = new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
        dias += ultimoDiaMesAnterior;
    }

    if (meses < 0) {
        anos--;
        meses += 12;
    }

    return { anos, meses, dias };
}
function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    const diff = hoje - nascimento;
    const idadeMeses = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44)); // Aproximação para meses
    return idadeMeses;
}

function atualizarCoresVacinas() {
    if (!criancaSelecionada || !criancaSelecionada.dataNascimento) return;

    const idadeCrianca = calcularIdade(criancaSelecionada.dataNascimento);
    console.log(calcularIdade(criancaSelecionada.dataNascimento));

    Object.keys(vacinas).forEach(idadeVacina => {
        let idadeEmMeses = converterIdadeParaMeses(idadeVacina);

        vacinas[idadeVacina].forEach(vacina => {
            if (!vacina.row) return;

            const doseInfo = vacina.row.querySelector('.dose-info');
            if (!doseInfo) return;

            // Remove classes anteriores apenas da dose-info
            doseInfo.classList.remove('vacina-aplicada', 'vacina-atrasada', 'vacina-pendente');

            // Aplica a classe apenas na dose-info conforme o status
            if (vacina.status === 'tomada') {
                doseInfo.classList.add('vacina-aplicada'); // Apenas a dose fica verde

            } else if (idadeCrianca >= idadeEmMeses) {
                doseInfo.classList.add('vacina-atrasada'); // Apenas a dose fica vermelha

            } else {
                doseInfo.classList.add('vacina-pendente'); // Apenas a dose fica cinza
            }
        });
    });
}
//Converte os rótulos de idade ('2 meses', '4 anos') para meses numéricos
function converterIdadeParaMeses(idade) {
    if (idade === "Ao nascer") {
        return 0; // Reforça que "Ao nascer" equivale a 0 meses
    }
    if (idade.includes("ano")) {
        return parseInt(idade) * 12; // Converte anos para meses
    }
    return parseInt(idade); // Mantém meses
}

window.onload = function() {
    modalPesquisarCrianca.classList.add('active');
};
