const Tour = require("../models/tourModel");
const APIFeatures = require("../utils/apiFeatures");
const { Op } = require("sequelize");
const sequelize = require("../models/database");
// alias top tours
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

// get all tours
exports.getAllTours = async (req, res) => {
  try {
    const features = new APIFeatures(Tour, req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();
    const tours = await Tour.findAll(features.queryOptions);

    res.status(200).json({
      status: "success",
      results: tours.length,
      requestTime: req.requestTime,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// get a tour by id
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findByPk(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// create a new tour
exports.createTour = async (req, res) => {
  console.log(req.body);
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// update a tour
exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.update(req.body, {
      where: { id: req.params.id },
      validate: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        tour: updatedTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent",
    });
  }
};

// delete a tour
exports.deleteTour = async (req, res) => {
  try {
    await Tour.destroy({ where: { id: req.params.id } });
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.findAll({
      where: { ratingsAverage: { [Op.gte]: 4.5 } },
      attributes: [
        "difficulty",
        [sequelize.fn("AVG", sequelize.col("ratingsAverage")), "avgRating"],
        [sequelize.fn("AVG", sequelize.col("price")), "avgPrice"],
        [sequelize.fn("MIN", sequelize.col("price")), "minPrice"],
      ],
      group: ["difficulty"],
    });

    res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// get monthly plan - need to fix
exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;

    const plan = await Tour.findAll({
      attributes: [
        [
          sequelize.fn("DATE_FORMAT", sequelize.col("startDates"), "%M"),
          "month",
        ],
        [sequelize.fn("COUNT", sequelize.col("*")), "numTourStarts"],
        [sequelize.fn("GROUP_CONCAT", sequelize.col("name")), "tours"],
      ],
      where: sequelize.and(
        sequelize.where(sequelize.fn("YEAR", sequelize.col("startDates")), year)
      ),
      group: [sequelize.fn("MONTH", sequelize.col("startDates"))],
      order: [[sequelize.fn("COUNT", sequelize.col("*")), "DESC"]],
      raw: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        plan,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
