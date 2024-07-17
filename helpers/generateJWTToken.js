const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../utils");


exports.generateToken = (payload, expired) => {
  return jwt.sign(payload, JWT_KEY, {
    expiresIn: expired,
  });
};
