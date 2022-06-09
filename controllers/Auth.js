const User = require("../models/Users"),
  generateToken = require("../config/generateToken");

// entity/login
exports.login = (req, res) => {
  const { email, password } = req.query;

  User.findOne({ email })
    .then(async user => {
      console.log(user);
      if (user && (await user.matchPassword(password))) {
        if (user.deletedAt) {
          res.json({ error: "Your account has been banned" });
        } else {
          let userData = await User.findById({ _id: user._id })
            .select("-password")
            .populate({
              path: "roleId",
              select: "display_name name",
            });
          userData.token = generateToken(userData._id);
          res.json(userData);
        }
      } else {
        res.json("E-mail and Password does not match.");
      }
    })
    .catch(error => res.status(400).json({ error: error.message }));
};

// entity/save
exports.save = (req, res) => {
  User.create(req.body)
    .then(user => res.json(`${user._id} saved successfully`))
    .catch(error => res.status(400).json({ error: error.message }));
};
