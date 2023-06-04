import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/DashBoard/Sidebar";

const DashBoardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex">
      <Sidebar />
      <div className="flex-1  md:ml-64">
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
