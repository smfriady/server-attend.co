const router = require("express").Router();

const { getRoles } = require("../controllers/role");

router.use("/", getRoles);

module.exports = router;
