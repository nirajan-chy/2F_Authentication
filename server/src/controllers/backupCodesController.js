const User = require("../models/user");
const generateBackupCodes = require("../utils/backupCodes");

exports.createBackupCodes = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "User not found !",
      });
    const codes = generateBackupCodes();
    user.backupCodes = codes;
    await user.save();
    res.status(200).json({
      success: true,
      message: "backup codes generated successfully ",
      codes: codes,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
