const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    obj = {
        a: "qq",
        Number: 34
    }
    res.json(obj)
})

module.exports = router