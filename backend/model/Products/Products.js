const express = require('express')
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    description2: {
        type: String
    },
    description3: {
        type: String
    },
    descriptionHero: {
        type: String,
    },
    adCopyFb1: {
        type: String,
    },
    adCopyFb2: {
        type: String,
    },
    adCopy1: {
        type: String,
    },
    adCopy2: {
        type: String,
    },
    adCopy3: {
        type: String,
    },
    creative1:{
        type: String,
    },
    creative2:{
        type: String,
    },
    free: {
        type: Boolean,
        default: false,
    },
    priceOfGoods:{
        type: Number,
    },
    sellPrice:{
        type:Number,
    },
    aliexpressLink:{
        type: String,
    },
    cjdropshippingLink:{
        type: String,
    },
    competitorShop: {
        type: String,
    },
    productAge: {
        type: String,
    },
    ppopularity: {
        type: String,
    },
    competitivness:{
        type: Number,
    },
    bestPlatform: {
        type: String,
    },
    category: {
        type: String,
        default: "Beauty",
    },
    keywords: {
        type: [String],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    image1:{
        type: String,
    },
    image2:{
        type: String,
    },
    image3:{
        type: String,
    },
    image4:{
        type: String,
    },
    image5:{
        type: String,
    },
    image6:{
        type: String,
    },
    image7:{
        type: String,
    },
    image8:{
        type: String,
    },
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
    timestamps: {virtuals: true}
})

const Product = mongoose.model("Product",productSchema);

module.exports = Product;