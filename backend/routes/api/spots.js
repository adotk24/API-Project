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
    const currentUsersSpots = await Spot.findAll({
        where: { ownerId: userId },
        include: [{ model: SpotImage, attributes: { exclude: ['createdAt', 'updatedAt'] } }]
    });
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
    if (!selectedSpot) {
        return res.json({ message: "Spot couldn't be found", statusCode: 404 })
    }
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
    let { address, city, state, country, lat, lng, name, description, price } = req.body;
    const user = await User.findByPk(req.user.id)
    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address, city, state, country, lat, lng, name, description, price

    });

    res.json(newSpot)
});


//add image to spot based on spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    let { url, preview } = req.body;
    const findMatchingSpot = await Spot.findByPk(req.params.spotId);
    if (!findMatchingSpot) {
        return res.json({ message: "Spot couldn't be found", statusCode: 404 })
    }

    const spotImage = await SpotImage.create({
        spotId: req.params.spotId,
        url,
        preview
    });

    const responseBody = {
        id: spotImage.id,
        url: spotImage.url,
        preview: spotImage.preview
    }

    res.json(responseBody)
});

//edit a spot
router.put('/:spotId', requireAuth, async (req, res, next) => {
    const edittedSpot = await Spot.findByPk(req.params.spotId);

    if (!edittedSpot) {
        return res.json({ message: "Spot couldn't be found", statusCode: 404 })
    };
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    return res.json(edittedSpot)

});


//delete a spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    let deleteSpot = await Spot.findByPk(req.params.spotId);
    if (!deleteSpot) res.json({ message: "Spot couldn't be found", statusCode: 404 });
    await deleteSpot.destroy();

    res.json({ message: "Successfully deleted", statusCode: 200 })
})
//Create review for spot

router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId, { include: { model: Review } });
    if (!spot) {
        res.json({ message: "Spot couldn't be found", statusCode: 404 })
    };
    let reviewChecker = (spot, userId) => {
        spot = spot.toJSON();
        for (let review of spot.Reviews) {
            if (userId == review.userId) return true
        }
        return false
    };
    if (reviewChecker(spot, req.user.id)) {
        res.json({ message: 'User already has a review for this spot', statusCode: 403 })
    };

    let resBody = await spot.createReview({
        userId: req.user.id,
        spotId: req.params.spotId,
        review: req.body.review,
        stars: req.body.stars
    });
    let review = resBody.dataValues.review;
    let stars = resBody.dataValues.stars;
    res.json(resBody)
});

//get reviews by spotId
router.get('/:spotId/reviews', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) res.json({ message: "Spot couldn't be found", statusCode: 404 });

    const reviews = await Review.findAll({
        where: { spotId: req.params.spotId },
        include: [{
            model: User, attributes: ['id', 'firstName', 'lastName']
        },
        {
            model: ReviewImage, attributes: ['id', 'url']
        }]
    });
    res.json({ Reviews: reviews })
})

//Create booking based on spot id
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) res.json({ message: "Spot couldn't be found", statusCode: 404 });

    const { startDate, endDate } = req.body;
    if (startDate > endDate) {
        return res.json({
            message: 'Validation error',
            startDate: 404,
            errors: { endDate: 'endDate cannot be on or before startDate' }
        })
    };

    let checkBookings = await Booking.findAll({ where: { spotId: req.params.spotId } });

    for (let itBooking of checkBookings) {
        console.log(itBooking)
        let checkStart = Date.parse(itBooking.dataValues.startDate);
        let checkEnd = Date.parse(itBooking.dataValues.endDate);
        let parseStart = Date.parse(startDate);
        let parseEnd = Date.parse(endDate)
        if ((checkStart >= parseStart && checkEnd <= parseEnd) ||
            (checkStart <= parseEnd && checkEnd >= parseStart)) {
            return res.json({
                message: 'Sorry, this spot is already booked for the specified dates',
                statusCode: 403, errors: {
                    startDate: 'Start date conflicts with an existing booking',
                    endDate: 'End date conflicts with an existing booking'
                }
            })
        }
    }

    const booking = await Booking.create({
        spotId: spot.id, userId: req.user.id, startDate, endDate
    })
    return res.json(booking)

});

//get All Bookings for a Spot by Id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const bookings = await Booking.findAll({
        where: { spotId: req.params.spotId },
        include: [{ model: User, attributes: ['id', 'firstName', 'lastName'] }]
    });
    if (!bookings.length) res.json({ message: "Spot couldn't be found", statusCode: 404 });

    res.json({ Bookings: bookings })
})


module.exports = router;
