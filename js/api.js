// const modalVacina = document.querySelector('.modal-container');
// const modalPesquisarCrianca = document.querySelector('.modal-pesquisarCrianca');

// const tbody = document.querySelector('#vacinaTableBody');
// const sVacinaNome = document.querySelector('#vacinaNome');
// const sAplicador = document.querySelector('#aplicador');
// const sLote = document.querySelector('#lote');
// const sDataAplicacao = document.querySelector('#dataAplicacao');
// const btnSalvarCrianca = document.querySelector('#vacinaForm');

// let vacinas = [
//     { nome: 'BCG', aplicador: '', lote: '', dataAplicacao: '' },
//     { nome: 'Hepatite B', aplicador: '', lote: '', dataAplicacao: '' }
// ];
// let vacinaSelecionada = null;

// window.onload = function() {
//     const modalPesquisarCrianca = document.querySelector('.modal-pesquisarCrianca');
//     modalPesquisarCrianca.classList.add('active');
// };

// // Fechar o modal de pesquisa de criança ao clicar fora do conteúdo
// document.addEventListener('click', function(event) {
//     const modalPesquisarCrianca = document.querySelector('.modal-pesquisarCrianca');
//     const pesquisarCriancaContent = document.querySelector('.pesquisarCrianca');

//     if (modalPesquisarCrianca.classList.contains('active') && event.target === modalPesquisarCrianca) {
//         modalPesquisarCrianca.classList.remove('active');
//     }
// });
// function openModal(index) {
//     modalVacina.classList.add('active');

//     // Preencher os campos com os dados da vacina selecionada
//     vacinaSelecionada = index;
//     sVacinaNome.value = vacinas[index].nome;
//     sAplicador.value = vacinas[index].aplicador || '';
//     sLote.value = vacinas[index].lote || '';
//     sDataAplicacao.value = vacinas[index].dataAplicacao || '';

//     // Fechar o modal ao clicar fora dele
//     modalVacina.onclick = (e) => {
//         if (e.target.className.indexOf('modal-container') !== -1) {
//             modalVacina.classList.remove('active');
//         }
//     };
// }

// // Função para renderizar as vacinas na tabela
// function renderVacinas() {
//     tbody.innerHTML = '';
//     vacinas.forEach((vacina, index) => {
//         const tr = document.createElement('tr');
//         tr.innerHTML = `
//             <td><button onclick="openModal(${index})">${vacina.nome}</button></td>
//             <td class="acao">
//                 <button onclick="openModal(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
//             </td>
//         `;
//         tbody.appendChild(tr);
//     });
// }

// // Salvar os dados da aplicação
// btnSalvarCrianca.onsubmit = (e) => {
//     e.preventDefault();
    
//     // Atualizar os dados da vacina
//     vacinas[vacinaSelecionada].aplicador = sAplicador.value;
//     vacinas[vacinaSelecionada].lote = sLote.value;
//     vacinas[vacinaSelecionada].dataAplicacao = sDataAplicacao.value;

//     // Fechar o modal
//     modalVacina.classList.remove('active');
    

//     // Re-renderizar a tabela com os dados atualizados
//     renderVacinas();
// };

// // Carregar famílias do localStorage
// function carregarCriancas() {
//     return JSON.parse(localStorage.getItem('dbcriancas')) ?? [];
// }

// // Função para pesquisar uma criança usando o critério selecionado
// function pesquisarCrianca(tipoPesquisa, valorPesquisa) {
//     const criancas = carregarCriancas(); 
    
//     return criancas.filter(crianca => 
//         crianca[tipoPesquisa].toLowerCase().trim() === valorPesquisa.toLowerCase().trim()
//     );
//     // console.log("Crianças carregadas para pesquisa:", criancas);

