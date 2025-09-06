const xlsx = require("xlsx");
const Expense = require("../models/Expense");
const path = require("path"); // Add this import
const fs = require("fs"); // Add this import

// Add Expense Source
exports.addExpense = async (req, res) => {
    try {
        // Check if req.user is available
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized: No user found" });
        }

        const userId = req.user.id;
        const { icon, category, amount, date } = req.body;

        // Validate required fields
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        console.error("Error adding income:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get All Expense Source 
exports.getAllExpense = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized: No user found" });
        }

        const userId = req.user.id;
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.status(200).json(expense);
    } catch (error) {
        console.error("Error fetching income:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete Expense Source 
exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted Successfully" });
    } catch (error) {
        console.error("Error deleting income:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Download Expense as Excel 
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        // Add these required imports at the top of your file 
        const path = require('path');
        const fs = require('fs');
        
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        // Prepare data for Excel
        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0], // Format date to YYYY-MM-DD
        }));
        // Create workbook and worksheet
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        
        // Ensure temp directory exists
        const tempDir = path.join(__dirname, "../temp");
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }
        
        // Save file to temp location
        const filePath = path.join(__dirname, "../temp/expense_details.xlsx");
        xlsx.writeFile(wb, filePath);
        // Send the file for download
        res.download(filePath, "expense_details.xlsx", (err) => {
            if (err) {
                console.error("Download error:", err);
                res.status(500).json({ message: "Could not download file" });
            } else {
                // Optional: clean up file after download
                fs.unlinkSync(filePath);
            }
        });
    } catch (error) {
        console.error("Error exporting expense:", error);
        res.status(500).json({ message: "Server Error" });
    }
};