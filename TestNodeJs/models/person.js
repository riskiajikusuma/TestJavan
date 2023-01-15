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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "nama",
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "jenis_kelamin",
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
