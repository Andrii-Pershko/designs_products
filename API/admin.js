const isAdmin = (req, res) => {
  const data = req.body;
  const result = adminCheck(data);

  res.send(result);
};

module.exports = isAdmin;
