const modalVacina = document.querySelector('.modal-container');
const modalPesquisarCrianca = document.querySelector('.modal-pesquisarCrianca');

const tbody = document.querySelector('#vacinaTableBody');
const sVacinaNome = document.querySelector('#vacinaNome');
const sAplicador = document.querySelector('#aplicador');
const sLote = document.querySelector('#lote');
const sDataAplicacao = document.querySelector('#dataAplicacao');
const btnSalvarCrianca = document.querySelector('#vacinaForm');

let vacinas = [
    { nome: 'BCG', aplicador: '', lote: '', dataAplicacao: '' },
    { nome: 'Hepatite B', aplicador: '', lote: '', dataAplicacao: '' }
];
let vacinaSelecionada = null;

window.onload = function() {
    const modalPesquisarCrianca = document.querySelector('.modal-pesquisarCrianca');
    modalPesquisarCrianca.classList.add('active');
};

// Fechar o modal de pesquisa de criança ao clicar fora do conteúdo
document.addEventListener('click', function(event) {
    const modalPesquisarCrianca = document.querySelector('.modal-pesquisarCrianca');
    const pesquisarCriancaContent = document.querySelector('.pesquisarCrianca');

    if (modalPesquisarCrianca.classList.contains('active') && event.target === modalPesquisarCrianca) {
        modalPesquisarCrianca.classList.remove('active');
    }
});
function openModal(index) {
    modalVacina.classList.add('active');

    // Preencher os campos com os dados da vacina selecionada
    vacinaSelecionada = index;
    sVacinaNome.value = vacinas[index].nome;
    sAplicador.value = vacinas[index].aplicador || '';
    sLote.value = vacinas[index].lote || '';
    sDataAplicacao.value = vacinas[index].dataAplicacao || '';

    // Fechar o modal ao clicar fora dele
    modalVacina.onclick = (e) => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modalVacina.classList.remove('active');
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
btnSalvarCrianca.onsubmit = (e) => {
    e.preventDefault();
    
    // Atualizar os dados da vacina
    vacinas[vacinaSelecionada].aplicador = sAplicador.value;
    vacinas[vacinaSelecionada].lote = sLote.value;
    vacinas[vacinaSelecionada].dataAplicacao = sDataAplicacao.value;

    // Fechar o modal
    modalVacina.classList.remove('active');
    

    // Re-renderizar a tabela com os dados atualizados
    renderVacinas();
};

// Carregar famílias do localStorage
function carregarCriancas() {
    return JSON.parse(localStorage.getItem('dbcriancas')) ?? [];
}

// Função para pesquisar uma criança usando o critério selecionado
function pesquisarCrianca(tipoPesquisa, valorPesquisa) {
    const criancas = carregarCriancas(); 
    
    return criancas.filter(crianca => 
        crianca[tipoPesquisa].toLowerCase().trim() === valorPesquisa.toLowerCase().trim()
    );
    // console.log("Crianças carregadas para pesquisa:", criancas);

    // let resultado = criancas.find(c => {
    //     if (tipoPesquisa === 'nome') return c.nome === valorPesquisa;
    //     if (tipoPesquisa === 'cpf') return c.cpf === valorPesquisa;
    //     if (tipoPesquisa === 'sus') return c.sus === valorPesquisa;
    //     if (tipoPesquisa === 'dataNascimento') return c.dataNascimento === valorPesquisa;
    //     if (tipoPesquisa === 'nomeMae') return c.nomeMae === valorPesquisa;
    //     return false;
    // });

    // console.log("Resultado da pesquisa:", resultado);
    // return resultado || null; // Retorna a criança encontrada ou null
}


// Manipulação do formulário de pesquisa
document.querySelector('#crianca').addEventListener('submit', (event) => {
    event.preventDefault(); // Evita o recarregamento da página.

    const tipoPesquisa = document.querySelector('input[name="tipoPesquisa"]:checked').value;
    const valorPesquisa = document.querySelector('#campoPesquisa').value.trim();

    const resultado = pesquisarCrianca(tipoPesquisa, valorPesquisa);

    if (resultado && resultado.length > 0) {
        console.log("Criança(s) encontrada(s):", resultado);
        exibirResultadoCrianca(resultado[0]); // Mostra a primeira criança encontrada.
    } else {
        console.log("Nenhuma criança encontrada.");
        alert("Nenhuma criança encontrada.");
    }
});

// Função para exibir o resultado da criança encontrada
function exibirResultadoCrianca(crianca) {
    const nomeCrianca = document.querySelector('#nomeCrianca');
    nomeCrianca.textContent = crianca.nome;
    modalPesquisarCrianca.classList.remove('active');

    // Exemplo: Atualizar outros elementos da interface se necessário.
    console.log("Atualizando interface com os dados da criança:", crianca);
}



// Carregar as vacinas inicialmente
renderVacinas();
//  ----------------------------
// function carregarFamilias() {
//     return JSON.parse(localStorage.getItem("dbfamilias")) || [];
// }

// function pesquisarCrianca(tipoPesquisa, valorPesquisa) {
//     const familias = carregarFamilias();
//     let resultado = null;

//     familias.forEach(familia => {
//         const crianca = familia.criancas.find(c => {
//             if (tipoPesquisa === 'nome') return c.nome === valorPesquisa;
//             if (tipoPesquisa === 'cpf') return c.cpf === valorPesquisa;
//             if (tipoPesquisa === 'sus') return c.sus === valorPesquisa;
//             if (tipoPesquisa === 'cns') return c.cns === valorPesquisa;
//             if (tipoPesquisa === 'dataNascimento') return c.dataNascimento === valorPesquisa;
//             if (tipoPesquisa === 'mae') return c.nomeMae === valorPesquisa;
//             return false;
//         });

//         if (crianca) {
//             resultado = { crianca, endereco: familia.localidade };
//         }
//     });

//     return resultado;
// }

// // Manipulação do formulário de pesquisa
// document.querySelector('#crianca').onsubmit = function(e) {
//     e.preventDefault();
    
//     const tipoPesquisa = document.querySelector('input[name="tipoPesquisa"]:checked').value;
//     const valorPesquisa = document.querySelector('#campoPesquisa').value.trim();
    
//     if (!valorPesquisa) {
//         alert("Por favor, preencha o campo de pesquisa.");
//         return;
//     }
    
//     const resultado = pesquisarCrianca(tipoPesquisa, valorPesquisa);
    
//     if (resultado) {
//         exibirResultadoCrianca(resultado);
//         document.querySelector('.modal-pesquisarCrianca').classList.remove('active');
//     } else {
//         alert("Criança não encontrada.");
//     }
// };

// // Função para exibir o resultado da criança encontrada
// function exibirResultadoCrianca(resultado) {
//     const nomeCrianca = document.querySelector('#nomeCrianca');
//     nomeCrianca.textContent = resultado.crianca.nome;
// }
