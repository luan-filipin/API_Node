import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    age:{
        type: Number,
        require: true,
    },
    createadAt:{
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('user', userSchema)