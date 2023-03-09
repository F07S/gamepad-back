const express = require("express");
const router = express.Router();

const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const fileUpload = require("express-fileupload");
const convertToBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};

const cloudinary = require("cloudinary").v2;

const User = require("../models/User");

router.post("/signup", fileUpload(), async (req, res) => {
  try {
    const { username, email, password, favourites } = req.body;
    const { picture } = req.files;
    console.log(favourites);
    // console.log(picture);

    // IF THE FIELDS ARE NOT FILLED IN *************************\\
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing parameter" });
    }

    const emailAlreadyExists = await User.findOne({ email });

    // IF THE E-MAIL ENTERED ALREADY EXISTS******************\\
    if (emailAlreadyExists) {
      return res.status(409).json({ message: "This e-mail already exists" });
    }

    const salt = uid2(16);
    const hash = SHA256(salt + password).toString(encBase64);
    const token = uid2(64);

    const newUser = new User({
      email,
      username,
      favourites,
      token: token,
      hash: hash,
      salt: salt,
    });

    if (req.files) {
      const result = await cloudinary.uploader.upload(convertToBase64(picture));
      newUser.account.avatar = result;
    }
    await newUser.save();

    const clientRes = {
      _id: newUser._id,
      email: newUser.email,
      token: newUser.token,
      username: newUser.username,
      favourites: newUser.favourites,
    };

    res.json(clientRes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get("/user", async (req, res) => {
  try {
    const user = await User.find();
    res.json({ user: user });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});
router.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.json({ user: user });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newHash = SHA256(user.salt + password).toString(encBase64);

    if (newHash === user.hash) {
      res.json({
        message: "Log in successfull, welcome.",
        _id: user._id,
        token: user.token,
        username: user.username,
      });
    } else {
      res.status(400).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/user/update/:id", async (req, res) => {
  try {
    const userToUpdate = await User.findById(req.params.id);
    // console.log(userToUpdate.favourites);
    console.log(req.body);
    userToUpdate.favourites.push(req.body);
    console.log(userToUpdate.favourites);
    await userToUpdate.save();
    res.status(200).json(userToUpdate);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
