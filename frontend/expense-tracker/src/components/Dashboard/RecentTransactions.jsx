import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import  TransactionInfoCard  from "../Cards/TransactionInfoCard";

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex item-center justify-between">
        <h5 className="text-lg">Recent Transaction</h5>

        <button className="card-btn" onClick={onSeeMore}>
          SeeAll <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.category}
            icon={item.icon}
            date={moment(item.date).format("Do MM YYYY")}
            type={item.type} 
            amount={item.amount}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
