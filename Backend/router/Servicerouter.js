const express = require('express');
const router = express.Router();
const Service = require('../model/Service');

router.post('/', async (req, res) => {
    try {
        const service = new Service(req.body);
        await service.save();
        res.status(201).send(service);
    } catch (error) {
        res.status(400).send(error);
    }
});


module.exports = router;