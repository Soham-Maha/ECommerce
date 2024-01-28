const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../../model/User/User.js");
const mongoose = require("mongoose");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.APP_SENDGRID_API_KEY);
const stripe = require("stripe")(process.env.APP_STRIPE_SECRET_KEY);
const crypto = require("crypto");

const expiryDate = new Date();
const date1 = expiryDate.setTime(expiryDate.getTime() + 12);

//register a user
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req?.body;
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      throw new Error("User Already exists! Please login.");
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    //stripe customer id
    const stripeCustomer = await stripe.customers.create({ email: email });

    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: encryptedPassword,
      stripe_customer_id: stripeCustomer.id,
    });
    //set cookie token
    const data = {
      id: newUser?._id,
    };
    const token = jwt.sign(data, process.env.API_JWT_SECRET_KEY, {
      expiresIn: "12h",
    });

    const createdUser = newUser;
    createdUser.password = undefined;

    res
      .status(201)
      .cookie("token", token, { expires: new Date(Date.now() + date1) })
      .json({ success: true, token, createdUser });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

//Login User
const userLogin = asyncHandler(async(req,res)=>{
  const {email,password} = req?.body;
  try {
    const emailExists = await User.findOne({ email: email });

    if (!emailExists) {
      throw new Error("User does not exist! Please Register!");
    }

    const user = await User.findOne({email: email})
    const comparePassword = await bcrypt.compare(password, user?.password);
    if(!comparePassword){
      throw new Error("Password does not match")
    }

    const data = {
      id:user?._id,
    };

    //sign in the cookie token
    const token = jwt.sign(data, process.env.API_JWT_SECRET_KEY, {
      expiresIn: "12h",
    });
    
    user.password = undefined;

    res.status(200).cookie("token",token, {
      expires: new Date(Date.now()+date1),
      sameSite: "None",
      secure: true,
    }).json({
      success: true,
      token,
      user,
    })

  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
})

//user details
const userDetails = asyncHandler(async(req,res)=>{
  const id = req?.user?._id;
  try {
    const user = await User.findById(id).select("-password ");
    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    res.status(401).json({
      success:false,
      message:error.message,
    });
  }
})

//fetch all users

const fetchAllUsers = asyncHandler(async(req,res)=>{
  try {
    const user = await User.find();
    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    res.status(401).json({
      success:false,
      message:error.message,
    });
  }
})

//get all stripe subcriptions
const stripePrices = asyncHandler(async(req,res)=>{
  try {
    const prices = await stripe.prices.list();
    const pricesdata = prices?.data;
    res.status(200).json({
      success:true,
      pricesdata,
    });
  } catch (error) {
    res.status(401).json({
      success:false,
      message:error.message,
    });
  }
})

//user change passwords
const userPasswordUpdate = asyncHandler(async(req,res)=>{
  const {password} = req?.body;
  const id =req?.user?._id;

  try {
    const user = await User.findById(id);
    
    const comparePassword = await bcrypt.compare(password,user?.password);
    if(comparePassword){
      throw new Error("Please enter a different password from the previous password");
    }
    else{
      const salt =await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);

      user.password =encryptedPassword;

      const updatedUser = await user.save();

      res.status(201).json({
        updatedUser,
      })
    }

  } catch (error) {
    res.status(401).json({
      success:false,
      message:error.message,
    });
  }
});

//reset password Logic/controller

const userPasswordReset = asyncHandler(async(req,res)=>{
  const {email} = req?.body;
  try {
    const user = await User.findOne({email:email});

    if(user){
      throw new Error("Please Resgister!User does not exists")
    }

    const resetPasswordToken = await user.createPasswordResetToken();

    user.passwordResetToken = resetPasswordToken
  } catch (error) {
    res.status(401).json({
      success:false,
      message:error.message,
    });
  }
})

module.exports = {
  registerUser,
  userLogin,
  userDetails,
  fetchAllUsers,
  stripePrices,
  userPasswordUpdate,
};
