const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../../model/User/User.js");
const mongoose = require("mongoose");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.APP_SENDGRID_API_KEY);
const stripe = require("stripe");
const crypto = require("crypto");

const expiryDate = new Date();
const date1 = expiryDate.setTime(expiryDate.getTime()+1);

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

    
    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: encryptedPassword,
    });
    //set cookie token
    const data = {
      id: newUser?._id
    }
    const token = jwt.sign(data, process.env.API_JWT_SECRET_KEY,{
      expiresIn: '12h'
    })
    
    const createdUser = newUser;
    createdUser.password = undefined; 

    res.status(201).cookie("token", token, {expires: new Date(Date.now() + date1)}).json({ success: true, token, createdUser });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = {
    registerUser
}
