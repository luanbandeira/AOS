require("dotenv").config();

const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const db = require("./models");

const app = express();

app.use(cors());
app.use(express.json());

let initialized = false;

app.use(async (req, res, next) => {
  try {
    if (!initialized) {
      await db.sequelize.authenticate();
      console.log("Banco conectado com sucesso.");

      await db.sequelize.sync({
        force: process.env.ERASE_DATABASE_ON_SYNC === "true",
      });

      console.log("Tabelas sincronizadas com sucesso.");
      console.log(`MESSAGE: ${process.env.MESSAGE}`);

      initialized = true;
    }

    next();
  } catch (error) {
    console.error("Erro ao inicializar aplicação:", error);
    return res.status(500).json({
      error: "Erro ao iniciar aplicação",
      details: error.message,
    });
  }
});

app.use("/", routes);

module.exports = app;