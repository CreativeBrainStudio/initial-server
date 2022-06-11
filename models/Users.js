const mongoose = require("mongoose"),
  bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      fname: {
        type: String,
        trim: true,
        required: true,
      },
      mname: {
        type: String,
        trim: true,
      },
      lname: {
        type: String,
        required: true,
        trim: true,
      },
      suffix: {
        type: String,
        enum: {
          values: ["", "JR", "SR", "III", "IV", "V"],
          message: "{VALUE} is not supported",
        },
      },
    },
    address: {
      region: {
        type: String,
        required: true,
      },
      province: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      barangay: {
        type: String,
      },
      street: {
        type: String,
      },
    },
    mobile: {
      type: String,
      minlength: 10,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: 5,
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roles",
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    token: {
      type: String,
    },
    deletedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
