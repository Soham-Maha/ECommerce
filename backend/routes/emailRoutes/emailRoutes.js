const express = require("express");
const { sendEmailMsgCtrl } = require("../../controllers/Email/emailMsgCtrl.js");
const userAuth = require("../../middleware/auth/Auth.js");

const emailrouter = express.Router();

emailrouter.post("/", userAuth, sendEmailMsgCtrl);

module.exports = emailrouter;
