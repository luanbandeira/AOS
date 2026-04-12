const getFormacaoModel = (sequelize, { DataTypes }) => {
  const Formacao = sequelize.define("formacao", {
    instituicao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    curso: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    periodo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
  });

  Formacao.associate = (models) => {
    Formacao.belongsTo(models.Pessoa);
  };

  return Formacao;
};

export default getFormacaoModel;