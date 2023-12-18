class errorHandler extends Error {
  constructor(message, codeStatus) {
    super(message);
    this.codeStatus = codeStatus;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = errorHandler;
