const express = require('express');
const router = express.Router();
const Usernotification = require('../model/Usernotifications');


router.post('/', async (req, res) => {
    try {
        const usernotification = new Usernotification(req.body);
        await usernotification.save();
        res.status(201).send(usernotification);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;