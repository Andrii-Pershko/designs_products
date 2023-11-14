const { HttpError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const loginCheck = async (req, res, next) => {
  
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }

  try {
    jwt.verify(token, SECRET_KEY);
    next();
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = loginCheck;
