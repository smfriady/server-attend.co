const router = require("express").Router();

const { getDepartments } = require("../controllers/departments");

router.get("/", getDepartments);

module.exports = router;
