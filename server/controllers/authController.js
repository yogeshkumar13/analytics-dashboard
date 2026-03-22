const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByUsername } = require("../models/userModel");

// Register
const register = async (req, res) => {
  try {
    const { username, password, age, gender } = req.body;

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser(username, hashedPassword, age, gender);

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Register error");
  }
};

// Login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await findUserByUsername(username);

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    // JWT token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).send("Login error");
  }
};

module.exports = { register, login };