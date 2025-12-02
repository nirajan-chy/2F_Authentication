const { default: mongoose } = require("mongoose");

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
  otpCode: {
    type: String,
    default: null,
  },

  otpExpires: {
    type: Date,
    default: null,
  },
});
const User = mongoose.model("user", userSchema);
module.exports = User;
