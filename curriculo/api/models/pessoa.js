const getPessoaModel = (sequelize, { DataTypes }) => {
  const Pessoa = sequelize.define("pessoa", {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { notEmpty: true },
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Pessoa.associate = (models) => {
    Pessoa.hasMany(models.Experiencia, { onDelete: "CASCADE" });
    Pessoa.hasMany(models.Formacao, { onDelete: "CASCADE" });
    Pessoa.hasMany(models.Habilidade, { onDelete: "CASCADE" });
    Pessoa.hasMany(models.Projeto, { onDelete: "CASCADE" });
  };

  return Pessoa;
};

export default getPessoaModel;