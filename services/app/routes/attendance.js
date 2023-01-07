const {
  createAttendance,
  updateAttendance,
} = require("../controllers/attendance");
const { multerUploads } = require("../middlewares/multer");

const router = require("express").Router();

router.post("/", multerUploads, createAttendance);
router.patch("/:id", updateAttendance);
module.exports = router;
