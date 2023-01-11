const router = require("express").Router();
const {
  createAttendance,
  updateStatus,
  getAttendances,
  getAttendance,
  getAttendancesWeb,
} = require("../controllers/attendance");
const { multerUploads } = require("../helpers/multer");

router.post("/", multerUploads.single("attachment"), createAttendance);
router.get("/", getAttendances);
router.get("/web", getAttendancesWeb);
router.get("/:id", getAttendance);
router.put("/", multerUploads.none(), updateStatus);

module.exports = router;
