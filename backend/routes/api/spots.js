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
});

//create a spot
router.post('/', async (req, res, next) => {
    const { address, city, state, country, latitude, longitude, name, description, price } = req.body;
    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address, city, state, country, latitude, longitude, name, description, price

    })
    res.json(newSpot)
});

//get details of spot from an id
router.get('/:spotId', async (req, res, next) => {
    const selectedSpot = await Spot.findByPk(req.params.spotId);
    res.json(selectedSpot)
});

//add image to spot based on spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const { url, preview } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);
    const spotImage = await SpotImage.create({
        spotId: spot.id,
        url,
        preview
    });
    res.json({ id: spotImage.id, url, preview })
})

module.exports = router;
