const Dealer = require('../model/Dealer');
const bcrypt = require('bcryptjs');




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
exports.loginDealer = async (req, res) => {
    const { phone, password } = req.body;

  try {
    const dealer = await Dealer.findOne({ phone });
    if (!dealer) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, dealer.password);
    if (password!=dealer.password) {
      return res.status(401).json({ error: 'Invalid credential' });
    }

    // Optionally, you can generate a token here if needed
    // const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ dealerId: dealer._id });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
