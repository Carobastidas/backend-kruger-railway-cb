import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
    "mongodb+srv://Caro:Cibe2127@krugerbackendapp.wbppg.mongodb.net/products?retryWrites=true&w=majority&appName=KrugerBackendApp");
    console.log("Conexión a la base de datos exitosa");
  } catch (error) {
    console.error("Error al conectar a la base de datos", error);
  }
};
