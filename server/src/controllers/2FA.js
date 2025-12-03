const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const User = require("../models/user");

exports.setup2FA = async (req, res, next) => {
  try {
    let _id = req._id;
    const user = await User.findById(_id);
    const secret = speakeasy.generateSecret({
      name: `NirajanApp (${user.email})`,
    });
    user.twoFactorSecret = secret.base32;
    user.is2FAEnabled = false;
    await user.save();

    qrcode.toDataURL(secret.otpauth_url, (err, dataUrl) => {
      res.json({
        success: true,
        qr: dataUrl,
        message: "Scan this QR using Google Authenticator",
      });
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.verify2FA = async (req, res, next) => {
  try {
    let _id = req._id;
    let { token } = req.body;
    const user = await User.findById(_id);
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
      window: 1,
    });
    if (!verified)
      return res.status(400).json({
        success: false,
        message: "Invalid or expires  OTP",
      });
      user.is2FAEnabled = true;
      await user.save();
      res.status(201).json({
        success : true,
        message : "2FA enabled successfully"
      })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
