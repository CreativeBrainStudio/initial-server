const User = require("../models/Users");

// entity/
exports.browse = (req, res) => {
  User.find()
    .select("-password")
    .populate({
      path: "roleId",
      select: "display_name name",
    })
    .then(users => res.json(users.filter(user => !user.deletedAt)))
    .catch(error => res.status(400).json({ error: error.message }));
};

// entity/:id/find
exports.find = (req, res) => {
  User.findById(req.params.id)
    .select("-password")
    .populate({
      path: "roleId",
      select: "display_name name",
    })
    .then(user => res.json(user.deletedAt ? "No user found" : user))
    .catch(error => res.status(400).json({ error: error.message }));
};

// entity/:id/update
exports.update = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .select("-password")
    .populate({
      path: "roleId",
      select: "display_name name",
    })
    .then(item => res.json(item))
    .catch(error => res.status(400).json({ error: error.message }));
};

// entity/:id/destroy
exports.destroy = (req, res) => {
  User.findByIdAndUpdate(req.params.id, {
    deletedAt: new Date().toLocaleString(),
  })
    .then(() => res.json(`${req.params.id} deleted successfully`))
    .catch(error => res.status(400).json({ error: error.message }));
};
