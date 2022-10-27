const express = require("express");
const router = express.Router();
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, SpotImage, ReviewImage, Booking, Review, Sequelize } = require('../../db/models');
const { check, param } = require("express-validator");
const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");
const { Op } = require("sequelize");

//get all current users bookings
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
});

//edit booking
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    let { startDate, endDate } = req.body;
    const edittedBooking = await Booking.findByPk(req.params.bookingId);
    if (!edittedBooking) res.json({ message: "Booking couldn't be found", statusCode: 404 });
    edittedBooking.startDate = startDate;
    edittedBooking.endDate = endDate



    res.json(edittedBooking)

})

//delete a booking
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    let deletedBooking = await Booking.findByPk(req.params.bookingId);
    if (!deletedBooking) res.json({ message: "Booking couldn't be found", statusCode: 404 });
    await deletedBooking.destroy();

    res.json({ message: "Successfully deleted", statusCode: 200 })
})
module.exports = router;
