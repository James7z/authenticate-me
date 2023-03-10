const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Username is required'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('username')
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    check('firstName')
        //.exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('First Name is required'),
    check('lastName')
        //.exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Last Name is required'),
    handleValidationErrors
];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
        const { username,
            firstName, lastName,
            email, password } = req.body;
        const user = await User.signup({
            username,
            firstName, lastName,
            email, password
        });
        const userRes = user.toJSON();
        userRes.token = await setTokenCookie(res, user);

        return res.json({
            user: userRes
        });
    }
);

module.exports = router;
