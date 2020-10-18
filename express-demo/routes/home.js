const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    //used pug template engine and used render to send html markup to client
    //when building RESTful services, we don't really need view engine/template engine
    res.render('index', {title: 'My Express App', message: 'Hello'});
});

module.exports = router;