//     // let resultado = criancas.find(c => {
//     //     if (tipoPesquisa === 'nome') return c.nome === valorPesquisa;
//     //     if (tipoPesquisa === 'cpf') return c.cpf === valorPesquisa;
//     //     if (tipoPesquisa === 'sus') return c.sus === valorPesquisa;
//     //     if (tipoPesquisa === 'dataNascimento') return c.dataNascimento === valorPesquisa;
//     //     if (tipoPesquisa === 'nomeMae') return c.nomeMae === valorPesquisa;
//     //     return false;
//     // });

//     // console.log("Resultado da pesquisa:", resultado);
//     // return resultado || null; // Retorna a criança encontrada ou null
// }


// // Manipulação do formulário de pesquisa
// document.querySelector('#crianca').addEventListener('submit', (event) => {
//     event.preventDefault(); // Evita o recarregamento da página.

//     const tipoPesquisa = document.querySelector('input[name="tipoPesquisa"]:checked').value;
//     const valorPesquisa = document.querySelector('#campoPesquisa').value.trim();

//     const resultado = pesquisarCrianca(tipoPesquisa, valorPesquisa);

//     if (resultado && resultado.length > 0) {
//         console.log("Criança(s) encontrada(s):", resultado);
//         exibirResultadoCrianca(resultado[0]); // Mostra a primeira criança encontrada.
//     } else {
//         console.log("Nenhuma criança encontrada.");
//         alert("Nenhuma criança encontrada.");
//     }
// });

// // Função para exibir o resultado da criança encontrada
// function exibirResultadoCrianca(crianca) {
//     const nomeCrianca = document.querySelector('#nomeCrianca');
//     nomeCrianca.textContent = crianca.nome;
//     modalPesquisarCrianca.classList.remove('active');

//     // Exemplo: Atualizar outros elementos da interface se necessário.
//     console.log("Atualizando interface com os dados da criança:", crianca);
// }



// // Carregar as vacinas inicialmente
// renderVacinas();
// //  ----------------------------
const modalVacina = document.querySelector('.modal-container');
const modalPesquisarCrianca = document.querySelector('.modal-pesquisarCrianca');

const tbody = document.querySelector('#vacinaTableBody');
const sVacinaNome = document.querySelector('#vacinaNome');
const sAplicador = document.querySelector('#aplicador');
const sLote = document.querySelector('#lote');
const sDataAplicacao = document.querySelector('#dataAplicacao');
const sEstrategia = document.querySelector('#estrategia');
const btnSalvarVacina = document.querySelector('#vacinaForm');
const filterSelect = document.querySelector('#filterSelect');

const nomeCriancaElement = document.querySelector('#nomeCrianca');
let vacinaSelecionada = null;
let criancaSelecionada = null;

