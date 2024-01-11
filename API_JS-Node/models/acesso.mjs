import mongoose from "mongoose"

// Cria um schema para a criação de um usuario.
const userSchemaAcesso = new mongoose.Schema({
    // Primeiro informamos o nome da coluna.
    usuario: {
        // Depois configuramos a coluna com type, require..
        type: String,
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


// Permite que o schema seja utilizado em outro arquivo.
export default mongoose.model('acesso', userSchemaAcesso)
