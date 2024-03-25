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
      default: "freeuser",
    },
    isBlocked:{
      type: Boolean,
      default: false,
    },
    isSubscibed: {
      type: String,
    },
    isSubCanceled: {
      type: String,
      enum: ["Active", "ActiveTillEnd"],
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

//account verification
UserSchema.methods.createAccountVerificationToken = async function () {
  //create the random bytes
  const verifiactionToken = crypto.randomBytes(32).toString("hex");

  this.accountVerificationToken = crypto
    .createHash("sha256")
    .update(verifiactionToken)
    .digest("hex");

  this.accountVerificationTokenExpires = Date.now() + 30 * 60 * 1000;

  return verifiactionToken;
};

//password reset logic

UserSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetTokenExpires = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
