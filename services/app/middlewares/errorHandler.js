const errorHandler = (err, req, res, next) => {
  let code;
  let message;

  if (err.name === "SequelizeUniqueConstraintError") {
    err.errors.forEach((m) => (message = m.message));
    code = 400;
  } else if (err.name === "SequelizeValidationError") {
    err.errors.forEach((m) => (message = m.message));
    code = 400;
  } else if (err.name === "SequelizeDatabaseError") {
    err.errors.forEach((m) => (message = m.message));
    code = 400;
  } else if (err.name === "UNAUTHORIZED") {
    message = "not authorized, no user login";
    code = 401;
  } else {
    message = "internal server error";
    code = 500;
  }

  res.status(code).json({ code, message });
};

module.exports = { errorHandler };
