const express = require("express");
const asyncHandler = require("express-async-handler");
const Product = require("../../model/Products/Products.js");
const mongoose = require("mongoose");

//create product
const createProduct = asyncHandler(async (req, res) => {
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

    req.images.map((creative) => {
      if (creative.endsWith(".mov") || creative.endsWith(".mp4")) {
        creativeGot.push(creative);
      }
    });

    req.images.map((image) => {
      if (
        image.endsWith(".jpg") ||
        image.endsWith(".png") ||
        image.endsWith(".jpeg")
      ) {
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
const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const allProducts = await Product.find({})
      .populate("user")
      .sort({ createdAt: -1 });

    res.status(200).json(allProducts);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

//fetch free products
const fetchFreeProd = asyncHandler(async (req, res) => {
  try {
    const fetchFreeProducts = await Product.find({ free: true })
      .sort({ createdAt: -1 })
      .populate("user");

    res.status(200).json(fetchAllProducts);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

//fetch paid products
const fetchPaidProd = asyncHandler(async (req, res) => {
  try {
    const fetchPaidProducts = await Product.find({ free: false })
      .populate("user")
      .sort({ createdAt: -1 });

    res.status(200).json(fetchPaidProducts);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

//fetch Google products
const fetchGoogleProd = asyncHandler(async (req, res) => {
  try {
    const googleProd = await Product.find({
      free: false,
      bestPlatform: "Google",
    })
      .populate("user")
      .sort({ createdAt: -1 });

    res.status(200).json(fetchGoogleProd);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

//fetch Facebook Products
const fetchFacebookProd = asyncHandler(async (req, res) => {
  try {
    const facebookProd = await Product.find({
      free: false,
      bestPlatform: "Facebook",
    })
      .populate("user")
      .sort({ createdAt: -1 });

    res.status(200).json(fetchFacebookProd);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

//fetch single product
const fetchSingleProd = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const singleProd = await Product.findById(id).populate("user");
    res.status(200).json(singleProd);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

//fetch single product free
const fetchSingleProdFree = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const singleProdFree = await Product.find({ _id: id, free: true }).populate(
      "user"
    );
    res.status(200).json(singleProdFree);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

//update product
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const user = req?.user;
    const updateProd = await Product.findByIdAndUpdate(
      id,
      {
        ...req.body,
        user: user?._id,
      },
      { new: true }
    );

    const updatedProd = await Product.findById(id).populate("user");

    res.status(201).json(updateProd);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

//delete a single product
const deleteProductSingle = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const deleteProduct = await Product.findByIdAndDelete(id);

    res.status(200).json(deleteProduct);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

//delete all product
const deleteAllProducts = asyncHandler(async (req, res) => {
  try {
    const deleteAll = await Product.deleteMany({});
    res.status(200).json(deleteAll);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = {
  createProduct,
  fetchAllProducts,
  fetchFreeProd,
  fetchPaidProd,
  fetchGoogleProd,
  fetchFacebookProd,
  fetchSingleProd,
  fetchSingleProdFree,
  updateProduct,
  deleteProductSingle,
  deleteAllProducts,
};
