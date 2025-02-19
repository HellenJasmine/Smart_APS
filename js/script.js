// const modalCrianca = document.querySelector('.modal-container');
// const tbody = document.querySelector('tbody');
// const sNome = document.querySelector('#m-nome');
// const sDataNascimento = document.querySelector('#m-dataNascimento');
// const sCpf = document.querySelector('#m-cpf');
// const sSus = document.querySelector('#m-sus');
// const sSexo = document.querySelector('#m-sexo');
// const sAlergia = document.querySelector('#m-alergia');
// const sTipoSanguineo = document.querySelector('#m-tipoSanguineo');
// const sNomeMae = document.querySelector('#m-nomeMae');
// const btnSalvarCrianca = document.querySelector('#btnSalvarCrianca');
// const btnSalvarFamilia = document.querySelector('#btnSalvarFamilia')

// let familiaAtual = { criancas: [], endereco: {} };
// let id;

// // Define o endereço inicial vazio para família
// function capturarEndereco(){
//     return {
//         numero: document.querySelector('#n-numero').value,
//         rua: document.querySelector('#m-rua').value,
//         bairro: document.querySelector('#m-bairro').value,
//         cidade: document.querySelector('#m-cidade').value,
//         estado: document.querySelector('#m-estado').value,
//         pais: document.querySelector('#m-país').value,
//     };
// }

// // Abre o modal e carrega os dados da criança caso seja uma edição
// function openModal(edit = false, index = 0) {
//     modalCrianca.classList.add('active');

//     modalCrianca.onclick = e => {
//         if (e.target.className.indexOf('modal-container') !== -1) {
//             modalCrianca.classList.remove("active");
//         }
//     };

//     if (edit) {
//         const crianca = familiaAtual.criancas[index];
//         sNome.value = crianca.nome;
//         sDataNascimento.value = crianca.dataNascimento;
//         sCpf.value = crianca.cpf;
//         sSus.value = crianca.sus;
//         sNomeMae.value = crianca.nomeMae;
//         sAlergia.value = crianca.alergia;
//         sSexo.value = crianca.sexo;
//         sTipoSanguineo.value = crianca.tipoSanguineo;
//         id = index;
//     } else {
//         limparCamposCrianca();
//         id = undefined;
//     }
// }

// // Função para editar uma criança existente
// function editCrianca(index) {
//     openModal(true, index);
// }

// // Função para excluir uma criança
// function deleteCrianca(index) {
//     familiaAtual.criancas.splice(index, 1);
//     salvarFamiliaBD();
//     loadCriancas();
// }

// // Função para inserir uma criança na tabela
// function insertCrianca(crianca, index) {
//     let tr = document.createElement('tr');

//     tr.innerHTML = `
//         <td><a href="perfil_detalhes.html">${crianca.nome}</a></td>
//         <td class="acao">
//             <button onclick="editCrianca(${index})"><i class="fa-solid fa-pen" style="color: blue;"></i></button>
//         </td>
//         <td class="acao">
//             <button onclick="deleteCrianca(${index})"><i class="fa-solid fa-trash" style="color: red;"></i></button>
//         </td>
//     `;
//     tbody.appendChild(tr);
// }

// // Botão para salvar a criança no array e no localStorage
// btnSalvarCrianca.onclick = e => {
//     e.preventDefault();

//     if (sNome.value === '' || sDataNascimento.value === '' || sCpf.value === '') {
//         return;
//     }

//     const crianca = {
//         nome: sNome.value,
//         dataNascimento: sDataNascimento.value,
//         cpf: sCpf.value,
//         sus: sSus.value,
//         sexo: sSexo.value,
//         nomeMae: sNomeMae.value,
//         tipoSanguineo: sTipoSanguineo.value,
//         alergia: sAlergia.value,
//     };

//     if (id !== undefined) {
//         familiaAtual.criancas[id] = crianca;
//     } else {
//         familiaAtual.criancas.push(crianca);
//     }

    
//     salvarFamiliaBD();
//     modalCrianca.classList.remove('active');
//     loadCriancas();
//     id = undefined;

   

// };

// // Função para carregar as crianças e exibi-las na tabela
// // function loadCriancas() {
// //     const enderecoAtual = capturarEndereco();
// //     const familiaExistente = getFamiliaBD(enderecoAtual);

// //     // Se a família não existir no localStorage, iniciamos com uma lista de crianças vazia
// //     if (familiaExistente.criancas.length === 0) {
// //         familiaAtual = { criancas: [], endereco: enderecoAtual };
// //     } else {
// //         familiaAtual = familiaExistente;
// //     }

