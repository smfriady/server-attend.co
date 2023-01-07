const multer = require("multer");

const storage = multer.memoryStorage();
const multerUploads = multer({ storage: storage });

module.exports = { multerUploads };
