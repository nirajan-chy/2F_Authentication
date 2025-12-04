const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const { secret_key, refresh_key } = require("../api/env");

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
    if (!user.is2FAEnabled) {
      const accessToken = jwt.sign({ _id: user._id }, secret_key, {
        expiresIn: "15min",
      });
      const refreshToken = jwt.sign({ _id: user._id }, refresh_key, {
        expiresIn: "10d",
      });
      res.status(201).json({
        success: true,
        message: "Login successfully (2FA 0ff)",
        user: user,
        refreshToken: refreshToken,
        accessToken: accessToken,
      });
    }
    //2FA on
    if (!token)
      return res.status(200).json({
        success: true,
        message: "2FA enabled , Please provide OTP",
      });
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
      window: 1,
    });
    if (!verified)
      return res.status(500).json({
        success: false,
        message: "Invalid OTP",
      });
    const accessToken = jwt.sign({ _id: user._id }, secret_key, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ _id: user._id }, refresh_key, {
      expiresIn: "10d",
    });
    res.status(200).json({
      success: true,
      message: "login successfully , 2FA is enabled",
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.disbled2FA = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      res.status(400).json({
        success: false,
        message: "user not found",
      });
    user.is2FAEnabled = false;
    user.twoFactorSecret = null;
    await user.save();
    res.status(200).json({
      success: false,
      message: "2FA disabled successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
