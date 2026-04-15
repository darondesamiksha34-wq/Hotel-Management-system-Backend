// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name: {type: String,required: true},
//     email: {type: String,required: true,unique: true},
//     password: {type: String,required: true},
//     verifyOtp: {type: String,default: ''},
//     verifyOtpExpiredAt: {type: Number,default: 0},
//     isAccountVerified: {type: Boolean,default: false},
//     resetOtp: {type: String,default: ''},
//     resetOtpExpiredAt: {type: String,default: 0},
// })
// const usermodel = mongoose.model.user || mongoose.model('user',userSchema);
// export default usermodel;


import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },

    // Email verification OTP
    // verifyOtp: { type: String, default: "" },
    // verifyOtpExpiredAt: { type: Number, default: 0 },
    // isAccountVerified: { type: Boolean, default: false },

    // Password reset OTP
    resetOtp: { type: String, default: "" },
    resetOtpExpiredAt: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel;