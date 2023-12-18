const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  adminGetAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const {
  isAuthendicateUser,
  isAuthoraisation,
} = require("../middlewares/authendicate");
const Routs = express.Router();

Routs.route("/order/new").post(isAuthendicateUser, newOrder);
Routs.route("/order/:id").get(isAuthendicateUser, getSingleOrder);
Routs.route("/myorders").get(isAuthendicateUser, myOrders);

// Admin routes
Routs.route("/allorders/admin").get(
  isAuthendicateUser,
  isAuthoraisation("admin"),
  adminGetAllOrders
);
Routs.route("/order/admin/:id").put(
  isAuthendicateUser,
  isAuthoraisation("admin"),
  updateOrderStatus
);
Routs.route("/order/admin/:id").delete(
  isAuthendicateUser,
  isAuthoraisation("admin"),
  deleteOrder
);

module.exports = Routs;
