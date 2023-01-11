const multer = require("multer");

const storage = multer.memoryStorage();

const multerUploads = multer({
  storage: storage,
  fileFilter: (_req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

module.exports = { multerUploads };
