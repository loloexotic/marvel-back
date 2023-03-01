const express = require("express");
const router = express.Router();

const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../models/Signup");

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log(req.body);
    const emailAlreadyExist = await User.findOne({ email: email });
    if (emailAlreadyExist) {
      return res.status(400).json({
        error: { message: "This email already exist" },
      });
    }
    if (!req.body.username) {
      return res.status(400).json({
        error: { message: "An username is needed" },
      });
    }

    const salt = uid2(16);
    console.log("salt : ", salt);
    const hash = SHA256(salt + password).toString(encBase64);
    console.log("hash : ", hash);
    const token = uid2(64);
    console.log("token : ", token);
    const newUser = new User({
      email,
      username,
      token,
    });

    const response = {
      _id: newUser.id,
      username: newUser.username,
      token: newUser.token,
    };
    await newUser.save();
    res.json({
      message: " Account succesfully created",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/signup/login", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log(user);
    const newHash = SHA256(user.salt + password).toString(encBase64);
    console.log(newHash);

    if (newHash !== user.hash) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.json({
      _id: user._id,
      username: user.username,
      token: user.token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
