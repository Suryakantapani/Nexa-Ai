const Medicine=require("../models/Medicine");

exports.addMedicine=async(req, res) => {
  try {
    const medicine=new Medicine(req.body);
    await medicine.save();
    res.status(201).json({message:"Medicine reminder added successfully."});
  } catch(error) {
    res.status(500).json({error:error.message });
  }
};

exports.getMedicinesByUser=async(req, res)=>{
  try {
    const medicines=await Medicine.find({userId:req.params.userId});
    res.json(medicines);
  } catch(error) {
    res.status(500).json({error:error.message });
  }
};

exports.deleteMedicine=async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.reminderId);
    res.json({ message: "Medicine reminder deleted." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};