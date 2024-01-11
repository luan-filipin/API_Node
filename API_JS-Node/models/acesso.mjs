import mongoose from "mongoose"
import bcrypt from "bcrypt"


// Cria um schema para a criação de um usuario.
const userSchemaAcesso = new mongoose.Schema({
    // Primeiro informamos o nome da coluna.
    usuario: {
        // Depois configuramos a coluna com type, require..
        type: String,
        unique: true, // Não permite a criação de usuarios existe ja no banco.
        require: true, // Campo obrigatorio.
    },
    senha: {
        type: String,
        require: true,
    },
    createadAt: {
        type: Date,
        default: Date.now()
    }
})



// Antes de salvar a senha no banco ele criptografa a senha.
userSchemaAcesso.pre("save", async function (next) {
    if (!this.isModified("senha")) {
        return next();
    }

    try {
        const hashedSenha = await bcrypt.hash(this.senha, 10);
        this.senha = hashedSenha;
        next();
    } catch (error) {
        return next(error);
    }
});

// Permite que o schema seja utilizado em outro arquivo.
export default mongoose.model('acesso', userSchemaAcesso)
