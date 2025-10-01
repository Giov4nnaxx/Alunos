console.log("app.js funcionando");

const API = "http://localhost:3000/alunos"

async function carregarTabela() {
    try {
        const resposta = await fetch(API);
        const alunos = await resposta.json();
        console.log(alunos)

        const tbody = document.getElementById("tbody")

        tbody.innerHTML = "<tr><td colspan='10'>Carregando...</td></tr>"

        // setTimeout(() => {
        tbody.innerHTML = "";
        tbody.innerHTML = alunos.map(a =>
            `<tr>
                <td>${a.ID}</td>
                <td>${a.NOME}</td>
                <td>${a.CPF}</td>
                <td>${a.CEP}</td>
                <td>${a.UF}</td>
                <td>${a.RUA}</td>
                <td>${a.NUMERO}</td>
                <td>${a.COMPLEMENTO}</td>
                <td>
                    <button>
                        <a href="editar.html?id=${a.ID}">Editar</a>
                    </button>
                    <button onclick="excluirAluno(${a.ID})">Excluir</button>
                </td>
            </tr>`
        ).join("");
        // }, 2000) // 2 segundos
    } catch (error) {
        console.error(error.message)
    }
}
carregarTabela();

async function excluirAluno(id) {
    if (!confirm("Deseja realmente excluir o aluno de ID " + id + "?")) {
        return;
    }
    try {
        const resposta = await fetch(`${API}/${id}`, {
            method: "DELETE"
        });
        if (resposta.ok) {
            alert("Aluno excluído com sucesso!");
            carregarTabela();
        } else {
            alert("Erro ao excluir aluno.");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}