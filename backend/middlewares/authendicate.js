const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.isAuthendicateUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new errorHandler("first login to handle this resource"));
  }

  // this can  verify  the tokens
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});

// this middleware is authorise the role and then allowed it..
exports.isAuthoraisation = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new errorHandler(`Role ${req.user.role} is not allowed`, 401)
      );
    }
    next();
  };
};
