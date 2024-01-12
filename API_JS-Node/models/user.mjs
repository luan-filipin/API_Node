import mongoose from "mongoose"

// Cria um schema para a criação de um usuario.
const userSchema = new mongoose.Schema({
    codigo: {
        
        type: Number,
        unique: true,// Impede a criação do usuario com um codigo ja existente no banco.
        require: true,
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
