const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cron = require("node-cron");
const medicineRoutes = require("./routes/medicineRoutes");
const Medicine = require("./models/Medicine");  
const healthController = require('./controllers/healthController');
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');

const { sendNotification } = require("./utils/notificationService");
dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
 
});
app.use('/health', require('./routes/healthRoutes'));
app.use("/api/medicine", medicineRoutes);

cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const currentTime = `${hours}:${minutes}`;

    const medicines = await Medicine.find({ time: currentTime });
    medicines.forEach((medicine) => {
      sendNotification(medicine);
    });
  } catch (error) {
    console.error("Scheduler Error:", error);
  }
});
 
app.use(cors()); 
app.use(express.json()); 
app.use('/auth', authRoutes);

 

const healthRoutes = require("./routes/healthRoutes");  
app.use("/api/health", healthRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




 
  
 
 