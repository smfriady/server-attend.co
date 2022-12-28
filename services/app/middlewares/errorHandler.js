const errorHandler = (err, req, res, next) => {
  let code;
  let message;

  if (
    err.name === "SequelizeUniqueConstraintError" ||
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeDatabaseError" ||
    err.name === "Bed request"
  ) {
    err.errors?.forEach((m) => (message = m.message));
    code = 400;
  } else if (err.name === "Invalid credentials") {
    message = "Email or password invalid";
    code = 400;
  } else if (err.name === "Not found") {
    message = "Data not found";
    code = 404;
  } else {
    message = "internal server error";
    code = 500;
  }
  res.status(code).json({ code, message });
};

module.exports = errorHandler;
