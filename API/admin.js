const adminCheck = require("../helpers/admin_check");

const isAdmin = async (req, res) => {
  const data = req.body;
  const result = adminCheck(data);

  res.send(result);
};

module.exports = isAdmin;
