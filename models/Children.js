const mongoose = require("mongoose");

const childSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    lname: {
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

childSchema.virtual("fullName").get(function () {
  return `${this.fname} ${this.lname}`;
});

const Children = mongoose.model("Children", childSchema);

module.exports = Children;
