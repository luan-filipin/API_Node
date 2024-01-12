import mongoose from "mongoose";
import { config } from "dotenv";
config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONEXAO_MONGODB);
    console.log("Conectado com MongoDB");
  } catch (error) {
    console.error("Erro ao conectar com MongoDB:", error);
    process.exit(1); 
  }
};

export default connectDB;
