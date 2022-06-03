const User = require("../models/Users");
const generateToken = require("../config/generateToken");

// entity/login
exports.login = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user.deletedAt ? "No user found" : user))
    .catch(err => res.status(400).json(`Error: ${err}`));
};

// entity/register
exports.register = (req, res) => {
  const newUser = new User(req.body);
  newUser
    .save()
    .then(user =>
      res.json({
        _id: user._id,
        email: user.email,
        role: user.role,
        username: user.username,
        token: generateToken(user._id),
      })
    )
    .catch(err => res.status(400).json(`Error: ${err}`));
};
