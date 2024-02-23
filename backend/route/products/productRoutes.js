const express = require('express');
const userAuth = require('../../middleware/auth/Auth.js');
const { createProduct } = require('../../controllers/Products/productsController.js');
const upload = require('../../middleware/multer/multer.js');
const uploadMultipleCloudinary = require('../../middleware/upload/uploadMultiple.js');

const route = express.Router();
//routes

route.post('/createPost',userAuth,upload.array("images"),uploadMultipleCloudinary, createProduct)


module.exports = route;
