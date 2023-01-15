"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Family extends Model {
    static associate(models) {
      this.hasMany(models.Person, {
        foreignKey: "family_id",
        as: "people",
      });

      this.belongsToMany(models.Family, {
        through: "Family_Assets",
        foreignKey: "family_id",
        as: "assets",
      });
    }
  }
  Family.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      patriach: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "kepala_keluarga",
      },
    },
    {
      sequelize,
      // modelName: "Family",
      paranoid: true,
      modelName: "Family",
      tableName: "Families",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  return Family;
};
