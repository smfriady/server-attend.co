const router = require("express").Router();

const {
  getEmployees,
  getEmployee,
  insertEmployee,
  updateEmployee,
  destroyEmployee,
} = require("../controllers/employee");

router.get("/", getEmployees);
router.post("/", insertEmployee);
router.get("/:id", getEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", destroyEmployee);

module.exports = router;
