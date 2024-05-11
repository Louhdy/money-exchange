const logErrors = (err, req, res, next) => {
  console.error("Error: ", {
    message: err.message,
    stack: err.stack,
  });
  next(err);
};

const errorHandler = (err, req, res) => {
  return res.status(500).json({
    success: false,
    message:
      "The operation could not be completed. Contact your system administrator.",
  });
};

module.exports = { errorHandler, logErrors };
