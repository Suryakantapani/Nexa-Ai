const mongoose=require("mongoose");
const MedicineSchema=new mongoose.Schema({
  userId:String,
  medicineName:String,
  dosage:String,
  time:String,
  frequency:String,
  alertBefore:Number,
  phoneNumber:String,
});
module.exports=mongoose.model("Medicine", MedicineSchema);