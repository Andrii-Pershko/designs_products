const checkHashData = require("./checkHashData");

const adminCheck = async ({ password = "", login = "" }) => {
  const checkPass = await checkHashData(password, process.env.PASS);
  const checkLogin = await checkHashData(login, process.env.LOGIN);

  if (checkLogin && checkPass) {
    return true;
  }
  return false;
};

module.exports = adminCheck;
