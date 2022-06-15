const router = require("express").Router(),
  { login, save, changePassword } = require("../controllers/Auth"),
  { protect } = require("../middleware");

router
  .get("/login", login)
  .post("/save", save)
  .put("/changePassword", protect, changePassword);

module.exports = router;
