const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//user schema

const UserSchema = new mongoose.Schema(
  {
    email: {
      required: [true, "Please enter your E-Mail!"],
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your Password!"],
      minLength: [8, "Password must be atleast 8 characters long!"],
    },
    firstName: {
      type: String,
      required: [true, "Please enter your Name!"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter your Surname!"],
    },
    stripe_customer_id: {
      type: String,
    },
    subscriptions: [],
    isVerified: {
      type: Boolean,
      default: false,
    },
    accountVerificationToken: String,
    accountVerificationTokenExpires: Date,
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    profilePhoto: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_960_720.png",
    },
    role: {
      type: String,
      enum: ["subsciber", "Admin", "freeuser", "influencer"],
    },
    isSubscibed: {
      type: String,
    },
    saved: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);


const User = mongoose.model("User", UserSchema);
module.exports = User;