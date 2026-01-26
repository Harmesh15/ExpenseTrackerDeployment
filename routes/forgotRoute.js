const express = require("express");
const route = express.Router();
const forgotController = require("../controller/forgotController");

console.log("hit route");
route.post("/password/forgotpassword",forgotController.generateforgotpasswd);

module.exports = route;