const {Schema,model}=require('mongoose');

const HealthRecordSchema = new Schema({
    userId:String,
    bloodPressure:String,
    heartRate:Number,
    temperature:Number,
    sleepHours:Number,
    sugarLevel:Number,
    timestamp:{type:Date,default:Date.now }
});

module.exports=model('HealthRecord',HealthRecordSchema);
