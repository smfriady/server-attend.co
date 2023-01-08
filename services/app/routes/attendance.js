const router = require("express").Router();

const { createAttendance, updateStatus } = require("../controllers/attendance");
const { multerUploads } = require("../middlewares/multer");

router.post("/", multerUploads.single("attachment"), createAttendance);
router.patch("/:status", updateStatus);

module.exports = router;
