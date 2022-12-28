const router = require("express").Router();
const userRouter = require("./user");

router.get("/", (_req, res, _next) => {
  res.status(200).json({ message: "Server is connected" });
});

router.use("/users", userRouter);

module.exports = router;
