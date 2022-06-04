const router = require("express").Router(),
  users = require("../controllers/Users"),
  middleware = require("../middleware");

router
  .get("/", middleware.protect, users.browse)
  .get("/:id/find", middleware.protect, users.find)
  .put("/:id/update", middleware.protect, users.update)
  .delete("/:id/destroy", middleware.protect, users.destroy);

module.exports = router;
