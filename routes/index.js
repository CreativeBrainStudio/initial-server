const middleware = require("../middleware");

const routers = app => {
  // List of available Routes
  app.use("/roles", require("./Roles"));
  app.use("/auth", require("./Auth"));
  app.use("/users", require("./Users"));
  app.use("/children", require("./Children"));
  app.use(middleware.notFound);
  app.use(middleware.errorHandler);
};

module.exports = routers;
