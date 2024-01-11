import express from "express";
import routes_teste from "./routes/routes_teste.mjs";
import connectDB from "./db/conexao.mjs";

const app = express();
app.use(express.json());

connectDB();

app.use('/api', routes_teste)

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
