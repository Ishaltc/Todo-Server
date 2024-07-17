const { generateToken } = require("../helpers/generateJWTToken");
const User = require("../models/User");
const bcrypt = require("bcrypt");


/*CREATE*/
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ((!email, !password)) {
      return res.status(400).json({ message: "Missing required parameter" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(200)
        .json({ message: "Email already exists", success: 0 });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    const newUser = await new User({
      email,
      password: cryptedPassword,
    }).save();

    const token = generateToken({ id: newUser._id.toString() }, "7d");
    const data = {
      id: newUser._id,
      email: newUser.email,
      token: token,
      isBlocked: newUser.isBlocked,
    };
    return res.status(200).json({
      message: "User created successfully",
      data: data,
      success: 1,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


/*READ*/
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email, !password) {
      return res.status(400).json({ message: "Missing required parameter" });
    }
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(200)
        .json({ message: "User doesn't exists", success: 0 });
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(200).json({
        message: "Invalid credentials.Please try again",
        success: 0,
      });
    }
    const token = generateToken({ id: user._id.toString() }, "7d");
    const data = {
      id: user._id,
      email: user.email,
      token: token,
      isBlocked: user.isBlocked,
    };
    return res.status(200).json({
      message: "User logged in successfully",
      data: data,
      success: 1,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


