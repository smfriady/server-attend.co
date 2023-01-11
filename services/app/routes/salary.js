const { getSalaries } = require("../controllers/salary");

const router = require("express").Router();

router.get("/", getSalaries);

module.exports = router;
