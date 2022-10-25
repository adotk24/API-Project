const express = require("express");
const router = express.Router();
const { handleValidationErrors } = require('../../utils/validation');
const {User, Spot, SpotImage, ReviewImage, Booking, Review} = require('../../db/models');
const {check, param} = require("express-validator");
const { setTokenCookie, requireAuth, restoreUser} = require("../../utils/auth");
const {Op} = require("sequelize");

module.exports = router;
