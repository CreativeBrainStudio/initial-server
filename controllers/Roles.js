const Role = require("../models/Roles");

// entity/
exports.browse = (req, res) => {
  Role.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json(`Error: ${err}`));
};

// entity/:name/find
exports.find = (req, res) => {
  Role.findOne({ name: req.params.name })
    .then(role => res.json(role))
    .catch(err => res.status(400).json(`Error: ${err}`));
};

// entity/:id/update
exports.update = (req, res) => {
  Role.findByIdAndUpdate(req.params.id, req.body)
    .then(item => res.json(item))
    .catch(err => res.status(400).json(`Error: ${err}`));
};

// entity/migration
exports.migrate = (req, res) => {
  const roles = [
    {
      _id: "629a98a5a881575c013b5325",
      display_name: "Administrator",
      name: "admin",
    },
    {
      _id: "629a98a5a881575c013b5326",
      display_name: "Customer",
      name: "customer",
    },
  ];
  roles.map(role => {
    const newRole = new Role(role);
    newRole.save();
  });

  res.json("Role migration created");
};
