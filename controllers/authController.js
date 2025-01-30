const bcrypt = require("bcryptjs");
const User = require("../models/User");
const sendEmail = require("../services/emailService");
const hashPassword = require("../utils/hashpassword");
const generateToken = require("../utils/generateToken");
const { welcomeEmailTemplate } = require("../utils/emailTamplates");

exports.register = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.BadRequest("User already exists");

    // Generate a random password
    const password = Math.random().toString(36).slice(-8);
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const user = await User.create({ name, email, password: hashedPassword });

    // Send welcome email
    const emailContent = welcomeEmailTemplate(name, password);
    await sendEmail(email, "Welcome to Car Management", emailContent);

    // Send response back to the client
    return res.Created(user, "User registered successfully. Check your email for your password.");
  } catch (error) {
    console.error("Error during registration:", error.message);
    return res.ServerError("An error occurred while registering. Please try again.");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.BadRequest("Invalid credentials");
    }
    const { password: userPassword, ...userInfo } = user.toObject();
    // Send successful login response with token
    return res.Success({userInfo, token: generateToken(user.id) }, "Login successful");
  } catch (error) {
    console.error("Error during login:", error.message);
    return res.ServerError("An error occurred during login. Please try again.");
  }
};
