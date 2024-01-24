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

//register a user
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name, surname } = req?.body;
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      throw new Error("User Already exists! Please login.");
    }

    const newUser = await User.create({
      firstName: name,
      lastName: surname,
      email: email,
      password: password,
    });

    const createdUser = newUser;

    res.status(201).json({ success: true, createdUser });
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
