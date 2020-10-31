const { check } = require('express-validator')

exports.userSignupValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required'),
    check('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
    check('password')
        .isLength({ min: 6 }).withMessage('password must be a least 6 characters long')
        .matches(/\d/).withMessage('password must contain a number')
]

exports.userSigninValidator = [
    check('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
    check('password')
        .isLength({ min: 6 }).withMessage('password must be a least 6 characters long')
        .matches(/\d/).withMessage('password must contain a number')
]
