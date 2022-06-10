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
    status: {
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

childSchema.query.byStatus = function (status) {
  return this.where({ status: new RegExp(status, "i") });
};

const Children = mongoose.model("Children", childSchema);

module.exports = Children;
