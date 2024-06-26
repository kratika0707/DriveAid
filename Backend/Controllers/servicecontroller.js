// controllers/serviceController.js
const Service = require("../model/Service");
const Dealer = require("../model/Dealer");
const { sendNotification } = require('../WebSocket');
const { getDistance } = require('geolib');


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

    await newService.save();

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
      const distance = getDistanceFromLatLonInKm(userLocation.latitude,userLocation.longitude, dealerLocation.latitude,dealerLocation.longitude);
      console.log(distance);
      if (distance < minDistance) {
        nearestDealer = dealer;
        minDistance = distance;
      }
    });
    
    if (nearestDealer) {
      sendNotification({
        type: 'NEW_SERVICE_REQUEST',
        payload: {
          dealerId: nearestDealer._id,
          serviceId: newService._id,
          message: `${nearestDealer._id}You have a new service request`,
        },
      });
    }

    res.status(201).send({ message: 'Service registered successfully' });
  } catch (error) {
    console.error('Error saving service:', error);
    res.status(400).json({ error: 'An error occurred while registering the service' });
  }
};

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


