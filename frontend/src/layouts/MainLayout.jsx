import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/NavBar"; // Ensure the correct path
import { CricketSidebar } from "@/components/cricket-sidebar";

const MainLayout = () => {
  return (
    <div>
       <CricketSidebar children={<Outlet/>}/>
    
      {/* This renders the current route's component */}
     
    </div>
  );
};

export default MainLayout;
