import express from "express";
import usersController from "../controllers/usersController.mjs";
import acessoController from "../controllers/acessoController.mjs";
import authController from "../controllers/authController.mjs";

const router = express.Router();

// Criação do usuario.
router.post('/users', authController.verifyToken, usersController.postOneUser);
// Consultar todos os usuario.
router.get('/users', authController.verifyToken, usersController.getAllUsers), authController.authenticatedRoute;
// Consultar usuario pelo codigo.
router.get('/users/:codigo', authController.verifyToken, usersController.getOneUser);
// Deletar usuario especifico.
router.delete('/users/:codigo', authController.verifyToken, usersController.deleteOneUser);
// Alterar dados do usuario (Obrigatorio todos os campos).
router.put('/users/:codigo', authController.verifyToken, usersController.updateOneUser);
// Alterar dados do usuario (É possivel atualizar apenas um campo especifico).
router.patch('/users/:codigo', authController.verifyToken, usersController.updateAllUsers);

// Criação de acesso para gerar TOKEN
router.post('/acesso', acessoController.postOneAcesso);
// Geração de TOKEN.
router.post('/login', acessoController.loginParaGerarToken);


export default router; 
