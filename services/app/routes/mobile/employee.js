const router = require("express").Router();
const { getProfileEmployee } = require("../../controllers/mobile/employee");

router.get("/", getProfileEmployee);

module.exports = router;
