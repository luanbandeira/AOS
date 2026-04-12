import Sequelize from "sequelize";
import pg from "pg";

import getPessoaModel from "./pessoa";
import getExperienciaModel from "./experiencia";
import getFormacaoModel from "./formacao";
import getHabilidadeModel from "./habilidade";
import getProjetoModel from "./projeto";

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
  Pessoa: getPessoaModel(sequelize, Sequelize),
  Experiencia: getExperienciaModel(sequelize, Sequelize),
  Formacao: getFormacaoModel(sequelize, Sequelize),
  Habilidade: getHabilidadeModel(sequelize, Sequelize),
  Projeto: getProjetoModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;