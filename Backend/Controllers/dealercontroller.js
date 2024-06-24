const Dealer = require('../model/Dealer');

// Controller to handle dealer registration
exports.registerDealer = async (req, res) => {
    const { name, phone, email, password, location } = req.body;

    // Validate required fields
    if (!name || !phone || !email || !password || !location) {
        console.log('Missing required fields', req.body);
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newDealer = new Dealer({
           bname:name,
           phone:phone,
           email:email,
           location:location,
           password:password
        });

        await newDealer.save();
        res.status(201).send({ message: 'Dealer registered successfully' });
    } catch (error) {
        console.error('Error saving dealer:', error);
        res.status(400).json({ error: 'An error occurred while registering the dealer' });
    }
};
