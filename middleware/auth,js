const jwt = require("jsonwebtoken");

exports.authUser = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    const token =
      authHeader && authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided, authorization denied." });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) {
        console.error("JWT Verification Error:", err);
        return res.status(403).json({ message: "Token is not valid." });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.error("Authentication Error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};
