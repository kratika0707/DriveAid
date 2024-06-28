const express = require('express');
const router = express.Router();
const User = require('../model/user');
const { loginUser, logoutUser , getNotifications} = require('../Controllers/usercontroller');

router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);

    }
});
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.get(':userId/notifications',getNotifications);


module.exports = router;