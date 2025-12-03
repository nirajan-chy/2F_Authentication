const { Router } = require("express");
const { registerUser, loginUser } = require("../controllers/user");

const authRouter = Router();
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

module.exports = authRouter;
