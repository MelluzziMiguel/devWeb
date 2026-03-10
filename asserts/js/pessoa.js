console.log('funcionou')

let pessoa = [];
const local = localStorage.getItem('pessoa');
if(local){
    pessoa = JSON.parse(local);
}

const $ = (id) => document.getElementById(id);

const modal = new bootstrap.Modal($('exampleModal'))
const tbody = document.getElementById('tbody');

const form = {
    title: $('modalTitle'),
    index: $('editIndex'),
    nome: $('nomeInput'),
    email: $('emailInput'),
    index: $('indexInput'),
    cep: $('cepInput')
}

function renderHTML(){
    tbody.innerHTML = '';
    pessoa.forEach((p, index) => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${p.nome}</td>
            <td>${p.email}</td>
            <td>
                <button class="btn btn-outline-info" data-index="${index}"><i class="bi bi-pen"></i></button>
                <button class="btn btn-outline-danger" data-index="${index}"><i class="bi bi-trash3"></i></button>
            </td>
        `; 
        tbody.appendChild(tr);
    })
}

function limpaForm(){
    form.nome.value = '';
    form.email.value = '';
}

function abrirModal(index = ''){
    limpaForm();
    form.title.textContent = index === '' ? 'Cadastra' : 'Editar';
    form.index.value = index;
    if(index !== ''){
        form.nome.value = pessoa[index].nome;
        form.email.value = pessoa[index].email;
    }

    modal.show()

}


$('btnAdicionar').addEventListener('click', () => abrirModal())

tbody.addEventListener('click', (event) => {

    const button = event.target.closest('button');
    if(!button) return;

    const index = Number(button.dataset.index);

    if(button.classList.contains('btn-outline-info')){
        abrirModal(index)
        return;
    }

    if(button.classList.contains('btn-outline-danger')){
        if(!confirm('Deseja excluir este item')) return;
        pessoa.splice(index, 1);
        localStorage.setItem('pessoa', JSON.stringify(pessoa));
        renderHTML();
    }
})


$('btSalvar').addEventListener('click', () => {
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    if(!nome || !email){
        alert('Todos os campos são obrigatório');
        return;
    }
    const index = form.index.value;
    index === '' ? pessoa.push({nome, email}) : pessoa[index] = {nome, email};
    
    localStorage.setItem('pessoa', JSON.stringify(pessoa));
    
    renderHTML();
    modal.hide();
    limpaForm();
})



const endereco = document.getElementById("enderecoInput")
const bairro = document.getElementById("bairroInput")
const cidade = document.getElementById("cidadeInput")
const UF = document.getElementById("UFInput")
const complemento = document.getElementById("complementoInput")

form.cep.addEventListener('blur', async () => {
    const cep = form.cep.value.replace(/\D/g, "");
    if(cep.length !== 8) return;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(dados => {
        if (dados.error) return;

        console.log(dados)

        endereco.value = dados.logradouro;
        bairro.value = dados.bairro;
        cidade.value = dados.localidade;
        UF.value = dados.uf;
        complemento.value = dados.complemento;
    })
    .catch(err => console.error('Error ViaCEP', err))

    

})


renderHTML();