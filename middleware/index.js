const jwt = require("jsonwebtoken"),
  User = require("../models/Users");

exports.protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    res.status(401).json("Not authorized, no token");
  } else {
    if (token.startsWith("Bearer")) {
      let expired = false,
        decrypted;

      // decode token
      jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, res) => {
        if (err && err.name) {
          expired = true;
        } else {
          decrypted = res;
        }
      });

      if (expired) {
        res.status(401).json({ expired: "Not authorized, token expired" });
      }

      req.user = await User.findById(decrypted.id).select("-password");

      next();
    } else {
      res.status(401).json({ error: "Not authorized, invalid token" });
    }
  }
};

exports.notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(400);
  next(error);
};

exports.errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
