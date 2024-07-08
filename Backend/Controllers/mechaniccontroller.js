const Mechanic = require('../model/mechanic');
const bcrypt = require('bcryptjs');
const MechNotification= require('../model/Mechnotification');
const Service =require('../model/Service');
exports.registerMechanic = async (req, res) => {
  const { dealerId,name, phone, password} = req.body;

  // Validate required fields
  if (!dealerId || !name || !phone  || !password ) {
      console.log('Missing required fields', req.body);
      return res.status(400).json({ error: 'All fields are required' });
  }

  try {
      const newMechanic = new Mechanic({
        dealerId:dealerId,
         name:name,
         phone:phone,
         
         
         password:password
      });

      await newMechanic.save();
      res.status(201).send({ message: 'Mechanic registered successfully' });
  } catch (error) {
      console.error('Error saving dealer:', error);
      res.status(400).json({ error: 'An error occurred while registering the dealer' });
  }
};


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



exports.getNotifications =async(req,res) =>{
  try {
    const { mechanicId } = req.params;
    const Mechnotifications = await MechNotification.find({ MechanicId: mechanicId });
    console.log(req.params);
    res.status(200).json(Mechnotifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'An error occurred while fetching notifications' });
  }
}

exports.markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    await MechNotification.findByIdAndUpdate(notificationId, { read: true });
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Error marking notification as read', error });
  }
};

exports.getServices= async(req,res)=>{
  const { mechanicId } = req.params;
  try {
    const services = await Service.find({ mechanicId });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching services' });
  }
};

exports.fetchmechanicbyId = async(req,res)=>{
  try{
    const {mechanicId} =req.params;
    const mechanicfind= await Mechanic.findById(mechanicId);
    res.status(200).json(mechanicfind);
  }catch(error){
    console.error('Error fetching dealer:', error);
    res.status(500).json({ error: 'An error occurred while fetching dealer' });
  }
}


exports.changepassword =async(req,res)=>{
  const { mechanicId, currentPassword, newPassword } = req.body;

  try {
    const mechanic = await Mechanic.findById(mechanicId);
    if (!mechanic) {
      return res.status(404).json({ message: 'Mechanic not found' });
    }

    if (mechanic.password !== currentPassword) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    mechanic.password = newPassword;
    await mechanic.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}