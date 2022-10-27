const express = require("express");
const router = express.Router();
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, SpotImage, ReviewImage, Booking, Review, Sequelize } = require('../../db/models');
const { check, param } = require("express-validator");
const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");
const { Op } = require("sequelize");

router.get('/current', requireAuth, async (req, res, next) => {
    const curBookings = await Booking.findAll({
        where: { userId: req.user.id },
        include: [{
            model: Spot, attributes: { exclude: ['description', 'createdAt', 'updatedAt'] },
            model: SpotImage, where: { preview: true }
        }]

    })
    res.json(curBookings)
})


module.exports = router;
