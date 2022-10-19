// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require("../../utils/auth.js");
// backend/routes/api/index.js

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

// testing router endpoint
router.get('/test', (req, res) => {
    // res.json({ requestBody: req.body });
    res.json({ test: "seattlemarinersseattlemarinersseattlemariners" })
});

module.exports = router;
