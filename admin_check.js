const adminCheck = ({ password, login }) => {
  const checkLogin = login === process.env.LOGIN;
  const checkPass = password === process.env.PASS;
  if (checkLogin && checkPass) {
    return true;
  }
  return false;
};

module.exports = adminCheck;
