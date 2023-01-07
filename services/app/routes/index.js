const router = require("express").Router();

const employeeRouter = require("./employee");
const departmentRouter = require("./departments");
const roleRouter = require("./role");

const API_WEB = "/api/v1/web";
const API_MOBILE = "/api/v1/mobile";

router.get("/", (_req, res, _next) =>
  res.status(200).json({ message: "Server is connected" })
);
router.use(`${API_WEB}/employees`, employeeRouter);
router.use(`${API_WEB}/departments`, departmentRouter);
router.use(`${API_WEB}/roles`, roleRouter);

module.exports = router;
