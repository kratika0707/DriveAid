const express = require('express');
const router = express.Router();
const Service = require('../model/Service');
const { bookService,getHistory,getService,  allocatemechanic, completeService} = require('../Controllers/servicecontroller');


// router.post('/', async (req, res) => {
//     try {
//         const service = new Service(req.body);
//         await service.save();
//         res.status(201).send(service);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

router.post('/book',bookService);
router.get('/history/:userid',getHistory);
router.get('/:serviceId',getService);
router.post('/:serviceId/allocate-mechanic', allocatemechanic);
router.put('/completeservice/:serviceId', completeService);
module.exports = router;