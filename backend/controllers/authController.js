const asyncError = require("../middlewares/catchAsyncError");
const Errorhandler = require("../utils/errorHandler");
const userSchm = require("../models/userModel");
const sendToken = require("../utils/jwt");
const sendEmail = require("../utils/email");
const crypto = require("crypto");
const errorHandler = require("../utils/errorHandler");

// register ------------- http://localhost:3050/api/register

exports.userRegister = asyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await userSchm.create({
    name,
    email,
    password,
  });
  sendToken(user, 201, res);
});

// login ------------ http://localhost:3050/api/login

exports.userApi = asyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new Errorhandler("please enter email or  password", 400));
  }

  // findind user detail from DB
  const user = await userSchm.findOne({ email }).select("+password");
  if (!user) {
    return next(new Errorhandler(" invalid email or password", 401));
  }
  // compare the password in bcrypt in model file
  if (!(await user.isValidPassword(password))) {
    return next(new Errorhandler("invalid email or password", 401));
  }

  sendToken(user, 201, res);
});

// logout -------------    http://localhost:3050/api/logout

exports.logoutUser = (req, res, next) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(201)
    .json({
      success: true,
      message: "logged out",
    });
};

// forgot password  --------------     http://localhost:3050/api/forgotpassword

exports.forgotPassword = asyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await userSchm.findOne({ email });
  if (!user) {
    return next(new Errorhandler("user not found with is email", 404));
  }

  const resetToken = user.getResetToken();
  await user.save({ validateBeforeSave: false });

  let BASE_URL = process.env.FRONTEND_URL;
  if (NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }

  // Create reset url
  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `your password reset url is as follows \n\n
  ${resetUrl}\n\n if you have not requested this email,then ignore it`;
  try {
    sendEmail({
      email: user.email,
      subject: "Ecart password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `email sent to ${user.email}`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new Errorhandler(err.message), 500);
  }
});

// reset password   ------------------  http://localhost:3050/api/passwordreset/:token email

exports.resetPassword = asyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await userSchm.findOne({
    resetPasswordToken,
    resetPasswordTokenExpire: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return next(new errorHandler("Password reset token is invalid or expired"));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new errorHandler("Password does not match"));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpire = undefined;
  await user.save({ validateBeforeSave: false });
  sendToken(user, 201, res);
});

// get user profile   --------------   http://localhost:3050/api/myprofile

exports.getUserProfile = asyncError(async (req, res, next) => {
  const user = await userSchm.findById(req.user.id);

  res.status(201).json({
    success: true,
    user,
  });
});

// change password  -----------------  http://localhost:3050/api/password/change

exports.changePassword = asyncError(async (req, res, next) => {
  const user = await userSchm.findById(req.user.id).select("+password");
  //check old password
  if (!(await user.isValidPassword(req.body.oldPassword))) {
    return next(new Errorhandler("Old password is incorrect", 401));
  }

  //assigning new password
  user.password = req.body.password;
  await user.save();
  res.status(200).json({
    success: true,
    message: "sucessfully password changed",
  });
});

// update profile   ---------------------  http://localhost:3050/api/profile/update

exports.updateProfile = asyncError(async (req, res, next) => {
  let newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await userSchm.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    message: "profile updated sucessfully",
    user,
  });
});

// admin Get all user  ----------  http://localhost:3050/api/admin/users

exports.adminGetAllUser = asyncError(async (req, res, next) => {
  const users = await userSchm.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// admin  Get specific user data  ----------------  http://localhost:3050/api/admin/users/:id

exports.adminGetSpecificuser = asyncError(async (req, res, next) => {
  const users = await userSchm.findById(req.params.id);
  if (!users) {
    return next(
      new errorHandler(`user not found with is ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    users,
  });
});

// admin  Update user  -----------  http://localhost:3050/api/admin/users/:id

exports.adminUpdateUser = asyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const users = await userSchm.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    users,
  });
});

// admin Delete users  --------------- http://localhost:3050/api/admin/users/:id

exports.adminDeleteUser = asyncError(async (req, res, next) => {
  const users = await userSchm.findById(req.params.id);
  if (!users) {
    return next(
      new errorHandler(`user not found with is ${req.params.id}`, 400)
    );
  }

  await users.remove();
  res.status(201).json({
    success: true,
    message: "sucessfully deleted",
  });
});
