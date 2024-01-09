// Importe da biblioteca 'Oracledb'
const oracledb = require('oracledb');

// Função para conexão com o banco de dados Oracle.
const connectDB = async () => {
  try {
    // Realiza a consulta no banco com base nos dados para acesso abaixo.
    await oracledb.createPool({
      user: 'vetcancao',
      password: 'vetgt@2)L3',
      connectString: '192.168.3.170:1521/seniorhml',
    });
    // Apenas para mostrar no terminal que foi conectado.
    console.log('Conectado ao Oracle Database');
    // Trata a exceção caso a conexão nao seja estabelecida.
  } catch (error) {
    console.error('Erro ao conectar ao Oracle Database:', error);
    // O trecho abaixo é usado para encerrar o Node.js caso não seja possivel realizar a conexão.
    process.exit(1);
  }
};

// informa a função ou objeto que pode ser importado em outro arquivo.
module.exports = connectDB;
