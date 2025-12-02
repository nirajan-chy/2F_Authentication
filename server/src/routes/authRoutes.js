const { Router } = require("express");
const { signup } = require("../controllers/authController");

const authRouter = Router();
authRouter.post("/sign", signup);

module.exports = authRouter;
