import mongoose from "mongoose"
import bcrypt from "bcrypt"


// Cria um schema para a criação de um usuario.
const userSchemaAcesso = new mongoose.Schema({
    usuario: {
        type: String,
        unique: true,
        require: true, 
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

export default mongoose.model('acesso', userSchemaAcesso)
