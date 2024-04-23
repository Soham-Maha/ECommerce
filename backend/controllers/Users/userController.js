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
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req?.body;
  try {
    const emailExists = await User.findOne({ email: email }).populate("saved");

    if (!emailExists) {
      throw new Error("User does not exist! Please Register!");
    }

    const user = await User.findOne({ email: email });
    const comparePassword = await bcrypt.compare(password, user?.password);
    if (!comparePassword) {
      throw new Error("Password does not match");
    }

    const data = {
      id: user?._id,
    };

    //sign in the cookie token
    const token = jwt.sign(data, process.env.API_JWT_SECRET_KEY, {
      expiresIn: "12h",
    });

    user.password = undefined;

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + date1),
        sameSite: "None",
        secure: true,
      })
      .json({
        success: true,
        token,
        user,
      });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

//user details
const userDetails = asyncHandler(async (req, res) => {
  const id = req?.user?._id;
  try {
    const user = await User.findById(id).select("-password").populate("saved");
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

//fetch all users

const fetchAllUsers = asyncHandler(async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

//get all stripe subcriptions
const stripePrices = asyncHandler(async (req, res) => {
  try {
    const prices = await stripe.prices.list();
    const pricesdata = prices?.data;
    res.status(200).json({
      success: true,
      pricesdata,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

//user change passwords
const userPasswordUpdate = asyncHandler(async (req, res) => {
  const { password } = req?.body;
  const id = req?.user?._id;

  try {
    const user = await User.findById(id);

    const comparePassword = await bcrypt.compare(password, user?.password);
    if (comparePassword) {
      throw new Error(
        "Please enter a different password from the previous password"
      );
    } else {
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);

      user.password = encryptedPassword;

      const updatedUser1 = await user.save();

      const updateUser = await User.findById(id).select("-password");

      res.status(201).json({
        updatedUser,
      });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

//reset password Logic/controller

const userPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req?.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Please Resgister!User does not exists");
    }

    const resetPasswordToken = await user.createPasswordResetToken();

    user.passwordResetToken = resetPasswordToken;

    await user.save();

    //send a token to the email and a verification button

    const resetURL = `If you want to reset your password click here: <a href="http://localhost:300/forgot-password-reset/${resetPasswordToken}">Reset Password</a>`;

    const msg = {
      to: email,
      from: "sohammaha15@gmail.com",
      subject: "Reset Password",
      html: resetURL,
    };

    await sgMail.send(msg);

    res
      .status(200)
      .json(`A reset email was sent to ${email}. The reset url: ${resetURL}`);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

//user reset password logic after email has been clicked
const userPasswordResetAfterClick = asyncHandler(async (req, res) => {
  const { password, token } = req?.body;

  try {
    //find if a user exists with the token
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });
    //throw a new error if not
    if (!user) throw new Error("User does not exist! Please Register!");
    //run if block hash password store password make token undefined save user send status
    if (user) {
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);

      user.password = encryptedPassword;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      res.status(201).json(user);
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

//verify email logic
const verifyAccount = asyncHandler(async (req, res) => {
  const { email } = req?.body;
  const id = req?.user?._id;
  try {
    const user = await User.findById(id);

    if (!user) throw new Error("No user Exists");

    if (user) {
      const verificationToken = await user.createAccountVerificationToken;
      await user.save();

      const verifyURL = `If you want to verify your account click here: <a href="http://localhost:300/verify-account/${verificationToken}">Verify Account</a>`;

      const msg = {
        to: user?.email,
        from: "sohammaha15@gmail.com",
        subject: "Verify Account",
        html: verifyURL,
      };
      await sgMail.send(msg);

      res.status(200).json(resetURL);
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

//verify user account after clicking the url in the email
const verifyAccountAfterClick = asyncHandler(async (req, res) => {
  //destructuring the variable
  const { token } = req?.body;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    accountVerificationToken: hashedToken,
    accountVerificationTokenExpires: { $gt: Date.now() },
  });
  try {
    if (!user) throw new Error("Token expired please try again!");

    user.isVerified = true;
    user.accountVerificationToken = undefined;
    user.accountVerificationTokenExpires = undefined;

    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

//update user logic
const updateUserfield = asyncHandler(async (req, res) => {
  const id = req?.user?._id;
  try {
    const user = await User.findByIdAndUpdate(id, { ...req?.body }).select(
      "-password"
    );

    if (!user) throw new Error("No user found");

    const updatedUser = await User.findById(id)
      .populate("saved")
      .select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

//save a product
const saveProduct = asyncHandler(async (req, res) => {
  const { productId } = req?.body;
  const id = req?.user?._id;
  const targetUser = await User.findById(id);
  const saveLog = targetUser?.saved?.map((prod) => {
    return prod?._id;
  });

  const isSaved = targetUser?.saved?.includes(productId);
  if (isSaved) throw new Error("Already Saved this product");

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        $push: { saved: productId },
      },
      { new: true }
    );

    const updatedUser = await User.findById(id).populate("saved");

    //send the status code and user
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

//unsave the product
const unSaveProduct = asyncHandler(async (req, res) => {
  const { productId } = req?.body;
  const id = req?.user?._id;
  const targetUser = await User.findById(id);
  const saveLog = targetUser?.saved?.map((prod) => {
    return prod?._id;
  });

  const isSaved = targetUser?.saved?.includes(productId);

  try {
    if (isSaved) {
      const user = await User.findByIdAndUpdate(
        id,
        {
          $pull: { saved: productId },
        },
        { new: true }
      );
    }

    const updatedUser = await User.findById(id).populate("saved");

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

//create subcription window hosted by stripe
const createSubWindow = asyncHandler(async (req, res) => {
  const id = req?.user?._id;

  try {
    const targetUser = await User.findById(id);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: req?.body?.priceId,
          quantity: 1,
        },
      ],
      customer: targetUser?.stripe_customer_id,
      success_url: process.env.APP_STRIPE_SUCCESS_URL,
      cancel_url: process.env.APP_STRIPE_CANCEL_URL,
    });

    res.status(200).json(session.url);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

//stripe subcription status
const subStatusUpdate = asyncHandler(async (req, res) => {
  const id = req?.user?._id;
  const targetUser = await User.findById(id);

  const customerId = await targetUser?.stripe_customer_id;
  try {
    const subStaus = await stripe.subcriptions.list({
      customer: customerId,
      status: "all",
      expand: ["data.default_payment_method"],
    });

    const updateSubStatus = await User.findByIdAndUpdate(
      id,
      {
        subscriptions: subStaus.data,
        role: "subscriber",
      },
      { new: true }
    );

    const updatedUser = await User.findById(id).populate("saved");

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

//customer subsciptions portal, manage subcriptions
const customerPortal = asyncHandler(async (req, res) => {
  const id = req?.user?._id;
  const targetUser = await User.findById(id);

  const customerId = await targetUser?.stripe_customer_id;
  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: process.env.APP_STRIPE_HOME_URL,
    });

    res.status(200).json(portalSession.url);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

//update user role and subcription after cancel
const updateSubAfterCancel = asyncHandler(async (req, res) => {
  const id = req?.user?._id;
  const targetUser = await User.findById(id);

  const customerId = await targetUser?.stripe_customer_id;

  var isCanceled = Boolean;
  try {
    const subStaus = await stripe.subcriptions.list({
      customer: customerId,
      status: "all",
      expand: ["data.default_payment_method"],
    });

    const updateSubStatus = await User.findByIdAndUpdate(
      id,
      {
        subscriptions: subStaus.data,
      },
      { new: true }
    );

    const hasCanceld = updateSubStatus.subcriptions[0].cancel_at_period_end;
    const periodEnd = updateSubStatus.subcriptions[0].current_period_end;

    function hasSubcriptionEnded(periodEnd) {
      const currentDate = new Date();
      const endDate = new Date(periodEnd * 1000);

      return currentDate > endDate;
    }

    if (hasCanceld && hasSubcriptionEnded(periodEnd)) {
      //revoke his priveledges
      const foundUser = await User.findByIdAndUpdate(id, {
        role: "freeuser",
      });
      res.status(200).json(subStaus);
    }
    if (hasCanceld && !hasSubcriptionEnded(periodEnd)) {
      const foundUser = await User.findByIdAndUpdate(
        id,
        {
          isSubCanceled: "ActiveTillEnd",
        },
        { new: true }
      );
      res.status(200).json(subStaus);
    } else {
      res.status(200).json(subStaus);
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

//check if user renews plan
const renewSub = asyncHandler(async (req, res) => {
  const id = req?.user?._id;
  const targetUser = await User.findById(id);

  const customerId = await targetUser?.stripe_customer_id;
  try {
    const subStaus = await stripe.subcriptions.list({
      customer: customerId,
      status: "all",
      expand: ["data.default_payment_method"],
    });

    const updateSubStatus = await User.findByIdAndUpdate(
      id,
      {
        subscriptions: subStaus.data,
        role: "subscriber",
      },
      { new: true }
    );
    if (
      updateSubStatus.subscriptions[0].cancel_at_period_end === false &&
      updateSubStatus.isSubCanceled === "ActiveTillEnd"
    ) {
      const subStaus = await stripe.subcriptions.list({
        customer: customerId,
        status: "all",
        expand: ["data.default_payment_method"],
      });

      const updateSubStatus = await User.findByIdAndUpdate(
        id,
        {
          subscriptions: subStaus.data,
          role: "subscriber",
          isSubCanceled: "Active",
        },
        { new: true }
      );

      const updatedUser = await User.findById(id);

      res.status(200).json(updatedUser);
    } else {
      res.status(200).json(targetUser);
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = {
  registerUser,
  userLogin,
  userDetails,
  fetchAllUsers,
  stripePrices,
  userPasswordUpdate,
  userPasswordReset,
  userPasswordResetAfterClick,
  verifyAccount,
  verifyAccountAfterClick,
  updateUserfield,
  saveProduct,
  unSaveProduct,
  createSubWindow,
  subStatusUpdate,
  customerPortal,
  updateSubAfterCancel,
  renewSub,
};
