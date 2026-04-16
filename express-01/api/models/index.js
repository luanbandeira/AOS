import Sequelize from "sequelize";
import pg from "pg";

import getUserModel from "./user";
import getMessageModel from "./message";
import getTarefaModel from "./tarefa";
import getRefreshTokenModel from "./refreshToken"; // 👈 ADICIONA AQUI

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  dialectModule: pg,
});

const models = {
  User: getUserModel(sequelize, Sequelize),
  Message: getMessageModel(sequelize, Sequelize),
  Tarefa: getTarefaModel(sequelize, Sequelize),
  RefreshToken: getRefreshTokenModel(sequelize, Sequelize), // 👈 ADICIONA AQUI
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;