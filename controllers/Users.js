const User = require("../models/Users");

// entity/
exports.browse = (req, res) => {
  User.find()
    .then(users => res.json(users.filter(user => !user.deletedAt)))
    .catch(err => res.status(400).json(`Error: ${err}`));
};

// entity/:id/find
exports.find = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user.deletedAt ? "No user found" : user))
    .catch(err => res.status(400).json(`Error: ${err}`));
};

// entity/:id/update
exports.update = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json(`${req.params.id} updated successfully`))
    .catch(err => res.status(400).json(`Error: ${err}`));
};

// entity/save
exports.save = (req, res) => {
  const newUser = new User(req.body);
  newUser
    .save()
    .then(() => res.json("New user created"))
    .catch(err => res.status(400).json(`Error: ${err}`));
};

// entity/:id/destroy
exports.destroy = (req, res) => {
  User.findByIdAndUpdate(req.params.id, {
    deletedAt: new Date().toLocaleString(),
  })
    .then(() => res.json(`${req.params.id} deleted successfully`))
    .catch(err => res.status(400).json(`Error: ${err}`));
};
