import express from "express";
import User from "../models/user.mjs";

const router = express.Router();

// Consultar todos os usuario.
router.get('/users', async (req, res) => {

    const users = await User.find();
    return res.json(users);
});

// Consultar usuario pelo codigo.
router.get('/users/:codigo', async (req, res) => {
    try {
        const users = await User.findOne({ codigo: req.params.codigo });
        if (!users) {
            return res.status(404).json({ error: "Usuario nao encontrado" });
        }

        return res.json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar usuario." })
    }
});

// Criação do usuario.
router.post('/users', async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await User.create(userData);
        return res.json(newUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao criar usuário." });
    }
});

export default router;