// //     tbody.innerHTML = '';
// //     familiaAtual.criancas.forEach((crianca, index) => {
// //         insertCrianca(crianca, index);
// //     });
// // }
// function loadCriancas() {
//     tbody.innerHTML = '';
//     familiaAtual.criancas.forEach((crianca, index) => {
//         insertCrianca(crianca, index);
//     });
// }


// function getFamiliaBD(endereco) {
//     const familias = JSON.parse(localStorage.getItem('dbfamilias')) ?? [];
//     return familias.find(fam => JSON.stringify(fam.endereco) === JSON.stringify(endereco)) ?? { criancas: [], endereco: endereco };
// }

// // Evento para salvar a família completa no localStorage
// btnSalvarFamilia.onclick = e => {
//     e.preventDefault();

//     // Captura e atribui o endereço atual à família
//     const enderecoAtual = capturarEndereco();
//     familiaAtual.endereco = enderecoAtual;

//     // Checa se todos os dados obrigatórios do endereço estão preenchidos
//     if (!enderecoAtual.rua || !enderecoAtual.numero || !enderecoAtual.bairro || !enderecoAtual.cidade) {
//         alert("Por favor, preencha todos os campos obrigatórios do endereço.");
//         return;
//     }

//     // Carrega as famílias do localStorage ou define uma nova lista vazia
//     const familias = JSON.parse(localStorage.getItem('dbfamilias')) ?? [];

//     // Encontra o índice da família pelo endereço atual
//     const index = familias.findIndex(fam => JSON.stringify(fam.endereco) === JSON.stringify(enderecoAtual));

//     // Se já existir, atualiza a família; caso contrário, adiciona uma nova
//     if (index >= 0) {
//         familias[index] = familiaAtual;
//     } else {
//         familias.push(familiaAtual);
//     }

//     // Salva todas as famílias atualizadas no localStorage
//     localStorage.setItem('dbfamilias', JSON.stringify(familias));

//     // Redireciona para a página inicial (opcional)
//     //window.location.href = 'tela_inicial.html'; // Substitua 'index.html' pela URL da sua tela inicial

//     limparCampos();
//     console.log("Família salva com sucesso:", familiaAtual);
//     familiaAtual = { criancas:[], endereco:{}}
//     window.location.href = 'tela_inicial.html'
// };

// // Função para salvar a família atual no localStorage
// function salvarFamiliaBD() {
//     const familias = JSON.parse(localStorage.getItem('dbfamilias')) ?? [];
//     const enderecoAtual = capturarEndereco();
//     familiaAtual.endereco = enderecoAtual;
//     console.log(familiaAtual);
    
//     const index = familias.findIndex(fam => JSON.stringify(fam.endereco) === JSON.stringify(enderecoAtual));

//     if (index >= 0) {
//         familias[index] = familiaAtual;
//     } else {
//         familias.push(familiaAtual);
//     }

//     localStorage.setItem('dbfamilias', JSON.stringify(familias));
    
   
// }
// function limparCampos() {
//     limparCamposCrianca();
//     document.querySelector('#n-numero').value = '';
//     document.querySelector('#m-rua').value = '';
//     document.querySelector('#m-bairro').value = '';
//     document.querySelector('#m-cidade').value = '';
//     document.querySelector('#m-estado').value = '';
//     document.querySelector('#m-país').value = '';
    
    
    
//     tbody.innerHTML = ''; // Limpa a tabela de crianças na tela
// }
// function limparCamposCrianca(){
//     sNome.value = '';
//     sDataNascimento.value = '';
//     sCpf.value = '';
//     sSus.value = '';
//     sAlergia.value = '';
//     sNomeMae.value = '';
//     sTipoSanguineo.value = '';
//     sSexo.value = '';
// }

// function iniciarTelaAdicionarFamilia() {
//     familiaAtual = { criancas: [], endereco: {} };  // Inicia uma nova família vazia
//     limparCampos(); // Limpa os campos e a tabela de crianças
// }

// // Remove o carregamento automático de dados anteriores
// function loadCriancas() {
//     tbody.innerHTML = ''; // Apenas inicializa a tabela vazia
//     familiaAtual.criancas.forEach((crianca, index) => {
//         insertCrianca(crianca, index);
//     });
// }

// // Carrega as crianças ao iniciar a página

// document.addEventListener('DOMContentLoaded', iniciarTelaAdicionarFamilia)



// const tbody = document.querySelector('tbody')
// const sNome = document.querySelector('#m-nome')
// const sDataNascimento = document.querySelector('#m-dataNascimento')
// const sCpf = document.querySelector('#m-cpf')
// const sRg = document.querySelector('#m-rg')
// const sSexo = document.querySelector('#m-sexo')

