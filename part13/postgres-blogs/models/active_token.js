const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class ActiveToken extends Model {}

ActiveToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tokenId: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "active_tokens",
  }
);

module.exports = ActiveToken;
