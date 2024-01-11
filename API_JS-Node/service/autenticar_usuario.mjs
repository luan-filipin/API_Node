import userSchemaAcesso from "../models/acesso.mjs"
import bcrypt from "bcrypt"

async function autenticarUsuario(usuario, senha) {
    const usuarioNoBanco = await userSchemaAcesso.findOne({ usuario });

    if (!usuarioNoBanco) {
        throw new Error('Usuário ou senha inválidos.');
    }

    const senhaCorreta = await bcrypt.compare(senha, usuarioNoBanco.senha);

    if (!senhaCorreta) {
        throw new Error('Usuário ou senha inválidos.');
    }

    return usuarioNoBanco;
}

export default autenticarUsuario;