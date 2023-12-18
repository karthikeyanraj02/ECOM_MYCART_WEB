const express = require("express");
const {
  userRegister,
  userApi,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  changePassword,
  updateProfile,
  adminGetAllUser,
  adminGetSpecificuser,
  adminUpdateUser,
  adminDeleteUser,
} = require("../controllers/authController");
const {
  isAuthendicateUser,
  isAuthoraisation,
} = require("../middlewares/authendicate");
const Rout = express.Router();

Rout.route("/register").post(userRegister);
Rout.route("/login").post(userApi);
Rout.route("/logout").get(logoutUser);
Rout.route("/forgotpassword").post(forgotPassword);
Rout.route("/passwordreset/:token").post(resetPassword);
Rout.route("/myprofile").get(isAuthendicateUser, getUserProfile);
Rout.route("/password/change").put(isAuthendicateUser, changePassword);
Rout.route("/profile/update").put(isAuthendicateUser, updateProfile);

// admin Routes
Rout.route("/admin/users").get(
  isAuthendicateUser,
  isAuthoraisation("admin"),
  adminGetAllUser
);
Rout.route("/admin/users/:id").get(
  isAuthendicateUser,
  isAuthoraisation("admin"),
  adminGetSpecificuser
);
Rout.route("/admin/users/:id").get(
  isAuthendicateUser,
  isAuthoraisation("admin"),
  adminGetSpecificuser
);
Rout.route("/admin/users/:id").put(
  isAuthendicateUser,
  isAuthoraisation("admin"),
  adminUpdateUser
);
Rout.route("/admin/users/:id").delete(
  isAuthendicateUser,
  isAuthoraisation("admin"),
  adminDeleteUser
);

module.exports = Rout;
