const getHabilidadeModel = (sequelize, { DataTypes }) => {
  const Habilidade = sequelize.define("habilidade", {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    nivel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Habilidade.associate = (models) => {
    Habilidade.belongsTo(models.Pessoa);
  };

  return Habilidade;
};

export default getHabilidadeModel;