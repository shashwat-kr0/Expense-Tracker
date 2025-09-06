const xlsx = require("xlsx");
const Income = require("../models/Income");
const path = require("path"); // Add this import
const fs = require("fs"); // Add this import

// Add Income Source
exports.addIncome = async (req, res) => {
    try {
        // Check if req.user is available
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized: No user found" });
        }

        const userId = req.user.id;
        const { icon, source, amount, date } = req.body;

        // Validate required fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (error) {
        console.error("Error adding income:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get All Income Source 
exports.getAllIncome = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized: No user found" });
        }

        const userId = req.user.id;
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(income);
    } catch (error) {
        console.error("Error fetching income:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete Income Source 
exports.deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Income deleted Successfully" });
    } catch (error) {
        console.error("Error deleting income:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Download Income as Excel 

exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        // Prepare data for Excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0], // Format date to YYYY-MM-DD
        }));

        // Create workbook and worksheet
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        // Ensure temp directory exists
        const tempDir = path.join(__dirname, "../temp");
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        // Save file to temp location
        const filePath = path.join(tempDir, "income_details.xlsx");
        xlsx.writeFile(wb, filePath);

        // Send the file for download
        res.download(filePath, "income_details.xlsx", (err) => {
            if (err) {
                console.error("Download error:", err);
                res.status(500).json({ message: "Could not download file" });
            } else {
                // Optional: clean up file after download
                fs.unlinkSync(filePath);
            }
        });

    } catch (error) {
        console.error("Error exporting income:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
