// backend/routes/api/session.js
const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

// Log in
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
        const { credential, password } = req.body;

        let user = await User.login({ credential, password });
        if (!user) {
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = ['Invalid credentials'];
            return res.json({ message: err.errors[0], statusCode: err.status });
        }
        // const sameEmailUser = await User.findAll({ where: { email: user.email } });
        // if (sameEmailUser.length > 1) {
        //     const sameEmailErr = new error('same email');
        //     err.status = 403;
        //     err.errors = { email: 'User already exists' };
        //     return res.json({ message: err.errors[0], statusCode: err.status, errors: { email: 'User with that email already exists' } })
        // }
        const token = await setTokenCookie(res, user);

        return res.json({
            user
        });
    }
);

// Log out
router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
),
    // Restore session user
    router.get(
        '/',
        restoreUser,
        (req, res) => {
            const { user } = req;
            if (user) {
                const id = user.id;
                const firstName = user.firstName;
                const lastName = user.lastName;
                const email = user.email;
                const username = user.username;
                return res.json({
                    user
                });
            } else return res.json({ user: null });
        }
    );



module.exports = router;