// Dados iniciais de vacinas
let vacinas = [
    { nome: 'BCG', dose: 'Dose única', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
    { nome: 'Hepatite B', dose: 'Dose ao nascer', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
    { nome: 'Pentavalente (DTP + Hib + Hep B)', dose: '1ª dose', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
    { nome: 'Pentavalente (DTP + Hib + Hep B)', dose: '2ª dose', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
    { nome: 'Pentavalente (DTP + Hib + Hep B)', dose: '3ª dose', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
    { nome: 'Poliomielite (VIP)', dose: '1ª dose', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
    { nome: 'Poliomielite (VIP)', dose: '2ª dose', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
    { nome: 'Poliomielite (VIP)', dose: '3ª dose', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
    { nome: 'Poliomielite (VOP)', dose: '1º reforço', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
    { nome: 'Poliomielite (VOP)', dose: '2º reforço', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
    { nome: 'Rotavírus', dose: '1ª dose', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
    { nome: 'Rotavírus', dose: '2ª dose', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
    { nome: 'Pneumocócica 10V', dose: '1ª dose', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
    { nome: 'Pneumocócica 10V', dose: '2ª dose', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
    { nome: 'Pneumocócica 10V', dose: 'Reforço', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
    { nome: 'Meningocócica C', dose: '1ª dose', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
    { nome: 'Meningocócica C', dose: '2ª dose', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
    { nome: 'Meningocócica C', dose: 'Reforço', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
    { nome: 'Febre Amarela', dose: 'Dose única', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
    { nome: 'Tríplice Viral (Sarampo, Caxumba e Rubéola)', dose: '1ª dose', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
    { nome: 'Tríplice Viral (Sarampo, Caxumba e Rubéola)', dose: '2ª dose', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
    { nome: 'DTP (Difteria, Tétano e Pertussis)', dose: '1º reforço', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
    { nome: 'DTP (Difteria, Tétano e Pertussis)', dose: '2º reforço', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
    { nome: 'Hepatite A', dose: 'Dose única', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
    { nome: 'HPV (Papilomavírus Humano)', dose: '1ª dose', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
    { nome: 'HPV (Papilomavírus Humano)', dose: '2ª dose', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' },
    { nome: 'Meningocócica ACWY', dose: 'Reforço', aplicador: '', lote: '', dataAplicacao: '', status: 'naoTomadas' }
];


// Exibir modal de pesquisa da criança ao carregar a página
window.onload = function() {
    modalPesquisarCrianca.classList.add('active');
};

// Fechar o modal de pesquisa ao clicar fora
document.addEventListener('click', function(event) {
    if (modalPesquisarCrianca.classList.contains('active') && event.target === modalPesquisarCrianca) {
        modalPesquisarCrianca.classList.remove('active');
    }
});

// Abrir modal para atualizar vacina
function openModal(index) {
    vacinaSelecionada = index;
    const vacina = vacinas[index];

    sVacinaNome.value = vacina.nome;
    sAplicador.value = vacina.aplicador || '';
    sLote.value = vacina.lote || '';
    sDataAplicacao.value = vacina.dataAplicacao || '';
    sEstrategia.value = vacina.estrategia || 'rotina';

    modalVacina.classList.add('active');

    modalVacina.onclick = (e) => {
        if (e.target.className.includes('modal-container')) {
            modalVacina.classList.remove('active');
        }
    };
}

// Renderizar a tabela de vacinas
function renderVacinas() {
    tbody.innerHTML = '';
    vacinas.forEach((vacina, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${vacina.nome}</td>
            <td>${vacina.dose}</td>  

            <td class="acao">
                <button onclick="openModal(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}
// Salvar a aplicação da vacina
btnSalvarVacina.onsubmit = (e) => {
    e.preventDefault();

    if (vacinaSelecionada !== null) {
        vacinas[vacinaSelecionada].aplicador = sAplicador.value;
        vacinas[vacinaSelecionada].lote = sLote.value;
        vacinas[vacinaSelecionada].dataAplicacao = sDataAplicacao.value;
        vacinas[vacinaSelecionada].estrategia = sEstrategia.value;
        vacinas[vacinaSelecionada].status = 'tomadas'; // Atualiza o status para aplicada
    }

    modalVacina.classList.remove('active');
    renderVacinas();
};

// Carregar crianças do LocalStorage
function carregarCriancas() {
    return JSON.parse(localStorage.getItem('dbcriancas')) ?? [];
}

// Pesquisar criança pelo critério selecionado
function pesquisarCrianca(tipoPesquisa, valorPesquisa) {
    const criancas = carregarCriancas();

    return criancas.filter(crianca =>
        crianca[tipoPesquisa]?.toLowerCase().trim() === valorPesquisa.toLowerCase().trim()
    );
}

// Manipular pesquisa de criança
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

// Exibir os dados da criança selecionada
function exibirResultadoCrianca(crianca) {
    criancaSelecionada = crianca;
    nomeCriancaElement.textContent = crianca.nome;
    modalPesquisarCrianca.classList.remove('active');
    renderVacinas();
}

// Atualizar tabela ao mudar o filtro
filterSelect.addEventListener('change', renderVacinas);

// Carregar as vacinas inicialmente
renderVacinas();
