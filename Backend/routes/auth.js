const express = require('express');
const router = express.Router();
const User = require('../models/User.model.js');
const { body, validationResult } = require('express-validator');

// create a user using: POST "/api/auth/"
router.post('/', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast 5 character').isLength({ min: 5 }),
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // console.error('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(User => res.json(User))
        .catch(err => {
            console.log(err)
            res.json({ error: 'Please enter a unique value for Email' })
        })

    // res.send(req.body);
});

module.exports = router;
