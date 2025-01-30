const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const categoryController = require("../controllers/categoryController");

// Apply middleware for routes that need authentication
router.post("/create", protect, categoryController.createCategory);
router.get("/", protect, categoryController.getCategories);
router.delete("/:id", protect, categoryController.deleteCategory);
router.put("/:id", protect, categoryController.updateCategory);

module.exports = router;
