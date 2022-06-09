const mongoose = require("mongoose");

const childSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    deletedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Children = mongoose.model("Children", childSchema);

module.exports = Children;
