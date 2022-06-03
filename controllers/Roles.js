const Role = require("../models/Roles");

// entity/
exports.browse = (req, res) => {
  Role.find()
    .then(roles => res.json(roles))
    .catch(err => res.status(400).json(`Error: ${err}`));
};

// entity/:name/find
exports.find = (req, res) => {
  Role.find()
    .then(roles =>
      res.json(roles.filter(role => role.name === req.params.name)[0])
    )
    .catch(err => res.status(400).json(`Error: ${err}`));
};

// entity/:id/update
exports.update = (req, res) => {
  Role.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json(`${req.params.id} updated successfully`))
    .catch(err => res.status(400).json(`Error: ${err}`));
};

// entity/migration
exports.migrate = (req, res) => {
  const roles = [
    {
      display_name: "Developer",
      name: "dev",
    },
    {
      display_name: "Administrator",
      name: "admin",
    },
    {
      display_name: "Customer",
      name: "customer",
    },
  ];
  roles.map(role => {
    const newRole = new Role(role);
    newRole
      .save()
      .then(() => res.json("Role migration created"))
      .catch(err => res.status(400).json(`Error: ${err}`));
  });
};
