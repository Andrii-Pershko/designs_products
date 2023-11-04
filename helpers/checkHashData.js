const bcrypt = require("bcryptjs");

const checkHashData = async (enterData, userHashData) => {
  const compareResult = await bcrypt.compare(enterData, userHashData);

  return compareResult;
};

module.exports = checkHashData;
