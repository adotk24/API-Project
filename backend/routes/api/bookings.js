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
            model: Spot, attributes: { exclude: ['description', 'createdAt', 'updatedAt'] }
        }]
    })
    for (let i = 0; i < curBookings.length; i++) {
        let itBooking = curBookings[i];
        let picUrl = await SpotImage.findOne({ where: { spotId: itBooking.dataValues.spotId } })
        console.log('***************************************', picUrl.dataValues.url)
        const url = picUrl.dataValues.url
        if (picUrl) itBooking.dataValues.previewImage = url
    }
    res.json({ Bookings: curBookings })
})


module.exports = router;
