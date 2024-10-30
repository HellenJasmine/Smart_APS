const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('#vacinaTableBody');
const sVacinaNome = document.querySelector('#vacinaNome');
const sAplicador = document.querySelector('#aplicador');
const sLote = document.querySelector('#lote');
const sDataAplicacao = document.querySelector('#dataAplicacao');
const btnSalvar = document.querySelector('#vacinaForm');

let vacinas = [
    { nome: 'BCG', aplicador: '', lote: '', dataAplicacao: '' },
    { nome: 'Hepatite B', aplicador: '', lote: '', dataAplicacao: '' }
];
let vacinaSelecionada = null;

function openModal(index) {
    modal.classList.add('active');

    // Preencher os campos com os dados da vacina selecionada
    vacinaSelecionada = index;
    sVacinaNome.value = vacinas[index].nome;
    sAplicador.value = vacinas[index].aplicador || '';
    sLote.value = vacinas[index].lote || '';
    sDataAplicacao.value = vacinas[index].dataAplicacao || '';

    // Fechar o modal ao clicar fora dele
    modal.onclick = (e) => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active');
        }
    };
}

// Função para renderizar as vacinas na tabela
function renderVacinas() {
    tbody.innerHTML = '';
    vacinas.forEach((vacina, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><button onclick="openModal(${index})">${vacina.nome}</button></td>
            <td class="acao">
                <button onclick="openModal(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Salvar os dados da aplicação
btnSalvar.onsubmit = (e) => {
    e.preventDefault();
    
    // Atualizar os dados da vacina
    vacinas[vacinaSelecionada].aplicador = sAplicador.value;
    vacinas[vacinaSelecionada].lote = sLote.value;
    vacinas[vacinaSelecionada].dataAplicacao = sDataAplicacao.value;

    // Fechar o modal
    modal.classList.remove('active');

    // Re-renderizar a tabela com os dados atualizados
    renderVacinas();
};

// Carregar as vacinas inicialmente
renderVacinas();
