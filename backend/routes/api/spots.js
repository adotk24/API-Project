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
const { check, param } = require("express-validator");
const {
    setTokenCookie,
    requireAuth,
    restoreUser,
} = require("../../utils/auth");
const { Op } = require("sequelize");

//get all spots
router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll();
    return res.json(spots)
});

//get all spots owned by current user
router.get('/current', async (req, res, next) => {
    const userId = req.user.id;
    const currentUsersSpots = await Spot.findAll({ where: { ownerId: userId } });
    return res.json(currentUsersSpots)
})

module.exports = router;
