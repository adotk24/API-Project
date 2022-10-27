const express = require("express");
const router = express.Router();
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, SpotImage, ReviewImage, Booking, Review, Sequelize } = require('../../db/models');
const { check, param } = require("express-validator");
const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");
const { Op } = require("sequelize");

//Get all reviews by current user
router.get('/current', requireAuth, async (req, res, next) => {
    const Reviews = await Review.findAll({
        where: { userId: req.user.id },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: Spot, attributes: { exclude: ['description', 'updatedAt', 'createdAt'] } },
            { model: ReviewImage, attributes: ['id', 'url'] }
        ]
    });
    for (let itReviews of Reviews) {

        const spotId = itReviews.dataValues.Spot.id;
        const previewImage = await SpotImage.findOne({ where: { spotId: spotId } })
        if (previewImage) itReviews.dataValues.Spot.dataValues.previewImage = previewImage.dataValues.url;
    }
    res.json({ Reviews })
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

    res.json(image)
});


//Edit a Review
router.put('/:reviewId', requireAuth, async (req, res, next) => {
    let updatedReview = await Review.findByPk(req.params.reviewId);
    if (!updatedReview) res.json({ message: "Review couldn't be found", statusCode: 404 });

    res.json(updatedReview)
});

//delete a review
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    let deletedReview = await Review.findByPk(req.params.reviewId);
    if (!deletedReview) res.json({ message: "Review couldn't be found", statusCode: 404 });
    await deletedReview.destroy();

    res.json({ message: "Successfully deleted", statusCode: 200 })
})


module.exports = router;
