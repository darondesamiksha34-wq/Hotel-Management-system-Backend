
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/usermodel.js";
import { sendEmail } from "../config/nodeMailer.js";


// Register User

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ success: false, message: "Details are missing" });
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email, password: hashedPassword });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Generate OTP for verification
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpiredAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();

    await sendEmail({
      email: user.email,
      subject: "Welcome to CodeMate! Verify Your Email",
      text: `Hi ${user.name}, your OTP for email verification is: ${otp}. It expires in 24 hours.`,
    });

    console.log("OTP:", otp)
    console.log("✅ Verification OTP sent to:", user.email);

    return res.json({ success: true, message: "User registered and OTP sent" });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};


// Login User

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ success: false, message: "Email and Password are required" });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "Invalid Email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: "Invalid Password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// Logout User

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// Send Verification OTP

export const sendVerifyOtp = async (req, res) => {
  try {
    const { userID } = req.body;
    const user = await UserModel.findById(userID);
    if (!user) return res.json({ success: false, message: "User not found" });
    if (user.isAccountVerified) return res.json({ success: false, message: "Account already verified" });

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpiredAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();

    await sendEmail({
      email: user.email,
      subject: "Account Verification OTP",
      text: `Hi ${user.name}, your OTP for account verification is: ${otp}. It expires in 24 hours.`,
    });

    console.log("✅ Verification OTP sent to:", user.email);

    return res.json({ success: true, message: "Verification OTP sent on Email" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// Verify Email

export const verifyEmail = async (req, res) => {
  const { userID, otp } = req.body;
  if (!userID || !otp) return res.json({ success: false, message: "Missing details" });

  try {
    const user = await UserModel.findById(userID);
    if (!user) return res.json({ success: false, message: "User not found" });
    if (user.verifyOtp !== otp) return res.json({ success: false, message: "Invalid OTP" });
    if (user.verifyOtpExpiredAt < Date.now()) return res.json({ success: false, message: "OTP Expired" });

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpiredAt = 0;
    await user.save();

    return res.json({ success: true, message: "Email Verified Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// Send Password Reset OTP

export const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.json({ success: false, message: "Email is required" });

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpiredAt = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    await sendEmail({
      email: user.email,
      subject: "Password Reset OTP",
      text: `Hi ${user.name}, your OTP for resetting your password is: ${otp}. It expires in 15 minutes.`,
    });

    console.log("OPT:", otp);
    
    console.log("✅ Password reset OTP sent to:", user.email);

    return res.json({ success: true, message: "Password reset OTP sent on Email" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// Reset Password

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword)
    return res.json({ success: false, message: "Email, OTP, and new password are required" });

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    if (user.resetOtp !== otp) return res.json({ success: false, message: "Invalid OTP" });
    if (user.resetOtpExpiredAt < Date.now()) return res.json({ success: false, message: "OTP expired" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = "";
    user.resetOtpExpiredAt = 0;
    await user.save();

    return res.json({ success: true, message: "Password has been reset successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// Check Authentication

export const isAuthenticated = async (req, res) => {
  return res.json({ success: true });
};