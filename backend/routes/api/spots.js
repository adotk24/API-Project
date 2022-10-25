const express = require("express");
const router = express.Router();
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, SpotImage, ReviewImage, Booking, Review, Sequelize } = require('../../db/models');
const { check, param } = require("express-validator");
const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");
const { Op } = require("sequelize");

//get all spots
router.get('/', requireAuth, async (req, res, next) => {
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

    const spots = await Spot.findAll({ ...pagination });
    let results = [];

    for (let i = 0; i < spots.length; i++) {
        let spot = spots[i];
        spot = spot.toJSON();
        const avgRating = await Review.findAll({
            raw: true,
            where: { spotId: spot.id },
            attributes: [[Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating']]
        });

        const previewImage = await SpotImage.findAll({
            raw: true,
            where: { preview: true, spotId: spot.id },
            attributes: ['url']
        });
        if (avgRating.length) spot.avgRating = Number(avgRating[0].avgRating).toFixed(1);
        if (previewImage.length) spot.previewImage = previewImage[0].url;
        if (!previewImage.length) spot.previewImage = null
        results.push(spot)
    }

    return res.json({ 'Spots': results })
});

//get all spots owned by current user
router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const currentUsersSpots = await Spot.findAll({ where: { ownerId: userId } });
    const results = [];
    for (let i = 0; i < currentUsersSpots.length; i++) {
        let spot = currentUsersSpots[i];
        spot = spot.toJSON();
        const avgRating = await Review.findAll({
            raw: true,
            where: { spotId: spot.id },
            attributes: [[Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating']]
        });

        const previewImage = await SpotImage.findAll({
            raw: true,
            where: { preview: true, spotId: spot.id },
            attributes: ['url']
        });
        if (avgRating.length) spot.avgRating = Number(avgRating[0].avgRating).toFixed(1);
        if (previewImage.length) spot.previewImage = previewImage[0].url;
        if (!previewImage.length) spot.previewImage = null
        results.push(spot)
    }

    return res.json({ "Spots": results })
});

//get details of spot from an id
router.get('/:spotId', async (req, res, next) => {
    let selectedSpot = await Spot.findByPk(req.params.spotId, {
        include: [{ model: SpotImage, attributes: ['id', 'url', 'preview'] },
        { model: User, attributes: ['id', 'firstName', 'lastName'], as: "Owner" }
        ]
    });
    selectedSpot = selectedSpot.toJSON();
    const numberOfReviews = await Review.findAll({ where: { spotId: selectedSpot.id } });
    selectedSpot.numReviews = numberOfReviews.length;

    let avgRating = await Review.findAll({
        raw: true,
        where: { spotId: selectedSpot.id },
        attributes: [[Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating']]
    });

    if (avgRating.length) selectedSpot.avgRating = Number(avgRating[0].avgRating).toFixed(1);


    const selectedImages = await SpotImage.findAll({ where: { spotId: selectedSpot.id } })
    selectedSpot.SpotImages = selectedImages;

    return res.json(selectedSpot)
});
//create a spot
router.post('/', requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address, city, state, country, lat, lng, name, description, price

    });
    res.json(newSpot)
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
});

//edit a spot
router.put('/:spotId', requireAuth, async (req, res, next) => {
    const edittedSpot = await Spot.findByPk(req.params.spotId, {
        attributes: { exclude: ['id', 'ownerId', 'createdAt', 'updatedAt'] }
    });
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

router.delete('/:spotId', requireAuth, async (req, res, next) => {

    const deletedSpot = await Spot.findByPk(req.params.spotId);
    if (deletedSpot) await deletedSpot.destroy();
    return res.json({ message: 'Successfully deleted', statusCode: 200 })
});



module.exports = router;
