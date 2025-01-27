const { DataTypes } = require("sequelize");
const sequelize = require("./database");

// define model
const Tour = sequelize.define(
  "Tour",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: [false, "Tour name is required"],
      unique: true,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: [false, "Tour duration is required"],
      validate: {
        isInt: true,
        min: 1,
      },
    },
    maxGroupSize: {
      type: DataTypes.INTEGER,
      allowNull: [false, "Tour max group size is required"],
      validate: {
        isInt: true,
        min: 1,
      },
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: [false, "Tour difficulty is required"],
      validate: {
        isIn: [["easy", "medium", "difficult"]],
      },
    },
    ratingsAverage: {
      type: DataTypes.FLOAT,
      defaultValue: 4.5,
      validate: {
        isFloat: true,
        min: 1,
        max: 5,
      },
    },
    ratingsQuantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: [false, "Tour price is required"],
      validate: {
        isFloat: true,
        min: 0,
      },
    },
    priceDiscount: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: true,
        min: 0,
        max: 1,
      },
    },
    summary: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: [false, "Tour summary is required"],
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: [false, "Tour description is required"],
    },
    imageCover: {
      type: DataTypes.STRING,
      allowNull: [false, "Tour image cover is required"],
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: [false, "Tour images are required"],
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    startDates: {
      type: DataTypes.ARRAY(DataTypes.DATE),
      allowNull: [false, "Tour start dates are required"],
    },
  },
  {
    tableName: "tours_v2",
    timestamps: false,
  }
);

module.exports = Tour;
