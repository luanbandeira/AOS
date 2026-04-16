import bcrypt from "bcryptjs";

const getUserModel = (sequelize, { DataTypes }) => {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { notEmpty: true },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { notEmpty: true },
    },
    // NOVO: campo de senha
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true, len: [6, 100] },
    },
  });

  // Hook: faz hash da senha antes de salvar
  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 12);
  });

  // Hook: faz hash se a senha foi alterada
  User.beforeUpdate(async (user) => {
    if (user.changed("password")) {
      user.password = await bcrypt.hash(user.password, 12);
    }
  });

  // Método de instância: compara senha
  User.prototype.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  User.associate = (models) => {
    User.hasMany(models.Message, { onDelete: "CASCADE" });
    User.hasMany(models.RefreshToken, { onDelete: "CASCADE" }); // NOVO
  };

  User.findByLogin = async (login) => {
    let user = await User.findOne({ where: { username: login } });
    if (!user) {
      user = await User.findOne({ where: { email: login } });
    }
    return user;
  };

  return User;
};

export default getUserModel;