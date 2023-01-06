const {
  createAttendance,
  updateAttendance,
} = require("../controllers/attendance");

const router = require("express").Router();

router.post("/", createAttendance);
router.put("/:id", updateAttendance);

module.exports = router;
