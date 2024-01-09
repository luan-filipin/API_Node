const express = require('express');
const model = require('../models/r034funModel');
const router = express.Router();

/**
 * Rota para acesso via url 'localhost:3000/api/teste/ o numero da filial'.
 * Nesse caso essa rota recebe um parametro numerico no final dela informando a nomero da filial para pesquisa.
 */
router.get('/teste/:codFil', async (req, res) => {
  const { codFil } = req.params;

  try {
    // Nesse trecho ele passar o parametro recebido na rota para a função getEmployeesByFilial que esta dentro do model e armazena dentro da variavel employees
    const employees = await model.getEmployeesByFilial(codFil);
    // Aqui ele retonar a consulta como JSON para o solicitando.
    res.json(employees);
    // Trata a exceção caso nao seja possivel fazer a consulta e informa a mensagem do erro caso o mesmo seja status 500
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Informa que tipo de função ou objeto pode ser importado em outro arquivo.
module.exports = router;
