import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import RecentTransactions from "../Dashboard/RecentTransactions";
import ExpenseTransactions from "../Dashboard/ExpenseTrasactions";

const Dashboardlayout = ({ children, activeMenu }) => {
    const { user } = useContext(UserContext);

    if (user === undefined) {
        return <div className="p-5">Checking authentication...</div>;
    }

    if (!user) {
        return <div className="p-5 text-red-600">User not logged in. Redirecting...</div>;
    }

    return (
             <div className="flex flex-col h-screen">
            <Navbar activeMenu={activeMenu} />
            

            <div className="flex flex-1 overflow-hidden">
                <div className="max-[1080px]:hidden">
                    <SideMenu activeMenu={activeMenu} />
                </div>
                <div className="grow mx-5 overflow-y-auto pb-8">
                    {children}
                </div>
            </div>
        </div>
        
    );
};

export default Dashboardlayout;