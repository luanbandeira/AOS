import { v4 as uuidv4 } from "uuid";

const getTarefaModel = (sequelize, { DataTypes }) => {
  const Tarefa = sequelize.define("tarefa", {
    objectId: {
      type: DataTypes.STRING,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    concluida: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });

  return Tarefa;
};

export default getTarefaModel;