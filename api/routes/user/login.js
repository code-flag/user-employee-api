const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/', (req, res) => {

    const user = {
        userId: 'a5efcd6',
        username: 'brad',
        email: 'awrfranc@gmail.com'
    };

    jwt.sign({user}, 'secretkey', {expiresIn: '60000s'}, (err, token) => {
        res.json({
            token
        })
    });

});

module.exports = router;