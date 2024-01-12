import express from "express";
import routes_teste from "./routes/routes.mjs";
import connectDB from "./db/conexao.mjs";

const app = express();
app.use(express.json());

connectDB();

// Cria um Blueprint exe: localhost:3000/api/rota criada.
app.use('/api', routes_teste)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
