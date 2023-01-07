const router = require("express").Router();

const {
  getEmployees,
  getEmployee,
  createEmployee,
  editEmployee,
  deleteEmployee,
} = require("../controllers/employee");

router.get("/", getEmployees);
router.post("/", createEmployee);
router.get("/:id", getEmployee);
router.put("/:id", editEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
