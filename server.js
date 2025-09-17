// importando express
const express = require("express");
const mysql = require("mysql2/promise");
const app = express();
app.use(express.json());
const porta = 3000;

const conexao = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Senai2025",
    database: "escola_db",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})


app.get("/alunos", async (req, res) => {
    try {
        const [retorno] = await conexao.query("SELECT * FROM alunos")
        //console.log(retorno)
        res.status(200).json(retorno)
    } catch (erro) {
        console.log(erro);
        res.status(500).json({ erro: "Erro ao buscar alunos" })
    }
})

app.post("/alunos", async (req, res) => {
    try {
        const { nome, cpf, cep = null, uf = null, rua = null, numero = null, complemento = null } = req.body;

        if (!nome || !cpf) return res.status(400).json({ msg: "Nome e CPF são obrigatórios" })

        const resultado = await conexao.query(
            "INSERT INTO alunos (nome,cpf,cep,uf,rua,numero,complemento) VALUES (?,?,?,?,?,?,?)",
            [nome, cpf, cep, uf, rua, numero, complemento]
        );
        res.status(201).json({ mensagem: "Aluno cadastrado com sucesso!" })
    } catch (erro) {
        console.log(erro)
        res.status(500).json({ erro: "Erro ao inserir o aluno" })
    }
})
// http://localhost:3000/alunos/2
app.get("/alunos/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const aluno = alunos.find((aluno => aluno.id === id))

    if (aluno) {
        res.json(aluno)
    } else {
        res.status(404).json(
            { erro: "Aluno não encontrado" }
        )
    }

})

function validarAluno({ nome, cpf, cep, uf, rua, numero }) {
    if (!nome) return "Nome é obrigatório";
    if (!cpf) return "CPF é obrigatório";
    if (!cep) return "Cep é obrigatório";
    if (!uf) return "UF é obrigatório";
    if (!rua) return "Rua é obrigatório";
    if (!numero) return "Número é obrigatório";
    if (uf.length !== 2 || !String(uf)) return "UF é só 2 caracteres";
    if (!Number(numero)) return "Número Inválido";
    if (cpf.length !== 11 || !Number(cpf)) return "CPF Inválido";
    if (cep.length !== 8 || !Number(cep)) return "Cep Inválido";
    return null;
}

app.post("/alunos", (req, res) => {
    const { nome, cpf, cep, uf, rua, numero, complemento } = req.body;
    const erro = validarAluno({ nome, cpf, cep, uf, rua, numero });
    if (erro) return res.status(400).json({ erro });

    const cpfRep = alunos.find(cpfRep => cpfRep.cpf === cpf)
    if (cpfRep) {
        return res.status(409).json({
            erro: "CPF já cadastrado"
        })
    }
    const id = alunos.length > 0 ? alunos[alunos.length - 1].id + 1 : 1
    const novoAluno = { id, nome, cpf, cep, uf, rua, numero, complemento }
    alunos.push(novoAluno)
    res.status(201).json({
        mensagem: "Aluno Cadastrado com sucesso",
        aluno: novoAluno
    })
})

app.put("/alunos/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const { nome, cpf, cep, uf, rua, numero, complemento } = req.body;
    const aluno = alunos.find(aluno => aluno.id === id)
    if (!aluno) {
        return res.status(400).json({
            erro: "Aluno não encontrado"
        })
    }
    const erro = validarAluno({ nome, cpf, cep, uf, rua, numero });
    if (erro) return res.status(400).json({ erro });

    const cpfRep = alunos.find(cpfRep => cpfRep.cpf === cpf && cpfRep.id !== id)
    if (cpfRep) {
        return res.status(409).json({
            erro: "CPF já cadastrado"
        })
    }
    aluno.nome = nome;
    aluno.cpf = cpf;
    aluno.cep = cep;
    aluno.uf = uf;
    aluno.rua = rua;
    aluno.numero = numero;
    aluno.complemento = complemento;
    res.json({
        mensagem: "Aluno Atualizado com sucesso"
    })
})

app.delete("/alunos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const indice = alunos.findIndex(a => a.id === id)

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Aluno não encontrado"
        })
    }
    alunos.splice(indice, 1);

    res.status(200).json({
        mensagem: "Aluno Deletado com sucesso"
    })
});


app.listen(porta, () => console.log(`Servidor rodando http://localhost:${porta}/`));