import jwt from "jsonwebtoken";

const secretKey = 'testando';

function gerarToken(dadosUsuario) {
    try{
        const payload = {
            usuario: dadosUsuario.usuario,
            senha: dadosUsuario.senha,
        }
        const options = {
            expiresIn: '1h'
        }
    
        const token = jwt.sign(payload, secretKey, options);
        return token;

    }catch(erro){
        return "Não foi possivel gerar o Token."
    }
}


export default gerarToken;