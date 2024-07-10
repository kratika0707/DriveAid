const express = require('express');
const router = express.Router();
const MechNotification = require('../model/Mechnotification');


// router.post('/', async (req, res) => {
//     try {
//         const mechnotification = new MechNotification(req.body);
//         await mechnotification.save();
//         res.status(201).send(mechnotification);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });


module.exports = router;