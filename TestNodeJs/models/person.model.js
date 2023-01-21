"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    static associate(models) {
      this.belongsTo(models.Family, {
        foreignKey: "family_id",
        as: "family",
      });

      this.belongsToMany(models.Asset, {
        through: "Person_Assets",
        foreignKey: "person_id",
        as: "assets",
        timestamps: false,
      });
    }
  }
  Person.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jenis_kelamin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Person",
      tableName: "People",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  return Person;
};
