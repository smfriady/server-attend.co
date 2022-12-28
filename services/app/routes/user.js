const {
  getUsers,
  register,
  login,
  deleteUser,
} = require("../controllers/user");

const router = require("express").Router();

// router.get("/", (_req, res) => {
//   res.status(200).json({
//     message: "Route User.",
//   });
// });

router.get("/", getUsers);
router.post("/register", register);
router.post("/login", login);
router.delete("/:id", deleteUser);

module.exports = router;
