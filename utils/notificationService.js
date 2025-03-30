const twilio = require("twilio");
const admin = require("firebase-admin");
const Medicine = require("../models/Medicine");

admin.initializeApp({ credential: admin.credential.applicationDefault() });
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendNotification = async (medicine) => {
  if (medicine.phoneNumber) {
    await client.messages.create({
      body: `Reminder: Take your ${medicine.medicineName}(${medicine.dosage})now!`,
      from: process.env.TWILIO_PHONE,
      to: medicine.phoneNumber,
    });
  }
};
