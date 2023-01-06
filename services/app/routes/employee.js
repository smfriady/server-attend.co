const router = require("express").Router();

const { getEmployees } = require("../controllers/employee");

router.get("/", getEmployees);

module.exports = router;
