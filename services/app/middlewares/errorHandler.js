const errorHandler = (err, req, res, next) => {
  let code;
  let message;

  console.log(err.name, "<<<<<<<<<<<<<<<<<<<");

  if (err.name === "SequelizeUniqueConstraintError") {
    err.errors.forEach((m) => (message = m.message));
    code = 400;
  } else if (err.name === "SequelizeValidationError") {
    err.errors.forEach((m) => (message = m.message));
    code = 400;
  } else if (err.name === "SequelizeDatabaseError") {
    err.errors.forEach((m) => (message = m.message));
    code = 400;
  } else if (err.name === "ValidationErrorItem") {
    err.errors.forEach((m) => (message = m.message));
    code = 400;
  } else if (err.name === "BAD_REQUEST_ATTENDANCE_TYPE") {
    message = "wrong attendance type";
    code = 400;
  } else if (err.name === "BAD_REQUEST_IMG_PROFILE") {
    message = "image profile is required";
    code = 400;
  } else if (err.name === "BAD_REQUEST_ATTACHMENT") {
    message = "attachment is required";
    code = 400;
  } else if (err.message.includes("too large")) {
    message = err.message;
    code = err.http_code;
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
