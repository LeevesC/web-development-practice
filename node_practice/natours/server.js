const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const sequelize = require("./models/database");

// authenticate connection to database
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to database");
    // sync model with database
    return sequelize.sync();
  })
  .then(() => console.log("Synced with database"))
  .catch((err) => console.log(err));

// start server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port} ...`);
});
