const router = require("express").Router();

const employeeRouter = require("./employee");

router.get("/", (_req, res, _next) =>
  res.status(200).json({ message: "Server is connected" })
);

router.use("/employees", employeeRouter);

module.exports = router;
