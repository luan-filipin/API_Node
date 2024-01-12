import acesso from "../models/acesso.mjs";
import authController from "./authController.mjs";

const postOneAcesso = async (req, res) => {
    try {
        const { usuario, senha } = req.body;
        const newAcess = await acesso.create({ usuario, senha });
        return res.json(newAcess);
    } catch (error) {
        // Código 11000 indica erro de duplicidade no MongoDB
        if (error.code === 11000 && error.keyPattern && error.keyPattern.usuario) {
            return res.status(400).json({ error: "Esse nome de usuario ja existe. Escolha outro." });
        }
        console.error(error);
        return res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }
}

const loginParaGerarToken = async (req, res) => {
    const usuario = req.body;

    if (!usuario || !usuario.usuario || !usuario.senha) {
        return res.status(400).json({ mensagem: "Usuario e senha são obrigatorios." })
    }

    try {
        const usuarioAutenticado = await authController.autenticarUsuario(usuario.usuario, usuario.senha)

        const token = authController.gerarToken(usuarioAutenticado);
        res.json({ token })
    } catch (error) {
        if (error.message === 'Usuário ou senha inválidos.') {
            return res.status(401).json({ error: error.message });
        } else {
            return res.status(500).json({
                statusCode: 500,
                message: error.message
            })
        }
    }
}

export default {
    postOneAcesso,
    loginParaGerarToken
}