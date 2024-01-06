const express = require('express');
const router = express.Router();
const User = require('../models/User.model.js')

// create a user using: POST "/api/auth/"
router.post('/', (req, res) => {
    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.send(res.body)
})

module.exports = router