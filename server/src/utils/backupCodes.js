const crypto = require("crypto");

const generateBackupCodes = () => {
  const codes = [];
  for (let i = 0; i < 10; i++) {
    codes.push(crypto.randomBytes(3).toString("hex"));
  }
  return codes;
};

module.exports = generateBackupCodes;
