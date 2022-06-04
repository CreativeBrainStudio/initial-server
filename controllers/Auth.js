const User = require("../models/Users"),
  Role = require("../models/Roles"),
  generateToken = require("../config/generateToken");

// entity/login
exports.login = (req, res) => {
  const { email, password } = req.query;

  User.findOne({ email })
    .then(async user => {
      if (user && (await user.matchPassword(password))) {
        if (user.deletedAt) {
          res.json({ banned: "Your account has been banned" });
        } else {
          const { _id, email, username, roleId } = user;
          Role.findOne({ _id: roleId })
            .then(role =>
              res.json({
                _id,
                email,
                role: role.display_name,
                roleName: role.name,
                username,
                token: generateToken(user._id),
              })
            )
            .catch(err => res.status(400).json(`Error: ${err}`));
        }
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
