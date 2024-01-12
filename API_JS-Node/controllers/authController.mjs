import userSchemaAcesso from "../models/acesso.mjs"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import crypto from "crypto";

// Gera uma SECRETKEY aleatoria.
const SECRETKEY = crypto.randomBytes(32).toString('hex');


function gerarToken(dadosUsuario) {
    try {
        const payload = {
            usuario: dadosUsuario.usuario,
            senha: dadosUsuario.senha,
        }
        const options = {
            expiresIn: '1h' 
        }

        const token = jwt.sign(payload, SECRETKEY, options);
        return token;

    } catch (erro) {
        return "Não foi possivel gerar o Token."
    }
}



const verifyToken = (req, res, next) => {
    // Pega o token passado no Headers em "Authorization".
    const tokenHeader = req.headers["authorization"];
    // Aqui estamos verificando se existe o token e separando o TOKEN da palavra Bearer pois o JWT espera apenas o TOKEN.
    const token = tokenHeader && tokenHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            statusCode: 401,
            message: "Não autorizado!"
        });
    }

    jwt.verify(token, SECRETKEY, (err, decoded) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({
                    statusCode: 401,
                    message: "Token expirado!"
                });
            } else {
                
                return res.status(401).json({
                    statusCode: 401,
                    message: "Token inválido!"
                });
            }
        }
        next();
    });
};



const authenticatedRoute = async (req, res) =>{
    res.status(200).json({
        statusCode: 200,
        message: "Rota autenticada."
    })
}


async function autenticarUsuario(usuario, senha) {
    const usuarioNoBanco = await userSchemaAcesso.findOne({ usuario });

    if (!usuarioNoBanco) {
        throw new Error('Usuário ou senha inválidos.');
    }

    const senhaCorreta = bcrypt.compareSync(senha, usuarioNoBanco.senha);

    if (!senhaCorreta) {
        throw new Error('Usuário ou senha inválidos.');
    }

    return usuarioNoBanco;
}


export default {
    gerarToken,
    verifyToken,
    authenticatedRoute,
    autenticarUsuario
}
    