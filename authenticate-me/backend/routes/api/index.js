// backend/routes/api/index.js
const router = require('express').Router();
const { restoreUser } = require("../../utils/auth.js");
// backend/routes/api/index.js




router.use(restoreUser);

//testing router endpoint
// router.post('/test', (req, res) => {
//     res.json({ requestBody: req.body });
// });

module.exports = router;
