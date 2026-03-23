require("dotenv").config();

const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const db = require("./models");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", routes);

let isDbReady = false;

async function prepareApp() {
  if (isDbReady) return;

  await db.sequelize.authenticate();
  console.log("Banco conectado com sucesso.");

  await db.sequelize.sync({
    force: process.env.ERASE_DATABASE_ON_SYNC === "true",
  });

  console.log("Tabelas sincronizadas com sucesso.");
  console.log(`MESSAGE: ${process.env.MESSAGE}`);

  isDbReady = true;
}

app.use(async (req, res, next) => {
  try {
    await prepareApp();
    next();
  } catch (error) {
    console.error("Erro ao preparar app:", error);
    res.status(500).json({
      error: "Erro ao iniciar aplicação",
      details: error.message,
    });
  }
});

module.exports = app