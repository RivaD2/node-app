
const asyncMiddleware = require('../express-demo/async.js');
const mongoose = require('mongoose');
const express = require('express');
const { reset } = require('nodemon');
const router = express.Router();



router.get('/', asyncMiddleware(async(req, res) => {
    const genres = await genres.find().sort('name');
    res.send(genres);

}));

router.post('/', auth, asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new genre({ name: req.body.name });
    genre = await genre.save();

    res.send(genre);
}));