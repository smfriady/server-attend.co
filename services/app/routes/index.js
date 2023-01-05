const router = require("express").Router();
const employeeRouter = require("./employee");
const roleRouter = require("./role");

router.get("/", (_req, res, _next) => {
  res.status(200).json({ message: "Server is connected" });
});

router.use("/employees", employeeRouter);
router.use("/roles", roleRouter);

module.exports = router;
