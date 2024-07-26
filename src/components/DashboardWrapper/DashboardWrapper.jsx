import React, { useState } from "react";
import "./DashboardWrapper.css";
import { Sidebar } from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

export const DashboardWrapper = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <>
      <Sidebar
        show={showSidebar}
        onClose={() => setShowSidebar(!showSidebar)}
      />
      <main className="dashboard-content">
        <Navbar onMenuClick={() => setShowSidebar(!showSidebar)}/>
        {children}
      </main>
    </>
  );
};
