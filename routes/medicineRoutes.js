const express = require("express");
const router = express.Router();
const medicineController = require("../controllers/medicineController");

router.post("/add", medicineController.addMedicine);
router.get("/user/:userId", medicineController.getMedicinesByUser);
router.delete("/:reminderId", medicineController.deleteMedicine);

module.exports = router;
