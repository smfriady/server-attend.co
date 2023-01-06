const router = require("express").Router();
const employeeRouter = require("./employee");
const roleRouter = require("./role");
const attendanceRouter = require("./attendance");

router.get("/", (_req, res, _next) => {
  res.status(200).json({ message: "Server is connected" });
});

router.use("/employees", employeeRouter);
router.use("/roles", roleRouter);
router.use("/attendances", attendanceRouter);

module.exports = router;
