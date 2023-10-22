const express = require("express");
const adminCheck = require("./admin_check");
const logger = require("morgan");
const productsRouter = require("./routes/products");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const router = express.Router();
require("dotenv").config();

app.use(logger(formatsLogger));
app.use(express.json());

app.get("/super_admin", (req, res) => {
  const data = req.body;
  console.log("Example", data);
  const result = adminCheck(data);
  if (result) {
    res.send("<h1> You ADMIN</h1>");
  }
  res.send("<h1> You not ADMIN</h1>");
});

app.use("/products", productsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log("Example", err);
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
