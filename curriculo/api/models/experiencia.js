const getExperienciaModel = (sequelize, { DataTypes }) => {
  const Experiencia = sequelize.define("experiencia", {
    empresa: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    periodo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  Experiencia.associate = (models) => {
    Experiencia.belongsTo(models.Pessoa);
  };

  return Experiencia;
};

export default getExperienciaModel;