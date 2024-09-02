const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const randomString = generateRandomString(64);

router.post("/signup", async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).send("Missing required fields");
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).send("User with this email already exists");
      return;
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      password: hashedPass,
    });

    await newUser.save();

    const token = jwt.sign({ userName: newUser.userName }, randomString, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "Successfully Signed Up",
      token,
    });

    console.log("Successfully registered user");
  } catch (err) {
    console.error("Error while registering user", err);
    res.status(500).send("Error while registering user");
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Missing required fields");
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ userName: user.userName }, randomString, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Successfully Signed In",
      token,
    });
    console.log("Successfully signed in");
  } catch (err) {
    console.error("Error while signing in", err);
    res.status(500).send("Error while signing in");
  }
});

module.exports = router;
