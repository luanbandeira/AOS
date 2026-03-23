const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, DataTypes);
db.Message = require("./message")(sequelize, DataTypes);

db.User.hasMany(db.Message, {
  foreignKey: "userId",
  as: "messages",
});

db.Message.belongsTo(db.User, {
  foreignKey: "userId",
  as: "user",
});

module.exports = db;