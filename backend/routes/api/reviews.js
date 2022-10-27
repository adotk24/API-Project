const express = require("express");
const router = express.Router();
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, SpotImage, ReviewImage, Booking, Review, Sequelize } = require('../../db/models');
const { check, param } = require("express-validator");
const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");
const { Op } = require("sequelize");

//Get all reviews by current user
router.get('/current', async (req, res, next) => {
    const reviews = await Review.findAll({})


});

//Create an Image for Review
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);
    if (!review) res.json({ message: "Review couldn't be found", statusCode: 404 });
    let image = await review.createReviewImage({ url: req.body.url });

    let reviewCount = await ReviewImage.findAll({ where: { reviewId: req.params.reviewId } });

    if (reviewCount.length > 10) res.json({ message: 'Maximum number of images for this resource was reached', statusCode: 403 })

    // console.log('****************************************************', review);
    delete image.dataValues.reviewId;
    delete image.dataValues.updatedAt;
    delete image.dataValues.createdAt;

    console.log('***************************************', reviewCount)
    res.json(image)
});





module.exports = router;
