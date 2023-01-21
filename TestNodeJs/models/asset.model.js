"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Asset extends Model {
    static associate(models) {
      this.belongsToMany(models.Person, {
        through: "Person_Assets",
        foreignKey: "asset_id",
        as: "people",
        timestamps: false,
      });

      this.belongsToMany(models.Family, {
        through: "Family_Assets",
        foreignKey: "asset_id",
        as: "families",
        timestamps: false,
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
      asset: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      harga: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
