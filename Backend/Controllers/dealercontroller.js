const Dealer = require('../model/Dealer');
const bcrypt = require('bcryptjs');

const Mechanic = require('../model/mechanic');

const Notification=require('../model/Notifications');


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




exports.getMechanics = async (req, res) => {
  try {
    const { dealerid } = req.params;
    const mechanics = await Mechanic.find({ dealerid: dealerid });
    console.log('mechanics')
    res.status(200).json(mechanics);
  } catch (error) {
    console.error('Error fetching mechanics history:', error);
    res.status(500).json({ error: 'An error occurred while fetching mechanics history' });
  }
}




exports.getNotifications =async(req,res) =>{
  try {
    const { dealerId } = req.params;
    
    const notifications = await Notification.find({ dealerId: dealerId });
    console.log(notifications)
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'An error occurred while fetching notifications' });
  }
}

exports.markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    await Notification.findByIdAndUpdate(notificationId, { read: true });
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Error marking notification as read', error });
  }
};
exports.fetchdealerbyId = async(req,res)=>{
  try{
    const {dealerId} =req.params;
    const dealerfind= await Dealer.findById(dealerId);
    res.status(200).json(dealerfind);
  }catch(error){
    console.error('Error fetching dealer:', error);
    res.status(500).json({ error: 'An error occurred while fetching dealer' });
  }
}


exports.changepassword =async(req,res)=>{
  const { dealerId, currentPassword, newPassword } = req.body;

  try {
    const dealer = await Dealer.findById(dealerId);
    if (!dealer) {
      return res.status(404).json({ message: 'Dealer not found' });
    }

    if (dealer.password !== currentPassword) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    dealer.password = newPassword;
    await dealer.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}