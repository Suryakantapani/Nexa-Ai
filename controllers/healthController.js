const HealthRecord=require('../models/HealthRecord');
const {checkHealthStatus}=require('../utils/healthUtils');

exports.addHealthRecord = async (req, res) => {
    try {
        const record=new HealthRecord(req.body);
        await record.save();
        
        const alerts = checkHealthStatus(record);
        res.status(201).json({ message:'Health record added!',alerts });
    } catch (error) {
        res.status(500).json({ error:'Server error'});
    }
};

exports.getHealthRecords=async(req, res) => {
    try {
        const records = await HealthRecord.find({ userId: req.params.userId });
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
