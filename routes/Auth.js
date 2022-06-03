const router = require("express").Router(),
  auth = require("../controllers/Auth");

router.get("/login", auth.login).post("/save", auth.save);

module.exports = router;
