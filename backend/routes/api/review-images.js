const express = require("express");
const router = express.Router();
const { handleValidationErrors } = require('../../utils/validation');
const {
    User,
    Spot,
    SpotImage,
    ReviewImage,
    Review,
    Booking
} = require('../../db/models');
