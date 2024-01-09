const express = require('express');
const connectDB = require('./db/conexao');
const routes = require('./routes/rota_teste');

const app = express();
// Especifica a port
const port = 3000;

// Conectar ao Oracle Database
connectDB();

// Adicionar middleware para processar dados JSON
app.use(express.json());

// Adicionar rotas da API
app.use('/api', routes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
