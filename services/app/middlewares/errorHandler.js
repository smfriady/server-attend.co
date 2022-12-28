const errorHandler = (err, req, res, next) => {
  let code;
  let message;

  if (
    err.name === "SequelizeUniqueConstraintError" ||
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeDatabaseError"
  ) {
    err.errors?.forEach((m) => (message = m.message));
    code = 400;
  } else {
    msg = "internal server error";
    code = 500;
  }
  res.status(code).json({ code, message });
};

module.exports = errorHandler;
