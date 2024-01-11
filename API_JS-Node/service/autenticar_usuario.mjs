import userSchemaAcesso from "../models/acesso.mjs"

async function autenticarUsuario(usuario, senha) {

    const usuarioNoBanco = await userSchemaAcesso.findOne({ usuario, senha });
    if (!usuarioNoBanco) {
        throw new Error('Usuário ou senha inválidos.');
    }
    return usuarioNoBanco;
}

export default autenticarUsuario;