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
router.post("/", multerUploads.single("img_profile"), createEmployee);
router.get("/:id", getEmployee);
router.put("/:id", multerUploads.single("img_profile"), editEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
