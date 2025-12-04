const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    twoFactorSecret: {
      type: String,
    },
    is2FAEnabled: {
      type: Boolean,
      default: false,
    },
    backupCodes :{
      type : String,
      default : [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
