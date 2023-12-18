const express = require("express");
const {
  getProduct,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createReview,
  getReviews,
  deleteReview,
  adminGetProduct,
} = require("../controllers/productController");
const {
  isAuthendicateUser,
  isAuthoraisation,
} = require("../middlewares/authendicate");

const rout = express.Router();

const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "uploads/products"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

rout.route("/getproduct").get(getProduct);

rout.route("/singleProduct/:id").get(getSingleProduct);

rout.route("/review").put(isAuthendicateUser, createReview);
rout.route("/review").get(getReviews);
rout.route("/review").delete(deleteReview);

//admin routes
rout
  .route("/admin/newproduct")
  .post(
    isAuthendicateUser,
    isAuthoraisation("admin"),
    upload.array("images"),
    newProduct
  );

rout
  .route("/admin/products")
  .get(isAuthendicateUser, isAuthoraisation("admin"), adminGetProduct);

rout
  .route("/admin/deleteproduct/:id")
  .delete(isAuthendicateUser, isAuthoraisation("admin"), deleteProduct);

rout
  .route("/admin/updateProduct/:id")
  .put(
    isAuthendicateUser,
    isAuthoraisation("admin"),
    upload.array("images"),
    updateProduct
  );

module.exports = rout;
