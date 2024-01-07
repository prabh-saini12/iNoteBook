const express = require('express');
const router = express.Router();
const User = require('../models/User.model.js');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
// create a user using: POST "/api/auth/createuser" || no login requuired
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast 5 character').isLength({ min: 5 }),
], async (req, res) => {
    // if there are errors,return Bad request and the errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // console.error('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    // check whether the user with this  email already exists
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10)
        const securePassword = await bcrypt.hash(req.body.password, salt)
        // Create a new user 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        console.log(authtoken);
        res.json(authtoken)
    }
    catch (error) {
        console.log(error)
        res.status(500).send("some error occured")
    }
});

module.exports = router;
