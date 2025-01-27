const queryObj = { difficulty: "easy", duration: { gte: "5" } };
console.log(typeof queryObj);
let queryStr = JSON.stringify(queryObj);
queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `[Op.${match}]`);
console.log(queryStr);

const whereClause = JSON.parse(queryStr);
console.log(typeof whereClause["duration"]);
