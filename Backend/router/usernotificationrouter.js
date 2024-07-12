const express = require('express');
const router = express.Router();
const Usernotification = require('../model/Usernotifications');


// router.post('/', async (req, res) => {
//     try {
//         const usernotification = new Usernotification(req.body);
//         await usernotification.save();
//         res.status(201).send(usernotification);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });




// router.delete('/delete', async (req, res) => {
//     try {
//       // Delete all entries
//       await Usernotification.deleteMany({});
//       res.status(200).json({ message: 'All services have been deleted.' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Failed to delete services.' });
//     }
//   });




module.exports = router;