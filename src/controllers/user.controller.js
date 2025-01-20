import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

// generate tokens

const generateAccessToken = (User) => {
  return jwt.sign(
    { email: User.email, id: User._id },
    process.env.ACCESS_JWT_SECRET,
    {
      expiresIn: "6h",
    }
  );
};
const generateRefreshToken = (User) => {
  return jwt.sign({ email: User.email }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: "7d",
  });
};

// register user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username)
    return res.status(400).json({ message: "user name is required" });
  if (!email) return res.status(400).json({ message: "email is required" });
  if (!password)
    return res.status(400).json({ message: "password is required" });

  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "user already exists" });

    const createUser = await User.create({ username, email, password });
    res.json({ message: "user registered successfully", user: createUser });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
    console.log("internal error:", error);
  }
};

// login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: "email is required" });
  if (!password)
    return res.status(400).json({ message: "password is required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "invalid user" });

  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword)
    return res.status(400).json({ message: "incorrect password" });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  });

  res.json({
    message: "user logged in successfully",
    accessToken,
    refreshToken,
    user,
  });
};
// logout user

const logoutUser = (req, res) => {
  const isTokenExist = req.cookies.refreshToken;
  if (!isTokenExist) return res.status(400).json({ message: "cookie expired" });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  });
  res.json({ message: "user logout successfully" });
};

// regenerate access token

const regenerateAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ message: "no refresh token available" });

  try {
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_JWT_SECRET
    );
    const user = User.findOne({ email: decodedToken.email });
    if (!user) return res.status(404).json({ message: "invalid token" });

    const regenerateToken = generateAccessToken(user);

    res.json({
      message: "access token generated",
      token: regenerateToken,
    });
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};

export { registerUser, loginUser, logoutUser, regenerateAccessToken };
