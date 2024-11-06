import { Sequelize } from "sequelize";

const connect = new Sequelize("toughts", "root", "admin123", {
  host: "localhost",
  dialect: "mysql",
  //Desativa o registro em log
  logging: false,
});

// Função assíncrona para conectar ao banco
const connectDatabase = async () => {
  try {
    await connect.authenticate();
    console.log("Conetamos ao MySQL!");
  } catch (error) {
    console.log(`Não foi possível conectar: ${error}`);
  }
};

// Chama a função para estabelecer a conexão com o banco
connectDatabase();

export default connect;
