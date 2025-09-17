console.log("app.js funcionando");

let alunos = [
    {
        "id": 1,
        "nome": "Vitor Lima",
        "cpf": "12345678910",
        "cep": "06000000",
        "uf": "SP",
        "rua": "Rua Senai",
        "numero": 123,
        "complemento": "APTO 12",
        "create_at": "2025-09-16T11:59:30.000Z",
        "update_at": "2025-09-16T11:59:30.000Z"
    },
    {
        "id": 2,
        "nome": "Wendel ",
        "cpf": "98765432100",
        "cep": "06000001",
        "uf": "SP",
        "rua": "Avenida Central",
        "numero": 123,
        "complemento": null,
        "create_at": "2025-09-16T11:59:30.000Z",
        "update_at": "2025-09-16T11:59:30.000Z"
    },
    {
        "id": 3,
        "nome": "Matheus",
        "cpf": "45678912399",
        "cep": "06000002",
        "uf": "SP",
        "rua": "Rua Nova",
        "numero": 123,
        "complemento": "Casa 1",
        "create_at": "2025-09-16T11:59:30.000Z",
        "update_at": "2025-09-16T11:59:30.000Z"
    },
   
]

function carregarTabela() {
    const tbody = document.getElementById("tbody")

    tbody.innerHTML = "<tr><td colspan='10'>Carregando...</td></tr>"

    // setTimeout(() => {
        tbody.innerHTML = "";
        tbody.innerHTML = alunos.map(a =>
            `<tr>
                <td>${a.id}</td>
                <td>${a.nome}</td>
                <td>${a.cpf}</td>
                <td>${a.cep}</td>
                <td>${a.uf}</td>
                <td>${a.rua} senai</td>
                <td>${a.numero}</td>
                <td>${a.complemento}</td>
            </tr>`
        ).join("");
    // }, 2000) // 2 segundos
}

const inputNome = document.getElementById("nome")
const inputCpf = document.getElementById("cpf")
const inputCep = document.getElementById("cep")
const inputUf = document.getElementById("uf")
const inputRua = document.getElementById("rua")
const inputNumero = document.getElementById("numero")
const inputComplemento = document.getElementById("complemento")
const formAluno = document.getElementById("form-aluno")


function salvar(e) {
    e.preventDefault();
    console.log("Salvando aluno");
    const nome = inputNome.value.trim();
    const cpf = inputCpf.value.trim();
    const cep = inputCep.value.trim();
    const uf = inputUf.value.trim();
    const rua = inputRua.value.trim();
    const numero = inputNumero.value.trim();
    const complemento = inputComplemento.value.trim();
    const novoAluno = {
        nome, cpf, cep, uf, rua, numero, complemento
    }
    alunos.push(novoAluno);
    console.log(alunos)
    carregarTabela()
}

formAluno.addEventListener("submit",salvar)



carregarTabela();