const nodemailer = require("nodemailer")
const { user, pass } = require("../api/env")
const transpoter = nodemailer.createTransport({
    service : "email",
    auth:{
        user : user,
        pass : pass
    }
})