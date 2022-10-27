const express = require("express");
const router = express.Router();
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, SpotImage, ReviewImage, Booking, Review, Sequelize } = require('../../db/models');
const { check, param } = require("express-validator");
const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");
const { Op } = require("sequelize");

router.delete('/:reviewImageId', requireAuth, async (req, res, next) => {
    let deletedReview = await Review.findByPk(req.params.reviewImageId);
    if (!deletedReview) res.json({ message: "Review Image couldn't be found", statusCode: 404 });
    await deletedReview.destroy();

    res.json({ message: "Successfully deleted", statusCode: 200 })
})

module.exports = router;
