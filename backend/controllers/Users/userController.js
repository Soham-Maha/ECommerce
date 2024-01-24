const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asynchandler = require('express-async-handler');
const User = require('../../model/User/User.js');
const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.APP_SENDGRID_API_KEY);
