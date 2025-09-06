const express = require("express");
const router = express.Router();

// Controllers
const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} = require("../controllers/incomeController");

// Middleware
const { protect } = require("../middleware/authmiddleware");

// Routes
router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.get("/downloadexcel", protect, downloadIncomeExcel);
router.delete("/:id", protect,  deleteIncome);

module.exports = router;
