const errorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.codeStatus = err.codeStatus || 500;

  if (process.env.NODE_ENV == "development") {
    res.status(err.codeStatus).json({
      sucess: false,
      message: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV == "production") {
    let message = err.message;
    let error = new Error(message);
    if (err.name == "ValidationError") {
      message = Object.values(err.errors).map((value) => value.message);
      error = new errorHandler(message);
      err.codeStatus = 400;
    }

    if (err.name == "CastError") {
      message = `Resourse not found: ${err.path}`;
      error = new Error(message);
    }

    res.status(err.codeStatus).json({
      sucess: false,
      message: error.message || "Internal Server Error",
    });
  }
};
