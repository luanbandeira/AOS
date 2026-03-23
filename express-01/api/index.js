require("dotenv").config();

const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const db = require("./models");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", routes);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Banco conectado com sucesso.");

    await db.sequelize.sync({
      force: process.env.ERASE_DATABASE_ON_SYNC === "true",
    });

    console.log("Tabelas sincronizadas com sucesso.");

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`MESSAGE: ${process.env.MESSAGE}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar servidor:", error);
  }
};

start();