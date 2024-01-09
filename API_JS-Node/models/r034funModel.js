const oracledb = require('oracledb');

/**
 * A função getEmployeesByFilial realiza uma consulta no banco de dados e retorna o mesmo em JSon.
 * O sync indica que dentro da função pode haver solicitações "await" que deve esperar serem executadas.
 */
const getEmployeesByFilial = async (codFil) => {
  let connection;

  try {
    //A linha abaixo realiza a coxão com o banco de dados.
    connection = await oracledb.getConnection();
    //Logo abaixo realizamos uma consulta SQL com a connection aberta.
    const result = await connection.execute('SELECT NOMFUN, NUMCAD, DATADM FROM r034fun WHERE codfil = :codFil', [codFil]);
    // O retorno é realizado dado por dado.
    return result.rows;
    // O catch é apenas caso a colicitação nao seja realizado com sucesso.
  } catch (error) {
    throw new Error('Erro ao obter funcionários do banco de dados Oracle: ' + error.message);
    // O finally é usado para que seja executado um trecho de codigo independentemente de haver uma exceção.
  } finally {
    // O if abaixo verifica se a conexão ainda esta aberta.
    if (connection) {
      try {
        // Nesse caso se a conexão ainda estiver aberta podemos seguir com o fechamento do trecho abaixo.
        await connection.close();
        // Trata a exceção caso o fechamento da conexão nao seja realizado.
      } catch (error) {
        console.error('Erro ao fechar a conexão Oracle:', error);
      }
    }
  }
};

/**
 * Esse trecho abaixo é para que seja possivel ultilizar a função getEmployeesByFilial em outro arquivo.
 * Lebrando que precisa importa o arquivo todo e só é possivel usar as funções ou objetos que estação dentro do trecho de codigo abaixo.
 */
module.exports = {
  getEmployeesByFilial,
};
