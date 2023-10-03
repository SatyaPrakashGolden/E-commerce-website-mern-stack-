const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const JWT_SECRET = "secret123";
const authController = require("express").Router();

const createToken = (user) => {
    const payload = {
      id: user._id.toString(),
      email: user.email,
    };
    const token = jwt.sign(payload, JWT_SECRET);
    return token;
  };
  authController.post("/register", async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Input validation
      if (!username || !email || !password) {
        return res.status(400).json({ msg: "All fields must be populated" });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ msg: "User already registered" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
      const token = createToken(newUser);
      const { password: _, ...userWithoutPassword } = newUser.toObject();
      return res.status(201).json({ msg: "User registered", user: userWithoutPassword, token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  });
  

  authController.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if email and password are provided
      if (!email || !password) {
        return res.status(400).json({ status: "error", message: "Email and password are required" });
      }
  
      // Check if the user with the given email exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ status: "error", message: "Invalid credentials" });
      }
  
      // Compare the provided password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ status: "error", message: "Invalid credentials" });
      }
  
      // If authentication is successful, create a JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET, // Use a secure secret key stored in your environment variables
        { expiresIn: '1h' } // Adjust token expiration as needed
      );
  
      // Send a response with the token and user data (excluding the password)
      const { password: _, ...userWithoutPassword } = user._doc;
      return res.status(200).json({ status: "success", message: "Login successful", user: userWithoutPassword, token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: "error", message: "Internal server error" });
    }
  });

  module.exports = authController;
  