const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter the name "],
  },
  email: {
    type: String,
    required: [true, "please enter the email"],
    unique: true,
    validate: [validator.isEmail, "please enter the valid email address"],
  },
  password: {
    type: String,
    required: [true, "please enter the password"],
    maxlength: [6, "password exceed 6 character"],
    select: false,
  },

  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Schema have a pre methods thats works before data to store in database

userSchema.pre("save", async function (next) {
  // is modifiec is a schema property
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token creating  // return is important

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// comparing the enterd password and old password
userSchema.methods.isValidPassword = async function (enteredpassword) {
  return bcrypt.compare(enteredpassword, this.password);
};

// generate reset token

userSchema.methods.getResetToken = function () {
  // Generate a random token.
  const token = crypto.randomBytes(20).toString("hex");

  // Hash the token using SHA-256.
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // Set the token expiration time.
  this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;

  return token;
};

let model = mongoose.model("user", userSchema);
module.exports = model;
