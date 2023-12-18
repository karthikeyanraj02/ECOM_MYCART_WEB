const productSchema = require("../models/productModel");
const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

// getProduct ----------- http://localhost:3050/api/getproduct
exports.getProduct = async (req, res, next) => {
  const resperpage = 7;

  const buildQuery = () => {
    return new ApiFeatures(productSchema.find(), req.query).search().filter();
  };
  const filteredProductSCount = await buildQuery().query.countDocuments({});
  const totalProductCount = await productSchema.countDocuments({});
  let productCount = totalProductCount;

  if (filteredProductSCount !== totalProductCount) {
    productCount = filteredProductSCount;
  }

  const product = await buildQuery().paginate(resperpage).query;

  res.status(200).json({
    sucess: true,
    count: productCount,
    resperpage,
    product,
  });
};

// newProduct ------------ http://localhost:3050/api/newproduct
exports.newProduct = catchAsyncError(async (req, res, next) => {
  // this is for uploads the images for products
  let images = [];
  let BASE_URL = process.env.BACKEND_URL;

  if (NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }

  // Check if req.files is defined and has a length property
  if (req.files && req.files.length > 0) {
    req.files.forEach((file) => {
      let url = `${BASE_URL}/uploads/products/${file.originalname}`;
      images.push({ image: url });
    });
  }

  req.body.images = images;
  // to get a user id who will be posting this product
  req.body.user = req.user.id;
  const product = await productSchema.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// getSingleProduct  -------------- http://localhost:3050/api/singleProduct/--------id
exports.getSingleProduct = async (req, res, next) => {
  const product = await productSchema.findById(req.params.id);
  if (!product) {
    return next(new errorHandler("product not found", 400)); // error handllers
  }
  res.status(201).json({
    sucess: true,
    product,
  });
};

// updateProduct  ------------- http://localhost:3050/api/updateproduct/id------

exports.updateProduct = async (req, res, next) => {
  let product = await productSchema.findById(req.params.id);

  let images = [];

  if (req.body.imagesCleared === "false") {
    images = product.images;
  }

  let BASE_URL = process.env.BACKEND_URL;

  if (NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }

  // Check if req.files is defined and has a length property
  if (req.files && req.files.length > 0) {
    req.files.forEach((file) => {
      let url = `${process.env.BACKEND_URL}/uploads/products/${file.originalname}`;
      images.push({ image: url });
    });
  }

  req.body.images = images;

  if (!product) {
    return res.status(404).json({
      sucess: false,
      message: "product not found",
    });
  }
  product = await productSchema.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    sucess: true,
    product,
  });
};

exports.deleteProduct = async (req, res, next) => {
  let product = await productSchema.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      sucess: false,
      message: "product not found",
    });
  }

  await product.remove();
  res.status(200).json({
    sucess: true,
    message: "product deleted sucessfully",
  });
};

// Create Review --------

//Create Review - api/v1/review
exports.createReview = catchAsyncError(async (req, res, next) => {
  const { productId, rating, comment } = req.body;

  const review = {
    user: req.user.id,
    rating,
    comment,
  };

  const product = await productSchema.findById(productId);

  // Check if the user has already reviewed the product
  const isReviewed = product.reviews.find((review) => {
    return review.user.toString() === req.user.id.toString();
  });

  if (isReviewed) {
    // Update the existing review
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user.id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    // Create a new review
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  // Calculate the average rating
  product.ratings =
    product.reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / product.reviews.length;

  product.ratings = isNaN(product.ratings) ? 0 : product.ratings;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
// get review  ----------- http://localhost:3050/api/review?id= --------------------------

exports.getReviews = catchAsyncError(async (req, res, next) => {
  const product = await productSchema.findById(req.query.id);

  res.status(200).json({
    success: true,
    review: product.reviews,
  });
});

//Delete Review - api/v1/review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  // Get the Mongoose document for the product
  const product = await productSchema.findById(req.query.productId);

  // Filter the reviews to remove the review being deleted
  const reviews = product.reviews.filter((review) => {
    return review._id.toString() !== req.query.id.toString();
  });

  // Calculate the number of reviews
  const numOfReviews = reviews.length;

  // Calculate the average rating with the filtered reviews
  let ratings =
    reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / reviews.length;
  ratings = isNaN(ratings) ? 0 : ratings;

  // Update the product document with the filtered reviews, number of reviews, and average rating
  await productSchema.findByIdAndUpdate(req.query.productId, {
    reviews,
    numOfReviews,
    ratings,
  });

  res.status(200).json({
    success: true,
  });
});

// admin product contorllers

exports.adminGetProduct = catchAsyncError(async (req, res, next) => {
  const product = await productSchema.find();

  res.status(200).json({
    success: true,
    product,
  });
});
