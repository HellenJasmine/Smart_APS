const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sDataNascimento = document.querySelector('#m-dataNascimento')
const sCpf = document.querySelector('#m-cpf')
const sRg = document.querySelector('#m-rg')
const sSexo = document.querySelector('#m-sexo')
const sAlergia = document.querySelector('#m-alergia')
const sCategoria = document.querySelector('#m-categoria')
let sTipoSanguineo = document.querySelector('#m-tipoSanguineo')
//const btnSalvar = document.querySelector('#btnSalvarModal')
const btnSalvar = document.querySelector('.modal button');



let itens 
let id 

function openModal(edit = false, index = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if(e.target.className.indexOf('modal-container') !== -1){
            modal.classList.remove("active")
        }
    }

    if(edit){
        sNome.value = itens[index].nome
        sDataNascimento.value = itens[index].dataNascimento
        sCpf.value = itens[index].cpf
        sRg.value = itens[index].rg
        sCategoria.value = itens[index].categoria
        sAlergia.value = itens[index].alergia
        sSexo.value = itens[index].sexo
        sTipoSanguineo.value = itens[index].tipoSanguineo
        id = index
    } else {
        sNome.value =''
        sDataNascimento.value =''
        sCpf.value = ''
        sRg.value = ''
        sAlergia.value = ''
        sCategoria.value =''
        sTipoSanguineo.value = ''
        sSexo.value = ''
    }
}

function editItem(index){
    openModal(true, index)
}

function deleteItem(index) {
    itens.splice(index,1)
    setItensBD()
    loadItens()    
}

function insertItem(item,index){
    let tr = document.createElement('tr')

        tr.innerHTML = `
        <td><a href="perfil_detalhes.html">${item.nome}</a></td>
        <td class="acao">
            <button onclick="editItem(${index})"><i class="fa-solid fa-pen" style='color: blue'></i></button>
        </td>
        <td class="acao">
            <button onclick="deleteItem(${index})"><i class="fa-solid fa-trash" style='color: red'></i></button>
        </td>
        `;
    tbody.appendChild(tr)
}


btnSalvar.onclick = e => {
    e.preventDefault();
    
    if (sNome.value === '' || sDataNascimento.value === '' || sCpf.value === '') {
        return;
    }

    if (id !== undefined) {
        itens[id].nome = sNome.value;
        itens[id].dataNascimento = sDataNascimento.value;
        itens[id].cpf = sCpf.value;
        itens[id].rg = sRg.value;
        itens[id].alergia = sAlergia.value;
        itens[id].sexo = sSexo.value;
        itens[id].categoria = sCategoria.value;
        itens[id].tipoSanguineo = sTipoSanguineo.value;
    } else {
        itens.push({
            'nome': sNome.value, 
            'dataNascimento': sDataNascimento.value, 
            'cpf': sCpf.value, 
            'rg': sRg.value, 
            'sexo': sSexo.value, 
            'categoria': sCategoria.value, 
            'tipoSanguineo': sTipoSanguineo.value, 
            'alergia': sAlergia.value
        });
    }
    console.log(itens);

    setItensBD();
    modal.classList.remove('active');
    loadItens();
    id = undefined;
};


function loadItens(){
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
    });
}



const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()

// const modal = document.querySelector('.modal-container')
// const tbody = document.querySelector('tbody')
// const sNome = document.querySelector('#m-nome')
// const sDataNascimento = document.querySelector('#m-dataNascimento')
// const sCpf = document.querySelector('#m-cpf')
// const sRg = document.querySelector('#m-rg')
// const sSexo = document.querySelector('#m-sexo')
// const sAlergia = document.querySelector('#m-alergia')
// const sCategoria = document.querySelector('#m-categoria')
// let sTipoSanguineo = document.querySelector('#m-TipoSanguineo')
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