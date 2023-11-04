const express = require("express");
const adminCheck = require("./helpers/adminCheck");
const logger = require("morgan");
const order = require("./routes/order");
require("dotenv").config();
const productsRouter = require("./routes/products");
const adminRouter = require("./routes/admin");
const cors = require("cors");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(cors());
// app.use(logger(formatsLogger));
app.use(express.json());
// app.use(express.static("public"));

app.use("/super_admin", adminRouter);
app.use("/products", productsRouter);
app.use("/order", order);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log("Example", err);
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
