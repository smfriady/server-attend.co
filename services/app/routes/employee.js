const router = require("express").Router();
const { multerUploads } = require("../helpers/multer");

const {
  getEmployees,
  getEmployee,
  createEmployee,
  editEmployee,
  deleteEmployee,
} = require("../controllers/employee");

router.get("/", getEmployees);
router.post("/", multerUploads.single("imgProfile"), createEmployee);
router.get("/:id", getEmployee);
router.put("/:id", multerUploads.single("imgProfile"), editEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
