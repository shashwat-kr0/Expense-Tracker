const express = require("express");
const router = express.Router();

// Controllers
const {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
} = require("../controllers/expenseController");

// Middleware
const { protect } = require("../middleware/authmiddleware");

// Routes
router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.get("/downloadexcel", protect, downloadExpenseExcel);
router.delete("/:id", protect,  deleteExpense);

module.exports = router;
