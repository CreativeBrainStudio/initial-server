const router = require("express").Router(),
  users = require("../controllers/Users");

router
  .get("/", users.browse)
  .get("/:id/find", users.find)
  .put("/:id/update", users.update)
  .post("/save", users.save)
  .delete("/:id/destroy", users.destroy);

module.exports = router;