const router = require("express").Router();

router.get("/", (_req, res, _next) => {
  res.status(200).json({ message: "Server is connected" });
});

module.exports = router;
