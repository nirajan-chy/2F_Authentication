const { default: mongoose } = require("mongoose");
const { MONGO_URI } = require("../api/env");

exports.connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    throw error;
  }
};
