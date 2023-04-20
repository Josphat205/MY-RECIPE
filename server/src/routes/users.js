import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    return res.status(400).json({ error: "Username already exists" });
  } else {
    try {
      const salt = await bcryptjs.genSalt();
      const hashedPassword = await bcryptjs.hash(password, salt);
      const newUser = new User({
        username,
        password: hashedPassword
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ error: "User doesn't exist" });
  }
  const validPassword = await bcryptjs.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: "wrong password or username" });
  }
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({
    token,
    id: user._id
  });
});

export { router as usersRouter };
