const router = require("express").Router(),
  children = require("../controllers/Children"),
  middleware = require("../middleware");

router
  .get("/", middleware.protect, children.browse)
  .get("/:id/find", middleware.protect, children.find)
  .post("/save", middleware.protect, children.save)
  .put("/:id/update", middleware.protect, children.update)
  .delete("/:id/destroy", middleware.protect, children.destroy);

module.exports = router;
