const { getSalaries, getSalariesWeb } = require("../controllers/salary");

const router = require("express").Router();

router.get("/", getSalaries);
router.get("/web", getSalariesWeb);

module.exports = router;