// const btnSalvar = document.querySelector('#btnSalvar')




// let itens 
// let id 

// function openModal(edit = false, index = 0) {
//     modal.classList.add('active')

//     modal.onclick = e => {
//         if(e.target.className.indexOf('modal-container') !== -1){
//             modal.classList.remove("active")
//         }
//     }

//     if(edit){
//         sNome.value = itens[index].nome
//         sDataNascimento.value = itens[index].DataNascimento
//         sCpf.value = itens[index].cpf
//         sRg.value = itens[index].rg
//         sCategoria.value = itens[index].categoria
//         sAlergia.value = itens[index].alergia
//         sSexo.value = itens[index].sexo
//         sTipoSanguineo.value = itens[index].tipoSanguineo
//         id = index
//     } else {
//         sNome.value =''
//         sDataNascimento.value =''
//         sCpf.value = ''
//         sRg.value = ''
//         sAlergia.value = ''
//         sCategoria.value =''
//         sTipoSanguineo = ''
//         sSexo.value = ''
//     }
// }

// function editItem(index){
//     openModal(true, index)
// }

// function deleteItem(index) {
//     itens.splice(index,1)
//     setItensBD()
//     loadItens()    
// }

// function insertItem(item,index){
//     let tr = document.createElement('tr')

//     tr.innerHTML = `
//     <td><a href="perfil_detalhes.html">${item.nome}</a></td>
//     <td class="acao">
//       <button onclick="editItem(${index})"><i class="fa-solid fa-pen" style='color: blue'></i></button>
//     </td>
//     <td class="acao">
//       <button onclick="deleteItem(${index})"><i class="fa-solid fa-trash" style='color: red'></i></button>
//     </td>
//     `
    
//     tbody.appendChild(tr)
// }


// btnSalvar.onclick = e => {
//     e.preventDefault();
    
//     if (sNome.value === '' || sDataNascimento.value === '' || sCpf.value === '') {
//         return;
//     }

//     if (id !== undefined) {
//         itens[id].nome = sNome.value;
//         itens[id].dataNascimento = sDataNascimento.value;
//         itens[id].cpf = sCpf.value;
//         itens[id].rg = sRg.value;
//         itens[id].alergia = sAlergia.value;
//         itens[id].sexo = sSexo.value;
//         itens[id].categoria = sCategoria.value;
//         itens[id].tipoSanguineo = sTipoSanguineo.value;
//     } else {
//         itens.push({
//             'nome': sNome.value, 
//             'dataNascimento': sDataNascimento.value, 
//             'cpf': sCpf.value, 
//             'rg': sRg.value, 
//             'sexo': sSexo.value, 
//             'categoria': sCategoria.value, 
//             'tipoSanguineo': sTipoSanguineo.value, 
//             'alergia': sAlergia.value
//         });
//     }

//     setItensBD();
//     modal.classList.remove('active');
//     loadItens();
//     id = undefined;
// };


// function loadItens(){
//     itens = getItensBD()
//     tbody.innerHTML = ''
//     itens.forEach((item, index) => {
//         insertItem(item, index)
//     });
// }



// const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
// const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

// loadItens();

document.addEventListener("DOMContentLoaded", () => { 
    const btnSalvar = document.getElementById("btnSalvarCrianca");

    btnSalvar.addEventListener("click", (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        const nome = document.getElementById("m-nome").value.trim();
        const dataNascimento = document.getElementById("m-dataNascimento").value;
        const cpf = document.getElementById("m-cpf").value.trim();
        const sus = document.getElementById("m-sus").value.trim();
        const localidade = document.getElementById("m-localidade").value.trim();
        const nomeMae = document.getElementById("m-nomeMae").value.trim();
        const sexo = document.getElementById("m-sexo").value;

        // Verificação de campos vazios
        if (!nome || !dataNascimento || !cpf || !sus || !localidade || !nomeMae) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const crianca = {
            nome,
            dataNascimento,
            cpf,
            sus,
            localidade,
            nomeMae,
            sexo,
            cartaoVacina: [] // Adiciona o atributo para armazenar vacinas futuras
        };

        // Carregar famílias do localStorage
        let criancas = JSON.parse(localStorage.getItem("dbcriancas")) ?? [];

        
        criancas.push(crianca);

        // Salvar no localStorage
        localStorage.setItem("dbcriancas", JSON.stringify(criancas));

        console.log("Criancas cadastradas:", criancas);
        alert("Criança cadastrada com sucesso!");

        // Limpa o formulário
        document.querySelector("form").reset();
    });
});
