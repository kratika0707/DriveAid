const express = require('express');
const router = express.Router();
const Mechanic = require('../model/mechanic');
const {loginMechanic, registerMechanic, getNotifications, markAsRead} =require('../Controllers/mechaniccontroller');
router.post('/', async (req, res) => {
    try {
        const mechanic = new Mechanic(req.body);
        await mechanic.save();
        res.status(201).send(mechanic);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login', loginMechanic);
router.post('/register', registerMechanic);
router.get('/:mechanicId/notifications',getNotifications);
// routes/mechanic-router.js
router.patch('/notifications/:notificationId', markAsRead);

module.exports = router;