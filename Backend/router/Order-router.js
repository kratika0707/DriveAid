const express = require('express');
const router = express.Router();
const Order = require('../model/Order');
const { placeOrder, serviceOrderHistory } = require('../Controllers/OrderController');


// router.post('/', async (req, res) => {
//     try {
//         const order = new Order(req.body);
//         await order.save();
//         res.status(201).send(order);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

router.post('/placeorder', placeOrder);
router.get('/getorder/:serviceId', serviceOrderHistory);
module.exports = router;