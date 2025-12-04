const express = require("express");
const { setup2FA, verify2FA } = require("../controllers/2FA");
const { isAuthenticated } = require("../middlewares/isAuthenticated");


const router = express.Router();

router.get("/setup", isAuthenticated, setup2FA);
router.post("/verify", isAuthenticated, verify2FA);


module.exports = router;
