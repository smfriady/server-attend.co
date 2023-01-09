const errorHandler = (err, req, res, next) => {
  let code;
  let message;

  // console.log(err.name, "<<<<<<<<<<<JanganLupaComentariKloProduction<<<<<<<<");
  // console.log(err.errors, "<<<<<<<<<<<JanganLupaComentariKloProduction<<<<<<<<");

  if (
    err.name === "SequelizeUniqueConstraintError" ||
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeDatabaseError"
  ) {
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
  } else if (err.name === "NO_DATA_FOUND") {
    message = "no data found";
    code = 404;
  } else if (err.name === "NO_EMAIL") {
    message = "email is required";
    code = 400;
  } else if (err.name === "NO_PASSWORD") {
    message = "password is required";
    code = 400;
  } else if (err.name === "UNAUTHORIZED") {
    message = "not authorized, no user login";
    code = 401;
  } else if (err.name === "INVALID_CREDENTIAL") {
    message = "invalid email or password";
    code = 401;
  } else if (err.name === "UPLOAD_ERROR") {
    message = "upload error";
    code = 400;
  } else if (err.name === "MIMETYPE_NOT_SUPPORT") {
    message = "mime type is not support";
    code = 400;
  }
  //  nanti diperbaiki untuk error cloudinary
  //  else if (err.message.includes("too large")) {
  //    message = err.message;
  //    code = err.http_code;
  //  }
  else {
    message = "internal server error";
    code = 500;
  }

  res.status(code).json({ code, message });
};

module.exports = { errorHandler };
