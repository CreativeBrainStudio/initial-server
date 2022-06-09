const router = require("express").Router(),
  { browse, find, save, update, destroy } = require("../controllers/Children"),
  { protect } = require("../middleware");

router
  .get("/", browse)
  .get("/:id/find", protect, find)
  .post("/save", save)
  .put("/:id/update", protect, update)
  .delete("/:id/destroy", protect, destroy);

module.exports = router;
