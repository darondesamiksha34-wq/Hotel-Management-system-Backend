// // // import express from 'express'
// // // import { isAuthenticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail } from '../controlers/authControllers.js';
// // // import userAuth from '../middleware/userAuth.js';
// // // // import { verify } from 'jsonwebtoken';


// // // const authRouter = express.Router();

// // // authRouter.post('/signin',register);
// // // authRouter.post('/login',login);
// // // authRouter.post('/logout',logout);

// // // authRouter.post('/send-verify-otp',userAuth,sendVerifyOtp);
// // // authRouter.post('/verify-account',userAuth,verifyEmail);

// // // authRouter.post('/is-auth',userAuth,isAuthenticated);
// // // authRouter.post('/send-reset-otp',sendResetOtp);
// // // authRouter.post('/reset-password',resetPassword);


// // // export default authRouter;

// // import express from "express";
// // import {
// //   isAuthenticated,
// //   login,
// //   logout,
// //   register,
// //   forgotPassword,
// //   sendResetOtp,
// //   sendVerifyOtp,
// //   verifyEmail
// // } from "../controlers/authControllers.js";

// // import userAuth from "../middleware/userAuth.js";

// // const authRouter = express.Router();

// // // Authentication Routes
// // authRouter.post("/signup", register);
// // authRouter.post("/login", login);
// // authRouter.post("/logout", logout);


// // // Email Verification
// // authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
// // authRouter.post("/verify-account", userAuth, verifyEmail);

// // // Check if user is authenticated
// // authRouter.post("/is-auth", userAuth, isAuthenticated);

// // // Password Reset
// // authRouter.post("/send-reset-otp", sendResetOtp);
// // authRouter.post("/reset-password", forgotPassword);

// // export default authRouter;


// import express from "express";
// import {
//   isAuthenticated,
//   login,
//   logout,
//   register,
//   resetPassword,
//   sendResetOtp,
//   sendVerifyOtp,
//   verifyEmail
// } from "../controlers/authControllers.js";

// import userAuth from "../middleware/userAuth.js";

// const authRouter = express.Router();

// // Authentication Routes
// authRouter.post("/signup", register);
// authRouter.post("/login", login);
// authRouter.post("/logout", logout);

// // Email Verification
// authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
// authRouter.post("/verify-account", userAuth, verifyEmail);

// // Check if user is authenticated
// authRouter.post("/is-auth", userAuth, isAuthenticated);

// // Password Reset
// authRouter.post("/send-reset-otp", sendResetOtp);
// authRouter.post("/reset-password", resetPassword);

// export default authRouter;


import express from "express";
import {
  register,
  login,
  logout,
  sendVerifyOtp,
  verifyEmail,
  isAuthenticated,
  sendResetOtp,
  resetPassword,
} from "../controlers/authControllers.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

// Authentication
authRouter.post("/signup", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

// Email Verification
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);

// Check authentication
authRouter.post("/is-auth", userAuth, isAuthenticated);

// Password reset
authRouter.post("/send-reset-otp", sendResetOtp);
authRouter.post("/reset-password", resetPassword);

export default authRouter;