import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  console.log("Register route reached");

  try {
    const { username, email, password } = req.body;

    const userAlreadyExists = await User.findOne({ email: email });
    if (userAlreadyExists) {
      return res.status(406).json({ message: "User already exists with that email" });
    }
    // Encrypt the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save new user to database with encrypted password
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    const savedUser = newUser.save();
    console.log(savedUser);
    delete savedUser.password;
    res.status(201).json({ message: "Success", ...savedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordMatch = bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      return res.status(400).json({ message: "invalid credentials" });
      
    delete user.password;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token, user, message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
