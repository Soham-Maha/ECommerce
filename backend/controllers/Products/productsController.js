const express = require("express");
const asyncHandler = require("express-async-handler");
const Product =require("../../model/Products/Products.js");
const mongoose = require('mongoose');

//create product
const createProduct = asyncHandler(async(req,res)=>{
    const {
        title,
        description,
        description2,
        description3,
        descriptionHero,
        adcopyFb1,
        adcopyFb2,
        adcopy1,
        adcopy2,
        adcopy3,
        creative1,
        creative2,
        free,
        priceOfGoods,
        sellPrice,
        aliexpressLink,
        cjdropshippingLink,
        competitorShop,
        productAge,
        ppopularity,
        competitivness,
        bestPlatform,
        category,
        keywords,
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
        image7,
        image8,
        } = req?.body;
    try {
        
        //check if we have a video
        const creativeGot = [];
        const imagesGot = [];

        req.images.map((creative)=>{
            if(creative.endsWith(".mov") || creative.endsWith(".mp4")) {
                creativeGot.push(creative)
            }
        });

        req.images.map((image)=>{
            if(image.endsWith(".jpg") || image.endsWith(".png") || image.endsWith(".jpeg")) {
                imagesGot.push(image);
            }
        });

        //create product
        const newProduct = await Product.create({
            ...req?.body,
            creative1: creativeGot[0],
            creative2: creativeGot[1],
            image1: imagesGot[0],
            image2: imagesGot[1],
            image3: imagesGot[2],
            image4: imagesGot[3],
            image5: imagesGot[4],
            image6: imagesGot[5],
            image7: imagesGot[6],
            image8: imagesGot[7],
            user: req?.user?._id,
        });

        res.status(201).json(newProduct);
        
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message,
    });
    }
});


//fetch all products



module.exports = {
    createProduct,
}