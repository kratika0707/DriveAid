const Mechanic = require('../model/mechanic');
const bcrypt = require('bcryptjs');

exports.loginMechanic = async (req, res) => {
    const { phone, password } = req.body;

  try {
    mechanic = await Mechanic.findOne({ phone });
    if (!mechanic) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, mechanic.password);
    if (password!=mechanic.password) {
      return res.status(401).json({ error: 'Invalid credential' });
    }

    // Optionally, you can generate a token here if needed
    // const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ mechanicId: mechanic._id });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
