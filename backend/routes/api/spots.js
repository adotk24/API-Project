const express = require("express");
const router = express.Router();
const { handleValidationErrors } = require('../../utils/validation');
const {
    User,
    Spot,
    SpotImage,
    ReviewImage,
    Booking,
    Review
} = require('../../db/models');
