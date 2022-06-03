const router = require("express").Router(),
  auth = require("../controllers/Auth");

router.get("/login", auth.login).post("/register", auth.register);

module.exports = router;
