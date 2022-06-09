const Children = require("../models/Children");

// entity/
exports.browse = (req, res) => {
  Children.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json(`Error: ${err}`));
};

// entity/:name/find
exports.find = (req, res) => {
  Children.findOne({ name: req.params.name })
    .then(item => res.json(item))
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
  Children.findByIdAndUpdate(req.params.id, req.body)
    .then(item => res.json(item))
    .catch(err => res.status(400).json(`Error: ${err}`));
};

// entity/:id/destroy
exports.destroy = (req, res) => {
  Children.findByIdAndUpdate(req.params.id, {
    deletedAt: new Date().toLocaleString(),
  })
    .then(() => res.json(req.params.id))
    .catch(err => res.status(400).json(`Error: ${err}`));
};
