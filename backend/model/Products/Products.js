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
})