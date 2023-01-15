"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Asset extends Model {
    static associate(models) {
      this.belongsToMany(models.Person, {
        through: "Person_Assets",
        foreignKey: "asset_id",
        as: "people",
      });

      this.belongsToMany(models.Family, {
        through: "Family_Assets",
        foreignKey: "asset_id",
        as: "families",
      });
    }
  }
  Asset.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "asset",
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "harga",
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Asset",
      tableName: "Assets",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  return Asset;
};
