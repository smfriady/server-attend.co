const router = require("express").Router();

const employeeRouter = require("./employee");
const departmentRouter = require("./departments");
const roleRouter = require("./role");
const attendanceRouter = require("./attendance");
const authRouter = require("./auth");
const salaryRouter = require("./salary");

const employeeMobileRouter = require("./mobile/employee");

const { authenticationEmployee } = require("../middlewares/authentication");

const API_WEB = "/api/v1/web";
const API_MOBILE = "/api/v1/mobile";

router.get("/", (_req, res, _next) =>
  res.status(200).json({ message: "Server is connected" })
);

router.use(`${API_WEB}/auth`, authRouter);
router.use(`${API_WEB}/employees`, employeeRouter);
router.use(`${API_WEB}/departments`, departmentRouter);
router.use(`${API_WEB}/roles`, roleRouter);
router.use(`${API_WEB}/salaries`, authenticationEmployee, salaryRouter);

router.use(`${API_MOBILE}/auth`, authRouter);
router.use(`${API_MOBILE}/salaries`, authenticationEmployee, salaryRouter);
router.use(
  `${API_MOBILE}/attendances`,
  authenticationEmployee,
  attendanceRouter
);
router.use(
  `${API_MOBILE}/employees`,
  authenticationEmployee,
  employeeMobileRouter
);

module.exports = router;
