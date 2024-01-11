import mongoose from "mongoose"

// Cria um schema para a criação de um usuario.
const userSchema = new mongoose.Schema({
    // Primeiro informamos o nome da coluna.
    codigo: {
        // Depois configuramos a coluna com type, require..
        type: Number,
        unique: true,// Impede a criação do usuario com um codigo ja existente no banco.
        require: true, // Campo obrigatorio.
    },
    name: {
        type: String,
        require: true,
    },
    age: {
        type: Number,
        require: true,
    },
    createadAt: {
        type: Date,
        default: Date.now()
    }
})

// Permite que o schema seja utilizado em outro arquivo.
export default mongoose.model('user', userSchema)
