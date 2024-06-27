// controllers/serviceController.js
const Service = require("../model/Service");
const Dealer = require("../model/Dealer");
const { sendNotification } = require('../WebSocket');


// Assuming you have a Notification model
const Notification = require('../model/Notifications');

exports.bookService = async (req, res) => {
  const { userid, carmodel, issue, location, dateofservice, timeofservice, servicestatus } = req.body;

  if (!userid || !carmodel || !issue || !dateofservice || !location || !timeofservice) {
    console.log('Missing required fields', req.body);
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newService = new Service({
      userid,
      location,
      dateofservice,
      timeofservice,
      carmodel,
      servicestatus,
      issue,
    });

   

    // Find nearest dealer
    const dealers = await Dealer.find();
    const userLocation = {
      latitude: location.latitude,
      longitude: location.longitude,
    };
    
    let nearestDealer = null;
    let minDistance = Infinity;

    dealers.forEach(dealer => {
      const dealerLocation = {
        latitude: dealer.location.latitude,
        longitude: dealer.location.longitude,
      };
      const distance = getDistanceFromLatLonInKm(userLocation.latitude, userLocation.longitude, dealerLocation.latitude, dealerLocation.longitude);
      console.log(distance);
      if (distance < minDistance) {
        nearestDealer = dealer;
        minDistance = distance;
      }
    });
    
    if (nearestDealer) {
      newService.dealerId = nearestDealer._id;
      newService.servicestatus =2; // Assigning the dealerId to the newService
    }

    // Save the new service
    await newService.save();

    if (nearestDealer) {
      const newNotification = new Notification({
        dealerId: nearestDealer._id,
        serviceId: newService._id,
        message: `You have a new service request`,
      });

      await newNotification.save();

      // Send the notification to the nearest dealer
      sendNotification({
        type: 'NEW_SERVICE_REQUEST',
        payload: {
          dealerId: nearestDealer._id,
          serviceId: newService._id,
          message: newNotification.message,
          link: `dealer/service/${newService._id}`
        },
      });

      
    }

    
    


    res.status(201).send({ message: 'Service registered successfully' });
  } catch (error) {
    console.error('Error saving service:', error);
    res.status(400).json({ error: 'An error occurred while registering the service' });
  }
};




function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}



exports.getHistory = async (req, res) => {
  try {
    const { userid } = req.params;
    const services = await Service.find({ userid: userid });
    console.log('history')
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching service history:', error);
    res.status(500).json({ error: 'An error occurred while fetching service history' });
  }
}


exports.getServicesByDealer = async (req, res) => {
  const { dealerId } = req.params;

  try {
    const services = await Service.find({ dealerId: dealerId });
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'An error occurred while fetching services' });
  }
};


exports.getService =async(req,res)=>{
  const { serviceId } = req.params;

  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: 'Server error' });
  }
}