const {
  insertRole,
  getRoles,
  updateRole,
  destroyRole,
} = require("../controllers/role");

const router = require("express").Router();

router.post("/", insertRole);
router.get("/", getRoles);
router.put("/:id", updateRole);
router.delete("/:id", destroyRole);

module.exports = router;
