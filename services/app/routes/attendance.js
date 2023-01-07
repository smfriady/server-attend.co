const router = require("express").Router();

const { createAttendance, updateAttendance } = require("../controllers/attendance");
const { multerUploads } = require("../middlewares/multer");

router.post("/", multerUploads.single("attachment"), createAttendance);
router.put("/:id", updateAttendance);
module.exports = router;
