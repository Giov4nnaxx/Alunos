// importando express
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

// cria aplicação
const app = express();
app.use(express.json());
app.use(cors());
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

app.get("/alunos", async (req, res) => {
    try {
        const [retorno] = await conexao.query(`SELECT * FROM alunos `)
        res.status(200).json(retorno)
    } catch (erro) {
        console.log(erro);
        res.status(500).json({ erro: "Erro ao buscar alunos" })
    }
})

app.get("/alunos/:id", async (req, res) => {
    const id = req.params.id
    try {
        const [retorno] = await conexao.query(`SELECT * FROM alunos WHERE id= ${id}`)
        res.status(200).json(retorno)
    } catch (erro) {
        console.log(erro);
        res.status(500).json({ erro: "Erro ao buscar alunos" })
    }
})

app.put("/alunos/:id", async (req, res) => {
    const id = req.params.id;
    const { nome, cpf, cep, uf, rua, numero, complemento } = req.body;
    try {
        const [resultado] = await conexao.query(
            "UPDATE alunos SET nome=?, cpf=?, cep=?, uf=?, rua=?, numero=?, complemento=? WHERE id=?",
            [nome, cpf, cep, uf, rua, numero, complemento, id]
        );
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Aluno não encontrado" });
        }
        res.json({ mensagem: "Aluno atualizado com sucesso" });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao atualizar aluno" });
    }
});

app.delete("/alunos/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const [resultado] = await conexao.query("DELETE FROM alunos WHERE id = ?", [id]);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: "Aluno não encontrado" });
        }
        res.status(200).json({ mensagem: "Aluno Deletado com sucesso" });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao deletar aluno" });
    }
});

app.listen(porta, () => console.log(`Servidor rodando http://localhost:${porta}/`));