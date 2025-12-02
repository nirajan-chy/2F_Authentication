const { default: mongoose, Schema } = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  is2FAEnable: {
    type: Boolean,
    default: false,
  },
  twoFAsecret: {
    type: String,
  },
});
const User = mongoose.model("user", userSchema);
module.exports = User;
