const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { secret_key } = require("../api/env");

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });

    const exist = await User.findOne({ email });
    if (exist)
      return res.status(400).json({
        success: false,
        message: "user already exist",
      });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(400).json({
      success: true,
      result: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(500).json({
        success: false,
        message: "email and passwords are required",
      });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "user not exist",
      });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid Credentials");
    }


    // when 2FA is on 

    const accessToken = jwt.sign({_id : user._id} , secret_key , {expiresIn : "15min"})
    const refreshToken = jwt.sign({_id : user._id} , )

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
