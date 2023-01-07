const router = require("express").Router();

const employeeRouter = require("./employee");

const API_WEB = "/api/v1/web";
const API_MOBILE = "/api/v1/mobile";

router.get("/", (_req, res, _next) =>
  res.status(200).json({ message: "Server is connected" })
);
router.use(`${API_WEB}/employees`, employeeRouter);

module.exports = router;
