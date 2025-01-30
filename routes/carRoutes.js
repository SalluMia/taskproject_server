const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const carController = require("../controllers/carController");

// Apply middleware for routes that need authentication
router.post("/create", protect, carController.createCar);
router.get("/", protect, carController.getCars);
router.delete("/:id", protect, carController.deleteCar);
router.put("/:id", protect, carController.updateCar);

module.exports = router;
