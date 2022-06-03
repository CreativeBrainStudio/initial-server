const User = require("../models/Users");
const generateToken = require("../config/generateToken");

// entity/login
exports.login = (req, res) => {
  const { email, password } = req.query;

  User.findOne({ email })
    .then(async user => {
      if (user && (await user.matchPassword(password))) {
        res.json({
          _id: user._id,
          email: user.email,
          role: user.role,
          username: user.username,
          token: generateToken(user._id),
        });
      } else {
        res.json("E-mail and Password does not match.");
      }
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
};

// entity/save
exports.save = (req, res) => {
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
