const router = require("express").Router(),
  roles = require("../controllers/Roles");

router
  .get("/", roles.browse)
  .get("/:name/find", roles.find)
  .put("/:id/update", roles.update)
  .post("/migrate", roles.migrate);

module.exports = router;
