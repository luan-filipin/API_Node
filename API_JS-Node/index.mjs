import mongoose from "mongoose";
import user from "./models/user.js"
import express from "express"

const app = express();
app.use(express.json());

app.post('/users', async (req, res) => {
  const user = request.body;
  const newUser = await user
  return response.json();
})

mongoose.connect('mongodb+srv://gttech:4ATfTfkgRtn7yo3h@cluster0.52dohn9.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log("Conectado com MongoDB"))
  .catch(() => console.log("Deu Ruim!"))

// Iniciar o servidor
app.listen( () => {
});
