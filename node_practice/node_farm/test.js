const fs = require("fs");

const tempCard = fs.readFileSync(
  `${__dirname}/templates/template_card.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev_data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

console.log(tempCard.replace("{%PRODUCT_NAME%}", dataObj[0].productName));
// console.log(tempCard);
