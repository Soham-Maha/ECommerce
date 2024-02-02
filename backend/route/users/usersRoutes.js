const express = require('express');
const { registerUser, userLogin, userDetails, fetchAllUsers, stripePrices, userPasswordUpdate, userPasswordReset, userPasswordResetAfterClick ,verifyAccount, verifyAccountAfterClick, updateUserfield} = require('../../controllers/Users/userController');
const userAuth = require("../../middleware/auth/Auth.js")

const route = express.Router();

route.post('/register',registerUser);
route.post('/login',userLogin);
route.get('/userDetails',userAuth ,userDetails);
route.get('/allUsers',fetchAllUsers);
route.get('/stripePrices',userAuth,stripePrices);
route.put('/updatePassword',userAuth,userPasswordUpdate);
route.put('/passwordReset',userPasswordReset);
route.put('/passwordResetAfter',userPasswordResetAfterClick);
route.post('/verifyAccount',userAuth,verifyAccount);
route.put('/verifyAccountAfter',userAuth,verifyAccountAfterClick);
route.put('/updateUser',userAuth,updateUserfield);



 
module.exports = route; 