import mongoose from "mongoose";
import { config } from "dotenv";
config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONEXAO_MONGODB);
    console.log("Conectado com MongoDB");
    // Trata o retorno caso nao seja possivel realizar a conexão com o banco.
  } catch (error) {
    console.error("Erro ao conectar com MongoDB:", error);
    // Encerrar o aplicativo em caso de erro de conexão
    process.exit(1); 
  }
};

export default connectDB;
