const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors')
const path = require('path');

const app = express();
const port = 3000;

app.use(cors()); // Habilita o CORS para todas as requisições

// Middleware para parser de URL
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));


// Função para conectar ao banco de dados
async function conectarDataBase() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'usuarios'
    });
}

// Rota POST para processar o envio do formulário
app.post('/submit', async (req, res) => {
    console.log('requisição recebida');
    const email = req.body.email;  // dados do formulário
    const senha = req.body.senha; 

    try {
        const connection = await conectarDataBase();
        console.log('conectado com sucesso!');

        // Inserir os dados do formulário no banco de dados
        const resultado =  await connection.execute(
            'INSERT INTO usuariosCadastrados (email, senha) VALUES (?, ?)', [email, senha]
        );

        console.log('Dados inseridos com sucesso', resultado.insertId);

        // Fechar a conexão com o banco de dados
        await connection.end();

        // Responder ao usuário
        res.send('Dados inseridos com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir dados', error);
        res.status(500).send('Erro ao inserir dados no banco de dados.');
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
