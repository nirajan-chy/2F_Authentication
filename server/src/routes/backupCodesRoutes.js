const { Router } = require("express");
const { createBackupCodes } = require("../controllers/backupCodesController");

const codesRouter = Router();
codesRouter.post("/generate", createBackupCodes);

module.exports = codesRouter;
