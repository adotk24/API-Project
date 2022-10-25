const express = require("express");
const router = express.Router();
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, SpotImage, ReviewImage, Booking, Review } = require('../../db/models');
const { check, param } = require("express-validator");
const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");
const { Op } = require("sequelize");

//get all spots
router.get('/', async (req, res, next) => {
    let { page, size } = req.query;
    if (!page || page < 1 || isNaN(page)) page = 1;
    if (!size || size < 1 || isNaN(size)) size = 8;

    page = parseInt(page);
    size = parseInt(size);

    const pagination = {};
    if (page > 0 && size > 0) {
        pagination.limit = size;
        pagination.offset = size * (page - 1)
    }

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
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address, city, state, country, lat, lng, name, description, price

    })
    res.json(newSpot)
});

//get details of spot from an id
router.get('/:spotId', async (req, res, next) => {
    const selectedSpot = await Spot.findByPk(req.params.spotId);
    return res.json(selectedSpot)
});

//add image to spot based on spot's id
router.post('/:spotId/images', async (req, res, next) => {
    const { url, preview } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);
    const spotImage = await SpotImage.create({
        spotId: spot.id,
        url,
        preview
    });
    res.json({ id: spotImage.id, url, preview })
});

//edit a spot
router.put('/:spotId', async (req, res, next) => {
    const edittedSpot = await Spot.findByPk(req.params.spotId);
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    if (edittedSpot) {
        if (address) edittedSpot.address = address;
        if (city) edittedSpot.city = city;
        if (state) edittedSpot.state = state;
        if (country) edittedSpot.country = country;
        if (lat) edittedSpot.lat = lat;
        if (lng) edittedSpot.lng = lng;
        if (name) edittedSpot.name = name;
        if (description) edittedSpot.description = description;
        if (price) edittedSpot.price = price;
        return res.json(edittedSpot)
    };
});
//delete a spot

router.delete('/:spotId', async (req, res, next) => {

    const deletedSpot = await Spot.findByPk(req.params.spotId);
    if (deletedSpot) await deletedSpot.destroy();
    return res.json({ message: 'it was destroyed!' })
});



module.exports = router;
