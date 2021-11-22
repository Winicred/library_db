const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const User = require("../models/user")
const config = require('../config/dbconfig')
const {check, validationResult} = require('express-validator')


// @route   POST api/auth/user
// @desc    User registration
// @access  Public 
router.post('/user', [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({min: 6}),
    ],
    async (req, res) => {
        console.log(req.body)
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        const {name, email, password} = req.body
        console.log(email)
        try {
            let user = await User.findOne({where: {email: email}})
            console.log(user)
            if (user) {
                return res.status(400).json({errors: [{msg: 'User already exists'}]})
            }
            user = new User({name, email, password})
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)

            await user.save()

            const payload = {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }

            jwt.sign(payload, config.jwtSecret, {expiresIn: '5 hours'},
                (err, token) => {
                    if (err) throw err;
                    res.json({token})
                }
            )
            console.log('User registered')
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error')
        }
    }
)

// @route    POST api/auth
// @desc     Authenticate User & get token
// @access   Public
router.post('/',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        const {email, password} = req.body
        try {
            let user = await User.findOne({where: {email: email}})
            if (!user) {
                return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]})
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]})
            }
            const payload = {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }
            jwt.sign(payload, config.jwtSecret, {expiresIn: '5 hours'},
                (err, token) => {
                    if (err) throw err
                    res.json({token})
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error')
        }
    }
)


// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findOne({where: {id: req.user.id}, attributes: {exclude: ['password']}})
        res.json(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

module.exports = router