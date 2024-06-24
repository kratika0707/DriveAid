const express = require('express');
const router = express.Router();
const Dealer = require('../model/Dealer');
const { registerDealer } = require('../controllers/dealercontroller');

// Route to handle direct creation of Dealer instance
router.post('/', async (req, res) => {
    try {
        const dealer = new Dealer(req.body);
        await dealer.save();
        res.status(201).send(dealer);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Route to use the registerDealer controller function
router.post('/register', registerDealer);

module.exports = router;
