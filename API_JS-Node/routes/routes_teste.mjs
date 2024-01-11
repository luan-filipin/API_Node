import express from "express";
import User from "../models/user.mjs";
import gerarToken from "../service/token.mjs";
import autenticarUsuario from "../service/autenticar_usuario.mjs";
import acesso from "../models/acesso.mjs";

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

// Deletar usuario especifico.
router.delete('/users/:codigo', async (req, res) => {
    try {
        const users = await User.findOneAndDelete({ codigo: req.params.codigo });
        if (!users) {
            return res.status(404).json({ error: "Usuario nao encontrado" });
        }
        return res.json({ menssagem: "Usuario deletado com sucesso!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao deletar usuario." })
    }
});

// Alterar dados do usuario (Obrigatorio todos os campos)
router.put('/users/:codigo', async (req, res) => {
    try {
        const requiredFields = ['codigo', 'name', 'age'];
        const missingFields = requiredFields.filter(field => !(field in req.body));

        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Campos obrigatórios ausentes: ${missingFields.join(', ')}` });
        }

        const users = await User.findOneAndUpdate({ codigo: req.params.codigo }, req.body,
            { new: true });
        if (!users) {
            return res.status(404).json({ Erro: "Usuario não encontrado." });
        }
        return res.json({ message: "Dados atualizado com sucesso!" })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao atualizar dados." });
    }
});

// Alterar dados do usuario (É possivel atualizar apenas um campo especifico)
router.patch('/users/:codigo', async (req, res) => {
    try {
        const users = await User.findOneAndUpdate({ codigo: req.params.codigo }, req.body,
            { new: true });
        if (!users) {
            return res.status(404).json({ Erro: "Usuario não encontrado." });
        }
        return res.json({ message: "Dados atualizado com sucesso!" })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao atualizar dados." });
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


// Criação de acesso.
router.post('/acesso', async (req, res) => {
    try {
        const acessoData = req.body;
        const newAcess = await acesso.create(acessoData);
        return res.json(newAcess);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao criar acesso." });
    }
})



// Criação do Token.
router.post('/login', async (req, res) => {
    const usuario = req.body;

    if (!usuario || !usuario.usuario || !usuario.senha) {
        return res.status(400).json({ mensagem: "Usuario e senha são obrigatorios." })
    }

    try {
        const usuarioAutenticado = await autenticarUsuario(usuario.usuario, usuario.senha)

        const token = gerarToken(usuarioAutenticado);
        res.json({ token })
    } catch (error) {
        if (error.message === 'Usuário ou senha inválidos.') {
            return res.status(401).json({ error: error.message });
        } else {
            return res.status(500).json({ error: "Erro ao efetuar o login." });
        }
    }
})


export default router; 
