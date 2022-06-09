const Children = require("../models/Children");

// entity/;
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

// entity/save
exports.save = (req, res) => {
  const newItem = new Children(req.body);
  newItem
    .save()
    .then(item => res.json(item))
    .catch(err => res.status(400).json(`Error: ${err}`));
};

// entity/:id/update
exports.update = (req, res) => {
  Role.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json(`${req.params.id} updated successfully`))
    .catch(err => res.status(400).json(`Error: ${err}`));
};

// entity/:id/destroy
exports.destroy = (req, res) => {
  Children.findByIdAndUpdate(req.params.id, {
    deletedAt: new Date().toLocaleString(),
  })
    .then(() => res.json(`${req.params.id} deleted successfully`))
    .catch(err => res.status(400).json(`Error: ${err}`));
};
