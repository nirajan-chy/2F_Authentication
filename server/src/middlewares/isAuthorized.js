const User = require("../models/user");

exports.isAuthorized = (roles) => {
  return async (req, res, next) => {
    try {
      let _id = req._id;
      let result = await User.findById(_id);
      tokenRole = result.role;
      if (roles.includes(tokenRole)) {
        next();
      } else {
        res.status(400).json({
          success: false,
          message: "user not authorized",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
};
