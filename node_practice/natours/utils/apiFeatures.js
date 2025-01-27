const { Op } = require("sequelize");
class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this.queryOptions = {};
  }

  filter() {
    // 1A. basic filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B. advanced filtering
    let whereClause = {};
    Object.keys(queryObj).forEach((key) => {
      if (typeof queryObj[key] === "object") {
        // Handle operators like {price: {gte: 500}}
        whereClause[key] = {};
        Object.keys(queryObj[key]).forEach((operator) => {
          whereClause[key][Op[operator]] = queryObj[key][operator];
        });
      } else {
        // Handle simple equality {difficulty: 'easy'}
        whereClause[key] = queryObj[key];
      }
    });
    this.queryOptions = { ...this.queryOptions, where: whereClause };
    return this;
  }

  // 2. sorting
  sort() {
    let orderClause = [];
    if (this.queryString.sort) {
      const sortFields = this.queryString.sort.split(",");
      orderClause = sortFields.map((field) => {
        if (field.startsWith("-")) {
          return [field.substring(1), "DESC"];
        } else {
          return [field, "ASC"];
        }
      });
    } else {
      orderClause = [["price", "ASC"]];
    }
    this.queryOptions = { ...this.queryOptions, order: orderClause };
    return this;
  }

  // 3. fields limiting
  limitFields() {
    let attributes = undefined;
    if (this.queryString.fields) {
      attributes = this.queryString.fields.split(",");
    } else {
      attributes = { exclude: ["createdAt", "updatedAt"] };
    }
    this.queryOptions = { ...this.queryOptions, attributes: attributes };
    return this; // Return this for method chaining
  }

  // 4. pagination
  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.queryOptions = { ...this.queryOptions, limit: limit, offset: skip };
    return this;
  }
}

module.exports = APIFeatures;
