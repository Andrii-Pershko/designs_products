const { cntrlWrappers } = require("../helpers");
const adminCheck = require("../helpers/adminCheck");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const refreshAdmin = async (req, res) => {
  
};

const isAdmin = async (req, res) => {
  const data = req.body;
  const result = await adminCheck(data);

  if (!result) {
    return res.status(401).json({ message: "Login or password is wrong" });
  }

  const token = jwt.sign({ user: "Admin" }, SECRET_KEY, { expiresIn: "23h" });

  res.json({ result, token });
};

module.exports = {
  isAdmin: cntrlWrappers(isAdmin),
  refreshAdmin: cntrlWrappers(refreshAdmin),
};
