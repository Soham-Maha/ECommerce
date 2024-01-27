const express = require('express');
const { registerUser, userLogin, userDetails, fetchAllUsers } = require('../../controllers/Users/userController');
const userAuth = require("../../middleware/auth/Auth.js")

const route = express.Router();

route.post('/register',registerUser);
route.post('/login',userLogin);
route.get('/userDetails',userAuth ,userDetails);
route.get('/allUsers',fetchAllUsers);


module.exports = route; 