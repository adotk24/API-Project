// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require("../../utils/auth.js");
const reviewImagesRouter = require("./review-images.js");
const reviewsRouter = require("./reviews.js");
const spotImagesRouter = require("./spot-images.js");
const spotsRouter = require("./spots.js");
const bookingsRouter = require("./bookings.js");
// backend/routes/api/index.js

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use("/bookings", bookingsRouter);
router.use('/spots', spotsRouter);
router.use("/review-images", reviewImagesRouter);
router.use("/reviews", reviewsRouter);
router.use("/spot-images", spotImagesRouter);

// testing router endpoint
router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router;
