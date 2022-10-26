// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//checks + validates keys
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),

    handleValidationErrors
];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
        const { firstName, lastName, email, password, username } = req.body;
        const checkUserName = await User.findOne({ where: { username: username } })
        if (checkUserName) return res.json({
            message: 'User Already Exists',
            statusCode: '403',
            errors: { username: "User with that username already exists" }
        });
        const checkEmail = await User.findOne({ where: { email: email } });
        if (checkEmail) return res.json({
            message: 'User Already Exists',
            statusCode: '403',
            errors: { email: "User with that email already exists" }
        });
        // try {
        let user = await User.signup({ firstName, lastName, email, username, password });
        // user = user.JSON();
        const token = await setTokenCookie(res, user);
        user.dataValues.token = token;
        console.log('***************************************', user)
        return res.json(user)
        // } catch (e) {
        //     const validationErr = new Error();
        //     validationErr.message = 'Validation error'
        //     validationErr.statusCode = 400;
        //     validationErr.errors = {};
        //     for (let itError of e.errors) {
        //         if (itError.path == "firstName") validationErr.errors.firstName = 'First Name is required';
        //         if (itError.path == 'lastName') validationErr.errors.lastName = 'Last Name is required';
        //         if (itError.path == 'email') validationErr.errors.email = 'Invalid email';
        //         if (itError.path == 'username') validationErr.errors.username = 'Username is required'

        //     if (!email || !username || !firstName || !lastName) {
        //         const validationErr = new Error();
        //         validationErr.statusCode = 400;
        //         validationErr.message = 'Validation error'
        //         if (!email) validationErr.errors.email = "Invalid email";
        //         if (!username) validationErr.errors.username = "Username is required";
        //         if (!firstName) validationErr.errors.firstName = "First Name is required";
        //         if (!lastName) validationErr.errors.lastName = "Last Name is required";
        //         return res.json(validationErr.message, validationErr.statusCode, validationErr.errors)

        //     }
        //
        // }
        // res.json(validationErr)
        // }
    }
);

module.exports = router;
