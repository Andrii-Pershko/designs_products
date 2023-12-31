const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST = process.env.DB_HOST;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3001, () => {
      console.log("Example app listening on port 3001!");
    });
  })
  .catch((error) => {
    console.log("Database connection not successful");
    console.log(error.message);
    process.exit(1);
  });
