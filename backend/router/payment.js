const express = require("express");
const {
  processPayment,
  sendStripeApi,
} = require("../controllers/paymentController");
const { isAuthendicateUser } = require("../middlewares/authendicate");
const Rout = express.Router();

Rout.route("/payment/process").post(isAuthendicateUser, processPayment);
Rout.route("/stripeapi").get(isAuthendicateUser, sendStripeApi);

module.exports = Rout;
