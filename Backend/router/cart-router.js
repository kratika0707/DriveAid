const express = require('express');
const router = express.Router();
const Cart = require('../model/Cart');
const { getcartitem, removeItemFromCart } = require('../Controllers/Cartcontroller');


router.post('/', async (req, res) => {
    try {
        const cart = new Cart(req.body);
        await cart.save();
        res.status(201).send(cart);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/getcartitem/:mechanicId', getcartitem);
router.delete('/removeitem/:mechanicId/:productId', removeItemFromCart);
module.exports = router;