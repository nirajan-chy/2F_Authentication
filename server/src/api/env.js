const dotenv = require("dotenv");
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const secret_key = process.env.SECRET_KEY;
const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

module.exports = {
  MONGO_URI,
  PORT,
  secret_key,
  user,
  pass,
};
