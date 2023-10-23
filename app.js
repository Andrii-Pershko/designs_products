const express = require("express");
const adminCheck = require("./middlewares/admin_check");
const logger = require("morgan");
const productsRouter = require("./routes/products");
const cors = require("cors");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

require("dotenv").config();

app.use(cors());
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
