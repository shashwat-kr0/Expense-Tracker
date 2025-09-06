import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

const FinanceOverview = ({totalbalance, totalIncome, totalExpense}) => {

    const balanceData = [
        {name: "Total Balance", amount: totalbalance},
        {name: "Total Income", amount: totalIncome},
        {name: "Total Expense", amount: totalExpense},
    ];

    return  (
    <div className="card">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Finance Overview</h5>
        </div>

        <CustomPieChart 
        data={balanceData} 
        label="Total Balance"
        totalAmount={totalbalance}
        colors={COLORS}
        showTextAnchor
        />
    </div>
    );
};

export default FinanceOverview;
