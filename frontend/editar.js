const urlParametro = new URLSearchParams(window.location.search);
const id = urlParametro.get("id");

console.log("ID do aluno para editar: ", id);

const API = 'http://localhost:3000/alunos';

const inputID = document.getElementById("id");
inputID.value = id;

async function carregarAluno() {
    if (!id) {
        alert("Nenhum aluno selecionado para edição!");
        return;
    }

    const resposta = await fetch(`${API}/${id}`);
    const aluno = await resposta.json();

    if (!aluno || aluno.length === 0) {
        alert("Aluno não encontrado!");
        return;
    }

    // como vem em array, usamos aluno[0]
    document.getElementById("id").value = id;
    document.getElementById("nome").value = aluno[0].NOME;
    document.getElementById("cpf").value = aluno[0].CPF;
    document.getElementById("cep").value = aluno[0].CEP;
    document.getElementById("uf").value = aluno[0].UF;
    document.getElementById("rua").value = aluno[0].RUA;
    document.getElementById("numero").value = aluno[0].NUMERO;
    document.getElementById("complemento").value = aluno[0].COMPLEMENTO;
}
carregarAluno();

const editar = document.getElementById("form-edicao")
editar.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const nome = document.getElementById("nome").value.trim()
    const cpf = document.getElementById("cpf").value.trim()
    const cep = document.getElementById("cep").value.trim()
    const uf = document.getElementById("uf").value.trim()
    const rua = document.getElementById("rua").value.trim()
    const numero = document.getElementById("numero").value.trim()
    const complemento = document.getElementById("complemento").value.trim()
    const editaraluno = {nome, cpf, cep, uf, rua, numero, complemento}

    try {
        const requisicao = await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editaraluno)
        })
    if (requisicao.ok) {
        alert("Aluno editado com sucesso!")
        window.location.href = "index.html"
    }
        else {
        alert("Erro ao editar aluno")
    }
    } catch (error) {
        console.error(error)
    }
})
