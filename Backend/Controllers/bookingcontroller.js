const user=require('../model/user')
const service=require('../model/Service')

const inputservice= async (req, res) => {
    try {
        const {userid,location,dateofservice,timeofservice,servicestatus,issue,carmodel } = req.body;
        const user = new User({
            userid,
            location: {
                latitude: mongoose.Types.Decimal128.fromString(location.latitude),
                longitude: mongoose.Types.Decimal128.fromString(location.longitude)
            }, 
            dateofservice,
            timeofservice,
            servicestatus,
            issue,
            carmodel
        });
        await service.save();
        res.status(201).json(service);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};