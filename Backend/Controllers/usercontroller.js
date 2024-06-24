const User = require('../model/user');

exports.loginUser = async (req, res) => {
    console.log(req.body);
    const { userId, loginPhone } = req.body;
    
    if (!userId || !loginPhone) {
        console.log('Missing required fields', req.body);
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    try {
        // Check if a user with the same phone number exists
        let existingUser = await User.findOne({ phone: loginPhone });

        if (existingUser) {
            // If user with the same phone number exists, return the existing user's userId
            return res.status(200).json({ userId: existingUser.userId, message: 'User logged in successfully' });
        }

        // If user does not exist, create a new user
        const newUser = new User({
            userId: userId,
            phone: loginPhone,
        });

        await newUser.save();
        res.status(201).json({ userId: newUser.userId, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error saving User:', error);
        res.status(400).json({ error: 'An error occurred while registering the User' });
    }
};
exports.logoutUser =async(req,res)=>{
    req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ error: 'Logout failed' });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.status(200).json({ message: 'Logged out successfully' });
      });
    
      // For token-based authentication, you might need to handle token invalidation
      // Example: Add the token to a blacklist or similar mechanism
    };