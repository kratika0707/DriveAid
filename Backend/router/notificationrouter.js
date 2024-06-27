const express = require('express');
const router = express.Router();
const Notification = require('../model/Notifications');


router.post('/', async (req, res) => {
    try {
        const notification = new Notification(req.body);
        await notification.save();
        res.status(201).send(notification);
    } catch (error) {
        res.status(400).send(error);
    }
});


module.exports = router;