// Este model representa o OPAQUE REFRESH TOKEN salvo no banco.
// Opaque = é só uma string aleatória, sem payload JWT.

const getRefreshTokenModel = (sequelize, { DataTypes }) => {
  const RefreshToken = sequelize.define("refreshToken", {
    token: {
      type: DataTypes.STRING(512),
      allowNull: false,
      unique: true,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // userId é adicionado automaticamente pelo belongsTo
  });

  RefreshToken.associate = (models) => {
    RefreshToken.belongsTo(models.User);
  };

  // Verifica se o token ainda está válido
  RefreshToken.prototype.isExpired = function () {
    return new Date() > this.expiresAt;
  };

  return RefreshToken;
};

export default getRefreshTokenModel;